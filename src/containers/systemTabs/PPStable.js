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
    if(columnKey === undefined) {
      columnKey = "id"
    }
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
    console.log(this.props)
    var {sortedDataList, colSortDirs,columnWidths,isChecked,renderDropD, ppsSelected,headerChecked} = this.state, checkedPPS = [];
    let pickDrop = <FormattedMessage id="PPS.table.pickDrop" description="pick dropdown option for PPS" defaultMessage ="Put"/> 
    let putDrop = <FormattedMessage id="PPS.table.putDrop" description="put dropdown option for PPS" defaultMessage ="Pick"/> 
    let auditDrop = <FormattedMessage id="PPS.table.auditDrop" description="audit dropdown option for PPS" defaultMessage ="Audit"/> 
    
    const modes = [
    { value: 'put', label: pickDrop },
    { value: 'pick', label: putDrop },
    { value: 'audit', label: auditDrop }
    ];
    var checkState = this.handleChange.bind(this);
    var drop, selected =0, ppsTotal = sortedDataList.getSize();
    let pick = this.props.operationMode.Pick;
    let put = this.props.operationMode.Put;
    let audit = this.props.operationMode.Audit;
    let notSet = this.props.operationMode.NotSet;
    let operatorNum =  this.props.operatorNum;
    if(this.state.renderDropD===true) {
      drop = <DropdownTable  styleClass={'gorDataTableDrop'} placeholder={this.props.intlMessg["pps.dropdown.placeholder"]} items={modes} changeMode={this.handleModeChange.bind(this)}/>;
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
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="PPStable.selected" description='selected pps for ppsSelected' 
                defaultMessage='{selected} selected' 
                values={{selected:selected?selected:'0'}}/> 
              </div>
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
              placeholder={this.props.intlMessg["table.filter.placeholder"]}>
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
            <div>
            <div className="gor-header-check">
              <input type="checkbox" checked={this.state.headerChecked} onChange={this.headerCheckChange.bind(this)}/>
            </div>
            <div>
              <SortHeaderCell onSortChange={this._onSortChange} 
                sortDir={colSortDirs.id}>  
                <div className="gorToolHeaderEl">
                <div className="gorToolHeaderEl"> 
                  <FormattedMessage id="PPStable.Totalpps" description='total pps' 
                  defaultMessage='{ppsTotal} PPS' 
                  values={{ppsTotal:ppsTotal?ppsTotal:'0'}}/> 
                </div>
                <div className="gorToolHeaderSubText"> 
                  <FormattedMessage id="PPStable.Subpps" description='sub pps' 
                  defaultMessage='Total: {ppsTotal}' 
                  values={{ppsTotal:ppsTotal?ppsTotal:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
            </div>
            </div>
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
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.operatingMode}>
              <FormattedMessage id="PPS.table.operatingMode" description="operatingMode for PPS" 
              defaultMessage ="OPERATING MODE"/>
              <div className="gorToolHeaderSubText">
                <FormattedMessage id="PPStable.ppsState" description='pps state for PPStable' 
                defaultMessage='Pick ({pick}) . Put ({put}) . Audit ({audit}) . Not set ({notSet})' 
                values={{pick: pick?pick:'0', put:put?put:'0', audit:audit?audit:'0', notSet:notSet?notSet:'0'}}/>
              </div>
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
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.performance}>
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
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.operatorAssigned}>
               <FormattedMessage id="PPS.table.operatorAssigned" description="operatorAssigned for PPS" 
              defaultMessage ="OPERATOR ASSIGNED"/> 
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="PPStable.totalOperator" description='totalOperator for PPStable' 
                defaultMessage='{operatorNum} operator' 
                values={{operatorNum: operatorNum?operatorNum:'0'}}/>
              </div>
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
