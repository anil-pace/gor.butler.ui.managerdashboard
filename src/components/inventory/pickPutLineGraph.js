/**
 * Container for PickPutLineGraph 
 * 
 */
 import React  from 'react';
 import MultiLineGraph from '../graphd3/multiLineGraph';
 import {INVENTORY_LINE_CONFIG} from  '../../constants/frontEndConstants'
 import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages=defineMessages({
  toolTipPut: {
    id: 'inventory.linechart.toolTipPut',
    description: 'Text for put in tooltip',
    defaultMessage: "Put"
  },
  toolTipPick: {
    id: 'inventory.linechart.toolTipPick',
    description: 'Text for pick in tooltip',
    defaultMessage: "Picked"
  },
  toolTipEntity:{
    id: 'inventory.linechart.toolTipEntity',
    description: 'Text inventory entity',
    defaultMessage: "Items",
  },
  noDataText:{
    id:"inventory.linechart.noDataText", 
    defaultMessage: "No Item Movement"
  },
  lineChartTodayTxt: {
    id: 'inventory.linechart.today',
    description: 'Text to show today',
    defaultMessage: "Today's"
  }


});


class PickPutLineGraph extends React.Component{

 _processData(){
  var recreatedData=JSON.parse(JSON.stringify(this.props.recreatedData)),
  processedData=[];

  for(let k in recreatedData){
    let dataObj=recreatedData[k].graphInfo;
    dataObj.toolTipData={
      date:this.context.intl.formatDate(dataObj.date,
      {
        year:'numeric',
        month:'short',
        day:'2-digit'
      }),
      put:this.context.intl.formatMessage(messages.toolTipPut)+": "+dataObj.items_put+" "+this.context.intl.formatMessage(messages.toolTipEntity),
      pick:this.context.intl.formatMessage(messages.toolTipPick)+": "+dataObj.items_picked+" "+this.context.intl.formatMessage(messages.toolTipEntity)
    }
    processedData.push(dataObj)
  }

  processedData.sort(function(a, b) {
    var x=a["customData"]; var y=b["customData"];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });


  return processedData;
}
shouldComponentUpdate(nextProps){
  return this.props.hasDataChanged !== nextProps.hasDataChanged
}
render(){
  var processedData=this._processData();
  var config=Object.assign({},INVENTORY_LINE_CONFIG);
  config.noDataText=this.context.intl.formatMessage(messages.noDataText);
  config.today=this.context.intl.formatMessage(messages.lineChartTodayTxt);
  config.breakMonth=this.context.intl.formatDate(Date.now(), {month: 'short'}); 
  return (
          <div>
          <MultiLineGraph hasDataChanged={this.props.hasDataChanged} config={config} inventoryData={processedData || []}/>
          </div>
          );
}
};
PickPutLineGraph.propTypes={
  inventoryData: React.PropTypes.array,
  hasDataChanged:React.PropTypes.bool,
  noData:React.PropTypes.bool
}

PickPutLineGraph.contextTypes={
  intl: React.PropTypes.object.isRequired
}
export default PickPutLineGraph;
