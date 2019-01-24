import React  from 'react';
import ReactDOM from 'react-dom';
class ActionDropDown extends React.Component{
	
	constructor(props) 
	{
	   super(props);
		this.state={visibleMenu:false,flyoutHack:false}; 
        this._handleDocumentClick =  this._handleDocumentClick.bind(this);
    }
    _handleClick(field,id,displayId){
		
		var domRect = (field.target).getBoundingClientRect();
		this.setState({flyoutHack:domRect.top>=546});
    	let currentStatus=this.state.visibleMenu;
    	currentStatus=!currentStatus;
      this.setState({visibleMenu:currentStatus});
      this.props.clickOptionBack(field,id,displayId);

		
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

	
	render(){
		var arr=[];
		var data=this.props.data;
		data.map(function(item, i){
			arr.push(<option key={item.value} className="headerName" name={item.name} value={item.value}>{item.name}</option>)
		},this);
	
		return (
			
		<div className="gor-actionDropDown" style={{position:'relative'}} onClick={(evt)=>{this._handleClick(evt,this.props.id,this.props.displayId)}} style={this.props.style}>
		{this.props.children}
			{this.state.visibleMenu?this.state.flyoutHack?<div className='gor-add-flyoutWrapper' style={{'bottom':0}} >{arr}</div>:<div className='gor-add-flyoutWrapper'>{arr}</div>:""}
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