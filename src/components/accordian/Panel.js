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
    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(e) {
    e.stopPropagation();
  }
    render() {
     
      return (      
        <div className="panel" > 
           <span>{this.props.title}</span>  
           <div onClick={this.toggleItem}>
              {this.props.children}
           </div>
        </div>
      );
    }
  }
  export default Panel;