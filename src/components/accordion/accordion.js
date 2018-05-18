import React  from 'react';
import { FormattedMessage } from 'react-intl';
//import Spinner from '../../components/spinner/Spinner';
import {withSpinner} from '../../HOC/withSpinner';

var storage = [];

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
  spinnerHTML=<div className="infinite-content">
          <p><FormattedMessage id="notification.infinite.message" description='Infinite scroll message' defaultMessage='Loading More'/></p>
    </div>


  componentWillReceiveProps(nextProps){
    if(nextProps.isOpened!==this.props.isOpened){
       this.setState({open:nextProps.isOpened,class:['panel',nextProps.isOpened?'open':''].join(" ")})
    }
  }

  handleClick(pbtData,e){
  
    if(!pbtData.opened){
    this.props.setOrderListSpinner(true);
    const index = storage.indexOf(this.props.cutOffTimeIndex);
    const timeIndex = pbtData.cut_off_time;
    
    this.props.getOrderPerPbt(pbtData);
    }
    this.props.setActivePbt({pbt:pbtData})
    
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
            <div  className="panelHeader" onClick={this.handleClick.bind(this,this.props.pbts[this.props.cutOffTimeIndex])}>{this.props.title}
              <span className="accordionIconWrapper"> <i className={arrowClassName}></i> </span>
            </div>
             
            <div className="panelWrapper">
                    
              <div className="panelContent" onScroll={this.props.onScrollHandler ? (event) => this.props.onScrollHandler(event, this.props.cutOffTimeIndex) : null}>
                {(this.state.class === "panel open") ? this.props.children : null}
              </div>
            </div>

          </div>
        </div>
      );
    }
  }

  export default withSpinner(Accordion);