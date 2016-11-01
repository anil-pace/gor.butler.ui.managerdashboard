import React  from 'react';
import StackedChartHorizontal from '../../components/graphd3/stackedChartHorizontal'
import { connect } from 'react-redux'; 
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';


class InventoryStacked extends React.Component{
  constructor(props) 
  {
     super(props);
    
   }
   _processData(){
   	var node = document.createElement('div');
    var svg = d3.select(node).append('svg')
      .attr("width", "100%")
      .attr("height", "100")
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 20 + ")");
    var data = this.props.snapshotData ? this.props.snapshotData.category_data : [];
    var x = 0,utilisedSpace=0;

    for(let i = 0 ; i< data.length ; i++){
    
    if(!data[i].warehouse_utilization && data[i].unusedSpace){
      	//TODO -Need to pass parameters in arguments
        svg.append("line")
      	.attr("x1",x+"%")
      	.attr("x2",x+"%")
      	.attr("y1","-8")
      	.attr("y2","50")
      	.style("stroke",d3.rgb("#BFBFBF"))
      	.style("stroke-width","1")
      	svg.append("text")
      	.attr("x",(x-14)+"%")
      	.attr("y","-8")
      	.text(this.context.intl.formatMessage({id:"snapshot.inventory.usedSpace", defaultMessage: utilisedSpace+"% space utilized"}))

      }
      else{
        utilisedSpace+=data[i].warehouse_utilization;
      }
    	svg.append("rect")
    	.attr("x",x+"%")
      .attr("y","20")
      .attr("width",""+(data[i].warehouse_utilization || data[i].unusedSpace)+"%")
      .attr("height","50")
      .style("fill",d3.rgb(data[i].colorCode))

      x+=(data[i].warehouse_utilization || data[i].unusedSpace)
    }
   
    
    return node;
      
   }
   render() {
   var node = this._processData();
   return (
     <div>
       <StackedChartHorizontal schData = {node}/>
     </div>
   )
 }
};

InventoryStacked.propTypes={
  snapshotData:React.PropTypes.object
}
InventoryStacked.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default InventoryStacked ;