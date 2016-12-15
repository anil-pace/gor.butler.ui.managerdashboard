import React  from 'react';
import WavesTable from './waveTable';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import { setWavesSpinner } from '../../actions/spinnerAction';
import {GOR_PENDING,GOR_PROGRESS} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import { defineMessages } from 'react-intl';
import { waveHeaderSort,waveHeaderSortOrder } from '../../actions/sortHeaderActions';
import {INITIAL_HEADER_SORT,INITIAL_HEADER_ORDER} from '../../constants/frontEndConstants';


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


  var status = {"in_progress":"progress", "completed":"completed", "breached":"breached", "pending":"pending" };
  var priStatus = {"in_progress": 2, "completed": 4, "breached":1 ,"pending":3};
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
        waveDetail.startTime = nProps.context.intl.formatDate(data[i].start_time,
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
        waveDetail.cutOffTime = nProps.context.intl.formatDate(data[i].cut_off_time,
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
<Spinner isLoading={this.props.wavesSpinner} setSpinner={this.props.setWavesSpinner}/>
<WavesTable items={waveData} itemNumber={itemNumber} waveState={waveState} intlMessg={this.props.intlMessages} sortHeaderState={this.props.waveHeaderSort} sortHeaderOrder={this.props.waveHeaderSortOrder} currentSortState={this.props.waveSortHeader} currentHeaderOrder={this.props.waveSortHeaderState}/>
</div>
);
}
}


function mapStateToProps(state, ownProps){
  return {
    waveSortHeader: state.sortHeaderState.waveHeaderSort || INITIAL_HEADER_SORT ,
    waveSortHeaderState: state.sortHeaderState.waveHeaderSortOrder || INITIAL_HEADER_ORDER,
    wavesSpinner: state.spinner.wavesSpinner || false,
    filterOptions: state.filterOptions || {},
    waveDetail: state.waveInfo || {},
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset,
    waveDetail: state.waveInfo || {},
    intlMessages: state.intl.messages
  };
};

var mapDispatchToProps = function(dispatch){
  return{
    setWavesSpinner: function(data){dispatch(setWavesSpinner(data))},
    waveHeaderSort: function(data){dispatch(waveHeaderSort(data))},
    waveHeaderSortOrder: function(data){dispatch(waveHeaderSortOrder(data))}
  };
}

WaveTab.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(WaveTab) ;
