import React  from 'react';
import { connect } from 'react-redux' ;
import {userRequest} from '../../actions/userActions';
import {DELETE_USER,APP_JSON,DELETE} from '../../constants/frontEndConstants';
import {HEADER_URL} from '../../constants/configConstants';
import { FormattedMessage } from 'react-intl';  
import {notifyfeedback} from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import {graphql, compose} from "react-apollo";
import gql from 'graphql-tag'
import { getFormattedMessages } from '../../utilities/getFormattedMessages';
import {DELETE_USER_MUTATION} from './queries/userTabQueries';

const withMutations = graphql(DELETE_USER_MUTATION, {
  props: ({ownProps, mutate}) => ({
      deleteUser: ({id}) =>
          mutate({
              variables: {id:id},
              update: (proxy, {data: {deleteUser}}) => {
                let msg={};
                  if (deleteUser.code === 'us002') {
                    msg=getFormattedMessages("DELETEDUSER");
                      ownProps.notifyfeedback(msg);
                  } else {
                    msg = getFormattedMessages("DELETEDUSERFAIL");
                    ownProps.setNotification(msg);
                  }
              }
          }),


  }),
});
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
    let graphql_data={
      id:this.props.id,
    }
    this.props.deleteUser(graphql_data)
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
      userRequest: function(data){ dispatch(userRequest(data)); },
      notifyfeedback: function (data) {
        dispatch(notifyfeedback(data));
    }
    ,
    setNotification: function (data) {
        dispatch(setNotification(data));
    }
    }
};



export default (connect(mapStateToProps,mapDispatchToProps)(compose(
  withMutations
)(DeleteUser)));
