import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import {setRole} from '../../actions/userActions';
import {BUTLER_SUPERVISOR,BUTLER_UI} from '../../constants/backEndConstants'
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {stringConfig, roleDesc} from '../../constants/backEndConstants';

class RoleGroup extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _checkRole(value){
            this.props.setRole(Number(value));
    }
    _getChecked(roleName, currentRole){
        if(!roleName){
            if(currentRole.name === BUTLER_UI)
            {
                return true;
            }
        }
        if(roleName == currentRole.name){
            return true;
        }
        return false;
    }
    _processRoles(){
        let roles=[] ,len, currentRole,item;
        len = this.props.roleInfo.length;

        for(let i=0; i<len; i++){
           currentRole = this.props.roleInfo[i];
           if(stringConfig.hasOwnProperty(currentRole.name)){
            item=(<div key={i}>
                <div className='gor-role'>
                    <input type="radio"  name='role' onChange={this._checkRole.bind(this,currentRole.id)} 
                        defaultChecked={this._getChecked(this.props.roleName, currentRole)}/>
                    <span className='gor-usr-hdsm'>
                        {this.context.intl.formatMessage(stringConfig[currentRole.name])}
                     </span>
                </div>
                <div className='gor-choose'>
                    <div className='gor-sub-head'>
                       {roleDesc.hasOwnProperty(currentRole.name)?this.context.intl.formatMessage(roleDesc[currentRole.name]):''}
                    </div>
                </div>

            </div>);
            roles.push(item);            
           }
        }
        return roles;
    }
	render(){
        var roles = this._processRoles();
		return (
            <div className='gor-usr-details'>
                <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
                defaultMessage='Choose a role'/></div>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
                defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                {roles}
            </div>
            );
	}
};
function mapStateToProps(state,ownProps) {
 return {
 	}
 }
function mapDispatchToProps(dispatch){
    return {
    setRole: function(data){ dispatch(setRole(data)); },        
    }
}
RoleGroup.contextTypes = {
    intl: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(RoleGroup);
