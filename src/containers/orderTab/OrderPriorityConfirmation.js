import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {
    SET_ORDER_PRIORITY_URL
} from '../../constants/configConstants';

import {APP_JSON, POST, SET_ORDER_PRIORITY} from '../../constants/frontEndConstants';
import { makeAjaxCall } from '../../actions/ajaxActions';

class OrderPriorityConfirmation extends React.Component {

    constructor(props) {
        super(props);
        this._triggerConfirm = this._triggerConfirm.bind(this);
        this._cancelConfirm = this._cancelConfirm.bind(this);
        this._setOrderPriorityToCritical = this._setOrderPriorityToCritical.bind(this);
    }

    _setOrderPriorityToCritical() {
        let formData = {
            "id": this.props.orderInternalId, //order_internal_id,  //long
            "externalServiceRequestId": this.props.orderExternalId,//order_id, //stirng
            "type": this.props.orderType, //“PICK”
            "attributes": {
                "simple_priority": "critical"
            }
        };
        let params={
            'url': SET_ORDER_PRIORITY_URL,
            'method':POST,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : SET_ORDER_PRIORITY,
            'formdata':formData
        }
        this.props.makeAjaxCall(params);
    }

    _triggerConfirm() {
        this._setOrderPriorityToCritical();
        this.props.removeModal();
    }

    _cancelConfirm(){
        this.props.removeModal();
    }


    render() {
        let msgToDisplay;
        if(this.props.activeBtnText === "startReconfig"){
            msgToDisplay = <FormattedMessage id="orderPriority.dialog.message"
                            description="msu config start dialog box"
                            defaultMessage="Please note that critical priority orders will override all other lined up orders. Do you wish to proceed?"/>
        }
        else{
            msgToDisplay = <FormattedMessage id="orderPriority.dialog.message"
                            description="msu config stop dialog box"
                            defaultMessage="Please note that critical priority orders will override all other lined up orders. Do you wish to proceed?"/>
        }
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <div><span>{msgToDisplay}</span>
                    </div>
                </div>

                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}></div>
                </div>

                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this._cancelConfirm}>
                            <FormattedMessage id="orderPriority.modal.confirm.no"
                            description="Close the confirmation box"
                            defaultMessage="CANCEL"/>
                    </button>
                    <button onClick={this._triggerConfirm} className='gor-save-profile-btn'>
                        <FormattedMessage id="orderPriority.modal.confirm.yes"
                            description="yes and proceed further"
                            defaultMessage="CONFIRM"/>
                    </button>
                </div>

            </div>
        </div>
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
    return {
        profileRequestedAt:state.ppsConfiguration.profileRequestedAt

    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(OrderPriorityConfirmation);