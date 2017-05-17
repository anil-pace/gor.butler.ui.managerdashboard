import React  from 'react';
import ReactDOM  from 'react-dom';
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
    SPECIFIC_SKU_ID,
    SPECIFIC_LOCATION_ID,
    AUDIT_TASK_ID,
    AUDIT_TYPE,AUDIT_COMPLETED,AUDIT_CREATED,PENDING,INPROGRESS,
    AUDIT_RESOLVED,AUDIT_LINE_REJECTED,SINGLE
}from '../../constants/frontEndConstants';
import {hashHistory} from 'react-router'
import {setAuditSpinner} from './../../actions/auditActions';

class AuditFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenSelected: {"AUDIT TYPE": [ANY], "STATUS": [ALL]}, searchQuery: {},
            defaultToken: {"AUDIT TYPE": [ANY], "STATUS": [ALL]}
        };
    }
    componentWillMount(){
        var obj={};
        obj.name=AUDIT_TASK_ID;
        this.props.setTextBoxStatus(obj);
    }


    _closeFilter() {
        var filterState = !this.props.showFilter;
        this.props.showTableFilter(filterState);
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


    _mappingArray(selectedToken,type) {
        var mappingArray = [];
        selectedToken.map(function (value, i) {
            if (value == "sku") {
                mappingArray.push(SPECIFIC_SKU_ID)
            }
            else if (value == "location") {
                mappingArray.push(SPECIFIC_LOCATION_ID)
            }
            //Raja
            // else {
            //     mappingArray.push(SPECIFIC_SKU_ID, SPECIFIC_LOCATION_ID);
            // }

        });
        if(!type)
        {
        mappingArray.push(AUDIT_TASK_ID);
        }
        return mappingArray;
    }

    _processAuditSearchField() {
        const filterInputFields = [{
            value: AUDIT_TASK_ID,
            label: <FormattedMessage id="audit.inputField.id" defaultMessage="AUDIT TASK ID"/>
        },
            {
                value: SPECIFIC_SKU_ID,
                label: <FormattedMessage id="audit.inputField.sku" defaultMessage="SPECIFIC SKU ID"/>
            },
            {
                value: SPECIFIC_LOCATION_ID,
                label: <FormattedMessage id="audit.inputField.location" defaultMessage="SPECIFIC LOCATION ID"/>
            }];
        var inputValue = this.state.searchQuery;
        var textboxStatus = this.props.textboxStatus || {};
        var inputField = <FilterInputFieldWrap inputText={filterInputFields}
                                               handleInputText={this._handleInputQuery.bind(this)}
                                               inputValue={inputValue} textboxStatus={textboxStatus}/>
        return inputField;
    }

    _processFilterToken() {
        var tokenAuditTypeField = {
            value: "AUDIT TYPE",
            label: <FormattedMessage id="audit.tokenfield.typeAudit" defaultMessage="AUDIT TYPE"/>
        };
        var tokenStatusField = {
            value: "STATUS",
            label: <FormattedMessage id="audit.tokenfield.STATUS" defaultMessage="STATUS"/>
        };
        const labelC1 = [
            {value: ANY, label: <FormattedMessage id="audit.token1.all" defaultMessage="Any"/>},
            {value: SKU, label: <FormattedMessage id="audit.token1.sku" defaultMessage="SKU"/>},
            {value: LOCATION, label: <FormattedMessage id="audit.token1.location" defaultMessage="Location"/>}
        ];
        const labelC2 = [
            {value: ALL, label: <FormattedMessage id="audit.token2.all" defaultMessage="Any"/>},
            {value: ISSUE_FOUND, label: <FormattedMessage id="audit.token2.issueFound" defaultMessage="Issue found"/>},
            {value: AUDIT_LINE_REJECTED, label: <FormattedMessage id="audit.token2.rejected" defaultMessage="Rejected"/>},
            {value: AUDIT_RESOLVED, label: <FormattedMessage id="audit.token2.resolved" defaultMessage="Resolved"/>},
            {value: INPROGRESS, label: <FormattedMessage id="audit.token2.inProgress" defaultMessage="In progress"/>},
            {value: PENDING, label: <FormattedMessage id="audit.token2.pending" defaultMessage="Pending"/>},
            {value: AUDIT_CREATED, label: <FormattedMessage id="audit.token2.created" defaultMessage="Created"/>},
            {value: AUDIT_COMPLETED, label: <FormattedMessage id="audit.token2.completed" defaultMessage="Completed"/>}

        ];
        var selectedToken = this.state.tokenSelected;
        var column1 = <FilterTokenWrap field={tokenStatusField} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC2} selectedToken={selectedToken}/>;
        var column2 = <FilterTokenWrap field={tokenAuditTypeField} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC1} selectedToken={selectedToken} selection={SINGLE}/>;
        var columnDetail = {column1token: column1, column2token: column2};
        return columnDetail;
    }
 _arrayDiff(mainArray,arraytoSearch ) {
    return mainArray.filter(function (a) {
        return arraytoSearch.indexOf(a) == -1;
    });
}

    _handelTokenClick(field, value, state) {
        var tempArray=[SPECIFIC_SKU_ID,SPECIFIC_LOCATION_ID];
        var obj = {},queryField,toRemove;
        var selectedToken = this.state.tokenSelected['AUDIT TYPE'];
        var token=[value];
        this.setState({tokenSelected: handelTokenClick(field, value, state, this.state)});
       
        if (state !== 'addDefault') {
            obj.name = this._mappingArray(selectedToken);
            toRemove=this._mappingArray(token,selectedToken);
            queryField= selectedToken.toString()==ANY?toRemove:this._arrayDiff(tempArray,obj.name);
           (queryField && queryField.length!==0)? this.setState({searchQuery: handleInputQuery("", queryField, this.state)}):"";
            this.props.setTextBoxStatus(obj);
        }
        else {
            this.props.setTextBoxStatus(obj);
        }
    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)});

    }

    _applyFilter() {
        var filterState = this.state,_query={}

        if(filterState.tokenSelected[AUDIT_TYPE] && filterState.tokenSelected[AUDIT_TYPE][0]!==ANY){
            _query.auditType=filterState.tokenSelected[AUDIT_TYPE]
        }
        if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== ALL) {
            _query.status=filterState.tokenSelected["STATUS"]
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

        hashHistory.push({pathname: "/audit", query: _query})
    }

    _clearFilter() {
        //Raja
        // var selectedToken=[];
        // selectedToken[0]=ANY;
        // var obj=this._mappingArray(selectedToken);
        var obj={};
        obj.name=AUDIT_TASK_ID;
        this.props.setTextBoxStatus(obj);
        hashHistory.push({pathname: "/audit", query: {}});
    }

    render() {
        var noOrder = this.props.totalAudits ? false : true;
        var auditSearchField = this._processAuditSearchField();
        var auditFilterToken = this._processFilterToken();
        return (
            <div>
                <Filter hideFilter={this._closeFilter.bind(this)}
                        clearFilter={this._clearFilter.bind(this)}
                        searchField={auditSearchField}
                        filterTokenC1={auditFilterToken.column1token}
                        filterTokenC2={auditFilterToken.column2token}
                        formSubmit={this._applyFilter.bind(this)}
                        responseFlag={this.props.auditSpinner}
                        noDataFlag={noOrder}
                />
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
        auditFilterState: state.filterInfo.auditFilterState,
        auditFilterStatus: state.filterInfo.auditFilterStatus,
        textboxStatus: state.auditInfo.textBoxStatus || {}
    };
}

var mapDispatchToProps = function (dispatch) {
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
    }
};

AuditFilter.PropTypes = {
    showFilter: React.PropTypes.bool,
    auditSpinner: React.PropTypes.bool,
    totalAudits: React.PropTypes.number,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    auditFilterState: React.PropTypes.object,
    auditFilterStatus: React.PropTypes.bool
};


export default connect(mapStateToProps, mapDispatchToProps)(AuditFilter) ;