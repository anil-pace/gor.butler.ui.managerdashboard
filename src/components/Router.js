/**
 * Importing Router dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { loginRequest } from '../actions/loginAction';
import Overview from '../containers/OverviewTab';
import { tabSelected, subTabSelected } from '../actions/tabSelectAction';
import { setInventorySpinner } from '../actions/inventoryActions';
import { setAuditSpinner } from '../actions/auditActions';
import { setOrderListSpinner } from '../actions/orderListActions';
import { setWavesSpinner, setButlerSpinner, setPpsSpinner, setCsSpinner, setUserSpinner } from '../actions/spinnerAction';
import { AUDIT, ORDERLIST, WAVES, BUTLERBOTS, PPS, CHARGING, USER, MSU } from '../constants/appConstants';
import { OVERVIEW, TAB_ROUTE_MAP, INVENTORY } from '../constants/frontEndConstants';
import { translationMessages } from '../utilities/i18n';
import { updateIntl } from 'react-intl-redux';
import OverviewTab from '../containers/OverviewTab';
import SystemTab from '../containers/systemTab';
import SystemOverview from '../containers/systemTabs/sysOverview';
import ppsTab from '../containers/systemTabs/pps/ppsTab';
import butlerbotTab from '../containers/systemTabs/butlerbotTab';
import chargingStationsTab from '../containers/systemTabs/chargingStationsTab';
import sysControllers from '../containers/systemTabs/sysControllers';
import ppsConfigurationTab from '../containers/systemTabs/ppsConfigurationTab';
import msuConfigurationTab from '../containers/systemTabs/msuConfigurationTab';
import orderListTab from '../containers/orderTab/orderListTab';
import auditSubTabs from '../containers/auditTab/auditSubTabs';
import auditListing from '../containers/auditListing';
import itemSearch from '../containers/auditTab/itemSearch';
import inventoryTab from '../containers/inventoryTab';
import usersTab from '../containers/userTab/usersTab';
import utilityTab from '../containers/utilityTab';
import reportsTab from '../containers/reportsTab/reportsTab';
import operationsLogTab from '../containers/reportsTab/operationsLogTab';
import downloadReportTab from '../containers/reportsTab/downloadReportTab';
import storageSpaceTab from '../containers/reportsTab/storageSpaceTab';
import misc from '../containers/reportsTab/misc';

class Routes extends React.Component {


    _requireAuth(nextState, replace) {
        if (sessionStorage.getItem('auth_token')) {
            let subTab = (sessionStorage.getItem('subTab') || null);
            let nextView = (sessionStorage.getItem('nextUrl') || 'md');
            let selTab = (sessionStorage.getItem('selTab') || TAB_ROUTE_MAP[OVERVIEW]);
            this.props.loginRequest();
            this.props.tabSelected(selTab);
            this.props.subTabSelected(subTab);
            switch (selTab.toUpperCase()) {
                case INVENTORY:
                    this.props.setInventorySpinner(true);
                    break;

                case AUDIT:
                    this.props.setAuditSpinner(true);
                    break;
                case USER:
                    this.props.setUserSpinner(true);
                    break;

                default:
                    this.props.setInventorySpinner(false);
                    this.props.setAuditSpinner(false);
                    this.props.setUserSpinner(false);

            }
            if (subTab !== null) {
                switch (subTab.toUpperCase()) {
                    case ORDERLIST:
                        this.props.setOrderListSpinner(true);
                        break;

                    case WAVES.toUpperCase():
                        this.props.setWavesSpinner(true);
                        break;

                    case BUTLERBOTS.toUpperCase():
                        this.props.setButlerSpinner(true);
                        break;

                    case PPS.toUpperCase():
                        this.props.setPpsSpinner(true);
                        break;

                    case MSU.toUpperCase():
                        this.props.setPpsSpinner(true);
                        break;

                    case CHARGING.toUpperCase():
                        this.props.setCsSpinner(true);
                        break;

                    case WAVES.toUpperCase():
                        this.props.setWavesSpinner(true);
                        break;


                    default:
                        this.props.setWavesSpinner(false);
                        this.props.setButlerSpinner(false);
                        this.props.setPpsSpinner(false);
                        this.props.setCsSpinner(false);
                        this.props.setWavesSpinner(false);
                }
            }
            replace(nextView)
        }
    }

    _refreshPage(nextState, replace) {
        if (sessionStorage.getItem('auth_token')) {
            this._requireAuth.call(this, nextState, replace);
        }

    }

    _handleNavigationChanges(context, replace) {
        let pathname = context.location.pathname

        pathname = pathname.substring(1, pathname.length)
        let navigator = pathname.split("/")
        sessionStorage.setItem("selTab", navigator[0])
        sessionStorage.setItem("nextView", pathname)
        if (navigator.length > 1) {
            sessionStorage.setItem("subTab", navigator[1])
            this.props.subTabSelected(navigator[1]);
        } else {
            sessionStorage.removeItem("subTab")
            this.props.subTabSelected(null);
        }

        this.props.tabSelected(navigator[0]);


    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route onEnter={this._handleNavigationChanges.bind(this)} name="default" path="/"
                    getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('../App').default);
                        }, "defaultApp");
                    }}
                />
                <Route name="login" path="/login" onEnter={this._refreshPage.bind(this)}
                    getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('./login/login').default);
                        }, "login");
                    }}
                />
                <Route onEnter={this._handleNavigationChanges.bind(this)} name="app" path="/md"
                    getComponent={(location, callback) => {
                        require.ensure([], function (require) {
                            callback(null, require('../App').default);
                        }, "app");
                    }}
                >
                    <IndexRoute
                        component={OverviewTab}
                    />
                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="system" path="/system" className="gorResponsive"
                        component={SystemTab}
                       
                    >
                        <IndexRoute
                        component={SystemOverview}
                        />
                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="sysOverview" path="/system/sysOverview"
                            component={SystemOverview}
                        />
                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="butlerbots" path="/system/butlerbots"
                            component={butlerbotTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="pps" path="/system/pps"
                            component = {ppsTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="chargingstation" path="/system/chargingstation"
                            component = {chargingStationsTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="sysControllers" path="/system/sysControllers"
                           component={sysControllers}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="ppsConfiguration" path="/system/ppsConfiguration"
                            component={ppsConfigurationTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="msuConfiguration" path="/system/msuConfiguration"
                            component={msuConfigurationTab}
                        />

                    </Route>

                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="orders" path="/orders"
                       component = {orderListTab}
                    />
                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="audit" path="/audit" className="gorResponsive"
                        component={auditSubTabs}
                    >
                        <IndexRoute
                        component={auditListing}
                        />
                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="auditlisting" path="/audit/auditlisting"
                            component={auditListing}
                        />
                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="itemsearch" path="/audit/itemsearch"
                           component={itemSearch}
                        />
                    </Route>



                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="inventory" path="/inventory"
                        component={inventoryTab}
                    />

                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="users" path="/users"
                       component= {usersTab}
                    />

                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="utilities" path="/utilities"
                        component = {utilityTab}
                    />

                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="overview" path="/overview"
                       component = {OverviewTab}
                    />


                    <Route onEnter={this._handleNavigationChanges.bind(this)} name="reports" path="/reports"
                        component = {reportsTab}
                    >
                        <IndexRoute
                            component = {operationsLogTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="operationsLog" path="/reports/operationsLog"
                            component = {operationsLogTab}
                        />



                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="downloadReport" path="/reports/downloadReport"
                           component = {downloadReportTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="storageSpace" path="/reports/storageSpace"
                            component = {storageSpaceTab}
                        />

                        <Route onEnter={this._handleNavigationChanges.bind(this)} name="misc" path="/reports/misc"
                            component = {misc}                           
                        />


                    </Route>

                </Route>
            </Router>
        )
    }

}


var mapDispatchToProps = function (dispatch) {
    return {
        updateIntl: function (params) {
            dispatch(updateIntl(params));
        },
        loginRequest: function () {
            dispatch(loginRequest());
        },
        tabSelected: function (data) {
            dispatch(tabSelected(data))
        },
        subTabSelected: function (data) {
            dispatch(subTabSelected(data))
        },
        setInventorySpinner: function (data) {
            dispatch(setInventorySpinner(data));
        },
        setAuditSpinner: function (data) {
            dispatch(setAuditSpinner(data))
        },
        setButlerSpinner: function (data) {
            dispatch(setButlerSpinner(data))
        },
        setOrderListSpinner: function (data) {
            dispatch(setOrderListSpinner(data))
        },
        setWavesSpinner: function (data) {
            dispatch(setWavesSpinner(data))
        },
        setPpsSpinner: function (data) {
            dispatch(setPpsSpinner(data))
        },
        setCsSpinner: function (data) {
            dispatch(setCsSpinner(data))
        },
        setUserSpinner: function (data) {
            dispatch(setUserSpinner(data))
        },
    }

};

function mapStateToProps(state, ownProps) {

    return {
        config: state.config || {}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Routes);