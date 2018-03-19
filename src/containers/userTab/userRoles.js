import React  from 'react';
import { connect } from 'react-redux';
import {setRole} from '../../actions/userActions';
import {BUTLER_UI} from '../../constants/backEndConstants'
import { FormattedMessage } from 'react-intl'; 
import {stringConfig, roleDesc} from '../../constants/backEndConstants';
import Dropdown from '../../components/dropdown/dropdown';
import Information from '../../components/Information/Information';

class UserRoles extends React.Component{
	
    _checkRole(value){
            this.props.setRole(value);
    }
    _getChecked(roleName, currentRole){
        if(!this.props.roleSet){
            if(!roleName){
                if(currentRole.name=== BUTLER_UI)
                {
                    return true;
                }
            }
            else if(roleName=== currentRole.name){
                return true;
            }
            return false;
        }
        if(this.props.roleSet=== currentRole.name){
                return true;
        }        
        return false;
    }
    _isMapped(config,item){
           if(config.hasOwnProperty(item)){
            return true;
           }
           return false;
    }
    _getList(){
        let options=[], selected={}, len, objDropdown, currentRole, label;
        len=this.props.roleList.length;
        for(let i=0; i<len; i++){
           currentRole=this.props.roleList[i];
          
           if(this._getChecked(this.props.roleName,currentRole)){
            selected={
                value: currentRole.name, 
                label:stringConfig[currentRole.name] ? this.context.intl.formatMessage(stringConfig[currentRole.name]):currentRole.name
            };
            label=(<div>
                        <span className='gor-role-label'>{stringConfig[currentRole.name] ? this.context.intl.formatMessage(stringConfig[currentRole.name]):currentRole.name}</span>
                        <span className='gor-selected-icon'></span>
                    </div>
                )
           }
           else{
            label=stringConfig[currentRole.name] ? this.context.intl.formatMessage(stringConfig[currentRole.name]) : currentRole.name; 
           }
           objDropdown={
            value: currentRole.name, 
            label:label,
               key:i
           }
           options.push(objDropdown);
        }
        return {options:options, selected:selected};
    }
    _getInfo(){
        let infoGroup=[], info, len, currentRole;
        len=this.props.roleList.length;
        let infoHeading=(<div className='gor-role-heading'>
                            <FormattedMessage id="users.roles.info.heading" description='Heading for roles description' 
                             defaultMessage='Role definitions'/>
                          </div>);

        for(let i=0; i<len; i++){
           currentRole=this.props.roleList[i];
           if(!this._isMapped(stringConfig,currentRole.name) || !this._isMapped(roleDesc,currentRole.name)){
                continue;
           }
            info=(<div key={i} className='gor-role-details'>
                    <span className='gor-usr-hdsm'>
                        {this.context.intl.formatMessage(stringConfig[currentRole.name])}: 
                    </span>
                    <span className='gor-sub-head'>
                        {this.context.intl.formatMessage(roleDesc[currentRole.name])}
                    </span>
                </div>);            
            infoGroup.push(info);
        }
        return {text:infoGroup, heading:infoHeading};
    }
	render(){
        var dataDropdown=this._getList();
        var infoData=this._getInfo();
		return (
            <div className='gor-usr-details'>
                <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
                defaultMessage='Choose a role'/></div>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
                defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                <div className='gor-role'>
                    <Dropdown optionDispatch={(e)=> this._checkRole(e)} items={dataDropdown.options}
                        styleClass={'gor-usr-dropdown'} currentState={dataDropdown.selected} />
                    <Information data={infoData.text} heading={infoData.heading}/>
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
UserRoles.contextTypes={
    intl: React.PropTypes.object.isRequired
}
UserRoles.propTypes={
      roleSet:React.PropTypes.string, 
      roleName:React.PropTypes.string,
      setRole:React.PropTypes.func,
    roleList:React.PropTypes.array
}

export default connect(mapStateToProps,mapDispatchToProps)(UserRoles);
