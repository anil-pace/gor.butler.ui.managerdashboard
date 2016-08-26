import React  from 'react';
import ReactDOM  from 'react-dom';

class Header extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="gor-logo logo">
				
				</div>
				<div className="blockSystem">
					<div className="upperText">Butler Management System</div>
					<div className="subText">Start time:09:00:15</div>
				</div>
			</div>
			<div className="blockLeft">
				<div className="logo fk-logo">
					
				</div>
				<div className="dropdown" id="profile">
					<div  className="dropbtn">
						<div className="block">
							<div className="upperTextClient truncate">Krishna Gandhi Krishna Gandhi Krishna </div>
							<div className="subTextClient">Manager</div>
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

export default Header ;