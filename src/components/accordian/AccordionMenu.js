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
    const stateStyle = this.state.active ? styles.active: styles.inactive;
    var childrenWithProps = React.Children.map(this.props.children, function(child)  {
          return React.cloneElement(child, { stateStyle: stateStyle });
    });

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






