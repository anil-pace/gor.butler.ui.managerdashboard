import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import {setRole} from '../../actions/userActions';
import {BUTLER_SUPERVISOR,BUTLER_UI} from '../../constants/backEndConstants'
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {stringConfig, roleDesc} from '../../constants/backEndConstants';

class UserRoles extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _checkRole(event){
            this.props.setRole(event.target.value);
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
            item=(
                    <option key={i} name='role' value={currentRole.name} 
                        selected={this._getChecked(this.props.roleName, currentRole)}>
                        <span className='gor-usr-hdsm'>
                            {this.context.intl.formatMessage(stringConfig[currentRole.name])}
                        </span>
                    </option>
            );
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
                <div className='gor-role'>
                    <select className='gor-select-field' onChange={this._checkRole.bind(this)}>
                        {roles}
                    </select>
                    <div className='gor-sub-head'>
                        {roleDesc.hasOwnProperty(this.props.roleSet)?
                                this.context.intl.formatMessage(roleDesc[this.props.roleSet]):
                                this.context.intl.formatMessage(roleDesc[BUTLER_UI])}
                    </div>
                </div>
            </div>
            );
	}
};
function mapStateToProps(state,ownProps) {
 return {
      roleSet:  state.appInfo.roleSet  || null,    
 	}
 }
function mapDispatchToProps(dispatch){
    return {
        setRole: function(data){ dispatch(setRole(data)); },        
    }
}
UserRoles.contextTypes = {
    intl: React.PropTypes.object.isRequired
}
UserRoles.propTypes={
      roleSet:React.PropTypes.bool, 
      setRole:React.PropTypes.func,
}

export default connect(mapStateToProps,mapDispatchToProps)(UserRoles);
