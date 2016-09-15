/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import HealthTabs from '../components/health/healthTabs';
import Health from '../components/health/health';
import OrderStatsWidget from '../containers/orderStatsWidget'
import PerformanceWidget from '../containers/performanceWidget'
import AuditStatusWidget from '../containers/auditStatusWidget'
import PutStatusWidget from '../containers/putStatusWidget'
import PickStatusWidget from '../containers/pickStatusWidget'
import SortExample from '../components/data_table/data_table';



class Overview extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		/**
		 * Need to remove these hardcoded variables
		 * 
		 */
		
		var item1=this.props.putData ? this.props.putData : {};//{heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr', logo:'iStock'};
        var item2={heading:'Items to Audit', value:'3,74,519', low:'4 PPS auditing 1,546 items/hr', logo:'iAudit'};;

		return (
			<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">

						<PutStatusWidget items={item1}/>
						<AuditStatusWidget items={item2}/>

					</div>
					<div className="col span_2_of_4 gorNoML">
						<PickStatusWidget />
					</div>
				</div>
				<div>
					<OrderStatsWidget/>
        			<PerformanceWidget/>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps){
	return {
        putData: state.recieveSocketActions.putData
        
    };
}

export 	default connect(mapStateToProps)(Overview);
