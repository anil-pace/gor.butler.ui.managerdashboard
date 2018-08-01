import React  from 'react';
const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
};
class AccordionHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeid: false
    };
  }

    render() {
      var data=this.props.data;
      
      return (   
        <div id="raj" className="accordionHeader">   
        {data}
         </div>
      );
    }
  }

export default AccordionHeader;