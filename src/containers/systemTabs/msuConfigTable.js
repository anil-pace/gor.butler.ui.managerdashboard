import React from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {FormattedMessage, defineMessages, FormattedRelative, injectIntl} from 'react-intl';

import {
    GOR_TABLE_HEADER_HEIGHT,
    DEBOUNCE_TIMER
} from '../../constants/frontEndConstants';
import {debounce} from '../../utilities/debounce';

// import Spinner from '../../components/spinner/Spinner';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import ChangeRackType from './changeRackType';

import {setOrderListSpinner, orderListRefreshed,setOrderQuery} from '../../actions/orderListActions';
import {orderHeaderSortOrder, orderHeaderSort, orderFilterDetail} from '../../actions/sortHeaderActions';
import {showTableFilter, filterApplied, orderfilterState, toggleOrderFilter} from '../../actions/filterAction';
import {updateSubscriptionPacket, setWsAction} from './../../actions/socketActions';
import { makeAjaxCall } from '../../actions/ajaxActions';

import {getDaysDiff} from '../../utilities/getDaysDiff';

import {stringConfig} from '../../constants/backEndConstants';
import {wsOverviewData} from './../../constants/initData.js';

import {getPageData, getStatusFilter, getTimeFilter, getPageSizeOrders, currentPageOrders, lastRefreshTime} from '../../actions/paginationAction';


import {
    APP_JSON, POST, GET,
    FETCH_MSU_CONFIG_LIST,
    MSU_CONFIG_POLLING_INTERVAL
} from '../../constants/frontEndConstants';

import {
    MSU_CONFIG_URL,
} from '../../constants/configConstants';

const messages=defineMessages({
    progressStatus: {
        id: 'msuConfig.progress.status',
        description: "In progrss for msus",
        defaultMessage: "Progress"
    },

    putBlockedStatus: {
        id: "msuConfig.putBlocked.status",
        description: "Put blocked status",
        defaultMessage: "Put Blocked"
    }

    // cancelledStatus: {
    //     id: "msuConfig.cancelled.status",
    //     description: " 'Cancelled' status",
    //     defaultMessage: "Cancelled"
    // },

    // createdStatus: {
    //     id: "msuConfig.created.status",
    //     description: " 'created' status",
    //     defaultMessage: "Created"
    // },
    // badRequestStatus: {
    //     id: 'msuConfig.badRequest.status',
    //     description: " 'Bad Request' status",
    //     defaultMessage: 'Bad request'
    // },
    // notFulfillableStatus: {
    //     id: 'msuConfig.notFulfillale.status',
    //     description: " 'Refreshed' status",
    //     defaultMessage: 'Not fulfillable'
    // },
    // acceptedStatus: {
    //     id: 'msuConfig.accepted.status',
    //     description: " 'accepted' status",
    //     defaultMessage: 'Accepted'
    // }
});


class MsuConfigTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            statusMapping: {
                "progress": this.props.intl.formatMessage(messages.progressStatus),
                "put_blocked": this.props.intl.formatMessage(messages.putBlockedStatus),
                // "cancelled": this.props.intl.formatMessage(messages.cancelledStatus),
                // "CREATED": this.props.intl.formatMessage(messages.createdStatus),
                // "BAD_REQUEST": this.props.intl.formatMessage(messages.badRequestStatus),
                // "not_fulfillable": this.props.intl.formatMessage(messages.notFulfillableStatus),
                // "ACCEPTED": this.props.intl.formatMessage(messages.acceptedStatus)
            }

        };
        this._changeDestinationType = this._changeDestinationType.bind(this);
    }

    componentWillUnmount(){
        this.clearTimeout(this._intervalIdForMsuList);
    }

    componentDidMount(){
        this._requestMsuList();
    }

    _requestMsuList(){
        let params={
            'url': MSU_CONFIG_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : FETCH_MSU_CONFIG_LIST
        }
        this.props.makeAjaxCall(params);
        this._intervalIdForMsuList = setTimeout(() => this._requestMsuList(), MSU_CONFIG_POLLING_INTERVAL);
    }

     _changeDestinationType = (orderId) =>  {
        modal.add(ChangeRackType, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;),
        });
    }

    _processMSUs = (arg) => {
        let msuData = arg;
        let msuDataLen = msuData.length; 
        let msuRows = []; 
        let processedData = {};

        if(msuDataLen){
            for(let i =0 ; i < msuDataLen; i++){
                let msuRow = [];

                if(msuData[i].id && msuData[i].racktype){
                    clearTimeout(this._intervalIdForMsuList);
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

                    msuRow.push(<div key={i} style={{textAlign:"center"}}>
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
        const processedMsuData = this._processMSUs(this.props.msuList);
        
        let noData= <FormattedMessage id="msuConfig.table.noMsuData" description="Heading for no Msu Data" defaultMessage="No MSUs with blocked puts"/>;

        return (
            <div>
            {this.props.msuList.length? 
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
                </div>): <div className="noDataWrapper"> {noData} </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        orderFilter: state.sortHeaderState.orderFilter || "",
        orderSortHeaderState: state.sortHeaderState.orderHeaderSortOrder || [],
        orderListSpinner: state.spinner.orderListSpinner || false,
        filterOptions: state.filterOptions || {},
        orderData: state.getOrderDetail || {},
        statusFilter: state.filterOptions.statusFilter || null,
        intlMessages: state.intl.messages,
        timeOffset: state.authLogin.timeOffset,
        auth_token: state.authLogin.auth_token,
        showFilter: state.filterInfo.filterState || false,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        orderFilterStatus: state.filterInfo.orderFilterStatus,
        orderFilterState: state.filterInfo.orderFilterState || {},
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
        socketAuthorized: state.recieveSocketActions.socketAuthorized,
        orderListRefreshed: state.ordersInfo.orderListRefreshed,
        pageNumber:(state.filterInfo.orderFilterState)? state.filterInfo.orderFilterState.PAGE :1,

        msuList: state.msuInfo.msuList,

        // pbts: state.orderDetails.pbts,
        // ordersPerPbt:state.orderDetails.ordersPerPbt,
        timeZone:state.authLogin.timeOffset
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        orderFilterDetail: function (data) {
            dispatch(orderFilterDetail(data))
        },
        orderHeaderSort: function (data) {
            dispatch(orderHeaderSort(data))
        },
        orderHeaderSortOrder: function (data) {
            dispatch(orderHeaderSortOrder(data))
        },

        setOrderListSpinner: function (data) {
            dispatch(setOrderListSpinner(data))
        },
        
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        orderfilterState: function (data) {
            dispatch(orderfilterState(data));
        },
        toggleOrderFilter: function (data) {
            dispatch(toggleOrderFilter(data));
        },
        orderListRefreshed: function (data) {
            dispatch(orderListRefreshed(data))
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        
        setOrderQuery: function (data) {
            dispatch(setOrderQuery(data));
        },
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        },


    }
};

MsuConfigTable.defaultProps = {
    pbts: [],
    msuList: [],
    ordersPerPbt: []
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