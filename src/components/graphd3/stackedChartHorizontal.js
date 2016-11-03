import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';




const RD3Component = rd3.Component;


class StackedChartHorizontal extends React.Component{
  constructor(props) 
  {
     super(props);
    this.state = {d3: ''}
   }



   componentDidMount(){
    this._processData(this.props.snapshotData,this.props.config)
  }
  componentWillReceiveProps(nextProps){
    this._processData(nextProps.snapshotData,nextProps.config);
  }

   
  _processData(data,config){
    var config = this.props.config;
    var node = document.createElement('div');
    var svg = d3.select(node).append('svg')
      .attr("width", config.svgInfo.width)
      .attr("height", config.svgInfo.height)
      .append("g")
      .attr("transform", "translate(" + config.svgInfo.x + "," + config.svgInfo.y + ")");
     data = data ? data.category_data : [];
    var x = 0,utilisedSpace=0;
    var values={"utilisedSpace":utilisedSpace};

    for(let i = 0, l =data.length ; i< l ; i++){
    
    if(!data[i].warehouse_utilization && data[i].unusedSpace){
        
        values.utilisedSpace = utilisedSpace;
        svg.append("line")
        .attr("x1",x+"%")
        .attr("x2",x+"%")
        .attr("y1",config.svgInfo.lineInfo.y1)
        .attr("y2",config.svgInfo.lineInfo.y2)
        .style("stroke",d3.rgb(config.svgInfo.lineInfo.stroke))
        .style("stroke-width",config.svgInfo.lineInfo["stroke-width"])
        svg.append("text")
        .attr("x",(x-14 < 0 ? 0 : x-14)+"%")
        .attr("y",config.svgInfo.textInfo.y)
        .text(this.context.intl.formatMessage({id:"snapshot.inventory.usedSpace", defaultMessage: config.svgInfo.textInfo.message},values))

      }
      else{
        utilisedSpace+=data[i].warehouse_utilization;
      }
      svg.append("rect")
      .attr("x",x+"%")
      .attr("y",config.svgInfo.rectInfo.y)
      .attr("width",""+(data[i].warehouse_utilization || data[i].unusedSpace)+"%")
      .attr("height",config.svgInfo.rectInfo.height)
      .style("fill",d3.rgb(data[i].colorCode))

      x+=(data[i].warehouse_utilization || data[i].unusedSpace)
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
  config:React.PropTypes.object
}
StackedChartHorizontal.contextTypes ={
 intl:React.PropTypes.object.isRequired
}


export default StackedChartHorizontal ;




