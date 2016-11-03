import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
//import * as d3Scale from 'd3-scale';





const RD3Component = rd3.Component;
const BarChart = rd3.BarChart;

class Histogram extends React.Component{
  constructor(props) 
  {
     super(props);
    this.state = {d3: ''}
   }



   componentDidMount(){
    this._processData(JSON.parse(JSON.stringify(this.props.histogramData)));
  }
  componentWillReceiveProps(nextProps){
  	this._processData(JSON.parse(JSON.stringify(nextProps.histogramData)));
  }

  
   _processData(data){
   	
	var node = document.createElement('div');
   	var svg = d3.select(node).append("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
	svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

	var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  x.domain(data.map(function(d) { return d.xAxisData; }));
  y.domain([0, d3.max(data, function(d) { return d.yAxisData; })]);
	
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(3).tickSizeOuter(0))
   

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.xAxisData); })
      .attr("y", function(d) { return y(d.yAxisData); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.yAxisData); });

      this.setState({d3: node});

   }
  

   render() {
   
   return (
     <div className="inventoryHist">
       <RD3Component data={this.state.d3} />
     </div>
   )
 }
};

Histogram.propTypes={
  histogramData:React.PropTypes.array,
  config:React.PropTypes.object
}



export default Histogram ;



