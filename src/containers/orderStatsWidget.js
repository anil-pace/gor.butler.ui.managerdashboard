import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import { connect } from 'react-redux';
import Chart from '../components/graphd3/graphd3';
import {renderStatsWidget} from '../actions/statsWidgetActions'

class OrderStatsWidget extends React.Component{
	
	render(){
		const item = [
      { value: 'one', label: 'PPS - pick performance' },
      { value: 'three', label: 'PPS - put performance' },
      { value: 'four', label: 'PPS - audit performance' },
      
    ]
    

	return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown optionDispatch={this.props.renderStatsWidget} items={item} styleClass={'ddown'} currentState={item[0]}/>
				<div id="chart_att">
					<Chart tableData={this.props.histdata} pick={"pick"}/>
					</div>
				</div>
			</div> 
		);
	}
};

function mapStateToProps(state, ownProps){
	return {
		histdata: state.histogramData || {},
		widget: state.statsWidget.widget || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderStatsWidget: function(data){ dispatch(renderStatsWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderStatsWidget) ;

