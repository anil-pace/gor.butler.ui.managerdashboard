import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions'

//constant for usage in render function
const RD3Component = rd3.Component;

class LineGraph extends React.Component{
  constructor(props) {
   super(props);
   //set the d3 object to empty for this particular component
   this.state = {d3: ''}
 }
 /**
  * Creates the graph and sets the local state to the node created by react-d3-library
  * @param  {number} containerWidth   width of the cotnainer in which the graph has to be plotted
  * @param  {Object} jsonData         data for the graph
  * @param  {Object} nextP            next props
  * @param  {Object} performanceParam [description]
  */
  _graphRender(containerWidth,jsonData,nextP){

    let node = document.createElement('div');
    let width = 360;
    let height = 360;
    let component = this;

    var jsonData = [
    { 
      "date": "2016-03-20",
      "items_picked": 3234,
      "items_put": 2344
    },
    { 
      "date": "2016-03-21",
      "items_picked": 2323,
      "items_put": 2344
    },
    { 
      "date": "2016-03-22",
      "items_picked": 3212,
      "items_put": 2344
    },
    { 
      "date": "2016-03-24",
      "items_picked": 3234,
      "items_put": 2344
    }];


    var color_hash = {  0 : ["apple", "green"],
              1 : ["mango", "orange"],
              2 : ["cherry", "red"]
            }        
            
    var parseDate = d3.time.format("%Y-%m-%d").parse

    var x = d3.time.scale()
    .range([0, width]);

    var y = d3.scale.linear()
    .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var line = d3.svg.line()
    .interpolate("linear")
    .x(function (d) {
      return x(d.items_picked);
    })
    .y(function (d) {
      return y(d.date);
    });


    var svg = d3.select(node).append("svg")
    .attr("width", width )
    .attr("height", height )
    .append("g");

    jsonData.forEach(function (d) {
        d.date = parseDate(d.date);
    });

    var minX = d3.min(jsonData, function (d) { return d.date; });
    var maxX = d3.max(jsonData, function (d) { return d.date; });
    var minY = d3.min(jsonData, function (d) { return d.items_picked; });
    var maxY = d3.max(jsonData, function (d) { return d.items_picked; });

    x.domain([minX, maxX]);
    y.domain([minY, maxY]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em");

    var items = svg.selectAll(".items")
    .data(jsonData)
    .enter().append("g")
    .attr("class", "items")
    .attr("class", function(d){
      return d.items_picked}    );

    items.append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return line(jsonData);
    })
    .style("stroke",'red')


    svg.selectAll("g.dot")
    .data(jsonData)
    .enter().append("g")
    .attr("class", "dot")
    .selectAll("circle")
    .data(jsonData)
    .enter().append("circle")
    .attr("r", 6)
    .attr("cx", function(d,i) {  return x(d.date); })
    .attr("cy", function(d,i) { return y(d.items_picked); })


    
    // Define axis ranges & scales        
    var yExtents = d3.extent(d3.merge(dataset), function (d) { return d.y; });
    var xExtents = d3.extent(d3.merge(dataset), function (d) { return d.x; });
         
  var xScale = d3.time.scale()
         .domain([xExtents[0], xExtents[1]])
         .range([padding, w - padding * 2]);

  var yScale = d3.scale.linear()
         .domain([0, yExtents[1]])
         .range([h - padding, padding]);


  // Create SVG element
  var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);


  // Define lines
  var line = d3.svg.line()
         .x(function(d) { return x(d.x); })
         .y(function(d) { return y(d.y1, d.y2, d.y3); });

  var pathContainers = svg.selectAll('g.line')
  .data(dataset);

  pathContainers.enter().append('g')
  .attr('class', 'line')
  .attr("style", function(d) {
    return "stroke: " + color_hash[dataset.indexOf(d)][1]; 
  });

  pathContainers.selectAll('path')
  .data(function (d) { return [d]; }) // continues the data from the pathContainer
  .enter().append('path')
    .attr('d', d3.svg.line()
      .x(function (d) { return xScale(d.x); })
      .y(function (d) { return yScale(d.y); })
    );

  // add circles
  pathContainers.selectAll('circle')
  .data(function (d) { return d; })
  .enter().append('circle')
  .attr('cx', function (d) { return xScale(d.x); })
  .attr('cy', function (d) { return yScale(d.y); })
  .attr('r', 3); 
    
    //Define X axis
  var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")
          .ticks(5);

  //Define Y axis
  var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);

  //Add X axis
  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

  //Add Y axis
  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

  // Add title    
  svg.append("svg:text")
       .attr("class", "title")
     .attr("x", 20)
     .attr("y", 20)
     .text("Fruit Sold Per Hour");


  // add legend   
  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", w - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100);

  legend.selectAll('g').data(dataset)
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
          .attr("x", w - 65)
          .attr("y", i*25)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", color_hash[String(i)][1]);
        
        g.append("text")
          .attr("x", w - 50)
          .attr("y", i * 25 + 8)
          .attr("height",30)
          .attr("width",100)
          .style("fill", color_hash[String(i)][1])
          .text(color_hash[String(i)][0]);

      });


    component.setState({d3: node});
  }

  componentDidMount(nextProps){
    this._graphRender();
  }

  componentWillReceiveProps(nextProps){
    this._graphRender();
  }
  render() {
   return (
     <div>
     <RD3Component data={this.state.d3} />
     </div>
     )
 }
};
export default Dimensions()(LineGraph) ;

