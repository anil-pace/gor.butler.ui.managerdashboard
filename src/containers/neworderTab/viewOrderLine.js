import React  from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl'; 
import { connect } from 'react-redux';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import Accordion from '../../components/accordion/accordion';
import ProgressBar from '../../components/progressBar/progressBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';

import { makeAjaxCall } from '../../actions/ajaxActions';
import {APP_JSON, POST, GET, ORDERLINES_PER_ORDER_FETCH} from '../../constants/frontEndConstants';
import {ORDERLINES_PER_ORDER_URL} from '../../constants/configConstants';

let xyz={"pps_bin_id":null,"total_orderlines":0,"user_name":null,"pending_orderlines":0,"cut_off_time":null,"pps_id":null,"orderlines":[],"pick_info":"will not do","is_breached":"todo","completed_orderlines":0};

class ViewOrderLine extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.state={
        headerItems: [],
        items: []
      }
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this._getOrdersLines(this.props.orderId);
  }

  componentWillReceiveProps(nextProps){
    //if(JSON.stringify(this.props.orderLines.orderlines)!== JSON.stringify(nextProps.orderLines.orderlines)){
      let olineHeaderData = nextProps.orderLines || [];
      let olineData= nextProps.orderLines.orderlines || []; 
      this.setState({
        headerItems: olineHeaderData,
        items: olineData
      });
    //}

    if (nextProps.socketAuthorized && nextProps.location.query && (!this.state.query || (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.state.query)))) {
            this.setState({query: JSON.parse(JSON.stringify(nextProps.location.query))});
            //this.setState({orderListRefreshed: nextProps.orderListRefreshed})
            //this._subscribeData()
            this._refreshList(nextProps.location.query)
        }
  }
  
  _getOrdersLines = (orderId) =>  {
        console.log('%c ==================>!  ', 'background: #222; color: #bada55');
            console.log("LEVEL 3 ORDER LINES REQUESTED WITH ORDER ID" + orderId);
        let params={
            //'url':ORDERLINES_PER_ORDER_URL+"/"+orderId,
            url: ORDERLINES_PER_ORDER_URL,
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
            if(item.orderline_id.toLowerCase().indexOf(event)!=-1)
              queryResult.push(item);
    });
    this.setState({items: queryResult});
  }

  _formatProgressBar(nr, dr){
      let x = {};
      
      if(nr === 0 && dr === 0){
            x.message = (<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="Pending"/>);
            x.action = false;
        }
        else if(nr === 0){
            x.message=(<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="{current} products to be picked"
                      values={{current:dr}} />);
            x.action = false;
        }
        else{
        x.width = (nr/dr)*100;
        x.message = (<FormattedMessage id="orders.progress.pending" description="pending" defaultMessage="{current} of {total} products picked"
                            values={{current:nr, total: dr}} />);
            x.action  = true;
      }
      return x;
    }

  _processOLHeader = (arg) => {
    let olHeaderLen = arg.length;
    let olineHeaders = [];
    let processedData = {};

    //if(olHeaderLen){
      //for(let i=0; i < olHeaderLen; i++){

        let olineHeader = [];

        let formatOLTotal = (<FormattedMessage id="orders.orderlines.total" description="total orderlines" defaultMessage="Total {totalOrderlines}"
                                        values={{totalOrderlines:arg.total_orderlines}} />)

        olineHeader.push(<div style={{marginLeft: "20px"}} className="DotSeparatorWrapper">
                        <DotSeparatorContent header={["Order Lines"]} subHeader={[formatOLTotal]}/>
                      </div>);

        let formatProgressBar = this._formatProgressBar(arg.picked_products_count, arg.total_products_count);
        olineHeader.push( <div>
                          <div className="ProgressBarWrapper">
                            <ProgressBar progressWidth={formatProgressBar.width}/>
                          </div>
                          <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                     </div>);

        olineHeader.push(<div> {arg.status} </div>);
        
        olineHeaders.push(olineHeader);
      //}
      processedData.olineHeader = olineHeaders;
    //}
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
        let formatSkuId = (arg[i].orderline_id ? <FormattedMessage id="orders.orderlines.skuId" description="sku id" defaultMessage="SKU -  {skuId}" values={{skuId: arg[i].orderline_id}} />: "null")

        olineRow.push(<div style={{marginLeft: "20px"}} className="DotSeparatorWrapper">
                        <DotSeparatorContent header={[formatSkuId]} subHeader={[arg[i].pdfa_values[0]]}/>
                    </div>);

        let formatProgressBar = this._formatProgressBar(arg[i].pick_products_count, arg[i].total_products_count);
        olineRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                                    <div style={{width: "100%"}}>
                                        <div className="ProgressBarWrapper">
                                            <ProgressBar progressWidth={formatProgressBar.width}/>
                                        </div>
                                        <div style={{paddingTop: "10px", color: "#333333", fontSize: "14px"}}> {formatProgressBar.message}</div> 
                                    </div>
                             </div>);
      olineRow.push( <div style={{display: "flex", alignItems: "center", justifyContent:"flex-start"}}>
                                        <span> {arg[i].status} </span>
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

  render(){
    console.log('%c ==================>!  ', 'background: #222; color: #bada55', "=============> RENDER FUNCTION BEING CALLED" + JSON.stringify(this.props.orderLines));
    let processedHeader = this._processOLHeader(this.state.headerItems);
    let processedList = this._processOLList(this.state.items);
    let formatCutOffTime = (this.props.orderLines.cut_off_time ?  
                          <FormattedMessage id="orders.pbt.cutofftime" description="cut off time" defaultMessage="{cutOffTime} hrs"
                                        values={{cutOffTime:this.props.orderLines.cut_off_time.split(" ")[1]}} />: "--");

    //let formatTimeLeft = (<FormattedRelative updateInterval={10000} value={orderData[i].completion_date} timeZone={this.props.timeZone}/>);

       return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <span className='orderIdWrapper'>
                <FormattedMessage id="orders.oLines.orderId" description='Heading for view orderline' defaultMessage='Order ID'/>
                <span> {this.props.orderId}</span>
              </span>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>

            <div className='gor-modal-body'>
              <div className="orderDetailsWrapper">
                  <div className="orderDetailsHeader">
                    <FormattedMessage id="orders.oLines.oDetails" description='Heading for Order details' defaultMessage='Order details'/>
                  </div>
                  <div className="orderDetailsContent">
                      <div className="orderDetailsLeft"> 
                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.oLines.ppsId" description='pps id' defaultMessage='PPS ID:'/> </span>
                                <span className="spanValue"> {this.props.orderLines.pps_id} </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.oLines.binNo" description='bin no' defaultMessage='Bin no:'/> </span> 
                                <span className="spanValue"> {this.props.orderLines.pps_bin_id} </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.oLines.operator" description='operator' defaultMessage='Operator:'/> </span> 
                                <span className="spanValue"> {this.props.orderLines.username} </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.oLines.pending" description='lines received' defaultMessage='Lines received:'/> </span> 
                                <span className="spanValue"> {this.props.orderLines.total_orderlines}  </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.oLines.linesinprogress" description='lines in progress' defaultMessage='Lines in progress:'/> </span> 
                                <span className="spanValue"> {this.props.orderLines.pending_orderlines} </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.oLines.linescompleted" description='lines completed' defaultMessage='Lines completed:'/> </span> 
                                <span className="spanValue"> {this.props.orderLines.completed_orderlines} </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.oLines.cutofftime" description='cut off time' defaultMessage='Cut off time:'/> </span> 
                                <span className="spanValue"> {formatCutOffTime} </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.oLines.timeleft" description='time left' defaultMessage='Time left:'/> </span> 
                                <span style={{color: "red"}} className="spanValue"> "Will not show because of UNexpected time format from backend." </span> 
                              </div>
                              {/*<div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.olines.waveId" description='wave id' defaultMessage='Wave ID:'/> </span> 
                                <span className="spanValue"> N/A </span> 
                              </div>*/}
                          </div>
                      </div>
                  </div>

                  <div className="orderDetailsSearchWrap"> 
                      <SearchFilter handleChange={this.handleChange} />
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

  export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderLine) ;

