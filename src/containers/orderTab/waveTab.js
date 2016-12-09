import React  from 'react';
import WavesTable from './waveTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import {GOR_PENDING,GOR_PROGRESS} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages = defineMessages({
    wavePrefix: {
      id:"waveDetail.id.prefix", 
      defaultMessage: "WAVE-{waveId}"
    }


});




class WaveTab extends React.Component{
  
  _processWaveData(data, nProps) {
  var nProps = this,
  data = nProps.props.waveDetail.waveData;
  var waveData = [], waveDetail = {};
  let WAVE, waveId;


  var status = {"in_progress":"progress", "completed":"completed", "Breached":"breached", "Pending":"pending" };
   var timeOffset = this.props.timeOffset
  var priStatus = {"In Progress": 2, "Completed": 4, "Breached":1 ,"Pending":3};
  var timeOffset = this.props.timeOffset;
  if(data) {
     for (var i =data.length - 1; i >= 0; i--) {
      waveId = data[i].wave_id;
      WAVE = nProps.context.intl.formatMessage(messages.wavePrefix,{"waveId":waveId});
      waveDetail = {};
      waveDetail.id = WAVE ;
      waveDetail.statusClass = status[data[i].status];
      waveDetail.statusPriority = priStatus[data[i].status];
      waveDetail.status = nProps.context.intl.formatMessage(stringConfig[data[i].status]);
      
      if(data[i].start_time === "") {
        waveDetail.startTime = "--";
      }
      else {
        waveDetail.startTime = nProps.context.intl.formatDate(data[i].startTime,
                                {timeZone:timeOffset,
                                  year:'numeric',
                                  month:'short',
                                  day:'2-digit',
                                  hour:"2-digit",
                                  minute:"2-digit",
                                  hour12: false
                                });
      }

      if(data[i].cut_off_time === "") {
        waveDetail.cutOffTime = "--";
      }
      else {
        waveDetail.cutOffTime = nProps.context.intl.formatDate(data[i].cutOffTime,
                                {timeZone:timeOffset,
                                  year:'numeric',
                                  month:'short',
                                  day:'2-digit',
                                  hour:"2-digit",
                                  minute:"2-digit",
                                  hour12: false
                                });
      }
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

  constructor(props) 
  {
   super(props);
 }  
 render(){
  var itemNumber = 7, waveData = this.props.waveDetail.waveData, waveState = {"pendingWave":"--", "progressWave":"--", "orderRemaining":"--", "completedWaves":"--", "totalOrders":"--"}; 
  var totalOrders = 0, orderToFulfill = 0, completedWaves = 0, pendingWaves = 0, progressWave = 0 ;

  if(this.props.waveDetail.waveData !== undefined) {
    waveData = this._processWaveData()
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
