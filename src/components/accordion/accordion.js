//source: https://codepen.io/adamaoc/pen/wBGGQv?editors=1010

import React  from 'react';
import { FormattedMessage } from 'react-intl';

var storage = [];

class Accordion extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.handleClick = this.handleClick.bind(this);
      this.state={
        open: false,
        class: "panel",
      }
      
  }

  handleClick(e){

    const index = storage.indexOf(this.props.cutOffTimeId);

    if(index === -1){
        storage.push(this.props.cutOffTimeId);
    }
    else{
      storage.splice(index, 1);
    }
    if(storage.length >= 1){
      this.props.enableCollapseAllBtn();
    }
    else{
      this.props.disableCollapseAllBtn();
    }

    this.props.getOrderPerPbt(this.props.cutOffTimeId);

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
      });
    }
  }
  
  render()
  {
      let arrowClassName="";
      if(this.state.open === false){
        arrowClassName = "gor-expand-icon";
      }
      else{
        arrowClassName = "gor-collapse-icon";
      }
      return (
        <div className="main">
          <div className={this.state.class}>
            <div className="panelHeader" onClick={this.handleClick}>{this.props.title}
            <span className="accordionIconWrapper"> <i className={arrowClassName}></i> </span>
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

