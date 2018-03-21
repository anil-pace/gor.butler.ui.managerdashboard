import React  from 'react';
import {FormattedMessage, FormattedPlural} from 'react-intl';
import {validateID, validateName, validatePassword, resetForm} from '../../actions/validationActions';
import {userRequest} from '../../actions/userActions';
import {
    ADD_USER,
    CHECK_ID,
    ERROR,
    SUCCESS,
    INFO,
    GET_ROLES,
    GET,
    APP_JSON,
    POST
} from '../../constants/frontEndConstants';
import {BUTLER_SUPERVISOR, BUTLER_UI, pwdDesc} from  '../../constants/backEndConstants';
import {ROLE_URL, CHECK_USER, HEADER_URL} from '../../constants/configConstants';
import {INVALID_ID, INVALID_FORMAT, TYPE_SUCCESS, MG_PWD, OP_PWD} from '../../constants/messageConstants';
import {connect} from 'react-redux';
import FieldError from '../../components/fielderror/fielderror';
//import UserRoles from './userRoles';
import {nameStatus, passwordStatus, idStatus} from '../../utilities/fieldCheck';
import Dropdown from '../../components/dropdown/dropdown';
import MsuRackFlex from './msuRackFlex';
import UtilityDropDown from "../../components/utilityComponents/utilityDropdownWrap";

var xyz = [
  {"rack_type_rec":[{"barcodes":["A.05","A.06"],"length":32,"orig_coordinates":[0,5],"height":33},{"barcodes":["A.03","A.04"],"length":32,"orig_coordinates":[32,5],"height":33},{"barcodes":["A.01","A.02"],"length":32,"orig_coordinates":[64,5],"height":33},{"barcodes":["B.05","B.06"],"length":32,"orig_coordinates":[0,43],"height":33},{"barcodes":["B.03","B.04"],"length":32,"orig_coordinates":[32,43],"height":33},{"barcodes":["B.01","B.02"],"length":32,"orig_coordinates":[64,43],"height":33},{"barcodes":["C.05","C.06"],"length":32,"orig_coordinates":[0,81],"height":33},{"barcodes":["C.03","C.04"],"length":32,"orig_coordinates":[32,81],"height":33},{"barcodes":["C.01","C.02"],"length":32,"orig_coordinates":[64,81],"height":33},{"barcodes":["D.05","D.06"],"length":32,"orig_coordinates":[0,119],"height":33},{"barcodes":["D.03","D.04"],"length":32,"orig_coordinates":[32,119],"height":33},{"barcodes":["D.01","D.02"],"length":32,"orig_coordinates":[64,119],"height":33},{"barcodes":["E.05","E.06"],"length":32,"orig_coordinates":[0,157],"height":33},{"barcodes":["E.03","E.04"],"length":32,"orig_coordinates":[32,157],"height":33},{"barcodes":["E.01","E.02"],"length":32,"orig_coordinates":[64,157],"height":33}],"slot_type":"slot","rack_width":96,"slot_barcodes":["038.1.B.01","038.1.B.02"]}
];

class ChangeRackType extends React.Component {
    constructor(props) {
        super(props);
    }

    removeThisModal() {
        this.props.resetForm();
        this.props.removeModal();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth_token) {
            this.removeThisModal();
        }
    }

    componentDidMount() {
        let userData={
            'url': ROLE_URL,
            'method': GET,
            'cause': GET_ROLES,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        if (!this.props.roleList) {
            this.props.userRequest(userData);
        }
    }

    _checkId() {
        let userid=this.userId.value, idInfo;
        idInfo=idStatus(userid);
        this.props.validateID(idInfo);
        if (idInfo.type) {
            let userData={
                'url': CHECK_USER + userid,
                'method': GET,
                'cause': CHECK_ID,
                'contentType': APP_JSON,
                'accept': APP_JSON,
                'token': this.props.auth_token
            }
            this.props.userRequest(userData);
        }
    }

    _checkName() {
        let firstname=this.firstName.value, lastname=this.lastName.value, nameInfo;
        nameInfo=nameStatus(firstname, lastname);
        this.props.validateName(nameInfo);
        return nameInfo.type;
    }

    _checkPwd() {
        let pswd=this.pswd.value, confirmPswd=this.confirmPswd.value, passwordInfo,
            roleSelected=this.props.roleSet;
        passwordInfo=passwordStatus(pswd, confirmPswd, roleSelected);
        this.props.validatePassword(passwordInfo);
        return passwordInfo.type;
    }

    _handleAddUser(e) {
        e.preventDefault();
        let pswd, confirmPswd, role, opt, userid, firstname, lastname;

        userid=this.userId.value;
        firstname=this.firstName.value;
        lastname=this.lastName.value;
        pswd=this.pswd.value;
        confirmPswd=this.confirmPswd.value;

        if (!this.props.idCheck.type) {
            this._checkId();
            return;
        }
        if (!this.props.nameCheck.type) {
            if (!this._checkName())
                return;
        }
        if (!this._checkPwd())
            return;

        role=this.props.roleSet ? this._getId(this.props.roleSet) : this._getId(BUTLER_UI);

        let formdata={
            "first_name": firstname,
            "last_name": lastname,
            "username": userid,
            "role_id": role,
            "password": pswd,
            "password_confirm": confirmPswd

        };
        let userData={
            'url': HEADER_URL,
            'formdata': formdata,
            'method': POST,
            'cause': ADD_USER,
            'contentType': APP_JSON,
            'accept': APP_JSON,
            'token': this.props.auth_token
        }
        this.props.userRequest(userData);
        this.removeThisModal();
    }

    _getId(role) {
        let roles=this.props.roleList, len;
        len=roles.length;
        for (let i=0; i < len; i++) {
            if (roles[i].name== role) {
                return roles[i].id;
            }
        }
        return null;
    }

    render() {

        let defaultOption=<FormattedMessage id="msuConfig.dropdown" description="pickPerformance dropdown label" defaultMessage="Select destination type"/>

        let putPerformance=<FormattedMessage id="msuConfig.dropdown" description="putPerformance dropdown label" defaultMessage="PPS Put Performance"/>
              
        let auditPerformance=<FormattedMessage id="msuConfig.dropdown" description="auditPerformance dropdown label" defaultMessage="PPS Audit Performance"/>
              

        const item=[
                  { value: 'Select destination type', label: defaultOption },
                  { value: 'PPS_PUT_PERFORMANCE', label: putPerformance },
                  { value: 'PPS_AUDIT_PERFORMANCE', label: auditPerformance },
        ];


        let tick=(<div className='gor-tick'/>);
        return (
            <div style={{marginTop:"15vh"}}>
                <div className="gor-smmodal-content">
                    <div className='gor-smmodal-head'>
                        <div className='gor-usr-add'><FormattedMessage id="msuConfig.add.heading" description='Heading for change rack type' defaultMessage='Change destination type'/>
                            
                        </div>
                        <span className="close" onClick={this.removeThisModal.bind(this)}>×</span>
                    </div>
                    <div className='gor-smmodal-body'>
                        <div className='gor-body-content'>
                            <div className="sourceWrapper">
                                <div className="sourceTypeHeading">
                                    <FormattedMessage id="msuConfig.sourceType.heading" description='Heading for source type' defaultMessage='Source Type: B'/>
                                </div>

                                <div className="rackWrapper">
                                    <MsuRackFlex rackDetails={xyz[0].rack_type_rec} slotBarcodes={xyz[0].slot_barcodes} rackWidth={xyz[0].rack_width} />
                                    {/*<MsuRackFlex rackDetails={this.props.rackData.rack_type_rec} slotBarcodes={this.props.rackData.slot_barcodes} rackWidth={this.props.rackData.rack_width} putDirectionFlex={this.props.putDirection} />*/}
                                </div>

                            </div>

                            <div className="destWrapper">

                                {/*<UtilityDropDown
                                      items={modes}
                                      dropdownLabel={this.context.intl.formatMessage(
                                        messages.downloadRprtsCategoryLabel
                                      )}
                                      placeHolderText={this.context.intl.formatMessage(
                                        messages.downloadRprtsCategoryPlchldr
                                      )}
                                      changeMode={this._changeReportCategory.bind(this)}
                                      currentState={currentCategoryState}
                                    />*/}
                                <div style={{width: "100%"}} className="Order-Stats-Drop">
                                    <Dropdown optionDispatch={this.props.renderStatsWidget} items={item} styleClass={'ddown'} currentState={item[0]}/>
                                </div>

                                <div className="rackWrapper">
                                    <MsuRackFlex rackDetails={xyz[0].rack_type_rec} slotBarcodes={xyz[0].slot_barcodes} rackWidth={xyz[0].rack_width} />
                                    {/*<MsuRackFlex rackDetails={this.props.rackData.rack_type_rec} slotBarcodes={this.props.rackData.slot_barcodes} rackWidth={this.props.rackData.rack_width} putDirectionFlex={this.props.putDirection} />*/}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="gor-smmodal-footer">
                        <div className="gor-footer-msg">
                             <span> Select a destination type in order to block put. </span>
                        </div>
                        <div className="gor-button-wrap">
                            <button className={this.props.botFilterStatus ? "gor-filterBtn-applied" : "gor-filterBtn-btn"} onClick={this._releaseMSU}>
                                <FormattedMessage id="gor.msuConfig.blockPutChangeType" description="button label for block put & change type" defaultMessage="BLOCK PUT AND CHANGE TYPE"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ChangeRackType.contextTypes={
    intl: React.PropTypes.object.isRequired
}
function mapStateToProps(state, ownProps) {
    return {
        idCheck: state.appInfo.idInfo || {},
        nameCheck: state.appInfo.nameInfo || {},
        passwordCheck: state.appInfo.passwordInfo || {},
        roleList: state.appInfo.roleList || [],
        roleSet: state.appInfo.roleSet || null,
        auth_token: state.authLogin.auth_token
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        userRequest: function (data) {
            dispatch(userRequest(data));
        },
        validateID: function (data) {
            dispatch(validateID(data));
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRackType) ;
