import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';


class OrderPriorityConfirmation extends React.Component {

    constructor(props) {
        super(props);
        this._triggerConfirm = this._triggerConfirm.bind(this);
        this._cancelConfirm = this._cancelConfirm.bind(this);
    }

    _triggerConfirm() {
        this.props.removeModal();
        //this.props.startStopActionInitiated();
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


function mapStateToProps(state, ownProps) {

    return {
        profileRequestedAt:state.ppsConfiguration.profileRequestedAt

    };
}

export  default connect(mapStateToProps, null)(OrderPriorityConfirmation);