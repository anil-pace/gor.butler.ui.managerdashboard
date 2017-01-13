import React  from 'react';
import Histogram from '../../components/graphd3/histogram';
import {setInventoryDate} from '../../actions/inventoryActions';
import {INVENTORY_HISTORY_DAYS_COUNT,INVENTORY_HISTOGRAM_CONFIG} from '../../constants/frontEndConstants';
import { connect } from 'react-redux'; 
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages = defineMessages({
    invHistogramNoDataTxt: {
        id: 'inventory.histogram.noDataText',
        description: 'Text when there is no stock',
        defaultMessage: 'No Stock Found',
    },
    invHistogramTodayTxt: {
        id: 'inventory.histogram.today',
        description: 'Text to show today',
        defaultMessage: "Today's",
    }


});



class InventoryHistogram extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   _processData(){
   	var histogramData = JSON.parse(JSON.stringify(this.props.histogramData)),
   	processedData = [];
    if(histogramData.length){
   	let noStock = 0,
   	lastProcessedDate,
   	dataLen = histogramData.length,
    dateToday = dataLen ? new Date(Date.parse(histogramData[0].date)) :  null,
    recreatedData =  this.props.recreatedData;
    for(let i=0,len = INVENTORY_HISTORY_DAYS_COUNT,j=0 ; i <= len && dataLen; i++){
      let dataObj={};
      let currentDate = new Date(dateToday.getFullYear(),
                                  dateToday.getMonth(),
                                  dateToday.getDate(),
                                  dateToday.getHours(),
                                  dateToday.getMinutes(),
                                  dateToday.getSeconds(),
                                  dateToday.getMilliseconds());
      currentDate.setDate(currentDate.getDate() - i);
      if(!recreatedData[currentDate.getTime()]){
        dataObj.xAxisData = currentDate.getDate();
        dataObj.yAxisData = 0;
        dataObj.customData = (new Date(currentDate)).getTime();
      }
      else{
      dataObj.xAxisData =histogramData[j] ?  (new Date(Date.parse(histogramData[j].date))).getDate() : currentDate.getDate();
      dataObj.yAxisData = histogramData[j].current_stock ;
      dataObj.customData = Date.parse(histogramData[j].date);
      if(!noStock){
        noStock = histogramData[j].current_stock ;
      }
      j++;
      }
    processedData.push(dataObj);
    }
    processedData[0].noData =  noStock ? false : true;
   	processedData.sort(function(a, b) {
        var x = a["customData"]; var y = b["customData"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
   }
   
	return processedData;
   }
   shouldComponentUpdate(nextProps){
    return this.props.hasDataChanged !== nextProps.hasDataChanged
  }
   _onClickCallBack(data){
   			this.props.setInventoryDate(data.customData);
   }
   
   render() {
    var _this = this;
   var histogramData = _this._processData();
   var config = Object.assign({},INVENTORY_HISTOGRAM_CONFIG)
   config.noData = histogramData.length ? histogramData[histogramData.length-1].noData : false;
   config.noDataText= _this.context.intl.formatMessage(messages.invHistogramNoDataTxt);
   config.today = _this.context.intl.formatMessage(messages.invHistogramTodayTxt);
   config.breakMonth = _this.context.intl.formatDate(Date.now(), {month: 'short'}); 
   return (
     <div>
       <Histogram  config={config} histogramData = {histogramData} onClickCallBack={this._onClickCallBack.bind(this)}/>
     </div>
   )
 }
};

InventoryHistogram.propTypes={
  histogramData:React.PropTypes.array,
  currentDate:React.PropTypes.number,
  hasDataChanged:React.PropTypes.number,
  recreatedData : React.PropTypes.object
}
InventoryHistogram.contextTypes ={
 intl:React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch){

    return {
        setInventoryDate: function(data){ dispatch(setInventoryDate(data)); }
    }
};


export 	default connect(null,mapDispatchToProps)(InventoryHistogram);

