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
      activeid: []
    };
    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(e) {
   let arr = this.state.activeid;
   let a= arr.indexOf(e.target.id);
   (a==-1)?arr.push(e.target.id): arr.splice(a,1);
   this.setState({activeid:arr});
    // if(e.target.id==this.state.activeid){
    //   this.setState({activeid:""});
    // }else{
   
    //}
    // this.setState({
    //   active: !this.state.active 
    // });
  }
    render() {
      
      //const stateStyle = this.state.active ? styles.active: styles.inactive;
      return (      
        <div id={this.props.id} className="accordion"  onClick= {this.toggleItem}>{this.props.title}
         {(this.state.activeid).indexOf(this.props.id)==-1?this.props.children:""}
         
        </div>      
      );
    }
  }

export default Accordion;