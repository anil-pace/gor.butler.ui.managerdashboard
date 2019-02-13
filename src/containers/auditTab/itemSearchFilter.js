import React from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';

import { connect } from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {
  handelTokenClick,
  handleInputQuery
} from '../../components/tableFilter/tableFilterCommonFunctions';
import {
  ALL,
  ITEM_SEARCH_TASK_ID,
  FROM_DATE,
  TO_DATE,
  PROCESSED_STATUS,
  PROCESSING_STATUS,
  CREATED_STATUS,
  FAILED_STATUS
} from '../../constants/frontEndConstants';
import { hashHistory } from 'react-router';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { itemSearchClientData } from './query/clientQuery';
class ItemSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenSelected: { STATUS: [ALL] },
      searchQuery: {},
      textboxStatus: null,
      defaultToken: { STATUS: [ALL] }
    };
    this._applyFilter = this._applyFilter.bind(this);
    this._closeFilter = this._closeFilter.bind(this);
    this._clearFilter = this._clearFilter.bind(this);
  }

  _closeFilter() {
    this.props.showItemSearchFilter(false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemSearchFilterState) {
      if (
        nextProps.itemSearchFilterState &&
        JSON.stringify(this.state) !==
        JSON.stringify(nextProps.itemSearchFilterState)
      ) {
        this.setState(nextProps.itemSearchFilterState);
      }
    }
  }

  _processItemSearchSearchField() {
    const filterInputFields = [
      {
        value: ITEM_SEARCH_TASK_ID,
        label: (
          <FormattedMessage
            id='itemSearch.inputField.id'
            defaultMessage='ITEM SEARCH ID'
          />
        )
      },
      {
        value: FROM_DATE,
        by2value: true,
        type: 'date',
        label: (
          <FormattedMessage
            id='itemSearch.inputField.fromdate'
            defaultMessage='FROM DATE'
          />
        )
      },
      {
        value: TO_DATE,
        by2value: true,
        type: 'date',
        label: (
          <FormattedMessage
            id='itemSearch.inputField.todate'
            defaultMessage='TO DATE'
          />
        )
      }
    ];

    var inputValue = this.state.searchQuery;
    var textboxStatus = this.state.textboxStatus || null;
    var inputField = (
      <FilterInputFieldWrap
        inputText={filterInputFields}
        handleInputText={this._handleInputQuery.bind(this)}
        inputValue={inputValue}
        textboxStatus={textboxStatus}
      />
    );
    return inputField;
  }

  _processFilterToken() {
    var tokenStatusField = {
      value: 'STATUS',
      label: (
        <FormattedMessage
          id='itemSearch.tokenfield.STATUS'
          defaultMessage='STATUS'
        />
      )
    };

    const labelC2 = [
      {
        value: ALL,
        label: (
          <FormattedMessage id='itemSearch.token2.all' defaultMessage='Any' />
        )
      },
      {
        value: PROCESSED_STATUS,
        label: (
          <FormattedMessage
            id='itemSearch.token2.processed'
            defaultMessage='Processed'
          />
        )
      },
      {
        value: PROCESSING_STATUS,
        label: (
          <FormattedMessage
            id='itemSearch.token2.processing'
            defaultMessage='Processing'
          />
        )
      },
      {
        value: CREATED_STATUS,
        label: (
          <FormattedMessage
            id='itemSearch.token2.created'
            defaultMessage='Created'
          />
        )
      },
      {
        value: FAILED_STATUS,
        label: (
          <FormattedMessage
            id='itemSearch.token2.failed'
            defaultMessage='Failed'
          />
        )
      }

    ];

    var selectedToken = this.state.tokenSelected;
    var column1 = (
      <FilterTokenWrap
        field={tokenStatusField}
        tokenCallBack={this._handelTokenClick.bind(this)}
        label={labelC2}
        selectedToken={selectedToken}
      />
    );


    var columnDetail = {
      column1token: column1
    };
    return columnDetail;
  }

  _handelTokenClick(field, value, state) {

    this.setState({
      tokenSelected: handelTokenClick(field, value, state, this.state)
    });


  }

  _handleInputQuery(inputQuery, queryField) {
    this.setState({
      searchQuery: handleInputQuery(inputQuery, queryField, this.state)
    });
  }

  _applyFilter() {
    var filterState = this.state,
      _query = {};

    if (
      JSON.stringify(this.state) !==
      JSON.stringify(this.props.itemSearchFilterState)
    ) {
      this.props.setCurrentPageNumber(0);
    }


    if (
      filterState.tokenSelected['STATUS'] &&
      filterState.tokenSelected['STATUS'][0] !== ALL
    ) {
      _query.status = filterState.tokenSelected['STATUS'];
    }


    if (
      filterState.searchQuery &&
      filterState.searchQuery[ITEM_SEARCH_TASK_ID]
    ) {
      _query.taskId = filterState.searchQuery[ITEM_SEARCH_TASK_ID];
    }

    if (filterState.searchQuery && filterState.searchQuery[FROM_DATE]) {
      _query.fromDate = filterState.searchQuery[FROM_DATE];
    }
    if (filterState.searchQuery && filterState.searchQuery[TO_DATE]) {
      _query.toDate = filterState.searchQuery[TO_DATE];
    }

    hashHistory.push({ pathname: 'audit/itemsearch', query: _query });
    this.props.filterApplied(true);
    this.props.showItemSearchFilter(false);
  }

  _clearFilter() {
    this.props.itemSearchfilterState({
      tokenSelected: {
        STATUS: [ALL],
        __typename: 'ItemSearchFilterTokenSelected'
      },
      searchQuery: {
        ITEM_SEARCH_TASK_ID: null,
        FROM_DATE: null,
        TO_DATE: null,
        __typename: 'ItemSearchFilterSearchQuery'
      },
      defaultToken: {
        STATUS: [ALL],
        __typename: 'ItemSearchFilterDefaultToken'
      }
    });
    this.props.filterApplied(false);
    hashHistory.push({ pathname: 'audit/itemsearch', query: {} });
    this.props.showItemSearchFilter(false);
  }

  render() {
    var noOrder = this.props.noResultFound;
    var itemSearchSearchField = this._processItemSearchSearchField();
    var itemSearchFilterToken = this._processFilterToken();
    return (
      <div>
        <Filter>
          <div className='gor-filter-header'>
            <div className='gor-filter-header-h1'>
              <FormattedMessage
                id='gor.filter.filterLabel'
                description='label for filter'
                defaultMessage='Filter data'
              />
            </div>
            <div className='gor-filter-header-h2' onClick={this._closeFilter}>
              <FormattedMessage
                id='gor.filter.hide'
                description='label for hide'
                defaultMessage='Hide'
              />
            </div>
          </div>
          <div>
            {noOrder ? (
              <div className='gor-no-result-filter'>
                <FormattedMessage
                  id='gor.filter.noResult'
                  description='label for no result'
                  defaultMessage='No results found, please try again'
                />
              </div>
            ) : (
                ''
              )}
          </div>
          <div className='gor-filter-body'>
            <div className='gor-filter-body-input-wrap'>{itemSearchSearchField}</div>
            <div className='gor-filter-body-filterToken-wrap'>
              <div className='gor-filter-body-filterToken-section1'>
                {itemSearchFilterToken.column1token}
              </div>
              <div className='gor-filter-body-filterToken-section1'>
                {itemSearchFilterToken.column2token}
              </div>
              <div className='gor-filter-body-filterToken-section1'>
                {itemSearchFilterToken.column3token}
              </div>
            </div>
          </div>
          <div className='gor-filter-footer'>
            <span className='gor-filter-footer-h2' onClick={this._clearFilter}>
              <FormattedMessage
                id='gor.filter.reset'
                description='label for reset'
                defaultMessage='Reset'
              />
            </span>
            <div className='gor-filter-btn-wrap'>
              <button className='gor-add-btn' onClick={this._applyFilter}>
                {!this.props.auditSpinner ? (
                  <FormattedMessage
                    id='gor.filter.heading'
                    description='filter heading'
                    defaultMessage='Apply filter'
                  />
                ) : (
                    <div className='spinnerImage' />
                  )}
              </button>
            </div>
          </div>
        </Filter>
      </div>
    );
  }
}
const withClientData = graphql(itemSearchClientData, {
  props: data => ({
    itemSearchFilterState: data.data.itemSearchFilter
      ? JSON.parse(JSON.stringify(data.data.itemSearchFilter.filterState))
      : null
  })
});

ItemSearchFilter.PropTypes = {
  showFilter: React.PropTypes.bool,
  auditSpinner: React.PropTypes.bool,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  showItemSearchFilter: React.PropTypes.func
};
const SET_TEXT_BOX_STATUS = gql`
  mutation setFilterTextBox($textBoxName: String!) {
    setAuditFilterTextBox(textBoxName: $textBoxName) @client
  }
`;
const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setItemSearchFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`;
const SET_UPDATE_SUBSCRIPTION = gql`
  mutation setUpdateSubscription($isUpdateSubsciption: String!) {
    setAuditUpdateSubscription(isUpdateSubsciption: $isUpdateSubsciption)
      @client
  }
`;
const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setItemSearchFilterState(state: $state) @client
  }
`;
const SET_PAGE_NUMBER = gql`
  mutation setPageNumber($pageNumber: Int!) {
    setAuditPageNumber(pageNumber: $pageNumber) @client
  }
`;
const setPageNumber = graphql(SET_PAGE_NUMBER, {
  props: ({ mutate, ownProps }) => ({
    setCurrentPageNumber: function (number) {
      mutate({ variables: { pageNumber: number } });
    }
  })
});
const setFilterApplied = graphql(SET_FILTER_APPLIED, {
  props: ({ mutate, ownProps }) => ({
    filterApplied: function (applied) {
      mutate({ variables: { isFilterApplied: applied } });
    }
  })
});
const setUpdateSubscription = graphql(SET_UPDATE_SUBSCRIPTION, {
  props: ({ mutate, ownProps }) => ({
    updateSubscription: function (applied) {
      mutate({ variables: { isUpdateSubsciption: applied } });
    }
  })
});

const setTextBoxStatus = graphql(SET_TEXT_BOX_STATUS, {
  props: ({ mutate, ownProps }) => ({
    setTextBoxStatus: function (textBoxName) {
      mutate({ variables: { textBoxName: textBoxName } });
    }
  })
});
const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    itemSearchfilterState: function (state) {
      mutate({ variables: { state: state } });
    }
  })
});


export default compose(
  withApollo,
  withClientData,
  setTextBoxStatus,
  setFilterApplied,
  setFilterState,
  setUpdateSubscription,
  setPageNumber
)(connect()(ItemSearchFilter));
