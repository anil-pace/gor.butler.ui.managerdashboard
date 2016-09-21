import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTemp from '../../components/dropdown/dropdownTemp'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

class ButlerBotTable extends React.Component {
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
        current: columnWidth,
        msu: columnWidth,
        location: columnWidth,
        direction: columnWidth
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
    console.log("checked");
    console.log(columnKey)
    console.log(rowIndex)
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
  handlChange(columnKey,rowIndex) {
    console.log("checked");
    console.log(columnKey)
    console.log(rowIndex)
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
    console.log(this.state)
    const item = [
    { value: 'on/off', label: 'On/Off' },
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
    ];
    var checkState = this.handleChange.bind(this);
    console.log(this.props.containerHeight)
    console.log(this.state);
    var drop;
    if(this.state.renderDropD===true) {
      drop= <DropdownTemp items={item}/>;
    }

    else {
      drop = <div/>;
    }
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="butlerBot.table.heading" description="Heading for butlerbot" 
              defaultMessage ="BUTLER BOTS"/>
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
        height={this.props.containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.id}> <input type="checkbox" onChange={this.handlChange} />
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> {sortedDataList.getSize()} BOT </div>
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
                 <FormattedMessage id="butlerBot.table.status" description="Status for butlerbot" 
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
          columnKey="current"
          header={
            <SortHeaderCell>
              <FormattedMessage id="butlerBot.table.currentTask" description="Current task for butlerbot" 
              defaultMessage ="CURRENT TASK"/>
              <div className="gorToolHeaderSubText"> 2 Pick, 1 Put, 2 charging, 1 Idle</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.current}
          isResizable={true}
        />
        <Column
          columnKey="msu"
          header={
            <SortHeaderCell>
               <FormattedMessage id="butlerBot.table.msu" description="MSU Status for butlerbot" 
              defaultMessage ="MSU"/> 
              <div className="gorToolHeaderSubText">10 Mounted</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.msu}
          isResizable={true}
        />
        <Column
          columnKey="location"
          header={
            <SortHeaderCell>
               <FormattedMessage id="butlerBot.table.location" description="Location for butlerbot" 
              defaultMessage ="LOCATION"/> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.location}
          isResizable={true}
        />
        <Column
          columnKey="direction"
          header={
            <SortHeaderCell >
               <FormattedMessage id="butlerBot.table.direction" description="Direction for butlerbot" 
              defaultMessage ="DIRECTION"/> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          fixed={true}
          width={columnWidths.direction}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(ButlerBotTable);
