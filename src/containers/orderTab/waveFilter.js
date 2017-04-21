import React  from 'react';
import ReactDOM  from 'react-dom';
import {FormattedMessage} from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {wavesFilterToggle, filterApplied, wavefilterState, toggleWaveFilter,setFilterApplyFlag} from '../../actions/filterAction';
import {updateSubscriptionPacket} from '../../actions/socketActions';
import {connect} from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {setWavesFilterSpinner}  from '../../actions/spinnerAction';
class WaveFilter extends React.Component {

    constructor(props) {
var a=false;
        super(props);
        this.state = {
            tokenSelected: {"STATUS": ["any"]}, searchQuery: {},
            defaultToken: {"STATUS": ["any"]}
        };
    }

    componentWillReceiveProps(nextProps) {
        /**
         * It will update the state as soon as
         * filters are cleared.
         */
        if (nextProps.filterState && JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)) {
            this.setState(nextProps.filterState)
        }     
    }

    _closeFilter() {
        let filterState = !this.props.wavesToggleFilter;
        this.props.wavesFilterToggle(false);
    }

    _processWaveSearchField() {
        let filterInputFields = [{
            value: "WAVE ID",
            label: <FormattedMessage id="wave.inputField.id" defaultMessage="WAVE ID"/>
        }];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={filterInputFields}
                                               handleInputText={this._handleInputQuery.bind(this)}
                                               inputValue={inputValue}/>
        return inputField;
    }

    _processFilterToken() {
        let tokenField1 = {value: "STATUS", label: <FormattedMessage id="wave.token.status" defaultMessage="STATUS"/>};
        let labelC1 = [
            {value: 'any', label: <FormattedMessage id="wave.STATUS.all" defaultMessage="All waves"/>},
            {value: 'breached', label: <FormattedMessage id="wave.STATUS.breach" defaultMessage="Breached"/>},
            {value: 'wave_pending', label: <FormattedMessage id="wave.STATUS.pending" defaultMessage="Pending"/>},
            {value: 'wave_warning', label: <FormattedMessage id="wave.STATUS.warning" defaultMessage="Warning"/>},
            {value: 'in_progress', label: <FormattedMessage id="wave.STATUS.inprogress" defaultMessage="In progress"/>}
        ];
        let selectedToken = this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenField1} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC1} selectedToken={selectedToken}/>;

        let columnDetail = {column1token: column1};
        return columnDetail;
    }

    _handelTokenClick(field, value, state) {
        this.setState({tokenSelected: handelTokenClick(field, value, state, this.state)});

    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)})
    }

    _applyFilter() {
        let filterSubsData = {}, filterState = this.state;
        if (filterState.searchQuery) {
            (filterState.searchQuery["WAVE ID"] ? filterSubsData["wave_id"] = ['=', filterState.searchQuery["WAVE ID"]] : "");
        }
        if (filterState.tokenSelected) {
            (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== "any" ? filterSubsData["status"] = ['in', filterState.tokenSelected["STATUS"]] : "");
        }
        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["orders"].data[0].details["filter_params"] = filterSubsData;
        this.props.wavefilterState(filterState);
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.toggleWaveFilter(true);
        this.props.setWavesFilterSpinner(true);
        this.props.setFilterApplyFlag(true);
        

    }

    _clearFilter() {
        let clearState = {};
        let updatedWsSubscription = this.props.wsSubscriptionData;
        updatedWsSubscription["orders"].data[0].details["filter_params"] = {};
        this.props.updateSubscriptionPacket(updatedWsSubscription);
        this.setState({tokenSelected: {"STATUS": ["any"]}, searchQuery: {}});
        this.props.wavefilterState({tokenSelected: {"STATUS": ["any"]}, searchQuery: {}});
        this.props.filterApplied(!this.props.isFilterApplied);
        this.props.toggleWaveFilter(false);
        this.props.setWavesFilterSpinner(true);
        this.props.setFilterApplyFlag(true);
    }


    render() {
        var waveDetail = this.props.waveData;
       var noOrder = this.props.waveData.emptyResponse; 
        let waveSearchField = this._processWaveSearchField();
        let waveFilterToken = this._processFilterToken();
        return (
            <div>
                <Filter hideFilter={this._closeFilter.bind(this)}  // hiding filter wont disturb state
                        clearFilter={this._clearFilter.bind(this)} // clearing sates of filter
                        searchField={waveSearchField}
                        filterTokenC1={waveFilterToken.column1token}
                        formSubmit={this._applyFilter.bind(this)} //passing function on submit
                        responseFlag={this.props.waveFIlterSpinner} // used for spinner of button
                        noDataFlag={noOrder} //messg to show in case of no data
                />
            </div>
        );
    }
}
;


function mapStateToProps(state, ownProps) {
    return {
        wavesToggleFilter: state.filterInfo.wavesToggleFilter || false,
        waveData: state.waveInfo || {},
        orderListSpinner: state.spinner.orderListSpinner || false,
        filterState: state.filterInfo.wavefilterState,
        wsSubscriptionData: state.recieveSocketActions.socketDataSubscriptionPacket,
        isFilterApplied: state.filterInfo.isFilterApplied || false,
        waveFilterStatus: state.filterInfo.waveFilterStatus || false,
        wavesSpinner: state.spinner.wavesSpinner || false,
        waveFIlterSpinner: state.spinner.waveFIlterSpinner || false

    };
}

let mapDispatchToProps = function (dispatch) {
    return {
        wavesFilterToggle: function (data) {
            dispatch(wavesFilterToggle(data));
        },
        filterApplied: function (data) {
            dispatch(filterApplied(data));
        },
        wavefilterState: function (data) {
            dispatch(wavefilterState(data));
        },
        updateSubscriptionPacket: function (data) {
            dispatch(updateSubscriptionPacket(data));
        },
        toggleWaveFilter: function (data) {
            dispatch(toggleWaveFilter(data));
        },
        setWavesFilterSpinner: function (data) {
            dispatch(setWavesFilterSpinner(data));
        },
        setFilterApplyFlag: function (data) {
            dispatch(setFilterApplyFlag(data));
        }

    }
};
WaveFilter.PropTypes = {
    wavesFilterToggle: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    wavefilterState: React.PropTypes.func,
    updateSubscriptionPacket: React.PropTypes.func,
    toggleWaveFilter: React.PropTypes.func,
    wavesToggleFilter: React.PropTypes.bool,
    waveData: React.PropTypes.object,
    orderListSpinner: React.PropTypes.bool,
    filterState: React.PropTypes.object,
    wsSubscriptionData: React.PropTypes.object,
    isFilterApplied: React.PropTypes.bool,
    waveFilterStatus: React.PropTypes.bool,
    setFilterApplyFlag:React.PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(WaveFilter) ;