import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';


const RD3Component=rd3.Component;

class Histogram extends React.Component{
  constructor(props) 
  {
     super(props);
    this.state={d3: ''}
   }



   componentDidMount(){
   
    this._processData(JSON.parse(JSON.stringify(this.props.histogramData)),this.props.config);
  }
  componentWillReceiveProps(nextProps){
  	var config={}
    config.noData=nextProps.noData;
    config.noDataText=nextProps.noDataText;
  	this._processData(JSON.parse(JSON.stringify(nextProps.histogramData)),nextProps.config);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.hasDataChanged=== nextProps.hasDataChanged || !nextProps.histogramData.length){
      return false;
    }
      return true;
    
  }


  
   _processData(data,config){
   	
    var node=document.createElement('div');
    if(data.length > 1){
    var _this= this;
	 
   	var svg=d3.select(node).append("svg"),
    margin=config.margin,
    width=config.width - margin.left - margin.right,
    height=config.height - margin.top - margin.bottom;
	 svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

     //Hack to allow duplicate x Axis values
    var adjustTicks=function(){
       var xaxisgroup=this.node();
       var ticks=xaxisgroup.children;
       for (var i=0; i < ticks.length; i++) {
           if(ticks[i].localName=== 'path'){continue; }

           var tick_text=d3.select(ticks[i].children[1]);
           tick_text.text(tick_text.text().split("_")[1])

       };
    }

    var x=d3.scale.ordinal().rangeRoundBands([0, width], config.bandPadding);

  	var y=d3.scale.linear().range([height, 0]);
  	var xAxis=d3.svg.axis()
  	    .scale(x)
  	    .orient("bottom").outerTickSize(config.outerTickSize)
  
  	var yAxis=d3.svg.axis()
  	    .scale(y)
  	    .orient("left")
  	    .ticks(config.ticks).outerTickSize(config.outerTickSize);

		var g=svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    x.domain(data.map(function(d) { return (d.xAxisData )  ; }));
    if(config.noData && config.noData=== true){
    	y.domain([0, d3.max(data, function(d) { return config.defaultMaxYAxis; })]);
    }
    else{
    	y.domain([0, d3.max(data, function(d) { return (d.yAxisData + (1000 - (d.yAxisData%1000))); })]);
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
        .call( xAxis).call(adjustTicks);


  //Adding y axis
    g.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
     

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("rx","2")
        .attr("ry","2")
        .attr("x", function(d) { return x(d.xAxisData ); })
        .attr("y", function(d) { return y(d.yAxisData); })
        .attr("width", Math.min(x.rangeBand()-2, 100))
        .attr("height", function(d) { return height - y(d.yAxisData); })
        .on("click",function(e){
        	 d3.select(".bar.sel").classed("sel",false);
           d3.select(this).classed("sel",true);
          _this.props.onClickCallBack(e);
        	event.stopImmediatePropagation();
        })
    g.select("rect:last-child").classed("sel",true);
    if(config.noData && config.noData=== true){
        svg.insert("text",":first-child").attr("x",width/2).attr("y",height/2).text(config.noDataText || "");
    }
    if(config.showMonthBreak && data.length){
      var mBreak= g.selectAll("g.axis--x");
      var dLength=data.length;
      var lastXAxisValue=parseInt((data[dLength-1].xAxisData).split("_")[1],10);
      var monthBreak=mBreak.select("g:nth-child("+(dLength - lastXAxisValue)+")");
      let yToday="3.5em";
      mBreak.select("g:nth-child("+dLength+")").append("text").attr("x","-20").attr("y",yToday).text(config.today);
      
    }
      monthBreak.append("line").attr("class","month-break").attr("x1","15").attr("x2","15").attr("y1","0").attr("y2","25");
      monthBreak.append("text").attr("x","20").attr("y","30").text(config.breakMonth);

    }
        

     
     this.setState({d3: node});
   }
  

   render() {
   
   var renderHtml=<RD3Component data={this.state.d3} />;
   return (
     <div className="inventoryHist">
       {renderHtml}
     </div>
   )
 }
};

Histogram.propTypes={
  histogramData:React.PropTypes.array,
  config:React.PropTypes.object,
  onClickCallBack:React.PropTypes.func,
  noDataText:React.PropTypes.string,
  noData:React.PropTypes.bool,
  hasDataChanged:React.PropTypes.bool
}




export default Histogram ;



