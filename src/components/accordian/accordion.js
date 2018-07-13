import React  from 'react';
import AccordionHeader from './accordionHeader'
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
      activeid: false
    };
    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(e) {
    e.stopPropagation();
    if(!e.target.id){
      return false;
    }
   let arr = !this.state.activeid;
   this.setState({activeid:arr});

  }
    render() {
      
      
      return (   
        <div>   
        <div id={this.props.id} className="accordion"  onClick={this.toggleItem}>{this.props.title}
        <AccordionHeader  data={this.props.header}/> 
         {this.state.activeid?this.props.children:""}
         </div>
         </div>
      );
    }
  }

export default Accordion;