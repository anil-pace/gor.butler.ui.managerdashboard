/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {subTabSelected} from '../../actions/tabSelectAction'
import {ORDER_LIST, WAVES,SYS_SUB_TAB_ROUTE_MAP} from '../../constants/appConstants';

class OrderSubTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    handleSysSubTabClick(tabName){
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
      sessionStorage.setItem("subTab",SYS_SUB_TAB_ROUTE_MAP[tabName])
    }
    
	render(){
		var selectClass = {orderlist:"gorMainBlock", waves:"gorMainBlock"};
		selectClass[this.props.subTab] = "gorMainBlockSelect";
		console.log("sub tab --------")

		console.log(this.props.subTab)
		return (
			<div>
				<div className="gorMainSubtab">
					
					<Link to="/waves" onClick = {this.handleSysSubTabClick.bind(this,WAVES)}>
						<SubTab item={WAVES} changeClass={selectClass["waves"]}/> 
					</Link>
					<Link to="/orderlist" onClick = {this.handleSysSubTabClick.bind(this,ORDER_LIST)}>
						<SubTab item={ORDER_LIST} changeClass={selectClass["orderlist"]}/> 
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

var mapDispatchToProps = function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderSubTab) ;

