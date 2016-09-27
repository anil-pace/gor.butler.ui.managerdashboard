/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import ReactDOM  from 'react-dom';
import OrderStatsWidget from '../containers/orderStatsWidget'
import PerformanceWidget from '../containers/performanceWidget'
import AuditStatusWidget from '../containers/auditStatusWidget'
import PutStatusWidget from '../containers/putStatusWidget'
import PickStatusWidget from '../containers/pickStatusWidget'
import { connect } from 'react-redux';


class Overview extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
			<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">

						<PutStatusWidget />
						<AuditStatusWidget />

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
 
 

// function mapStateToProps(state, ownProps){
// 	return {
//         putData: state.putInfo.putData,
//         ppsData:state.ppsInfo.ppsData,
//         throughputData : state.throughputInfo.throughputData,
//         auditData: state.auditInfo.auditData
//     };
// }

export 	default Overview;
