import React from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import { handelTokenClick, handleInputQuery } from '../../components/tableFilter/tableFilterCommonFunctions';
import { hashHistory } from 'react-router';
import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag';
import {MSU_SOURCE_TYPE_QUERY} from './queries/msuReconfigTab';


class MsuConfigFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenSelected: { "STATUS": ["any"] }, searchQuery: {},
            defaultToken: { "STATUS": ["any"] }
        };

        this._closeFilter = this._closeFilter.bind(this);
        this._applyFilter = this._applyFilter.bind(this);
        this._clearFilter = this._clearFilter.bind(this);
    }

    componentWillMount() {
        if (this.props.filterState) {
            this.setState(this.props.filterState)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filterState && JSON.stringify(this.state) !== JSON.stringify(nextProps.filterState)) {
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
        if (nextProps.msuListData.length > 0 && JSON.stringify(nextProps.msuListData) !== JSON.stringify(this.props.msuListData)) {
            //this.props.showTableFilter(false);
            this.props.showMsuListFilter(false);
        }
    }

    _closeFilter() {
        this.props.showMsuListFilter(false);
    }

    _processMsuConfigSearchField() {
        const temp = [{ value: "MSU_ID", label: <FormattedMessage id="msuConfig.inputField.id" defaultMessage="MSU ID" /> }];
        let inputValue = this.state.searchQuery;
        let inputField = <FilterInputFieldWrap inputText={temp} handleInputText={this._handleInputQuery.bind(this)} inputValue={inputValue} />
        return inputField;
    }

    _processMsuConfigFilterToken() {
        let tokenFieldC1 = { value: "STATUS", label: <FormattedMessage id="butletbot.tokenfield.SOURCETYPE" defaultMessage="SOURCE TYPE" /> };
        let destTypeList = this.props.destType;

        const labelC1 = [
            { value: 'any', label: <FormattedMessage id="msuConfig.token1.all" defaultMessage="Any" /> }
        ];
        if (destTypeList) {
            if (destTypeList.length) {
                destTypeList.forEach((data) => {
                    labelC1.push(
                        {
                            value: data,
                            label: data
                        }
                    )
                });
            }
            else if (Object.keys(destTypeList).length) return [];
        }
        else {
            return [];
        }

        let selectedToken = this.state.tokenSelected;
        let column1 = <FilterTokenWrap field={tokenFieldC1} tokenCallBack={this._handelTokenClick.bind(this)} label={labelC1} selectedToken={selectedToken} />;
        let columnDetail = { column1token: column1 };
        return columnDetail;
    }

    _handelTokenClick(field, value, state) {
        this.setState({ tokenSelected: handelTokenClick(field, value, state, this.state) });
    }

    _handleInputQuery(inputQuery, queryField) {
        this.setState({ searchQuery: handleInputQuery(inputQuery, queryField, this.state) });
    }

    _applyFilter() {
        let filterSubsData = {}, filterState = this.state, ppsMode, _query = {};
        /**
         * for query generation
         */

        if (filterState.searchQuery["MSU_ID"]) {
            _query.rack_id = filterState.searchQuery["MSU_ID"]
        }
        if (filterState.tokenSelected["STATUS"] && filterState.tokenSelected["STATUS"][0] !== 'any') {
            _query.status = filterState.tokenSelected["STATUS"]
        }
        hashHistory.push({ pathname: "/system/msuConfiguration", query: _query })
    }

    _clearFilter() {
        this.props.msuConfigFilterState({
            tokenSelected: { "STATUS": ["any"], __typename: "MsuReconfigTokenSelected" },
            searchQuery: {
                "MSU_ID": '',
                __typename: "MsuReconfigSearchQuery"
            },
            defaultToken: { "STATUS": ["any"], __typename: "MsuReconfigTokenSelected" }
        });
        hashHistory.push({ pathname: "/system/msuConfiguration", query: {} })
    }


    render() {
        let noOrder = this.props.noResultFound;
        let msuConfigSearchField = this._processMsuConfigSearchField();
        let msuConfigFilterToken = this._processMsuConfigFilterToken();
        return (
            <div>
                <Filter>
                    <div className="gor-filter-header">
                        <div className="gor-filter-header-h1">
                            <FormattedMessage id="gor.filter.filterLabel"
                                description="label for filter"
                                defaultMessage="Filter data" />
                        </div>
                        <div className="gor-filter-header-h2" onClick={this._closeFilter}>
                            <FormattedMessage id="gor.filter.hide" description="label for hide"
                                defaultMessage="Hide" />
                        </div>
                    </div>
                    <div>{noOrder ?
                        <div className="gor-no-result-filter"><FormattedMessage id="gor.filter.noResult"
                            description="label for no result"
                            defaultMessage="No results found, please try again" /></div> : ""}
                    </div>
                    <div className="gor-filter-body">
                        <div className="gor-filter-body-input-wrap">
                            {msuConfigSearchField}
                        </div>
                        <div className="gor-filter-body-filterToken-wrap">
                            <div className="gor-filter-body-filterToken-section1">
                                {msuConfigFilterToken.column1token}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {msuConfigFilterToken.column2token}
                            </div>


                        </div>


                    </div>
                    <div className="gor-filter-footer">
                        <span className="gor-filter-footer-h2" onClick={this._clearFilter}>
                            <FormattedMessage id="gor.filter.reset" description="label for reset"
                                defaultMessage="Reset" />
                        </span>
                        <div className="gor-filter-btn-wrap">
                            <button className='gor-add-btn' onClick={this._applyFilter}>
                                {!this.props.msuConfigFilterSpinnerState ? <FormattedMessage id="gor.filter.heading"
                                    description="filter heading"
                                    defaultMessage="Apply filter" />
                                    : <div className='spinnerImage'></div>}
                            </button>


                        </div>
                    </div>
                </Filter>
            </div>
        );
    }
};

const withQuery = graphql(MSU_SOURCE_TYPE_QUERY, {

    props: function (data) {
        if (!data || !data.data.MsuSourceTypeList || !data.data.MsuSourceTypeList.list) {
            return {}
        }
        return {
            destType: data.data.MsuSourceTypeList.list
        }
    },
    options: ({ match, location }) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});


MsuConfigFilter.PropTypes = {
    showFilter: React.PropTypes.bool,
    wsSubscriptionData: React.PropTypes.object,
    filterState: React.PropTypes.object,
    isFilterApplied: React.PropTypes.bool,
    botFilterStatus: React.PropTypes.bool,
    showTableFilter: React.PropTypes.func,
    filterApplied: React.PropTypes.func,
    updateSubscriptionPacket: React.PropTypes.func,
    msuConfigFilterState: React.PropTypes.func,
};

export default compose(
    withQuery
)(MsuConfigFilter);
