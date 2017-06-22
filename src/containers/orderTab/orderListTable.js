import React from 'react';
import {Table, Column} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage, defineMessages} from 'react-intl';
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    StatusCell
} from '../../components/commonFunctionsDataTable';
import {
    GOR_TABLE_HEADER_HEIGHT,
    DEBOUNCE_TIMER
} from '../../constants/frontEndConstants';
import {debounce} from '../../utilities/debounce';

const messages=defineMessages({
    filterPlaceholder: {
        id: 'table.filter.placeholder',
        description: 'placeholder for table filter',
        defaultMessage: 'Filter by keywords',
    }
});


class OrderListTable extends React.Component {


    constructor(props) {
        super(props);
        if (this.props.items=== undefined) {
            this._dataList=new tableRenderer(0);
        }
        else {
            this._dataList=new tableRenderer(this.props.items.length);
        }
        this._defaultSortIndexes=[];
        this._dataList.newData=this.props.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        var columnWidth=(this.props.containerWidth / this.props.itemNumber)
        this.state={
            sortedDataList: this._dataList,
            colSortDirs: {status: "DESC"},
            columnWidths: {
                id: columnWidth,
                status: columnWidth,
                recievedTime: columnWidth,
                completedTime: columnWidth,
                pickBy: columnWidth,
                orderLine: columnWidth
            },
        };
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
        this.backendSort=this.backendSort.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items=== undefined) {
            this._dataList=new tableRenderer(0);
        }
        else {
            this._dataList=new tableRenderer(nextProps.items.length);
        }

        this._defaultSortIndexes=[];
        this._dataList.newData=nextProps.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        var columnWidth=(nextProps.containerWidth / nextProps.itemNumber), sortIndex={status: "DESC"};
        if (this.props.currentHeaderOrder.colSortDirs) {
            sortIndex=this.props.currentHeaderOrder.colSortDirs;
        }
        this.state={
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
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
        this.backendSort=this.backendSort.bind(this);
    }


    shouldComponentUpdate(nextProps) {
        if (this.props.items && nextProps.items.length=== 0) {
            return false;
        }
        return true;
    }


    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }

    _onFilterChange(e) {
        var data={"type": "searchOrder", "captureValue": "", "selected": 1}, debounceFilter;
        if (e.target && (e.target.value || e.target.value=== "")) {
            data["captureValue"]=e.target.value;
            this.props.setOrderFilter(e.target.value);
        }
        else {
            data["captureValue"]=e;
        }
        debounceFilter=debounce(this.props.refreshOption, DEBOUNCE_TIMER);
        debounceFilter(data);
    }


    backendSort(columnKey, sortDir) {
        var data={"columnKey": columnKey, "sortDir": sortDir, selected: this.props.pageNumber}
        this.props.sortHeaderState(columnKey);
        this.props.onSortChange(data);
        this.props.sortHeaderOrder({
            colSortDirs: {[columnKey]: sortDir},
        })
    }



    _showAllOrder() {
        this.props.refreshOption();
    }

    render() {
        var {sortedDataList, colSortDirs, columnWidths}=this.state;
        var totalOrder=this.props.totalOrders, headerAlert=<div/>, heightRes;
        let allDrop=<FormattedMessage id="orderlist.table.allDrop"
                                        description="allOrders dropdown option for orderlist"
                                        defaultMessage="All orders"/>
        let breachedDrop=<FormattedMessage id="orderlist.table.breachedDrop"
                                             description="breached dropdown option for orderlist"
                                             defaultMessage="Breached orders"/>
        let pendingDrop=<FormattedMessage id="pendingDrop.table.allDrop"
                                            description="pending dropdown option for orderlist"
                                            defaultMessage="Pending orders"/>
        let completedDrop=<FormattedMessage id="completedDrop.table.allDrop"
                                              description="completed dropdown option for orderlist"
                                              defaultMessage="Completed orders"/>
        let exception=<FormattedMessage id="exceptionDrop.table" description="exception order dropdown for orderlist"
                                          defaultMessage="Exception"/>

        let allTimeDrop=<FormattedMessage id="orderlist.table.allTimeDrop"
                                            description="allTime dropdown option for orderlist" defaultMessage="All"/>
        let oneHrDrop=<FormattedMessage id="orderlist.table.oneHrDrop"
                                          description="oneHr dropdown option for orderlist"
                                          defaultMessage="Last 1 hours"/>
        let twoHrDrop=<FormattedMessage id="pendingDrop.table.twoHrDrop"
                                          description="twoHr dropdown option for orderlist"
                                          defaultMessage="Last 2 hours"/>
        let sixHrDrop=<FormattedMessage id="completedDrop.table.sixHrDrop"
                                          description="sixHr dropdown option for orderlist"
                                          defaultMessage="Last 6 hours"/>
        let twelveHrDrop=<FormattedMessage id="pendingDrop.table.twelveHrDrop"
                                             description="twelveHr dropdown option for orderlist"
                                             defaultMessage="Last 12 hours"/>
        let oneDayDrop=<FormattedMessage id="completedDrop.table.oneDayDrop"
                                           description="oneDay dropdown option for orderlist"
                                           defaultMessage="Last 1 day"/>
        if (this.props.alertNum !== 0) {

            headerAlert=<div className="gorToolHeaderEl alertState">
                <div className="table-subtab-alert-icon"/>
                <div className="gor-inline">{this.props.alertNum} Alerts</div>
            </div>
        }

        if (this.props.containerHeight !== 0) {
            heightRes=this.props.containerHeight;
        }
        var noData=<div/>;
        if (totalOrder=== 0 || totalOrder=== undefined || totalOrder=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="orderlist.table.noData"
                                                                    description="No data message for orderlist table"
                                                                    defaultMessage="No Orders Found"/></div>
            heightRes=GOR_TABLE_HEADER_HEIGHT;
        }

        return (
            <div className="gorTableMainContainer">
                <Table
                    rowHeight={50}
                    rowsCount={sortedDataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={heightRes * 0.9}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={
                            <SortHeaderCell onSortChange={this.backendSort}
                                            sortDir={colSortDirs.id}>
                                <div className="gorToolHeaderEl">
                                    <div className="gorToolHeaderEl">
                                        <FormattedMessage id="orderlist.order.headingText"
                                                          description='Heading for order IDs in ordertable'
                                                          defaultMessage='ORDER ID'/>
                                    </div>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="orderlist.subTotalorder"
                                                          description='subtotal order for ordertable'
                                                          defaultMessage='Total:{totalOrder}'
                                                          values={{totalOrder: totalOrder ? totalOrder : '0'}}/>

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
                            <SortHeaderCell onSortChange={this.backendSort} sortDir={colSortDirs.status}>
                                <div className="gorToolHeaderEl">
                                    <div>
                                        <FormattedMessage id="orderList.table.status" description="Status for orders"
                                                          defaultMessage="STATUS"/>
                                    </div>
                                    <div>
                                        <div className="statuslogoWrap">
                                            {headerAlert}
                                        </div>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<StatusCell data={sortedDataList} statusKey="statusClass"></StatusCell>}
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
                                                      defaultMessage="PICK BY"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="orderlist.pendingOrder"
                                                          description='pendingOrders header ordertable'
                                                          defaultMessage='{pendingOrders} {orders} pending'
                                                          values={{pendingOrders: this.props.totalPendingOrder ? this.props.totalPendingOrder : '0', orders: this.props.totalPendingOrder <= 1 ? 'order':'orders'}}

                                                          />
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
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
                                    <FormattedMessage id="orderlist.table.operatingMode"
                                                      description="recievedTime for Orders"
                                                      defaultMessage="RECIEVED TIME"/>
                                    <div className="gorToolHeaderSubText">
                                        {this.props.timeZoneString}
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.recievedTime}
                        isResizable={true}
                    />
                    <Column
                        columnKey="completedTime"
                        header={
                            <div className="gor-table-header">
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="orderlist.table.completedTime"
                                                      description="completedTime for orderlist"
                                                      defaultMessage="COMPLETED"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="orderlist.totalCompletedOrders"
                                                          description='totalCompletedOrder header ordertable'
                                                          defaultMessage='{totalCompletedOrder} {orders} completed'
                                                          values={{totalCompletedOrder: this.props.totalCompletedOrder ? this.props.totalCompletedOrder : '0', orders: this.props.totalCompletedOrder <= 1 ? 'order':'orders'}}/>
                                    </div>
                                </div>
                            </div>
                        }
                        cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.completedTime}
                        isResizable={true}
                    />
                    <Column
                        columnKey="orderLine"
                        header={
                            <div className="gor-table-header">
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="orderlist.table.orderLine"
                                                      description="orderLine for orderlist"
                                                      defaultMessage="ORDER LINE"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="orderlist.itemsPerOrders"
                                                          description='itemsPerOrder header ordertable'
                                                          defaultMessage='Avg {itemsPerOrder} {items}/order'
                                                          values={{itemsPerOrder: this.props.itemsPerOrder ? this.props.itemsPerOrder.toFixed(2) : '0', items: this.props.itemsPerOrder && this.props.itemsPerOrder.toFixed(2) <= 1 ? 'item':'items'}}/>
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

OrderListTable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    setOrderFilter: React.PropTypes.func,
    sortHeaderState: React.PropTypes.func,
    refreshOption: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    isFilterApplied: React.PropTypes.bool,
    timeZoneString: React.PropTypes.string,
    lastUpdated: React.PropTypes.string,
    responseFlag: React.PropTypes.bool
};

export default Dimensions()(OrderListTable);
