import React  from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux';


const RD3Component = rd3.Component;


class StackedChartHorizontal extends React.Component{
  constructor(props) 
  {
     super(props);
    this.state = {d3: ''}
   }



   componentDidMount(){
    this._processData()
  }

   componentWillReceiveProps(nextProps){
    
  }
  _processData(){
    /*var node = document.createElement('div');
    var svg = d3.select(node).append('svg')
      .attr("width", "100%")
      .attr("height", "80")
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")")
      .append("rect")
      .attr("x","0")
      .attr("y","0")
      .attr("width","100")
      .attr("height","100")
      .fill("green");*/
    this.setState({d3: this.props.schData});
  }

   render() {
   
   return (
     <div>
       <RD3Component data={this.state.d3} />
     </div>
   )
 }
};

StackedChartHorizontal.propTypes={
  schData:React.PropTypes.object
}
function mapStateToProps(state, ownProps){
  
  return {
    
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    
  }
};

export default StackedChartHorizontal ;




