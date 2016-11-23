/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';
import {subTabSelected} from '../../actions/tabSelectAction';
import {setButlerSpinner, setPpsSpinner, setCsSpinner} from '../../actions/spinnerAction';
import {NOTIFICATION,BUTLERBOTS,PPS,CHARGING,SYS_SUB_TAB_ROUTE_MAP} from '../../constants/appConstants'

class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
   
    handleSysSubTabClick(tabName){
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
      //console.log("subtab",(SYS_SUB_TAB_ROUTE_MAP[tabName]).toUpperCase())
      sessionStorage.setItem("subTab",SYS_SUB_TAB_ROUTE_MAP[tabName])
      switch(tabName) {
  					case BUTLERBOTS:
  					this.props.setButlerSpinner(true);
  					break;

  					case PPS:
  					this.props.setPpsSpinner(true);
  					break;

  					case CHARGING:
  					this.props.setCsSpinner(true);
  					break;
  					
  					default:
  					this.props.setButlerSpinner(false);
					this.props.setPpsSpinner(false);
					this.props.setCsSpinner(false);  					
  				}
    }
    
	render(){


        let butlerBots = <FormattedMessage id="butlerBot.tab.heading" description="butler bot tab" 
              defaultMessage ="Butler Bots"/>

        let pps = <FormattedMessage id="pps.tab.heading" description="pps tab" 
              defaultMessage ="Pick Put Stations"/>

        let chargingStation = <FormattedMessage id="chargingstation.tab.heading" description="charging station tab" 
              defaultMessage ="Charging Station"/>


		var selectClass = {notification:"gorMainBlock", butlerbots:"gorMainBlock", pps:"gorMainBlock", chargingstation:"gorMainBlock"};

		if(this.props.subTab.length) {
			selectClass[this.props.subTab] = "gorMainBlockSelect";
		}

		else {
			selectClass["butlerbots"] = "gorMainBlockSelect";
		}

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
    return  {
         subTab:state.tabSelected.subTab || {},
         tab:state.tabSelected.tab || {}
    }
}

var mapDispatchToProps = function(dispatch){
	return {
		setCsSpinner: function(data){ dispatch(setCsSpinner(data))},
		setPpsSpinner: function(data){ dispatch(setPpsSpinner(data))},
		setButlerSpinner: function(data){ dispatch(setButlerSpinner(data))},
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(SystemTab) ;

