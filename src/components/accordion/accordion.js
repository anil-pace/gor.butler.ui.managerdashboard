
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

  handleClick(e){

    const index = storage.indexOf(this.props.cutOffTimeIndex);
    this.props.setActivePbtIndex(this.props.cutOffTimeIndex)
    this.props.getOrderPerPbt(this.props.cutOffTimeIndex);
   

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
            <div key={this.props.key} className="panelHeader" onClick={this.handleClick}>{this.props.title}
              <span className="accordionIconWrapper"> <i className={arrowClassName}></i> </span>
            </div>
             
            <div key={this.props.ordersForWhichPbt} className="panelWrapper">
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

