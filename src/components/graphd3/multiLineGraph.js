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
        let config =  this.props.config;
        let node = document.createElement('div');
        let width = config.width;
        let height = config.height;
        let margin =config.margin;
        let component = this;
        // let dataArray = this.props.inventoryData;
        width= width - margin.left - margin.right;

        let jsonArray= invData
        
        //setting the initial 
        //var parseDate = d3.time.format("%Y-%m-%d").parse;
        let noData = jsonArray[jsonArray.length-1] ? jsonArray[jsonArray.length-1].noData : false;
       let dataArray = jsonArray.map(function(obj){
          let rObj = {};
          rObj.date = new Date(obj.date);
          rObj.items_put = obj.items_put;
          rObj.items_picked = obj.items_picked;

          return rObj;
        })
        //let dataArray = jsonArray;
        //setting scale
        
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);
        var xx = function(e)  { return x(function(d) { return x(d.date);}) };
        var yy = function(e)  { return y(function(d) { return y(d.items_put); }) };

        // setting axis
        
        var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%d")).ticks(dataArray.length-1)
        .outerTickSize(config.outerTickSize);
        var yAxis = d3.svg.axis().scale(y).orient("left")
        .ticks(config.ticks).outerTickSize(config.outerTickSize);

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
        if(noData){
          y.domain([0, d3.max(dataArray, function(d) { return config.defaultMaxYAxis })]);
        }
        else{
          y.domain([0, d3.max(dataArray, function(d) { return Math.max(d.items_put, d.items_picked); })]);
        }
        

        g.attr("class", "grid")
      .call(d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(3)
            .tickSize(-width)
            .tickFormat("")
      )  
        // Add the valueline path.
        if(!noData){
        g.append("path")    
        .attr("class", "line")
        .attr("d", putLine(dataArray));

        // Add the valueline2 path.
        g.append("path")    
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", pickLine(dataArray));
      }

        // Add the X Axis
        g.append("g")     
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        // Add the Y Axis
        g.append("g")     
        .attr("class", "y axis")
        .call(yAxis);
        if(!noData){
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
    }
    else{
      svg.insert("text",":first-child").attr("x",width/2).attr("y",height/2).text("No Item Movement" || "");
    }
        
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

