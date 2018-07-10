import React  from 'react';
const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};

class AccordionMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false
    };
    this.toggleItem = this.toggleItem.bind(this);
  }
  
  componentDidMount() {
  }
  
  toggleItem(e) {
    alert("CLICKED: ", e.target);
    this.setState({
      active: !this.state.active 
    });

  }
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





// React.render(
//   <AccordionMenu title="AccordionMenu">
//     <Accordion title="Accordion 1">
//       <Panel title="Panel 1">
//           <h3>This is within panel 1</h3>
//           <div>
//               This is panel body.
//           </div>
//       </Panel>
//       <Panel title="Panel 2">
//       </Panel>
//     </Accordion>
//      <Accordion title="Accordion 2">
//      <Accordion title="Accordian Inside">
//      <Panel title="Panel inside">
//       </Panel>
//      </Accordion>
//       <Panel title="Panel 3">
//       </Panel>
//       <Panel title="Panel 4">
//       </Panel>
//     </Accordion>
//   </AccordionMenu>,
//   document.getElementById('root')
// );
