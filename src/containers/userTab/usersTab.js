import React  from 'react';
import UserDataTable from './userTabTable';
import {connect} from 'react-redux';
import {defineMessages} from 'react-intl';
import {userRequest} from '../../actions/userActions';
import {stringConfig} from '../../constants/backEndConstants'
import {userHeaderSort, userHeaderSortOrder, userFilterDetail} from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT, INITIAL_HEADER_ORDER, GET_ROLES, GET, APP_JSON,WS_ONSEND} from '../../constants/frontEndConstants';
import {showTableFilter, filterApplied,userfilterState,toggleUserFilter} from '../../actions/filterAction';
import {ROLE_URL} from '../../constants/configConstants';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {hashHistory} from 'react-router'
import {userFilterApplySpinner}  from '../../actions/spinnerAction';
import {modal} from 'react-redux-modal';
import AddUser from './addNewUser';
import UserFilter from './userFilter';
import {FormattedMessage} from 'react-intl';
import FilterSummary from '../../components/tableFilter/filterSummary'
//Mesages for internationalization
const messages=defineMessages({
    userOperator: {
        id: "userDetails.operator",
        defaultMessage: "Operator"
    },
    userManager: {
        id: "userDetails.manager",
        defaultMessage: "Manager"
    },
    userPick: {
        id: "userDetails.pick.status",
        defaultMessage: "Pick"
    },
    auditCompletedStatus: {
        id: "auditdetail.completed.status",
        defaultMessage: "Completed"
    },
    userPut: {
        id: "userDetails.put.status",
        defaultMessage: "Put"
    },
    userAudit: {
        id: "userDetails.audit.status",
        defaultMessage: "Audit"
    },
    userFront: {
        id: "userDetails.front.status",
        defaultMessage: "Front"
    },
    userBack: {
        id: "userDetails.back.status",
        defaultMessage: "Back"
    },
    userOnline: {
        id: "userDetails.online.status",
        defaultMessage: "Online"
    },
    userOffline: {
        id: "userDetails.offline.status",
        defaultMessage: "Offline"
    },
    userLocation: {
        id: "userDetails.location",
        defaultMessage: "PPS {ppsId}"
    }


});


class UsersTab extends React.Component {
    constructor(props) {
        super(props);
        this.state={query:null}
    }

    componentDidMount() {
        let userData={
            'url': ROLE_URL,
            'method': GET,
            'cause': GET_ROLES,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.userRequest(userData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketAuthorized && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})
            this._refreshList(nextProps.location.query)
        }
    }
    _processUserDetails() {
        var nProps=this,
            data=nProps.props.userdetails
        let operator=nProps.context.intl.formatMessage(messages.userOperator);
        let manager=nProps.context.intl.formatMessage(messages.userManager);
        let pick=nProps.context.intl.formatMessage(stringConfig.pick);
        let put=nProps.context.intl.formatMessage(stringConfig.put);
        let audit=nProps.context.intl.formatMessage(stringConfig.audit);
        let front=nProps.context.intl.formatMessage(messages.userFront);
        let back=nProps.context.intl.formatMessage(messages.userBack);
        let online=nProps.context.intl.formatMessage(stringConfig.online);
        let offline=nProps.context.intl.formatMessage(stringConfig.offline);
        var role={"butler_ui": operator, "butler_supervisor": manager};
        var work_mode={"pick": pick, "put": put, "audit": audit};
        var work_place={"front": front, "back": back};


        var userDetails=[], userData={};
        for (var i=data.length - 1; i >= 0; i--) {

            userData.id=(data[i].first_name || "--") + " " + (data[i].last_name || "--");
            if (data[i].logged_in) {
                userData.status=online;
                userData.statusClass="online";
                if (data[i].pps.pps_mode && data[i].pps.seat_type) {
                    userData.workMode=work_mode[data[i].pps.pps_mode] + " " + work_place[data[i].pps.seat_type];
                }

                else if (data[i].pps.pps_mode) {
                    userData.workMode=work_mode[data[i].pps.pps_mode];
                }

                userData.location=nProps.context.intl.formatMessage(messages.userLocation, {"ppsId": data[i].pps.pps_id});
                userData.logInTime=nProps.context.intl.formatTime(data[i].login_time, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12:false
                    }) +
                    " (" + nProps.context.intl.formatRelative(data[i].login_time) + ")";
                ;

            }

            else {
                userData.status=offline;
                userData.statusClass="offline";
                userData.workMode="--";
                userData.location="--";
                userData.logInTime="--";
            }


            userData.uid=data[i].user_id
            userData.userName=data[i].user_name;
            userData.first=data[i].first_name;
            userData.last=data[i].last_name;
            userData.roleId=data[i].role;
            if (role.hasOwnProperty(data[i].role)) {
                userData.role=role[data[i].role];
            }
            else {
                userData.role=data[i].role;
            }
            userDetails.push(userData);
            userData={};
        }

        return userDetails;
    }

    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList(query) {
        this.props.userFilterApplySpinner(true);
        let filterSubsData={}
        if (query.username) {
            let name_query=query.username.split(" ")
            name_query=name_query.filter(function (word) {
                return !!word
            })
            filterSubsData["username"]=name_query.length > 1 ? name_query : name_query.join("").trim();
        }
        if (query.status) {
            query.status=query.status.constructor=== Array ? query.status : [query.status]
            if (query.status.length !== 2) {
                filterSubsData["logged_in"]=['is',query.status[0]=== 'online' ?'true' : 'false']
            }

        }
        if (query.role) {
            query.role=query.role.constructor===Array?query.role:[query.role]
            filterSubsData["role"]=['in', query.role.constructor===Array?query.role:[query.role]]
        }
        if (query.mode) {
            let pps_list=[]
            query.mode=query.mode.constructor===Array?query.mode:[query.mode]
            query.mode.forEach(function (mode) {
                pps_list.push(mode.split("__").length > 1 ? {
                    pps_mode: mode.split("__")[0],
                    seat_type: mode.split("__")[1]
                } : {pps_mode: mode.split("__")[0]})
            })
            filterSubsData["pps"]=['in', pps_list]
        }
        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleUserFilter(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleUserFilter(false);
            this.props.filterApplied(false);
        }
        let updatedWsSubscription=this.props.wsSubscriptionData;
        updatedWsSubscription["users"].data[0].details["filter_params"]=filterSubsData;
        this.props.initDataSentCall(updatedWsSubscription["users"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.userfilterState({
            tokenSelected: {
                "STATUS": query.status||["all"],
                "ROLE": query.role||['all'],
                "WORK MODE": query.mode||['all'],
                "LOCATION": ["all"]
            }, searchQuery: {"USER NAME": query.username || null},
            defaultToken: {"STATUS": ["all"], "ROLE": ["all"], "WORK MODE": ["all"], "LOCATION": ["all"]}
        });
    }

    /**
     * The method will update and send the subscription packet
     * to fetch the default list of users
     * @private
     */
    _clearFilter() {
        hashHistory.push({pathname: "/users", query: {}})
    }

    addModal() {
        modal.add(AddUser, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });
    }

    _setFilter() {
        var newState=!this.props.showFilter;
        this.props.setFilter(newState);
    }

    render() {
        let filterHeight=screen.height - 190 - 50;
        let updateStatusIntl="";
        var itemNumber=7, userData;
        if (this.props.userdetails !== undefined) {
            userData=this._processUserDetails();
        }
        return (
            <div>
                <div>
                    <div className="gor-User-Table">
                        <div className="gor-filter-wrap"
                             style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                            <UserFilter userData={this.props.userdetails} responseFlag={this.props.responseFlag}/>
                        </div>

                        <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                                <div className="gorToolBarElements">
                                    <FormattedMessage id="user.table.heading" description="Heading for users table"
                                                      defaultMessage="Users"/>
                                </div>
                                <div className="gorToolBarElements">
                                    <div className="gor-user-add-wrap">
                                        <button className="gor-add-btn" onClick={this.addModal.bind(this)}>
                                            <FormattedMessage id="user.button.heading"
                                                              description="button heading for users table"
                                                              defaultMessage="Add new user"/>
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="filterWrapper">
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                        <div
                                            className="gor-button-sub-status">{updateStatusIntl} {updateStatusIntl} </div>
                                        <button
                                            className={this.props.userFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"}
                                            onClick={this.props.showTableFilter.bind(this)}>
                                            <div className="gor-manage-task"/>
                                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                                                              defaultMessage="Filter data"/>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/*Filter Summary*/}
                        <FilterSummary total={userData.length||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                                                          filterText={<FormattedMessage id="userList.filter.search.bar"
                                                                                        description='total users for filter search bar'
                                                                                        defaultMessage='{totalUsers} Users found'
                                                                                        values={{totalUsers: userData.length || 0}}/>}
                                                          refreshList={this._clearFilter.bind(this)}
                                                          refreshText={<FormattedMessage id="userList.filter.search.bar.showall"
                                                                                         description="button label for show all"
                                                                                         defaultMessage="Show all Users"/>}/>

                        <UserDataTable items={userData} itemNumber={itemNumber} intlMessg={this.props.intlMessages}
                                       mid={this.props.manager.users ? this.props.manager.users[0].id : ''}
                                       sortHeaderState={this.props.userHeaderSort}
                                       sortHeaderOrder={this.props.userHeaderSortOrder}
                                       currentSortState={this.props.userSortHeader}
                                       currentHeaderOrder={this.props.userSortHeaderState}
                                       setUserFilter={this.props.userFilterDetail}
                                       getUserFilter={this.props.userFilter}
                                       refreshList={this._clearFilter.bind(this)}
                                       userFilterStatus={this.props.userFilterStatus}
                                       isFilterApplied={this.props.isFilterApplied}
                                       lastUpdatedText={updateStatusIntl}
                                       lastUpdated={updateStatusIntl}
                                       showFilter={this.props.showFilter}
                                       setFilter={this.props.showTableFilter}/>
                    </div>
                </div>
            </div>
        );
    }
}
;


function mapStateToProps(state, ownProps) {

    return {
        userFilter: state.sortHeaderState.userFilter || "",
        userdetails: state.userDetails.userDetails || [],
        intlMessages: state.intl.messages,
        manager: state.headerData.headerInfo || [],
        userSortHeader: state.sortHeaderState.userHeaderSort || "role",
        userSortHeaderState: state.sortHeaderState.userHeaderSortOrder || INITIAL_HEADER_ORDER,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        userFilterStatus: state.filterInfo.userFilterStatus || false,
        roleList: state.appInfo.roleList || null,
        auth_token: state.authLogin.auth_token,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,

    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        userRequest: function (data) {
            dispatch(userRequest(data));
        },
        userFilterDetail: function (data) {
            dispatch(userFilterDetail(data))
        },
        userHeaderSort: function (data) {
            dispatch(userHeaderSort(data))
        },
        userHeaderSortOrder: function (data) {
            dispatch(userHeaderSortOrder(data))
        },
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        userfilterState: function(data){dispatch(userfilterState(data));},
        toggleUserFilter: function(data){dispatch(toggleUserFilter(data));},
        userFilterApplySpinner: function(data){dispatch(userFilterApplySpinner(data));},
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
    };
}

UsersTab.contextTypes={
    intl: React.PropTypes.object.isRequired
}
UsersTab.PropTypes={
    userFilter: React.PropTypes.string,
    userdetails: React.PropTypes.array,
    manager: React.PropTypes.array,
    userSortHeader: React.PropTypes.string,
    userSortHeaderState: React.PropTypes.string,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    userFilterStatus: React.PropTypes.bool,
    auth_token: React.PropTypes.object,
    userRequest: React.PropTypes.func,
    userFilterDetail: React.PropTypes.func,
    userHeaderSort: React.PropTypes.func,
    userHeaderSortOrder: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    wsSubscriptionData:React.PropTypes.object
};


export  default connect(mapStateToProps, mapDispatchToProps)(UsersTab);


