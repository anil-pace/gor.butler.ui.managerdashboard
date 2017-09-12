/**
 * Container for Overview tab
 * This will be switched based on tab click
 */

import React  from 'react';
import SubTab from '../../components/subtab/subTab';
import {Link}  from 'react-router';
import { connect } from 'react-redux' ;
import {subTabSelected} from '../../actions/tabSelectAction'
import { OPERATIONS_LOG,REPORTS_SUB_TAB_ROUTE_MAP,DOWNLOAD_REPORT} from '../../constants/frontEndConstants';
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
		
		
		let operationsLog=<FormattedMessage id="reportsTab.operationsLog" description="Operations Log tab for Reports tab" defaultMessage="Operations Log"/> 
		let downloadReport=<FormattedMessage id="reportsTab.downloadReport" description="Operations Log tab for Reports tab" defaultMessage="Download"/> 
    	
    
		return (
			<div>
				<div className="gorMainSubtab">
					
					<Link to="/reports/operationsLog" onClick={this.handleSysSubTabClick.bind(this,OPERATIONS_LOG)}>
						<SubTab item={operationsLog} changeClass={"gor-main-blockSelect"}/> 
					</Link>
					<Link to="/reports/downloadReport" onClick={this.handleSysSubTabClick.bind(this,DOWNLOAD_REPORT)}>
						<SubTab item={downloadReport} changeClass={"gor-main-blockSelect"}/> 
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
         tab:state.tabSelected.tab
    }
}

var mapDispatchToProps=function(dispatch){
	return {
		subTabSelected: function(data){ dispatch(subTabSelected(data)); },
		
	}
};

export default connect(null,mapDispatchToProps)(ReportsTab) ;

