import React  from 'react';
import ReactDOM  from 'react-dom';
import Health from '../components/health/healthTabs.js';
import Dropdown from '../components/dropdown/dropdown.js';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import { connect } from 'react-redux';
import {renderPerformanceWidget} from '../actions/performanceWidgetActions'
var renderState = "RENDER_SYSTEM_HEALTH";
class PerformanceWidget extends React.Component{
	constructor(props) 
	{
		super(props);
	}	

	componentWillReceiveProps(nextProps){
		renderState = nextProps.widget;
	}

	render(){

		var temp = "health";
		const item = [
		{ value: 'RENDER_SYSTEM_HEALTH', label: 'System Health' },
		{ value: 'RENDER_SYSTEM_PERFORMANCE', label: 'System Performance' },
		]
		var wid= "Health"
		
	if(renderState === "RENDER_SYSTEM_PERFORMANCE"){
		return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop">
					<Dropdown pf={this.props.renderPerformanceWidget} items={item}/>
				</div>

				<div id="performanceGraph">
					<ChartHorizontal/>
				</div> 
			</div>  
			);
	}

	else { 
		return (
			<div className="gorPerformanceWidget">
				<div className="gorDrop">
					<Dropdown pf={this.props.renderPerformanceWidget} items={item}/>
				</div>

				<div id="performanceGraph">
					{<Health/>}
				</div> 
			</div> 
			);
	}

}
};

function mapStateToProps(state, ownProps){
	return {
		widget:state.performanceWidget.widget || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderPerformanceWidget: function(data){ dispatch(renderPerformanceWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(PerformanceWidget) ;

