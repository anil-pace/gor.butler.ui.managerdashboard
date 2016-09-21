import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import { connect } from 'react-redux';
import Chart from '../components/graphd3/graphd3';
import ChartHorizontal from '../components/graphd3/graph_horizontal';
import {renderStatsWidget} from '../actions/statsWidgetActions'

class OrderStatsWidget extends React.Component{
	
	render(){
		console.log("order stats widget")
		console.log(this.props)
		const item = [
      { value: 'one', label: 'PPS - pick performance' },
      { value: 'three', label: 'PPS - pick performance' },
      { value: 'four', label: 'PPS - audit performance' },
      
    ]
	return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown optionDispatch={this.props.renderStatsWidget} items={item} styleClass={'ddown'} currentState={item[0]}/>
				<div id="chart_att">
					<Chart/>
					</div>
				</div>
			</div> 
		);
	}
};

function mapStateToProps(state, ownProps){
	console.log(state)
	return {
		widget: state.statsWidget.widget || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderStatsWidget: function(data){ dispatch(renderStatsWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderStatsWidget) ;

