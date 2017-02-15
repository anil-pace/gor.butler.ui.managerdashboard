import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dropdown from '../../components/dropdown/dropdown'
import Dimensions from 'react-dimensions'
import { FormattedMessage, FormattedDate, FormattedTime,FormattedRelative ,defineMessages} from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData,TestingCell} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS,GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT,DEBOUNCE_TIMER} from '../../constants/frontEndConstants';
import {debounce} from '../../utilities/debounce';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'table.filter.placeholder',
        description: 'placeholder for table filter',
        defaultMessage: 'Filter by keywords',
    }
});


class OrderListTable extends React.Component {
 

  constructor(props) {
    super(props);
    if(this.props.items === undefined) {
      this._dataList = new tableRenderer(0);
    }
    else {
      this._dataList = new tableRenderer(this.props.items.length);
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
        id: columnWidth,
        status: columnWidth,
        recievedTime: columnWidth,
        completedTime: columnWidth,
        pickBy: columnWidth,
        orderLine: columnWidth
      },
    };
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this.backendSort = this.backendSort.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.items === undefined) {
      this._dataList = new tableRenderer(0);
    }
    else {
      this._dataList = new tableRenderer(nextProps.items.length);
    }

    this._defaultSortIndexes = [];
    this._dataList.newData=nextProps.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber), sortIndex = {}
    if(this.props.currentHeaderOrder.colSortDirs) {
      sortIndex = this.props.currentHeaderOrder.colSortDirs;
    }
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: sortIndex,
      columnWidths: {
        id: columnWidth,
        status: columnWidth,
        recievedTime: columnWidth,
        completedTime: columnWidth,
        pickBy: columnWidth,
        orderLine: columnWidth
      },
    };
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this.backendSort = this.backendSort.bind(this);
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
    var data={"type":"searchOrder", "captureValue":"", "selected":0 },debounceFilter;
    if(e.target && (e.target.value || e.target.value === "")) {
      data["captureValue"] = e.target.value;
      this.props.setOrderFilter(e.target.value);
    }
    else {
      data["captureValue"] = e;
    }
    debounceFilter = debounce(this.props.refreshData, DEBOUNCE_TIMER);
    debounceFilter(data);
  }
  

  backendSort(columnKey, sortDir) {
    var data={"columnKey":columnKey, "sortDir":sortDir, selected:0}
    this.props.sortHeaderState(columnKey);
    this.props.refreshData(data);
    this.props.sortHeaderOrder({
      colSortDirs: {[columnKey]: sortDir},
    })
  }

  
  render() {
    
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    var totalOrder = this.props.totalOrders, headerAlert = <div/>,heightRes;
    let allDrop = <FormattedMessage id="orderlist.table.allDrop" description="allOrders dropdown option for orderlist" defaultMessage ="All orders"/> 
    let breachedDrop = <FormattedMessage id="orderlist.table.breachedDrop" description="breached dropdown option for orderlist" defaultMessage ="Breached orders"/> 
    let pendingDrop = <FormattedMessage id="pendingDrop.table.allDrop" description="pending dropdown option for orderlist" defaultMessage ="Pending orders"/> 
    let completedDrop = <FormattedMessage id="completedDrop.table.allDrop" description="completed dropdown option for orderlist" defaultMessage ="Completed orders"/> 
    let exception = <FormattedMessage id="exceptionDrop.table" description="exception order dropdown for orderlist" defaultMessage="Exception"/>
    
    let allTimeDrop = <FormattedMessage id="orderlist.table.allTimeDrop" description="allTime dropdown option for orderlist" defaultMessage ="All"/> 
    let oneHrDrop = <FormattedMessage id="orderlist.table.oneHrDrop" description="oneHr dropdown option for orderlist" defaultMessage ="Last 1 hours"/> 
    let twoHrDrop = <FormattedMessage id="pendingDrop.table.twoHrDrop" description="twoHr dropdown option for orderlist" defaultMessage ="Last 2 hours"/> 
    let sixHrDrop = <FormattedMessage id="completedDrop.table.sixHrDrop" description="sixHr dropdown option for orderlist" defaultMessage ="Last 6 hours"/> 
    let twelveHrDrop = <FormattedMessage id="pendingDrop.table.twelveHrDrop" description="twelveHr dropdown option for orderlist" defaultMessage ="Last 12 hours"/> 
    let oneDayDrop = <FormattedMessage id="completedDrop.table.oneDayDrop" description="oneDay dropdown option for orderlist" defaultMessage ="Last 1 day"/> 
    
    const ordersByStatus = [
    { value: 'all', label: allDrop },
    { value: 'breached', label: breachedDrop },
    { value: 'pending', label: pendingDrop },
    { value: 'completed', label: completedDrop },
    { value: 'exception', label: exception}
    ];

    const ordersByTime = [
    { value: 'allOrders', label: allTimeDrop },
    { value: 'oneHourOrders', label: oneHrDrop },
    { value: 'twoHourOrders', label: twoHrDrop },
    { value: 'sixHourOrders', label: sixHrDrop },
    { value: 'twelveHourOrders', label: twelveHrDrop },
    { value: 'oneDayOrders', label: oneDayDrop }
    ];

    if(this.props.alertNum !== 0) {

     headerAlert =  <div className="gorToolHeaderEl alertState"> <div className="table-subtab-alert-icon"/> <div className="gor-inline">{this.props.alertNum} Alerts </div> </div>
    }

    if(this.props.containerHeight !== 0) {
      heightRes = this.props.containerHeight;
    }
    var noData = <div/>;
    if(totalOrder === 0 || totalOrder === undefined || totalOrder === null) {
     noData =  <div className="gor-no-data"> <FormattedMessage id="orderlist.table.noData" description="No data message for orderlist table" 
        defaultMessage ="No Orders Found"/>  </div>
     heightRes = GOR_TABLE_HEADER_HEIGHT;
    }
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="order.table.heading" description="Heading for order list" 
              defaultMessage ="OrderList"/>
            </div>
            <div className="gor-button-wrap">
            <button className="gor-refresh-btn" onClick={this.props.refreshOption.bind(this,null)} >
              
              <FormattedMessage id="order.table.buttonLable" description="button label for refresh" 
              defaultMessage ="Refresh Data"/>
            </button>
            </div>
            <div className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
          </div>
        <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
          <div className="gor-dropD-text"> <FormattedMessage id="order.table.dropdown.text" description="Sub text for order list dropdown" 
              defaultMessage ="Show"/> </div>
          <div className="gor-dropDown-firstInnerElement">
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByStatus} currentState={ordersByStatus[0]} optionDispatch={this.props.statusFilter} refreshList={this.props.refreshList}/>
          </div>
          <div className="gor-dropDown-secondInnerElement">                                                                  
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByTime} currentState={ordersByTime[0]}  optionDispatch={this.props.timeFilter} refreshList={this.props.refreshList}/>
            </div>
            </div> 
        <div className="gorFilter">
            <div className="searchbox-magnifying-glass-icon"/>
            <input className="gorInputFilter"
              onChange={this._onFilterChange}
              placeholder={this.props.intlMessg["table.filter.placeholder"]}
              value={this.props.getOrderFilter}>
            </input>
        </div>
        </div>
       </div>

      <Table
        rowHeight={50}
        rowsCount={sortedDataList.getSize()}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={heightRes*0.9}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell onSortChange={this.backendSort}
              sortDir={colSortDirs.id}> 
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl">
               <FormattedMessage id="orderlist.order.headingText" description='Heading for order IDs in ordertable' 
               defaultMessage='ORDER ID' />
                </div>
              <div className="gorToolHeaderSubText">
               <FormattedMessage id="orderlist.subTotalorder" description='subtotal order for ordertable' defaultMessage='Total:{totalOrder}' values={{totalOrder: totalOrder?totalOrder:'0'}}/>
               
               </div>
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
            <div className="gor-table-header">
              <div>
                 <FormattedMessage id="orderList.table.status" description="Status for orders" 
              defaultMessage ="STATUS"/> 
              </div>
              <div>
                <div className="statuslogoWrap">
                  {headerAlert}
                </div>
              </div>
            </div>
          }
          cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />
        <Column
          columnKey="pickBy"
          header={
            <SortHeaderCell onSortChange={this.backendSort}
              sortDir={colSortDirs.pickBy}>
              <div className="gorToolHeaderEl">
              <FormattedMessage id="orderlist.table.pickBy" description="pick by for orderlist" 
              defaultMessage ="PICK BY"/>
              <div className="gorToolHeaderSubText"> 
                <FormattedMessage id="orderlist.pendingOrders" description='pendingOrders header ordertable' defaultMessage='{pendingOrders} orders pending' values={{pendingOrders: this.props.totalPendingOrder?this.props.totalPendingOrder:'0'}}/>
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList} />}
          fixed={true}
          width={columnWidths.pickBy}
          isResizable={true}
        />
        <Column
          columnKey="recievedTime"
          header={
            <SortHeaderCell onSortChange={this.backendSort}
              sortDir={colSortDirs.recievedTime}>
              <div className="gorToolHeaderEl">
              <FormattedMessage id="orderlist.table.operatingMode" description="recievedTime for Orders" 
              defaultMessage ="RECIEVED TIME"/>
              <div className="gorToolHeaderSubText"> 
                {this.props.timeZoneString}
              </div>
              </div>
            </SortHeaderCell>
          }
          cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList} />}
          fixed={true}
          width={columnWidths.recievedTime}
          isResizable={true}
        />
        <Column
          columnKey="completedTime"
          header={
            <div className="gor-table-header">
               <div className="gorToolHeaderEl">
              <FormattedMessage id="orderlist.table.completedTime" description="completedTime for orderlist" 
              defaultMessage ="COMPLETED"/>
              <div className="gorToolHeaderSubText">
              <FormattedMessage id="orderlist.totalCompletedOrder" description='totalCompletedOrder header ordertable' defaultMessage='Avg {totalCompletedOrder} orders/hr' values={{totalCompletedOrder: this.props.totalCompletedOrder?this.props.totalCompletedOrder:'0'}}/>
               </div>
                </div>
            </div>
          }
          cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList} />}
          fixed={true}
          width={columnWidths.completedTime}
          isResizable={true}
        />
        <Column
          columnKey="orderLine"
          header={
            <div className="gor-table-header">
              <div className="gorToolHeaderEl">
              <FormattedMessage id="orderlist.table.orderLine" description="orderLine for orderlist" 
              defaultMessage ="ORDER LINE"/>
              <div className="gorToolHeaderSubText"> 
              <FormattedMessage id="orderlist.itemsPerOrder" description='itemsPerOrder header ordertable' defaultMessage='Avg {itemsPerOrder} items/hr' values={{itemsPerOrder: this.props.itemsPerOrder?this.props.itemsPerOrder.toFixed(2):'0'}}/>
              </div>
              </div>
            </div>
          }
          cell={<TextCell data={sortedDataList} align="left"/>}
          fixed={true}
          width={columnWidths.orderLine}
          isResizable={true}
        />
      </Table>
      <div> {noData} </div>
      </div>
    );
  }
}



//export default connect(null,mapDispatchToProps)(OrderListTable) ;

export default Dimensions()(OrderListTable);
