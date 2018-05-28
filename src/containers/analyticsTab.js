import React  from 'react';

class AnalyticsTab extends React.Component{

	shouldComponentUpdate(){
      return false
    }
    componentDidMount(){
    	let _this = this;
    	this.ifrm.onload= function(){
    		console.log('called');
    		console.log(_this.ifrm.contentWindow.getElementsByClassName('navbar'));
    	}
    	
    }
  render(){
		return (
			<div>
				<iframe ref={(ifrm) => { this.ifrm = ifrm; }} width="100%" height="500px" src="http://localhost:3000/d/NQm9Ozkiz/demo-dashboard?refresh=5s&orgId=2"></iframe>
			</div>
		);
	}
};

export  default AnalyticsTab;


