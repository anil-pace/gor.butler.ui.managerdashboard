/**
 * Container for PickPutLineGraph 
 * This will be switched based on tab click
 */
import React  from 'react';
import MultiLineGraph from '../graphd3/multiLineGraph';
import {INVENTORY_HISTORY_DAYS_COUNT,INVENTORY_LINE_CONFIG} from  '../../constants/frontEndConstants'



class PickPutLineGraph extends React.Component{
    constructor(props){
        super(props);

    }   
   _processData(){
    var histogramData = JSON.parse(JSON.stringify(this.props.inventoryData)),
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
        dataObj.date = currentDate;
        dataObj.items_put = 0;
        dataObj.items_picked = 0;
        dataObj.customData = (new Date(currentDate)).getTime();
      }
      else{
        dataObj.date =histogramData[j] ?  (new Date(Date.parse(histogramData[j].date))) : currentDate;
        dataObj.items_put =  histogramData[j].items_put;
        dataObj.items_picked = histogramData[j].items_picked;
        dataObj.customData = Date.parse(histogramData[j].date);
      if(!noStock){
        noStock = histogramData[j].items_put || histogramData[j].items_picked;
        dataObj.noData =  noStock ? false : true;
      }
      j++;
      }
    processedData.push(dataObj);
    }
   
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
    render(){
        var processedData = this._processData();
        var config = Object.assign({},INVENTORY_LINE_CONFIG)
        config.noDataText = this.context.intl.formatMessage({id:"inventory.linechart.noDataText", defaultMessage: "No Item Movement"})
        return (
            <div>
                <MultiLineGraph config ={config} inventoryData={processedData || []}/>
            </div>
            );
    }
};
PickPutLineGraph.propTypes={
    inventoryData: React.PropTypes.array,
    hasDataChanged:React.PropTypes.number
}

PickPutLineGraph.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
export default PickPutLineGraph;
