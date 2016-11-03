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

   
  _processData(){
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




