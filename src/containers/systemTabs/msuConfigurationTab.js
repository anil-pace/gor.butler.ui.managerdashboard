import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { hashHistory } from 'react-router';
import { modal } from 'react-redux-modal';
import Spinner from '../../components/spinner/Spinner';
import { updateSubscriptionPacket, setWsAction } from './../../actions/socketActions';
import { wsOverviewData } from './../../constants/initData.js';
import MsuConfigFilter from './msuConfigFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import ChangeRackType from './changeRackType';
import MsuRackFlex from './MsuRackFlex';
import MsuConfigTable from './msuConfigTable';
import MsuConfigConfirmation from './msuConfigConfirmation';
import { ApolloConsumer } from 'react-apollo';

import {
    WS_ONSEND
} from '../../constants/frontEndConstants';

import {SUBSCRIPTION_QUERY,
        MSU_LIST_QUERY,
        MSU_LIST_POST_FILTER_QUERY,
        MSU_START_RECONFIG_QUERY,
        MSU_STOP_RECONFIG_QUERY,
        MSU_RELEASE_QUERY,
        msuListClientData,
        SET_VISIBILITY,
        SET_FILTER_APPLIED,
        SET_FILTER_STATE
        } from './queries/msuReconfigTab';

import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag';


class MsuConfigTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: null,
            startStopBtnState: true,
            startStopBtnText: "startReconfig",
            releaseMsuBtnState: true,
            msuList: [],
            initialLoading: true,
            legacyDataSubscribed: false
        };
        this.subscription = null;
        this.linked = false;

        this._refreshMsuDataAction = this._refreshMsuDataAction.bind(this);
        this._startStopReconfigAction = this._startStopReconfigAction.bind(this);
        this._disableStartStopReconfig = this._disableStartStopReconfig.bind(this);
        this._disableReleaseMsuBtn = this._disableReleaseMsuBtn.bind(this);
        this._startStopActionInitiated = this._startStopActionInitiated.bind(this);
        this.showMsuListFilter = this.props.showMsuListFilter.bind(this);
        this._releaseMsuAction= this._releaseMsuAction.bind(this);
    }



    _requestMsuList(rackId, rackStatus) {
        if (rackId || rackStatus) {
            let msuList = [];
            this.props.client.query({
                query: MSU_LIST_POST_FILTER_QUERY,
                variables: (function () {
                    return {
                        input: {
                            id: rackId,
                            racktype: rackStatus ? rackStatus.toString() : rackStatus
                        }
                    }
                }()),
                fetchPolicy: 'network-only'
            }).then(data => {
                this.setState({
                    msuList: data.data.MsuFilterList.list,
                    initialLoading: false
                });
            });
        }
        else {
            let msuList = [];
            this.props.client.query({
                query: MSU_LIST_QUERY,
                variables: {},
                fetchPolicy: 'network-only'
            }).then(data => {
                this.setState({
                    msuList: data.data.MsuList.list,
                    initialLoading: false
                });
            })
        }
    }

    _refreshMsuDataAction = () => {
        this._refreshList(this.props.location.query);
    }

    _releaseMsuAction() {
        let msuList = [];
        this.props.client.query({
            query: MSU_RELEASE_QUERY,
            variables: {},
            fetchPolicy: 'network-only'
        }).then(data => {
            this.setState({
                releaseMsuBtnState: true
            })
        })
    }


    _startStopActionInitiated() {
        if (this.state.startStopBtnText === "startReconfig") {
            this.props.client.query({
                query: MSU_START_RECONFIG_QUERY,
                variables: {},
                fetchPolicy: 'network-only'
            }).then(data => {
                this.setState({
                    startStopBtnState: true,
                    startStopBtnText: "stopReconfig"
                })
            })
        }
        else {
            this.props.client.query({
                query: MSU_STOP_RECONFIG_QUERY,
                variables: {},
                fetchPolicy: 'network-only'
            }).then(data => {
                this.setState({
                    startStopBtnState: true,
                    startStopBtnText: "startReconfig"
                })
            })
        }
    }

    _startStopReconfigAction = () => {
        modal.add(MsuConfigConfirmation, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            startStopActionInitiated: this._startStopActionInitiated,
            activeBtnText: this.state.startStopBtnText
        });
    }

    manipulateButtonActions(arg) {
        let isAnyMsuEmpty = [];
        let isAnyMsuDropping = [];
        let isAnyMsuDropped = [];
        let isAnyMsuReadyForReconfig = [];
        let isAnyMsuStoringBack = [];


        if (arg.length > 0) {
            arg.forEach((eachMsu) => {
                if (eachMsu.status === "reconfig_ready") { isAnyMsuEmpty.push(eachMsu.status); }
                else if (eachMsu.status === "waiting") { isAnyMsuDropping.push(eachMsu.status); }
                else if (eachMsu.status === "dropped") { isAnyMsuDropped.push(eachMsu.status); }
                else if (eachMsu.status === "ready_for_reconfiguration") { isAnyMsuReadyForReconfig.push(eachMsu.status); }
                else if (eachMsu.status === "storing_back") { isAnyMsuStoringBack.push(eachMsu.status); }
            });

            let checkAnyEmptyMsuFound = (isAnyMsuEmpty.length > 0 ? true : false);
            let checkAnyMsuInProgressFound = ((isAnyMsuDropping.length > 0 ? true : false) ||
                (isAnyMsuDropped.length > 0 ? true : false) ||
                (isAnyMsuReadyForReconfig.length > 0 ? true : false) ||
                (isAnyMsuStoringBack.length > 0 ? true : false)
            );

            // atleast 1 MSU is Empty and no MSU is in progress
            if (checkAnyEmptyMsuFound && !checkAnyMsuInProgressFound) {
                // START button should be enabled
                this.setState({
                    startStopBtnText: "startReconfig"
                });
                this._disableStartStopReconfig(false);

            }
            else if (checkAnyMsuInProgressFound) {
                // STOP button should be enabled
                this.setState({
                    startStopBtnText: "stopReconfig"
                });
                this._disableStartStopReconfig(false);

            }
            else {
                // START/STOP button should be DISABLED
                this._disableStartStopReconfig(true);
            }


            // check for handling Release Button 
            if (isAnyMsuReadyForReconfig.length > 0) {
                this._disableReleaseMsuBtn(false);
            } else {
                this._disableReleaseMsuBtn(true);
            }
        }
    }


    componentWillReceiveProps(nextProps) {

        if (!this.state.legacyDataSubscribed && nextProps.socketAuthorized) {
            this.setState({
                legacyDataSubscribed: true
            }, () => {
                this._subscribeLegacyData()
            })
        }

        if (nextProps.location && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({ query: nextProps.location.query })
            this._refreshList(nextProps.location.query)
        }
        if (this.state.initialLoading === true && nextProps.data.MsuList) {
            this.manipulateButtonActions(nextProps.data.MsuList.list);
        }
        else {
            this.manipulateButtonActions(this.state.msuList);
        }
    }

    _subscribeLegacyData() {
        this.props.initDataSentCall(wsOverviewData["default"]);
    }

    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList(query) {
        let filterUrl = Object.assign({}, query);
        this._requestMsuList(query.rack_id, query.status);

        if (Object.keys(query).length > 0) {
            this.props.filterApplied(true);
        } else {
            this.props.filterApplied(false);
        }

        this.props.msuConfigFilterState({
            tokenSelected: { __typename: "MsuReconfigTokenSelected", "STATUS": query.status ? query.status.constructor === Array ? query.status : [query.status] : ["any"] },
            searchQuery: {
                __typename: "MsuReconfigSearchQuery",
                "MSU_ID": query.rack_id || null
            },
            defaultToken: { "STATUS": ["any"], __typename: "MsuReconfigTokenSelected" }
        });
    }


    _blockPutAndChangeTypeCallback() {
        hashHistory.push({ pathname: "/system/msuConfiguration", query: {} })
        this.props.filterApplied(false);
        this._requestMsuList();
        this.setState({
            initialLoading: true
        });
    }


    _clearFilter() {
        hashHistory.push({ pathname: "/system/msuConfiguration", query: {} });
        this._requestMsuList();
        this.setState({
            initialLoading: true
        });
    }

    _disableStartStopReconfig(isDisabled) {
        this.setState({
            startStopBtnState: isDisabled || false,
        })
    }

    _disableReleaseMsuBtn(isDisabled) {
        this.setState({
            releaseMsuBtnState: isDisabled || false,
        })
    }

    render() {
        var filterHeight = screen.height - 190 - 50;
        let msuListData = this.state.msuList;
        let noData = <FormattedMessage id="msuConfig.table.noMsuData" description="Heading for no Msu Data" defaultMessage="No MSUs with blocked puts" />;
        return (
            <div>
                <div>
                    <div className="gorTesting">
                        {this.props.data.loading && <Spinner isLoading={this.props.data.loading} setSpinner={null} />}
                        {msuListData ?
                            <div>
                                <div className="gor-filter-wrap"
                                    style={{ 'width': this.props.showFilter ? '350px' : '0px', height: filterHeight }}>
                                    <MsuConfigFilter
                                        filterState={this.props.msuListFilterStatus}
                                        isFilterApplied={this.props.isFilterApplied}
                                        showMsuListFilter={this.showMsuListFilter}
                                        msuConfigFilterState={this.props.msuConfigFilterState}
                                        msuListData={msuListData}
                                        responseFlag={this.props.responseFlag} />
                                </div>


                                <div className="gorToolBar">
                                    <div style={{ width: "auto" }} className="gorToolBarWrap">
                                        <div className="gorToolBarElements">
                                            <FormattedMessage id="msuConfig.table.heading"
                                                description="Heading for msu Configuration"
                                                defaultMessage="MSU Configuration" />
                                        </div>
                                    </div>


                                    <div className="filterWrapper">

                                        <div style={{ paddingLeft: "0px" }} className="gorToolBarDropDown">
                                            <div className="gor-button-wrap">
                                                <button className="gor-msuConfig-btn grey"
                                                    onClick={this._refreshMsuDataAction}>
                                                    <div className="gor-refresh-whiteIcon" />
                                                    <FormattedMessage id="gor.msuConfig.refreshData"
                                                        description="button label for refresh data"
                                                        defaultMessage="REFRESH DATA" />
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ paddingLeft: "0px" }} className="gorToolBarDropDown">
                                            <div className="gor-button-wrap">
                                                <button disabled={this.state.releaseMsuBtnState}
                                                    className="gor-msuConfig-btn grey"
                                                    onClick={this._releaseMsuAction}>
                                                    <FormattedMessage id="gor.msuConfig.releaseMsu"
                                                        description="button label for release msu"
                                                        defaultMessage="RELEASE MSU(S)" />
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ paddingLeft: "0px" }} className="gorToolBarDropDown">
                                            <div className="gor-button-wrap">
                                                <button disabled={this.state.startStopBtnState}
                                                    style={{ minWidth: "145px" }}
                                                    className="gor-msuConfig-btn orange"
                                                    onClick={this._startStopReconfigAction}>

                                                    {this.state.startStopBtnText === "startReconfig" ?
                                                        <FormattedMessage id="gor.msuConfig.startReconfig"
                                                            description="button label for start reconfig"
                                                            defaultMessage="START RECONFIG" /> :
                                                        <FormattedMessage id="gor.msuConfig.StopReconfig"
                                                            description="button label for Stop reconfig"
                                                            defaultMessage="STOP RECONFIG" />
                                                    }

                                                </button>
                                            </div>
                                        </div>


                                        <div style={{ paddingLeft: "0px" }} className="gorToolBarDropDown">
                                            <div className="gor-button-wrap">
                                                <button style={{ minWidth: "145px" }}
                                                    className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                                    onClick={() => { this.showMsuListFilter(true) }}>
                                                    <div className="gor-manage-task" />
                                                    <FormattedMessage id="gor.msuConfig.filterLabel"
                                                        description="button label for filter"
                                                        defaultMessage="FILTER DATA" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Filter Summary*/}
                                <FilterSummary total={msuListData.length || 0}
                                    isFilterApplied={this.props.isFilterApplied}
                                    responseFlag={this.props.responseFlag}
                                    filterText={<FormattedMessage id="msuConfig.filter.search.bar"
                                        description='total msus for filter search bar'
                                        defaultMessage='{total} MSU found'
                                        values={{ total: msuListData.length || 0 }} />}
                                    refreshList={this._clearFilter.bind(this)}
                                    refreshText={<FormattedMessage id="msuConfig.filter.search.bar.showall"
                                        description="button label for show all"
                                        defaultMessage="Show all MSUs with blocked puts" />} />
                            </div> : null}

                        {msuListData.length === 0 ? (<div className="noDataWrapper"> {noData} </div>) :
                            (<MsuConfigTable items={msuListData}
                                intlMessg={this.props.intlMessages}
                                showFilter={this.props.showFilter}
                                isFilterApplied={this.props.isFilterApplied}
                                setFilter={this.props.showTableFilter}
                                refreshList={this._clearFilter.bind(this)}
                                blockPutAndChangeTypeCallback={this._blockPutAndChangeTypeCallback.bind(this)}
                            />)}
                    </div>
                </div>
            </div>
        );
    }
};

const withQuery = graphql(MSU_LIST_QUERY, {
    props: (data) => (data),
    options: ({ match, location }) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});


const withClientData = graphql(msuListClientData, {
    props: function (data) {
        return {
            showFilter: data.data.msuListFilter ? data.data.msuListFilter.display : false,
            isFilterApplied: data.data.msuListFilter ? data.data.msuListFilter.isFilterApplied : false,
            msuListFilterStatus: data.data.msuListFilter ? JSON.parse(JSON.stringify(data.data.msuListFilter.filterState)) : null,
        }
    }
})

const setVisibilityFilter = graphql(SET_VISIBILITY, {
    props: ({ mutate, ownProps }) => ({
        showMsuListFilter: function (show) {
            mutate({ variables: { filter: show } })
        },
    }),
});
const setFilterApplied = graphql(SET_FILTER_APPLIED, {
    props: ({ mutate, ownProps }) => ({
        filterApplied: function (applied) {
            mutate({ variables: { isFilterApplied: applied } })
        },
    }),
});
const setFilterState = graphql(SET_FILTER_STATE, {
    props: ({ mutate, ownProps }) => ({
        msuConfigFilterState: function (state) {
            mutate({ variables: { state: state } })
        },
    }),
});



MsuConfigTab.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
MsuConfigTab.PropTypes = {
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func
};

function mapStateToProps(state, ownProps) {
    return {
        intlMessages: state.intl.messages,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
    };
}


var mapDispatchToProps = function (dispatch) {
    return {
        initDataSentCall: function (data) {
        dispatch(setWsAction({ type: WS_ONSEND, data: data }));
        }
    }
}

export default compose(
    withClientData,
    setVisibilityFilter,
    setFilterApplied,
    setFilterState,
    withQuery,
    withApollo
)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(MsuConfigTab)));
