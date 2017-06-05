/**
 * MultiLingraph can post a graph with two lines
 * one for the pick line 2nd for the put line
 */

 import React  from 'react';
 import rd3 from 'react-d3-library';
 import * as d3 from 'd3';
 import Dimensions from 'react-dimensions'

//constant for usage in render function
const RD3Component=rd3.Component;

class MultiLineGraph extends React.Component{
  constructor(props) {
   super(props);
   //set the d3 object to empty for this particular component
   this.state={d3: ''}
 }
 /**
  * Creates the graph and sets the local state to the node created by react-d3-library
  * @param  {number} containerWidth   width of the cotnainer in which the graph has to be plotted
  * @param  {Object} jsonData         data for the graph
  * @param  {Object} nextP            next props
  * @param  {Object} performanceParam [description]
  */
  
 _graphRender(invData){
    var node=document.createElement('div');
    if(invData.length > 1){
      try{
        
        let config= this.props.config;
        
        let width=config.width;
        let height=config.height;
        let margin=config.margin;
        let padding=config.padding;
        width= width - margin.left - margin.right;

        let jsonArray= invData
        
        //setting the initial 
        //var parseDate=d3.time.format("%Y-%m-%d").parse;
        let noData=this.props.noData;
        var dataArray=jsonArray.map(function(obj){
          let rObj={};
          rObj.date=new Date(obj.date);
          rObj.items_put=obj.items_put;
          rObj.items_picked=obj.items_picked;
          rObj.toolTipData=obj.toolTipData;

          return rObj;
        })
        //let dataArray=jsonArray;
        //setting scale
        
        var x=d3.time.scale().range([padding, width-padding]);
        var y=d3.scale.linear().range([height, 0]);
        var prevDiv=document.getElementsByClassName("ppLine")[0];
        var div=d3.select("body").append("div") 
        .attr("class", "tooltip ppLine")       
        .style("opacity", 0);

        //Removing preexisting tooltip div
        if(prevDiv){
            prevDiv.parentNode.removeChild(prevDiv);
        }

        // setting axis
        
        var xAxis=d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%e")).tickValues(dataArray.map( function(d){return d.date;} ))
        .outerTickSize(config.outerTickSize);
        var yAxis=d3.svg.axis().scale(y).orient("left")
        .ticks(config.ticks).outerTickSize(config.outerTickSize);

        var pickLine=d3.svg.line()
        .interpolate("monotone") 
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_picked); });

        var putLine=d3.svg.line()
        .interpolate("monotone") 
        .x(function(d) { return x(d.date);})
        .y(function(d) { return y(d.items_put); });

        var svg=d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        var g=svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Scale the range of the data
        x.domain(d3.extent(dataArray, function(d) {
         return d.date;
       }));
        if(noData){
          y.domain([0, d3.max(dataArray, function(d) { return config.defaultMaxYAxis })]);
        }
        else{
          y.domain([0, d3.max(dataArray, function(d) { var maxVal=Math.max(d.items_put, d.items_picked);return (maxVal + (1000 - (maxVal%1000)));  })]);
        }
        

        g.attr("class", "grid")
        .call(d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(4)
          .tickSize(-width)
          .tickFormat("")
          )  
        // Add the valueline path.
        if(!noData){
          g.append("path")    
          .attr("class", "line put")
          .attr("d", putLine(dataArray));

        // Add the valueline2 path.
        g.append("path")    
        .attr("class", "line pick")
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
          g.selectAll("circle")
          .data(dataArray)
          .enter().append("svg:circle")
          .attr("class", "pick")
          .attr("cx", pickLine.x())
          .attr("cy", pickLine.y())
          .attr("r", 4.5)
          .on("mouseover", function(d) {    
            div.transition()    
            .duration(200)    
            .style("opacity", 1);    
            div.html('<p style="font-weight:bold;">'+d.toolTipData.date + "</p><p>"  + d.toolTipData.pick+"</p>")  
            .style("left", (event.pageX) + "px")   
            .style("top", (event.pageY - 28) + "px");  
          })          
          .on("mouseout", function(d) {   
            div.transition()    
            .duration(500)    
            .style("opacity", 0); 
          });  ;

          g.selectAll("circle.put")
          .data(dataArray)
          .enter().append("svg:circle")
          .attr("class", "put")
          .attr("cx", putLine.x())
          .attr("cy", putLine.y())
          .attr("r", 4.5)
          .on("mouseover", function(d) {    
            div.transition()    
            .duration(200)    
            .style("opacity", 1);    
            div.html('<p style="font-weight:bold;">'+d.toolTipData.date + "</p><p>"  + d.toolTipData.put+"</p>")  
            .style("left", (event.pageX) + "px")   
            .style("top", (event.pageY - 28) + "px");  
          })          
          .on("mouseout", function(d) {   
            div.transition()    
            .duration(500)    
            .style("opacity", 0); 
          });  

          
        }
        else{
          svg
          .insert("text",":first-child")
          .attr("x",width/2)
          .attr("y",height/2)
          .text(config.noDataText);
        }
        var mBreak= g.selectAll("g.x");
        if (mBreak.length){
          var dataLen=dataArray.length ;
          var textEl=parseInt(mBreak.select("g:nth-child("+dataLen+") text").text(),10);
          let yToday="3.5em";
          mBreak.select("g:nth-child("+(dataLen)+")").append("text").attr("x","-20").attr("y",yToday).text(config.today)

          mBreak.select("g:nth-child("+(dataLen - textEl)+")").append("line").attr("class","month-break").attr("x1","15").attr("x2","15").attr("y1","0").attr("y2","25");
          mBreak.select("g:nth-child("+(dataLen - (textEl-1))+")").append("text").attr("x","-5").attr("y","30").text(config.breakMonth);
        }
        
      }
      catch(error){
        throw new Error("Error while creating the pickput line graph: "+ error);
      }
    }
    this.setState({d3: node});

  }

  componentDidMount(){
    this._graphRender(JSON.parse(JSON.stringify(this.props.inventoryData)));
  }
  componentWillReceiveProps(nextProps,nextState){
    this._graphRender(JSON.parse(JSON.stringify(nextProps.inventoryData)));
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.hasDataChanged=== nextProps.hasDataChanged || !nextProps.inventoryData.length){
      return false;
    }
      return true;
    
  }
  
  render() {
   var renderHtml=<RD3Component data={this.state.d3} />;
   
   return (
   <div>
   {renderHtml}
   </div>
   )
 }
};
MultiLineGraph.propTypes={
  inventoryData: React.PropTypes.array
}

MultiLineGraph.contextTypes={
  intl: React.PropTypes.object.isRequired
}



export default Dimensions()(MultiLineGraph) ;

