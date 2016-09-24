import React  from 'react';
import ReactDOM  from 'react-dom';        

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
          <div className="modal-content">
            <div className='gor-modal-head'>
              <div className='gor-usr-add'>Add new user
                          <div className='gor-sub-head'>All the fields are mandatory</div>
              </div>
              <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
            </div>
            <div className='gor-modal-body'>
            <div className='gor-usr-form'>
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'>Enter User details</div>
            <div className='gor-sub-head'>A User ID will be required to log into the system</div>
            
             <div className='gor-usr-hdsm'>User ID</div>
              <input className='gor-usr-fdlg' type="text" id="userid"  ref={node => { this.userId = node }}/>
            <p></p>
              <div className='gor-usr-field'>
                <div className='gor-usr-hdsm'>First Name</div>
                <input className='gor-usr-fdsm' type="text" id="firstname"  ref={node => { this.firstName = node }}/>
              </div>
              <div className='gor-usr-field'>              
                <div className='gor-usr-hdsm'>Last Name</div>
                <input className='gor-usr-fdsm' type="text" id="lastname"  ref={node => { this.lastName = node }}/>
              </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'>Choose a role</div>
            <div className='gor-sub-head'>User will be given a specific level of control over the Butler system depending on the designated role</div>
                
                <div className='gor-role'>
                <input type="radio" id="operator"  ref={node => { this.operator = node }} /><span className='gor-usr-hdsm'>Operator</span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'>Grant access to the Operator Interface at each Pick Put Station in the Butler system</div>
                  <span className='gor-usr-hdsm'><input type="checkbox" id="pick"  ref={node => { this.pick = node }} />Pick Operator</span>
                  <span className='gor-usr-hdsm'><input type="checkbox" id="put"  ref={node => { this.put = node }} />Put Operator</span>
                  <span className='gor-usr-hdsm'><input type="checkbox" id="audit"  ref={node => { this.audit = node }} />Audit</span>            
                </div>

                <div className='gor-role'>
                <input type="radio" id="supervisor"  ref={node => { this.supervisor = node }} /><span className='gor-usr-hdsm'>Supervisor</span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'>Grant access to the Management Interface and Operator Interface for the Butler system</div>
                </div>

                <div className='gor-role'>
                <input type="radio" id="manager"  ref={node => { this.manager = node }} /><span className='gor-usr-hdsm'>Manager</span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'>Grant access to the Management Interface and Operator Interface to all systems</div>
                </div>
            </div>

            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'>Create password</div>
            <div className='gor-sub-head'>Min of 6 digits will be required for logging into the Operator Interface</div>

              <div className='gor-usr-hdsm'>Password</div>
              <input className='gor-usr-fdlg' type="password" id="password1"  ref={node => { this.password1 = node }}/>
              <div className='gor-usr-hdsm'>Confirm Password</div>
              <input className='gor-usr-fdlg' type="password" id="password2"  ref={node => { this.password2 = node }}/>
            </div>
            <p className='gor-submit'>
             <button className="gor-add-btn">Add new user</button>
            </p>
            </div>
            </div>
          </div>
        </div>
      );
    }
  }
export default AddUser;