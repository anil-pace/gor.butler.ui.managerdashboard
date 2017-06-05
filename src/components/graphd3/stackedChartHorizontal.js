import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import {SCH_CONFIG} from '../../constants/frontEndConstants';
import { defineMessages } from 'react-intl';

//Mesages for internationalization
const messages=defineMessages({
    invUsedSpace: {
        id: 'snapshot.inventory.usedSpace',
        description: 'Text for used space',
        defaultMessage: "{utilisedSpace}% space utilized",
    }
});




const RD3Component=rd3.Component;


class StackedChartHorizontal extends React.Component{
  constructor(props) 
  {
     super(props);
    this.state={d3: ''}
   }



   componentDidMount(){
    this._processData(this.props.snapshotData,this.props.config)
  }
  componentWillReceiveProps(nextProps){
    this._processData(nextProps.snapshotData,nextProps.config);
  }
  shouldComponentUpdate(nextProps, nextState){
    if(!Object.keys(nextProps.snapshotData).length){
      return false;
    }
      return true;
    
  }

  _processData(data,config){
    config=SCH_CONFIG;
    var node=document.createElement('div');
    var svg=d3.select(node).append('svg')
      .attr("width", config.svgInfo.width)
      .attr("height", config.svgInfo.height)
      .append("g")
      .attr("transform", "translate(" + config.svgInfo.x + "," + config.svgInfo.y + ")");
    var totalSpaceUtilization=data ? data.warehouse_utilization : 0;
    var totalSpaceInPx=(totalSpaceUtilization/100)*config.svgInfo.width;
    var unusedSpace=data ? data.unusedSpace : 100;
    var unusedColorCode=data ? data.colorCode : "#EEE";
     data=data.category_data ? data.category_data : [];
    var x=0;//utilisedSpace=0;
    var values={"utilisedSpace":totalSpaceUtilization};

    if(unusedSpace){
    for(let i=0, l=data.length ; i< l ; i++){
      
      svg.append("rect")
      .attr("x",x+"px")
      .attr("y",config.svgInfo.rectInfo.y)
      .attr("width",""+(data[i].warehouse_utilization ? (data[i].warehouse_utilization/100)*totalSpaceInPx : 0)+"px")
      .attr("height",config.svgInfo.rectInfo.height)
      .style("fill",d3.rgb(data[i].colorCode))

      x+=(data[i].warehouse_utilization ? (data[i].warehouse_utilization/100)*totalSpaceInPx : 0)
    }
    svg.append("rect")
      .attr("x",x+"px")
      .attr("y",config.svgInfo.rectInfo.y)
      .attr("width",""+(totalSpaceInPx-x)+"px")
      .attr("height",config.svgInfo.rectInfo.height)
      .style("fill",d3.rgb("#EEE"))
    svg.append("rect")
      .attr("x",totalSpaceInPx+"px")
      .attr("y",config.svgInfo.rectInfo.y)
      .attr("width",""+((unusedSpace/100)*config.svgInfo.width)+"px")
      .attr("height",config.svgInfo.rectInfo.height)
      .style("fill",d3.rgb(unusedColorCode))
  
     if(totalSpaceUtilization){
      let textXPos=x-14;
      if(textXPos < 0){
        textXPos=0
      }
      else if(textXPos >=config.svgInfo.width ){
        textXPos=config.svgInfo.width - 170;
      }
      svg.append("line")
      .attr("x1",totalSpaceInPx+"px")
      .attr("x2",totalSpaceInPx+"px")
      .attr("y1",config.svgInfo.lineInfo.y1)
      .attr("y2",config.svgInfo.lineInfo.y2)
      .style("stroke",d3.rgb(config.svgInfo.lineInfo.stroke))
      .style("stroke-width",config.svgInfo.lineInfo["stroke-width"])
      svg.append("text")
      .attr("x",textXPos+"px")
      .attr("y",config.svgInfo.textInfo.y)
      .text(this.context.intl.formatMessage(messages.invUsedSpace,values))
    }
    else{
      svg.append("text")
      .attr("x",(config.svgInfo.width/2)-44)
      .attr("y",Number(config.svgInfo.height)/2)
      .text(this.context.intl.formatMessage(messages.invUsedSpace,values))
    }
  }
    this.setState({d3: node});
  }

   render() {
   
   return (
     <div>
       <RD3Component data={this.state.d3} />
     </div>
   )
 }
};

StackedChartHorizontal.propTypes={
  snapshotData:React.PropTypes.object,
  hasDataChanged:React.PropTypes.bool
}
StackedChartHorizontal.contextTypes={
 intl:React.PropTypes.object.isRequired
}


export default StackedChartHorizontal ;




