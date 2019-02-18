/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React from 'react';
import { connect } from 'react-redux';
import GTable from '../../components/gor-table-component';
import {
  GTableBody,
  GTableRow
} from '../../components/gor-table-component';
import { hashHistory } from 'react-router';
import { FormattedMessage, defineMessages } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import ActionDropDown from '../../components/actionDropDown/actionDropDown';
import { modal } from 'react-redux-modal';
import { graphql, withApollo, compose } from 'react-apollo';
import ItemSearchDetails from './itemSearchDetails';
import ItemSearchFilter from './itemSearchFilter';
import ItemSearchStart from './itemSearchStart';

import gql from 'graphql-tag';
import {
  itemSearchClientData,
} from './query/clientQuery';

import {
  setWsAction
} from './../../actions/socketActions';
import { wsOverviewData } from './../../constants/initData.js';
import {
  ITEM_SEARCH_QUERY,
  ITEM_SEARCH_START_QUERY,
  ITEM_SEARCH_DETAILS_QUERY
} from './query/serverQuery';
import FilterSummary from '../../components/tableFilter/filterSummary';
import {
  ALL,
  WS_ONSEND,
  DESC,
  CREATED_ON
} from '../../constants/frontEndConstants';

import moment from 'moment';
import 'moment-timezone';

const actionOptions = [
  {
    name: 'View Details',
    value: 'view_details'
  }
];

const messages = defineMessages({
  itemSearchCreatedStatus: {
    id: 'itemSearch.notYetStarted.status',
    defaultMessage: 'Not yet started'
  },
  itemSearchProcessingStatus: {
    id: 'itemSearch.processing.status',
    defaultMessage: 'Search in progress'
  },
  itemSearchProcessedStatus: {
    id: 'itemSearch.completed.status',
    defaultMessage: 'Completed'
  },
  itemSearchFailedStatus: {
    id: 'itemSearch.failed.status',
    defaultMessage: 'Failed'
  },
  manualAssignpps: {
    id: 'itemSearch.label.manualassignpps',
    defaultMessage: 'Manually-Assign PPS'
  },
  singleSKUtype: {
    id: 'itemSearch.label.singleSKUtype',
    defaultMessage: 'Single SKU'
  },
  multiSKUtype: {
    id: 'itemSearch.label.multiSKUtype',
    defaultMessage: 'Multi SKU'
  }
});

class ItemSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      page: 0,
      page_size: 20,
      data: null,
      legacyDataSubscribed: false,
      itemSearchList: []
    };
    this._processServerData = this._processServerData.bind(this);
    this._onScrollHandler = this._onScrollHandler.bind(this);
    this._fetchData = this._fetchData.bind(this);
    this._handleActions = this._handleActions.bind(this);
    this._triggerItemSearchStart = this._triggerItemSearchStart.bind(this);
    this._viewSearchDetails = this._viewSearchDetails.bind(this);
    this.showItemSearchFilter = this.props.showItemSearchFilter.bind(this);
    this._handelClick = this._handelClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState(state => {
        return {
          data: nextProps.data.ItemSearchList.list.serviceRequests
        };
      });
    }
    if (!this.state.legacyDataSubscribed && nextProps.socketAuthorized) {
      this.setState(
        {
          legacyDataSubscribed: true
        },
        () => {
          this._subscribeLegacyData();
        }
      );
    }
    if (
      nextProps.location &&
      nextProps.location.query &&
      (!this.state.query ||
        JSON.stringify(nextProps.location.query) !==
        JSON.stringify(this.state.query))
    ) {
      this.setState({ query: nextProps.location.query });
      this._refreshList(nextProps.location.query);
    }
  }

  _handelClick(index, field) {
    if (field.target.value == 'mannualassignpps') {
      this.startItemSearch(index);
    }
  }

  startItemSearch(index) {
    var itemSearchId = this.state.data[index].externalServiceRequestId;
    modal.add(ItemSearchStart, {
      title: '',
      size: 'large',
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      itemSearchID: itemSearchId,

      //.. all what you put in here you will get access in the modal props ;),
    });
  }

  _triggerItemSearchStart(index) {
    const _this = this;
    let { page } = _this.state;
    _this.props.client
      .query({
        query: ITEM_SEARCH_START_QUERY,
        variables: {
          input: {
            externalServiceRequestId: this.state.data[index]
              .externalServiceRequestId,
            attributes: {
              ppsIdList: [parseInt(this.state.data[index].attributes.ppsIdList, 10)]
            }
          }
        },
        fetchPolicy: 'network-only'
      })
      .then(data => {
        let existingData = JSON.parse(JSON.stringify(_this.state.data));
        let currentData = data.data.ItemSearchList.list.serviceRequests;
        let mergedData = existingData.concat(currentData);
        _this.setState(() => {
          return {
            data: mergedData,
            page
          };
        });
      });
  }

  _fetchData() {
    const _this = this;
    let { page } = _this.state;
    _this.props.client
      .query({
        query: ITEM_SEARCH_QUERY,
        variables: {
          input: {
            page_size: 10,
            page: ++page,
            order: DESC,
            sort: CREATED_ON
          }
        },
        fetchPolicy: 'network-only'
      })
      .then(data => {
        let existingData = JSON.parse(JSON.stringify(_this.state.data));
        let currentData = data.data.ItemSearchList.list.serviceRequests;
        let mergedData = existingData.concat(currentData);
        _this.setState(() => {
          return {
            data: mergedData,
            page
          };
        });
      });
  }

  _subscribeLegacyData() {
    this.props.initDataSentCall(wsOverviewData['default']);
  }

  _onScrollHandler(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      this._fetchData();
    }
  }

  _requestItemSearchList(taskId, status) {
    const _this = this;
    let { page } = _this.state;
    if (taskId || status) {
      _this.props.client
        .query({
          query: ITEM_SEARCH_DETAILS_QUERY,
          variables: {
            input: {
              "externalServiceRequestId": taskId,
              "status": status,
              "type": "SEARCH",
              "searchBy": "filter"
            }
          },
          fetchPolicy: 'network-only'
        })
        .then(data => {
          let currentData = data.data.ItemSearchDetailsList.list;
          _this.setState(() => {
            return {
              data: currentData,
              page
            };
          });
        });
    }
  }

  _refreshList(query) {
    let _this = this;
    if (query.scrolling) {
      var pageNo = this.props.currentPageNumber + 1;
      this.props.setCurrentPageNumber(pageNo);
      query = this.props.location.query;
      query.scrolling = true;
    }
    if (query)
      this.props.itemSearchfilterState({
        tokenSelected: {
          __typename: 'ItemSearchFilterTokenSelected',
          STATUS: query.status
            ? query.status.constructor === Array
              ? query.status
              : [query.status]
            : [ALL]
        },
        searchQuery: {
          __typename: 'ItemSearchFilterSearchQuery',
          ITEM_SEARCH_TASK_ID: query.taskId || '',
          FROM_DATE: query.fromDate || '',
          TO_DATE: query.toDate || ''
        },
        defaultToken: {
          __typename: 'ItemSearchFilterDefaultToken',
          STATUS: [ALL]
        }
      });
    _this._requestItemSearchList(query.taskId, query.status);

  }





  /**
   *
   */
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
    hashHistory.push({ pathname: '/itemsearch', query: {} });
  }
  _processServerData(data, nProps) {
    const { timeOffset } = this.props;
    let notYetStartedItemSearch = this.context.intl.formatMessage(messages.itemSearchCreatedStatus);
    let searchInProgressItemSearch = this.context.intl.formatMessage(messages.itemSearchProcessingStatus);
    let completedItemSearch = this.context.intl.formatMessage(messages.itemSearchProcessedStatus);
    let failedItemSearch = this.context.intl.formatMessage(messages.itemSearchFailedStatus);
    let singleSKUtype = this.context.intl.formatMessage(messages.singleSKUtype);
    let multiSKUtype = this.context.intl.formatMessage(messages.multiSKUtype);

    var processedData = [];
    if (this.state.data && this.state.data.length) {
      let data = this.state.data.slice(0);
      for (let i = 0, len = data.length; i < len; i++) {
        let tuple = {};
        let datum = data[i];
        let containers = datum.expectations.containers[0] || null;
        let typeOfSKU = (datum && datum.expectations.containers.length === 1 ? singleSKUtype : multiSKUtype);

        let productAttributes = containers
          ? containers.products[0].productAttributes
          : null;
        let pdfa_values = productAttributes
          ? productAttributes.pdfa_values
          : null;
        let sku = pdfa_values ? pdfa_values.product_sku : null;

        if (typeOfSKU === multiSKUtype) { // dont show SKU ID in this case
          tuple.header = [datum.externalServiceRequestId];
        }
        else {
          tuple.header = [datum.externalServiceRequestId, sku];
        }
        tuple.subHeader = [
          datum.attributes.ppsIdList[0]
            ? 'PPS ' + datum.attributes.ppsIdList[0]
            : null,
          typeOfSKU,
          moment(containers.products[0].updatedOn).tz(timeOffset).format('DD MMM,YYYY') || "--"
        ];
        if (datum.status == 'CREATED') { datum.status = notYetStartedItemSearch; }
        else if (datum.status == 'PROCESSING') { datum.status = searchInProgressItemSearch; }
        else if (datum.status == 'PROCESSED') { datum.status = completedItemSearch; }
        else if (datum.status == 'FAILED') { datum.status = failedItemSearch; }

        tuple.status = datum.status;
        tuple.displayStartButton =
          datum.status.toUpperCase() === "NOT YET STARTED" ? true : false;
        processedData.push(tuple);
      }
    }
    return processedData;
  }
  _handleActions(index, evt, action) {
    var value = evt.target.value;
    if (value) {
      if (value === 'view_details') {
        this._viewSearchDetails(index, action);
      }
    }
  }
  _viewSearchDetails(index, action) {
    var itemSearchId = this.state.data[index].externalServiceRequestId;
    modal.add(ItemSearchDetails, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      searchId: action,
      timeOffset: this.props.timeOffset,
      itemSearchId: itemSearchId
    });
  }
  render() {
    var filterHeight = screen.height - 190;
    let manualAssignpps = this.context.intl.formatMessage(messages.manualAssignpps);
    const _this = this;
    const tablerowdata = _this._processServerData();
    let toolbar = (
      <div>
        <div
          className='gor-filter-wrap'
          style={{
            display: _this.props.showFilter ? 'block' : 'none',
            height: filterHeight
          }}
        >
          <ItemSearchFilter
            showItemSearchFilter={_this.showItemSearchFilter}
            isFilterApplied={_this.props.isFilterApplied}
            itemSearchfilterState={_this.props.itemSearchFilterStatus || null}
          />
        </div>
        <div className='gorToolBar auditListingToolbar'>
          <div className='gorToolBarWrap auditListingToolbarWrap'>
            <div className='auditHeaderContainer'>
              <span className='auditHeader'>
                <FormattedMessage
                  id='itemSearch.header.itemSearch'
                  description='button label for item search'
                  defaultMessage='Item Search'
                />
              </span>
            </div>
          </div>
          <div className='gor-audit-filter-create-wrap'>
            <div className='gor-button-wrap'>
              <button
                className={
                  _this.props.isFilterApplied
                    ? 'gor-filterBtn-applied'
                    : 'gor-filterBtn-btn'
                }
                onClick={_this.showItemSearchFilter.bind(this, true)}
              >
                <div className='gor-manage-task' />
                <FormattedMessage
                  id='itemSearch.filter.filterLabel'
                  description='button label for filter'
                  defaultMessage='FILTER DATA'
                />
              </button>
            </div>
          </div>
        </div>
        {/*Filter Summary*/}
        <FilterSummary
          total={tablerowdata ? tablerowdata.length : 0}
          isFilterApplied={_this.props.isFilterApplied}
          filterText={
            <FormattedMessage
              id='itemSearch.filter.search.bar'
              description='total results for filter search bar'
              defaultMessage='{total} results found'
              values={{ total: tablerowdata ? tablerowdata.length : 0 }}
            />
          }
          refreshList={_this._clearFilter.bind(this)}
          refreshText={
            <FormattedMessage
              id='itemSearch.filter.search.bar.showall'
              description='button label for show all'
              defaultMessage='Show all results'
            />
          }
        />
      </div>
    );

    return (
      <div>
        <div>
          <div className='gor-Auditlist-table'>
            {toolbar}
            <div className='waveListWrapper'>
              {this.props.data.loading && (
                <Spinner
                  isLoading={_this.props.data.loading}
                  setSpinner={null}
                />
              )}
              <GTable options={['table-bordered', 'table-itemsearch']}>
                {tablerowdata && tablerowdata.length >= 1 ? (
                  <GTableBody
                    data={tablerowdata}
                    onScrollHandler={_this._onScrollHandler}
                  >
                    {tablerowdata
                      ? tablerowdata.map(function (row, idx) {
                        return (
                          <GTableRow
                            key={row.header[0]}
                            index={idx}
                            data={tablerowdata}
                          >
                            <div className='table-cell'>

                            </div>
                            <div className='table-cell'>
                              <span>
                                <i className='systemGenerated' />
                              </span>
                              <DotSeparatorContent
                                header={row.header}
                                subHeader={row.subHeader}
                                separator={<div className='dotImage' />}
                              />
                            </div>
                            <div className='table-cell'>{row.status}</div>
                            <div className='table-cell'>
                              <div className='row inner'>
                                {' '}
                                <div className='table-cell'>

                                  {row.displayStartButton && (
                                    <ActionDropDown
                                      style={{
                                        width: '115px',
                                        display: 'inline',
                                        float: 'left',
                                        'padding-left': '25px'
                                      }}
                                      clickOptionBack={_this._handelClick.bind(this, idx)}
                                      data={[{ name: manualAssignpps, value: 'mannualassignpps' }]}
                                    >
                                      <button className='gor-add-btn gor-listing-button'>
                                        <FormattedMessage
                                          id='itemSearch.start.itemSearch'
                                          description='button label for start'
                                          defaultMessage='START'
                                        />
                                        <div className='got-add-notch' />
                                      </button>
                                    </ActionDropDown>
                                  )}

                                </div>
                                <div className='table-cell'>
                                  <ActionDropDown
                                    style={{ right: 0 }}
                                    displayId={row.header[0]}
                                    id={row.header[0]}
                                    clickOptionBack={_this._handleActions.bind(this, idx)}
                                    data={actionOptions}
                                  >
                                    <div className='embeddedImage' />
                                  </ActionDropDown>
                                </div>
                              </div>
                            </div>
                          </GTableRow>
                        );
                      })
                      : ''}
                  </GTableBody>
                ) : (
                    <div className='gor-no-data'>
                      <FormattedMessage
                        id='itemSearch.notfound'
                        defaultMessage='No Records Present'
                        description='Item Search not found'
                      />
                    </div>
                  )}
              </GTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    socketAuthorized: state.recieveSocketActions.socketAuthorized,
    timeOffset:
      state.authLogin.timeOffset ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};
const withQuery = graphql(ITEM_SEARCH_QUERY, {
  props: data => data,
  options: ({ match, location }) => ({
    variables: {
      input: {
        page: 0,
        page_size: 10,
        order: DESC,
        sort: CREATED_ON

      }
    },
    fetchPolicy: 'network-only'
  })
});

const SET_VISIBILITY = gql`
  mutation setAuditFiler($filter: String!) {
          setShowItemSearchFilter(filter: $filter) @client
      }
    `;

const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
          setItemSearchFilterApplied(isFilterApplied: $isFilterApplied) @client
      }
    `;


const SET_LIST_DATA = gql`
  mutation setListData($listData: String!) {
          setAuditListData(listData: $listData) @client
      }
    `;
const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
          setItemSearchFilterState(state: $state) @client
      }
    `;

const withClientData = graphql(itemSearchClientData, {
  props: data => ({
    showFilter: data.data.itemSearchFilter.display,
    isFilterApplied: data.data.itemSearchFilter.isFilterApplied,
    isUpdateSubsciption: data.data.itemSearchFilter.isUpdateSubsciption,
    currentPageNumber: data.data.itemSearchFilter.pageNumber,
    itemSearchFilterStatus: JSON.parse(
      JSON.stringify(data.data.itemSearchFilter.filterState)
    )
  })
});

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: ({ mutate, ownProps }) => ({
    showItemSearchFilter: function (show) {
      mutate({ variables: { filter: show } });
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

const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    itemSearchfilterState: function (state) {
      mutate({ variables: { state: state } });
    }
  })
});


ItemSearch.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

var mapDispatchToProps = function (dispatch) {
  return {
    initDataSentCall: function (data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }));
    }
  };
};

export default compose(
  withClientData,
  setVisibilityFilter,
  setFilterApplied,
  setFilterState,
  withQuery,
  withApollo
)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemSearch)
);
