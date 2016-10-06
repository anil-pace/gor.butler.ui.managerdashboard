/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';
import {subTabSelected} from '../../actions/subTabSelectAction'
import {NOTIFICATION,BUTLERBOTS,PPS,CHARGING} from '../../constants/appConstants'

class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    handleNotificationClick(){
    	var temp = NOTIFICATION;
    	this.props.subTabSelected(temp)
    }
    handleButlerbotsClick(){
    	var temp = BUTLERBOTS;
    	this.props.subTabSelected(temp)
    }
    handlePpsClick(){
    	var temp = PPS;
    	this.props.subTabSelected(temp)
    }
    handleChargingstationClick(){
    	var temp = CHARGING;
    	this.props.subTabSelected(temp)
    }
    
	render(){
		let notification = <FormattedMessage id="notification.tab.heading" description="notification tab" 
              defaultMessage ="Notification"/>

        let butlerBots = <FormattedMessage id="butlerBot.tab.heading" description="butler bot tab" 
              defaultMessage ="Butler Bots"/>

        let pps = <FormattedMessage id="pps.tab.heading" description="pps tab" 
              defaultMessage ="Pick Put Stations"/>

        let chargingStation = <FormattedMessage id="chargingstation.tab.heading" description="charging station tab" 
              defaultMessage ="Charging Station"/>


		var selectClass = {NOTIFICATION:"gorMainBlock", BUTLERBOTS:"gorMainBlock", PPS:"gorMainBlock", CHARGING:"gorMainBlock"};
		selectClass[this.props.subTab.subTab] = "gorMainBlockSelect";

		return (
			<div>
				<div className="gorMainSubtab">
					<Link to="/notification" onClick = {this.handleNotificationClick.bind(this)}>
						<SubTab item={notification} changeClass={selectClass[NOTIFICATION]}/> 
					</Link>
					<Link to="/butlerbots" onClick = {this.handleButlerbotsClick.bind(this)}>
						<SubTab item={butlerBots} changeClass={selectClass[BUTLERBOTS]}/> 
					</Link>
					<Link to="/pps" onClick = {this.handlePpsClick.bind(this)}>
						<SubTab item={pps} changeClass={selectClass[PPS]}/> 
					</Link>
					<Link to="/chargingstation" onClick = {this.handleChargingstationClick.bind(this)}>
						<SubTab item={chargingStation} changeClass={selectClass[CHARGING]}/> 
					</Link>
				</div>
			</div>
		);
	}
}

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

