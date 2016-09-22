import React  from 'react';
import ReactDOM  from 'react-dom';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import d3tip from 'd3-tip';
import Dimensions from 'react-dimensions'

const RD3Component = rd3.Component;


class Chart extends React.Component{
  constructor(props) 
  {
     super(props);
       this.state = {d3: ''}
   }
   componentDidMount(){
    var component = this;
    var widther = this.props.containerWidth;
    var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = widther - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   var count=-1;
   var temp=-1;
   var y = d3.scale.linear().range([height, 0]);
   var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d){
      count++;
      temp++;
      if (count === 3 || temp ===0 || temp ===23){
        count = 0;
        d=d.substr(0,d.indexOf(' '));
        return d;
      }
      return "";
    });
   

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    

    
    var node = document.createElement('div');

    var svg = d3.select(node).append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //console.log(d3tip);
  const tip = d3tip()
    .attr('class', 'd3-tip')
    .offset([100, 90])
    .html(function(d) {
      var time=d.letter.split(" ");
      return "<div> Time:"+" " + time[0]+" - "+time[1] +"<div/><div> 27 Jul,2016</div> <div style='color:#ffffff'> Fulfilled:  "+" " + d.frequency + "</div>";
    })


      svg.call(tip);
    
    d3.json("http://www.mocky.io/v2/57d27c9a100000c01432817f", function(error,data) {

      var json=data;
        update(json);
      
    });

    function update(data) {
      

      data.forEach(function(d) {
        d.frequency = +d.frequency;
     });
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      svg.append("g")         
      .attr("class", "grid")
      .call(make_y_axis()
        .tickSize(-width, 0, 0)
        .tickFormat("")
        )

      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .style("font-size","12px")
      .style("font-family","sans-serif")
      .style("fill","#666666");

        //svg.append("g").text("sample!!!");

      

      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .style("font-size","12px")
      .style("font-family","sans-serif")
      .style("fill","#666666")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "4em")
      .style("text-anchor", "end");

      svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("rx", 2)         
      .attr("ry", 2)
      .attr("class", "bar")
      .attr("x", function(d) { 
        return x(d.letter); 
      })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", 0)
      .attr("height", function(d) { return height - y(d.frequency); })
      // .on('mouseover', tip.show)
      // .on('mouseout', tip.hide)

      var txt = svg.selectAll(".bar");


      


       txt.append("g")
    .attr("class", "below")
    .attr("x", function(d) { 
        return x(d.letter); 
      })
    .attr("y", function(d) { return height-y(d.frequency); })
    .attr("dy", "1.2em")
    .attr("text-anchor", "right")
    .text("krish")
    .style("fill", "#000000"); 

    //   txt.append("text")
    //   .attr("y", function(d) { return y(d.frequency); })
    // .attr("class", "below")
    // .attr("x", 12)
    // .attr("dy", "1.2em")
    // .attr("text-anchor", "right")
    // .text("krish")
    // .style("fill", "#000000");
      component.setState({d3: node});

    }

    function type(d) {
      return d;
    }

    function make_x_axis() {        
      return d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(5)
    }

    function make_y_axis() {        
      return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
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
export default Dimensions()(Chart) ;


