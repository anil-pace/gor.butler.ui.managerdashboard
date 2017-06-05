import React  from 'react';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import {DELETE_USER,APP_JSON,DELETE} from '../../constants/frontEndConstants';
import {HEADER_URL} from '../../constants/configConstants';
import { FormattedMessage } from 'react-intl';        

class DeleteUser extends React.Component{
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
        <div>
          <div className='gor-delete gor-modal-content'>
            <div className='gor-delete-text'>
              <div className='gor-question'></div>
              <div className='gor-delete-line'>
               <div className='gor-delete-query'><FormattedMessage id="users.delete.heading" description='Text for user delete heading' 
            defaultMessage='Are you sure you would like to delete "{user_name}" ?' values={{user_name:(this.props.name?this.props.name:'')}}/>
                         <div className='gor-sub-head'><FormattedMessage id="users.delete.subheading" description='Text for user delete subheading' 
            defaultMessage='Information related to the user will be lost'/></div></div>
              </div>
           </div>
              <div className='gor-delete-bottom'>
                <button className='gor-cancel-btn' onClick={this.removeThisModal.bind(this)}><FormattedMessage id="users.delete.cancel" description='Text for Cancel button' 
            defaultMessage='Cancel'/></button>
                <button className='gor-delete-btn' onClick={this.userDelete.bind(this)}><FormattedMessage id="users.delete.confirm" description='Text for Delete button' 
            defaultMessage='Delete'/></button>
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

export default connect(mapStateToProps,mapDispatchToProps)(DeleteUser);
