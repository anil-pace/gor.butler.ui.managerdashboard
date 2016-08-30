import React  from 'react';
import ReactDOM  from 'react-dom';
import { connect } from 'react-redux' ;
import {REQUEST_HEADER,RECIEVE_HEADER,RECIEVE,RECIEVE_ITEM_TO_STOCK} from '../../actions/headerAction';


class Header extends React.Component{
	constructor(props) 
	{
    	super(props);
    }
    componentDidMount(){
    	
    }	
    componentWillMount(){
    	// this.setState({"asdf":"asdf"});
    	console.log(this.props)
    }
    componentWillUnmount(){
    	
    }

					// <div className="upperText">
					// {headData.isFetching &&
		   //          <span>Fetching...</span>
		   //        	}
		   //        	{!headData.isFetching &&
		   //          <span>{headData.data}</span>
		   //        	}
		          	
					// </div>


	render(){
		const { headData } = this.props;
		//console.log(this.props.headData);
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="gor-logo logo">
				
				</div>
				<div className="blockSystem">
					<div className="upperText">Butler Management System</div>
					<div className="subText">Start time:{this.props.user.start}</div>
				</div>
			</div>
			<div className="blockLeft">
				<div className="logo fk-logo">
					
				</div>
				<div className="dropdown" id="profile">
					<div  className="dropbtn">
						<div className="block">
							<div className="upperTextClient truncate">{this.props.user.name}</div>
							<div className="subTextClient">{this.props.user.post}</div>
						</div>
						<div className="block user-icon">
							
						</div>

						<div id="myDropdown" className="dropdown-content">
							<div className="horizontalDiv">	
								<a href="#">Placeholder option 1</a>
								<a href="#">Placeholder option 2</a>
							</div>
							<div>
								<a href="#">Logout</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		);
	}
};

function mapStateToProps(state, ownProps){
	return  {
		"headData":state.getData[RECIEVE_HEADER] || {}
		}
		 

}

export 	default connect(mapStateToProps)(Header);
