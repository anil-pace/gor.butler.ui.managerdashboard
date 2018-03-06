import React  from 'react';
import {FormattedMessage} from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {connect} from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {handelTokenClick, handleInputQuery} from '../../components/tableFilter/tableFilterCommonFunctions';
import {stringConfig} from '../../constants/backEndConstants';
import {hashHistory} from 'react-router'
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'

class UserFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tokenSelected: {"STATUS": ["all"], "ROLE": ["all"], "WORK_MODE": ["all"], "LOCATION": ["all"]},
            searchQuery: {},
            defaultToken: {"STATUS": ["all"], "ROLE": ["all"], "WORK_MODE": ["all"], "LOCATION": ["all"]}
        };
         this._applyFilter =  this._applyFilter.bind(this);
        this._closeFilter = this._closeFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filterState && JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)) {
            this.setState(nextProps.filterState)
        }
        /**
         * Hide the filter as soon as data in the list get updated.
         */
        if(nextProps.userData.length>0 && JSON.stringify(nextProps.userData)!==JSON.stringify(this.props.userData)){
            this.props.showUserFilter(false);
        }

    }

    _closeFilter() {
        this.props.showUserFilter(false);
    }

    _processUserSearchField() {
        const filterInputFields=[{
            value: "USER_NAME",
            label: <FormattedMessage id="user.inputField.id" defaultMessage="USER NAME"/>
        }];
        let inputValue=this.state.searchQuery;
        let inputField=<FilterInputFieldWrap inputText={filterInputFields}
                                               handleInputText={this._handleInputQuery.bind(this)}
                                               inputValue={inputValue}/>
        return inputField;
    }

    _isMapped(config, item) {
        if (config.hasOwnProperty(item)) {
            return true;
        }
        return false;
    }

    _processUserRoll() {
        let objRole=[{value: 'all', label: <FormattedMessage id="user.role.all" defaultMessage="Any"/>}],
            roleData={}, currentRole;
        for (let i=0, len=this.props.roleList.length; i < len; i++) {
            currentRole=this.props.roleList[i];
            if (!this._isMapped(stringConfig, currentRole.name)) {
                continue;
            }
            roleData={
                value: currentRole.name,
                label: this.context.intl.formatMessage(stringConfig[currentRole.name])
            }
            objRole.push(roleData);
        }
        return objRole;
    }

    _processFilterToken() {
        let tokenStatus={
            value: "STATUS",
            label: <FormattedMessage id="user.tokenfield.status" defaultMessage="STATUS"/>
        };
        let tokenRole={value: "ROLE", label: <FormattedMessage id="user.tokenfield.role" defaultMessage="ROLE"/>};
        let tokenWorkMode={
            value: "WORK_MODE",
            label: <FormattedMessage id="user.tokenfield.mode" defaultMessage="WORK MODE"/>
        };
        
        const labelC1=[
            {value: 'all', label: <FormattedMessage id="user.status.all" defaultMessage="Any"/>},
            {value: 'online', label: <FormattedMessage id="user.status.online" defaultMessage="Online"/>},
            {value: 'offline', label: <FormattedMessage id="user.status.offline" defaultMessage="Offline"/>}
        ];

        const labelC2=this._processUserRoll();
        const labelC3=[
            {value: 'all', label: <FormattedMessage id="user.workmode.all" defaultMessage="Any"/>},
            {value: 'pick__front', label: <FormattedMessage id="user.workmode.pickfront" defaultMessage="Pick Front"/>},
            {value: 'pick__back', label: <FormattedMessage id="user.workmode.pickback" defaultMessage="Pick Back"/>},
            {value: 'put__front', label: <FormattedMessage id="user.workmode.putfront" defaultMessage="Put Front"/>},
            {value: 'put__back', label: <FormattedMessage id="user.workmode.putback" defaultMessage="Put Back"/>},
            {value: 'audit', label: <FormattedMessage id="user.workmode.audit" defaultMessage="Audit"/>},
            {value: 'management', label: <FormattedMessage id="user.workmode.management" defaultMessage="Management"/>}
        ];

        
        let selectedToken=this.state.tokenSelected;
        let column1=<FilterTokenWrap field={tokenStatus} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC1} selectedToken={selectedToken}/>;
        let column2=<FilterTokenWrap field={tokenRole} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC2} selectedToken={selectedToken}/>;
        let column3=<FilterTokenWrap field={tokenWorkMode} tokenCallBack={this._handelTokenClick.bind(this)}
                                       label={labelC3} selectedToken={selectedToken}/>;
        

        let columnDetail={column1token: column1, column2token: column2, column3token: column3};
        return columnDetail;
    }

    _handelTokenClick(field, value, state) {
        this.setState({tokenSelected: handelTokenClick(field, value, state, this.state)});
    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({searchQuery: handleInputQuery(inputQuery, queryField, this.state)});
    }

    _applyFilter() {
        let filterSubsData={}, filterState=this.state, _query={};
        /** Gaurav Makkar:
         * Changed query parameters for username filter
         * Updated data to be sent to the socket
         * if single word:
         * {username:<word>}
         * if multiple word:
         * {username:[<1>,<2>]}
         */
        if (filterState.searchQuery && filterState.searchQuery["USER_NAME"]) {
            _query.username=filterState.searchQuery["USER_NAME"]
            let name_query=filterState.searchQuery["USER_NAME"].split(" ")
            name_query=name_query.filter(function (word) {
                return !!word
            })
            filterSubsData["username"]=name_query.length > 1 ? name_query : name_query.join("").trim();
        }
        if (filterState.tokenSelected) {
            (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== "all" && filterState.tokenSelected["STATUS"].length !== 2 ? filterSubsData["logged_in"]=['is', (filterState.tokenSelected["STATUS"]=== "online") ? "true" : "false"] : "");
            (filterState.tokenSelected["ROLE"] && filterState.tokenSelected["ROLE"][0] !== "all" ? filterSubsData["role"]=['in', filterState.tokenSelected["ROLE"]] : "");
            /** Gaurav Makkar:
             * Added double underscore as a separator for the pps mode
             * and seat type of the Work Mode filter.
             * Data format to be sent to the socket is
             * {pps:["in",[{pps_mode:"put",seat_type:"front"}]]}
             */
            if (filterState.tokenSelected["WORK_MODE"] && filterState.tokenSelected["WORK_MODE"][0] !== "all") {
                let pps_list=[]
                filterState.tokenSelected["WORK_MODE"].forEach(function (mode) {
                    pps_list.push(mode.split("__").length > 1 ? {
                        pps_mode: mode.split("__")[0],
                        seat_type: mode.split("__")[1]
                    } : {pps_mode: mode.split("__")[0]})
                })
                filterSubsData["pps"]=['in', pps_list]
            }

            // (filterState.tokenSelected["LOCATION"] && filterState.tokenSelected["LOCATION"][0]!=="all"?filterSubsData["seat_type"]=['in',filterState.tokenSelected["LOCATION"]]:"");


            /**
             * for query generation
             */
            if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== 'all') {
                _query.status=filterState.tokenSelected["STATUS"]
            }
            if (filterState.tokenSelected["ROLE"] && filterState.tokenSelected["ROLE"][0] !== 'all') {
                _query.role=filterState.tokenSelected["ROLE"]
            }
            if (filterState.tokenSelected["WORK_MODE"] && filterState.tokenSelected["WORK_MODE"][0] !== 'all') {
                _query.mode=filterState.tokenSelected["WORK_MODE"]
            }
        }
        hashHistory.push({pathname: "/users", query: _query})
    }

    _clearFilter() {
        this.props.userfilterState({
            tokenSelected: {
                "STATUS": ["all"],
                "ROLE": ['all'],
                "WORK_MODE": ['all'],
                "LOCATION": ["all"],
                __typename:"UserFilterTokenSelected"
            }, searchQuery: {"USER_NAME": null,__typename:"UserFilterSearchQuery"},
        });
        hashHistory.push({pathname: "/users", query: {}})
    }

    render() {
        let userSearchField=this._processUserSearchField();
        let userFilterToken=this._processFilterToken();
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
                            {userSearchField}
                         </div>
                         <div className="gor-filter-body-filterToken-wrap"> 
                            <div className="gor-filter-body-filterToken-section1">
                                {userFilterToken.column1token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {userFilterToken.column2token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {userFilterToken.column3token}
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
                            {!this.props.isLoading? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage="Apply filter"/> :<div className='spinnerImage'></div>}
                        </button>


                    </div> 
                 </div>
                </Filter>
            </div>
        );
    }
}
;

UserFilter.contextTypes={
    intl: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

UserFilter.PropTypes={
    userDetails: React.PropTypes.array,
    auditSpinner: React.PropTypes.bool,
    totalAudits: React.PropTypes.number,
    filterState: React.PropTypes.object,
    wsSubscriptionData: React.PropTypes.object,
    isFilterApplied: React.PropTypes.bool,
    roleList: React.PropTypes.object,
    showUserFilter: React.PropTypes.func,
};

const ROLE_LIST_QUERY = gql`
    query RoleList($input: RoleListParams) {
        RoleList(input:$input){
            list {
                id
                name
                internal

            }
        }
    }
`;
const withRoleList = graphql(ROLE_LIST_QUERY, {
    props: (data) => ({
        roleList: (data.data && data.data.RoleList && data.data.RoleList.list)||[],
    }),
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

export default compose(
    withRoleList
)(connect(mapStateToProps)(UserFilter));

