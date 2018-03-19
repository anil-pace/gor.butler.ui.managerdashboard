import React  from 'react';
import ReactDOM from 'react-dom';
class ActionDropDown extends React.Component{
	
	constructor(props) 
	{
	   super(props);
		this.state={visibleMenu:false,flyoutHack:false}; 
        this._handleDocumentClick =  this._handleDocumentClick.bind(this);
    }
    _handleClick(field){
		if(field.target.className=="embeddedImage"){
		var domRect = (field.target).getBoundingClientRect();
		if(domRect.top>=546){
			this.setState({flyoutHack:true});
		}
		else
		{
			this.setState({flyoutHack:false});
		}
    	let currentStatus=this.state.visibleMenu;
    	currentStatus=!currentStatus;
      this.setState({visibleMenu:currentStatus});
      this.props.clickOptionBack(field);

	}	
}

  _handleDocumentClick() {
     if (!ReactDOM.findDOMNode(this).contains(event.target)) {
       this.setState({visibleMenu: false});
     }
 }


  componentDidMount(){
      document.addEventListener('click',this._handleDocumentClick,false);
  }

  componentWillUnmount() {
      document.removeEventListener("click", this._handleDocumentClick,false)
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
			{this.state.visibleMenu?this.state.flyoutHack?<div className='gor-add-flyoutWrapper' style={{'margin-top':-arr.length*37+'px'}} >{arr}</div>:<div className='gor-add-flyoutWrapper'>{arr}</div>:""}
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