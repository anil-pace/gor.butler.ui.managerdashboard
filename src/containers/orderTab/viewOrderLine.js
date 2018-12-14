import React  from 'react';
import { FormattedMessage, defineMessages, injectIntl, FormattedTime } from 'react-intl'; 
import { connect } from 'react-redux';
import GTable from '../../components/gor-table-component/index'
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import ProgressBar from '../../components/progressBar/progressBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

import { makeAjaxCall } from '../../actions/ajaxActions';
import {APP_JSON, GET, ORDERLINES_PER_ORDER_FETCH} from '../../constants/frontEndConstants';
import {ORDERLINES_PER_ORDER_URL} from '../../constants/configConstants';

const messages=defineMessages({
    inProgressStatus: {
        id: 'orderList.inProgress.status',
        description: "In 'inProgress' for orders",
        defaultMessage: "In progress"
    },
    completedStatus: {
        id: "orderList.completed.status",
        description: " 'completed' status",
        defaultMessage: "Completed"
    },
    cancelledStatus: {
        id: "orderList.cancelled.status",
        description: " 'Cancelled' status",
        defaultMessage: "Cancelled"
    },
    createdStatus: {
        id: "orderList.created.status",
        description: " 'created' status",
        defaultMessage: "Created"
    },
    
    onHoldStatus: {
        id: 'orderlist.onHold.status',
        description: " 'Refreshed' status",
        defaultMessage: 'On hold'
    },
    notFulfillableStatus: {
        id: 'orderlist.notFulfillale.status',
        description: " 'Refreshed' status",
        defaultMessage: 'Not fulfillable'
    },
    cutOffTime:{
        id: 'orderlist.cutOffTime.time',
        description: " cut off time in hrs",
        defaultMessage: 'Cut off time {cutOffTime} hrs'
    },
    orderId:{
        id: 'orders.order.orderId',
        description: "order id",
        defaultMessage: 'Order {orderId}'
    },
    totalOrderLines: {
        id: 'orders.orderlines.total',
        description: "total orderlines",
        defaultMessage: 'Total {totalOrderlines}'
    },
    skuId:{
        id: 'orders.orderlines.skuId',
        description: "sku id",
        defaultMessage: 'SKU -  {skuId}'
    }
});


class ViewOrderLine extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.state={
        headerItems: [],
        items: [],
        statusMapping:{
            "CREATED": this.props.intl.formatMessage(messages.createdStatus),
            "PROCESSING": this.props.intl.formatMessage(messages.inProgressStatus),
            "PROCESSED": this.props.intl.formatMessage(messages.completedStatus),
            "FAILED": this.props.intl.formatMessage(messages.notFulfillableStatus),
            "CANCELED": this.props.intl.formatMessage(messages.cancelledStatus),
            "CANCELLED": this.props.intl.formatMessage(messages.cancelledStatus),
            "WAITING": this.props.intl.formatMessage(messages.onHoldStatus)

        }
      }
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this._getOrdersLines(this.props.orderId);
  }

  componentWillReceiveProps(nextProps){
      let olineHeaderData = nextProps.orderLines || [];
      let olineData= nextProps.orderLines.orderlines || []; 
      this.setState({
        headerItems: olineHeaderData,
        items: olineData
      });
  }
  
  _getOrdersLines = (orderId) =>  {
        let params={
            'url':ORDERLINES_PER_ORDER_URL+"/"+orderId,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause':ORDERLINES_PER_ORDER_FETCH,
        }
        this.props.makeAjaxCall(params);
    }

  _removeThisModal() {
      this.props.removeModal();
  }

  handleChange(event) {
    var updatedList = this.props.orderLines.orderlines;
    var queryResult=[];
    updatedList.forEach(function(item){
    let pdfa_values_split = item.pdfa_values[0]?item.pdfa_values[0].substring(1,item.pdfa_values[0].length-1).split(","):[];
    var rawItem=pdfa_values_split[0].split("=");
            if(rawItem[1].toLowerCase().indexOf(event.toLowerCase())!=-1)
              queryResult.push(item);
    });
    this.setState({items: queryResult});
  }

  _formatProgressBar(nr, dr){
      let x = {};
      const numerator = (nr)?nr:0;
      const denominator = (dr)?dr:0;
      if(numerator === 0 && denominator === 0){ // when nothing has started
            x.message = (<FormattedMessage id="orders.pending.status" description="status" defaultMessage="Pending"/>);
            x.action = false;
        }

        else if(numerator === denominator){ // when ALL orders has been processed
            x.message=(<FormattedMessage id="orders.toBePicked.status" description="status" defaultMessage="{total} products picked"
                      values={{total:denominator}} />);
            x.action = true;
        }
        else if(numerator === 0){ // when ALL are remaining to be picked
            x.message=(<FormattedMessage id="orders.productsPicked.status" description="status" defaultMessage="{current} products to be picked"
                      values={{current:denominator}} />);
            x.action = true;
        }else if (denominator === 0 && numerator>0){ // in case the denominator is less than or equal to 0 because of an issue at the backend.
            x.message=(<FormattedMessage id="orders.toBePicked.status" description="status" defaultMessage="{total} products picked"
            values={{total:numerator}} />);
        x.action = true;
        } else{
            x.width = (numerator/denominator)*100; 
            x.message = (<FormattedMessage id="orders.inProgress.status" description="status" defaultMessage="{current} of {total} products picked"
                            values={{current:numerator, total: denominator}} />);
            x.action  = true;
        }
        return x;
    }

  _processOLHeader = (arg) => {
    let olHeaderLen = arg.length;
    let olineHeaders = [];
    let processedData = {};


        let olineHeader = [];
        let formatOLTotal = (arg.total_orderlines ? this.props.intl.formatMessage(messages.totalOrderLines, {totalOrderlines: arg.total_orderlines}): "null");

        olineHeader.push(<div style={{marginLeft: "20px"}} className="DotSeparatorWrapper">
                        <DotSeparatorContent header={["Order Lines"]} subHeader={[formatOLTotal]}/>
                      </div>);

        let formatProgressBar = this._formatProgressBar(arg.picked_products_count, arg.total_products_count);
        olineHeader.push( <div>
                          {formatProgressBar.width ?
                              <div className="ProgressBarWrapper">
                                  <ProgressBar progressWidth={formatProgressBar.width}/>
                              </div>: null
                          }
                          <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                     </div>);

        olineHeader.push(<div> {arg.status} </div>);
        
        olineHeaders.push(olineHeader);
      processedData.olineHeader = olineHeaders;
    processedData.offset = 0;
    processedData.max= olineHeaders.length;
    return processedData;
  }

  _processOLList = (arg) => {
    let olDataLen = arg.length;
    let olineRows = [];
    let processedData = {};
    if(olDataLen){
      for(let i=0; i < olDataLen; i++){
        let olineRow = [];
        let subHeaderData = [];
        let pdfa_values_split = arg[i].pdfa_values[0].substring(1,arg[i].pdfa_values[0].length-1).split(","); // converts to string and then splits
        let pdfa_values_split_sku = pdfa_values_split[0].split("="); // splits first element to extract sku id
        let skuId = pdfa_values_split_sku[1].substring(2,pdfa_values_split_sku[1].length-1);
        let formatSkuId = this.props.intl.formatMessage(messages.skuId, {skuId: skuId });
        /* create content for subHeader */
        for(let k = 1; k< pdfa_values_split.length; k++){
          subHeaderData.push(pdfa_values_split[k]);
        } 
        
        olineRow.push(<div style={{marginLeft: "20px"}} className="DotSeparatorWrapper">
                        <DotSeparatorContent header={[formatSkuId]} headerClassName="viewOrderLinesHeader" subHeader={subHeaderData} subheaderClassName="subheaderName viewOrderLinesSubHeader" separator={<span className="straightLine">|</span>}/>
                    </div>);

        let formatProgressBar = this._formatProgressBar(arg[i].pick_products_count, arg[i].total_products_count);
        olineRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <div style={{width: "100%"}}>
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                    </div>
                             </div>);
      olineRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"flex-start"}}>
                                        <span> {this.state.statusMapping[arg[i].status] ? this.state.statusMapping[arg[i].status] : arg[i].status} </span>
                                        <span> {arg[i].missing_count > 0 ? arg[i].missing_count : ""} </span>
                                        <span> {arg[i].damaged_count > 0 ? arg[i].damaged_count : ""} </span>
                                        <span> {arg[i].physically_damaged_count > 0 ? arg[i].physically_damaged_count : ""} </span>
                                        <span> {arg[i].unfulfillable_count > 0 ? arg[i].unfulfillable_count : ""} </span>
                                        <span> {arg[i].missing_count > 0 ? arg[i].missing_count : ""} </span>
                             </div>);

        olineRows.push(olineRow);
      }
      processedData.olineData = olineRows;
    }
    processedData.offset = 0;
    processedData.max= olineRows.length;
    return processedData;
  }

  _calculateTimeLeft(cutOffTimeFromBK){
        let timeLeft, d1, d2, diff;

        if(cutOffTimeFromBK){
            d1 = new Date();
            d2= new Date(cutOffTimeFromBK);
            diff = d2 - d1;

            if(diff > 3600000){ // 3600 * 1000 milliseconds is for 1 hr
                timeLeft = Math.floor (diff / 3600000) + " hrs left";
            }
            else if(diff > 60000){ // 60 *1000 milliseconds is for 1 min
                timeLeft = Math.floor(diff / 60000) + " mins left";
            }
            else if(diff > 1000){  // 1000 milliseconds is for 1 sec
                timeLeft = Math.floor(diff / 1000) + " seconds left";
            }
            else{
                timeLeft = "";
            }
            return timeLeft;
        }
    }

  render(){
    let processedHeader = this._processOLHeader(this.state.headerItems);
    let processedList = this._processOLList(this.state.items);

    let formatCutOffTime = (this.props.orderLines.cut_off_time ? <FormattedMessage id="orders.orderlines.cutofftime" description="orderlines cut off time" 
                          defaultMessage="{cutOffTime} hrs" 
                         values={{cutOffTime:<FormattedTime
                                     value={this.props.orderLines.cut_off_time}
                                     hour= "numeric"
                                     minute= "numeric"
                                     timeZone= {this.props.timeOffset}
                                     hour12= {false}/>
                                 }} /> : "NO CUT OFF TIME");

      let formatTimeLeft = this._calculateTimeLeft(this.props.orderLines.cut_off_time);

       return (
        <div className="gor-order-modal">
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <span className='orderIdWrapper'>
                <FormattedMessage id="orders.oLines.orderId" description='Heading for view orderline' defaultMessage='Order ID'/>
                <span> {this.props.orderId}</span>
              </span>
              <span className="close" onClick={this._removeThisModal.bind(this)}>x</span>
            </div>

            <div className='gor-modal-body'>
              <div className="orderDetailsWrapper">
                  <div className="orderDetailsHeader">
                    <FormattedMessage id="orders.oLines.oDetails" description='Heading for Order details' defaultMessage='Order details'/>
                  </div>
                  <div className="orderDetailsContent">
                      <div className="orderDetailsLeft"> 
                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-1-span-key"> <FormattedMessage id="orders.oLines.ppsId" description='pps id' defaultMessage='PPS ID:'/> </span>
                                <span className="spanValues"> {this.props.orderLines.pps_id} </span> 
                              </div>
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-1-span-key"> <FormattedMessage id="orders.oLines.binNo" description='bin no' defaultMessage='Bin no:'/> </span> 
                                <span className="spanValues"> {this.props.orderLines.pps_bin_id} </span> 
                              </div>
                              {this.props.orderLines.username ? 
                                <div className="orderDetailsRows"> 
                                    <span className="spanKeys col-1-span-key"> <FormattedMessage id="orders.oLines.operator" description='operator' defaultMessage='Operator:'/> </span> 
                                    <span className="spanValues"> {this.props.orderLines.username} </span> 
                                </div> : <div className="orderDetailsRows"> &nbsp;</div>}
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-2-span-key"> <FormattedMessage id="orders.oLines.pending" description='lines received' defaultMessage='Lines received:'/> </span> 
                                <span className="spanValues"> {this.props.orderLines.total_orderlines}  </span> 
                              </div>
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-2-span-key"> <FormattedMessage id="orders.oLines.linesinprogress" description='lines in progress' defaultMessage='Lines in progress:'/> </span> 
                                <span className="spanValues"> {this.props.orderLines.pending_orderlines} </span> 
                              </div>
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-2-span-key"> <FormattedMessage id="orders.oLines.linescompleted" description='lines completed' defaultMessage='Lines completed:'/> </span> 
                                <span className="spanValues"> {this.props.orderLines.completed_orderlines} </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-3-span-key"> <FormattedMessage id="orders.oLines.cutofftime" description='cut off time' defaultMessage='Cut off time:'/> </span> 
                                <span className="spanValues"> {formatCutOffTime} </span> 
                              </div>
                              <div className="orderDetailsRows"> 
                                <span className="spanKeys col-3-span-key"> <FormattedMessage id="orders.oLines.timeleft" description='time left' defaultMessage='Time left:'/> </span> 
                                <span className="spanValues"> {formatTimeLeft} </span> 
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="orderDetailsSearchWrap"> 
                      <SearchFilter placeHolder="Search product" handleChange={this.handleChange} />
                  </div>
                  
              </div>
              <div className="orderDetailsListWrapper">
                <GTable options={['table-bordered']}>

                    <GTableBody data={processedHeader.olineHeader} > 
                      {processedHeader.olineHeader ? processedHeader.olineHeader.map(function (row, idx) {
                          return (
                            <GTableRow key={idx} index={idx} offset={processedHeader.offset} max={processedHeader.max} data={row}>
                                {Object.keys(row).map(function (text, index) {
                                    return <div style={{height: "70px"}} key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px", background: "#fafafa", borderTop: "2px solid #dddddd"}} className="cell" >
                                        {row[text]}
                                    </div>
                                })}
                            </GTableRow>
                          )
                        }):""}
                    </GTableBody>

                    <GTableBody data={processedList.olineData} > {/*<GTableBody data={this.state.items} >*/}
                      {processedList.olineData ? processedList.olineData.map(function (row, idx) {
                          return (
                            <GTableRow key={idx} index={idx} offset={processedList.offset} max={processedList.max} data={row}>
                                {Object.keys(row).map(function (text, index) {
                                    return <div style={{height: "70px"}} key={index} style={{padding:"0px", display:"flex", flexDirection:"column", justifyContent:'center', height:"75px"}} className="cell" >
                                        {row[text]}
                                    </div>
                                })}
                            </GTableRow>
                          )
                        }):""}
                    </GTableBody> 
                    
                </GTable>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  ViewOrderLine.PropTypes={
    orderLines: React.PropTypes.object,
}

  ViewOrderLine.defaultProps = {
    orderLines: {},
}

  function mapStateToProps(state, ownProps) {
    return {
        orderLines: state.orderDetails.orderLines,
        timeZone:state.authLogin.timeOffset
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        makeAjaxCall: function(params){
          dispatch(makeAjaxCall(params))
        },
    }
};

  export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ViewOrderLine)) ;
