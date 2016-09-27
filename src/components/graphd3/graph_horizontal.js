import React  from 'react';
import ReactDOM  from 'react-dom';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import tip from 'd3-tip';
import Dimensions from 'react-dimensions'

const RD3Component = rd3.Component;


class ChartHorizontal extends React.Component{
  constructor(props) 
  {
   super(props);
   this.state = {d3: ''}
 }
 
graphRender(containerWidth,tData,nextP){
var component = this;
  var widther = containerWidth;
  var parentHeight = 300;
  
    var json=tData;
     var data = [];
      var barData = {}; 
       for (var i = 0; i < json.length; i++) {
        barData.pps_id = json[i].pps_id;
        barData.type = json[i][nextP]
        data.push(barData);
        barData = {};
       }
    update(data);

  

  function update(data) {

    var width = widther-100;
   var barHeight = parentHeight/(data.length);
  var left = 30;
  var top =20;

  //var margin = {top: 20, right: 20, bottom: 50, left: 100};

  var x = d3.scale.linear()
  .range([0, width]);

  var xAxis =  d3.svg.axis()
    .scale(x)
    .orient("top")

  var y = d3.scale.ordinal().rangeRoundBands([0, barHeight], .1);
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right")

    var node = document.createElement('div');
var chart = d3.select(node).append('svg')
  .attr("width", widther)
  .attr("height", 400)
  .append("g")
   .attr("transform", "translate(" + left + "," + top + ")")

   x.domain([0, d3.max(data, function(d) { return d.type; })]);

   

   var bar = chart.selectAll("g")
   .data(data)
   .enter().append("g")
   .attr("class", "g")
      .attr("y", function(d) { 
        return y(d.pps_id); 
      })
      .attr("width", y.rangeBand())
   .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

   bar.append("g")
      .attr("class", "axis")
      .call(yAxis)
      .style("font-size","30px")
      .style("font-family","sans-serif")
      .style("fill","red")
      .append("text")
      .attr("y", 6)
      .attr("dy", "4em")
      .style("text-anchor", "end");

    bar.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + "50" + ",0)")
    .style({ 'stroke': '#D3D3D3', 'fill': '#D3D3D3', 'stroke-width': '1px'})
    .call(yAxis); 

     

   bar.append("rect")
   .attr("rx", 2)         
   .attr("ry", 2)
   .attr("x" , 50)
   .attr("width", function(d) { return x(d.type); })
   .attr("height", barHeight - 8)
   .style("fill","#D3D3D3")
   .style("opacity", "0.5");

   bar.append("text")
   .attr("x", function(d) { return x(d.type) + 25; })
   .attr("y", (barHeight / 2) - 3)
   .attr("dy", ".35em")
   .text(function(d) { 
      if(d.type === 0){ 
        return "ERROR"; 
      }

      else{
        return d.type;
      }
      })
   .style("font-size","12px")
   .style("font-weight", "bold")
   .style("font-family","sans-serif")
   .style("fill","#666666");

   bar.append("text")
   .attr("x", -10)
   .attr("y", (barHeight / 2) - 3) 
   .attr("dy", ".35em")
   .text(function(d) { 
      if(d.type === 4){ 
        return "PPS " + d.pps_id; 
      }

      else{
        return "PPS " + d.pps_id;
      }
      })
   .style("font-size","12px")
   .style("font-family","sans-serif")
   .style("fill","#666666");
   

   component.setState({d3: node});
 }

 function type(d) {
  d.type = +d.type; 
  return d;
}
}
componentDidMount(){
    this.graphRender(this.props.containerWidth,this.props.data.ppsPerformance.aggregate_data,this.props.type);
  }

   componentWillReceiveProps(nextProps){
    this.graphRender(nextProps.containerWidth,nextProps.data.ppsPerformance.aggregate_data,nextProps.type);
  }
render() {
 return (
   <div>
   <RD3Component data={this.state.d3} />
   </div>
   )
}
};
export default Dimensions()(ChartHorizontal) ;

