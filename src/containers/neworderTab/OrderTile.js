import React  from 'react';
import { FormattedMessage } from 'react-intl';
import ProgressBar from '../../components/progressBar/progressBar';

class OrderTile extends React.Component{
  constructor(props) 
  {
    super(props);
  } 

  render()
  {
      const { orderFulfilData, orderSummaryData } = this.props;
      const progressWidth = (orderFulfilData.picked_products_count / orderFulfilData.total_products_count) * 100;

      return (
          <div className="orderTopWrapper">
              <div className="orderLeftWrapper">
                <div className="orderLeftContent">
                  <div className="dateTimeWrapper">
                      {this.props.date}
                  </div>
                  <div className="orderLeftHeader"> 
                    <FormattedMessage id="orders.fulfil" description="header of orders fulfilment" defaultMessage="Order fulfuilment progress "/>
                  </div>
                  <ProgressBar progressWidth={ progressWidth ? progressWidth : 0}/>
                  <div className="orderLeftStatus">
                    <div className="statusLeft">
                      {orderFulfilData.pps_count ? 
                        (<div> 
                            <FormattedMessage id="orders.fulfil.ppsCount" description="pps count" defaultMessage="{current} PPS running"
                              values={{
                                current:<span style={{fontWeight:"bold"}}>{orderFulfilData.pps_count}</span>
                              }}
                            />
                          </div>) : <FormattedMessage id="orders.fulfil.noPpsCount" description="no pps count" defaultMessage="No PPS running"/>
                      }
                    </div>

                    <div className="statusRight">
                      {(orderFulfilData.picked_products_count && orderFulfilData.total_products_count) ?
                        (<div>
                          <FormattedMessage id="orders.fulfil.status" description="order status" defaultMessage="{picked} of {totalItems} products picked" 
                            values={{
                              picked:<span style={{fontWeight: "bold"}}>{orderFulfilData.picked_products_count}</span>,
                              totalItems:<span style={{fontWeight: "bold"}}>{orderFulfilData.total_products_count}</span>
                            }}
                          />
                        </div>) : <FormattedMessage id="orders.fulfil.noProducts" description="default picked message" defaultMessage="No products to be picked"/>
                      }
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
                            picked:<span style={{fontWeight:"bold"}}>{orderSummaryData.completed_orders}</span> || 0,
                            totalItems:<span style={{fontWeight:"bold"}}>{orderSummaryData.total_orders}</span> || 0
                          }}
                        /> 
                       </li>
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.ordersProg" description="orders in progress" defaultMessage="{current} currently in progress"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.pending_orders}</span> || 0}}
                        />
                      </li>
                    </ul>

                    <ul className="summaryColumn">
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.olinesDone" description="orderlines completed" defaultMessage="{picked} Orderline(s) completed of {totalItems}"
                          values={{
                            picked:<span style={{fontWeight:"bold"}}>{orderSummaryData.completed_orderlines}</span> || 0,
                            totalItems:<span style={{fontWeight:"bold"}}>{orderSummaryData.total_orderlines}</span> || 0
                          }}
                        />
                      </li>
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.olinesProg" description="orderlines in progress" defaultMessage="{current} currently in progress"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.pending_orderlines}</span> || 0}}
                        /> 
                      </li>
                    </ul>

                    <ul className="summaryColumn">
                      <li className="liItem"> 
                        <FormattedMessage id="orders.summary.breached" description="breached orders" defaultMessage="{current} Breached orders"
                          values={{current:<span style={{fontWeight:"bold"}}>{orderSummaryData.breached_orders}</span> || 0}}
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
