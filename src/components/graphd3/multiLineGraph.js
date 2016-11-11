/**
 * MultiLingraph can post a graph with two lines
 * one for the pick line 2nd for the put line
 */

import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions'

//constant for usage in render function
const RD3Component = rd3.Component;

class MultiLineGraph extends React.Component{
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
 
  _graphRender(invData){

    try{
        // if (this.props.inventoryData.length  <= 0){
        //   return;
        // }
        let node = document.createElement('div');
        let width = 900;
        let height = 200;
        let margin ={top: 20, right: 20, bottom: 30, left: 60};
        let component = this;
        // let dataArray = this.props.inventoryData;
        width= width - margin.left - margin.right;

        let jsonArray= invData
        /*let jsonArray = [{
          "total_skus": 495,
          "opening_stock": 5165,
          "cbm_used": 31.16,
          "warehouse_utilization": 5.65,
          "date": "2016-10-1",
          "items_picked": 200,
          "items_put": 340,
          "current_stock": 5165
        }, {
          "total_skus": 495,
          "opening_stock": 5165,
          "cbm_used": 31.16,
          "warehouse_utilization": 5.65,
          "date": "2016-10-2",
          "items_picked": 100,
          "items_put": 200,
          "current_stock": 5165
        }, {
          "total_skus": 495,
          "opening_stock": 5165,
          "cbm_used": 31.16,
          "warehouse_utilization": 5.65,
          "date": "2016-10-3",
          "items_picked": 200,
          "items_put": 233,
          "current_stock": 5165
        }, {
          "total_skus": 495,
          "opening_stock": 5165,
          "cbm_used": 31.16,
          "warehouse_utilization": 5.65,
          "date": "2016-10-4",
          "items_picked": 150,
          "items_put": 223,
          "current_stock": 5165
        }, {
          "total_skus": 495,
          "opening_stock": 5165,
          "cbm_used": 31.16,
          "warehouse_utilization": 5.65,
          "date": "2016-10-5",
          "items_picked": 400,
          "items_put": 300,
          "current_stock": 5165
        }];*/
        //setting the initial 
        var parseDate = d3.time.format("%Y-%m-%d").parse;
        let dataArray = jsonArray.map(function(obj){
          let rObj = {};
          rObj.date = parseDate(obj.date);
          rObj.items_put = obj.items_put;
          rObj.items_picked = obj.items_picked;

          return rObj;
        })
        //setting scale
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);
        var xx = function(e)  { return x(function(d) { return x(d.date);}) };
        var yy = function(e)  { return y(function(d) { return y(d.items_put); }) };

        // setting axis
        var xAxis = d3.svg.axis().scale(x).orient("bottom")
        .outerTickSize(0);
        var yAxis = d3.svg.axis().scale(y).orient("left")
        .ticks(3).outerTickSize(0);

        var pickLine = d3.svg.line()
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_put); });

        var putLine = d3.svg.line()
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_picked); });

        var svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Scale the range of the data
        x.domain(d3.extent(dataArray, function(d) {
         return d.date;
          }));
        y.domain([0, d3.max(dataArray, function(d) { return Math.max(d.items_put, d.items_picked); })]);

        g.attr("class", "grid")
      .call(d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(3)
            .tickSize(-width)
            .tickFormat("")
      )  
        // Add the valueline path.
        g.append("path")    
        .attr("class", "line")
        .attr("d", putLine(dataArray));

        // Add the valueline2 path.
        g.append("path")    
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", pickLine(dataArray));

        // Add the X Axis
        g.append("g")     
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        // Add the Y Axis
        g.append("g")     
        .attr("class", "y axis")
        .call(yAxis);

        g.selectAll("circle.line")
        .data(dataArray)
        .enter().append("svg:circle")
        .attr("class", "line")
        .style("fill", "#D0021B")
        .attr("cx", pickLine.x())
        .attr("cy", pickLine.y())
        .attr("r", 3.5);

         g.selectAll("circle.line2")
        .data(dataArray)
        .enter().append("svg:circle")
        .attr("class", "line")
        .style("fill", "#7ED321")
        .attr("cx", putLine.x())
        .attr("cy", putLine.y())
        .attr("r", 3.5);  

        

        this.setState({d3: node});
      }
      catch(error){
        throw "Error while creating the pickput line graph: "+ error;
      }

    }

   componentDidMount(){
    this._graphRender(JSON.parse(JSON.stringify(this.props.inventoryData)));
  }
  componentWillReceiveProps(nextProps,nextState){
    this._graphRender(JSON.parse(JSON.stringify(nextProps.inventoryData)));
  }
  
    render() {
      
     return (
     <div>
     <RD3Component data={this.state.d3} />
     </div>
     )
   }
 };
 MultiLineGraph.propTypes={
  inventoryData: React.PropTypes.array
}

MultiLineGraph.contextTypes = {
  intl: React.PropTypes.object.isRequired
}


export default Dimensions()(MultiLineGraph) ;

