import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import { connect } from 'react-redux';
import Chart from '../components/graphd3/graphd3';
import {renderStatsWidget} from '../actions/statsWidgetActions'

class OrderStatsWidget extends React.Component{
	
	render(){
		const item = [
      { value: 'PPS_PICK_PERFORMANCE', label: 'PPS - pick performance' },
      { value: 'PPS_PUT_PERFORMANCE', label: 'PPS - put performance' },
      { value: 'PPS_AUDIT_PERFORMANCE', label: 'PPS - audit performance' },
      
    ]
    var renderWidget = this.props.statsWidget.statsWidget, chartRender;
    if(renderWidget === "PPS_PUT_PERFORMANCE") {
    	chartRender = <Chart tableData={this.props.histdata} type={"put"}/>
    }

    else if(renderWidget === "PPS_AUDIT_PERFORMANCE") {
    	chartRender = <Chart tableData={this.props.histdata} type={"audit"}/>
    }

    else {

    	chartRender = <Chart tableData={this.props.histdata} type={"pick"}/>
    }

	return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown optionDispatch={this.props.renderStatsWidget} items={item} styleClass={'ddown'} currentState={item[0]}/>
					<div id="chart_att">
						{chartRender}
					</div>
				</div>
			</div> 
		);
	}
};

function mapStateToProps(state, ownProps){
	console.log(state)
	return {
		histdata: state.histogramData || {},
		statsWidget: state.statsWidget || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderStatsWidget: function(data){ dispatch(renderStatsWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderStatsWidget) ;

