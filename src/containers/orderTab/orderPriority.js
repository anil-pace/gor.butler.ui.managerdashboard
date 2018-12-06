import React  from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import OrderPriorityConfirmation from './OrderPriorityConfirmation';
import {modal} from 'react-redux-modal';
import {APP_JSON, PUT, SET_ORDER_PRIORITY} from '../../constants/frontEndConstants';
import { makeAjaxCall } from '../../actions/ajaxActions';
import {
    SET_ORDER_PRIORITY_URL
} from '../../constants/configConstants';
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

    _setOrderPriorityToNotCritical(orderPriority) {
        alert(orderPriority);
        let formData = {
            "id": this.props.orderInternalId, 
            "externalServiceRequestId": this.props.orderExternalId,
            "type": this.props.orderType, 
            "attributes": {
                "simple_priority": orderPriority
            }
        };
        let params={
            'url': SET_ORDER_PRIORITY_URL,
            'method':PUT,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : SET_ORDER_PRIORITY,
            'formdata':formData
        }
        this.props.makeAjaxCall(params);
    }

    _changeOrderPriority(event){
        //alert(event.currentTarget.value);
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
        //alert(" m licked");
        if(this.state.activePriority === "critical"){
            this._showOrderPriorityModal();
        }
        else{
            this._setOrderPriorityToNotCritical(this.state.activePriority);
        }
    }

	
	render(){
		var arr=[];
        //var data=this.props.data;
        //var data = ["High", "Normal", "Low", "Critical"];
        var data = [
            {value: "high", text: <FormattedMessage id="order.priority.high" description="label text for high" defaultMessage="High"/>},
            {value: "normal", text: <FormattedMessage id="order.priority.normal" description="label text for normal" defaultMessage="Normal"/>},
            {value: "low", text: <FormattedMessage id="order.priority.low" description="label text for low" defaultMessage="Low"/>},
            {value: "critical", text: <FormattedMessage id="order.priority.critical" description="label text for critical" defaultMessage="Critical"/>},
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
                    <label class="option-text">
                    <span>{data[index].text}</span>
                    </label>
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
                        <FormattedMessage id="orders.priority.apply" description="button label for apply" defaultMessage="APPLY"/>
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

var mapDispatchToProps=function (dispatch) {
    return {
        makeAjaxCall: function(params){
            dispatch(makeAjaxCall(params))
        }
    }
};

function mapStateToProps(state, ownProps) {
    return {};
}

OrderPriority.propTypes={
	children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node
    ])
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPriority);