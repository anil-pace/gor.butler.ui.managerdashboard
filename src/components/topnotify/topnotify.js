import React  from 'react';
import { notifyHide } from '../../actions/validationActions';
import { connect } from 'react-redux';
import {NOTIFY_HIDE,HIDE,SUCCESS,DELETION} from '../../constants/frontEndConstants'; 

class TopNotifications extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    componentWillReceiveProps(nextProps){
        window.scrollTo(0,0);
    	if(nextProps.notifyInfo){
    		if(nextProps.notifyInfo.type!==HIDE)
    		{
   		 	 setTimeout(this.props.notifyHide.bind(this), 5000);    	
    		}
    	}
    }
	render(){
		return (
		<div className={"gor-notify-top "+(this.props.notifyInfo?(this.props.notifyInfo.type):'')} style={(this.props.notifyInfo)?(this.props.notifyInfo.type!==HIDE?{display:'block'}:{display:'none'}):{display:'none'}}>
			<span className={(this.props.notifyInfo?(this.props.notifyInfo.icon):'')}></span><span>{this.props.notifyInfo?this.props.notifyInfo.msg:''}</span>
		</div> 
		);
	}
};
function mapStateToProps(state,ownProps) {
 return {
 		notifyInfo:state.appInfo.notifyInfo||null,
 	}
 }
function mapDispatchToProps(dispatch){
    return {
        notifyHide: function(){dispatch(notifyHide());}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopNotifications);