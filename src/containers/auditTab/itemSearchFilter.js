import React from 'react';
import { FormattedMessage } from 'react-intl';
import Filter from '../../components/tableFilter/filter';
import {
  showTableFilter,
  filterApplied,
  auditfilterState,
  toggleAuditFilter,
  setClearIntervalFlag
} from '../../actions/filterAction';
import { connect } from 'react-redux';
import FilterInputFieldWrap from '../../components/tableFilter/filterInputFieldWrap';
import FilterTokenWrap from '../../components/tableFilter/filterTokenContainer';
import {
  handelTokenClick,
  handleInputQuery
} from '../../components/tableFilter/tableFilterCommonFunctions';
import {
  ANY,
  ALL,
  SKU,
  LOCATION,
  ISSUE_FOUND,
  SPECIFIC_LOCATION_ID,
  SPECIFIC_SKU_ID,
  SPECIFIC_PPS_ID,
  ITEM_SEARCH_TASK_ID,
  FROM_DATE,
  TO_DATE,
  NOT_YET_STARTED,
  TO_BE_RESOLVED,
  AUDIT_PAUSED,
  AUDIT_TYPE,
  AUDIT_COMPLETED,
  AUDIT_CANCELLED,
  AUDIT_CREATED,
  PENDING,
  INPROGRESS,
  AUDIT_RESOLVED,
  AUDIT_LINE_REJECTED,
  SINGLE,
  AUDIT_USERLIST,
  APP_JSON,
  GET,
  PROCESSED,
  PROCESSING,
  CREATED,
  FAILED,
  PROCESSED_STATUS,
  PROCESSING_STATUS,
  CREATED_STATUS,
  FAILED_STATUS
} from '../../constants/frontEndConstants';
import { USERLIST_URL } from '../../constants/configConstants';
import { hashHistory } from 'react-router';
import { setAuditSpinner } from './../../actions/auditActions';
import { userRequest } from '../../actions/userActions';
import { mappingArray, arrayDiff } from '../../utilities/utils';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { AUDIT_USER_FETCH_QUERY } from './query/serverQuery';
import { itemSearchClientData } from './query/clientQuery';
class ItemSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tokenSelected: { AUDIT_TYPE: [ANY], STATUS: [ALL], CREATED_BY: [ALL] },
      tokenSelected: { STATUS: [ALL] },
      searchQuery: {},
      textboxStatus: null,
      // defaultToken: { AUDIT_TYPE: [ANY], STATUS: [ALL], CREATED_BY: [ALL] }
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

  _processAuditSearchField() {
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
      /*
      {
        value: SPECIFIC_PPS_ID,
        label: (
          <FormattedMessage
            id='itemSearch.inputField.pps'
            defaultMessage='PPS ID'
          />
        )
      },
      {
        value: SPECIFIC_SKU_ID,
        label: (
          <FormattedMessage
            id='itemSearch.inputField.sku'
            defaultMessage='SKU ID'
          />
        )
      },
      {
        value: SPECIFIC_LOCATION_ID,
        label: (
          <FormattedMessage
            id='itemSearch.inputField.location'
            defaultMessage='LOCATION ID'
          />
        )
      },
      */
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
    // var tokenAuditTypeField = {
    //   value: 'AUDIT_TYPE',
    //   label: (
    //     <FormattedMessage
    //       id='itemSearch.tokenfield.typeAudit'
    //       defaultMessage='AUDIT TYPE'
    //     />
    //   )
    // };
    // let userArr = this.props.auditUserList || [];
    // let labelC3 = [
    //   {
    //     value: ALL,
    //     label: (
    //       <FormattedMessage id='itemSearch.token3.all' defaultMessage='Any' />
    //     )
    //   }
    // ];
    // userArr.forEach(data => {
    //   labelC3.push({
    //     value: data,
    //     label: data
    //   });
    // });

    var tokenStatusField = {
      value: 'STATUS',
      label: (
        <FormattedMessage
          id='itemSearch.tokenfield.STATUS'
          defaultMessage='STATUS'
        />
      )
    };
    // var tokenCreatedByField = {
    //   value: 'CREATED_BY',
    //   label: (
    //     <FormattedMessage
    //       id='itemSearch.tokenfield.createdby'
    //       defaultMessage='CREATED BY'
    //     />
    //   )
    // };
    // const labelC1 = [
    //   {
    //     value: ANY,
    //     label: (
    //       <FormattedMessage id='itemSearch.token1.all' defaultMessage='Any' />
    //     )
    //   },
    //   {
    //     value: SKU,
    //     label: (
    //       <FormattedMessage id='itemSearch.token1.sku' defaultMessage='SKU' />
    //     )
    //   },
    //   {
    //     value: LOCATION,
    //     label: (
    //       <FormattedMessage
    //         id='itemSearch.token1.location'
    //         defaultMessage='Location'
    //       />
    //     )
    //   }
    // ];
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
      /*,
      {
        value: NOT_YET_STARTED,
        label: (
          <FormattedMessage
            id='itemSearch.token2.notyetstarted'
            defaultMessage='Not yet started'
          />
        )
      },
      {
        value: INPROGRESS,
        label: (
          <FormattedMessage
            id='itemSearch.token2.inProgress'
            defaultMessage='In progress'
          />
        )
      },
      {
        value: TO_BE_RESOLVED,
        label: (
          <FormattedMessage
            id='itemSearch.token2.toberesolved'
            defaultMessage='To be resolved'
          />
        )
      },
      {
        value: AUDIT_CANCELLED,
        label: (
          <FormattedMessage
            id='itemSearch.token2.cancelled'
            defaultMessage='Cancelled'
          />
        )
      },
      {
        value: AUDIT_COMPLETED,
        label: (
          <FormattedMessage
            id='itemSearch.token2.completed'
            defaultMessage='Completed'
          />
        )
      },
      {
        value: AUDIT_PAUSED,
        label: (
          <FormattedMessage
            id='itemSearch.token2.paused'
            defaultMessage='Paused'
          />
        )
      }
      */
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
    // var column2 = (
    //   <FilterTokenWrap
    //     field={tokenAuditTypeField}
    //     tokenCallBack={this._handelTokenClick.bind(this)}
    //     label={labelC1}
    //     selectedToken={selectedToken}
    //     selection={SINGLE}
    //   />
    // );
    // var column3 = (
    //   <FilterTokenWrap
    //     field={tokenCreatedByField}
    //     tokenCallBack={this._handelTokenClick.bind(this)}
    //     label={labelC3}
    //     selectedToken={selectedToken}
    //   />
    // );

    var columnDetail = {
      column1token: column1
      //column2token: column2,
      //column3token: column3
    };
    return columnDetail;
  }

  _handelTokenClick(field, value, state) {
    // var tempArray = [SPECIFIC_SKU_ID, SPECIFIC_LOCATION_ID];
    // var obj = {},
    //   queryField,
    //   tokentoRemove;
    // var selectedToken = this.state.tokenSelected['AUDIT_TYPE'];
    // var token = [value];
    this.setState({
      tokenSelected: handelTokenClick(field, value, state, this.state)
    });

    // if (state !== 'addDefault') {
    //   obj.name = mappingArray(selectedToken);
    //   tokentoRemove = mappingArray(token, selectedToken);
    //   queryField =
    //     selectedToken.toString() === ANY
    //       ? tokentoRemove
    //       : arrayDiff(tempArray, obj.name);
    //   if (queryField && queryField.length !== 0) {
    //     this.setState({
    //       searchQuery: handleInputQuery('', queryField, this.state)
    //     });
    //   }
    //   if (field == 'AUDIT_TYPE')
    //     this.setState({ textboxStatus: JSON.stringify(obj) });
    // } else {
    //   if (field == 'AUDIT_TYPE')
    //     this.setState({ textboxStatus: JSON.stringify(obj) });
    // }
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

    // if (
    //   filterState.tokenSelected[AUDIT_TYPE] &&
    //   filterState.tokenSelected[AUDIT_TYPE][0] !== ANY
    // ) {
    //   _query.auditType = filterState.tokenSelected[AUDIT_TYPE];
    // }
    if (
      filterState.tokenSelected['STATUS'] &&
      filterState.tokenSelected['STATUS'][0] !== ALL
    ) {
      _query.status = filterState.tokenSelected['STATUS'];
    }
    // if (
    //   filterState.tokenSelected['CREATED_BY'] &&
    //   filterState.tokenSelected['CREATED_BY'][0] !== ALL
    // ) {
    //   _query.createdBy = filterState.tokenSelected['CREATED_BY'];
    // }

    if (
      filterState.searchQuery &&
      filterState.searchQuery[ITEM_SEARCH_TASK_ID]
    ) {
      _query.taskId = filterState.searchQuery[ITEM_SEARCH_TASK_ID];
    }
    // if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_SKU_ID]) {
    //   _query.skuId = filterState.searchQuery[SPECIFIC_SKU_ID];
    // }
    // if (
    //   filterState.searchQuery &&
    //   filterState.searchQuery[SPECIFIC_LOCATION_ID]
    // ) {
    //   _query.locationId = filterState.searchQuery[SPECIFIC_LOCATION_ID];
    // }
    // if (filterState.searchQuery && filterState.searchQuery[SPECIFIC_PPS_ID]) {
    //   _query.ppsId = filterState.searchQuery[SPECIFIC_PPS_ID];
    // }
    if (filterState.searchQuery && filterState.searchQuery[FROM_DATE]) {
      _query.fromDate = filterState.searchQuery[FROM_DATE];
    }
    if (filterState.searchQuery && filterState.searchQuery[TO_DATE]) {
      _query.toDate = filterState.searchQuery[TO_DATE];
    }
    // _query.pageNo = this.props.currentPage;
    // _query.pageSize = this.props.totalResults;

    hashHistory.push({ pathname: 'audit/itemsearch', query: _query });
    this.props.filterApplied(true);
    //this.props.updateSubscription(true);
    this.props.showItemSearchFilter(false);
  }

  _clearFilter() {
    this.props.itemSearchfilterState({
      tokenSelected: {
        //AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        //CREATED_BY: [ALL],
        __typename: 'ItemSearchFilterTokenSelected'
      },
      searchQuery: {
        // SPECIFIC_SKU_ID: null,
        // SPECIFIC_LOCATION_ID: null,
        ITEM_SEARCH_TASK_ID: null,
        // SPECIFIC_PPS_ID: null,
        FROM_DATE: null,
        TO_DATE: null,
        __typename: 'ItemSearchFilterSearchQuery'
      },
      defaultToken: {
        //AUDIT_TYPE: [ANY],
        STATUS: [ALL],
        //CREATED_BY: [ALL],
        __typename: 'ItemSearchFilterDefaultToken'
      }
    });
    this.props.filterApplied(false);
    hashHistory.push({ pathname: 'audit/itemsearch', query: {} });
    this.props.showItemSearchFilter(false);
  }

  render() {
    var noOrder = this.props.noResultFound;
    var auditSearchField = this._processAuditSearchField();
    var auditFilterToken = this._processFilterToken();
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
            <div className='gor-filter-body-input-wrap'>{auditSearchField}</div>
            <div className='gor-filter-body-filterToken-wrap'>
              <div className='gor-filter-body-filterToken-section1'>
                {auditFilterToken.column1token}
              </div>
              <div className='gor-filter-body-filterToken-section1'>
                {auditFilterToken.column2token}
              </div>
              <div className='gor-filter-body-filterToken-section1'>
                {auditFilterToken.column3token}
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
  totalAudits: React.PropTypes.number,
  showTableFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  auditFilterStatus: React.PropTypes.bool,
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
    setCurrentPageNumber: function(number) {
      mutate({ variables: { pageNumber: number } });
    }
  })
});
const setFilterApplied = graphql(SET_FILTER_APPLIED, {
  props: ({ mutate, ownProps }) => ({
    filterApplied: function(applied) {
      mutate({ variables: { isFilterApplied: applied } });
    }
  })
});
const setUpdateSubscription = graphql(SET_UPDATE_SUBSCRIPTION, {
  props: ({ mutate, ownProps }) => ({
    updateSubscription: function(applied) {
      mutate({ variables: { isUpdateSubsciption: applied } });
    }
  })
});

const setTextBoxStatus = graphql(SET_TEXT_BOX_STATUS, {
  props: ({ mutate, ownProps }) => ({
    setTextBoxStatus: function(textBoxName) {
      mutate({ variables: { textBoxName: textBoxName } });
    }
  })
});
const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    itemSearchfilterState: function(state) {
      mutate({ variables: { state: state } });
    }
  })
});

// const initialQuery = graphql(AUDIT_USER_FETCH_QUERY, {
//   props: function(data) {
//     var list = { pps_list: [] };
//     if (!data || !data.data.AuditFetchUser || !data.data.AuditFetchUser.list) {
//       auditUserList: list.users;
//       return {};
//     }

//     return {
//       auditUserList: data.data.AuditFetchUser.list.users
//     };
//   },
//   options: ({ match, location }) => ({
//     variables: {},
//     fetchPolicy: 'network-only'
//   })
// });
export default compose(
  //initialQuery,
  withApollo,
  withClientData,
  setTextBoxStatus,
  setFilterApplied,
  setFilterState,
  setUpdateSubscription,
  setPageNumber
)(connect()(ItemSearchFilter));