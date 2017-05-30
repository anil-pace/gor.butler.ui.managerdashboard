import React  from 'react';

class SubTab extends React.Component{
	render(){
		return (
		<div className="gorSubTab gorContainer">
			<div className={this.props.changeClass}>
			<div className="gor-upperText">
				{this.props.item}
				</div>
			</div>
		</div>
	);
	}
}

export default SubTab ;