import React  from 'react';
class ActionDropDown extends React.Component{
	
	constructor(props) 
	{
        super(props);
        this.state={visibleMenu:false}; 
    }
    _handleClick(field){
      this.setState({visibleMenu:true});
	}	
	_optionClick(obj){
		this.setState({visibleMenu:false});
		this.props.clickOptionBack(obj);
		
	}
	
	render(){
		let me=this;
		
		var arr=[];
		var data=this.props.data;
		data.map(function(item, i){
			arr.push(<option className="headerName" onClick={me._optionClick.bind(me)} name={item.name} value={item.value}>{item.name}</option>)
		})
	
		return (
			
		<div className="gor-actionDropDown" onClick={this._handleClick.bind(this)} {...this.props}>
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