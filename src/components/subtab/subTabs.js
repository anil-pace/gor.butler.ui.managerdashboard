/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';
import {subTabSelected} from '../../actions/tabSelectAction'
import {NOTIFICATION,BUTLERBOTS,PPS,CHARGING,SYS_SUB_TAB_ROUTE_MAP} from '../../constants/appConstants'

class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
   
    handleSysSubTabClick(tabName){
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
      sessionStorage.setItem("subTab",SYS_SUB_TAB_ROUTE_MAP[tabName])
    }
    
	render(){


        let butlerBots = <FormattedMessage id="butlerBot.tab.heading" description="butler bot tab" 
              defaultMessage ="Butler Bots"/>

        let pps = <FormattedMessage id="pps.tab.heading" description="pps tab" 
              defaultMessage ="Pick Put Stations"/>

        let chargingStation = <FormattedMessage id="chargingstation.tab.heading" description="charging station tab" 
              defaultMessage ="Charging Station"/>


		var selectClass = {notification:"gorMainBlock", butlerbots:"gorMainBlock", pps:"gorMainBlock", chargingstation:"gorMainBlock"};
		selectClass[this.props.subTab] = "gorMainBlockSelect";
		console.log(this.props.subTab)

		return (
			<div>
				<div className="gorMainSubtab">
				
					<Link to="/butlerbots" onClick = {this.handleSysSubTabClick.bind(this,BUTLERBOTS)}>
						<SubTab item={butlerBots} changeClass={selectClass[BUTLERBOTS]}/> 
					</Link>
					<Link to="/pps" onClick = {this.handleSysSubTabClick.bind(this,PPS)}>
						<SubTab item={pps} changeClass={selectClass[PPS]}/> 
					</Link>
					<Link to="/chargingstation" onClick = {this.handleSysSubTabClick.bind(this,CHARGING)}>
						<SubTab item={chargingStation} changeClass={selectClass[CHARGING]}/> 
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    // console.log(state)
    return  {
         subTab:state.tabSelected.subTab || {},
         tab:state.tabSelected.tab || {}
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(SystemTab) ;

