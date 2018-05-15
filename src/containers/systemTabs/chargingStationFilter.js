import React  from 'react';
import {FormattedMessage} from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {
    showTableFilter,
    filterApplied,
    chargingstationfilterState,
    toggleChargingFilter
} from '../../actions/filterAction';
import {updateSubscriptionPacket} from '../../actions/socketActions';
import {connect} from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';

import {hashHistory} from 'react-router'
class ChargingStationFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tokenSelected: {"DOCKING_STATUS": ["all"], "OPERATING_MODE": ["all"]}, searchQuery: {},
            defaultToken: {"DOCKING_STATUS": ["all"], "OPERATING_MODE": ["all"]}
        };
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
        this._applyFilter = this._applyFilter.bind(this);
    }


    _closeFilter() {
        //let filterState=!this.props.showFilter;
        this.props.showChargingStationFilter(false);
    }


    componentWillReceiveProps(nextProps) {
        /**
         * It will update the state as soon as
         * filters are cleared.
         */
        if (nextProps.filterState && JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)) {
            this.setState(nextProps.filterState)
        }

        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if (nextProps.chargersData.length > 0 && JSON.stringify(nextProps.chargersData) !== JSON.stringify(this.props.chargersData)) {
            this.props.showChargingStationFilter(false);
        }
    }


    _processChargingSearchField() {
        var filterInputFields=[{
            value: "CHARGING STATION ID",
            label: <FormattedMessage id="charging.inputField.id" defaultMessage="CHARGING STATION ID"/>
        }];
        var inputValue=this.state.searchQuery;
        var inputField=<FilterInputFieldWrap inputText={filterInputFields}
                                               handleInputText={this._handleInputQuery.bind(this)}
                                               inputValue={inputValue}/>
        return inputField;

    }

    _processFilterToken() {
        let tokenField1={
            value: "DOCKING_STATUS",
            label: <FormattedMessage id="charging.token.status" defaultMessage="DOCKING STATUS"/>
        };
        let tokenField2={
            value: "OPERATING_MODE",
            label: <FormattedMessage id="charging.token.timePeriod" defaultMessage="OPERATING MODE"/>
        };
        let labelC1=[
            {value: 'all', label: <FormattedMessage id="charging.STATUS.all" defaultMessage="Any"/>},
            {value: 'connected', label: <FormattedMessage id="charging.STATUS.breach" defaultMessage="Connected"/>},
            {
                value: 'disconnected',
                label: <FormattedMessage id="charging.STATUS.pending" defaultMessage="Disconnected"/>
            }
        ];
        let labelC2=[
            {value: 'all', label: <FormattedMessage id="charging.timePeriod.all" defaultMessage="Any"/>},
            {value: 'manual', label: <FormattedMessage id="charging.timePeriod.oneHr" defaultMessage="Manual"/>},
            {value: 'auto', label: <FormattedMessage id="charging.timePeriod.twoHR" defaultMessage="Auto"/>}
        ];
        let selectedToken=this.state.tokenSelected;
        let column1=<FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC1} selectedToken={selectedToken}/>;
        let column2=<FilterTokenWrap field={tokenField2} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC2} selectedToken={selectedToken}/>;
        let columnDetail={column1token: column1, column2token: column2};
        return columnDetail;
    }

    _handelTokenClick(field, value, state) {
        this.setState({tokenSelected: handelTokenClick(field, value, state, this.state)});

    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)})
    }

    _applyFilter() {
        let filterState=this.state, _query={};
        if (filterState.searchQuery && filterState.searchQuery["CHARGING STATION ID"]) {
            _query.charger_id=filterState.searchQuery["CHARGING STATION ID"]
        }

        if (filterState.tokenSelected["DOCKING_STATUS"] && filterState.tokenSelected["DOCKING_STATUS"][0] !== 'all') {
            _query.status=filterState.tokenSelected["DOCKING_STATUS"]
        }
        if (filterState.tokenSelected["OPERATING_MODE"] && filterState.tokenSelected["OPERATING_MODE"][0] !== 'all') {
            _query.mode=filterState.tokenSelected["OPERATING_MODE"]
        }

        hashHistory.push({pathname: "/system/chargingstation", query: _query})
    }

    _clearFilter() {
        this.props.chargingstationfilterState({
            tokenSelected: {
                "DOCKING_STATUS": ["all"],
                "OPERATING_MODE":["all"],
                __typename:"CharginStationTokenSelected"
            }, searchQuery: {
                "CHARGING_STATION_ID": '',
                __typename:"CharginStationSearchQuery"
            },
            defaultToken: {"DOCKING_STATUS": ["all"], "OPERATING_MODE": ["all"],__typename:"ChargingStationDefaultToken"}
        });
        hashHistory.push({pathname: "/system/chargingstation", query: {}})
    }


    render() {
        let chargingDetails=this.props.chargerData;
        let chargingSearchField=this._processChargingSearchField();
        let chargingFilterToken=this._processFilterToken();
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
                    <div>{this.props.noResults?
                            <div className="gor-no-result-filter"><FormattedMessage id="gor.filter.noResult" description="label for no result" 
                            defaultMessage="No results found, please try again"/></div>:""}
                    </div>
                     <div className="gor-filter-body">
                         <div className="gor-filter-body-input-wrap"> 
                            {chargingSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {chargingFilterToken.column1token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {chargingFilterToken.column2token}
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
                            {!this.props.csFilterSpinner? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
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
        
        csFilterSpinner: state.spinner.csFilterSpinner || false

    };
}

var mapDispatchToProps=function (dispatch) {
    return {
        chargingstationfilterState: function (data) {
            dispatch(chargingstationfilterState(data));
        }
    }
};

ChargingStationFilter.PropTypes={
    showFilter: React.PropTypes.bool,
    chargerData: React.PropTypes.array,
    wsSubscriptionData: React.PropTypes.object,
    orderListSpinner: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    isFilterApplied: React.PropTypes.bool,
    chargingFilterStatus: React.PropTypes.bool,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    updateSubscriptionPacket: React.PropTypes.func,
    chargingstationfilterState: React.PropTypes.func,
    toggleChargingFilter: React.PropTypes.func,
    showChargingStationFilter: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargingStationFilter) ;


