/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import {msuConfigRefreshed} from './../../actions/systemActions';
import {hashHistory} from 'react-router';
import {modal} from 'react-redux-modal';

import { makeAjaxCall } from '../../actions/ajaxActions';

import Spinner from '../../components/spinner/Spinner';
import {setMsuConfigSpinner} from  '../../actions/spinnerAction';
import {butlerFilterDetail} from '../../actions/sortHeaderActions';
import {showTableFilter, filterApplied, toggleBotButton, butlerfilterState, msuConfigFilterState} from '../../actions/filterAction';
import {updateSubscriptionPacket,setWsAction} from './../../actions/socketActions'
import {wsOverviewData} from './../../constants/initData.js';
import MsuConfigFilter from './msuConfigFilter';
import FilterSummary from '../../components/tableFilter/filterSummary';
import ChangeRackType from './changeRackType';
import MsuRackFlex from './MsuRackFlex';
import MsuConfigTable from './msuConfigTable';
import MsuConfigConfirmation from './msuConfigConfirmation';

import {
    WS_ONSEND,
    APP_JSON, POST, GET,
    FETCH_MSU_CONFIG_LIST,
    FETCH_MSU_CONFIG_LIST_VIA_FILTER,
    FETCH_MSU_CONFIG_RACK_STRUCTURE,
    FETCH_MSU_CONFIG_START_RECONFIG,
    FETCH_MSU_CONFIG_STOP_RECONFIG,
    FETCH_MSU_CONFIG_RELEASE_MSU,
    MSU_CONFIG_POLLING_INTERVAL
} from '../../constants/frontEndConstants';

import {
    MSU_CONFIG_URL,
    MSU_CONFIG_FILTER_URL,
    MSU_CONFIG_START_RECONFIG_URL,
    MSU_CONFIG_STOP_RECONFIG_URL,
    MSU_CONFIG_RELEASE_MSU_URL,
} from '../../constants/configConstants';

import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag';
import {
    notifySuccess,
    notifyFail
} from "./../../actions/validationActions";

const MSU_LIST_QUERY = gql`
    query($input:MsuListParams){
        MsuList(input:$input){
             list{
                  rack_id
                  source_type
                  destination_type
                  status
            }
        }
    }
`;

const MSU_LIST_POST_FILTER_QUERY = gql`
    query($input:MsuFilterListParams){
        MsuFilterList(input:$input){
            list {
              id
              racktype
            } 
        }
    }
`;

class MsuConfigTab extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            query:null,
            startStopBtnState: true,
            startStopBtnText: "startReconfig",
            releaseMsuBtnState: true,
        };
        this._refreshMsuDataAction = this._refreshMsuDataAction.bind(this);
        this._releaseMsuAction = this._releaseMsuAction.bind(this);
        this._startStopReconfigAction = this._startStopReconfigAction.bind(this);
        this._setFilterAction = this._setFilterAction.bind(this);
        this._disableStartStopReconfig = this._disableStartStopReconfig.bind(this);
        this._disableReleaseMsuBtn = this._disableReleaseMsuBtn.bind(this);
        this._startStopActionInitiated = this._startStopActionInitiated.bind(this);
    }

    

    componentDidMount(){
       //this._requestMsuList();
    }

    _requestMsuList(){
        // let params={
        //     'url': MSU_CONFIG_URL,
        //     'method':GET,
        //     'contentType':APP_JSON,
        //     'accept':APP_JSON,
        //     'cause' : FETCH_MSU_CONFIG_LIST
        // }
        // this.props.makeAjaxCall(params);
        // let self=this;
        // if(!this._intervalIdForMsuList){
        //    self.props.makeAjaxCall(params) 
        // }
        // this._intervalIdForMsuList= setInterval(function(){
        //     self.props.makeAjaxCall(params)
        // },MSU_CONFIG_POLLING_INTERVAL)
    }

    _requestMsuListViaFilter(rackId, rackStatus){
        
        // let formData = {};

        // if(rackId && rackStatus){
        //     formData.id = rackId;
        //     formData.racktype = rackStatus;
        // }
        // else if(rackStatus){
        //     console.log("inside rackStatus ==============>");
        //     formData.racktype = rackStatus;
        // }
        // else if (rackId){
        //     formData.id = rackId;
        // }

        this.props.client.query({
            query: MSU_LIST_POST_FILTER_QUERY,
            //variables: formData,
            variables: (function () {
                return {
                    input: {
                        id: rackId,
                        racktype:rackStatus
                    }
                }
            }()),
            fetchPolicy: 'network-only'
        }).then(data=>{
          this.props.notifyFail();
        })
    }


    _refreshMsuDataAction = () => {
        if(this._intervalIdForMsuList){
            this.clearPolling()
        }
      this._refreshList(this.props.location.query);
    }

    clearPolling(){
        clearInterval(this._intervalIdForMsuList)
        this._intervalIdForMsuList=null

    }

    _releaseMsuAction = () => {
        let params={
            'url': MSU_CONFIG_RELEASE_MSU_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':FETCH_MSU_CONFIG_RELEASE_MSU
        }
        this.props.makeAjaxCall(params);
    }

    
    _startStopActionInitiated(){
        if(this.state.startStopBtnText === "startReconfig"){
            let params={
                'url': MSU_CONFIG_START_RECONFIG_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause' : FETCH_MSU_CONFIG_START_RECONFIG
            }
            this.props.makeAjaxCall(params);
            this.setState({
                startStopBtnState: true,
                startStopBtnText: "stopReconfig"
            })
        }
        else{
            let params={
                'url': MSU_CONFIG_STOP_RECONFIG_URL,
                'method':POST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause' : FETCH_MSU_CONFIG_STOP_RECONFIG
            }
            this.props.makeAjaxCall(params);
            
            this.setState({
                startStopBtnState: true,
                startStopBtnText: "startReconfig"
            })
        }
    }

    _startStopReconfigAction = () => {
        modal.add(MsuConfigConfirmation, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true, // (optional) if you don't wanna show the top right close button
            startStopActionInitiated:this._startStopActionInitiated,
            activeBtnText: this.state.startStopBtnText

        });
    }


    componentWillReceiveProps(nextProps) {

        let isAnyMsuEmpty = [];
        let isAnyMsuDropping = [];
        let isAnyMsuDropped = [];
        let isAnyMsuReadyForReconfig = [];
        let isAnyMsuStoringBack = [];


        if (nextProps.socketAuthorized && !this.state.subscribed) {
            this.setState({subscribed: true},function(){
                this._subscribeData(nextProps)
            })
        }

        if (nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: nextProps.location.query})
            this._refreshList(nextProps.location.query)
        }

        if(Object.keys(nextProps.location.query).length==0 && !this._intervalIdForMsuList){
            this._refreshList(nextProps.location.query)
        }

        if(Object.keys(nextProps.location.query).length>0 &&
            this._intervalIdForMsuList && 
            JSON.stringify(this.props.msuList) !==JSON.stringify(nextProps.msuList)){
                this.clearPolling();
        }

        if(nextProps.msuList && Array.isArray(nextProps.msuList)){

                nextProps.msuList.forEach((eachMsu)=>{
                    if(eachMsu.status === "reconfig_ready"){  isAnyMsuEmpty.push(eachMsu.status);}
                    else if (eachMsu.status === "waiting"){  isAnyMsuDropping.push(eachMsu.status);}
                    else if (eachMsu.status === "dropped") { isAnyMsuDropped.push(eachMsu.status);}
                    else if (eachMsu.status === "ready_for_reconfiguration")  {isAnyMsuReadyForReconfig.push(eachMsu.status);}
                    else if (eachMsu.status === "storing_back") { isAnyMsuStoringBack.push(eachMsu.status);}
                });

            let checkAnyEmptyMsuFound = (isAnyMsuEmpty.length > 0 ? true : false);
            let checkAnyMsuInProgressFound = ( (isAnyMsuDropping.length  > 0 ? true : false) ||
                                                (isAnyMsuDropped.length > 0 ? true : false) || 
                                                (isAnyMsuReadyForReconfig.length > 0 ? true : false) ||
                                                (isAnyMsuStoringBack.length > 0 ? true : false)
                                            );

            // atleast 1 MSU is Empty and no MSU is in progress
            if( checkAnyEmptyMsuFound && !checkAnyMsuInProgressFound){
                 // START button should be enabled
                 this.setState({
                    startStopBtnText: "startReconfig"
                });
                this._disableStartStopReconfig(false);
                
            }
            else if(checkAnyMsuInProgressFound){
                // STOP button should be enabled
                this.setState({
                    startStopBtnText: "stopReconfig"
                });
                this._disableStartStopReconfig(false);
                
            }
            else{
                // START/STOP button should be DISABLED
                this._disableStartStopReconfig(true);
            }


           // check for handling Release Button 
            if(isAnyMsuReadyForReconfig.length > 0){
                this._disableReleaseMsuBtn(false);
            }else{
                this._disableReleaseMsuBtn(true);
           }
       }
    }



    /**
     * The method will update the subscription packet
     * and will fetch the data from the socket.
     * @private
     */
    _refreshList(query) {

        this.props.setMsuConfigSpinner(true);
        let filterUrl;
        if(query.rack_id || query.status){
            this._requestMsuListViaFilter(query.rack_id, query.status);
        }
        
        // if(query.rack_id && query.status){
        //     filterUrl = MSU_CONFIG_FILTER_URL+"?id="+query.rack_id +"&racktype="+query.status;
        //     this._requestMsuListViaFilter(filterUrl);
        // }
        // else if(query.status){
        //     filterUrl = MSU_CONFIG_FILTER_URL+"?racktype="+query.status;
        //     this._requestMsuListViaFilter(filterUrl);
        // }
        // else if (query.rack_id){
        //     filterUrl = MSU_CONFIG_FILTER_URL+"?id="+query.rack_id;
        //     this._requestMsuListViaFilter(filterUrl);
        // }
        // else{
        //     this._requestMsuList()
        // }
        

        if(Object.keys(query).length>0){
            this.props.filterApplied(true);
        }else{
            this.props.filterApplied(false);
        }
       
        this.props.msuConfigFilterState({
            tokenSelected: {"STATUS": query.status?query.status.constructor===Array?query.status:[query.status]:["any"]},
            searchQuery: {
                "MSU ID":query.rack_id||null
            },
            defaultToken: {"STATUS": ["any"]}
        });
    }

    _subscribeData() {
        let updatedWsSubscription=this.props.wsSubscriptionData;
        this.props.initDataSentCall(updatedWsSubscription["default"])
        this.props.updateSubscriptionPacket(updatedWsSubscription);
    }

    _blockPutAndChangeTypeCallback(){
        hashHistory.push({pathname: "/system/msuConfiguration", query: {}})
        this.props.filterApplied(false);
        this._requestMsuList();
    }


    _clearFilter() {
        hashHistory.push({pathname: "/system/msuConfiguration", query: {}})
    }

    _setFilterAction() {
        var newState=!this.props.showFilter;
        this.props.showTableFilter(newState);
    }

    _disableStartStopReconfig(isDisabled){
        this.setState({
            startStopBtnState: isDisabled||false,
        })
    }

    _disableReleaseMsuBtn(isDisabled){
        this.setState({
            releaseMsuBtnState: isDisabled||false,
        })
    }

    render() {
        var filterHeight=screen.height - 190 - 50;
        let msuListData=this.props.msuList;
        let noData= <FormattedMessage id="msuConfig.table.noMsuData" description="Heading for no Msu Data" defaultMessage="No MSUs with blocked puts"/>;
        return (
            <div>
                <div>
                    <div className="gorTesting">
                        <Spinner isLoading={this.props.msuConfigSpinner} setSpinner={this.props.setMsuConfigSpinner}/>
                        {msuListData?
                            <div>
                                <div className="gor-filter-wrap"
                                    style={{'width': this.props.showFilter ? '350px' : '0px', height: filterHeight}}>
                                    <MsuConfigFilter msuListData={msuListData} responseFlag={this.props.responseFlag}/>
                                </div>


                                <div className="gorToolBar">
                                    <div style={{width: "auto"}} className="gorToolBarWrap">
                                        <div className="gorToolBarElements">
                                            <FormattedMessage id="msuConfig.table.heading" 
                                                description="Heading for msu Configuration" 
                                                defaultMessage="MSU Configuration"/>
                                        </div>
                                    </div>


                                <div className="filterWrapper">

                                    <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <button className="gor-msuConfig-btn grey" 
                                                onClick={this._refreshMsuDataAction}>
                                                <div className="gor-refresh-whiteIcon"/>
                                                <FormattedMessage id="gor.msuConfig.refreshData" 
                                                    description="button label for refresh data" 
                                                    defaultMessage="REFRESH DATA"/>
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <button disabled={this.state.releaseMsuBtnState}  
                                                className="gor-msuConfig-btn grey" 
                                                onClick={this._releaseMsuAction}>
                                                <FormattedMessage id="gor.msuConfig.releaseMsu" 
                                                    description="button label for release msu" 
                                                    defaultMessage="RELEASE MSU(S)"/>
                                            </button>
                                        </div>
                                    </div> 

                                    <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <button disabled={this.state.startStopBtnState} 
                                                    style={{minWidth: "145px"}} 
                                                    className="gor-msuConfig-btn orange"
                                                    onClick={this._startStopReconfigAction}>

                                                    {this.state.startStopBtnText === "startReconfig" ? 
                                                            <FormattedMessage id="gor.msuConfig.startReconfig" 
                                                                description="button label for start reconfig" 
                                                                defaultMessage="START RECONFIG"/>:
                                                             <FormattedMessage id="gor.msuConfig.StopReconfig" 
                                                            description="button label for Stop reconfig" 
                                                            defaultMessage="STOP RECONFIG"/>
                                                    }
                                                    
                                            </button>
                                        </div>
                                    </div>  


                                    <div style={{paddingLeft: "0px"}} className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                            <button style={{minWidth: "145px"}} 
                                                className={"gor-filterBtn-btn"}
                                                 onClick={this._setFilterAction}>
                                                <div className="gor-manage-task"/>
                                                <FormattedMessage id="gor.msuConfig.filterLabel" 
                                                    description="button label for filter" 
                                                    defaultMessage="FILTER DATA"/>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/*Filter Summary*/}
                                <FilterSummary total={msuListData.length||0} 
                                    isFilterApplied={this.props.isFilterApplied} 
                                    responseFlag={this.props.responseFlag}
                                    filterText={<FormattedMessage id="msuConfig.filter.search.bar"
                                                  description='total msus for filter search bar'
                                                  defaultMessage='{total} MSU found'
                                                  values={{total: msuListData.length || 0}}/>}
                                    refreshList={this._clearFilter.bind(this)}
                                    refreshText={<FormattedMessage id="msuConfig.filter.search.bar.showall" 
                                                    description="button label for show all" 
                                                    defaultMessage="Show all MSUs with blocked puts"/>}/>
                        </div>:null}

                        {this.props.msuList && this.props.msuList.length > 0 && 
                            (<MsuConfigTable items={msuListData} 
                                intlMessg={this.props.intlMessages}
                                setButlerFilter={this.props.butlerFilterDetail}
                                getButlerFilter={this.props.butlerFilter}
                                showFilter={this.props.showFilter}
                                isFilterApplied={this.props.isFilterApplied}
                                setFilter={this.props.showTableFilter}
                                botFilterStatus={this.props.botFilterStatus}
                                butlerState={this.props.filterState}
                                refreshList={this._clearFilter.bind(this)}
                                blockPutAndChangeTypeCallback={this._blockPutAndChangeTypeCallback.bind(this)}
                            />)}
                        {!this.props.msuConfigSpinner && this.props.msuList && this.props.msuList.length===0 && <div className="noDataWrapper"> {noData} </div>}
                        {this.props.msuConfigSpinner && <div className="noDataWrapper"></div>}
                    </div>
                </div>
            </div>
        );
    }
};

const withQuery = graphql(MSU_LIST_QUERY, {

    props: function(data){
        console.log("inside withQuery => md");
        if(!data || !data.data.MsuList || !data.data.MsuList.list){
            return {}
        }
        return {
            //msuList: data.data.MsuList.list
            msuList :  [
                            {"rack_id":"021","source_type":"11","destination_type":"19","status":"put_blocked"},
                            {"rack_id":"022","source_type":"11","destination_type":"19","status":"put_blocked"},
                            {"rack_id":"025","source_type":"11","destination_type":"19","status":"put_blocked"}
                        ]
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

function mapStateToProps(state, ownProps) {
    return {
        butlerFilter: state.sortHeaderState.butlerFilter || "",
        butlerSpinner: state.spinner.butlerSpinner || false,
        butlerDetail: state.butlerDetail || [],
        intlMessages: state.intl.messages,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        botFilterStatus: state.filterInfo.botFilterStatus || false,
        filterState: state.filterInfo.butlerFilterState,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        msuConfigRefreshed: state.msuInfo.msuConfigRefreshed,
        msuConfigSpinner: state.spinner.msuConfigSpinner || false,

       // msuList: state.msuInfo.msuList||[],
        timeZone:state.authLogin.timeOffset,
    };
}


var mapDispatchToProps=function (dispatch) {
    return {
        butlerFilterDetail: function (data) {
            dispatch(butlerFilterDetail(data))
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

        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },
        msuConfigFilterState: function(data){dispatch(msuConfigFilterState(data));},
        msuConfigRefreshed:function(data){dispatch(msuConfigRefreshed(data))},
        setMsuConfigSpinner: function (data) {
            dispatch(setMsuConfigSpinner(data))
        },
        notifySuccess: function (data) {
            dispatch(notifySuccess(data));
        },
        notifyFail: function (data) {
            dispatch(notifyFail(data));
        }
    };
}

MsuConfigTab.contextTypes={
    intl: React.PropTypes.object.isRequired
}
MsuConfigTab.PropTypes={
    butlerFilter: React.PropTypes.string,
    butlerSpinner: React.PropTypes.bool,
    butlerDetail: React.PropTypes.array,
    showFilter: React.PropTypes.bool,
    isFilterApplied: React.PropTypes.bool,
    botFilterStatus: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    butlerFilterDetail: React.PropTypes.func,
    butlerHeaderSort: React.PropTypes.func,
    butlerHeaderSortOrder: React.PropTypes.func,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    setMsuConfigSpinner: React.PropTypes.func,
    msuConfigSpinner: React.PropTypes.bool,
};

//export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MsuConfigTab));
export default compose(
    withQuery,
    withApollo
)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(MsuConfigTab)));


