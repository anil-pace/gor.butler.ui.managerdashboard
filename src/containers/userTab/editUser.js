import React from 'react';
import { FormattedMessage } from 'react-intl';
import { userRequest } from '../../actions/userActions';
import {
  validateName,
  validatePassword,
  resetForm
} from '../../actions/validationActions';
import { connect } from 'react-redux';
import {
  ERROR,
  GET_ROLES,
  EDIT_USER,
  SUCCESS,
  GET,
  APP_JSON,
  PUT
} from '../../constants/frontEndConstants';
import { BUTLER_SUPERVISOR } from '../../constants/backEndConstants';
import { ROLE_URL, HEADER_URL } from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import UserRoles from './userRoles';
import { nameStatus, passwordStatus } from '../../utilities/fieldCheck';
import { getFormattedMessages } from '../../utilities/getFormattedMessages';
import { notifyfeedback, notifyFail } from './../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { EDIT_USER_MUTATION } from './queries/userTabQueries';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pwdView: false };
  }

  removeThisModal() {
    this.props.resetForm();
    this.props.removeModal();
  }

  _checkName() {
    let firstname = this.firstName.value,
      lastname = this.lastName.value,
      nameInfo;
    nameInfo = nameStatus(firstname, lastname);
    this.props.validateName(nameInfo);
    return nameInfo.type;
  }

  _handleAnchorClick() {
    this.setState({ pwdView: true });
  }

  _checkPwd() {
    let pswd = this.pswd.value,
      confirmPswd = this.confirmPswd.value,
      givenRole,
      passwordInfo,
      roleSelected;
    givenRole = this.props.roleName;
    roleSelected = this.props.roleSet ? this.props.roleSet : givenRole;

    let len = givenRole.length;

    for (let i = 0; i < len; i++) {
      if (roleSelected.indexOf(givenRole[i]) > -1) {
        this.setState({ pwdView: true });
      }
    }
    passwordInfo = passwordStatus(pswd, confirmPswd, roleSelected);
    this.props.validatePassword(passwordInfo);
    return passwordInfo.type;
  }

  _getId(roleArr) {
    if (roleArr.length) {
      let roles = this.props.roleList,
        roleIdArr = [],
        roleArrLen,
        len;
      len = roles.length;
      roleArrLen = roleArr.length;
      for (let j = 0; j < roleArrLen; j++) {
        for (let i = 0; i < len; i++) {
          if (roles[i].name == roleArr[j]) {
            roleIdArr.push({ id: roles[i].id });
          }
        }
      }
      return roleIdArr;
    } else {
      return null;
    }
  }

  _handleEditUser(e) {
    e.preventDefault();
    let pswd, confirmPswd, role, firstname, lastname, givenRole, email;

    firstname = this.firstName.value;
    lastname = this.lastName.value;
    pswd = this.pswd.value;
    confirmPswd = this.confirmPswd.value;
    email = this.props.userName + '@gor.com';

    if (!this.props.nameCheck.type) {
      if (!this._checkName()) return;
    }
    givenRole = this._getId(this.props.roleName);

    role = this.props.roleSet ? this._getId(this.props.roleSet) : givenRole;

    if (
      !pswd &&
      !confirmPswd &&
      (role === givenRole || this.props.roleSet !== BUTLER_SUPERVISOR)
    ) {
      pswd = '__unchanged__';
      confirmPswd = '__unchanged__';
    } else if (!this._checkPwd()) {
      return;
    }
    let graphql_data = {
      id: this.props.id,
      firstname: firstname,
      lastname: lastname,
      password: pswd,
      username: this.props.userName,
      email: email,
      password_confirm: confirmPswd,
      authorities: role
    };
    let editurl = HEADER_URL + '/' + this.props.id;
    this.props.editUser(graphql_data);
    // this.props.userRequest(userData);
    this.removeThisModal();
  }

  render() {
    let tick = <div className='gor-tick' />;
    return (
      <div>
        <div className='gor-modal-content'>
          <div className='gor-modal-head'>
            <div className='gor-usr-add'>
              <FormattedMessage
                id='users.edit.heading'
                description='Heading for Edit user'
                defaultMessage='Edit user'
              />
              <div className='gor-sub-head'>
                <FormattedMessage
                  id='users.edit.subheading'
                  description='Subheading for Edit user'
                  defaultMessage='All the fields are mandatory'
                />
              </div>
            </div>
            <span className='close' onClick={this.removeThisModal.bind(this)}>
              ×
            </span>
          </div>
          <div className='gor-modal-body'>
            <form
              action='#'
              id='editUserForm'
              ref={node => {
                this.editUserForm = node;
              }}
              onSubmit={e => this._handleEditUser(e)}
            >
              <div className='gor-usr-form'>
                <div className='gor-usr-details'>
                  <div className='gor-usr-hdlg'>
                    <FormattedMessage
                      id='users.edit.userdetails.heading'
                      description='Text for user details heading'
                      defaultMessage='Enter User details'
                    />
                  </div>
                  <div className='gor-sub-head'>
                    <FormattedMessage
                      id='users.edit.userdetails.subheading'
                      description='Text for user details subheading'
                      defaultMessage='A User ID will be required to log into the system'
                    />
                  </div>

                  <div className='gor-usr-hdsm'>
                    <FormattedMessage
                      id='users.edit.userdetails.userid'
                      description='Text for user id'
                      defaultMessage='User ID'
                    />
                  </div>
                  <input
                    className='gor-usr-fdlg'
                    type='text'
                    placeholder={this.props.userName}
                    id='userid'
                    ref={node => {
                      this.userId = node;
                    }}
                    disabled
                  />
                  <p />
                  <div className='gor-usr-field'>
                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.edit.userdetails.firstname'
                        description='Text for first name'
                        defaultMessage='First Name'
                      />
                    </div>
                    <input
                      className={
                        'gor-usr-fdsm' +
                        (this.props.nameCheck.type === ERROR
                          ? ' gor-input-error'
                          : ' gor-input-ok')
                      }
                      onBlur={
                        this.props.nameCheck.type === ERROR ||
                        this.props.nameCheck.type === SUCCESS
                          ? this._checkName.bind(this)
                          : ''
                      }
                      type='text'
                      defaultValue={this.props.first}
                      id='firstname'
                      ref={node => {
                        this.firstName = node;
                      }}
                    />
                  </div>
                  <div className='gor-usr-field'>
                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.edit.userdetails.lastname'
                        description='Text for last name'
                        defaultMessage='Last Name'
                      />
                    </div>
                    <input
                      className={
                        'gor-usr-fdsm' +
                        (this.props.nameCheck.type === ERROR
                          ? ' gor-input-error'
                          : ' gor-input-ok')
                      }
                      onBlur={this._checkName.bind(this)}
                      type='text'
                      defaultValue={this.props.last}
                      id='lastname'
                      ref={node => {
                        this.lastName = node;
                      }}
                    />
                  </div>
                  {this.props.nameCheck.type ? (
                    tick
                  ) : this.props.nameCheck.type === ERROR ? (
                    <FieldError txt={this.props.nameCheck.msg} />
                  ) : (
                    ''
                  )}
                </div>

                {this.props.roleList.length ? (
                  <UserRoles
                    roleList={this.props.roleList}
                    roleName={this.props.roleName}
                  />
                ) : (
                  ''
                )}

                <div className='gor-usr-details'>
                  <div
                    style={
                      this.state.pwdView
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    <div className='gor-usr-hdlg'>
                      <FormattedMessage
                        id='users.edit.changepassword.heading'
                        description='Heading for Change password'
                        defaultMessage='Change password'
                      />
                    </div>
                    <div className='gor-sub-head'>
                      <FormattedMessage
                        id='users.edit.changepassword.subheading'
                        description='Subheading for create password'
                        defaultMessage='New password will be effective when user log-in next time'
                      />
                    </div>

                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.edit.password.field1'
                        description='Text for password'
                        defaultMessage='Password'
                      />
                    </div>
                    <input
                      className={
                        'gor-usr-fdlg' +
                        (this.props.passwordCheck.type === ERROR
                          ? ' gor-input-error'
                          : ' gor-input-ok')
                      }
                      type='password'
                      id='pswd'
                      onBlur={
                        this.props.passwordCheck.type === ERROR ||
                        this.props.passwordCheck.type === SUCCESS
                          ? this._checkPwd.bind(this)
                          : ''
                      }
                      ref={node => {
                        this.pswd = node;
                      }}
                    />
                    {this.props.passwordCheck.type ? tick : ''}

                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.edit.password.field2'
                        description='Text for confirm password'
                        defaultMessage='Confirm Password'
                      />
                    </div>
                    <input
                      className={
                        'gor-usr-fdlg' +
                        (this.props.passwordCheck.type === ERROR
                          ? ' gor-input-error'
                          : ' gor-input-ok')
                      }
                      type='password'
                      id='confirmPswd'
                      onChange={this._checkPwd.bind(this)}
                      ref={node => {
                        this.confirmPswd = node;
                      }}
                    />
                    {this.props.passwordCheck.type ? (
                      tick
                    ) : this.props.passwordCheck.type === ERROR ? (
                      <FieldError txt={this.props.passwordCheck.msg} />
                    ) : (
                      ''
                    )}
                  </div>

                  <div
                    style={
                      this.state.pwdView
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                  >
                    <div className='gor-usr-hdlg'>
                      <FormattedMessage
                        id='users.edit.password.'
                        description='Heading for Password'
                        defaultMessage='New Password'
                      />
                    </div>

                    <a
                      href='javascript:void(0)'
                      onClick={e => this._handleAnchorClick(e)}
                    >
                      <FormattedMessage
                        id='users.edit.password.query'
                        description='Text for change password'
                        defaultMessage='Change Password'
                      />
                    </a>
                  </div>
                </div>

                <p className='gor-submit'>
                  <button type='submit' className='gor-add-btn'>
                    <FormattedMessage
                      id='users.edit.password.button'
                      description='Text for edit user button'
                      defaultMessage='Save'
                    />
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    nameCheck: state.appInfo.nameInfo || {},
    passwordCheck: state.appInfo.passwordInfo || {},
    roleSet: state.appInfo.roleSet || null
  };
}

var mapDispatchToProps = function(dispatch) {
  return {
    userRequest: function(data) {
      dispatch(userRequest(data));
    },
    validateName: function(data) {
      dispatch(validateName(data));
    },
    validatePassword: function(data) {
      dispatch(validatePassword(data));
    },
    resetForm: function() {
      dispatch(resetForm());
    },
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data));
    },
    setNotification: function(data) {
      dispatch(setNotification(data));
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data));
    }
  };
};
const withMutations = graphql(EDIT_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    editUser: ({
      firstname,
      lastname,
      username,
      authorities,
      password,
      email,
      id
    }) =>
      mutate({
        variables: {
          input: {
            firstname,
            lastname,
            username,
            authorities,
            password,
            email,
            id
          }
        },
        update: (proxy, { data: { editUser } }) => {
          let msg = {};
          if (editUser.firstname && editUser.lastname) {
            msg = getFormattedMessages('EDITEDUSER', editUser);
            ownProps.notifyfeedback(msg);
          } else {
            msg = getFormattedMessages('EDITEDUSERFAIL', editUser);
            ownProps.setNotification(msg);
          }
        }
      })
  })
});

const ROLE_LIST_QUERY = gql`
  query RoleList($input: RoleListParams) {
    RoleList(input: $input) {
      list {
        id
        name
        internal
      }
    }
  }
`;
const withRoleList = graphql(ROLE_LIST_QUERY, {
  props: data => ({
    roleList: (data.data && data.data.RoleList && data.data.RoleList.list) || []
  }),
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: 'network-only'
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withRoleList,
    withMutations
  )(EditUser)
);
