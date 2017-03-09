import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import {DELETE_USER,APP_JSON,DELETE} from '../../constants/frontEndConstants';
import {HEADER_URL} from '../../constants/configConstants';
import { FormattedMessage,FormattedPlural } from 'react-intl';        

class OperationStop extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  removeThisModal() {
      this.props.removeModal();
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.auth_token)
    {
      this.removeThisModal();
    }
  }
  userDelete() {
    let delurl=HEADER_URL+'/'+(this.props.id?this.props.id:'');
    let userData={
                'url':delurl,
                'method':DELETE,
                'cause':DELETE_USER,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':this.props.auth_token
    }
    this.props.userRequest(userData);
    this.props.removeModal();
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
                    <div className='gor-delete-query gor-error-lg'>{this.props.emergencyPress?'Operation Stopped':'Operation Paused'}
                    </div>
                  </div>
                  <div className='gor-margin-top'>
                    <div className='gor-error-md'>
                    {this.props.emergencyPress?'Emergency Stop button has been pressed.':
                    'Butler operation has been paused from the management dashboard'}
                    </div>
                      <span className='gor-text-sm'>
                      {this.props.emergencyPress?'To resume butler operation in the warehouse, you will be required to go through a safety checklist':
                      'You must check the emergency situation and release the Emergency Stop button in order to resume the operation in warehouse'}
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
      auth_token:state.authLogin.auth_token
    }
} 
function mapDispatchToProps(dispatch){
    return {
      userRequest: function(data){ dispatch(userRequest(data)); }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(OperationStop);
