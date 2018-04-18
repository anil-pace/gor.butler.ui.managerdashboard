
import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';

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


  componentWillReceiveProps(nextProps){
    if(nextProps.isOpened!==this.props.isOpened){
      console.log("INdex"+nextProps.cutOffTimeIndex+" opened"+nextProps.isOpened)
       this.setState({open:nextProps.isOpened,class:['panel',nextProps.isOpened?'open':''].join(" ")})
    }


    
  }

  handleClick(e){

    const index = storage.indexOf(this.props.cutOffTimeIndex);
    const timeIndex = this.props.pbts[this.props.cutOffTimeIndex].cut_off_time;
    //this.props.setActivePbtIndex({index:this.props.cutOffTimeIndex})
    this.props.setActivePbtIndex({index:timeIndex})
    this.props.getOrderPerPbt(this.props.cutOffTimeIndex);
   
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
            <div  className="panelHeader" onClick={this.handleClick}>{this.props.title}
              <span className="accordionIconWrapper"> <i className={arrowClassName}></i> </span>
            </div>
             
            <div className="panelWrapper">
                    <Spinner isLoading={this.props.isInfiniteLoading} utilClassNames={"infinite-scroll"}>
                      <div className="infinite-content"><p><FormattedMessage id="notification.infinite.message" description='Infinite scroll message' defaultMessage='Loading More'/></p></div>
                    </Spinner>
              <div className="panelContent" onScroll={this.props.onScrollHandler ? (event) => this.props.onScrollHandler(event, this.props.cutOffTimeIndex) : null}>
                {(this.state.class === "panel open") ? this.props.children : null}
              </div>
            </div>

          </div>
        </div>
      );
    }
  }

  export default Accordion;

