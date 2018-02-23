import React  from 'react';
class ActionDropDown extends React.Component{
	
	constructor(props) 
	{
	   super(props);
        this.state={visibleMenu:false}; 
    }
    _handleClick(field){
    	let currentStatus=this.state.visibleMenu;
    	currentStatus=!currentStatus;
      this.setState({visibleMenu:currentStatus});
      this.props.clickOptionBack(field);

	}	
	_optionClick(obj){
		let val=false;
		this.setState({visibleMenu: val});
		this.props.clickOptionBack(obj);

	}
	
	render(){
		var arr=[];
		var data=this.props.data;
		data.map(function(item, i){
			arr.push(<option className="headerName" name={item.name} value={item.value}>{item.name}</option>)
		},this);
	
		return (
			
		<div className="gor-actionDropDown" style={{position:'relative'}} onClick={this._handleClick.bind(this)} {...this.props}>
		{this.props.children}
			{this.state.visibleMenu?<div className='gor-add-flyoutWrapper'>{arr}</div>:""}
		</div>
		
		
		);
	}
}

ActionDropDown.propTypes={
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default ActionDropDown ;