import React  from 'react';
import ChargingStationsTable from './chargingStationsTable';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {setCsSpinner} from '../../actions/spinnerAction';
import {stringConfig} from '../../constants/backEndConstants';
import {defineMessages} from 'react-intl';
import {
    INITIAL_HEADER_SORT,
    INITIAL_HEADER_ORDER,
    GOR_CONNECTED_STATUS,
    WS_ONSEND,GOR_MANUAL_MODE
} from '../../constants/frontEndConstants';


import { setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import {hashHistory} from 'react-router'
import ChargingStationFilter from './chargingStationFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'

//Mesages for internationalization
const messages=defineMessages({
    cdPrefix: {
        id: "chargersDetail.name.prefix",
        description: "prefix for cs id in chargersDetail",
        defaultMessage: "Charging Stations - {csId}"
    },
    butlerPrefix: {
        id: "chargersDetail.butler.prefix",
        description: "prefix for butler id in chargersDetail",
        defaultMessage: "Butler - {botId}"
    }

});

const CHARGING_STATION_QUERY = gql`
    query ChargingStationList($input: ChargingStationListParams) {
        ChargingStationList(input:$input){
            list {
                charger_id
                mode
                status
                attached_butler_id
               
            }
        }
    }
`;


const SUBSCRIPTION_QUERY = gql`subscription CHARGER_CHANNEL($charger_id: String){
    ChargingStationList(input:{charger_id:$charger_id}){
        list{
                charger_id
                mode
                status
                attached_butler_id

        }
    }
}
`


class ChargingStations extends React.Component {
    constructor(props) {
        super(props);
        this.state={query: null}
        this.subscription = null;
        this.linked = false,
            this.showChargingStationFilter = this.props.showChargingStationFilter.bind(this)
    }

    _processChargersData(data) {
        var chargerData=[], detail={}, count=0,
            nProps=this,
            data=data,
            CS, csId, botId, BUTLER;

         data = this._filterList(data, nProps.props.location.query)

        var priStatus={"connected": 1, "disconnected": 2};

        for (var i=data.length - 1; i >= 0; i--) {
            detail={}
            csId=data[i].charger_id;
            botId=data[i].attached_butler_id;
            CS=nProps.context.intl.formatMessage(messages.cdPrefix, {"csId": csId});
            BUTLER=nProps.context.intl.formatMessage(messages.butlerPrefix, {"botId": botId});
            detail.id=CS;
            detail.status=nProps.context.intl.formatMessage((stringConfig[data[i].status]));
            detail.statusClass=data[i].status;
            detail.statusPriority=priStatus[data[i].status];
            if (nProps.context.intl.formatMessage(stringConfig[data[i].mode])) {
                detail.mode=nProps.context.intl.formatMessage(stringConfig[data[i].mode]);
            }
            else {
                detail.mode=data[i].mode;
            }
            detail.modeClass=data[i].mode;
            if (data[i].attached_butler_id && data[i].attached_butler_id.length) {
                detail.dockedBots=BUTLER;
            }

            else {
                detail.dockedBots="--";
            }
            chargerData.push(detail);
        }
        return chargerData;
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
                    ChargingStationList: {list: newResult.subscriptionData.data.ChargingStationList.list}
                })
            },
        });
    }


    componentWillReceiveProps(nextProps) {
         if (nextProps.location && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})

            this._refreshList(nextProps.location.query)
        }


        if (this.props.data && (!this.props.data.ChargingStationList && nextProps.data.ChargingStationList && !this.subscription && !nextProps.data.loading)) {
            this.updateSubscription(nextProps.location.query)
        }
    }


    componentWillUnMount() {
        if (this.subscription) {
            this.subscription()
        }
    }


        _filterList(init_data, query) {
        let filtered_data = init_data
        
        if (query.charger_id) {
            query.charger_id=query.charger_id.toString().replace( /^\D+/g, ''); 
            query.charger_id = query.charger_id.constructor === Array ? query.charger_id : [query.charger_id]
            filtered_data = filtered_data.filter(function (charger) {
                return query.charger_id.indexOf(charger.charger_id)>-1
            })
        }

        if(query.status) {
             query.status = query.status.constructor === Array ? query.status : [query.status]
            filtered_data = filtered_data.filter(function (charger) {
                return query.status.indexOf(charger.status)>-1
            })
        }
        
        
        if(query.mode){
            query.mode = query.mode.constructor === Array ? query.mode : [query.mode]
            filtered_data = filtered_data.filter(function (charger) {
                return query.mode.indexOf(charger.mode)>-1
            })
        }
         
        return filtered_data
    }

    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList(query) {
        this.props.setCsSpinner(true)
        let filterSubsData={}
        if (query.charger_id) {
            filterSubsData["charger_id"]=['contains', query.charger_id]
        }
        if (query.status) {
            filterSubsData["status"]=['in', query.status.constructor=== Array ? query.status : [query.status]]
        }
        if (query.mode) {
            filterSubsData["mode"]=['in', query.mode.constructor=== Array ? query.mode : [query.mode]]
        }

        if (Object.keys(query).filter(function(el){return el!=='page'}).length !== 0) {
            this.props.filterApplied(true);
        } else {
            this.props.filterApplied(false);
        }

        this.props.chargingstationfilterState({
            tokenSelected: {
                __typename:"ChargingStationTokenSelected",
                "DOCKING_STATUS": query.status ? query.status.constructor=== Array ? query.status : [query.status] : ["all"],
                "OPERATING_MODE": query.mode ? query.mode.constructor=== Array ? query.mode : [query.mode] : ["all"]
            }, searchQuery: {
                __typename:"ChargingStationSearchQuery",
                "CHARGING_STATION_ID": query.charger_id || ''
            },
            defaultToken: {"DOCKING_STATUS": ["all"], "OPERATING_MODE": ["all"],__typename:"ChargingStationDefaultToken"}
        });
    }


    /**
     *
     */
    _clearFilter() {
        hashHistory.push({pathname: "/system/chargingstation", query: {}})
    }



    render() {
        var data=this.props.chargingStationList;
        let filterHeight=screen.height - 190 - 50;
        let updateStatusIntl="";
        var itemNumber=4, connectedBots=0, manualMode=0, automaticMode=0,
            chargersState={"connectedBots": "--", "manualMode": "--", "automaticMode": "--", "csConnected": 0},
            chargersData, csConnected=0;
        if (this.props.chargingStationList !== undefined) {
            chargersData=this._processChargersData(data);
            if (chargersData && chargersData.length) {
                for (var i=chargersData.length - 1; i >= 0; i--) {
                    if (chargersData[i].dockedBots !== "--") {
                        connectedBots++;
                    }

                    if (chargersData[i].modeClass=== GOR_MANUAL_MODE) {
                        manualMode++;
                    }
                    else {
                        automaticMode++;
                    }
                    if (chargersData[i].statusClass=== GOR_CONNECTED_STATUS) {
                        csConnected++;
                    }

                }
                chargersState={
                    "connectedBots": connectedBots,
                    "manualMode": manualMode,
                    "automaticMode": automaticMode,
                    "csConnected": csConnected
                };
            }
        }

        return (
             


            <div>
                <div>
                    <div className="gorTesting wrapper gor-charging-station">
                        
                        {chargersData?<div><div><div className="gor-filter-wrap"
                                         style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                <ChargingStationFilter isFilterApplied={this.props.isFilterApplied}  filterState={this.props.chargingStationFilterStatus} chargingstationfilterState={this.props.chargingstationfilterState} chargersData={chargersData} responseFlag={this.props.responseFlag} showChargingStationFilter={this.showChargingStationFilter} noResults={chargersData.length === 0}/>
                            </div>

                            <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                            <div className="gorToolBarElements">
                            <FormattedMessage id="ChargingStations.table.heading" description="Heading for ChargingStations"
                                                          defaultMessage="Charging Stations"/>

                            </div>
                            </div>


                            <div className="filterWrapper">
                            <div className="gorToolBarDropDown">
                            <div className="gor-button-wrap">
                            
                            <button
                            className={this.props.isFilterApplied ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this.showChargingStationFilter.bind(this, true)}>
                            <div className="gor-manage-task"/>
                            <FormattedMessage id="gor.filter.filterLabel" description="button label for filter"
                            defaultMessage="Filter data"/>
                            </button>

                            </div>
                            </div>
                            </div>
                            </div>
                        {/*Filter Summary*/}
                         <FilterSummary total={chargersData.length||0}  noResults={chargersData.length === 0}  isFilterApplied={this.props.isFilterApplied} responseFlag={this.props.responseFlag}
                            filterText={<FormattedMessage id="ChargingStationsTable.filter.search.bar"
                                                                         description='total stations for filter search bar'
                                                                         defaultMessage='{total} Stations found'
                                                                         values={{total: chargersData.length || 0}}/>}
                            refreshList={this._clearFilter.bind(this)}
                             refreshText={<FormattedMessage
                                               id="ChargingStationsTable.filter.search.bar.showall"
                                               description="button label for show all"
                                               defaultMessage="Show all Stations"/>}/>
                                                           <ChargingStationsTable data={chargersData} chargersState={chargersState}/>



                       </div></div>:null}
                        


                
            
                       
                    </div>
                </div>
            </div>
        );
    }
}
;

function mapStateToProps(state, ownProps) {

    return {
        csSpinner: state.spinner.csSpinner || false,
        intlMessages: state.intl.messages
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        
        setCsSpinner: function (data) {
            dispatch(setCsSpinner(data));
        }
        
    };
}

ChargingStations.contextTypes={
    intl: React.PropTypes.object.isRequired
}
ChargingStations.PropTypes={
    csSpinner: React.PropTypes.bool,
    chargersDetail: React.PropTypes.array,
    isFilterApplied: React.PropTypes.bool,
    chargingFilterStatus: React.PropTypes.bool,
    csFilterDetail: React.PropTypes.func,
    setCsSpinner: React.PropTypes.func,
    csHeaderSort: React.PropTypes.func,
    csHeaderSortOrder: React.PropTypes.func,
    showChargingStationFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func

};


const withQuery = graphql(CHARGING_STATION_QUERY, {
    props: function(data){
        if(!data || !data.data.ChargingStationList || !data.data.ChargingStationList.list){
            return {}
        }
        return {
            chargingStationList: data.data.ChargingStationList.list
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});





const chargingStationClientData = gql`
    query  {
    todos @client
    chargingStationFilter @client{
        display
        isFilterApplied
        filterState{
            tokenSelected{
               DOCKING_STATUS
               OPERATING_MODE
            }
            searchQuery{
                CHARGING_STATION_ID

            }
            defaultToken{
                DOCKING_STATUS
                OPERATING_MODE
            }
        }
    }
    }
`;


const SET_VISIBILITY = gql`
    mutation setChargingStationFilter($filter: String!) {
        setShowChargingStationFilter(filter: $filter) @client
    }
`;

const SET_FILTER_APPLIED = gql`
    mutation setFilterApplied($isFilterApplied: String!) {
        setChargingStationFilterApplied(isFilterApplied: $isFilterApplied) @client
    }
`;
const SET_FILTER_STATE = gql`
    mutation setFilterState($state: String!) {
        setChargingStationFilterState(state: $state) @client
    }
`;


const withClientData = graphql(chargingStationClientData, {
    
    props:function(data){
        return {
          showFilter: data.data.chargingStationFilter ?data.data.chargingStationFilter.display:false,
        isFilterApplied:data.data.chargingStationFilter?data.data.chargingStationFilter.isFilterApplied:false,
        chargingStationFilterStatus: data.data.chargingStationFilter ?JSON.parse(JSON.stringify(data.data.chargingStationFilter.filterState)):null,
        chargingStationFilter:data.data.chargingStationFilter  
        }
    }
})

const setVisibilityFilter = graphql(SET_VISIBILITY, {
    props: ({mutate, ownProps}) => ({
        showChargingStationFilter: function (show) {
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
        chargingstationfilterState: function (state) {
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
)(connect(mapStateToProps, mapDispatchToProps)(ChargingStations));

