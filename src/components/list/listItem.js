import React  from 'react';

class ListItem extends React.Component{

	render(){
		return (
			<li className="gor-list-none">{this.props.children}</li>
		);
	}
};

export default ListItem ;