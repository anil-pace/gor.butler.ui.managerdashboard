import React  from 'react';
import {FormattedMessage} from 'react-intl';
import {userRequest} from '../../actions/userActions';
import {validateName, validatePassword, resetForm} from '../../actions/validationActions';
import {connect} from 'react-redux';
import {ERROR, GET_ROLES, EDIT_USER, SUCCESS, GET, APP_JSON, PUT} from '../../constants/frontEndConstants';
import {BUTLER_SUPERVISOR} from '../../constants/backEndConstants';
import {ROLE_URL, HEADER_URL} from '../../constants/configConstants';
import FieldError from '../../components/fielderror/fielderror';
import UserRoles from './userRoles';
import {nameStatus, passwordStatus} from '../../utilities/fieldCheck';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={pwdView: false}
    }

    componentDidMount() {
        let userData={
            'url': ROLE_URL,
            'method': GET,
            'cause': GET_ROLES,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        if (!this.props.roleList) {
            this.props.userRequest(userData);
        }


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

    _checkName() {
        let firstname=this.firstName.value, lastname=this.lastName.value, nameInfo;
        nameInfo=nameStatus(firstname, lastname);
        this.props.validateName(nameInfo);
        return nameInfo.type;
    }

    _handleAnchorClick() {
        this.setState({pwdView: true});
    }

    _checkPwd() {
        let pswd=this.pswd.value, confirmPswd=this.confirmPswd.value, givenRole, passwordInfo, roleSelected;
        givenRole=this.props.roleName;
        roleSelected=this.props.roleSet ? this.props.roleSet : givenRole;
        if (roleSelected!==givenRole) {
            this.setState({pwdView: true});
        }
        passwordInfo=passwordStatus(pswd, confirmPswd, roleSelected);
        this.props.validatePassword(passwordInfo);
        return passwordInfo.type;
    }

    _getId(role) {
        let roles=this.props.roleList, len;
        len=roles.length;
        for (let i=0; i < len; i++) {
            if (roles[i].name=== role) {
                return roles[i].id;
            }
        }
        return null;
    }

    _handleEditUser(e) {
        e.preventDefault();
        let pswd, confirmPswd, role, firstname, lastname, givenRole;

        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pswd=this.pswd.value;
        confirmPswd=this.confirmPswd.value;

        if (!this.props.nameCheck.type) {
            if (!this._checkName())
                return;
        }
        givenRole=this._getId(this.props.roleName);

        role=this.props.roleSet ? this._getId(this.props.roleSet) : givenRole;

        if (!pswd && !confirmPswd && (role=== givenRole || this.props.roleSet !== BUTLER_SUPERVISOR)) {
            pswd="__unchanged__";
            confirmPswd="__unchanged__";
        }
        else if (!this._checkPwd()) {
            return;
        }
        let formdata={
            "first_name": firstname,
            "last_name": lastname,
            "role_id": role,
            "password": pswd,
            "password_confirm": confirmPswd

        };
        let editurl=HEADER_URL + '/' + this.props.id;
        let userData={
            'url': editurl,
            'formdata': formdata,
            'method': PUT,
            'cause': EDIT_USER,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.userRequest(userData);
        this.removeThisModal();
    }

    render() {
        let tick=(<div className='gor-tick'/>);
        return (
            <div>
                <div className="gor-modal-content">
                    <div className='gor-modal-head'>
                        <div className='gor-usr-add'><FormattedMessage id="users.edit.heading"
                                                                       description='Heading for Edit user'
                                                                       defaultMessage='Edit user'/>
                            <div className='gor-sub-head'><FormattedMessage id="users.edit.subheading"
                                                                            description='Subheading for Edit user'
                                                                            defaultMessage='All the fields are mandatory'/>
                            </div>
                        </div>
                        <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
                    </div>
                    <div className='gor-modal-body'>
                        <form action="#" id="editUserForm" ref={node=> {
                            this.editUserForm=node
                        }}
                              onSubmit={(e)=> this._handleEditUser(e)}>

                            <div className='gor-usr-form'>
                                <div className='gor-usr-details'>
                                    <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.userdetails.heading"
                                                                                    description='Text for user details heading'
                                                                                    defaultMessage='Enter User details'/>
                                    </div>
                                    <div className='gor-sub-head'><FormattedMessage
                                        id="users.edit.userdetails.subheading"
                                        description='Text for user details subheading'
                                        defaultMessage='A User ID will be required to log into the system'/></div>

                                    <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.userdetails.userid"
                                                                                    description='Text for user id'
                                                                                    defaultMessage='User ID'/></div>
                                    <input className='gor-usr-fdlg' type="text" placeholder={this.props.userName}
                                           id="userid" ref={node=> {
                                        this.userId=node
                                    }} disabled/>
                                    <p></p>
                                    <div className='gor-usr-field'>
                                        <div className='gor-usr-hdsm'><FormattedMessage
                                            id="users.edit.userdetails.firstname" description='Text for first name'
                                            defaultMessage='First Name'/></div>
                                        <input
                                            className={"gor-usr-fdsm" + (this.props.nameCheck.type=== ERROR ? ' gor-input-error' : ' gor-input-ok')}
                                            onBlur={(this.props.nameCheck.type=== ERROR || this.props.nameCheck.type=== SUCCESS) ? this._checkName.bind(this) : ''}
                                            type="text" defaultValue={this.props.first} id="firstname" ref={node=> {
                                            this.firstName=node
                                        }}/>
                                    </div>
                                    <div className='gor-usr-field'>
                                        <div className='gor-usr-hdsm'><FormattedMessage
                                            id="users.edit.userdetails.lastname" description='Text for last name'
                                            defaultMessage='Last Name'/></div>
                                        <input
                                            className={"gor-usr-fdsm" + (this.props.nameCheck.type=== ERROR ? ' gor-input-error' : ' gor-input-ok')}
                                            onBlur={this._checkName.bind(this)} type="text"
                                            defaultValue={this.props.last} id="lastname" ref={node=> {
                                            this.lastName=node
                                        }}/>
                                    </div>
                                    {this.props.nameCheck.type ? tick : ((this.props.nameCheck.type=== ERROR) ?
                                        <FieldError txt={this.props.nameCheck.msg}/> : '')}

                                </div>

                                {this.props.roleList.length ? (
                                    <UserRoles roleList={this.props.roleList} roleName={this.props.roleName}/>) : ''}

                                <div className='gor-usr-details'>

                                    <div style={this.state.pwdView ? {display: 'block'} : {display: 'none'}}>
                                        <div className='gor-usr-hdlg'><FormattedMessage
                                            id="users.edit.changepassword.heading"
                                            description='Heading for Change password'
                                            defaultMessage='Change password'/></div>
                                        <div className='gor-sub-head'><FormattedMessage
                                            id="users.edit.changepassword.subheading"
                                            description='Subheading for create password'
                                            defaultMessage='New password will be effective when user log-in next time'/>
                                        </div>

                                        <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.password.field1"
                                                                                        description='Text for password'
                                                                                        defaultMessage='Password'/>
                                        </div>
                                        <input
                                            className={"gor-usr-fdlg" + (this.props.passwordCheck.type=== ERROR ? ' gor-input-error' : ' gor-input-ok')}
                                            type="password" id="pswd"
                                            onBlur={(this.props.passwordCheck.type=== ERROR || this.props.passwordCheck.type=== SUCCESS) ? this._checkPwd.bind(this) : ''}
                                            ref={node=> {
                                                this.pswd=node
                                            }}/>
                                        {this.props.passwordCheck.type ? tick : ''}

                                        <div className='gor-usr-hdsm'><FormattedMessage id="users.edit.password.field2"
                                                                                        description='Text for confirm password'
                                                                                        defaultMessage='Confirm Password'/>
                                        </div>
                                        <input
                                            className={"gor-usr-fdlg" + (this.props.passwordCheck.type=== ERROR ? ' gor-input-error' : ' gor-input-ok')}
                                            type="password" id="confirmPswd" onChange={this._checkPwd.bind(this)}
                                            ref={node=> {
                                                this.confirmPswd=node
                                            }}/>
                                        {this.props.passwordCheck.type ? tick : ((this.props.passwordCheck.type=== ERROR) ?
                                            <FieldError txt={this.props.passwordCheck.msg}/> : '')}
                                    </div>

                                    <div style={this.state.pwdView ? {display: 'none'} : {display: 'block'}}>
                                        <div className='gor-usr-hdlg'><FormattedMessage id="users.edit.password."
                                                                                        description='Heading for Password'
                                                                                        defaultMessage='New Password'/>
                                        </div>

                                        <a href="javascript:void(0)"
                                           onClick={(e)=> this._handleAnchorClick(e)}><FormattedMessage
                                            id="users.edit.password.query" description='Text for change password'
                                            defaultMessage='Change Password'/></a>
                                    </div>
                                </div>

                                <p className='gor-submit'>
                                    <button type="submit" className="gor-add-btn"><FormattedMessage
                                        id="users.edit.password.button" description='Text for edit user button'
                                        defaultMessage='Save'/></button>
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
        roleList: state.appInfo.roleList || [],
        roleSet: state.appInfo.roleSet || null,
        auth_token: state.authLogin.auth_token
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        userRequest: function (data) {
            dispatch(userRequest(data));
        },
        validateName: function (data) {
            dispatch(validateName(data));
        },
        validatePassword: function (data) {
            dispatch(validatePassword(data));
        },
        resetForm: function () {
            dispatch(resetForm());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);