import React  from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {showTableFilter,filterApplied,butlerfilterState,toggleBotButton} from '../../actions/filterAction';
import {updateSubscriptionPacket} from '../../actions/socketActions';
import { connect } from 'react-redux'; 
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {setButlerFilterSpinner}  from '../../actions/spinnerAction';
import {hashHistory} from 'react-router';
import { makeAjaxCall } from '../../actions/ajaxActions';
import {
    APP_JSON, POST, GET,
    FETCH_MSU_CONFIG_DEST_TYPE_LIST
} from '../../constants/frontEndConstants';

import {
    MSU_CONFIG_DEST_TYPE_URL
} from '../../constants/configConstants';

class MsuConfigFilter extends React.Component{
    constructor(props) 
    {
        super(props);
        this.state={tokenSelected: {"STATUS":["any"]}, searchQuery: {},
                      defaultToken: {"STATUS":["any"]}}; 
                      
        this._closeFilter = this._closeFilter.bind(this);
        this._applyFilter = this._applyFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }

    componentWillMount(){
        if(this.props.filterState) {
            this.setState(this.props.filterState)
        }
    }

    componentDidMount(){
        this._requestDestTypeList();
    }

    _requestDestTypeList(){
        console.log("__requestDestTypeList get called");
        let params={
            'url': MSU_CONFIG_DEST_TYPE_URL,
            'method':GET,
            'contentType':APP_JSON,
            'accept':APP_JSON,
            'cause' : FETCH_MSU_CONFIG_DEST_TYPE_LIST
            //'formdata':formData,
        }
        this.props.makeAjaxCall(params);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.filterState && JSON.stringify(this.state)!==JSON.stringify(nextProps.filterState)){
            /**
             * As soon as the properties are changed from
             * the Show All list, the state will be
             * updated.
             */
            this.setState(nextProps.filterState)
        }

        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if(nextProps.butlerData.length>0 && JSON.stringify(nextProps.butlerData)!==JSON.stringify(this.props.butlerData)){
            this.props.showTableFilter(false);
        }
    }
    _closeFilter() {
        let filterState=!this.props.showFilter;
        this.props.showTableFilter(filterState);
    }   

    _processButlerSearchField(){
        //const temp=[{value:"MSU ID", label:<FormattedMessage id="butletbot.inputField.id" defaultMessage="MSU ID"/>}, 
                    //{value:"SPECIFIC LOCATION/ZONE", label:<FormattedMessage id="butletbot.inputField.sku" defaultMessage="SPECIFIC LOCATION/ZONE"/>}];
        const temp=[{value:"MSU ID", label:<FormattedMessage id="msuConfig.inputField.id" defaultMessage="MSU ID"/>}];
        let inputValue=this.state.searchQuery;
        let inputField=<FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue}/>
        return inputField;           
    }
 
    _processFilterToken() {
        let tokenFieldC1={value:"STATUS", label:<FormattedMessage id="butletbot.tokenfield.STATUS" defaultMessage="STATUS"/>};
        let destTypeList = this.props.destType;

        //let tokenFieldC2={value:"MODE", label:<FormattedMessage id="butletbot.tokenfield.MODE" defaultMessage="MODE"/>}; 
        const labelC1=[
                    { value: 'any', label:<FormattedMessage id="msuConfig.token1.all" defaultMessage="Any"/> }
                    ];
        if(destTypeList){
            destTypeList.forEach((data)=>{
             labelC1.push(
             {
                value:data,
                label:data
             }
                )   
            });
        }
        // const labelC2=[
        //             { value: 'any', label:<FormattedMessage id="butletbot.token2.any" defaultMessage="Any"/> },
        //             { value: '0', label:<FormattedMessage id="butletbot.token2.pick" defaultMessage="Pick"/>},
        //             { value: '1', label:<FormattedMessage id="butletbot.token2.put" defaultMessage="Put"/> },
        //             { value: '2', label:<FormattedMessage id="butletbot.token2.audit" defaultMessage="Audit"/> },
        //             { value: '3', label:<FormattedMessage id="butletbot.token2.charging" defaultMessage="Charging"/>},
        //             { value: 'not set', label:<FormattedMessage id="butletbot.token2.notSet" defaultMessage="Not set"/> }
        //             ];
        let selectedToken= this.state.tokenSelected;
        let column1=<FilterTokenWrap field={tokenFieldC1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        //let column2=<FilterTokenWrap field={tokenFieldC1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken}/>;
        //let columnDetail={column1token:column1, column2token:column2};
        let columnDetail={column1token:column1};
        return columnDetail;
    }

    _handelTokenClick(field,value,state) {
        this.setState({tokenSelected:handelTokenClick(field,value,state,this.state)});
    }

    _handleInputQuery(inputQuery,queryField) {
        this.setState({searchQuery:handleInputQuery(inputQuery,queryField,this.state)});
    }

    _applyFilter() {
        let filterSubsData={}, filterState=this.state, ppsMode, _query={};
        /**
         * for query generation
         */
        // if (filterState.searchQuery["SPECIFIC LOCATION/ZONE"]) {
        //     _query.location=filterState.searchQuery["SPECIFIC LOCATION/ZONE"]
        // }
        if (filterState.searchQuery["MSU ID"]) {
            _query.rack_id=filterState.searchQuery["MSU ID"]
        }
        if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !=='any') {
            _query.status=filterState.tokenSelected["STATUS"]
        }
        // if (filterState.tokenSelected["MODE"] && filterState.tokenSelected["MODE"][0] !=='any') {
        //     _query.current_task=filterState.tokenSelected["MODE"]
        // }

        hashHistory.push({pathname: "/system/msuConfiguration", query: _query})
    }

    _clearFilter() {
        this.props.butlerfilterState({
            tokenSelected: {"STATUS": ["any"]}, searchQuery: {
                "MSU ID":null
            },
        });
        hashHistory.push({pathname: "/system/msuConfiguration", query: {}})
        
    }
    

    render(){
        let butlerDetails=this.props.butlerDetail;
        let noOrder=this.props.noResultFound;
        let butlerSearchField=this._processButlerSearchField();
        let butlerFilterToken=this._processFilterToken();
        return (
            <div>
                 <Filter>
                <div className="gor-filter-header">
                    <div className="gor-filter-header-h1">
                         <FormattedMessage id="gor.filter.filterLabel" description="label for filter" defaultMessage="Filter data"/>
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
                            {butlerSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {butlerFilterToken.column1token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {butlerFilterToken.column2token}
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
                            {!this.props.butlerFilterSpinnerState? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
                        </button>


                    </div> 
                 </div>
                </Filter>
            </div>
        );
    }
};


function mapStateToProps(state, ownProps){
  return {
    butlerDetail: state.butlerDetail || [],
    noResultFound: state.butlerDetail.noResultFound,
    showFilter: state.filterInfo.filterState || false,
    wsSubscriptionData:state.recieveSocketActions.socketDataSubscriptionPacket,
    filterState: state.filterInfo.butlerFilterState,
    isFilterApplied: state.filterInfo.isFilterApplied || false,
    botFilterStatus:state.filterInfo.botFilterStatus || false,
    butlerFilter:state.spinner.butlerSpinner || false,
    butlerFilterSpinnerState:state.spinner.butlerFilterSpinnerState || false,
    destType: state.msuInfo.destType
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    showTableFilter: function(data){dispatch(showTableFilter(data));},
    filterApplied: function(data){dispatch(filterApplied(data));},
    updateSubscriptionPacket: function(data){dispatch(updateSubscriptionPacket(data));},
    butlerfilterState: function(data){dispatch(butlerfilterState(data));},
    toggleBotButton: function(data){dispatch(toggleBotButton(data));},
    setButlerFilterSpinner: function(data){dispatch(setButlerFilterSpinner(data));},
    makeAjaxCall: function(data){dispatch(makeAjaxCall(data))}

  } 
};
MsuConfigFilter.PropTypes={
    butlerDetail: React.PropTypes.array,
    showFilter: React.PropTypes.bool,
    wsSubscriptionData:React.PropTypes.object,
    filterState: React.PropTypes.object,
    isFilterApplied:React.PropTypes.bool,
    botFilterStatus:React.PropTypes.bool,
    showTableFilter:React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    updateSubscriptionPacket:React.PropTypes.func,
    butlerfilterState:React.PropTypes.func,
    toggleBotButton:React.PropTypes.func
};

export default connect(mapStateToProps,mapDispatchToProps)(MsuConfigFilter) ;
