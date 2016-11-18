/**
 * Container for PickPutLineGraph 
 * This will be switched based on tab click
 */
import React  from 'react';
import MultiLineGraph from '../graphd3/multiLineGraph';
import {INVENTORY_HISTORY_DAYS_COUNT,INVENTORY_LINE_CONFIG} from  '../../constants/appConstants'



class PickPutLineGraph extends React.Component{
    constructor(props){
        super(props);

    }   
   _processData(){
    var histogramData = JSON.parse(JSON.stringify(this.props.inventoryData)),
    processedData = [],
    noStock = 0,
    lastProcessedDate,
    dataLen = histogramData.length;
    for(let i=0,len = INVENTORY_HISTORY_DAYS_COUNT ; i < len && dataLen; i++){
        var dataObj = {},dt;
        if(histogramData[i]){
        dt = (new Date(Date.parse(histogramData[i].date)));
        dataObj.date = dt;
        dataObj.items_put = histogramData[i].items_put;
        dataObj.items_picked = histogramData[i].items_picked
        dataObj.customData = Date.parse(histogramData[i].date);
        lastProcessedDate = new Date(Date.parse(histogramData[i].date));
        if(!noStock){
            noStock = histogramData[i].current_stock;
            dataObj.noData =  noStock ? false : true;
        }
        
    }
    else{
        dataObj.date = (new Date(lastProcessedDate.setDate(lastProcessedDate.getDate() - 1)));
        dataObj.items_put = 0;
        dataObj.items_picked = 0;
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
    render(){
        var processedData = this._processData();
        return (
            <div>
                <MultiLineGraph config ={INVENTORY_LINE_CONFIG} inventoryData={processedData || []}/>
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
