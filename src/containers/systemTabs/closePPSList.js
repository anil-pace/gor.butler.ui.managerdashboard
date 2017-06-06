import React  from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {ERROR, GET_ROLES, EDIT_USER, SUCCESS, GET, APP_JSON, PUT} from '../../constants/frontEndConstants';


class ClosePPSList extends React.Component {
    constructor(props) {
        super(props);
        
    }

    removeThisModal() {
        //this.props.resetForm();
        this.props.removeModal();
    }
    _handleClosePPS(e) {
        e.preventDefault()
    }

    render() {
        let tick=(<div className='gor-tick'/>);
        return (
            <div>
                <div className="gor-modal-content pps-close">
                    <div className='gor-modal-head'>
                        <div className='gor-usr-add'>{this.props.heading}
                           
                        </div>
                        <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
                    </div>
                    <div className='gor-modal-body'>
                        <form action="#" id="editUserForm" ref={node=> {
                            this.editUserForm=node
                        }}
                              onSubmit={(e)=> this._handleClosePPS(e)}>
                    <div className="pps-close-wrap">
                    <div className="pps-close-head">
                      <div className="left-sec"><label>Close or Force close PPS</label></div>
                      <div className="right-sec">
                        <a href="javascript:void(0)" className="close-all-link">CLOSE ALL</a>
                        <a href="javascript:void(0)" className="fclose-all-link">FORCE CLOSE ALL</a>
                      </div>
                    </div>
                    <div className="close-pps-table">

                    </div>
                    </div>  
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


/*var mapDispatchToProps=function (dispatch) {
    return {
        userRequest: function (data) {
            dispatch(userRequest(data));
        },
        validateName: function (data) {
            dispatch(validateName(data));
        },
        validatePassword: function (data) {
            dispatch(validatePassword(data));
        },
        resetForm: function () {
            dispatch(resetForm());
        }
    }
};*/

export default connect(null, null)(ClosePPSList);