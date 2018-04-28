/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import SubTab from './subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';
import {setButlerSpinner, setPpsSpinner, setCsSpinner} from '../../actions/spinnerAction';
import {subTabSelected} from '../../actions/tabSelectAction'
import {NOTIFICATION,SYS_SUB_TAB_ROUTE_MAP} from '../../constants/frontEndConstants'
import {BUTLERBOTS,PPS,CHARGING,SYS_OVERVIEW,SYS_CONTROLLERS,PPS_CONFIGURATION, MSU_CONFIGURATION} from '../../constants/backEndConstants';


class SystemTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
   
    handleSysSubTabClick(tabName){
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
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

  					case SYS_OVERVIEW:
  					break;

  					default:
  					this.props.setButlerSpinner(false);
					this.props.setPpsSpinner(false);
					this.props.setCsSpinner(false);  					
  				}
    }
    
	render(){
		let sysOverview=<FormattedMessage id="sysOverview.tab.heading" description="System overview Tab"
              defaultMessage="Overview"/>

        let butlerBots=<FormattedMessage id="butlerBot.tab.heading" description="butler bot tab" 
              defaultMessage="Butler Bots"/>

        let pps=<FormattedMessage id="pps.tab.heading" description="pps tab" 
              defaultMessage="Pick Put Stations"/>

        let chargingStation=<FormattedMessage id="chargingstation.tab.heading" description="charging station tab" 
              defaultMessage="Charging Station"/>
		let ppsConfiguration=<FormattedMessage id="ppsConfiguration.tab.heading" description="pps configuration tab"
              defaultMessage="PPS Configuration"/>

      	let msuConfiguration=<FormattedMessage id="msuConfiguration.tab.heading" description="msu configuration tab" defaultMessage="MSU Configuration"/>

        let sysControllers = <FormattedMessage id="sysControllers.tab.heading" description="Syatem controllers Tab"
              defaultMessage="System Controllers"/>

		var selectClass={sysControllers:"gor-main-block",sysOverview : "gor-main-block" ,notification:"gor-main-block", butlerbots:"gor-main-block", pps:"gor-main-block", chargingstation:"gor-main-block",ppsConfiguration:'gor-main-block', msuConfiguration: 'gor-main-block'};

		if(this.props.subTab.length) {
			selectClass[this.props.subTab]="gor-main-blockSelect";
		}

		else {
			selectClass["sysOverview"]="gor-main-blockSelect";
		}

		return (
			<div>
				<div className="gorMainSubtab">
					<Link to="/system/sysOverview" onClick={this.handleSysSubTabClick.bind(this,SYS_OVERVIEW)}>
						<SubTab item={sysOverview} changeClass={selectClass[SYS_OVERVIEW]}/>
					</Link>
					<Link to="/system/butlerbots" onClick={this.handleSysSubTabClick.bind(this,BUTLERBOTS)}>
						<SubTab item={butlerBots} changeClass={selectClass[BUTLERBOTS]}/> 
					</Link>
					<Link to="/system/pps" onClick={this.handleSysSubTabClick.bind(this,PPS)}>
						<SubTab item={pps} changeClass={selectClass[PPS]}/> 
					</Link>
					<Link to="/system/chargingstation" onClick={this.handleSysSubTabClick.bind(this,CHARGING)}>
						<SubTab item={chargingStation} changeClass={selectClass[CHARGING]}/> 
					</Link>
					<Link to="/system/sysControllers" onClick={this.handleSysSubTabClick.bind(this,SYS_CONTROLLERS)}>
						<SubTab item={sysControllers} changeClass={selectClass[SYS_CONTROLLERS]}/>
					</Link>
					<Link to="/system/ppsConfiguration" onClick={this.handleSysSubTabClick.bind(this,PPS_CONFIGURATION)}>
						<SubTab item={ppsConfiguration} changeClass={selectClass[PPS_CONFIGURATION]}/>
					</Link>
					<Link to="/system/msuConfiguration" onClick={this.handleSysSubTabClick.bind(this,MSU_CONFIGURATION)}>
						<SubTab item={msuConfiguration} changeClass={selectClass[MSU_CONFIGURATION]}/>
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

var mapDispatchToProps=function(dispatch){
	return {
		setCsSpinner: function(data){ dispatch(setCsSpinner(data))},
		setPpsSpinner: function(data){ dispatch(setPpsSpinner(data))},
		setButlerSpinner: function(data){ dispatch(setButlerSpinner(data))},
		subTabSelected: function(data){ dispatch(subTabSelected(data)); }
	}
};



export default connect(mapStateToProps,mapDispatchToProps)(SystemTab) ;

