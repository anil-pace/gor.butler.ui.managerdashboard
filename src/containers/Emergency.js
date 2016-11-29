import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';        

class Emergency extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
      this.props.removeModal();
  }
  render()
  {
      return (
        <div>
          <div className='gor-emergency'>
            <div className='gor-emergency-heading'>
              <span className='gor-error-white'></span><span><FormattedMessage id="emergency.heading" description='Text for emergency heading' 
            defaultMessage="Systemwide emergency stop" /></span>
           </div>
              <div className='gor-emergency-body'>
                <span><FormattedMessage id="emergency.type" description='Text for emergency type ' 
            defaultMessage="The butler system is now stopped by a {type} emergency." values={{type:this.props.emergency_data||"--"}} /></span>
                <div><FormattedMessage id="emergency.action" description='Text for emergency action' 
            defaultMessage="System reset required before returning to operation" /></div>
                <div className='gor-emergency-details'>
                  <div><FormattedMessage id="emergency.stop" description='Text for emergency stop' 
            defaultMessage="Stoppped:" /></div>
                  <div><FormattedMessage id="emergency.trigger" description='Text for emergency trigger' 
            defaultMessage="Triggered at:" /></div>
                  <div><FormattedMessage id="emergency.operator" description='Text for emergency operator' 
            defaultMessage="Operator:" /></div>                
                </div>
              </div> 
                <p><button className='gor-emergency-close' onClick={this.removeThisModal.bind(this)}><FormattedMessage id="emergency.button" description='Text for close button' 
            defaultMessage="Close" /></button></p>
          </div>
        </div>
      );
    }
  };
 
function mapDispatchToProps(dispatch){
    return {

    }
};

export default connect(null,mapDispatchToProps)(Emergency);
