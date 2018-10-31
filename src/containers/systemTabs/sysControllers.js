import React from 'react';
import {Table, Column,Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import FilterSummary from '../../components/tableFilter/filterSummary';
import SysControllersTable from './sysControllersTable';
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
import {defineMessages} from 'react-intl';
import {wsOverviewData} from '../../constants/initData.js';
import {withRouter} from 'react-router';
import {stringConfig} from '../../constants/backEndConstants';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT,WS_ONSEND} from '../../constants/frontEndConstants';
import {setWsAction} from '../../actions/socketActions';
import {CONTROLLER_SENSOR_TRIGGERED_MESSAGES,
    CONTROLLER_ACTION_TRIGGERED_MESSAGES} from '../../constants/messageConstants';
import Filter from '../../components/tableFilter/filter';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {
    showTableFilter,
    filterApplied
} from '../../actions/filterAction';
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'

const SYSTEM_CONTROLLER_QUERY = gql`
    query SystemControllerList($input: SystemControllerListParams) {
        SystemControllerList(input:$input){
            list {
                controller_id
                status
                enabled
                state_data{
                    zone
                    zone_state{
                       hard_emergency 
                       latch_gate
                       soft_emergency
                       zone_clear
                       zone_pause
                    }
                    sensor_activated
                    action_triggered

                }
               
            }
        }
    }
`;

const SUBSCRIPTION_QUERY = gql`subscription SYSTEM_CONTROLLER_CHANNEL($controller_id: String){
    SystemControllerList(input:{controller_id:$controller_id}){
        list{
                controller_id
                status
                enabled
                state_data{
                    zone
                    zone_state{
                       hard_emergency 
                       latch_gate
                       soft_emergency
                       zone_clear
                       zone_pause
                    }
                    sensor_activated
                    action_triggered

                }

        }
    }
}
`


class SystemControllers extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state={query: null,legacyDataSubscribed:false};
        this.subscription = null;
        this.linked = false; 
        this._subscribeLegacyData = this._subscribeLegacyData.bind(this);
    }
    _subscribeLegacyData() {
        this.props.initDataSentCall(wsOverviewData["default"]);
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
                return Object.assign({}, {
                    SystemControllerList: {list: newResult.subscriptionData.data.SystemControllerList.list}
                })
            },
        });
    }


    _processData(data){
        //var data=this.props.controllers.slice(0);
        if(data){
        var dataLen = data.length;
        var processedData=[];
        if(dataLen){
            for(let i=0 ;i < dataLen ; i++){
                let rowObj={};
                rowObj = Object.assign({},data[i])
                if(data[i].enabled === true){
                    rowObj.statusText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else{
                    rowObj.statusText = this.context.intl.formatMessage(stringConfig.disconnected)
                }
                if(data[i].status === "connected"){
                    rowObj.zigbeeText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else{
                    rowObj.zigbeeText = this.context.intl.formatMessage(stringConfig.disconnected)
                }
                if(data[i].status === "connected"){
                    rowObj.ethernetText = this.context.intl.formatMessage(stringConfig.connected)
                }
                else{
                    rowObj.ethernetText = this.context.intl.formatMessage(stringConfig.disconnected)
                }

                if(rowObj.state_data.sensor_activated === "button_press"){
                    rowObj.sensor_activated_text = CONTROLLER_SENSOR_TRIGGERED_MESSAGES[rowObj.state_data.sensor_activated]
                }
                if(rowObj.state_data.sensor_activated === "none"){
                    rowObj.sensor_activated_text = "";
                }
                else{
                    rowObj.sensor_activated_text = CONTROLLER_SENSOR_TRIGGERED_MESSAGES[rowObj.state_data.sensor_activated];
                }
                rowObj.action_triggered_text = CONTROLLER_ACTION_TRIGGERED_MESSAGES[rowObj.state_data.action_triggered];
                
                processedData.push(rowObj)
            }
        }
        return processedData
    }
    }

    _refreshList(query){
        var filterSubsData = {};
        var updatedWsSubscription= JSON.parse(JSON.stringify(this.props.wsSubscriptionData));
        if (query && query.zone_id) {
            filterSubsData["zone_id"]=['=',query.zone_id]
        }
        updatedWsSubscription["controllers"].data[0].details["filter_params"]=filterSubsData;
    }


    componentWillReceiveProps(nextProps) {
        if((nextProps.socketAuthorized && !this.state.subscribed) || (JSON.stringify(this.props.location.query) !== JSON.stringify(nextProps.location.query))){
            this.setState({
                subscribed:true,
                queryApplied:Object.keys(this.props.location.query).length ? true :false
            },function(){
                this._refreshList(nextProps.location.query)
            })
        }
        if(this.props.hasDataChanged !== nextProps.hasDataChanged){
            let data = this._processData(nextProps.controllers.slice(0));
            let dataList = new tableRenderer(data.length)
            dataList.newData=data;
            this.setState({
                dataList,
                queryApplied:Object.keys(nextProps.location.query).length ? true :false
            })
        }
        if(!this.state.legacyDataSubscribed && nextProps.socketAuthorized){
            this.setState(()=>{
                return{legacyDataSubscribed:true}
            },()=>{
                this._subscribeLegacyData()
            })
        }
    }
    componentWillMount(){
        if(this.props.socketAuthorized && !this.state.subscribed){
            this.setState({
                subscribed:true,
                queryApplied:Object.keys(this.props.location.query).length ? true :false
            },function(){
                this._refreshList(this.props.location.query)
            })
        }
    }
 
   

    render() {
        var {dataList} = this.state;
        var filterHeight=screen.height - 190 - 50;
       var data=this._processData(this.props.systemControllerList);


        if(data!==undefined){
        return (
            
           <div  className="gorTableMainContainer gor-sys-controller">
            
            <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="sysController.table.heading" description="Heading for PPS"
                                                          defaultMessage="System Controllers"/>
                                        
                                    </div>
                                </div>
                        
                </div>
               
                
                <SysControllersTable data={data}/>
               {!data.length && <div className="gor-no-data"><FormattedMessage id="sysControllers.table.noData"
                                                                    description="No data message for PPStable"
                                                                    defaultMessage="No Controllers Found"/></div>}
            </div>

        );
    }
    else{
        return null;
    }
    }
}

SystemControllers.contextTypes={
    intl: React.PropTypes.object.isRequired
}
function mapStateToProps(state, ownProps) {
    return {
        controllers:state.sysControllersReducer.controllers || [],
        hasDataChanged:state.sysControllersReducer.hasDataChanged,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket
        
    };
}
const mapDispatchToProps = (dispatch)=>{
    return{
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        }
    }
}




const withQuery = graphql(SYSTEM_CONTROLLER_QUERY, {
    props: function(data){
        if(!data || !data.data.SystemControllerList || !data.data.SystemControllerList.list){
            return {}
        }
        return {
            systemControllerList: data.data.SystemControllerList.list
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});



export default compose(
    withQuery
)(connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(SystemControllers))));
