import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dropdown from '../../components/dropdown/dropdown'
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

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
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
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
    var columnWidth= (nextProps.containerWidth/nextProps.itemNumber)
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
    { value: 'all', label: 'All orders' },
    { value: 'breached', label: 'Breached orders' },
    { value: 'pending', label: 'Pending orders' },
    { value: 'completed', label: 'Completed orders' }
    ];

    const ordersByTime = [
    { value: 'allOrders', label: 'All' },
    { value: 'oneHourOrders', label: 'Last 1 hours' },
    { value: 'twoHourOrders', label: 'Last 2 hours' },
    { value: 'sixHourOrders', label: 'Last 6 hours' },
    { value: 'twelveHourOrders', label: 'Last 12 hours' },
    { value: 'oneDayOrders', label: 'Last 1 day' }
    ];
    
    return (
      <div className="gorTableMainContainer">
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
               <FormattedMessage id="order.table.heading" description="Heading for order list" 
              defaultMessage ="OrderList"/>
            </div>
            <div className="gor-button-wrap">
            <button className="gor-refresh-btn" onClick={this.props.refreshOption.bind(this)} >Refresh Data</button>
            </div>
            <div className="gor-button-sub-status"> {this.props.lastUpdated} </div>
          </div>
        <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
          <div className="gor-dropDown-firstInnerElement">
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByStatus} currentState={ordersByStatus[0]} optionDispatch={this.props.statusFilter}/>
          </div>
          <div className="gor-dropDown-secondInnerElement">                                                                  
              <Dropdown  styleClass={'gorDataTableDrop'}  items={ordersByTime} currentState={ordersByTime[0]}  optionDispatch={this.props.timeFilter}/>
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
              <div className=" gorToolHeaderEl"/>
              </div>
              <div className="gorToolHeaderEl alertState"> </div>
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
          fixed={true}
          width={columnWidths.status}
          isResizable={true}
        />
        <Column
          columnKey="pickBy"
          header={
            <SortHeaderCell>
              <FormattedMessage id="waves.table.pickBy" description="pick by for waves" 
              defaultMessage ="PICK BY"/>
              <div className="gorToolHeaderSubText"> </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.pickBy}
          isResizable={true}
        />
        <Column
          columnKey="recievedTime"
          header={
            <SortHeaderCell>
              <FormattedMessage id="orderlist.table.operatingMode" description="recievedTime for Orders" 
              defaultMessage ="RECIEVED TIME"/>
              <div className="gorToolHeaderSubText"> </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.recievedTime}
          isResizable={true}
        />
        <Column
          columnKey="completedTime"
          header={
            <SortHeaderCell>
              <FormattedMessage id="waves.table.completedTime" description="completedTime for waves" 
              defaultMessage ="COMPLETED"/>
              <div className="gorToolHeaderSubText"> </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.completedTime}
          isResizable={true}
        />
        <Column
          columnKey="orderLine"
          header={
            <SortHeaderCell>
              <FormattedMessage id="waves.table.orderLine" description="orderLine for waves" 
              defaultMessage ="ORDER LINE"/>
              <div className="gorToolHeaderSubText"> </div>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          fixed={true}
          width={columnWidths.orderLine}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}



//export default connect(null,mapDispatchToProps)(OrderListTable) ;

export default Dimensions()(OrderListTable);
