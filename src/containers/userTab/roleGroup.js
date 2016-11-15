import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux';
import {setRole} from '../../actions/userActions';
import {BUTLER_SUPERVISOR,BUTLER_UI} from '../../constants/appConstants'
import { FormattedMessage,FormattedPlural } from 'react-intl'; 


class RoleGroup extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    _checkRole(){
        let op,md;
        op=this.operator;
        md=this.manager;
        if(op.checked)
        {
            this.props.setRole(Number(op.value));
        }
        else if(md.checked)
        {
            this.props.setRole(Number(md.value));
        }
    }
	render(){
		return (
            <div className='gor-usr-details'>
            <div className='gor-usr-hdlg'><FormattedMessage id="users.add.roledetails.heading" description='Heading for role' 
            defaultMessage='Choose a role'/></div>
            <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.subheading" description='Subheading for role' 
            defaultMessage='User will be given a specific level of control over the Butler system depending on the designated role'/></div>
                
                <div className='gor-role'>
                <input type="radio"  name='role' onChange={this._checkRole.bind(this)} defaultChecked={this.props.roleId?(this.props.roleId===BUTLER_UI?true:false):true} value={this.props.operator} ref={node => { this.operator = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.operator" description='Text for operator' 
            defaultMessage='Operator'/> </span>
                </div>
                <div className='gor-choose'>
                  <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.operatortext" description='Subtext for operator' 
            defaultMessage='Grant access to the Operator Interface at each Pick Put Station in the Butler system'/></div>
                </div>

                <div className='gor-role'>
                <input type="radio" value={this.props.manager} defaultChecked={this.props.roleId?(this.props.roleId===BUTLER_SUPERVISOR?true:false):false} onChange={this._checkRole.bind(this)} id='userRole' name="role" ref={node => { this.manager = node }} /><span className='gor-usr-hdsm'>
                <FormattedMessage id="users.add.roledetails.manager" description='Text for manager' 
            defaultMessage='Manager'/></span>
                </div>
                <div className='gor-choose'>
                <div className='gor-sub-head'><FormattedMessage id="users.add.roledetails.managertext" description='Subtext for manager' 
            defaultMessage='Grant access to the Management Interface and Operator Interface to all systems'/></div>
                </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(RoleGroup);