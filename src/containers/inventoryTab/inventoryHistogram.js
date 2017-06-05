import React  from 'react';
import Histogram from '../../components/graphd3/histogram';
import {setInventoryDate} from '../../actions/inventoryActions';
import {INVENTORY_HISTOGRAM_CONFIG} from '../../constants/frontEndConstants';
import { connect } from 'react-redux'; 
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages=defineMessages({
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

 _processData(){
  var recreatedData=JSON.parse(JSON.stringify(this.props.recreatedData)),
  processedData=[];

  for(var k in recreatedData){
    processedData.push(recreatedData[k].graphInfo)
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
_onClickCallBack(data){
  this.props.setInventoryDate(data.customData);

}

render() {
  var _this=this;
  var histogramData=_this._processData();
  var config=Object.assign({},INVENTORY_HISTOGRAM_CONFIG)
  config.noData=this.props.noData;
  config.noDataText= _this.context.intl.formatMessage(messages.invHistogramNoDataTxt);
  config.today=_this.context.intl.formatMessage(messages.invHistogramTodayTxt);
  config.breakMonth=_this.context.intl.formatDate(Date.now(), {month: 'short'}); 
  return (
          <div>
          <Histogram  hasDataChanged={this.props.hasDataChanged} config={config} histogramData={histogramData} onClickCallBack={this._onClickCallBack.bind(this)}/>
          </div>
          )
}
};

InventoryHistogram.propTypes={
  histogramData:React.PropTypes.array,
  currentDate:React.PropTypes.number,
  hasDataChanged:React.PropTypes.bool,
  recreatedData : React.PropTypes.object,
  noData:React.PropTypes.bool
}
InventoryHistogram.contextTypes={
 intl:React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch){

  return {
    setInventoryDate: function(data){ dispatch(setInventoryDate(data)); }
  }
};


export 	default connect(null,mapDispatchToProps)(InventoryHistogram);

