import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions'

const RD3Component = rd3.Component;


class Chart extends React.Component{
  constructor(props) 
  {
     super(props);
       this.state = {d3: ''}
   }

  graphRender(containerWidth,tData,nextP){
    var component = this;
    var widther = containerWidth;
    var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = widther - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
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
        return d;
      }
      return "";
    });
   

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    

    
    var node = document.createElement('div');

     
  // const tip = d3tip()
  //   .attr('class', 'd3-tip')
  //   .offset([100, 90])
  //   .html(function(d) {
  //     return "<div> Time:<div/><div> 27 Jul,2016</div> <div style='color:#ffffff'> Fulfilled:    </div>";
  //   })

    var svg = d3.select(node).append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //.call(tip); 
      



      
      var data = [];
      var barData = {};
       var json = tData; 
       if(json !== undefined) {
       for (var i = 0; i < json.length; i++) {
        barData.timeInterval = json[i].timeInterval;
        barData.type = json[i][nextP];
        data.push(barData);
        barData = {};
       }
        update(data);
      }
    function update(data) {
      data.forEach(function(d) {
        d.type = +d.type;
     });
      x.domain(data.map(function(d) { return d.timeInterval; }));
      y.domain([0, d3.max(data, function(d) { return d.type; })]);

      

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
        .attr("stroke", "#045A8D")
        .attr("stroke-width", "0.5px");
        d3.select('.remove').html( "<div style='background: grey'> Time:<div/><div> 27 Jul,2016</div> <div style='color: black'> Fulfilled:</div>" ).style("visibility", "visible");
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
        .on("mousemove", function(){  
           var mouse = d3.mouse(this);
           var mousex = mouse[0] + 10;
           var mousey =  mouse[1] + 200; 
           d3.selectAll('.remove').style("left", mousex + "px" );
           d3.selectAll('.remove').style("top", + mousey + "px" );
         })
        .on("mouseover", function(){  
           var mousex = d3.mouse(this);
           mousex = mousex[0] + 10;
           d3.selectAll('.remove').style("left", mousex + "px");
         });
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
export default Dimensions()(Chart) ;


