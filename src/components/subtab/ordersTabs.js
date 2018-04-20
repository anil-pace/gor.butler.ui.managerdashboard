/**
 * Container for Overview tab
 * This will be switched based on tab click
 */

import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {subTabSelected} from '../../actions/tabSelectAction'
import {ORDER_LIST, WAVES,SYS_SUB_TAB_ROUTE_MAP,ORDERLIST} from '../../constants/frontEndConstants';
import { FormattedMessage } from 'react-intl';
import {setOrderListSpinner} from '../../actions/orderListActions';
import {setWavesSpinner} from '../../actions/spinnerAction';


class OrderSubTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    handleSysSubTabClick(tabName){
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
      sessionStorage.setItem("subTab",SYS_SUB_TAB_ROUTE_MAP[tabName])
      switch((SYS_SUB_TAB_ROUTE_MAP[tabName]).toUpperCase()){
  				case ORDERLIST:
  				//this.props.setOrderListSpinner(true);
  				break;

  				case WAVES.toUpperCase():
  				this.props.setWavesSpinner(true);
  				break;

  				default:
  			//	this.props.setOrderListSpinner(false);
  				this.props.setWavesSpinner(false);
  			}
    }
    
	render(){
		var selectClass={orderlist:"gor-main-block", waves:"gor-main-block"};
		if(this.props.subTab.length) {
			selectClass[this.props.subTab]="gor-main-blockSelect";
		}

		else {
			selectClass["waves"]="gor-main-blockSelect";
		}
		let waves=<FormattedMessage id="OrderSubTab.waves" description="waves tab for OrderSubTab" defaultMessage="Waves"/> 
    	let orderlist=<FormattedMessage id="OrderSubTab.orderlist" description="orderlist tab for OrderSubTab" defaultMessage="Order List"/> 
    
		return (
			<div>
				<div className="gorMainSubtab">
					
					<Link to="/orders/waves" onClick={this.handleSysSubTabClick.bind(this,WAVES)}>
						<SubTab item={waves} changeClass={selectClass["waves"]}/> 
					</Link>
					<Link to="/orders/orderlist" onClick={this.handleSysSubTabClick.bind(this,ORDER_LIST)}>
						<SubTab item={orderlist} changeClass={selectClass["orderlist"]}/> 
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    return  {
         subTab:state.tabSelected.subTab || {},
         tab:state.tabSelected.tab
    }
}

var mapDispatchToProps=function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); },
		setOrderListSpinner: function(data){dispatch(setOrderListSpinner(data))},
		setWavesSpinner: function(data){dispatch(setWavesSpinner(data))}
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderSubTab) ;

