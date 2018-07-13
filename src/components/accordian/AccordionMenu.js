import React  from 'react';
const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'block'
  }
};

class AccordionMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false
    };
    // this.toggleItem = this.toggleItem.bind(this);
  }
  
  componentDidMount() {
  }
  
  // toggleItem(e) {
  //   alert("clicked"+e.target.className);
  //   this.setState({
  //     active: !this.state.active 
  //   });
  // }
  render() {
    

    return (      
      <div className="accordion-menu" onClick= {this.toggleItem}>
      <div>{this.props.name}
        {/*  {this.props.children}  */}
        { childrenWithProps }
      </div>
      </div>
    );
  }
}
export default AccordionMenu;






