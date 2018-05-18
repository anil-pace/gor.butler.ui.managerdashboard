   import React  from 'react';
import ButlerBotsTable from './ButlerBotsTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {stringConfig} from '../../constants/backEndConstants';
import {butlerBotsRefreshed} from './../../actions/systemActions'
import {hashHistory} from 'react-router'
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_PERIPHERAL_ONLINE,
    GOR_PERIPHERAL_OFFLINE,WS_ONSEND
} from '../../constants/frontEndConstants';
import Spinner from '../../components/spinner/Spinner';
import {setButlerSpinner} from  '../../actions/spinnerAction';
import {butlerHeaderSort, butlerHeaderSortOrder, butlerFilterDetail} from '../../actions/sortHeaderActions';
import {defineMessages} from 'react-intl';
import {showTableFilter, filterApplied, toggleBotButton, butlerfilterState} from '../../actions/filterAction';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import ButlerBotFilter from './butlerBotFilter';
import FilterSummary from '../../components/tableFilter/filterSummary'
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'
//Mesages for internationalization
const messages=defineMessages({
    butlerPrefix: {
        id: "butlerDetail.name.prefix",
        description: "prefix for butler id",
        defaultMessage: "BOT - {botId}"
    },
    chargerPrefix: {
        id: "charger.name.prefix",
        description: "prefix for charger id",
        defaultMessage: "CS - {csId}"
    },
    msuPrefix: {
        id: "msu.name.prefix",
        description: "prefix for msu id",
        defaultMessage: "MSU - {msuId}"
    },
    /*
     ppsPrefix: {
        id: "pps.name.prefix",
        description: "prefix for pps id",
        defaultMessage: "PPS {ppsId}"
    },
    */
    audit: {
        id: "audit.name.prefix",
        description: "prefix for audit",
        defaultMessage: "Audit"
    },
    pick: {
        id: "pick.name.prefix",
        description: "prefix for Pick",
        defaultMessage: "Pick"
    },
    put: {
        id: "Put.name.prefix",
        description: "prefix for put",
        defaultMessage: "Put"
    },
    charging: {
        id: "Charging.name.prefix",
        description: "prefix for Charging",
        defaultMessage: "Charging"
    },
    move: {
        id: "Move.name.prefix",
        description: "prefix for Charging",
        defaultMessage: "Move"
    },
    moving: {
        id: "moving.task",
        description: "moving task",
        defaultMessage: "Moving to"
    },
    movingMount: {
        id: "movingMount.task",
        description: "movingMount task",
        defaultMessage: "Moving to mount"
    },
    movingDismount: {
        id: "movingDismount.task",
        description: "movingDismount task",
        defaultMessage: "Moving to dismount"
    },
    docked: {
        id: "docked.task",
        description: "docked task",
        defaultMessage: "Docked at"
    }
});


const BUTLER_BOTS_QUERY = gql`
    query ButlerBotsList($input: ButlerBotsListParams) {
        ButlerBotsList(input:$input){
            list {
                id
                charger_id
                current_subtask
                tasktype
                display_msu_id
                position
                state
                power

            }
        }
    }
`;


const SUBSCRIPTION_QUERY = gql`subscription BUTLER_CHANNEL($id: Int){
    ButlerBotsList(input:{id:$id}){
        list{
            id
            charger_id
            current_subtask
            tasktype
            display_msu_id
            position
            state
            power



        }
    }
}
`




class ButlerBot extends React.Component {

     constructor(props) {
        super(props);
        this.state = {query: null}
        // keep track of subscription handle to not subscribe twice.
        // we don't need to unsubscribe on unmount, because the subscription
        // gets stopped when the query stops.
        this.subscription = null;
        this.linked = false,
            this.showBotsFilter = this.props.showBotsFilter.bind(this)
    }




    componentWillReceiveProps(nextProps) {
        if (nextProps.location && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})

            this._refreshList(nextProps.location.query)
        }


        if (this.props.data && (!this.props.data.ButlerBotsList && nextProps.data.ButlerBotsList && !this.subscription && !nextProps.data.loading)) {
            this.updateSubscription(nextProps.location.query)
        }

    }



    componentWillUnMount() {
        if (this.subscription) {
            this.subscription()
        }
    }



    updateSubscription(variables) {
        if (this.subscription) {
            this.subscription()
        }
        this.subscription = this.props.data.subscribeToMore({
            variables: variables,
            document: SUBSCRIPTION_QUERY,
            notifyOnNetworkStatusChange: true,
            updateQuery: (previousResult, newResult) => {
                console.log(newResult)

                return Object.assign({}, {
                    ButlerBotsList: {list: newResult.subscriptionData.data.ButlerBotsList.list}
                })
            },
        });
    }


    _processButlersData(butler_data) {
        var nProps=this;
        var butlerData=[], butlerDetail={};
         var data = this._filterList(butler_data, nProps.props.location.query)
        var currentTask={
            0: nProps.context.intl.formatMessage(messages.pick),
            1: nProps.context.intl.formatMessage(messages.put),
            2: nProps.context.intl.formatMessage(messages.audit),
            3: nProps.context.intl.formatMessage(messages.charging),
            4: nProps.context.intl.formatMessage(messages.move)
        };
        var currentTaskClass={
            0: "Pick",
            1: "Put",
            2: "Audit",
            3: "Charging",
            4: "Move"
        }

        var currentSubtask={
            0: nProps.context.intl.formatMessage(messages.moving),
            1: nProps.context.intl.formatMessage(messages.movingMount),
            2: nProps.context.intl.formatMessage(messages.movingDismount),
            3: nProps.context.intl.formatMessage(messages.docked)
        };

        var priStatus={"online": 1, "offline": 2};
        let BOT, PPS, CS, MSU;

        for (var i=data.length - 1; i >= 0; i--) {
            var botId=data[i].id, msuId=data[i].display_msu_id, csId=data[i].charger_id;
            //ppsId=data[i].pps_id;
            BOT=nProps.context.intl.formatMessage(messages.butlerPrefix, {"botId": botId});
            //PPS=nProps.context.intl.formatMessage(messages.ppsPrefix, {"ppsId": ppsId});
            CS=nProps.context.intl.formatMessage(messages.chargerPrefix, {"csId": csId});
            MSU=nProps.context.intl.formatMessage(messages.msuPrefix, {"msuId": msuId});
            butlerDetail={};
            butlerDetail.id=BOT;
            butlerDetail.statusClass=data[i].state;
            if (nProps.context.intl.formatMessage(stringConfig[data[i].state])) {
                butlerDetail.status=nProps.context.intl.formatMessage(stringConfig[data[i].state]);
            }

            else {
                butlerDetail.status=data[i].state;
            }
            butlerDetail.statusPriority=priStatus[data[i].state];
            if (data[i].position) {
                butlerDetail.position=data[i].position;
            }
            else {
                butlerDetail.position="--";
            }
            if (data[i].power || data[i].power=== 0) {
                butlerDetail.voltage=data[i].power + " %";
            }
            else {
                butlerDetail.voltage="--";
            }
            butlerDetail.butlerAvgVoltage=data[i].power;
            butlerDetail.taskNum=currentTask[data[i].tasktype];
            butlerDetail.taskNumClass=currentTaskClass[data[i].tasktype];
            butlerDetail.taskType=data[i].tasktype;
            if (data[i].display_msu_id=== null) {
                butlerDetail.msu="--";
            }
            else {
                butlerDetail.msu=MSU;
            }

            if (data[i].tasktype !== null) {
                butlerDetail.current=currentTask[data[i].tasktype];
                if (data[i].current_subtask !== null) {
                    butlerDetail.current=butlerDetail.current + " - " + currentSubtask[data[i].current_subtask];
                    if (data[i].charger_id !== null) {
                        butlerDetail.current=butlerDetail.current + " CS " + data[i].charger_id;
                    }

                    else if (data[i].display_msu_id !== null) {
                        butlerDetail.current=butlerDetail.current + " MSU " + data[i].display_msu_id;
                    }

                    else {
                        butlerDetail.current=butlerDetail.current + " " + PPS;
                    }
                }


            }
            else {
                butlerDetail.current="--";
            }
            butlerData.push(butlerDetail);
        }

        return butlerData;
    }

    _filterList(init_data, query) {
        let filtered_data = init_data
        
        if (query.butler_id) {
            query.butler_id=query.butler_id.substring(6);   
            query.butler_id = query.butler_id.constructor === Array ? query.butler_id : [query.butler_id]
            filtered_data = filtered_data.filter(function (bot) {
                return query.butler_id.indexOf(bot.id)>-1
            })
        }

        if(query.location) {
             query.location = query.location.constructor === Array ? query.location : [query.location]
            filtered_data = filtered_data.filter(function (bot) {
                return query.location.indexOf(bot.position)>-1
            })
        }
        
        
        if(query.status){
            query.status = query.status.constructor === Array ? query.status : [query.status]
            filtered_data = filtered_data.filter(function (bot) {
                return query.status.indexOf(bot.state)>-1
            })
        }
         if(query.current_task){
            query.current_task = query.current_task.constructor === Array ? query.current_task : [query.current_task]
            filtered_data = filtered_data.filter(function (bot) {
                return query.current_task.indexOf(bot.tasktype)>-1
            })
        }


        return filtered_data
    }


    _refreshList(query) {
        this.props.setButlerSpinner(true)
        let filterSubsData={}
        if (query.location) {
            filterSubsData["location"]=['contains',query.location]
        }
        if (query.butler_id) {
            filterSubsData["butler_id"]=['=',query.butler_id]
        }
        if (query.status) {
            filterSubsData["state"]=['in',query.status.constructor===Array?query.status:[query.status]]
        }
        if (query.current_task) {
            filterSubsData["current_task"]=['in',query.current_task.constructor===Array?query.current_task:[query.current_task]]
        }

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.toggleBotButton(true);
            this.props.filterApplied(true);
        } else {
            this.props.toggleBotButton(false);
            this.props.filterApplied(false);
        }

        this.props.butlerfilterState({
            tokenSelected: {"STATUS": query.status?query.status.constructor===Array?query.status:[query.status]:["any"], "MODE": query.current_task?query.current_task.constructor===Array?query.current_task:[query.current_task]:["any"]}, searchQuery: {
                "SPECIFIC LOCATION/ZONE":query.location||null,
                "BOT ID":query.butler_id||null
            },
            defaultToken: {"STATUS": ["any"], "MODE": ["any"]}
        });

    }



   

    componentWillMount() {
       
        this.props.butlerBotsRefreshed()
    }

     _clearFilter() {
        hashHistory.push({pathname: "/system/butlerbots", query: {}})
    }



    render() {
        var filterHeight=screen.height - 190 - 50;
        let updateStatusIntl="";
        var itemNumber=6;
        var butlerData, avgVoltage=0;
        var taskDetail={
            "Put": 0, "Pick": 0, "Charging": 0, "Idle": 0, "Audit": 0,
            "avgVoltage": 0, "msuMounted": 0, "location": 0, "online": 0,
            "offline": 0
        };

        var data=this.props.butlerBotsList;

        //Mock data
        data = 
  [
        {
          "id": 230,
          "charger_id": null,
          "state": "offline",
          "tasktype": null,
          "power": "13",
          "display_msu_id": "1345",
          "position": "020.075",
          "current_subtask": null
        },
        {
          "id": 500,
          "charger_id": null,
          "state": "online",
          "tasktype": null,
          "power": undefined,
          "display_msu_id": null,
          "position": "020.076",
          "current_subtask": null
        },
        {
          "id": 270,
          "charger_id": null,
          "state": "offline",
          "tasktype": null,
          "power": undefined,
          "display_msu_id": null,
          "position": "020.078",
          "current_subtask": null
        },
        {
          "id": 250,
          "charger_id": null,
          "state": "online",
          "tasktype": null,
          "power": undefined,
          "display_msu_id": null,
          "position": "020.079",
          "current_subtask": null
        }
      ]
    
      
    
  


        if (data !== undefined) {
            butlerData=this._processButlersData(data);
            let activeBotsCount=0;
            if (butlerData && butlerData.length) {
                for (var i=butlerData.length - 1; i >= 0; i--) {
                    avgVoltage=(butlerData[i].butlerAvgVoltage || 0) + avgVoltage;
                    activeBotsCount=butlerData[i].butlerAvgVoltage ? activeBotsCount +1 : activeBotsCount;
                    if (butlerData[i].taskNumClass=== null || butlerData[i].taskNumClass=== undefined) {
                        taskDetail["Idle"]++;
                    }
                    else {
                        taskDetail[butlerData[i].taskNumClass]++;
                    }

                    if (butlerData[i].msu !== "--") {
                        taskDetail["msuMounted"]++;
                    }

                    if (butlerData[i].position !== null) {
                        taskDetail["location"]++;
                    }

                    if (butlerData[i].statusClass=== GOR_PERIPHERAL_ONLINE) {
                        taskDetail["online"]++;
                    }

                    if (butlerData[i].statusClass=== GOR_PERIPHERAL_OFFLINE) {
                        taskDetail["offline"]++;
                    }

                }
                avgVoltage=((avgVoltage / (activeBotsCount)).toFixed(1));
                taskDetail["avgVoltage"]=avgVoltage + "%";
            }
            else {
                taskDetail={
                    "Put": "--",
                    "Pick": "--",
                    "Charging": "--",
                    "Idle": "--",
                    "Audit": "--",
                    "avgVoltage": 0,
                    "msuMounted": "--",
                    "location": "--",
                    "online": "--"
                };
            }
        }
        
        if(!data){
            return null;
        }
        else{
        return (
              <div>
                <div>
                    <div className="gorTesting wrapper gor-butler-bots">
                        
                        {butlerData?<div><div><div className="gor-filter-wrap"
                                         style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <ButlerBotFilter butlerFilterState={this.props.butlerFilterState} isFilterApplied={this.props.isFilterApplied} showBotsFilter={this.props.showBotsFilter} butlerfilterState={this.props.butlerfilterState} butlerData={butlerData} responseFlag={this.props.responseFlag}/>
                            </div>

                            <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                            <div className="gorToolBarElements">
                            <FormattedMessage id="butlerBot.table.heading" description="Heading for butlerbot"
                            defaultMessage="Butler Bots"/>

                            </div>
                            </div>


                            <div className="filterWrapper">
                            <div className="gorToolBarDropDown">
                            <div className="gor-button-wrap">
                            
                            <button
                            className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this.showBotsFilter.bind(this, true)}>
                            <div className="gor-manage-task"/>
                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                            defaultMessage="Filter data"/>
                            </button>

                            </div>
                            </div>
                            </div>
                            </div>
                        {/*Filter Summary*/}
                         <FilterSummary total={butlerData.length||0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                            filterText={<FormattedMessage id="botList.filter.search.bar"
                                                          description='total bots for filter search bar'
                                                          defaultMessage='{total} Bots found'
                                                          values={{total: butlerData.length || 0}}/>}
                            refreshList={this._clearFilter.bind(this)}
                            refreshText={<FormattedMessage id="botList.filter.search.bar.showall"
                                                           description="button label for show all"
                                                           defaultMessage="Show all Bots"/>}/>
                                                           <ButlerBotsTable data={butlerData} parameters={taskDetail}/>
                       </div></div>:null}
                        


            
            
                       
                    </div>
                </div>
            </div>
        
            
            );
        }

       
    }
}
;

function mapStateToProps(state, ownProps) {
    return {
        butlerFilter: state.sortHeaderState.butlerFilter || "",
        butlerSortHeader: state.sortHeaderState.butlerHeaderSort || INITIAL_HEADER_SORT,
        butlerSortHeaderState: state.sortHeaderState.butlerHeaderSortOrder || INITIAL_HEADER_ORDER,
        butlerSpinner: state.spinner.butlerSpinner || false,
        butlerDetail: state.butlerDetail || [],
        intlMessages: state.intl.messages,
        
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        botFilterStatus: state.filterInfo.botFilterStatus || false,
        filterState: state.filterInfo.butlerFilterState,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        butlerBotsRefreshed:state.butlersInfo.butlerBotsRefreshed
    };
}


var mapDispatchToProps=function (dispatch) {
    return {
        butlerFilterDetail: function (data) {
            dispatch(butlerFilterDetail(data))
        },
        setButlerSpinner: function (data) {
            dispatch(setButlerSpinner(data))
        },
        butlerHeaderSort: function (data) {
            dispatch(butlerHeaderSort(data))
        },
        butlerHeaderSortOrder: function (data) {
            dispatch(butlerHeaderSortOrder(data))
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
        toggleBotButton: function (data) {
            dispatch(toggleBotButton(data));
        },
        butlerfilterState: function (data) {
            dispatch(butlerfilterState(data));
        },
        initDataSentCall: function(data){ dispatch(setWsAction({type:WS_ONSEND,data:data})); },
        butlerBotsRefreshed:function(data){dispatch(butlerBotsRefreshed(data))}
    };
}

ButlerBot.contextTypes={
    intl: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired
}
ButlerBot.PropTypes={
    butlerFilter: React.PropTypes.string,
    butlerSortHeader: React.PropTypes.string,
    butlerSortHeaderState: React.PropTypes.string,
    butlerSpinner: React.PropTypes.bool,
    butlerDetail: React.PropTypes.array,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    botFilterStatus: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    butlerFilterDetail: React.PropTypes.func,
    setButlerSpinner: React.PropTypes.func,
    butlerHeaderSort: React.PropTypes.func,
    butlerHeaderSortOrder: React.PropTypes.func,
    showBotsFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func
};

const withQuery = graphql(BUTLER_BOTS_QUERY, {
    props: function(data){
        if(!data || !data.data.ButlerBotsList || !data.data.ButlerBotsList.list){
            return {}
        }
        return {
            butlerBotsList: data.data.ButlerBotsList.list
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});



const botsClientData = gql`
    query  {
    todos @client
    botsFilter @client{
        display
        isFilterApplied
        filterState{
            tokenSelected{
                STATUS
                MODE
            }
            searchQuery{
                BOT ID

            }
            defaultToken{
                STATUS
                MODE
            }
        }
    }
    }
`;


const SET_VISIBILITY = gql`
    mutation setBotsFilter($filter: String!) {
        setShowBotsFilter(filter: $filter) @client
    }
`;

const SET_FILTER_APPLIED = gql`
    mutation setFilterApplied($isFilterApplied: String!) {
        setFilterApplied(isFilterApplied: $isFilterApplied) @client
    }
`;
const SET_FILTER_STATE = gql`
    mutation setFilterState($state: String!) {
        setBotsFilterState(state: $state) @client
    }
`;


const withClientData = graphql(botsClientData, {
    props: (data) => ({
        todos: data.data.todos,
        showFilter: data.data.botsFilter.display,
        isFilterApplied: data.data.botsFilter.isFilterApplied,
        botsFilterStatus: JSON.parse(JSON.stringify(data.data.botsFilter.filterState))
    })
})

const setVisibilityFilter = graphql(SET_VISIBILITY, {
    props: ({mutate, ownProps}) => ({
        showBotsFilter: function (show) {
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
        butlerfilterState: function (state) {
            mutate({variables: {state: state}})
        },
    }),
});



export default compose(
    withClientData,
    setVisibilityFilter,
    setFilterApplied,
    setFilterState,
    withQuery
)(connect(mapStateToProps, mapDispatchToProps)(ButlerBot));


