import React  from 'react';
const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};
class Accordion extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false
    };
   
  }
    render() {
      
      const stateStyle = this.state.active ? styles.active: styles.inactive;
      return (      
        <h2  className="accordion">{this.props.title}
           {this.props.children} 
        </h2>      
      );
    }
  }

export default Accordion;