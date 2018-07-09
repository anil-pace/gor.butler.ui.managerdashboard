   import React  from 'react';
import ButlerBotsTable from './ButlerBotsTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {stringConfig} from '../../constants/backEndConstants';
import {hashHistory} from 'react-router'
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_PERIPHERAL_ONLINE,
    GOR_PERIPHERAL_OFFLINE,WS_ONSEND
} from '../../constants/frontEndConstants';
import Spinner from '../../components/spinner/Spinner';
import {setButlerSpinner} from  '../../actions/spinnerAction';
import {defineMessages} from 'react-intl';
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
    
     ppsPrefix: {
        id: "pps.name.prefix",
        description: "prefix for pps id",
        defaultMessage: "PPS {ppsId}"
    },
    
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
                pps_id
                current_task_status

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
            pps_id
            current_task_status



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
            picktask: nProps.context.intl.formatMessage(messages.pick),
            preputtask: nProps.context.intl.formatMessage(messages.put),
            audittask: nProps.context.intl.formatMessage(messages.audit),
            chargetask: nProps.context.intl.formatMessage(messages.charging),
            movetask: nProps.context.intl.formatMessage(messages.move)     
        };
        var currentTaskClass={
            picktask: "Pick",
            preputtask: "Put",
            audittask: "Audit",
            chargetask: "Charging",
            movetask: "Move"
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
            var botId=data[i].id, msuId=data[i].display_msu_id, csId=data[i].charger_id,
            ppsId=data[i].pps_id;
            BOT=nProps.context.intl.formatMessage(messages.butlerPrefix, {"botId": botId});
            PPS=nProps.context.intl.formatMessage(messages.ppsPrefix, {"ppsId": ppsId});
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
            butlerDetail.butlerAvgVoltage=data[i].power||0;
            butlerDetail.taskNum=currentTask[data[i].tasktype];
            butlerDetail.taskNumClass=currentTaskClass[data[i].tasktype];
            butlerDetail.taskType=data[i].tasktype;
            if (data[i].display_msu_id=== null) {
                butlerDetail.msu="--";
            }
            else {
                butlerDetail.msu=MSU;
            }
            if (    data[i].tasktype !== null && (data[i].tasktype === "picktask" || data[i].tasktype === "audittask" ||  data[i].tasktype === "chargetask") ) {
                butlerDetail.current=currentTask[data[i].tasktype];
                if(data[i].tasktype === "picktask" || data[i].tasktype === "audittask"){
                    if(data[i].current_task_status === "started" ){
                       butlerDetail.current=butlerDetail.current + " - " + currentSubtask[1];

                    }
                    else if(data[i].current_task_status === "rack_picked" && data[i].current_subtask === "pps_control"){
                        butlerDetail.current=butlerDetail.current + " - " + currentSubtask[3];
                    }
                    else if(data[i].current_task_status === "rack_picked"){
                       butlerDetail.current=butlerDetail.current + " - " + currentSubtask[0];
                    }
                    else if(data[i].current_task_status === "storing"){
                        butlerDetail.current=butlerDetail.current + " - " + currentSubtask[2];
                    }
                }
                else if(data[i].tasktype === "chargetask"){
                    if(data[i].current_task_status === "started" ){
                        butlerDetail.current=butlerDetail.current + " - " + currentSubtask[0];
                    }
                    else if(data[i].current_task_status === "charging_started"){
                        butlerDetail.current=butlerDetail.current + " - " + currentSubtask[3];
                    }
                }
                





                if (data[i].current_subtask !== null ) {
                    if (data[i].charger_id !== null) {
                        butlerDetail.current=butlerDetail.current + " CS " + data[i].charger_id;
                    }

                    else if (data[i].display_msu_id !== null) {
                        butlerDetail.current=butlerDetail.current + " MSU " + data[i].display_msu_id;
                    }

                    else {
                        butlerDetail.current=butlerDetail.current + " " + PPS ;
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
            query.butler_id=query.butler_id.toString().replace( /^\D+/g, '');   
            query.butler_id = query.butler_id.constructor === Array ? query.butler_id : [query.butler_id]
            filtered_data = filtered_data.filter(function (bot) {
                return query.butler_id.indexOf(bot.id.toString())>-1
            })
        }

        if(query.location) {
            query.location=query.location.toString().replace(/^\s+/g, '');
             query.location = query.location.constructor === Array ? query.location : [query.location]
            filtered_data = filtered_data.filter(function (bot) {
                return query.location.indexOf(bot.position.toString())>-1
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
            this.props.filterApplied(true);
        } else {
            this.props.filterApplied(false);
        }

        this.props.butlerfilterState({
            tokenSelected: {__typename:"ButlerBotsTokenSelected","STATUS": query.status?query.status.constructor===Array?query.status:[query.status]:["any"], "MODE": query.current_task?query.current_task.constructor===Array?query.current_task:[query.current_task]:["any"]},
            searchQuery: {
                 __typename:"ButlerBotsSearchQuery",
                "SPECIFIC_LOCATION_ZONE":query.location||null,
                "BOT_ID":query.butler_id||null
            },
            defaultToken: {"STATUS": ["any"], "MODE": ["any"],__typename:"ButlerBotsDefaultToken"}
        });

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
                avgVoltage=avgVoltage!==0?((avgVoltage / (activeBotsCount)).toFixed(1)):"--";
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
                                <ButlerBotFilter  noResults={butlerData.length === 0}  filterState={this.props.botsFilterStatus}  isFilterApplied={this.props.isFilterApplied} showBotsFilter={this.showBotsFilter} butlerfilterState={this.props.butlerfilterState} butlerData={butlerData} responseFlag={this.props.responseFlag}/>
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
                         <FilterSummary total={butlerData.length||0} noResults={butlerData.length === 0} isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
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
        intlMessages: state.intl.messages,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
    };
}


var mapDispatchToProps=function (dispatch) {
    return {
        setButlerSpinner: function (data) {
            dispatch(setButlerSpinner(data))
        },
    
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
                BOT_ID
                SPECIFIC_LOCATION_ZONE

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
        setButlerBotsFilterApplied(isFilterApplied: $isFilterApplied) @client
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
        showFilter: data.data.botsFilter ? data.data.botsFilter.display : false,
        isFilterApplied: data.data.botsFilter ? data.data.botsFilter.isFilterApplied : false,
        botsFilterStatus:data.data.botsFilter ? JSON.parse(JSON.stringify(data.data.botsFilter.filterState)) : null,
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


