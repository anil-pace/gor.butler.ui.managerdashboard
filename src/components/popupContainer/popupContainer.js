import React  from 'react';
import ReactDOM from 'react-dom';

class PopupContainer extends React.Component {
  constructor (props) {
    super(props);
  }
 
  _handleClick(field){
		
		var domRect = (field.target).getBoundingClientRect();
		this.setState({flyoutHack:domRect.top>=546});
    	let currentStatus=this.state.visibleMenu;
    	currentStatus=!currentStatus;
      this.setState({visibleMenu:currentStatus});
      this.props.clickOptionBack(field);

		
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
 
    render() {
            return (   
                <div onClick={(evt)=>{this._handleClick(evt)}} style={{'display':'block'}}>  
                    {this.props.children}
                </div>
            );
    }
  }

export default PopupContainer;