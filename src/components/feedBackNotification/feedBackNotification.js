import React  from 'react';
import { notifyHide,notifymsgHide } from '../../actions/validationActions';
import { connect } from 'react-redux';
import {NOTIFY_HIDE,HIDE,SUCCESS,DELETION} from '../../constants/frontEndConstants'; 

class FeedbackNotification extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    componentWillReceiveProps(nextProps){
    	if(nextProps.notifyInfomsg){
    		if(nextProps.notifyInfomsg.type!==HIDE)
    		{
   		 	 setTimeout(this.props.notifymsgHide.bind(this), 5000);    	
    		}
    	}
    }
	render(){
		return (
		<div className={"gor-feedbacknotify-top"} style={(this.props.notifyInfomsg)?(this.props.notifyInfomsg.type!==HIDE?{display:'block'}:{display:'none'}):{display:'none'}}>
		<span className={(this.props.notifyInfomsg?(this.props.notifyInfomsg.icon):'')}></span>
		<span>{this.props.notifyInfomsg?this.props.notifyInfomsg.msg:''}</span>
		</div> 
		);
	}
};
function mapStateToProps(state,ownProps) {
 return {
		// notifyInfo:state.appInfo.notifyInfo||{},
		 notifyInfomsg:state.appInfo.notifyInfomsg||null
		 
 	}
 }
function mapDispatchToProps(dispatch){
    return {
		notifymsgHide: function(){dispatch(notifymsgHide());}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FeedbackNotification);