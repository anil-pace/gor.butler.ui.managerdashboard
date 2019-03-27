import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import FilterSummary from '../../components/tableFilter/filterSummary';
import {
    SortHeaderCell,
    tableRenderer,
    TextCell,
    PPSComponentCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData,
    ConnectionDetailsCell,
    OperatingModeCell
} from '../../components/commonFunctionsDataTable';
import { defineMessages } from 'react-intl';
import { withRouter } from 'react-router';
import { stringConfig } from '../../constants/backEndConstants';
import { GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT, WS_ONSEND } from '../../constants/frontEndConstants';
import { setWsAction } from '../../actions/socketActions';
import {
    CONTROLLER_SENSOR_TRIGGERED_MESSAGES,
    CONTROLLER_ACTION_TRIGGERED_MESSAGES
} from '../../constants/messageConstants';
import Filter from '../../components/tableFilter/filter';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {
    showTableFilter,
    filterApplied
} from '../../actions/filterAction';




class SystemControllers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
        this._clearFilter = this._clearFilter.bind(this);
        this._sortTableData = this._sortTableData.bind(this);

    }

    _getInitialState() {
        var data = this._processData(this.props.controllers.slice(0));
        var dataList = new tableRenderer(data.length);
        dataList.newData = data;
        return {
            columnWidths: {
                id: this.props.containerWidth * 0.15,
                status: this.props.containerWidth * 0.1,
                location: this.props.containerWidth * 0.13,
                connectionDetails: this.props.containerWidth * 0.2,
                operatingMode: this.props.containerWidth * 0.4
            },
            sortOrder: {
                controller_id: "ASC",
                statusText: "ASC"
            },
            dataList: dataList,
            query: this.props.location.query,
            locale: this.context.intl.locale,
            subscribed: false,
            queryApplied: Object.keys(this.props.location.query).length ? true : false
        }
    }


    _processData(data) {
        //var data=this.props.controllers.slice(0);
        var dataLen = data.length;
        var processedData = [];
        if (dataLen) {
            for (let i = 0; i < dataLen; i++) {
                let rowObj = {};
                rowObj = Object.assign({}, data[i])
                if (data[i].status === "connected") {
                    rowObj.statusText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else {
                    rowObj.statusText = this.context.intl.formatMessage(stringConfig.disconnected)
                }
                if (data[i].zigbee_network === "connected") {
                    rowObj.zigbeeText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else {
                    rowObj.zigbeeText = this.context.intl.formatMessage(stringConfig.disconnected)
                }
                if (data[i].ethernet_network === "connected") {
                    rowObj.ethernetText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else {
                    rowObj.ethernetText = this.context.intl.formatMessage(stringConfig.disconnected)
                }
                if (rowObj.sensor_activated === "button_press") {
                    rowObj.sensor_activated_text = CONTROLLER_SENSOR_TRIGGERED_MESSAGES[rowObj.sensor]
                }
                else if (rowObj.sensor_activated === "none") {
                    rowObj.sensor_activated_text = "";
                }
                else {
                    rowObj.sensor_activated_text = CONTROLLER_SENSOR_TRIGGERED_MESSAGES[rowObj.sensor_activated];
                }
                rowObj.action_triggered_text = CONTROLLER_ACTION_TRIGGERED_MESSAGES[rowObj.action_triggered];

                processedData.push(rowObj)
            }
        }
        return processedData
    }

    _sortTableData(column, direction) {
        var _this = this;
        var data = JSON.parse(JSON.stringify(_this.state.dataList.newData));
        var dataList;
        var sortOrder = JSON.parse(JSON.stringify(_this.state.sortOrder));

        data.sort(function (current, next) {
            let result = direction === "ASC" ? next[column].toLowerCase().localeCompare(current[column].toLowerCase(), _this.state.locale)
                : current[column].toLowerCase().localeCompare(next[column].toLowerCase(), _this.state.locale);
            return result <= 0 ? false : true;

        })
        dataList = new tableRenderer(data.length);
        dataList.newData = data;
        sortOrder[column] = sortOrder[column] === "ASC" ? "DESC" : "ASC";
        _this.setState({
            dataList,
            hasStateChanged: !_this.state.hasStateChanged,
            sortOrder
        })
    }


    _clearFilter() {
        this.setState({
            subscribed: false
        }, function () {
            this.props.router.push({ pathname: "/system/sysControllers" })
        })

    }


    _refreshList(query) {
        var filterSubsData = {};
        var updatedWsSubscription = JSON.parse(JSON.stringify(this.props.wsSubscriptionData));
        if (query && query.zone_id) {
            filterSubsData["zone_id"] = ['=', query.zone_id]
        }
        updatedWsSubscription["controllers"].data[0].details["filter_params"] = filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["controllers"])
    }



    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.hasDataChanged !== this.props.hasDataChanged) ||
            (nextState.hasStateChanged !== this.state.hasStateChanged));
    }


    componentWillReceiveProps(nextProps) {
        if ((nextProps.socketAuthorized && !this.state.subscribed) || (JSON.stringify(this.props.location.query) !== JSON.stringify(nextProps.location.query))) {
            this.setState({
                subscribed: true,
                queryApplied: Object.keys(this.props.location.query).length ? true : false
            }, function () {
                this._refreshList(nextProps.location.query)
            })
        }
        if (this.props.hasDataChanged !== nextProps.hasDataChanged) {
            let data = this._processData(nextProps.controllers.slice(0));
            let dataList = new tableRenderer(data.length)
            dataList.newData = data;
            this.setState({
                dataList,
                queryApplied: Object.keys(nextProps.location.query).length ? true : false
            })
        }
    }
    componentWillMount() {
        if (this.props.socketAuthorized && !this.state.subscribed) {
            this.setState({
                subscribed: true,
                queryApplied: Object.keys(this.props.location.query).length ? true : false
            }, function () {
                this._refreshList(this.props.location.query)
            })
        }
    }



    render() {
        var { dataList } = this.state;
        var filterHeight = screen.height - 190 - 50;

        return (
            <div className="gorTableMainContainer gor-sys-controller">

                <div className="gorToolBar">
                    <div className="gorToolBarWrap">
                        <div className="gorToolBarElements">
                            <FormattedMessage id="sysController.table.heading" description="Heading for PPS"
                                defaultMessage="System Controllers" />

                        </div>
                    </div>

                </div>
                <FilterSummary total={dataList.getSize() || 0} isFilterApplied={this.state.queryApplied} responseFlag={null}
                    refreshList={this._clearFilter}
                    refreshText={<FormattedMessage id="sysController.summary.showall"
                        description="button label for show all"
                        defaultMessage="Show all Zones" />} />

                <Table
                    rowHeight={80}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={null}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={document.documentElement.clientHeight * 0.6}
                    {...this.props}>
                    <Column
                        columnKey="controller_id"
                        header={


                            <SortHeaderCell onSortChange={() => this._sortTableData("controller_id", this.state.sortOrder.controller_id)}
                                sortDir={this.state.sortOrder.controller_id}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="sysControllers.idColumn.heading"
                                        description='CONTROLLER ID'
                                        defaultMessage='CONTROLLER ID' />
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="sysControllers.totalControllers"
                                            description='total controllers'
                                            defaultMessage='Total:{count}'
                                            values={{ count: (dataList.getSize() || 0) }} />

                                    </div>

                                </div>

                            </SortHeaderCell>


                        }
                        cell={<TextCell data={dataList} classKey={"id"} />}
                        fixed={true}
                        width={this.state.columnWidths.id}
                        isResizable={true}
                    />
                    <Column
                        columnKey="statusText"
                        header={
                            <SortHeaderCell onSortChange={() => this._sortTableData("statusText", this.state.sortOrder.statusText)}

                                sortDir={this.state.sortOrder.statusText}>

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.status" description="Status for PPS"
                                        defaultMessage="STATUS" />
                                    <div className="gorToolHeaderSubText" />
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={dataList} setClass={"status"} />}
                        fixed={true}
                        width={this.state.columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey={null}
                        header={
                            <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.location" description="Location"
                                        defaultMessage="LOCATION" />
                                    <div className="gorToolHeaderSubText" />
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} classKey={"location"} childrenClass="location" childColumnKey="zone_id">
                            <span ></span>
                        </TextCell>}
                        fixed={true}
                        width={this.state.columnWidths.location}
                        isResizable={true}
                    />
                    <Column
                        columnKey={"ethernetText"}

                        header={
                            <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.conDetails" description="Status for PPS"
                                        defaultMessage="CONNECTION DETAILS" />
                                    <div className="gorToolHeaderSubText" />
                                </div>
                            </Cell>
                        }
                        cell={<ConnectionDetailsCell data={dataList} subColumnKey={"zigbeeText"} classKey={"connectionDetails"}>
                            <FormattedMessage id="sysController.table.ethernetStatus" description='sysController.table.ethernetStatus'
                                defaultMessage='Ethernet Network: '
                            />
                            <FormattedMessage id="sysController.table.zigbeeStatus" description='sysController.table.zigbeeStatus'
                                defaultMessage='Zigbee Network: '
                            />

                        </ConnectionDetailsCell>}
                        fixed={true}
                        width={this.state.columnWidths.connectionDetails}
                        isResizable={true}
                    />
                    <Column
                        columnKey="action_triggered_text"
                        header={
                            <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="sysController.table.operatingMode" description="Status for PPS"
                                        defaultMessage="OPERATING MODE" />
                                    <div className="gorToolHeaderSubText" />


                                </div>
                            </Cell>
                        }
                        cell={<OperatingModeCell data={dataList} subColumnKey={"sensor_activated_text"} classKey={"action_triggered"} />}
                        fixed={true}
                        width={this.state.columnWidths.operatingMode}
                        isResizable={true}
                    />

                </Table>
                {!this.props.controllers.length && <div className="gor-no-data"><FormattedMessage id="sysControllers.table.noData"
                    description="No data message for PPStable"
                    defaultMessage="No Controllers Found" /></div>}
            </div>
        );
    }
}

SystemControllers.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
function mapStateToProps(state, ownProps) {
    return {
        controllers: state.sysControllersReducer.controllers || [],
        hasDataChanged: state.sysControllersReducer.hasDataChanged,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket

    };
}

function mapDispatchToProps(dispatch) {
    return {
        initDataSentCall: function (data) { dispatch(setWsAction({ type: WS_ONSEND, data: data })); }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(withRouter(SystemControllers)));