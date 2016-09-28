/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {subTabSelected} from '../../actions/subTabSelectAction'
import {NOTIFICATION,BUTLERBOTS,PPS,CHARGING,NOTIFICATION_TAB,BUTLERBOTS_TAB,PPS_TAB,CHARGING_TAB} from '../../constants/appConstants'

class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    handleNotificationClick(data){
    	var temp = NOTIFICATION;
    	this.props.subTabSelected(temp)
    }
    handleButlerbotsClick(data){
    	var temp = BUTLERBOTS;
    	this.props.subTabSelected(temp)
    }
    handlePpsClick(data){
    	var temp = PPS;
    	this.props.subTabSelected(temp)
    }
    handleChargingstationClick(data){
    	var temp = CHARGING;
    	this.props.subTabSelected(temp)
    }
    
	render(){
		var selectClass = {NOTIFICATION:"gorMainBlock", BUTLERBOTS:"gorMainBlock", PPS:"gorMainBlock", CHARGING:"gorMainBlock"};
		selectClass[this.props.subTab.subTab] = "gorMainBlockSelect";

		return (
			<div>
				<div className="gorMainSubtab">
					<Link to="/notification" onClick = {this.handleNotificationClick.bind(this)}>
						<SubTab item={NOTIFICATION_TAB} changeClass={selectClass[NOTIFICATION]}/> 
					</Link>
					<Link to="/butlerbots" onClick = {this.handleButlerbotsClick.bind(this)}>
						<SubTab item={BUTLERBOTS_TAB} changeClass={selectClass[BUTLERBOTS]}/> 
					</Link>
					<Link to="/pps" onClick = {this.handlePpsClick.bind(this)}>
						<SubTab item={PPS_TAB} changeClass={selectClass[PPS]}/> 
					</Link>
					<Link to="/chargingstation" onClick = {this.handleChargingstationClick.bind(this)}>
						<SubTab item={CHARGING_TAB} changeClass={selectClass[CHARGING]}/> 
					</Link>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
    
    return  {
         subTab:state.subTabSelected || {},
         tab:state.tabSelected.tab
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(SystemTab) ;

