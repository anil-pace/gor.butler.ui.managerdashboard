/**
 * Container for Overview tab
 * This will be switched based on tab click
 */

import React  from 'react';
import SubTab from '../../components/subtab/subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {subTabSelected} from '../../actions/tabSelectAction'
import { OPERATIONS_LOG,REPORTS_SUB_TAB_ROUTE_MAP,DOWNLOAD_REPORT, STORAGE_SPACE, MISC} from '../../constants/frontEndConstants';
import { FormattedMessage } from 'react-intl';


class ReportsTab extends React.Component{
	constructor(props) 
	{
    	super(props);

    }

    handleSysSubTabClick(tabName){
      this.props.subTabSelected(REPORTS_SUB_TAB_ROUTE_MAP[tabName]);
      sessionStorage.setItem("subTab",REPORTS_SUB_TAB_ROUTE_MAP[tabName])
    }
    
	render(){

		let showMiscReportTab = this.props.config.utility_tab && (this.props.config.utility_tab.widgets.gr_report && this.props.config.utility_tab.widgets.reports.inventory_report) ? true : false;
		
		var selectClass={};
		var operationsLog=<FormattedMessage id="reportsTab.operationsLog" description="Operations Log tab for Reports tab" defaultMessage="Operations Log"/> 
		var storageSpace=<FormattedMessage id="reportsTab.storageSpace" description="Storage space tab for Reports tab" defaultMessage="Storage Space"/>
		var misc=<FormattedMessage id="reportsTab.misc" description="Storage space tab for GR Reports tab" defaultMessage="Misc"/>
		var downloadReport=<FormattedMessage id="reportsTab.downloadReport" description="Operations Log tab for Reports tab" defaultMessage="Download"/> 
    
		return (
			<div>
				<div className="gorMainSubtab">
					
					<Link to="/reports/operationsLog" onClick={this.handleSysSubTabClick.bind(this,OPERATIONS_LOG)}>
						<SubTab item={operationsLog} changeClass={this.props.subTab === OPERATIONS_LOG ? "gor-main-blockSelect" : "gor-main-block"}/> 
					</Link>

					<Link to="/reports/storageSpace" onClick={this.handleSysSubTabClick.bind(this,STORAGE_SPACE)}>
						<SubTab item={storageSpace} changeClass={this.props.subTab === STORAGE_SPACE ? "gor-main-blockSelect" : "gor-main-block"}/> 
					</Link>

					{showMiscReportTab? 
						(<Link to="/reports/misc" onClick={this.handleSysSubTabClick.bind(this,MISC)}>
							<SubTab item={misc} changeClass={this.props.subTab === MISC ? "gor-main-blockSelect" : "gor-main-block"}/> 
						</Link>):""
					}

					<Link to="/reports/downloadReport" onClick={this.handleSysSubTabClick.bind(this,DOWNLOAD_REPORT)}>
						<SubTab item={downloadReport} changeClass={this.props.subTab === DOWNLOAD_REPORT ? "gor-main-blockSelect" : "gor-main-block"}/> 
					</Link>
					{this.props.children}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
    return  {
         subTab:state.tabSelected.subTab || {},
         tab:state.tabSelected.tab,
         config:state.config||{}
    }
}

var mapDispatchToProps=function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); },
		
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(ReportsTab) ;

