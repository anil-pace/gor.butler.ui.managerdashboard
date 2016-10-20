import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {changePPSmode} from '../../actions/ppsModeChangeAction'
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';
import {BASE_URL, PPS_MODE_CHANGE_URL,PROTOCOL,API_URL} from '../../constants/configConstants';
import {PPS_MODE_CHANGE} from '../../constants/appConstants';

class PPStable extends React.Component {
  constructor(props) {
    super(props);
    var temp;
    if(this.props.items === undefined) {
      this._dataList = new tableRenderer(0);
      temp = new Array(0).fill(false);
    }
    else {
      this._dataList = new tableRenderer(this.props.items.length);
      temp = new Array(this.props.items.length).fill(false);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=this.props.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        id: this.props.containerWidth*0.15,
        status: this.props.containerWidth*0.1,
        operatingMode: this.props.containerWidth*0.2,
        performance: this.props.containerWidth*0.2,
        operatorAssigned: this.props.containerWidth*0.35
      },
      headerChecked: false,
      isChecked:temp,
      renderDropD: false,
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var temp;
    if(nextProps.items === undefined) {
      this._dataList = new tableRenderer(0);
      temp = new Array(0).fill(false);
    }
    else {
      this._dataList = new tableRenderer(nextProps.items.length);
      temp = new Array(nextProps.items.length).fill(false);
    }
    this._defaultSortIndexes = [];
    this._dataList.newData=nextProps.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber)
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
         id: nextProps.containerWidth*0.15,
        status: nextProps.containerWidth*0.1,
        operatingMode: nextProps.containerWidth*0.2,
        performance: nextProps.containerWidth*0.15,
        operatorAssigned: nextProps.containerWidth*0.4
      },
      headerChecked: false,
      isChecked:temp,
      renderDropD: false,
    };
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

   _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }
  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    this.setState({
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList), this._dataList),
    });
  }
  handleChange(columnKey,rowIndex,data) {
    
    var showDropdown=false, ppsSelected;
    
    var checkedState=this.state.isChecked;
    if(checkedState[rowIndex] === true) {
      checkedState[rowIndex] = false;
    }
    else {
      checkedState[rowIndex] = true;
    }
    for (var i = checkedState.length - 1; i >= 0; i--) {
      if(checkedState[i] === true) {
        showDropdown=true;
        break;
      }
    }

    this.setState({isChecked:checkedState});
    this.setState({renderDropD:showDropdown});    
  }

  headerCheckChange() {
    var checkedAllState=this.state.isChecked,showDropdown,headerState = this.state.headerChecked;
    if(headerState === false) {
    for (var i = checkedAllState.length - 1; i >= 0; i--) {
      checkedAllState[i] = true;
    }
    showDropdown=true;
    this.setState({isChecked:checkedAllState});
    this.setState({renderDropD:showDropdown});
    this.setState({headerChecked:true}); 
    }

    else {
      for (var i = checkedAllState.length - 1; i >= 0; i--) {
      checkedAllState[i] = false;
    }
    showDropdown=false;
    this.setState({isChecked:checkedAllState});
    this.setState({renderDropD:showDropdown});
    this.setState({headerChecked:false}); 
    }
     
  }
  
  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    this.setState({
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  handleModeChange(data) {
    var checkedPPS=[], j=0, mode=data.value;
    for (var i = this.state.isChecked.length - 1; i >= 0; i--) {
      if(this.state.isChecked[i] === true) {
        checkedPPS[j] = this.state.sortedDataList.newData[i].id
        checkedPPS[j] = checkedPPS[j].slice(4);
        let formdata={         
                    "requested_pps_mode": mode
         };
        var url = API_URL + PPS_MODE_CHANGE_URL + checkedPPS[j] + "/pps_mode";
        let ppsModeChange={
               'url':url,
               'formdata':formdata,
               'method':'PUT',
               'cause': PPS_MODE_CHANGE,
               'token': sessionStorage.getItem('auth_token'),
              'contentType':'application/json'
         } 
         
         this.props.modeChange(ppsModeChange);
        j++;
      }
    }
    var resetCheck = new Array(this.state.isChecked.length).fill(false);
    this.setState({isChecked:resetCheck});
    this.setState({renderDropD:false});
    this.setState({headerChecked:false}); 
  }

  
  render() {
    
    var {sortedDataList, colSortDirs,columnWidths,isChecked,renderDropD, ppsSelected,headerChecked} = this.state, checkedPPS = [];
    const modes = [
    { value: 'put', label: 'Put' },
    { value: 'pick', label: 'Pick' },
    { value: 'audit', label: 'Audit' }
    ];
    var checkState = this.handleChange.bind(this);
    var drop, selected =0;
    if(this.state.renderDropD===true) {
      drop = <DropdownTable  styleClass={'gorDataTableDrop'} placeholder="Change PPS mode" items={modes} changeMode={this.handleModeChange.bind(this)}/>;
    }

    else {
      drop = <div/>;
    }
    var j=1;
    for (var i = this.state.isChecked.length - 1; i >= 0; i--) {
      if(this.state.isChecked[i] === true) {
        selected = selected + 1;
      }
    }
   
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="pps.table.heading" description="Heading for PPS" 
              defaultMessage ="PPS"/>
              <div className="gorToolHeaderSubText"> {selected} selected </div>
            </div>
            <div className="gorToolBarDropDown">
              {drop}
            </div>
          </div>
        <div className="filterWrapper">  
        <div className="gorFilter">
            <div className="searchbox-magnifying-glass-icon"/>
            <input className="gorInputFilter"
              onChange={this._onFilterChange}
              placeholder="Filter by status and PPS id">
            </input>
        </div>
        </div>
       </div>

      <Table
        rowHeight={66}
        rowsCount={sortedDataList.getSize()}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}> <input type="checkbox" checked={this.state.headerChecked} onChange={this.headerCheckChange.bind(this)} />
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> {sortedDataList.getSize()} PPS </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }
          cell={  <ComponentCell data={sortedDataList} checkState={checkState} checked={this.state.isChecked} />}
          fixed={true}
          width={columnWidths.id}
          isResizable={true}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.status} >
              <div>
                 <FormattedMessage id="PPS.table.status" description="Status for PPS" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
              <div className="statuslogoWrap">
            
              </div>
              
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />
        <Column
          columnKey="operatingMode"
          header={
            <SortHeaderCell>
              <FormattedMessage id="PPS.table.operatingMode" description="operatingMode for PPS" 
              defaultMessage ="OPERATING MODE"/>
              <div className="gorToolHeaderSubText">Pick ({this.props.operationMode.Pick}) . Put ({this.props.operationMode.Put}) . Audit ({this.props.operationMode.Audit}) . Not set ({this.props.operationMode.NotSet})</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.operatingMode}
          isResizable={true}
        />
        <Column
          columnKey="performance"
          header={
            <SortHeaderCell>
               <FormattedMessage id="PPS.table.performance" description="performance Status for PPS" 
              defaultMessage ="PERFORMANCE"/> 
               <div>
              <div className="statuslogoWrap">
            
              </div>
              
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.performance}
          isResizable={true}
        />
        <Column
          columnKey="operatorAssigned"
          header={
            <SortHeaderCell>
               <FormattedMessage id="PPS.table.operatorAssigned" description="operatorAssigned for PPS" 
              defaultMessage ="OPERATOR ASSIGNED"/> 
              <div className="gorToolHeaderSubText"> {this.props.operatorNum} operator</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.operatorAssigned}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}


export default Dimensions()(PPStable);
