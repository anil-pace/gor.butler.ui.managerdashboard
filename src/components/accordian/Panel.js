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
    this.state = {
      active: false
    };
    
  }
    render() {
      const stateStyle = this.state.active ? styles.active: styles.inactive;
      console.log("PANEL: ", this.props.stateStyle);
      return (      
        <div className="panel"  style = { this.props.stateStyle } >
           <span>{this.props.title}</span>  
           <div>
              {this.props.children}
           </div>
        </div>
      );
    }
  }
  export default Panel;