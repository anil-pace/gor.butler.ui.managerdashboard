import React  from 'react';
import Dropdown from '../components/dropdown/dropdown.js';
import { connect } from 'react-redux';
import Chart from '../components/graphd3/graphd3';
import {renderStatsWidget} from '../actions/statsWidgetActions';
import { FormattedMessage } from 'react-intl';
import Dimensions from 'react-dimensions';


class OrderStatsWidget extends React.Component{
	
	render(){
		console.log(this.props)
		let pickPerformance = <FormattedMessage id="pickPerformance.dropdown" description="pickPerformance dropdown label" 
              defaultMessage ="PPS - pick performance"/>

         let putPerformance = <FormattedMessage id="putPerformance.dropdown" description="putPerformance dropdown label" 
              defaultMessage ="PPS - put performance"/>
              
        let auditPerformance = <FormattedMessage id="auditPerformance.dropdown" description="auditPerformance dropdown label" 
              defaultMessage ="PPS - audit performance"/>
              

		const item = [
      { value: 'PPS_PICK_PERFORMANCE', label: pickPerformance },
      { value: 'PPS_PUT_PERFORMANCE', label: putPerformance },
      { value: 'PPS_AUDIT_PERFORMANCE', label: auditPerformance },
    ]
 	var renderWidget = this.props.statsWidget.statsWidget, chartRender;
    var index = 0;
		if(renderWidget !== undefined || renderWidget !== null) {
			for (var i = 0; i < item.length; i++) {
				if(item[i].value === renderWidget) {
					index = i;
				}
			}
		}
    
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
				<div className="Order-Stats-Drop">
				<Dropdown optionDispatch={this.props.renderStatsWidget} items={item} styleClass={'ddown'} currentState={item[index]}/>
				</div>	
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

export default (Dimensions(),connect(mapStateToProps,mapDispatchToProps)(OrderStatsWidget)) ;

