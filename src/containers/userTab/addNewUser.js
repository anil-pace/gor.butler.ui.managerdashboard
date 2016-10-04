import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage,FormattedPlural } from 'react-intl';        
class AddUser extends React.Component{
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
          <div className="gor-modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'><FormattedMessage id="users.add.heading" description='Heading for Add new user' 
            defaultMessage='Add new user'/>
                          <div className='gor-sub-head'><FormattedMessage id="users.add.subheading" description='Subheading for add new user' 
            defaultMessage='All the fields are mandatory'/></div>
              </div>
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.userdetails.heading" description='Text for user details heading' 
            defaultMessage='Enter User details'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.add.userdetails.subheading" description='Text for user details subheading' 
            defaultMessage='A User ID will be required to log into the system'/></div>
            
             <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.userid" description='Text for user id' 
            defaultMessage='User ID'/></div>
              <input className='gor-usr-fdlg' type="text" placeholder="User Id" id="userid"  ref={node => { this.userId = node }}/><div className='gor-id-val iTick' />
                <div className='gor-add-id-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Invalid user ID, please try again</div>

              <div className='gor-usr-field'>
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.firstname" description='Text for first name' 
            defaultMessage='First Name'/></div>
                <input className='gor-usr-fdsm' type="text" placeholder="First Name" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'><FormattedMessage id="users.add.userdetails.lastname" description='Text for last name' 
            defaultMessage='Last Name'/></div>
                <input className='gor-usr-fdsm' type="text" placeholder="Last Name" id="lastname"  ref={node => { this.lastName = node }}/>
              </div><div className='gor-name-val iTick' />
            </div>
                <div className='gor-add-name-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Please enter user name</div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
            defaultMessage='Choose a role'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
            defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                
                <div className='gor-role'>
                <input type="radio" value="operator" checked name="role" ref={node => { this.operator = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.operator" description='Text for operator' 
            defaultMessage='Operator'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.operatortext" description='Subtext for operator' 
            defaultMessage='Grant access to the Operator Interface at each Pick Put Station in the Butler system'/></div>
                  <span className='gor-usr-hdsm'><input type="checkbox" value="pick" checked name='access' ref={node => { this.pick = node }} />
                  <FormattedMessage id="users.add.roledetails.pick" description='Text for pick operator' 
            defaultMessage=' Pick Operator'/></span>
                  <span className='gor-usr-hdsm'><input type="checkbox" value="put" name='access'  ref={node => { this.put = node }} />
                  <FormattedMessage id="users.add.roledetails.put" description='Text for put operator' 
            defaultMessage=' Put Operator'/></span>
                  <span className='gor-usr-hdsm'><input type="checkbox" value="audit" name='access'  ref={node => { this.audit = node }} />
                  <FormattedMessage id="users.add.roledetails.audit" description='Text for audit' 
            defaultMessage=' Audit'/></span>            
                </div>

                <div className='gor-role'>
                <input type="radio" value="supervisor"  name="role" ref={node => { this.supervisor = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.supervisor" description='Text for supervisor' 
            defaultMessage=' Supervisor'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'>
                <FormattedMessage id="users.add.roledetails.supervisortext" description='Subtext for supervisor' 
            defaultMessage='Grant access to the Management Interface and Operator Interface for the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value="manager"  name="role" ref={node => { this.manager = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.manager" description='Text for manager' 
            defaultMessage=' Manager'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.managertext" description='Subtext for manager' 
            defaultMessage='Grant access to the Management Interface and Operator Interface to all systems'/></div>
                </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.password.heading" description='Heading for create password' 
            defaultMessage='Create password'/></div>
            <div className='gor-sub-head'><FormattedMessage id="sers.add.password.subheading" description='Subheading for create password' 
            defaultMessage='Min of 6 digits will be required for logging into the Operator Interface'/></div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field1" description='Text for password' 
            defaultMessage='Password'/></div>
              <input className='gor-usr-fdlg' type="password" id="password1"  ref={node => { this.password1 = node }}/><div className='gor-pass-val iTick' />
                <div className='gor-add-pass-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Password do not match</div>

              <div className='gor-usr-hdsm'><FormattedMessage id="users.add.password.field2" description='Text for confirm password' 
            defaultMessage='Confirm Password'/></div>
              <input className='gor-usr-fdlg' type="password" id="password2"  ref={node => { this.password2 = node }}/><div className='gor-pass-val iTick' />
                <div className='gor-add-pass-error' ref={node => { this.passError = node }} ><div className='gor-login-error'></div> Password do not match</div>

            </div>
            <p className='gor-submit'>
             <button className="gor-add-btn"><FormattedMessage id="users.add.password.button" description='Text for add new user button' 
            defaultMessage='Add new user'/></button>
            </p>
            </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default AddUser;