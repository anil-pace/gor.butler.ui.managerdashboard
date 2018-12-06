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
            activePriority: this.props.orderPriority,
            applyButtonClassName:"applyButton",
        }; 
        this._changeOrderPriority = this._changeOrderPriority.bind(this);
        this._applyOrderPriority = this._applyOrderPriority.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.onClick(false);
        }
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
            orderType :this.props.orderType,
            onClick: this.props.onClick
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
        this.props.onClick(false);
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
        if(this.state.activePriority === "critical"){
            this._showOrderPriorityModal();
        }
        else{
            this._setOrderPriorityToNotCritical(this.state.activePriority);
        }
    }

	
	render(){
		var arr=[];
        var data = [
            {value: "high", text: <FormattedMessage id="order.priority.high" description="label text for high" defaultMessage="High"/>},
            {value: "normal", text: <FormattedMessage id="order.priority.normal" description="label text for normal" defaultMessage="Normal"/>},
            {value: "low", text: <FormattedMessage id="order.priority.low" description="label text for low" defaultMessage="Low"/>},
            {value: "critical", text: <FormattedMessage id="order.priority.critical" description="label text for critical" defaultMessage="Critical"/>},
        ];
		data.map(function(item, index){
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
        
        if(this.props.showOrderPriorityList){
            return (<div ref={this.setWrapperRef}>
                    <div className="orderPriorityWrapper">
                        <div className="orderPriorityListWrapper">
                            <div className="priorityListHeader"> 
                                <FormattedMessage id="order.priority.header" description="label text for change order priority" defaultMessage="CHANGE ORDER PRIORITY"/> 
                            </div>
                            <ul className="orderPriorityList">
                                {arr}
                            </ul>
                            <div className={this.state.applyButtonClassName} onClick={() =>this._applyOrderPriority(this.props.orderExternalId)}>
                                <FormattedMessage id="orders.priority.apply" description="button label for apply" defaultMessage="APPLY"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div> </div>
            )
        }
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