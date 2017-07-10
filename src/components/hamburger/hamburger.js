import React  from 'react';
import ReactDOM  from 'react-dom';
class HamBurger extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state={menuVisible:false};
    	this._handleDocumentClick=this._handleDocumentClick.bind(this);
      this._toggleDropdown = this._toggleDropdown.bind(this);
    }	
  	componentWillMount() {
    	document.addEventListener('click', this._handleDocumentClick, false);
    	document.addEventListener('touchend', this._handleDocumentClick, false);
  	}  

    
    componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
    document.removeEventListener('touchend', this._handleDocumentClick, false);
  }  
    _toggleDropdown(){
    	var currentVisibility=this.state.menuVisible;
    	currentVisibility=!currentVisibility;
    	this.setState({menuVisible:currentVisibility});
  	}
  
  _handleDocumentClick() {
    	if (!ReactDOM.findDOMNode(this).contains(event.target)) {
          this.setState({menuVisible: false});
    	}
  	}    
	render(){
		return (
				<div className={"gor-menuWrap"}
				 onClick={this._toggleDropdown}>
					{this.props.children(this)}									
				</div>		
			);
	}
};

HamBurger.propTypes={
		children:React.PropTypes.func.isRequired
}

export default HamBurger ;