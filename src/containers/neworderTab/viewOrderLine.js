import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';
import {GTable} from '../../components/gor-table-component/index'
import {GTableHeader,GTableHeaderCell} from '../../components/gor-table-component/tableHeader';
import {GTableBody} from "../../components/gor-table-component/tableBody";
import {GTableRow} from "../../components/gor-table-component/tableRow";
import Accordion from '../../components/accordion/accordion';
import ProgressBar from '../../components/progressBar/progressBar';
import SearchFilter from '../../components/searchFilter/searchFilter';



var oHeaderData = ["Order Lines", "ProgressBar", "10 cases picked      102 inners picked     10 each"];
var oData = [
    {orderId: "ORDER 123", progressBar: "5", totalOrder: "Total orders 1"},
    {orderId: "ORDER 321", progressBar: "pending", totalOrder: "Total orders 1"},
    {orderId: "ORDER 456", progressBar: "1", totalOrder: "Total orders 1"},
    {orderId: "ORDER 654", progressBar: "70", totalOrder: "Total orders 1"},
  ];

class ViewOrderLine extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.state={
        initialItems: [
            {orderId: "ORDER 123", progressBar: "5", totalOrder: "Total orders 1"},
            {orderId: "ORDER 321", progressBar: "pending", totalOrder: "Total orders 1"},
            {orderId: "ORDER 456", progressBar: "1", totalOrder: "Total orders 1"},
            {orderId: "ORDER 654", progressBar: "70", totalOrder: "Total orders 1"},
        ],
       items: []
      }
      this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.setState({items: this.state.initialItems})
  }

  _removeThisModal() {
    this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this._removeThisModal();
    }
  }

  handleChange(event) {
    var updatedList = this.state.initialItems;
    var queryResult=[];
    updatedList.forEach(function(item){
            if(item.orderId.toLowerCase().indexOf(event)!=-1)
              queryResult.push(item);
    });
    this.setState({items: queryResult});
  }

  _processData(){
    let oDataLen = oData.length;
    let orderRows = [];
    let processedData = {};

    if(oDataLen){
      for(let i=0; i < oDataLen; i++){
        let orderRow = [];
        orderRow.push(<div style={{padding: "2px 35px"}}> {oData[i].orderId} </div>);
        orderRow.push(<div className="cellWrapper"> <ProgressBar progressWidth={oData[i].progressBar}/> </div>);
        orderRow.push(oData[i].totalOrder);
        if(oData[i].action === true){
          orderRow.push(<div key={i} className="gorButtonWrap">
                    <button>
                    <FormattedMessage id="orders.view orderLines" description="button label for view orderlines" defaultMessage="VIEW ORDERLINES "/>
                    </button>
                  </div>);
        }
        else{
          orderRow.push(<div> </div>);
        }
        orderRows.push(orderRow);
      }
      processedData.orderData = orderRows;
    }
        // processedData.offset = 0;
        // processedData.max= waveRows.length;
    return processedData;
  }

  render()
  {
    var processedData = this._processData();
       return (
        <div>
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <span className='orderIdWrapper'>
                <FormattedMessage id="orders.orderId" description='Heading for view orderline' defaultMessage='Order ID'/>
              </span>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>

            <div className='gor-modal-body'>
              <div className="orderDetailsWrapper">
                  <div className="orderDetailsHeader">
                    <FormattedMessage id="orders.orderdetails" description='Heading for Order details' defaultMessage='Order details'/>
                  </div>
                  <div className="orderDetailsContent">
                      <div className="orderDetailsLeft"> 
                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.ppsId" description='pps id' defaultMessage='PPS ID:'/> </span>
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.binNo" description='bin no' defaultMessage='Bin no:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-1-span-key"> <FormattedMessage id="orders.operator" description='operator' defaultMessage='Operator:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.operator" description='lines received' defaultMessage='Lines received:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.linesinprogress" description='lines in progress' defaultMessage='Lines in progress:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-2-span-key"> <FormattedMessage id="orders.linescompleted" description='lines completed' defaultMessage='Lines completed:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                          </div>

                          <div className="orderDetailsColumn">
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.waveId" description='wave id' defaultMessage='Wave ID:'/> </span> 
                                <span className="spanValue"> --- </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.cutofftime" description='cut off time' defaultMessage='Cut off time:'/> </span> 
                                <span className="spanValue"> --- hrs </span> 
                              </div>
                              <div className="orderDetailsRow"> 
                                <span className="spanKey col-3-span-key"> <FormattedMessage id="orders.timeleft" description='time left' defaultMessage='Time left:'/> </span> 
                                <span className="spanValue"> --- hrs left </span> 
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="orderDetailsSearchWrap"> 
                      <SearchFilter handleChange={this.handleChange} />
                  </div>
                  
              </div>
              <div className="orderDetailsListWrapper">
                <GTable options={['table-bordered']}>

                    <GTableHeader>
                        {oHeaderData.map(function (header, index) {
                            return (
                              <GTableHeaderCell style={{background: "#fafafa"}} key={index} header={header}>
                                  <span>{header}</span>
                              </GTableHeaderCell>
                            )
                        })}
                    </GTableHeader>

                    <GTableBody data={this.state.items} >
                      {this.state.items ? this.state.items.map(function (row, idx) {
                          return (
                            <GTableRow key={idx} index={idx} offset={processedData.offset} max={processedData.max} data={row}>
                                {Object.keys(row).map(function (text, index) {
                                    return <div style={{height: "70px"}} key={index} style={processedData.orderData[index]?{flex:'1 0 '+processedData.orderData[index].width+"%"}:{}} className="cell" >
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
export default ViewOrderLine;

