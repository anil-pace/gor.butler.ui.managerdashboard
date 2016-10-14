import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTable from '../../components/dropdown/dropdownTable'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

class NotificationTable extends React.Component {
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
        component: columnWidth,
        status: columnWidth,
        description: columnWidth,
        remark: columnWidth,
        time: columnWidth,
        
      },
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
  
  handlChange(columnKey,rowIndex) {
    
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
    var heightRes = 500;
    if(this.props.containerHeight !== 0) {
      heightRes = this.props.containerHeight;
    }
    
    
    var {sortedDataList, colSortDirs,columnWidths} = this.state;  
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="NotificationTable.table.heading" description="Heading for NotificationTable" 
              defaultMessage ="Notifications"/>
              
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
        height={heightRes}
        {...this.props}>
        <Column
          columnKey="component"
          header={
            <SortHeaderCell onSortChange={this._onSortChange}
              sortDir={colSortDirs.component}> 
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> <FormattedMessage id="NotificationTable.table.component" description="component for NotificationTable" 
              defaultMessage ="COMPONENT"/> </div>
              
              </div>
            </SortHeaderCell>
          }
          cell={  <TextCell data={sortedDataList}/>}
          fixed={true}
          width={columnWidths.component}
          isResizable={true}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
                 <FormattedMessage id="Notifications.table.status" description="Status for NotificationTable" 
              defaultMessage ="EVENT TYPE"/> 
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />
        
        <Column
          columnKey="description"
          header={
            <SortHeaderCell>
              <FormattedMessage id="NotificationTable.table.description" description="description for current component" 
              defaultMessage ="DESCRIPTION"/>
             
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.description}
          isResizable={true}
        />
        <Column
          columnKey="remark"
          header={
            <SortHeaderCell>
               <FormattedMessage id="NotificationTable.table.remark" description="remark for component" 
              defaultMessage ="REMARKS"/> 
              
            </SortHeaderCell>
          }
          cell={<textarea rows="3" cols="30"/>}
          fixed={true}
          width={columnWidths.remark}
          isResizable={true}
        />
        <Column
          columnKey="time"
          header={
            <SortHeaderCell>
               <FormattedMessage id="NotificationTable.table.location" description="Starting Time for Component" 
              defaultMessage ="TIME"/> 
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.time}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(NotificationTable);
