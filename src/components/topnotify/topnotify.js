import React  from 'react';
import ReactDOM  from 'react-dom';
import { notifyHide } from '../../actions/validationActions';
import { connect } from 'react-redux';
import {NOTIFY_HIDE,HIDE,SUCCESS} from '../../constants/appConstants'; 

class TopNotifications extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    componentWillReceiveProps(nextProps){
    	if(nextProps.notifyInfo){
    		if(nextProps.notifyInfo.type!==HIDE)
    		{
   		 	 setTimeout(this.props.notifyHide.bind(this), 5000);    	
    		}
    	}
    }
	render(){
		return (
		<div className={"gor-notify-top"+(this.props.notifyInfo?(this.props.notifyInfo.type===SUCCESS?' pass':' fail'):'')} style={(this.props.notifyInfo)?(this.props.notifyInfo.type!==HIDE?{display:'block'}:{display:'none'}):{display:'none'}}>
			<span className={(this.props.notifyInfo?(this.props.notifyInfo.type===SUCCESS?'iTick-white':'iError-white'):'')}></span><span>{this.props.notifyInfo?this.props.notifyInfo.msg:''}</span>
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