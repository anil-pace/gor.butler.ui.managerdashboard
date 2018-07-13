import React  from 'react';
const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};
class Panel extends React.Component {  
  constructor (props) {
    super(props);
    
    
  }
    render() {
     
      return (      
        <div className="panel" > 
           <span>{this.props.title}</span>  
           <div>
              {this.props.children}
           </div>
        </div>
      );
    }
  }
  export default Panel;