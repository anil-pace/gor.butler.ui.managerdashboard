import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

class PPStable extends React.Component {
  constructor(props) {
    super(props);
    var temp = new Array(this.props.items.length).fill(false);
    this._dataList = new tableRenderer(this.props.items.length);
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
        id: columnWidth,
        status: columnWidth,
        operatingMode: columnWidth,
        performance: columnWidth,
        operatorAssigned: columnWidth
      },
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
  handleChange(columnKey,rowIndex) {
    
    var showDropdown=false;
    var checkedState=this.state.isChecked;
    if(checkedState[rowIndex] === true) {
      checkedState[rowIndex] = false;
    }
    else {
      checkedState[rowIndex] = true;
    }
    for (var i = checkedState.length - 1; i >= 0; i--) {
      if(checkedState[i]===true) {
        showDropdown=true;
      }
    }
    this.setState({isChecked:checkedState});
    this.setState({renderDropD:showDropdown});    
  }

  headerCheckChange() {
    var checkedAllState=this.state.isChecked,showDropdown;
    for (var i = checkedAllState.length - 1; i >= 0; i--) {
      checkedAllState[i] = true;
    }
    showDropdown=true;
    this.setState({isChecked:checkedAllState});
    this.setState({renderDropD:showDropdown});    
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
  render() {
    
    var {sortedDataList, colSortDirs,columnWidths,isChecked,renderDropD} = this.state;
    const item = [
    { value: 'put', label: 'Put' },
    { value: 'pick', label: 'Pick' },
    { value: 'audit', label: 'Audit' }
    ];
    var checkState = this.handleChange.bind(this);
    var drop;
    if(this.state.renderDropD===true) {
      drop = <DropdownTable  styleClass={'gorDataTableDrop'} placeholder="Change PPS mode" items={item}/>;
    }

    else {
      drop = <div/>;
    }
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="pps.table.heading" description="Heading for PPS" 
              defaultMessage ="PPS"/>
              <div className="gorToolHeaderSubText"> 2 selected </div>
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
              placeholder="Filter by keywords">
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
        height={500}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}> <input type="checkbox" onChange={this.headerCheckChange.bind(this)} />
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> {sortedDataList.getSize()} PPS </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }
          cell={  <ComponentCell data={sortedDataList} checkState={checkState} />}
          fixed={true}
          width={columnWidths.id}
          isResizable={true}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
                 <FormattedMessage id="PPS.table.status" description="Status for PPS" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
              <div className="statuslogoWrap">
              <div className="header-red-alert-icon gorToolHeaderEl"/>
              </div>
              <div className="gorToolHeaderEl alertState"> 3 Alerts</div>
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
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
              <div className="gorToolHeaderSubText"> 0 Not set, 1 Audit, 1 Pick, 0 Put</div>
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
