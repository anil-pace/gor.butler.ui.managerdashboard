import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux';
import {barD3Component} from '../../actions/graphAction';
import { FormattedMessage } from 'react-intl'; 
import { defineMessages } from 'react-intl';
const RD3Component=rd3.Component;

const messages=defineMessages({
    noData: {
        id: 'horizontal.graph.noData',
        description: 'No data message for graph',
        defaultMessage: "No Data",
    }
});


class Chart extends React.Component{
  constructor(props) 
  {
     super(props);
       this.state={d3: ''}
   }

  graphRender(containerWidth,tData,nextP){
    var component=this, widther=containerWidth, count=-1, temp=-1, data=[], barData={}, json=tData;
    var margin={top: 20, right: 20, bottom: 20, left: 40}, width=widther - margin.left - margin.right, height=300 - margin.top - margin.bottom;
    
    if(json !== undefined) {
      for (var i=0; i < json.length; i++) {
        barData.timeInterval=json[i].timeInterval;
        barData.type=json[i][nextP];
        data.push(barData);
        barData={};
      }

    var y=d3.scale.linear().range([height, 0]);
    var x=d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var xAxis=d3.svg.axis()
     .scale(x)
     .orient("bottom")
     .tickFormat(function(d){
       count++;
       temp++;
       if (count=== 3 || temp===0 || temp===23){
         count=0;
         if(d <= 9) {
          return "0" + d + ":00"
         }
         return d+":00";
       }
       return "";
      });
   
    x.domain(data.map(function(d) { return (d.timeInterval )  ; }));
    var yAxis=d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    

    
    var node=document.createElement('div');

    var svg=d3.select(node).append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
     
        update(data);
      }
    function update(data) {
      var noDataFlag=true;
      var noData=<FormattedMessage id="horizontal.graph.noData" description="No data message for graph" 
              defaultMessage="No Data"/>;
      var m_names=new Array("Jan", "Feb", "March", 
"April", "May", "June", "July", "Aug", "Sep", 
"Oct", "Nov", "Dec"); 
      data.forEach(function(d) {
        d.type=+d.type;
     });
      
      for (var i=data.length - 1; i >= 0; i--) {
        if(data[i].type !== 0) {
          noDataFlag=false;
          break;
        }
      }
      if(noDataFlag=== false) {
        y.domain([0, d3.max(data, function(d) { return d.type; })]);
      }
      else {
        y.domain([0,100]);
      }
      
      x.domain(data.map(function(d) { return d.timeInterval; }));
      

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
        return x(d.timeInterval); 
      })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.type); })
      .attr("height", 0)
      .attr("height", function(d) {return height - y(d.type);})
      .attr("opacity", 1)
      .on("mouseover", function(d, i) {
        d3.selectAll(".bar").transition()
        .duration(250)
        .attr("opacity", function(d, j) {
          return j !== i ? 0.6 : 1;
        });
      })
      .on("mousemove", function(d, i) {
        d3.select(this)
        .classed("hover", true)
        .attr("height", function(d) {return height - y(d.type);})
        .attr("x", function(d) { return x(d.timeInterval); })
        .attr("stroke", "#045A8D")
        .attr("stroke-width", "0.5px");
        d3.select('.remove').html( "<div style='background:#4d5055; color:#ffffff; padding:10px 30px 10px 10px; border-radius:5%; font-size:14px;'> "+ d.timeInterval + ":00 - " + (d.timeInterval+1) +":00 <div style='color: #ffffff; padding-top:2px;'> "+ (new Date()).getDate() + " " + m_names[(new Date()).getMonth()] +",2016</div> <div style='color: #ffffff; display:inline-block; padding-top:10px; font-size:14px;'> Fulfilled:  " + d.type.toLocaleString() + " </div> <div style='border-left: 9px solid transparent; border-right: 9px solid transparent; border-top: 12px solid #4d5055; margin-left: 58px; position: absolute; margin-top: 5px;'/>" ).style("visibility", "visible");
        var mouse=d3.mouse(this);
           var mousex=x(d.timeInterval) + 20;
           var mousey= y(d.type) + 315 ; 
           d3.selectAll('.remove').style("left", mousex + "px" );
           d3.selectAll('.remove').style("top", + mousey + "px" );
      })
      .on("mouseout", function(d, i) {
       d3.selectAll(".layer")
        .transition()
        .duration(250)
        .attr("opacity", "1");
        d3.select(this)
        .classed("hover", false)
        .attr("stroke-width", "0px");
        d3.select('.remove').html( "<p></p>" ).style("visibility", "hidden");
      });
      
      var tooltip=d3.select(node).append("div")
      .attr("class", "remove")
      .style("position", "absolute")
      .style("z-index", "20")
      .style("visibility", "hidden")
      .style("top", "100px")
      .style("left", "55px");
    
      d3.select(node).selectAll('svg')
        .data(data)
        .on("mouseover", function(){  
           var mousex=d3.mouse(this);
           mousex=mousex[0] + 10;
           d3.selectAll('.remove').style("left", mousex + "px");
         });
    if(noDataFlag=== true) {
      svg.insert("text",":first-child").attr("x",width/2).attr("y",height/2).text(component.context.intl.formatMessage(messages.noData)|| "");
    }

    component.setState({d3: node});
    }

    

    

    function make_y_axis() {        
      return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5)
    }
  }

   componentDidMount(){
    this.graphRender(this.props.containerWidth,this.props.tableData.histData,this.props.type);
  }

   componentWillReceiveProps(nextProps){
    this.graphRender(nextProps.containerWidth,nextProps.tableData.histData,nextProps.type);
  }

   render() {
   return (
     <div>
       <RD3Component data={this.state.d3} />
     </div>
   )
 }
};

function mapStateToProps(state, ownProps){
  return {
    barData: state.filterOptions || {}
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    barD3Component: function(data){ dispatch(barD3Component(data)); }
  }
};

Chart.contextTypes={
 intl:React.PropTypes.object.isRequired
}

export default Dimensions()(Chart) ;




