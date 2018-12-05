import React  from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import OrderPriorityConfirmation from './OrderPriorityConfirmation';
import {modal} from 'react-redux-modal';

class OrderPriority extends React.Component{
	
	constructor(props) 
	{
	   super(props);
		this.state={
            visibleMenu:false,
            flyoutHack:false,
            activePriority: '',
            applyButtonClassName:"applyButton"
        }; 
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
        this._changeOrderPriority = this._changeOrderPriority.bind(this);
        this._applyOrderPriority = this._applyOrderPriority.bind(this);
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

  _showOrderPriorityModal = () => {
    modal.add(OrderPriorityConfirmation, {
        title: '',
        size: 'large', // large, medium or small,
        closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideCloseButton: true, // (optional) if you don't wanna show the top right close button
        startStopActionInitiated:this._startStopActionInitiated,
        activeBtnText: this.state.startStopBtnText

    });
}

  _changeOrderPriority(e){
    alert(e.currentTarget.value);
    this.setState({
        activePriority: e.currentTarget.value,
        applyButtonClassName: "applyButton makeClickable"
    });
  }

  _applyOrderPriority(){
      alert(" m licked");
    if(this.state.activePriority === "Critical"){
        this._showOrderPriorityModal();
    }
  }

	
	render(){
		var arr=[];
        //var data=this.props.data;
        var data = ["High", "Normal", "Low", "Critical"];
		data.map(function(item, index){
            //arr.push(<option className="headerName" name={item.name} value={item.value}>{item.name}</option>)
            arr.push(
                <li className="listWrapper"> 
                    <input type="radio" 
                        class="recall-option" 
                        value={data[index]} 
                        checked={this.props.orderPriority === data[index].toLowerCase()? data[index]:this.state.activePriority }
                        name="recall-options" 
                        onChange={(evt)=>{this._changeOrderPriority(evt)}}/>
                    <label class="option-text"><span>{data[index]}</span></label>
                </li>
            );
		},this);
	
		return (
            <div className="orderPriorityWrapper">
                <div className="orderPriorityListWrapper">
                    <div className="priorityListHeader"> CHANGE ORDER PRIORITY </div>
                    <ul className="orderPriorityList">
                        {arr}
                    </ul>
                    <div className={this.state.applyButtonClassName} onClick={() =>this._applyOrderPriority(this.props.idx)}>
                        <FormattedMessage id="orders.order.apply" description="button label for apply" defaultMessage="APPLY"/>
                    </div>
                </div>
            </div>
            /*
		<div className="gor-actionDropDown" style={{position:'relative'}} onClick={(evt)=>{this._handleClick(evt,this.props.id,this.props.displayId)}} {...this.props}>
		{this.props.children}
			{this.state.visibleMenu?this.state.flyoutHack?<div className='gor-add-flyoutWrapper' style={{'bottom':0}} >{arr}</div>:<div className='gor-add-flyoutWrapper'>{arr}</div>:""}
        </div>
        */
		
		
		);
	}
}

OrderPriority.propTypes={
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default OrderPriority ;