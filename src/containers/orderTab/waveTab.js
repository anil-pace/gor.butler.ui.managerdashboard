import React  from 'react';
import WavesTable from './waveTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

function processWaveData(data, nProps) {
  var waveData = [], waveDetail = {};
  let WAVE, waveId;
  let progress  = nProps.context.intl.formatMessage({id:"waveDetail.progress.status", defaultMessage: "In Progress"});
  let completed  = nProps.context.intl.formatMessage({id:"waveDetail.completed.status", defaultMessage: "Completed"});
  let breached  = nProps.context.intl.formatMessage({id:"waveDetail.breached.status", defaultMessage: "Breached"});
  let pending  = nProps.context.intl.formatMessage({id:"waveDetail.pending.status", defaultMessage: "Pending"});
  var intlStatus = {"In Progress":progress, "Completed":completed, "Breached":breached, "Pending":pending };
  var status = {"In Progress":"progress", "Completed":"completed", "Breached":"breached", "Pending":"pending" };
  var priStatus = {"In Progress": 2, "Completed": 4, "Breached":1 ,"Pending":3};
  if(data) {
     for (var i =data.length - 1; i >= 0; i--) {
      waveId = data[i].wave_id;
      WAVE = nProps.context.intl.formatMessage({id:"waveDetail.id.prefix", defaultMessage: "WAVE-{waveId}"},{"waveId":waveId});
      waveDetail = {};
      waveDetail.id = WAVE ;
      waveDetail.statusClass = status[data[i].status];
      waveDetail.statusPriority = priStatus[data[i].status];
      waveDetail.status = intlStatus[data[i].status];
      
      if(data[i].start_time === null || data[i].start_time === undefined || data[i].start_time.constructor !== Date ) {
        waveDetail.startTime = "--";
      }
      else {
        waveDetail.startTime = nProps.context.intl.formatRelative(data[i].start_time, {units:'day'}) +', '+
       nProps.context.intl.formatTime(data[i].start_time);
      }

      if(data[i].cut_off_time === null || data[i].cut_off_time === undefined || data[i].cut_off_time.constructor !== Date ) {
        waveDetail.cutOffTime = "--";
      }
      else {
        waveDetail.cutOffTime = nProps.context.intl.formatRelative(data[i].cut_off_time, {units:'day'}) +', '+
       nProps.context.intl.formatTime(data[i].cut_off_time);
      }
      
      waveDetail.ordersToFulfill = parseInt(data[i].orders_to_fulfill,10);
      waveDetail.totalOrders = parseInt(data[i].total_orders,10);
      if(waveDetail.totalOrders) {
        waveDetail.progress = parseInt(((waveDetail.totalOrders-waveDetail.ordersToFulfill)/waveDetail.totalOrders)*100,10);
      }
      else {
        waveDetail.progress = 0;
      }
      waveData.push(waveDetail);
     }
  }
  return waveData;
}


class WaveTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 7, waveData = this.props.waveDetail.waveData, waveState = {"pendingWave":"--", "progressWave":"--", "orderRemaining":"--", "completedWaves":"--", "totalOrders":"--"};	
		var totalOrders = 0, orderToFulfill = 0, completedWaves = 0, pendingWaves = 0, progressWave = 0 ;

    if(this.props.waveDetail.waveData !== undefined) {
      waveData = processWaveData(this.props.waveDetail.waveData, this)
		if(waveData && waveData.length) {
  		for (var i = waveData.length - 1; i >= 0; i--) {
  				if(waveData[i].totalOrders) {
  					totalOrders = waveData[i].totalOrders + totalOrders;
  				}
  				if(waveData[i].ordersToFulfill) {
  					orderToFulfill = waveData[i].ordersToFulfill + orderToFulfill;
  				}

  				if(waveData[i].progress === 100) {
  					completedWaves++;
  				}
          if(waveData[i].statusClass === "pending") {
              pendingWaves++;
          }

          if(waveData[i].statusClass === "progress") {
              progressWave++;
          }
  			}
  			waveState = {"pendingWave":pendingWaves, "progressWave":progressWave, "orderRemaining":orderToFulfill, "completedWaves":completedWaves, "totalOrders":totalOrders};	
  		}
    }
		return (
			<div className="gorTesting">
				<WavesTable items={waveData} itemNumber={itemNumber} waveState={waveState} intlMessg={this.props.intlMessages}/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
  return {
      waveDetail: state.waveInfo || {},
      intlMessages: state.intl.messages
  };
};

WaveTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps)(WaveTab) ;
