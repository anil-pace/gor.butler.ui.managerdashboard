import React  from 'react';
import WavesTable from './waveTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {GOR_PENDING,GOR_PROGRESS} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';

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
      waveDetail.status = stringConfig[data[i].status];
      
      if(data[i].start_time === "") {
        waveDetail.startTime = "--";
      }
      else {
        waveDetail.startTime = data[i].start_time;
      }

      if(data[i].cut_off_time === "") {
        waveDetail.cutOffTime = "--";
      }
      else {
        waveDetail.cutOffTime = data[i].cut_off_time;
      }
      waveDetail.cutOffTime = data[i].cut_off_time;
      waveDetail.ordersToFulfill = data[i].orders_to_fulfill;
      waveDetail.totalOrders = data[i].total_orders;
      if(waveDetail.totalOrders) {
        waveDetail.progress = parseInt(((waveDetail.totalOrders-waveDetail.ordersToFulfill)/waveDetail.totalOrders)*100);
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
       if(waveData[i].statusClass === GOR_PENDING) {
        pendingWaves++;
      }

      if(waveData[i].statusClass === GOR_PROGRESS) {
        progressWave++;
      }
    }
    waveState = {"pendingWave":pendingWaves, "progressWave":progressWave, "orderRemaining":orderToFulfill, "completedWaves":completedWaves, "totalOrders":totalOrders}; 
  }
}
return (
<div className="gorTesting">
<Spinner isLoading={this.props.wavesSpinner} />
<WavesTable items={waveData} itemNumber={itemNumber} waveState={waveState} intlMessg={this.props.intlMessages}/>
</div>
);
}
}


function mapStateToProps(state, ownProps){
  return {

    wavesSpinner: state.spinner.wavesSpinner || false,
    filterOptions: state.filterOptions || {},
    waveDetail: state.waveInfo || {},
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset,
    waveDetail: state.waveInfo || {},
    intlMessages: state.intl.messages
  };
};

WaveTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps)(WaveTab) ;
