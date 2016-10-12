import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dropdown from '../../components/dropdown/dropdown'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

class OrderListTable extends React.Component {
  constructor(props) {
    super(props);
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
        recievedTime: columnWidth,
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
    
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    const ordersByStatus = [
    { value: 'breached', label: 'Breached orders' },
    { value: 'exception', label: 'Orders with exception' },
    { value: 'pending', label: 'Pending orders' },
    { value: 'completed', label: 'Completed orders' },
    { value: 'all', label: 'All orders' }
    ];

    const ordersByTime = [
    { value: 'oneHourOrders', label: 'Last 1 hours' },
    { value: 'twoHourOrders', label: 'Last 2 hours' },
    { value: 'sixHourOrders', label: 'Last 6 hours' },
    { value: 'twelveHourOrders', label: 'Last 12 hours' },
    { value: 'oneDayOrders', label: 'Last 1 day' },
    { value: 'allOrders', label: 'All' }
    ];
    
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="order.table.heading" description="Heading for order list" 
              defaultMessage ="OrderList"/>
            </div>
            <button className="gor-refresh-btn" >Refresh Data</button>
          </div>
        <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
          <div className="gor-dropDown-firstInnerElement">
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByStatus} currentState={ordersByStatus[4]}/>
          </div>
          <div className="gor-dropDown-secondInnerElement">   
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByTime} currentState={ordersByTime[4]}/>
            </div>
            </div> 
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
              sortDir={colSortDirs.id}> 
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl"> {sortedDataList.getSize()} Order List </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }
          cell={  <TextCell data={sortedDataList}/>}
          fixed={true}
          width={columnWidths.id}
          isResizable={true}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
                 <FormattedMessage id="orderList.table.status" description="Status for orders" 
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
          columnKey="recievedTime"
          header={
            <SortHeaderCell>
              <FormattedMessage id="orderlist.table.operatingMode" description="recievedTime for Orders" 
              defaultMessage ="RECIEVED TIME"/>
              <div className="gorToolHeaderSubText"> 0 Not set, 1 Audit, 1 Pick, 0 Put</div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.recievedTime}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(OrderListTable);
