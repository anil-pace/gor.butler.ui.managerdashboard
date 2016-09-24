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
import {NOTIFICATION,BUTLERBOTS,PPS,CHARGING} from '../../constants/appConstants'

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

		var item1=[{tabContent:"Notification"}];
		var item2=[{tabContent:"Butler Bots"}];
		var item3=[{tabContent:"PPS"}];
		var item4=[{tabContent:"Charging Station"}];
		 var selectClass = {NOTIFICATION:"gorMainBlock", BUTLERBOTS:"gorMainBlock", PPS:"gorMainBlock", CHARGING:"gorMainBlock"};
     	selectClass[this.props.subTab.subTab] = "gorMainBlockSelect";
		
		return (
			<div>
				<div className="gorMainSubtab">
					<Link to="/notification" onClick = {this.handleNotificationClick.bind(this)}>
						<SubTab item={item1} changeClass={selectClass["NOTIFICATION"]}/> 
					</Link>
					<Link to="/butlerbots" onClick = {this.handleButlerbotsClick.bind(this)}>
						<SubTab item={item2} changeClass={selectClass["BUTLERBOTS"]}/> 
					</Link>
					<Link to="/pps" onClick = {this.handlePpsClick.bind(this)}>
						<SubTab item={item3} changeClass={selectClass["PPS"]}/> 
					</Link>
					<Link to="/chargingstation" onClick = {this.handleChargingstationClick.bind(this)}>
						<SubTab item={item4} changeClass={selectClass["CHARGING"]}/> 
					</Link>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
    
    return  {
         subTab:state.subTabSelected || {},
         mainTab:state.tabSelected.tab || {}
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(SystemTab) ;

