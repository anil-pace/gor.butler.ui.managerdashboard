/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {FormattedMessage, FormattedDate, injectIntl, intlShape, defineMessages} from 'react-intl';
import {connect} from 'react-redux';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';


import {
    POST, APP_JSON, REALTIME, DOWNLOAD_REPORT_REQUEST, REPORT_NAME_OPERATOR_LOGS
} from '../../constants/frontEndConstants';

import OperationsFilter from './operationsFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import {
    REQUEST_REPORT_DOWNLOAD
} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import OperationsLogTable from './operationsLogTable'

import {graphql, compose} from "react-apollo";
import {hashHistory} from 'react-router';

import gql from 'graphql-tag'

/*Intl Messages*/
const messages = defineMessages({
    genRepTooltip: {
        id: 'operationLog.genRep.tooltip',
        description: 'Tooltip to display Generate button',
        defaultMessage: 'Reports not available for Realtime filter'
    }
})

const OPS_LOG_SUBSCRIPTION_QUERY = gql`
    subscription OperationLogList($input: OperationLogListParams) {
        OperationLogList(input:$input){
            list {
                createdTime
                executionId
                operatingMode
                requestId
                userId
                productInfo{
                    id
                    quantity
                    type
                    children{
                        id
                        quantity
                        type
                    }
                }
                source{
                    id
                    type
                    children{
                        id
                        type
                    }
                }

                destination{
                    id
                    type
                    children{
                        id
                        type
                    }
                }


                stationInfo{
                    id
                    type
                }
                status{
                    data
                    type
                }
            }
        }
    }
`;

class OperationsLogTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._requestReportDownload = this._requestReportDownload.bind(this);
        this._setFilter = this._setFilter.bind(this)
        this.subscription = null
        this.state = {query: null, page: 1}


    }

    removeSubscription() {
        if (this.subscription) {
            this.subscription()
        }

        this.subscription = null
    }


    componentWillReceiveProps(nextProps) {
        if ((!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.removeSubscription()
            this.setState({query: nextProps.location.query})
            this._setFilterState(nextProps.location.query)
            let time_period = null
            try {
                time_period = nextProps.location.query.time_period
            } catch (ex) {

            }
            if (!this.subscription && nextProps.data.subscribeToMore && !time_period) {
                /**
                 * If we need to provide real time operation logs
                 * we'll show last 100 logs in a day.
                 * @type {()=>void}
                 */
                this.subscription = nextProps.data.subscribeToMore({
                    document: OPS_LOG_SUBSCRIPTION_QUERY,
                    variables: (function () {
                        return {
                            input: {
                                requestId: nextProps.location.query.request_id,
                                userId: nextProps.location.query.user_id,
                                skuId: nextProps.location.query.sku_id,
                                ppsId: nextProps.location.query.pps_id,
                                operatingMode: nextProps.location.query.operatingMode ? (Array.isArray(nextProps.location.query.operatingMode) ? nextProps.location.query.operatingMode : [nextProps.location.query.operatingMode]) : null,
                                status: nextProps.location.query.status ? (Array.isArray(nextProps.location.query.status) ? nextProps.location.query.status : [nextProps.location.query.status]) : null,
                                timePeriod: {value: 1, unit: 'd'},
                                page: 0,
                                PAGE_SIZE: 100
                            }
                        }
                    }()),
                    updateQuery: (previousResult, newResult) => {
                        return Object.assign({}, {
                            OperationLogList: {list: newResult.subscriptionData.data.OperationLogList.list}
                        })
                    },
                })
            }

        }


    }

    _setFilterState(query) {
        if (Object.keys(query).length !== 0) {
            this.props.filterApplied(true);
        } else {
            this.props.filterApplied(false);
        }
        this.props.operationsLogFilterState({
            tokenSelected: {
                "status": query.status || ["any"],
                "timeperiod": query.time_period || ['realtime'],
                "operatingMode": query.operatingMode || ['any'],
                __typename: "OperationsLogFilterTokenSelected"
            },
            searchQuery: {
                "request_id": query.request_id || null,
                "sku_id": query.sku_id || null,
                "pps_id": query.pps_id || null,
                "user_id": query.user_id || null,
                __typename: "OperationsLogFilterSearchQuery"
            },
            defaultToken: {
                "status": ["any"],
                "operatingMode": ["any"],
                "timeperiod": ["realtime"],
                __typename: "OperationsLogDefaultToken"
            }
        });
    }


    _clearFilter() {
        hashHistory.push({pathname: "/reports/operationsLog", query: {}})
    }


    _setFilter() {
        this.props.showOperationsLogFilter(!this.props.showFilter);
    }


    fetchNextResults() {
        let self = this
        self.props.data.fetchMore({
            variables: (function () {
                return {
                    input: {
                        requestId: self.props.location.query.request_id,
                        userId: self.props.location.query.user_id,
                        skuId: self.props.location.query.sku_id,
                        ppsId: self.props.location.query.pps_id,
                        operatingMode: self.props.location.query.operatingMode ? ( Array.isArray(self.props.location.query.operatingMode) ? self.props.location.query.operatingMode : [self.props.location.query.operatingMode]) : null,
                        status: self.props.location.query.status ? (Array.isArray(self.props.location.query.status) ? self.props.location.query.status : [self.props.location.query.status]) : null,
                        timePeriod: self.props.location.query.time_period ? {
                            value: self.props.location.query.time_period.split("_")[0],
                            unit: self.props.location.query.time_period.split("_")[1]
                        } : {value: 1, unit: 'd'},
                        page: self.state.page++,
                        PAGE_SIZE: 25
                    }
                }
            }()),
            updateQuery: (previousResult, newResult) => {
                return Object.assign({}, {
                    OperationLogList: {list: [...previousResult.OperationLogList.list, ...newResult.fetchMoreResult.OperationLogList.list]}
                })
            },
        })
    }

    _requestReportDownload() {
        let derivedFilters = JSON.parse(this.state.derivedFilters);
        let formData = {
            "report": {
                "requestedBy": this.props.username,
                "type": REPORT_NAME_OPERATOR_LOGS
            }
        }

        formData.searchRequest = Object.assign(derivedFilters, {
            page: {
                size: this.state.totalSize ? parseInt(this.state.totalSize, 10) : null,
                from: 0
            }
        })


        let params = {
            'url': REQUEST_REPORT_DOWNLOAD,
            'method': POST,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'formdata': formData,
            'cause': DOWNLOAD_REPORT_REQUEST
        }


        this.props.makeAjaxCall(params);
    }


    render() {
        var _this = this;
        var filterHeight = screen.height - 190 - 50;
        let data_list = []
        try {
            data_list = this.props.data.OperationLogList.list
        } catch (ex) {
        }
        return (
            <div className="gorTesting wrapper gor-operations-log">
                <div className="gor-filter-wrap"
                     style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                    <OperationsFilter refreshList={this._clearFilter.bind(this)} refreshedAt={this.props.refreshedAt}
                                      showOperationsLogFilter={this.props.showOperationsLogFilter.bind(this)}
                                      data={data_list} noResults={data_list.length === 0}
                                      filters={this.props.location.query}
                                      filterState={this.props.filterState}
                    />
                </div>
                <div className="gorToolBar">
                    <div className="gorToolBarWrap">
                        <div className="gorToolBarElements">
                            <FormattedMessage id="operationLog.table.heading" description="Heading for PPS"
                                              defaultMessage="Operations Log"/>

                        </div>
                    </div>
                    <div className="filterWrapper">

                        <div className="gorToolBarDropDown">
                            <div className="gor-button-wrap">
                                <button
                                    title={this.props.intl.formatMessage(messages.genRepTooltip)}
                                    className="gor-rpt-dwnld" onClick={this._requestReportDownload}>
                                    <FormattedMessage id="operationLog.table.downloadBtn"
                                                      description="button label for download report"
                                                      defaultMessage="Generate Report"/>
                                </button>
                                <button
                                    className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                    onClick={this._setFilter}>
                                    <div className="gor-manage-task"/>
                                    <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                      defaultMessage="Filter data"/>
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
                {this.props.location.query.time_period !== REALTIME && JSON.stringify(this.props.location.query) !== '{}' ?
                    <FilterSummary
                        noResults={data_list.length === 0}
                        total={data_list.length}
                        isFilterApplied={this.props.isFilterApplied}
                        filterText={<FormattedMessage id="operationsLog.filter.search.bar"
                                                      description='total waves for filter search bar'
                                                      defaultMessage='{total} Results found'
                                                      values={{total: data_list.length}}/>}
                        refreshList={this._clearFilter}
                        refreshText={<FormattedMessage id="operationsLog.filter.search.bar.showall"
                                                       description="button label for show all"
                                                       defaultMessage="Show all Operations"/>}/>
                    : null}
                <OperationsLogTable forceUpdate={JSON.stringify(this.props.location.query) === '{}'} data={data_list}
                                    timeOffset={_this.props.timeOffset}/>

            </div>
        );
    }
}
;

OperationsLogTab.propTypes = {
    intl: intlShape.isRequired

}

function mapStateToProps(state, ownProps) {
    return {
        timeOffset: state.authLogin.timeOffset,
        username: state.authLogin.username

    };
}
function mapDispatchToProps(dispatch) {
    return {
        makeAjaxCall: function (params) {
            dispatch(makeAjaxCall(params));
        }
    }
};

const OPS_LOG_QUERY = gql`
    query OperationLogList($input: OperationLogListParams) {
        OperationLogList(input:$input){
            list {
                createdTime
                executionId
                operatingMode
                requestId
                userId
                productInfo{
                    id
                    quantity
                    type
                    children{
                        id
                        quantity
                        type
                    }
                }
                source{
                    id
                    type
                    children{
                        id
                        type
                    }
                }

                destination{
                    id
                    type
                    children{
                        id
                        type
                    }
                }


                stationInfo{
                    id
                    type
                }
                status{
                    data
                    type
                }
            }
        }
    }
`;

const withQuery = graphql(OPS_LOG_QUERY, {
    props: function (data) {
        return {...data, refreshedAt: new Date().getTime()}
    },
    options: ({match, location}) => ({
        variables: (function () {
            return {
                input: {
                    requestId: location.query.request_id,
                    userId: location.query.user_id,
                    skuId: location.query.sku_id,
                    ppsId: location.query.pps_id,
                    operatingMode: location.query.operatingMode,
                    status: location.query.status,
                    timePeriod: location.query.time_period ? {
                        value: location.query.time_period.split("_")[0],
                        unit: location.query.time_period.split("_")[1]
                    } : {value: 1, unit: 'd'}
                }
            }
        }()),
        fetchPolicy: 'network-only'
    }),
});
const operationsLogClientData = gql`
    query  {
        operationsLogFilter @client{
            display
            isFilterApplied
            __typename
            filterState{
                tokenSelected{
                    status
                    timeperiod
                    operatingMode
                    __typename
                }
                searchQuery{
                    request_id
                    sku_id
                    pps_id
                    user_id
                    __typename
                }
                defaultToken{
                    status
                    timeperiod
                    operatingMode
                    __typename
                }
                __typename
            }

        }
    }
`;
const withClientData = graphql(operationsLogClientData, {

    props: function (data) {
        if (!data.data) {
            return {}
        }
        return {
            showFilter: data.data.operationsLogFilter.display,
            isFilterApplied: data.data.operationsLogFilter.isFilterApplied,
            filterState: JSON.parse(JSON.stringify(data.data.operationsLogFilter.filterState))
        }

    }
})


const SET_VISIBILITY = gql`
    mutation setUserFiler($filter: String!) {
        setShowOperationsLogFilter(filter: $filter) @client
    }
`;

const SET_FILTER_APPLIED = gql`
    mutation setFilterApplied($isFilterApplied: String!) {
        setFilterApplied(isFilterApplied: $isFilterApplied) @client
    }
`;
const SET_FILTER_STATE = gql`
    mutation setFilterState($state: String!) {
        setOperationsLogFilterState(state: $state) @client
    }
`;

const setVisibilityFilter = graphql(SET_VISIBILITY, {
    props: ({mutate, ownProps}) => ({
        showOperationsLogFilter: function (show) {
            mutate({variables: {filter: show}})
        },
    }),
});
const setFilterApplied = graphql(SET_FILTER_APPLIED, {
    props: ({mutate, ownProps}) => ({
        filterApplied: function (applied) {
            mutate({variables: {isFilterApplied: applied}})
        },
    }),
});
const setFilterState = graphql(SET_FILTER_STATE, {
    props: ({mutate, ownProps}) => ({
        operationsLogFilterState: function (state) {
            mutate({variables: {state: state}})
        },
    }),
});


export default compose(withQuery, withClientData, setVisibilityFilter, setFilterApplied, setFilterState)(connect(mapStateToProps, mapDispatchToProps)(Dimensions()(withRouter(injectIntl(OperationsLogTab)))))


