import React  from 'react';

class AnalyticsTab extends React.Component{

	shouldComponentUpdate(){
      return false
    }
  render(){
		return (
			<div>
				<iframe width="100%" height="500px" src="http://localhost:3000/d/NQm9Ozkiz/demo-dashboard?refresh=5s&orgId=1&from=1505980105945&to=1521618505946&theme=light"></iframe>
			</div>
		);
	}
};

export  default AnalyticsTab;


