import React  from 'react';
import ReactDOM  from 'react-dom';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import tip from 'd3-tip';

const RD3Component = rd3.Component;


class ChartHorizontal extends React.Component{
  constructor(props) 
  {
   super(props);
   this.state = {d3: ''}
 }
 componentWillReceiveProps(nextProps){
  var component = this;
  var widther = document.getElementById("performanceGraph").offsetWidth;
  var parentHeight = 300;
  
    var json=this.props.data.ppsPerformance.aggregate_data;
     var data = [];
      var barData = {}; 
       for (var i = 0; i < json.length; i++) {
        barData.pps_id = json[i].pps_id;
        barData.type = json[i][nextProps.type]
        data.push(barData);
        barData = {};
       }
    update(data);

  

  function update(data) {

    var width = widther-100;
   var barHeight = parentHeight/(data.length);
  var left = 20;
  var top =20;

  //var margin = {top: 20, right: 20, bottom: 50, left: 100};

  var x = d3.scale.linear()
  .range([0, width]);

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

   //chart.attr("height", barHeight * data.length);

   var bar = chart.selectAll("g")
   .data(data)
   .enter().append("g")
   .attr("rx", 20)         
   .attr("ry", 20)
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

   bar.append("rect")
   .attr("x" , 50)
   .attr("width", function(d) { return x(d.type); })
   .attr("height", barHeight - 5)
   .style("fill","#D3D3D3")
   .style("opacity", "0.5");

   bar.append("text")
   .attr("x", function(d) { return x(d.type) + 25; })
   .attr("y", barHeight / 2)
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
   .attr("y", barHeight / 2)
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
  d.type = +d.type; // coerce to number
  return d;
}



}
render() {

 return (
   <div>
   <RD3Component data={this.state.d3} />
   </div>
   )
}
};
export default ChartHorizontal ;
//ReactDOM.render(React.createElement(Chart), document.getElementById('chart_dis'))

