import React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import {
  validateID,
  validateName,
  validatePassword,
  resetForm
} from '../../actions/validationActions';
import { userRequest } from '../../actions/userActions';
import {
  ADD_USER,
  CHECK_ID,
  ERROR,
  SUCCESS,
  INFO,
  GET_ROLES,
  GET,
  APP_JSON,
  POST
} from '../../constants/frontEndConstants';
import {
  BUTLER_SUPERVISOR,
  BUTLER_UI,
  pwdDesc
} from '../../constants/backEndConstants';
import {
  ROLE_URL,
  CHECK_USER,
  HEADER_URL
} from '../../constants/configConstants';
import {
  INVALID_ID,
  INVALID_FORMAT,
  TYPE_SUCCESS,
  MG_PWD,
  OP_PWD
} from '../../constants/messageConstants';
import { connect } from 'react-redux';
import FieldError from '../../components/fielderror/fielderror';
import UserRoles from './userRoles';
import {
  nameStatus,
  passwordStatus,
  idStatus
} from '../../utilities/fieldCheck';
import { notifyfeedback } from './../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { getFormattedMessages } from '../../utilities/getFormattedMessages';
import {
  CREATE_USER_MUTATION,
  ROLE_LIST_QUERY
} from './queries/userTabQueries';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
  }

  removeThisModal() {
    this.props.resetForm();
    this.props.removeModal();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth_token) {
      this.removeThisModal();
    }
  }

  _checkId() {
    let userid = this.userId.value,
      idInfo;
    idInfo = idStatus(userid, this.props.existingUserIds);
    this.props.validateID(idInfo);
  }

  _checkName() {
    let firstname = this.firstName.value,
      lastname = this.lastName.value,
      nameInfo;
    nameInfo = nameStatus(firstname, lastname);
    this.props.validateName(nameInfo);
    return nameInfo.type;
  }

  _checkPwd() {
    let pswd = this.pswd.value,
      confirmPswd = this.confirmPswd.value,
      passwordInfo,
      roleSelected = this.props.roleSet;
    passwordInfo = passwordStatus(pswd, confirmPswd, roleSelected);
    this.props.validatePassword(passwordInfo);
    return passwordInfo.type;
  }

  _handleAddUser(e) {
    e.preventDefault();
    let pswd, confirmPswd, role, opt, userid, firstname, lastname, email;

    userid = this.userId.value;
    firstname = this.firstName.value;
    lastname = this.lastName.value;
    pswd = this.pswd.value;
    confirmPswd = this.confirmPswd.value;

    email = userid + '@gor.com'; //as discussed appending @gor.com to the userID

    if (!this.props.idCheck.type) {
      this._checkId();
      return;
    }
    if (!this.props.nameCheck.type) {
      if (!this._checkName()) return;
    }
    if (!this._checkPwd()) return;

    role = this.props.roleSet
      ? this._getId(this.props.roleSet)
      : this._getId([BUTLER_UI]);

    let formdata = {
      username: userid,
      password: pswd,
      email: email,
      firstname: firstname,
      lastname: lastname,
      authorities: role
    };
    this.props.createUser(formdata);
    this.removeThisModal();
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
      return;
    }
  }

  render() {
    let tick = <div className='gor-tick' />;
    return (
      <div>
        <div className='gor-modal-content'>
          <div className='gor-modal-head'>
            <div className='gor-usr-add'>
              <FormattedMessage
                id='users.add.heading'
                description='Heading for Add new user'
                defaultMessage='Add new user'
              />
              <div className='gor-sub-head'>
                <FormattedMessage
                  id='users.add.subheading'
                  description='Subheading for add new user'
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
              id='addUserForm'
              ref={node => {
                this.addUserForm = node;
              }}
              onSubmit={e => this._handleAddUser(e)}
            >
              <div className='gor-usr-form'>
                <div className='gor-usr-details'>
                  <div className='gor-usr-hdlg'>
                    <FormattedMessage
                      id='users.add.userdetails.heading'
                      description='Text for user details heading'
                      defaultMessage='Enter User details'
                    />
                  </div>
                  <div className='gor-sub-head'>
                    <FormattedMessage
                      id='users.add.userdetails.subheading'
                      description='Text for user details subheading'
                      defaultMessage='A User ID will be required to log into the system'
                    />
                  </div>

                  <div className='gor-usr-hdsm'>
                    <FormattedMessage
                      id='users.add.userdetails.userid'
                      description='Text for user id'
                      defaultMessage='User ID'
                    />
                  </div>
                  <input
                    className={
                      'gor-usr-fdlg' +
                      (this.props.idCheck.type === ERROR
                        ? ' gor-input-error'
                        : ' gor-input-ok')
                    }
                    type='text'
                    onBlur={this._checkId.bind(this)}
                    id='userid'
                    ref={node => {
                      this.userId = node;
                    }}
                  />
                  {this.props.idCheck.type ? (
                    tick
                  ) : this.props.idCheck.type === ERROR ? (
                    <FieldError txt={this.props.idCheck.msg} />
                  ) : (
                    ''
                  )}

                  <div className='gor-usr-field'>
                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.add.userdetails.firstname'
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
                      id='firstname'
                      ref={node => {
                        this.firstName = node;
                      }}
                    />
                  </div>
                  <div className='gor-usr-field'>
                    <div className='gor-usr-hdsm'>
                      <FormattedMessage
                        id='users.add.userdetails.lastname'
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
                  <UserRoles roleList={this.props.roleList} />
                ) : (
                  ''
                )}

                <div className='gor-usr-details'>
                  <div className='gor-usr-hdlg'>
                    <FormattedMessage
                      id='users.add.password.heading'
                      description='Heading for create password'
                      defaultMessage='Create password'
                    />
                  </div>
                  <div className='gor-sub-head'>
                    {pwdDesc.hasOwnProperty(this.props.roleSet)
                      ? this.context.intl.formatMessage(
                          pwdDesc[this.props.roleSet]
                        )
                      : this.context.intl.formatMessage(pwdDesc[BUTLER_UI])}
                  </div>

                  <div className='gor-usr-hdsm'>
                    <FormattedMessage
                      id='users.add.password.field1'
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
                      id='users.add.password.field2'
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
                  {this.props.passwordCheck.type === SUCCESS ? (
                    tick
                  ) : this.props.passwordCheck.type === ERROR ? (
                    <FieldError txt={this.props.passwordCheck.msg} />
                  ) : (
                    ''
                  )}
                </div>
                <p className='gor-submit'>
                  <button type='submit' className='gor-add-btn'>
                    <FormattedMessage
                      id='users.add.password.button'
                      description='Text for add new user button'
                      defaultMessage='Add new user'
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
AddUser.contextTypes = {
  intl: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    idCheck: state.appInfo.idInfo || {},
    nameCheck: state.appInfo.nameInfo || {},
    passwordCheck: state.appInfo.passwordInfo || {},
    roleSet: state.appInfo.roleSet || null,
    auth_token: state.authLogin.auth_token
  };
}

var mapDispatchToProps = function(dispatch) {
  return {
    userRequest: function(data) {
      dispatch(userRequest(data));
    },
    validateID: function(data) {
      dispatch(validateID(data));
    },
    validateName: function(data) {
      dispatch(validateName(data));
    },
    validatePassword: function(data) {
      dispatch(validatePassword(data));
    },
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data));
    },
    setNotification: function(data) {
      dispatch(setNotification(data));
    },
    resetForm: function() {
      dispatch(resetForm());
    }
  };
};
const withMutations = graphql(CREATE_USER_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createUser: ({
      firstname,
      lastname,
      username,
      authorities,
      email,
      password
    }) =>
      mutate({
        variables: {
          input: {
            firstname,
            lastname,
            username,
            authorities,
            password,
            email
          }
        },
        update: (proxy, { data: { createUser } }) => {
          let msg = {};
          if (createUser.username) {
            msg = getFormattedMessages('NEWUSER', createUser.username);
            ownProps.notifyfeedback(msg);
          } else {
            msg = getFormattedMessages('NEWUSERFAIL', createUser.username);
            ownProps.setNotification(msg);
          }
        }
      })
  })
});

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
  )(AddUser)
);
