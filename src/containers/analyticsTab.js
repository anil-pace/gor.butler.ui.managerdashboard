import React  from 'react';

class AnalyticsTab extends React.Component{

	shouldComponentUpdate(){
      return false
    }
    componentDidMount(){
    	let _this = this;
    	this.ifrm.onload= function(){
    		let sideMenu = _this.ifrm.contentDocument.getElementsByClassName('sidemenu')[0];
            let body = _this.ifrm.contentDocument.body;
            
    		if(sideMenu){
                sideMenu.style.display="none";
            }
            if(body){
                let  observerOptions = {
                  childList: true,
                  attributes: false,
                  subtree: true //Omit or set to false to observe only changes to the parent node.
                }
                let observer = new MutationObserver(function(mutationList, observer){
                    mutationList.forEach((mutation) => {
                        //console.log(mutation.addedNodes[0].nodeName.toLowerCase());
                        if(mutation.addedNodes[0] && mutation.addedNodes[0].nodeName && mutation.addedNodes[0].nodeName.toLowerCase() === "dashnav"){
                            //mutation.addedNodes[0].style.display = "none";
                            console.log("Hi "+mutation.addedNodes[0]);
                    }
                    })
                });
                observer.observe(body, observerOptions);
            }
    	}
    	
    }
  render(){
		return (
			<div>
				<iframe ref={(ifrm) => { this.ifrm = ifrm; }} width="100%" height="500px" src="http://localhost/grafana/d-solo/NQm9Ozkiz/demo-dashboard?refresh=5s&orgId=2&panelId=4&from=1512982506925&to=1528707306925"></iframe>
			</div>
		);
	}
};

export  default AnalyticsTab;


