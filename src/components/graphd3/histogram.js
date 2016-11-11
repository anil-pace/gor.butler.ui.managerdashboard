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
   
    this._processData(JSON.parse(JSON.stringify(this.props.histogramData)),this.props.config);
  }
  componentWillReceiveProps(nextProps){
  	var config = {}
    config.noData = nextProps.noData;
    config.noDataText = nextProps.noDataText;
  	this._processData(JSON.parse(JSON.stringify(nextProps.histogramData)),nextProps.config);
  }
  shouldComponentUpdate(nextProps){
  	return this.props.hasDataChanged !== nextProps.hasDataChanged
  }

  
   _processData(data,config){
   	var _this= this;
	var node = document.createElement('div');
   	var svg = d3.select(node).append("svg"),
    margin = config.margin,
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom;
	svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    var x = d3.scale.ordinal().rangeRoundBands([0, width], config.bandPadding);

	var y = d3.scale.linear().range([height, 0]);
	

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom").outerTickSize(config.outerTickSize)

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(config.ticks).outerTickSize(config.outerTickSize);

		var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  x.domain(data.map(function(d) { return (d.xAxisData < 10 ? "0" +d.xAxisData :d.xAxisData)  ; }));
  if(config.noData && config.noData === true){
  	y.domain([0, d3.max(data, function(d) { return config.defaultMaxYAxis; })]);
  }
  else{
  	y.domain([0, d3.max(data, function(d) { return d.yAxisData; })]);
  }

//Adding grid lines
g.attr("class", "grid")
      .call(d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(config.ticks)
	          .tickSize(-width)
	          .tickFormat("")
      )
//Adding x axis
  g.append("g")
      .attr("class", "x axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call( xAxis);


//Adding y axis
  g.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis)
   

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
  .attr("x", function(d) { return x(d.xAxisData ); })
      .attr("y", function(d) { return y(d.yAxisData); })
      .attr("width", Math.min(x.rangeBand()-2, 100))
      .attr("height", function(d) { return height - y(d.yAxisData); })
      .on("click",function(e){
      	_this.props.onClickCallBack(e);
      	event.stopImmediatePropagation();
      })
  if(config.noData && config.noData === true){
      svg.insert("text",":first-child").attr("x",width/2).attr("y",height/2).text(config.noDataText || "");
  }

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
  config:React.PropTypes.object,
  onClickCallBack:React.PropTypes.func,
  noDataText:React.PropTypes.noDataText,
  noData:React.PropTypes.noData,
  hasDataChanged:React.PropTypes.number
}



export default Histogram ;



