import React  from 'react';
import ReactDOM  from 'react-dom';

function myFunction() {
				document.getElementById("myDropdown").classList.toggle("show");
			//document.getElementById("myDropdown").style.display = "block";
		}


		window.addEventListener("onClick",function(){
			if (!event.target.className.match(/dropbtn|block|upperTextClient|subTextClient/)) {

				var dropdowns = document.getElementsByClassName("dropdown-content");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) {
						openDropdown.classList.remove('show');
					}
				}
			}
		}) 

class Header extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		return (
		<header className="gorHeader head">
			<div className="mainBlock">
				<div className="logo">
					<img src="https://s4.postimg.org/feprdgqe5/logo.png"></img>
				</div>
				<div className="blockSystem">
					<div className="upperText">Butler Management System</div>
					<div className="subText">Start time:09:00:15</div>
				</div>
			</div>
			<div className="blockLeft">
				<div className="logo">
					<img src="https://s3.postimg.io/3t3lohtib/flipkart_logo_detail.jpg"></img>
				</div>
				<div className="dropdown" id="profile">
					<div onclick="myFunction()" className="dropbtn">
						<div className="block">
							<div className="upperTextClient truncate">Krishna Gandhi Krishna Gandhi Krishna </div>
							<div className="subTextClient">Manager</div>
						</div>
						<div className="block">
							<img src="https://s4.postimg.org/nfi3m33vh/icon.jpg"></img>
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