import React  from 'react';
import ListItem from './listItem';


class List extends React.Component{

	_getListItems (list){
		let listItems=[];
		for (let i=0;i<list.length;i++){
			let item = (<ListItem>
				list.
			</ListItem>);
			listItems.push(item);
		}
		return listItems;
	}

	render(){
		let listItems = this._getListItems(this.props.list)
		return (
		    <div>   
		    <h1>
		    {this.props.heading}
		    </h1>
			<ul>
			{listItems}
			</ul>
			</div>
		);
	}
};

List.propTypes={
  heading:React.PropTypes.string,
}

export default List ;