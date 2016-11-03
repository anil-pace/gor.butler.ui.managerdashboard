import React  from 'react';
import Histogram from '../../components/graphd3/histogram'

class InventoryHistogram extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   _processData(){
   	var histogramData = JSON.parse(JSON.stringify(this.props.histogramData)),
   	processedData = [];
   	for(var i=0,len = histogramData.length ; i < len ; i++){
   		var dataObj = {};
   		dataObj.xAxisData = (new Date(Date.parse(histogramData[i].date))).getDate();
   		dataObj.yAxisData = histogramData[i].current_stock;
   		processedData.push(dataObj);
   	}
   
	return processedData;
   }
   
   render() {
   var histogramData = this._processData()
   return (
     <div>
       <Histogram histogramData = {histogramData} />
     </div>
   )
 }
};

InventoryHistogram.propTypes={
  histogramData:React.PropTypes.array
}



export default InventoryHistogram ;
