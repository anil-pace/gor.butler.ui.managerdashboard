import React from 'react';
import {connect} from 'react-redux';
import {modal} from 'react-redux-modal';
import {FormattedMessage, defineMessages, FormattedRelative} from 'react-intl';

import {
    GOR_TABLE_HEADER_HEIGHT,
    DEBOUNCE_TIMER
} from '../../constants/frontEndConstants';
import {debounce} from '../../utilities/debounce';

// import OrderFilter from './orderFilter';
// import Dropdown from '../../components/dropdown/dropdown'
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

import {ORDERS_RETRIEVE, GOR_BREACHED, BREACHED, GOR_EXCEPTION, toggleOrder, INITIAL_HEADER_SORT, sortOrderHead, sortOrder, WS_ONSEND, EVALUATED_STATUS,
    ANY, DEFAULT_PAGE_SIZE_OL, REALTIME, ORDERS_FULFIL_FETCH, APP_JSON, POST, GET, ORDERS_SUMMARY_FETCH, ORDERS_CUT_OFF_TIME_FETCH, ORDERS_PER_PBT_FETCH, ORDERLINES_PER_ORDER_FETCH
} from '../../constants/frontEndConstants';

import {
    FETCH_MSU_CONFIG_LIST
} from '../../constants/frontEndConstants';

import {
    API_URL,
    ORDERS_URL,
    PAGE_SIZE_URL,
    PROTOCOL,
    ORDER_PAGE,
    UPDATE_TIME_UNIT, UPDATE_TIME,
    EXCEPTION_TRUE,
    WAREHOUSE_STATUS_SINGLE,
    WAREHOUSE_STATUS_MULTIPLE,
    FILTER_ORDER_ID, GIVEN_PAGE, GIVEN_PAGE_SIZE, ORDER_ID_FILTER_PARAM,ORDER_ID_FILTER_PARAM_WITHOUT_STATUS,
    ORDERS_FULFIL_URL, ORDERS_SUMMARY_URL, ORDERS_CUT_OFF_TIME_URL, ORDERS_PER_PBT_URL, ORDERLINES_PER_ORDER_URL
} from '../../constants/configConstants';

import {
    MSU_CONFIG_URL,
    MSU_CONFIG_LIST_FETCH
} from '../../constants/configConstants';


class MsuConfigTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this._changeDestinationType = this._changeDestinationType.bind(this);
    }

    componentDidMount(){
        this._requestMsuList();
    }

    _requestMsuList(){
        console.log("_requestMsuList get called");
        // let formData={
        //     "start_date": this.state.date,
        //     "end_date": this.state.date,
        // };

        let params={
            'url':ORDERS_CUT_OFF_TIME_URL,
            'url': MSU_CONFIG_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERS_CUT_OFF_TIME_FETCH,
            'cause' : FETCH_MSU_CONFIG_LIST
            //'formdata':formData,
        }
        this.props.makeAjaxCall(params);
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
                msuRow.push(<div className="msuIdWrapper"> 
                                <div className="msuId">
                                    <FormattedMessage id="msuConfig.table.msuText" description="label for Msu Text" defaultMessage="MSU {msuId}" values={{msuId: msuData[i].msu_id}} />
                                </div>
                                <div className="sourceType">
                                    <FormattedMessage id="msuConfig.table.sourceType" description="label for Source type" defaultMessage="Source Type: {sourceType}" values={{sourceType: "B"}} />
                                </div>
                             </div>);

                msuRow.push(<div className="msuIdWrapper"> </div>);
                msuRow.push(<div className="msuIdWrapper"> </div>);

                msuRow.push(<div key={i} style={{textAlign:"center"}}>
                        <button className="changeDestTypeBtn" onClick={() => this._changeDestinationType(msuData[i].msu_id)}>
                            <FormattedMessage id="msuConfig.table.changeDestType" description="button label for change destination type" defaultMessage="CHANGE DESTINATION TYPE"/>
                        </button>
                    </div>);
                msuRows.push(msuRow);
            }
            processedData.msuData = msuRows;
        }
        processedData.offset = 0;
        processedData.max= msuRows.length;
        return processedData;
    }

    render() {
        console.log("==========================>");
        console.log("=======RENDER ===========>");
        console.log("FETCH_MSU_CONFIG_LIST" + this.props.msuList);
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

export default connect(mapStateToProps, mapDispatchToProps)(MsuConfigTable);