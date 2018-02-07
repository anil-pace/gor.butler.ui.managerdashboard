//source: https://codepen.io/adamaoc/pen/wBGGQv?editors=1010

import React  from 'react';
import { FormattedMessage } from 'react-intl';

class Accordion extends React.Component{
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
      console.log("===========================.           INSIDE OPEN FALSE");
      this.setState({
        open: false,
        class: "panel"
      });
    }else{
      console.log("===========================.           INSIDE OPEN TRUE");
      this.setState({
        open: true,
        class: "panel open"
      },this.props.resetCollapseAll);
    }
  }
  
  render()
  {
      return (
        <div className="main">
          <div className={this.state.class}>
            <div className="panelHeader" onClick={this.handleClick}>{this.props.title}
            <span className="accordionIconWrapper"> <i className="down"></i> </span>
            </div>
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

  export default Accordion;

