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
  _graphRender(){

    try{
        // if (this.props.inventoryData.length  <= 0){
        //   return;
        // }
        let node = document.createElement('div');
        let width = 360;
        let height = 360;
        let margin = {top: 30, right: 40, bottom: 30, left: 50};
        let component = this;
        // let dataArray = this.props.inventoryData;
        let jsonArray = [{
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
        }];
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

        // setting axis
        var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);
        var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

        var pickLine = d3.svg.line()
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_put); });

        var putLine = d3.svg.line()
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_picked); });

        var svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")


        // Scale the range of the data
        x.domain(d3.extent(dataArray, function(d) { return d.date; }));
        y.domain([0, d3.max(dataArray, function(d) { return Math.max(d.items_put, d.items_picked); })]);

        // Add the valueline path.
        svg.append("path")    
        .attr("class", "line")
        .attr("d", putLine(dataArray));

        // Add the valueline2 path.
        svg.append("path")    
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", pickLine(dataArray));

        // Add the X Axis
        svg.append("g")     
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        // Add the Y Axis
        svg.append("g")     
        .attr("class", "y axis")
        .call(yAxis);


        this.setState({d3: node});
      }
      catch(error){
        throw "Error while creating the pickput line graph: "+ error;
      }

    }

    componentDidMount(){
      this._graphRender()
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

