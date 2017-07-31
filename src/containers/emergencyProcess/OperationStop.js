import React  from 'react';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';        

class OperationStop extends React.Component{
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
      return (
        <div className='gor-emergency-overlay'>
          <div className='gor-delete gor-modal-content gor-operation-stop'>
            <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
              <div className='gor-delete-text'>  
                <div className='gor-alert-lg'></div>
                  <div className='gor-delete-line'>
                    <div className='gor-delete-query gor-error-lg'>{this.props.emergencyPress?(<FormattedMessage id='operation.alert.stop' 
                    defaultMessage="Butler System - Operation Stopped"
                            description="Text for operation stopped heading"/>):""}
                    </div>
                  </div>
                  <div className='gor-margin-top'>
                    <div className='gor-error-md'>
                    {this.props.poeEnabled?(<FormattedMessage id='operation.alert.stop.text' 
                    defaultMessage="Emergency-Stop activated via Conroller {controller} in {zone}."
                            description="Text for emergency button press"
                            values={{
                              controller:this.props.controller,
                              zone:this.props.zone
                            }}/>):(<FormattedMessage id='operation.alert.stop.nonPOE' 
                    defaultMessage="Operation Stopped"
                            description="Text for operation stopped heading"/>)}
                    </div>
                      <span className='gor-text-sm'>
                        <FormattedMessage id='operation.alert.stop.subtext' 
                          defaultMessage='You must check the emergency situation and release the Emergency Stop button in order to resume the operation in warehouse'
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

OperationStop.propTypes={
      auth_token:React.PropTypes.string, 
      userRequest:React.PropTypes.func,
      emergencyPress:React.PropTypes.bool,
      system_emergency:React.PropTypes.bool,
      system_data:React.PropTypes.string
}


export default connect(mapStateToProps,null)(OperationStop);
