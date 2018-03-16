import React  from 'react';
import {FormattedMessage} from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter, filterApplied, auditfilterState, toggleAuditFilter} from '../../actions/filterAction';
import {connect} from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {setTextBoxStatus}  from '../../actions/auditActions';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {
    ANY,
    ALL,
    SKU,
    LOCATION,
    ISSUE_FOUND,
    SPECIFIC_LOCATION_ID,
    SPECIFIC_SKU_ID,
    SPECIFIC_PPS_ID,
    AUDIT_TASK_ID,
    FROM_DATE,
    TO_DATE,
    NOT_YET_STARTED,
    TO_BE_RESOLVED,
    AUDIT_PAUSED,
    AUDIT_DUPLICATED,
    AUDIT_DELETED,
    AUDIT_TYPE,AUDIT_COMPLETED,AUDIT_CANCELLED,AUDIT_CREATED,PENDING,INPROGRESS,
    AUDIT_RESOLVED,AUDIT_LINE_REJECTED,SINGLE,AUDIT_USERLIST,APP_JSON,GET
}from '../../constants/frontEndConstants';
import {USERLIST_URL,PPSLIST_URL} from '../../constants/configConstants';
import {hashHistory} from 'react-router'
import {setAuditSpinner} from './../../actions/auditActions';
import {userRequest} from '../../actions/userActions';
import {mappingArray,arrayDiff} from '../../utilities/utils';
import {showNotificationFilter} from '../../actions/notificationAction';


class NotificatonFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tokenSelected: { "COMPONENT": [ALL]}, searchQuery: {},
            defaultToken: { "COMPONENT": [ALL]}
        };
         this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }

    _closeFilter() {
        var filterState=!this.props.showFilter;
        this.props.showNotificationFilter(filterState);
    }

     componentDidMount(){
        let userData={
                'url':USERLIST_URL,
                'method':GET,
                'cause':AUDIT_USERLIST,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'token':sessionStorage.getItem('auth_token')
            }
        this.props.userRequest(userData);

  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auditFilterState && JSON.stringify(this.state) !== JSON.stringify(nextProps.auditFilterState)) {
            this.setState(nextProps.auditFilterState)
        }
        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if(nextProps.auditDetail.length>0 && JSON.stringify(nextProps.auditDetail)!==JSON.stringify(this.props.auditDetail)){
            this.props.showTableFilter(false);
        }

    }

    _processAuditSearchField() {
        const filterInputFields=[{
            value: "NOTIFICATION",
            label: <FormattedMessage id="audit.inputField.notification" defaultMessage="NOTIFICATION"/>
        },
       
            {
                value: FROM_DATE,
                by2value:true,
                type:"date",
                label: <FormattedMessage id="audit.inputField.fromdate" defaultMessage="FROM DATE"/>

            },
            {
                value: TO_DATE,
                by2value:true,
                type:"date",
                label: <FormattedMessage id="audit.inputField.todate" defaultMessage="TO DATE"/>
            },
            ];

        var inputValue=this.state.searchQuery;
        var textboxStatus=this.props.textboxStatus || {};
        var inputField=<FilterInputFieldWrap inputText={filterInputFields} 
                                             handleInputText={this._handleInputQuery.bind(this)}
                                             inputValue={inputValue} textboxStatus={textboxStatus}/>
        return inputField;
    }

    _processFilterToken() {
       
        var tokenStatusField={
            value: "COMPONENT",
            label: <FormattedMessage id="audit.tokenfield.component" defaultMessage="COMPONENT"/>
        };
       
        const labelC2=[
            {value: ALL, label: <FormattedMessage id="audit.token2.all" defaultMessage="Any"/>},
            {value: "EMERGENCY", label: <FormattedMessage id="audit.token2.emergency" defaultMessage="Emergency"/>},
            {value: "ORDER", label: <FormattedMessage id="audit.token2.order" defaultMessage="Order"/>},
            {value: "SYSTEM", label: <FormattedMessage id="audit.token2.system" defaultMessage="System"/>},
           
        ];
      
        var selectedToken=this.state.tokenSelected;
        var column1=<FilterTokenWrap field={tokenStatusField} tokenCallBack={this._handelTokenClick.bind(this)}
                                     label={labelC2} selectedToken={selectedToken}/>;
  
        
        var columnDetail={column1token: column1,};
        return columnDetail;
    }

   
        _handelTokenClick(field,value,state) {
            this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
            
        }
    

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)});

    }

    _applyFilter() {
        var filterState=this.state,_query={}

      
        if (filterState.tokenSelected["COMPONENT"] && filterState.tokenSelected["COMPONENT"][0] !== ALL) {
            _query.status=filterState.tokenSelected["COMPONENT"]
        }
       

        if (filterState.searchQuery && filterState.searchQuery[AUDIT_TASK_ID]) {
            _query.taskId=filterState.searchQuery[AUDIT_TASK_ID]
        }
       
         if (filterState.searchQuery && filterState.searchQuery[FROM_DATE]) {
            _query.fromDate=filterState.searchQuery[FROM_DATE]
        }
         if (filterState.searchQuery && filterState.searchQuery[TO_DATE]) {
            _query.toDate=filterState.searchQuery[TO_DATE]
        }

        hashHistory.push({pathname: "/auditlisting", query: _query})
    }

    _clearFilter() {
        this.props.auditfilterState({
            tokenSelected: {"COMPONENT": [ALL],}, searchQuery: {},
            defaultToken: { "COMPONENT": [ALL],}
        })
       // hashHistory.push({pathname: "/auditlisting", query: {}});
    }

    render() {
        var noOrder=this.props.noResultFound;
        var auditSearchField=this._processAuditSearchField();
        var auditFilterToken=this._processFilterToken();
        return (
            <div>
                <Filter>
                                <div className="gor-filter-header">
                    <div className="gor-filter-header-h1">
                         <FormattedMessage id="gor.filter.filterLabel" description="label for filter" 
            defaultMessage="Filter data"/>
                    </div>
                    <div className="gor-filter-header-h2" onClick={this._closeFilter}>
                        <FormattedMessage id="gor.filter.hide" description="label for hide" 
                            defaultMessage="Hide"/>
                    </div>
                 </div>
                    <div>{noOrder?
                            <div className="gor-no-result-filter"><FormattedMessage id="gor.filter.noResult" description="label for no result" 
                            defaultMessage="No results found, please try again"/></div>:""}
                    </div>
                     <div className="gor-filter-body">
                         <div className="gor-filter-body-input-wrap"> 
                            {auditSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {auditFilterToken.column1token}
                            </div>
                            

                         </div>
                        
                         
                     </div>
                 <div className="gor-filter-footer"> 
                    <span className="gor-filter-footer-h2" onClick={this._clearFilter}>
                         <FormattedMessage id="gor.filter.reset" description="label for reset" 
                            defaultMessage="Reset"/>
                    </span>
                    <div className="gor-filter-btn-wrap">
                        <button className='gor-add-btn' onClick={this._applyFilter}>
                            {!this.props.auditSpinner? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
                        </button>


                    </div> 
                 </div>
                </Filter>
            </div>
        );
    }
}
;


function mapStateToProps(state, ownProps) {
    return {
        showFilter:  state.notificationReducer.notificationFilterState || false,
        auditSpinner: state.spinner.auditSpinner || false,
        totalAudits: state.recieveAuditDetail.totalAudits || 0,
        noResultFound: state.recieveAuditDetail.noResultFound || 0,
        auditFilterState: state.filterInfo.auditFilterState,
        auditFilterStatus: state.filterInfo.auditFilterStatus,
        textboxStatus: state.auditInfo.textBoxStatus || {},
        auditUserList:state.auditInfo.auditUserList ||[]
    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        showTableFilter: function (data) {
            dispatch(showTableFilter(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        setTextBoxStatus: function (data) {
            dispatch(setTextBoxStatus(data));
        },
        auditfilterState: function (data) {
            dispatch(auditfilterState(data));
        },
        toggleAuditFilter: function (data) {
            dispatch(toggleAuditFilter(data));
        },
        setAuditSpinner: function (data) {
            dispatch(setAuditSpinner(data))
        },
        showNotificationFilter: function (data) {
            dispatch(showNotificationFilter(data));
        },
        userRequest: function(data){ dispatch(userRequest(data)); }

    }
};

NotificatonFilter.PropTypes={
    showFilter: React.PropTypes.bool,
    auditSpinner: React.PropTypes.bool,
    totalAudits: React.PropTypes.number,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    auditFilterState: React.PropTypes.object,
    auditFilterStatus: React.PropTypes.bool,
    setTextBoxStatus:React.PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificatonFilter) ;