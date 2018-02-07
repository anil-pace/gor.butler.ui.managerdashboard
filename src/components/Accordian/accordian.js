import React  from 'react';
import { FormattedMessage } from 'react-intl';

class Accordian extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.handleClick = this.handleClick.bind(this);
      this.state={
        open: false,
        class: "panel"
      }
      
  }

  handleClick(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "panel"
      });
   }else{
     this.setState({
       open: true,
       class: "panel open"
     });
    }
  }
  
  render()
  {
      return (
        <div className="main">
          <div className={this.state.class}>
            <div className="panelHeader" onClick={this.handleClick}>{this.props.title}</div>
            <div className="panelWrapper">
              <div className="panelContent">
                {(this.state.class === "panel open") ? this.props.children : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Accordian;