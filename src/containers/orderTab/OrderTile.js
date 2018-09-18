import React  from 'react';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '../../components/progressBar/progressBar';

class OrderTile extends React.Component{
  constructor(props) 
  {
    super(props);
  } 

  _formatDate(arg){
    let dateObj = new Date(arg);
    let dateObjArr = dateObj.toString().split(" ");
    let dateFormat = dateObjArr[2] + " " + dateObjArr[1] + " " + dateObjArr[3];
    return dateFormat;
  }

  _formatProgressBarMessage(pickedItems, totalItems){
      let message; 
      if(pickedItems === 0 && totalItems === 0){
        message= (<FormattedMessage id="orders.fulfil.noProducts" description="default picked message" defaultMessage="No products to be picked"/>);
      }
      else if(pickedItems === totalItems){ 
          message=(<FormattedMessage id="orders.productsPicked.status" description="status" defaultMessage="{total} products picked" values={{total:totalItems}} />);
      }
      else{
          message = (<FormattedMessage id="orders.inProgress.status" description="status" defaultMessage="{current} of {total} products picked" 
            values={{current:<span style={{fontWeight:"bold"}}>{pickedItems}</span>, total: <span style={{fontWeight:"bold"}}>{totalItems}</span>}} />);
      }
      return message;
  }

  render()
  {
      const { orderFulfilData, orderSummaryData } = this.props;
      let fromDate, toDate;
      
      const picked_products_count = (orderFulfilData.picked_products_count)?Number(orderFulfilData.picked_products_count):0;
      const total_products_count = (orderFulfilData.total_products_count)?Number(orderFulfilData.total_products_count):0;
      const avgProgress = (picked_products_count / total_products_count) * 100
      // if we encounter NaN or Infinity situation in avgProgress
      const progressWidth = Math.ceil(parseInt(avgProgress,10))>1?100 : parseInt(avgProgress,10);
      let formatProgressBarMessage = this._formatProgressBarMessage(picked_products_count,total_products_count);
      let backgroundColor = (this.props.pbtsData.length > 0 ? "#ffffff" : "#fafafa");
      if(this.props.fromDate && this.props.toDate){
         fromDate = this._formatDate(this.props.fromDate);
         toDate = this._formatDate(this.props.toDate);
      }

      return (
          <div style={{background: backgroundColor}} className="orderTopWrapper">
              <div className="orderLeftWrapper">
                <div className="orderLeftContent">
                  <div className="dateTimeWrapper">
                      {fromDate && toDate ? fromDate + " - " +  toDate : this.props.date}
                  </div>
                  <div className="orderLeftHeader"> 
                    <FormattedMessage id="orders.fulfil" description="header of orders fulfilment" defaultMessage="Order fulfilment progress "/>
                  </div>
                  <ProgressBar progressWidth={ progressWidth ? progressWidth : 0}/>
                  <div className="orderLeftStatus">
                    <div className="statusRight">
                        <div> {formatProgressBarMessage}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="orderCenterWrapper"> </div>

              <div className="orderRightWrapper">
                <div className="orderRightContent">
                  
                  <div className="orderRightHeader"> 
                    <FormattedMessage id="orders.summary" description="header of orders summary" defaultMessage="Order summary "/>
                  </div>
                  <div className="orderRightStatusWrapper">
                    <ul className="summaryColumn">
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.ordersDone" description="orders completed" defaultMessage="{picked} Order(s) completed of {totalItems}"
                          values={{
                            picked:<span style={{fontWeight:"bold"}}>{orderSummaryData.completed_orders || 0}</span>,
                            totalItems:<span style={{fontWeight:"bold"}}>{orderSummaryData.total_orders || 0}</span>
                          }}
                        /> 
                       </li>
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.ordersProg" description="orders in progress" defaultMessage="{current} currently in progress"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.pending_orders || 0}</span> }}
                        />
                      </li>
                    </ul>

                    <ul className="summaryColumn">
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.olinesDone" description="orderlines completed" defaultMessage="{picked} Orderline(s) completed of {totalItems}"
                          values={{
                            picked:<span style={{fontWeight:"bold"}}>{orderSummaryData.completed_orderlines || 0}</span>,
                            totalItems:<span style={{fontWeight:"bold"}}>{orderSummaryData.total_orderlines || 0}</span> 
                          }}
                        />
                      </li>
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.olinesProg" description="orderlines in progress" defaultMessage="{current} currently in progress"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.pending_orderlines || 0}</span> }}
                        /> 
                      </li>
                    </ul>

                    <ul className="summaryColumn">
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.breached" description="breached orders" defaultMessage="{current} Breached orders"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.breached_orders || 0 }</span> }}
                        />
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div> 
      );
    }
  }

  export default OrderTile;