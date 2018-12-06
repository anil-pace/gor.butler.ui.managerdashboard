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
            activePriority: this.props.orderPriority,
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
        orderExternalId: this.props.orderExternalId,
        orderPriority : this.props.orderPriority,
        orderInternalId :this.props.orderInternalId,
        orderType :this.props.orderType
    });
}

  _changeOrderPriority(event){
    alert(event.currentTarget.value);
    if(event.currentTarget.value !== this.props.orderPriority){
        this.setState({
            activePriority: event.currentTarget.value,
            applyButtonClassName: "applyButton makeClickable"
        });
    }
    else{
        this.setState({
            activePriority: event.currentTarget.value,
            applyButtonClassName: "applyButton"
        });
    }
  }

  _applyOrderPriority(){
      alert(" m licked");
    if(this.state.activePriority === "critical"){
        this._showOrderPriorityModal();
    }
  }

	
	render(){
		var arr=[];
        //var data=this.props.data;
        //var data = ["High", "Normal", "Low", "Critical"];
        var data = [
            {value: "high", text: "High"},
            {value: "normal", text: "Normal"},
            {value: "low", text: "Low"},
            {value: "critical", text: "Critical"}
        ];
		data.map(function(item, index){
            //arr.push(<option className="headerName" name={item.name} value={item.value}>{item.name}</option>)
            arr.push(
                <li key={data[index].value} className="listWrapper"> 
                    <input type="radio" 
                        class="recall-option" 
                        value={data[index].value}
                        checked={this.state.activePriority === data[index].value }
                        name="recall-options" 
                        onChange={(evt)=>{this._changeOrderPriority(evt)}}/>
                    <label class="option-text"><span>{data[index].text}</span></label>
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
                    <div className={this.state.applyButtonClassName} onClick={() =>this._applyOrderPriority(this.props.orderExternalId)}>
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