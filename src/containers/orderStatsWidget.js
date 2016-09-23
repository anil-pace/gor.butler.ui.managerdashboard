import React  from 'react';
import ReactDOM  from 'react-dom';
import Dropdown from '../components/dropdown/dropdown.js';
import { connect } from 'react-redux';
import Chart from '../components/graphd3/graphd3';
import {renderStatsWidget} from '../actions/statsWidgetActions'

class OrderStatsWidget extends React.Component{
	
	render(){

		var json=[{
    "timeInterval": "09:00 10:00",
    "pick": 316
}, {
    "timeInterval": "10:00 11:00",
  "pick": 239
}, {
  "timeInterval": "11:00 12:00",
  "pick": 278
}, {
  "timeInterval": "12:00 13:00",
  "pick": 425
}, {
  "timeInterval": "13:00 14:00",
  "pick": 270
}, {
  "timeInterval": "14:00 15:00",
  "pick": 228
}, {
  "timeInterval": "15:00 16:00",
  "pick": 202
}, {
  "timeInterval": "16:00 17:00",
  "pick": 609
}, {
  "timeInterval": "17:00 18:00",
  "pick": 697
}, {
  "timeInterval": "18:00 19:00",
  "pick": 415
}, {
  "timeInterval": "19:00 20:00",
  "pick": 474
}, {
  "timeInterval": "20:00 21:00",
  "pick": 402
}, {
  "timeInterval": "21:00 22:00",
  "pick": 251
}, {
  "timeInterval": "22:00 23:00",
  "pick": 674
}, {
  "timeInterval": "23:00 00:00",
  "pick": 350
}, {
  "timeInterval": "00:00 01:00",
  "pick": 192
}, {
  "timeInterval": "01:00 02:00",
  "pick": 309
}, {
  "timeInterval": "02:00 03:00",
  "pick": 598
}, {
  "timeInterval": "03:00 04:00",
  "pick": 633
}, {
  "timeInterval": "04:00 05:00",
  "pick": 505
}, {
  "timeInterval": "05:00 06:00",
  "pick": 278
}, {
  "timeInterval": "06:00 07:00",
  "pick": 603
}, {
  "timeInterval": "07:00 08:00",
  "pick": 246
}, {
  "timeInterval": "08:00 09:00",
  "pick": 346
}];
		console.log("order stats widget")
		console.log(this.props.histdata)
		const item = [
      { value: 'one', label: 'PPS - pick performance' },
      { value: 'three', label: 'PPS - pick performance' },
      { value: 'four', label: 'PPS - audit performance' },
      
    ]
	return (
			<div className="gorOrderStatsWidget">
				<div className="gorDrop">
				<Dropdown optionDispatch={this.props.renderStatsWidget} pick={item} styleClass={'ddown'} currentState={item[0]}/>
				<div id="chart_att">
					<Chart tableData={this.props.histdata}/>
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
		widget: state.statsWidget.widget || {}
	};
}

var mapDispatchToProps = function(dispatch){
	return {
		renderStatsWidget: function(data){ dispatch(renderStatsWidget(data)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(OrderStatsWidget) ;

