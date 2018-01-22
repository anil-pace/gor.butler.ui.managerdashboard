import React  from 'react';
import { connect } from 'react-redux' ;
import { FormattedMessage,injectIntl,defineMessages } from 'react-intl';        

/*Intl Messages*/
const  messages= defineMessages({
    latchGateSensor: {
        id: 'operationPause.sensor.latchGate',
        description: 'Text for latch_gate sensor',
        defaultMessage: 'Latch Gate'
    },
    buttonSensor: {
        id: 'operationPause.sensor.buttonSensor',
        description: 'Text for button_press sensor',
        defaultMessage: 'Button'
    },
    lightCurtainSensor: {
        id: 'operationPause.sensor.lightCurtain',
        description: 'Text for light_curtain sensor',
        defaultMessage: 'Light Curtain'
    }
})

class OperationPause extends React.Component{
  removeThisModal() {
      this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token||!nextProps.system_emergency||nextProps.system_data !== this.props.system_data)
    {
      this.removeThisModal();
    }
  }
 
  render()
  {
      var sensor,sensorProp = this.props.sensor;

      if(sensorProp === 'latch_gate'){
       sensor = this.props.intl.formatMessage(messages.latchGateSensor)
      }
      else if(sensorProp === 'button_press'){
        sensor =  this.props.intl.formatMessage(messages.buttonSensor)
      }
      else if(sensorProp === 'light_curtain'){
        sensor =  this.props.intl.formatMessage(messages.lightCurtainSensor)
      }
      else{
        sensor='';
      }
      return (
        <div className='gor-emergency-overlay'>
          <div className='gor-delete gor-modal-content gor-operation-stop'>
            <span className="close" onClick={this.removeThisModal.bind(this)}>x</span>
              <div className='gor-delete-text'>  
                <div className='gor-alert-lg'></div>
                  <div className='gor-delete-line'>
                    <div className='gor-delete-query gor-error-lg'>{this.props.emergencyPress?(<FormattedMessage id='operation.alert.pause' 
                    defaultMessage="Butler System - Operation Paused"
                            description="Text for operation stopped heading"/>):""}
                    </div>
                  </div>
                  <div className='gor-margin-top'>
                    <div className='gor-error-md'>
                    {this.props.poeEnabled && this.props.breached && (<FormattedMessage id='operation.alert.pause.breach.text' 
                    defaultMessage="Emergency-Pause activated due to SOP breach at {sensor} {controller} in {zone}."
                            description="Text for emergency button press"
                            values={{
                              controller:this.props.controller,
                              zone:this.props.zone,
                              sensor:this.props.sensor
                            }}/>)}
                    {this.props.poeEnabled && !this.props.breached && (<FormattedMessage id='operation.alert.pause.text' 
                    defaultMessage="Emergency-Pause activated via Controller {controller} in {zone}."
                            description="Text for emergency button press"
                            values={{
                              controller:this.props.controller,
                              zone:this.props.zone
                            }}/>)}
                    {!this.props.poeEnabled && (<FormattedMessage id='operation.alert.pause.nonPOE' 
                    defaultMessage="Operation Paused"
                            description="Text for operation stopped heading"/>)}
                    </div>
                      <span className='gor-text-sm'>
                        <FormattedMessage id='operation.alert.pause.subtext' 
                          defaultMessage='You must check the emergency situation and release the Emergency Pause button in order to resume the operation in warehouse'
                            description="Subtext for pause alert"/>
                      </span>
                    </div>           
                </div>
            </div>
        </div>
      );
    }
  };
 function mapStateToProps(state, ownProps){
  return  {
      auth_token:state.authLogin.auth_token,
      system_emergency:state.tabsData.system_emergency||false,
      system_data:state.tabsData.system_data||null  
    }
} 

OperationPause.propTypes={
      auth_token:React.PropTypes.string,
      emergencyPress:React.PropTypes.bool,
      system_emergency:React.PropTypes.bool,
      system_data:React.PropTypes.string
}


export default connect(mapStateToProps,null)(injectIntl(OperationPause));