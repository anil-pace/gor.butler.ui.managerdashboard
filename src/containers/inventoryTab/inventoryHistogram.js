import React  from 'react';
import Histogram from '../../components/graphd3/histogram';
import {setInventoryDate} from '../../actions/inventoryActions';
import {INVENTORY_HISTORY_DAYS_COUNT,INVENTORY_HISTOGRAM_CONFIG} from '../../constants/frontEndConstants';
import { connect } from 'react-redux'; 



class InventoryHistogram extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   _processData(){
   	var histogramData = JSON.parse(JSON.stringify(this.props.histogramData)),
   	processedData = [],
   	noStock = 0,
   	lastProcessedDate,
   	dataLen = histogramData.length;
   	for(let i=0,len = INVENTORY_HISTORY_DAYS_COUNT ; i < len && dataLen; i++){
   		var dataObj = {},dt;
   		if(histogramData[i]){
   		dt = (new Date(Date.parse(histogramData[i].date)));
   		dataObj.xAxisData = dt.getDate();
   		dataObj.yAxisData = histogramData[i].current_stock;
   		dataObj.customData = Date.parse(histogramData[i].date);
   		lastProcessedDate = new Date(Date.parse(histogramData[i].date));
   		if(!noStock){
   			noStock = histogramData[i].current_stock;
   			dataObj.noData =  noStock ? false : true;
   		}
   		
   	}
   	else{
   		dataObj.xAxisData = (new Date(lastProcessedDate.setDate(lastProcessedDate.getDate() - 1))).getDate();
   		dataObj.yAxisData = 0;
   		dataObj.customData = lastProcessedDate.getTime();
   	}

   		processedData.push(dataObj);
   	}
   	processedData.sort(function(a, b) {
        var x = a["customData"]; var y = b["customData"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
   
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
   var histogramData = _this._processData();//this.context.intl.formatMessage({id:"inventory.histogram.noDataText", defaultMessage: config.noDataText}
   var config = Object.assign({},INVENTORY_HISTOGRAM_CONFIG)
   config.noData = histogramData.length ? histogramData[histogramData.length-1].noData : false;
   config.noDataText= _this.context.intl.formatMessage({id:"inventory.histogram.noDataText", defaultMessage: 'No Stock Found'});
   config.today = _this.context.intl.formatMessage({id:"inventory.histogram.today", defaultMessage: "Today's"});
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
  hasDataChanged:React.PropTypes.number
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

