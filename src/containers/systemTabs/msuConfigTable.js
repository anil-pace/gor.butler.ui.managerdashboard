import React from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';


import GTable from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import ChangeRackType from './changeRackType';

import {showTableFilter, filterApplied} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions';
import { makeAjaxCall } from '../../actions/ajaxActions';

import {wsOverviewData} from './../../constants/initData.js';
import {msuConfigRefreshed} from './../../actions/systemActions';


import {
    APP_JSON, POST, GET,
    FETCH_MSU_CONFIG_LIST,
    MSU_CONFIG_POLLING_INTERVAL,
    FETCH_MSU_CONFIG_RELEASE_MSU
} from '../../constants/frontEndConstants';

import {
    MSU_CONFIG_URL,
} from '../../constants/configConstants';

const messages=defineMessages({
    readyForReconfigurationStatus: {
        id: 'msuConfig.readyForReconfiguration.status',
        description: "Ready For Reconfiguration",
        defaultMessage: "Ready For Reconfiguration"
    },

    putBlockedStatus: {
        id: "msuConfig.putBlocked.status",
        description: "Put blocked status",
        defaultMessage: "Put blocked"
    },
    reconfigReadyStatus: {
        id: "msuConfig.reconfigReady.status",
        description: "Msu empty status",
        defaultMessage: "MSU empty"
    },
    completeStatus: {
        id: "msuConfig.complete.status",
        description: "reconfiguration complete for Msu",
        defaultMessage: "Reconfiguration complete "
    },
    droppingStatus: {
        id: "msuConfig.waiting.status",
        description: "Dropping MSU at config area",
        defaultMessage: "Dropping MSU at reconfig area"
    },
    droppedStatus: {
        id: "msuConfig.dropped.status",
        description: "Dropping MSU at config area",
        defaultMessage: "MSU dropped at the reconfig area"
    },
    storingBackStatus: {
        id: "msuConfig.storingBack.status",
        description: "Storing Back",
        defaultMessage: "Storing MSU back"
    }
    
});


class MsuConfigTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            statusMapping: {
                "ready_for_reconfiguration": this.props.intl.formatMessage(messages.readyForReconfigurationStatus),
                "put_blocked": this.props.intl.formatMessage(messages.putBlockedStatus),
                "reconfig_ready": this.props.intl.formatMessage(messages.reconfigReadyStatus),
                "complete": this.props.intl.formatMessage(messages.completeStatus),
                "waiting": this.props.intl.formatMessage(messages.droppingStatus),
                "dropped": this.props.intl.formatMessage(messages.droppedStatus),
                "storing_back": this.props.intl.formatMessage(messages.storingBackStatus) 
            }

        };
        this._changeDestinationType = this._changeDestinationType.bind(this);
        this._processMSUs = this._processMSUs.bind(this);
        this._blockPutAndChangeTypeCallback = this._blockPutAndChangeTypeCallback.bind(this);

    }

     componentDidMount(){
        
    }

    _blockPutAndChangeTypeCallback(){
        this.props.blockPutAndChangeTypeCallback();
    }

    _changeDestinationType(id){
        let msuList = this.props.msuList;
        let rackType = null;
        for(let i=0,len=msuList.length; i<len;i++){
            if(msuList[i].id === id){
                rackType = msuList[i].racktype;
                break;
            }
        }
        
        modal.add(ChangeRackType, {
            msuList: this.props.msuList,
            rackType: rackType,
            blockPutAndChangeTypeCallback: this._blockPutAndChangeTypeCallback,
            title: '',
            id,
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });
    }

    _processMSUs = (destType) => {
        let msuData = this.props.items;
       //let msuData = [{"id":"26","racktype":"15","__typename":"MsuFilter"},{"id":"25","racktype":"15","__typename":"MsuFilter"}];
        let msuDataLen = msuData ? msuData.length : 0; 
        let msuRows = []; 
        let processedData = {};

        if(msuDataLen){
            for(let i =0 ; i < msuDataLen; i++){
                let msuRow = [];

                if(msuData[i].id && msuData[i].racktype){
                    msuRow.push(<div className="msuIdWrapper"> 
                                    <div className="msuId">
                                        <FormattedMessage 
                                            id="msuConfig.table.msuText" 
                                            description="label for Msu Text" 
                                            defaultMessage="MSU {msuId}" 
                                            values={{msuId: msuData[i].id}} />
                                    </div>
                                    <div className="sourceType">
                                        <FormattedMessage 
                                            id="msuConfig.table.sourceType" 
                                            description="label for Source type" 
                                            defaultMessage="Source Type:{sourceType}" 
                                            values={{sourceType: msuData[i].racktype}} />
                                    </div>
                             </div>);

                     msuRow.push(<div className="msuIdWrapper">
                                {false ? 
                                    <div>
                                        <FormattedMessage 
                                            id="msuConfig.table.destType" 
                                            description="label for Destination Type" 
                                            defaultMessage="Selected destination type: {destType}"
                                            values={{destType: "TBD"}} />
                                    </div>: <div> </div>
                                    }
                                 </div>);

                    msuRow.push(<div className="msuIdWrapper">
                                {false ? 
                                    <div>
                                        <FormattedMessage 
                                            id="msuConfig.table.msuStatus" 
                                            description="label for MSU status" 
                                            defaultMessage="{status}"
                                            values={{status: "TBD"}} />
                                    </div>:<div> </div>
                                }
                                    </div>);


                    msuRow.push(<div key={msuData[i].id} style={{textAlign:"center"}}>
                        <button className="changeDestTypeBtn" onClick={() => this._changeDestinationType(msuData[i].id)}>
                            <FormattedMessage id="msuConfig.table.changeDestType" description="button label for change destination type" defaultMessage="CHANGE DESTINATION TYPE"/>
                        </button>
                    </div>);

                    msuRows.push(msuRow);
                }

                else{
                    msuRow.push(<div className="msuIdWrapper"> 
                            <div className="msuId">
                                <FormattedMessage 
                                    id="msuConfig.table.msuText" 
                                    description="label for Msu Text" 
                                    defaultMessage="MSU {msuId}" 
                                    values={{msuId: msuData[i].rack_id}} />
                            </div>
                            <div className="sourceType">
                                <FormattedMessage 
                                    id="msuConfig.table.sourceType" 
                                    description="label for Source type" 
                                    defaultMessage="Source Type:{sourceType}" 
                                    values={{sourceType: msuData[i].source_type}} />
                            </div>
                         </div>);

                    msuRow.push(<div className="msuIdWrapper">
                                    <FormattedMessage 
                                        id="msuConfig.table.destType" 
                                        description="label for Destination Type" 
                                        defaultMessage="Selected destination type: {destType}"
                                        values={{destType: msuData[i].destination_type}} />
                                 </div>);

                    msuRow.push(<div className="msuIdWrapper">
                                    <FormattedMessage 
                                                    id="msuConfig.table.msuStatus" 
                                                    description="label for MSU status" 
                                                    defaultMessage="{status}"
                                                    values={{status: this.state.statusMapping[msuData[i].status]}} />
                                    </div>);

                    msuRows.push(msuRow);
                }
                
            }
            processedData.msuData = msuRows;
        }
        processedData.offset = 0;
        processedData.max= msuRows.length;
        return processedData;
    }

    render() {
        const processedMsuData = this._processMSUs();
        return (
            <div>
            {this.props.items && this.props.items.length? 
                (<div className="msuConfigTableWrapper">
                    <GTable options={['table-bordered']}>
                        <GTableBody data={processedMsuData.msuData}>
                            {processedMsuData.msuData ? processedMsuData.msuData.map(function (row, idx) {
                                return(
                                    <GTableRow key={idx} index={idx} offset={processedMsuData.offset} max={processedMsuData.max} data={processedMsuData.msuData}>
                                        {Object.keys(row).map(function (text, index) {
                                            return <div key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"80px"}} className="cell" >
                                                {row[text]}
                                            </div>
                                        })}
                                    </GTableRow>
                                )
                            }):""}
                        </GTableBody>
                    </GTable>
                </div>): ""
            }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        orderData: state.getOrderDetail || {},
        statusFilter: state.filterOptions.statusFilter || null,
        intlMessages: state.intl.messages,
        timeOffset: state.authLogin.timeOffset,
        auth_token: state.authLogin.auth_token,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        //msuList: state.msuInfo.msuList,
        timeZone:state.authLogin.timeOffset,
        msuConfigRefreshed: state.msuInfo.msuConfigRefreshed,
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },
        msuConfigRefreshed:function(data){dispatch(msuConfigRefreshed(data))},


    }
};

MsuConfigTable.defaultProps = {
    msuList: [],
}

MsuConfigTable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    setOrderFilter: React.PropTypes.func,
    sortHeaderState: React.PropTypes.func,
    refreshOption: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    isFilterApplied: React.PropTypes.bool,
    timeZoneString: React.PropTypes.string,
    lastUpdated: React.PropTypes.string,
    responseFlag: React.PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MsuConfigTable));