import React  from 'react';
import { connect } from 'react-redux';



class GorTabs extends React.Component{
  constructor(props) 
  {
      super(props); 
    
  }



  render()
  {
      
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }

function mapStateToProps(state, ownProps){
  return {
      
}

var mapDispatchToProps=function(dispatch){
  return {
   
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(GorTabs);

