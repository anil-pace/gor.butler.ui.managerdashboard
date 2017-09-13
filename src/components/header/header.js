import React  from 'react';
import ReactDOM  from 'react-dom';
import {Link} from 'react-router';
import {
    RECIEVE_HEADER,GET, SOFT_MANUAL, SOFT,HARD,RECEIVE_SHIFT_START_TIME
} from '../../constants/frontEndConstants';
import {stringConfig} from '../../constants/backEndConstants';
import {HEADER_URL, GET_SHIFT_START_TIME_URL} from '../../constants/configConstants'
import {modal} from 'react-redux-modal';
import {getHeaderInfo, getShiftStartTime} from '../../actions/headerAction';
import LogOut from '../../containers/logoutTab';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import HamBurger from '../hamburger/hamburger';
import NotificationsWrapper from '../../containers/notifications/notificationsWrapper';
import ResumeOperation from '../../containers/emergencyProcess/resumeOperation'; 




class Header extends React.Component {
    constructor(props) {
        super(props);
        
        this.setDropdown=this.setDropdown.bind(this);
        this.state={showDropdown: false};
        this._handleDocumentClick=this._handleDocumentClick.bind(this);
        this._showModal = this._showModal.bind(this);


    }

    /**
     * The function will fetch the start time
     * to be displayed in the header.
     * @private
     */
     _getShiftStartTime() {
        let headerData={
            'url': GET_SHIFT_START_TIME_URL,
            'method': GET,
            'cause': RECEIVE_SHIFT_START_TIME,
            'token': this.props.authToken
        }
        this.props.getShiftStartTime(headerData)
    }

    componentDidMount() {
        var username=this.props.username;
        if (username && this.props.authToken) {
            let headerData={
                'url': HEADER_URL + '?username=' + username,
                'method': GET,
                'cause': RECIEVE_HEADER,
                'token': this.props.authToken
            }
            this._getShiftStartTime()
            this.props.getHeaderInfo(headerData)
        }

    }

    componentWillMount() {
        document.addEventListener('click', this._handleDocumentClick, true);
        document.addEventListener('touchend', this._handleDocumentClick, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick, true);
        document.removeEventListener('touchend', this._handleDocumentClick, true);
    }

  

    setDropdown() {
        this.setState({showDropdown: !this.state.showDropdown});
    }

    _handleDocumentClick() {
        if (!(ReactDOM.findDOMNode(this.dropdownNode).contains(event.target) || (this.dropdownValue && ReactDOM.findDOMNode(this.dropdownValue).contains(event.target)))) {
            this.setState({showDropdown: false});
        }
    }

    addModal() {
        modal.add(LogOut, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true // (optional) if you don't wanna show the top right close button
            //.. all what you put in here you will get access in the modal props ;)
        });
    }

    _showModal() {
        modal.add(ResumeOperation, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true
        });
    }

    _processData() {
        var headerInfo={};
        if (this.props.headerInfo && this.props.headerInfo.users.length) {
            headerInfo=Object.assign({}, this.props.headerInfo)
            headerInfo.fullName=(headerInfo.users[0].first_name || '') + ' ' + (headerInfo.users[0].last_name || '');
            headerInfo.designation=headerInfo.users[0].roles[0] || 'butler_ui';
        }
        /**
         * Hard coded start time is replaced
         * with the time fetched in API.
         */
         headerInfo.start=this.context.intl.formatTime(this.props.shift_start_time, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: this.props.timeOffset,
            timeZoneName: 'long',
            hour12: false
        })
         return headerInfo
     }

     


    render() {
        var headerInfo=this._processData(),
        startTime
        if(this.props.shift_start_time){
            startTime = this.context.intl.formatTime(this.props.shift_start_time, {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: this.props.timeOffset,
            timeZoneName: 'long',
            hour12: false
        })
        }
        
        var emergencyDropDown;
        if(!this.props.system_emergency){
            emergencyDropDown = (<section className='gor-hamburger-option'  >
                                <h1><FormattedMessage id="header.zones.status" description='Zone status '
                                            defaultMessage='SYSTEM NORMAL'
                                           /></h1>
                                <p><FormattedMessage id="header.zones.inOperation" description='Zone in operation count '
                                            defaultMessage='{activeZones}/{totalZones} zones in operation'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones===0 ? (this.props.zoneHeader.active_zones).toString(): this.props.zoneHeader.active_zones,
                                                totalZones: this.props.zoneHeader.total_zones===0 ? (this.props.zoneHeader.total_zones).toString():this.props.zoneHeader.total_zones
                                            }}/></p>
                                
                            </section>)
        }
        else if(this.props.system_emergency && this.props.system_data === HARD){
            emergencyDropDown =(<section className='gor-hamburger-option'  >
                                <h1><FormattedMessage id="header.zones.emergency" description='System Emergency'
                                            defaultMessage='SYSTEM STOPPED'
                                           /></h1>
                                <p>{this.props.zoneHeader.active_zones ? <FormattedMessage id="header.zones.inOperation1" description='Zone in operation count '
                                            defaultMessage='{activeZones} zones in operation'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones===0 ? (this.props.zoneHeader.active_zones).toString(): this.props.zoneHeader.active_zones
                                            }}/> : <FormattedMessage id="header.zones.noOperation" description='Zone in operation count '
                                            defaultMessage='No zones in operation'
                                            />}</p>
                                <p><FormattedMessage id="header.option.release" description='release operation option'
                              defaultMessage='Release the Emergency Stop button from the Zigbee box in order
                              to resume operation.'/></p>
                                
                            </section>)
        }
        else if(this.props.system_emergency && this.props.system_data === SOFT_MANUAL  ){
            emergencyDropDown =( <section className='gor-hamburger-option'  >
                                <h1>{this.props.lastEmergencyState === HARD ?<FormattedMessage id="header.zones.emergency.stopped" description='System Emergency'
                                            defaultMessage='SYSTEM STOPPED'
                                           />:<FormattedMessage id="header.zones.emergency.paused" description='System Emergency'
                                            defaultMessage='SYSTEM PAUSED'
                                           />}</h1>
                                <p>{this.props.zoneHeader.active_zones ? <FormattedMessage id="header.zones.inOperation2" description='Zone in operation count '
                                            defaultMessage='{activeZones} zones in operation'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones
                                            }}/> : <FormattedMessage id="header.zones.noOperation" description='Zone in operation count '
                                            defaultMessage='No zones in operation'
                                            />}</p>
                                <button onClick={this._showModal} className="gor-sys-btn">
                                <span className="gor-resume-icon"></span>
                                 <FormattedMessage id="header.button.resume" description='Button text'
                                defaultMessage='Resume System'
                                /></button>
                            </section>)
        }
        else if(this.props.system_emergency && this.props.breached){
            emergencyDropDown =( <section className='gor-hamburger-option'  >
                                <h1>{this.props.zoneHeader.active_zones ? <FormattedMessage id="header.zones.inOperation2" description='Zone in operation count '
                                            defaultMessage='{activeZones} zones in operation'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones
                                            }}/> : <FormattedMessage id="header.zones.noOperation" description='Zone in operation count '
                                            defaultMessage='No zones in operation'
                                            />}</h1>
                                <p><FormattedMessage id="header.zones.inactiveZones" description='Zone in operation count '
                                            defaultMessage='{inactiveZones} {count,plural,=0 {zone} one {zone} other {zones}} paused'
                                            values={{
                                                inactiveZones: (this.props.zoneHeader.total_zones - this.props.zoneHeader.active_zones)
                                            }}/> </p>
                                <button onClick={this._showModal} className="gor-sys-btn">
                                <span className="gor-resume-icon"></span>
                                 <FormattedMessage id="header.button.resume" description='Button text'
                                defaultMessage='Resume System'
                                /></button>
                            </section>)
        }

        return (
                <header className="gorHeader head">
                <div className="mainBlock">

                    <div className="logoWrap">
                        <div>
                            <div className="gor-logo logo"></div>
                        </div>
                    </div>
                    <div className="blockSystem">
                        <div className={"gor-menu-heading "}>
                            <FormattedMessage id="header.butler" description="Header description"
                                         defaultMessage="Butler"/>
                        </div>
                        <div className={"gor-menu-subheading "}>
                            <FormattedMessage id="header.start" description='Start time '
                                            defaultMessage='Start time:{time} '
                                            values={{
                                                time: startTime
                                            }}/>)          
                        </div>
                    </div>  
                </div>
                <div className="blockLeft">
                <NotificationsWrapper />
                    <HamBurger>
                        {(instance) => (
                            <div>
                                <div className="blockSystem">
                                <span className="gor-sys-status"></span>
                                <FormattedMessage id="header.zones.count" description='Zone status count '
                                            defaultMessage='{activeZones}/{totalZones} Zones'
                                            values={{
                                                activeZones: this.props.zoneHeader.active_zones===0 ? (this.props.zoneHeader.active_zones).toString(): this.props.zoneHeader.active_zones,
                                                totalZones: this.props.zoneHeader.total_zones===0 ? (this.props.zoneHeader.total_zones).toString():this.props.zoneHeader.total_zones
                                            }}/>
                                    
                                </div>
                            <div className='gor-hamburger-wrapper' style={(instance.state.menuVisible)?{display:'block'}:{display:'none'}}>
                            <span className='gor-up-arrow'></span>
                            {emergencyDropDown}
                            <section className="gor-all-zone">
                            <Link to="/system/sysOverview" >
                            <FormattedMessage id="header.zones.viewAll" description='View all system details'
                                            defaultMessage='View system details'
                                           /> <bold>></bold>
                            </Link>
                                
                            </section>
                            </div>
                            </div> 
                        )}
                    </HamBurger>
                    <div className="gor-border"/>
                    <div className="dropdown" id="profile">
                        <div className="dropbtn" onClick={this.setDropdown} ref={(node)=> {
                            this.dropdownNode=node;
                        }}>
                            <div className="block">
                                <div className="upperTextClient truncate">
                                    {
                                        headerInfo ? headerInfo.fullName : 'Fetching...'
                                    }
                                </div>
                                <div className="subTextClient">
                                    {headerInfo.designation ? this.context.intl.formatMessage(stringConfig[headerInfo.designation]) : "--"}
                                </div>
                            </div>
                            <div className="block user-icon">


                </div>


                {this.state.showDropdown ? <div className="dropdown-content" ref={(node)=> {
                    this.dropdownValue=node;
                }} onClick={this.addModal.bind(this)}>
                <div className="horizontalDiv">
                </div>
                <div>
                <a href="javascript:void(0)"><FormattedMessage id='header.logout'
                defaultMessage="Logout"
                description="Text for logout"/></a>
                </div>
                </div> : ""}
                </div>
                </div>
                </div>
                </header>
                );
    }
}


Header.contextTypes={
    intl: React.PropTypes.object.isRequired
}
/**
 * Function to pass state values as props
 */

 function mapStateToProps(state, ownProps) {
    return {
        headerInfo: state.headerData.headerInfo,
        shift_start_time: state.headerData.shiftStartTime,
        authToken: state.authLogin.auth_token,
        username: state.authLogin.username,
        system_emergency: state.tabsData.system_emergency || null,
        system_data: state.tabsData.system_data || null,
        breached: state.tabsData.breached,
        lastEmergencyState:state.tabsData.lastEmergencyState || null,
        activeModalKey: state.appInfo.activeModalKey || 0,
        zoneHeader:state.zoningReducer.zoneHeader || {},
        timeOffset: state.authLogin.timeOffset
    }
}
/**
 * Function to dispatch action values as props
 */
 function mapDispatchToProps(dispatch) {
    return {
        getHeaderInfo: function (data) {
            dispatch(getHeaderInfo(data));
        },
        getShiftStartTime: function (data) {
            dispatch(getShiftStartTime(data));
        }
    }
}

export  default connect(mapStateToProps, mapDispatchToProps)(Header);

