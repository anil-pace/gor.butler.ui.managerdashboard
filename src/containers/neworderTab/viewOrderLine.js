import React  from 'react';
import { FormattedMessage } from 'react-intl'; 
import { connect } from 'react-redux';

class ViewOrderLine extends React.Component{
  constructor(props) 
  {
      super(props); 
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

  render()
  {
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
                      <div className="searchIconWrap"> 
                        <div className="gor-search-icon"></div>
                      </div>
                      <input type="text" className="gor-search-input-wrap" value="Search Product" />
                  </div>
              </div>

            </div>
          </div>
        </div>
      );
    }
  }
export default ViewOrderLine;

