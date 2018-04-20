import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';


class MsuConfigConfirmation extends React.Component {

    constructor(props) {
        super(props);
        this._triggerStartReconfig = this._triggerStartReconfig.bind(this);
        this._cancelStartReconfig = this._cancelStartReconfig.bind(this);
    }

    _triggerStartReconfig() {
        this.props.removeModal();
        this.props.triggerStartReconfig();
        
    }

    _cancelStartReconfig(){
        this.props.removeModal();
    }


    render() {
        let msgToDisplay;
        if(this.props.activeBtnText === "START RECONFIG"){
             msgToDisplay = "Are you sure you want to start re-configuring empty MSUs?"
        }
        else{
            msgToDisplay = "Are you sure you want to stop re-configuring empty MSUs?"
        }
        return <div>
            <div className='gor-create-profile'>
                <div className='gor-create-profile-header'>
                    <div className='gor-question gor-align-middle'></div>
                    <div><span><FormattedMessage id="msu.configuration.confirm.saveAndapply.profile"
                            description="Save and ppply Profile to PPS"
                            defaultMessage={msgToDisplay}/></span>
                    </div>
                </div>

                <div className="gor-create-profile-body">
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}></div>
                </div>

                <div className='gor-create-profile-action-button'>
                    <button className='gor-cancel-btn' onClick={this._cancelStartReconfig}>
                            <FormattedMessage id="msu.configuration.confirm.no"
                            description="Close the confirmation box"
                            defaultMessage="CLOSE"/>
                    </button>
                    <button onClick={this._triggerStartReconfig} className='gor-save-profile-btn'>
                        <FormattedMessage id="msu.configuration.confirm.yes"
                            description="yes and proceed further"
                            defaultMessage="PROCEED"/>
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

export  default connect(mapStateToProps, null)(MsuConfigConfirmation);