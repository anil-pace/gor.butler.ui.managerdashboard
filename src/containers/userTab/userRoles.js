import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import {setRole} from '../../actions/userActions';
import {BUTLER_SUPERVISOR,BUTLER_UI} from '../../constants/backEndConstants'
import { FormattedMessage,FormattedPlural } from 'react-intl'; 
import {stringConfig, roleDesc} from '../../constants/backEndConstants';
import Dropdown from '../../components/dropdown/dropdown';
import Information from '../../components/Information/Information';

class UserRoles extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _checkRole(value){
            this.props.setRole(value);
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
    _isMapped(item){
           if(stringConfig.hasOwnProperty(item)){
            return true;
           }
           return false;
    }
    _getList(){
        let options=[], selected, len, objDropdown, currentRole;
        len = this.props.roleInfo.length;
        for(let i=0; i<len; i++){
           currentRole = this.props.roleInfo[i];
           if(!this._isMapped(currentRole.name)){
                continue;
           }
           objDropdown ={
            value: currentRole.name, 
            label: this.context.intl.formatMessage(stringConfig[currentRole.name])
           }
           options.push(objDropdown);
           if(this._getChecked(this.props.roleName,currentRole)){
            selected = objDropdown;
           }
        }
        return {options:options, selected:selected};
    }
    _getInfo(){
        let infoGroup=[], info, selected, len, currentRole;
        len = this.props.roleInfo.length;
        for(let i=0; i<len; i++){
           currentRole = this.props.roleInfo[i];
           if(!this._isMapped(currentRole.name)){
                continue;
           }
           if(roleDesc.hasOwnProperty(currentRole.name)){
            info=(<div className='gor-role-details'>
                    <span>
                        {this.context.intl.formatMessage(stringConfig[currentRole.name])}
                    </span>
                    <span className='gor-sub-head'>
                        {this.context.intl.formatMessage(roleDesc[this.props.roleSet])}
                    </span>
                </div>);            
           }
            infoGroup.push(info);
        }
        return infoGroup;
    }
	render(){
        var dataDropdown = this._getList();
        var infoData = this._getInfo();
		return (
            <div className='gor-usr-details'>
                <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
                defaultMessage='Choose a role'/></div>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
                defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                <div className='gor-role'>
                    <Dropdown optionDispatch={(e) => this._checkRole(e)} items={dataDropdown.options}
                        styleClass={'gor-usr-dropdown'} currentState={dataDropdown.selected} />
                <Information data={infoData} />
                </div>
            </div>
            );
	}
};
function mapStateToProps(state,ownProps) {
 return {
      roleSet:  state.appInfo.roleSet  || BUTLER_UI,    
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
      roleSet:React.PropTypes.string, 
      setRole:React.PropTypes.func,
}

export default connect(mapStateToProps,mapDispatchToProps)(UserRoles);
