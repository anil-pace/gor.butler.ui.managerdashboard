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

class AuditFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tokenSelected: {"AUDIT TYPE": [ANY], "STATUS": [ALL],"CREATED BY":[ALL]}, searchQuery: {},
            defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL], "CREATED BY":[ALL]}
        };
         this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }

    _closeFilter() {
        var filterState=!this.props.showFilter;
        this.props.showTableFilter(filterState);
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
            value: AUDIT_TASK_ID,
            label: <FormattedMessage id="audit.inputField.id" defaultMessage="AUDIT ID"/>
        },
        {
                value: SPECIFIC_PPS_ID,
                label: <FormattedMessage id="audit.inputField.pps" defaultMessage="PPS ID"/>
            },
            {
                value: SPECIFIC_SKU_ID,
                label: <FormattedMessage id="audit.inputField.sku" defaultMessage="SKU ID"/>
            },
            {
                value: SPECIFIC_LOCATION_ID,
                label: <FormattedMessage id="audit.inputField.location" defaultMessage="LOCATION ID"/>
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
        var tokenAuditTypeField={
            value: "AUDIT TYPE",
            label: <FormattedMessage id="audit.tokenfield.typeAudit" defaultMessage="AUDIT TYPE"/>
        };
        let userArr=this.props.auditUserList;
        let labelC3=[
            {value: ALL, label: <FormattedMessage id="audit.token3.all" defaultMessage="Any"/>}
        ];
        userArr.forEach((data)=>{
         labelC3.push(
         {
            value:data,
            label:<FormattedMessage id="audit.token3.name" defaultMessage={data}/>
         }
            )   
        });
       
        var tokenStatusField={
            value: "STATUS",
            label: <FormattedMessage id="audit.tokenfield.STATUS" defaultMessage="STATUS"/>
        };
         var tokenCreatedByField={
            value: "CREATED BY",
            label: <FormattedMessage id="audit.tokenfield.createdby" defaultMessage="CREATED BY"/>
        };
        const labelC1=[
            {value: ANY, label: <FormattedMessage id="audit.token1.all" defaultMessage="Any"/>},
            {value: SKU, label: <FormattedMessage id="audit.token1.sku" defaultMessage="SKU"/>},
            {value: LOCATION, label: <FormattedMessage id="audit.token1.location" defaultMessage="Location"/>},
                    ];
        const labelC2=[
            {value: ALL, label: <FormattedMessage id="audit.token2.all" defaultMessage="Any"/>},
            {value: NOT_YET_STARTED, label: <FormattedMessage id="audit.token2.notyetstarted" defaultMessage="Not yet started"/>},
            {value: INPROGRESS, label: <FormattedMessage id="audit.token2.inProgress" defaultMessage="In progress"/>},
            {value: TO_BE_RESOLVED, label: <FormattedMessage id="audit.token2.toberesolved" defaultMessage="To be resolved"/>},
            {value: AUDIT_CANCELLED, label: <FormattedMessage id="audit.token2.cancelled" defaultMessage="Cancelled"/>},
            {value: AUDIT_COMPLETED, label: <FormattedMessage id="audit.token2.completed" defaultMessage="Completed"/>},
            {value: AUDIT_PAUSED, label: <FormattedMessage id="audit.token2.paused" defaultMessage="Paused"/>},
            {value: AUDIT_DUPLICATED, label: <FormattedMessage id="audit.token2.duplicated" defaultMessage="Duplicated"/>},
            {value: AUDIT_DELETED, label: <FormattedMessage id="audit.token2.deleted" defaultMessage="Deleted"/>}

        ];
        // const labelC3=[
        //     {value: ALL, label: <FormattedMessage id="audit.token3.all" defaultMessage="Any"/>},
        //     {value: 'SYSTEM', label: <FormattedMessage id="audit.token3.system" defaultMessage="System"/>},
        //     {value: 'RAJA', label: <FormattedMessage id="audit.token3.raja" defaultMessage="Raja Dey"/>}
        
        // ];
        var selectedToken=this.state.tokenSelected;
        var column1=<FilterTokenWrap field={tokenStatusField} tokenCallBack={this._handelTokenClick.bind(this)}
                                     label={labelC2} selectedToken={selectedToken}/>;
        var column2=<FilterTokenWrap field={tokenAuditTypeField} tokenCallBack={this._handelTokenClick.bind(this)}
                                     label={labelC1} selectedToken={selectedToken} selection={SINGLE}/>;
        var column3=<FilterTokenWrap field={tokenCreatedByField} tokenCallBack={this._handelTokenClick.bind(this)}
                                     label={labelC3} selectedToken={selectedToken} />;
        
        var columnDetail={column1token: column1, column2token: column2, column3token:column3};
        return columnDetail;
    }

    _handelTokenClick(field, value, state) {
        var tempArray=[SPECIFIC_SKU_ID,SPECIFIC_LOCATION_ID];
        var obj={},queryField,tokentoRemove;
        var selectedToken=this.state.tokenSelected['AUDIT TYPE'];
        var token=[value];
        this.setState({tokenSelected: handelTokenClick(field, value, state, this.state)});

        if (state !== 'addDefault') {
            obj.name=mappingArray(selectedToken);
            tokentoRemove=mappingArray(token,selectedToken);
            queryField= (selectedToken.toString()===ANY)?tokentoRemove:arrayDiff(tempArray,obj.name);
            if (queryField && queryField.length!==0){
                this.setState({searchQuery: handleInputQuery("", queryField, this.state)});
            }
            if(field=="AUDIT TYPE")
            this.props.setTextBoxStatus(obj);
        }
        else {
            if(field=="AUDIT TYPE")
            this.props.setTextBoxStatus(obj);
        }
    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)});

    }

    _applyFilter() {
        var filterState=this.state,_query={}

        if(filterState.tokenSelected[AUDIT_TYPE] && filterState.tokenSelected[AUDIT_TYPE][0]!==ANY){
            _query.auditType=filterState.tokenSelected[AUDIT_TYPE]
        }
        if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== ALL) {
            _query.status=filterState.tokenSelected["STATUS"]
        }
         if (filterState.tokenSelected["CREATED BY"] && filterState.tokenSelected["CREATED BY"][0] !== ALL) {
            _query.createdBy=filterState.tokenSelected["CREATED BY"]
        }

        if (filterState.searchQuery && filterState.searchQuery[AUDIT_TASK_ID]) {
            _query.taskId=filterState.searchQuery[AUDIT_TASK_ID]
        }
        if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_SKU_ID]) {
            _query.skuId=filterState.searchQuery[SPECIFIC_SKU_ID]
        }
        if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_LOCATION_ID]) {
            _query.locationId=filterState.searchQuery[SPECIFIC_LOCATION_ID]
        }
         if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_PPS_ID]) {
            _query.ppsId=filterState.searchQuery[SPECIFIC_PPS_ID]
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
            tokenSelected: {"AUDIT TYPE": [ANY], "STATUS": [ALL], "CREATED BY":[ALL]}, searchQuery: {},
            defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL], "CREATED BY":[ALL]}
        })
        hashHistory.push({pathname: "/auditlisting", query: {}});
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
                            <div className="gor-filter-body-filterToken-section1">
                                {auditFilterToken.column2token}
                            </div>
                            <div className="gor-filter-body-filterToken-section2">
                                {auditFilterToken.column3token}
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
        showFilter: state.filterInfo.filterState || false,
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
        userRequest: function(data){ dispatch(userRequest(data)); }

    }
};

AuditFilter.PropTypes={
    showFilter: React.PropTypes.bool,
    auditSpinner: React.PropTypes.bool,
    totalAudits: React.PropTypes.number,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    auditFilterState: React.PropTypes.object,
    auditFilterStatus: React.PropTypes.bool,
    setTextBoxStatus:React.PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(AuditFilter) ;