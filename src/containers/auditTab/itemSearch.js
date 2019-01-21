/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React from 'react';
import { connect } from 'react-redux';
import GTable from '../../components/gor-table-component';
import {
  GTableHeader,
  GTableHeaderCell,
  GTableBody,
  GTableRow
} from '../../components/gor-table-component';
import { FormattedMessage, defineMessages } from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
//import NameInitial from '../../components/NameInitial/nameInitial';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
//import ProgressBar from '../../components/progressBar/progressBar.js';
import ActionDropDown from '../../components/actionDropDown/actionDropDown';
import { modal } from 'react-redux-modal';
import { graphql, withApollo, compose } from 'react-apollo';
import { ITEM_SEARCH_QUERY } from './query/serverQuery';
import ItemSearchDetails from './itemSearchDetails';
import ItemSearchFilter from './itemSearchFilter';
//import ListDropDown from '../../components/gor-list-dropdown';
//import Dimensions from 'react-dimensions';
import // SUBSCRIPTION_QUERY,
// MSU_LIST_QUERY,
// MSU_LIST_POST_FILTER_QUERY,
// MSU_START_RECONFIG_QUERY,
// MSU_STOP_RECONFIG_QUERY,
// MSU_RELEASE_QUERY,
//auditClientData,
//SET_VISIBILITY
// SET_FILTER_APPLIED,
// SET_FILTER_STATE
'./query/clientQuery';
import gql from 'graphql-tag';
import {
  auditClientData,
  auditNeedRefreshFlag,
  auditSelectedData,
  auditSpinnerState
} from './query/clientQuery';
import {
  AUDIT_QUERY,
  AUDIT_SUBSCRIPTION_QUERY,
  AUDIT_REQUEST_QUERY
} from './query/serverQuery';

const actionOptions = [
  {
    name: 'View Details',
    value: 'view_details'
  },
  {
    name: 'Pause',
    value: 'pause'
  },
  {
    name: 'Cancel',
    value: 'cancel'
  }
];

class ItemSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      page_size: 20,
      data: null
    };
    this._processServerData = this._processServerData.bind(this);
    this._onScrollHandler = this._onScrollHandler.bind(this);
    this._fetchData = this._fetchData.bind(this);
    this._handleActions = this._handleActions.bind(this);
    this._viewSearchDetails = this._viewSearchDetails.bind(this);
    this.showAuditFilter = this.props.showAuditFilter.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState(state => {
        return {
          data: nextProps.data.ItemSearchList.list.serviceRequests
        };
      });
    }
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
            page: ++page
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
  _onScrollHandler(event) {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      this._fetchData();
    }
  }
  _processServerData() {
    var processedData = [];
    if (this.state.data && this.state.data.length) {
      let data = this.state.data.slice(0);
      for (let i = 0, len = data.length; i < len; i++) {
        let tuple = {};
        let datum = data[i];
        let containers = datum.expectations.containers[0] || null;
        let productAttributes = containers
          ? containers.products[0].productAttributes
          : null;
        let pdfa_values = productAttributes
          ? productAttributes.pdfa_values
          : null;
        let sku = pdfa_values ? pdfa_values.product_sku : null;
        tuple.header = [datum.externalServiceRequestId, sku];
        tuple.subHeader = [
          datum.attributes.ppsIdList[0]
            ? 'PPS ' + datum.attributes.ppsIdList[0]
            : null
        ];
        tuple.status = datum.status;
        tuple.displayStartButton =
          datum.status.toUpperCase() === 'CREATED' ? true : false;
        processedData.push(tuple);
      }
    }
    return processedData;
  }
  _handleActions(evt, action) {
    var value = evt.target.value;
    if (value) {
      if (value === 'view_details') {
        this._viewSearchDetails(action);
      }
    }
  }
  _viewSearchDetails(action) {
    modal.add(ItemSearchDetails, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      searchId: action,
      timeOffset: this.props.timeOffset
    });
  }
  render() {
    var filterHeight = screen.height - 190;
    const _this = this;
    const tablerowdata = _this._processServerData(); //[{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[38,""],"subHeader":[["PPS 1"],"Single SKU","yesterday, 18:29"],"audit_id":"UmvjVRzWiP","display_id":38},"auditProgress":{"percentage":0,"flag":false,"status":"Waiting for the operator to login"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[37,""],"subHeader":[["PPS 5"],"Multi location","Dec 27, 15:05"],"audit_id":"SDod3kgYuY","display_id":37},"auditProgress":{"percentage":0,"flag":false,"status":"Processing audit task"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[36,""],"subHeader":["Multi PPS","Single SKU","Dec 27, 11:54"],"audit_id":"iGpKxPTKRw","display_id":36},"auditProgress":{"percentage":33.333333333333336,"flag":true,"status":"1 completed out of 3"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[35,""],"subHeader":[["PPS 4"],"Single SKU","Dec 26, 18:59 - 19:03"],"audit_id":"wzAxam7mVj","display_id":35},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[33,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 16:14"],"audit_id":"KscU3jyYFF","display_id":33},"auditProgress":{"percentage":0,"flag":false,"status":"Paused"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":true,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[32,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 15:56 - 16:11"],"audit_id":"qxtjAPF4Fh","display_id":32},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[31,""],"subHeader":[["PPS 4"],"Single location","Dec 20, 12:23 - 12:25"],"audit_id":"yG5ELy7MV3","display_id":31},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[30,""],"subHeader":[["PPS 5"],"Single location","Dec 19, 18:12"],"audit_id":"KmC4LdEi67","display_id":30},"auditProgress":{"percentage":0,"flag":true,"status":"0 completed out of 1"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Cancel","value":"cancel"},{"name":"Duplicate","value":"duplicate"},{"name":"Pause","value":"pause"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[29,""],"subHeader":[["PPS 4"],"Single location","Dec 19, 18:09 - 18:11"],"audit_id":"JWZoH2NXQt","display_id":29},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]},{"initialName":{"name":"admin admin","flag":"admin admin"},"auditDetails":{"header":[28,""],"subHeader":[["PPS 4"],"Single location","Dec 19, 18:05 - 18:08"],"audit_id":"dUxFvKiV6i","display_id":28},"auditProgress":{"percentage":100,"flag":false,"status":"Completed"},"Status":{"resolveStatus":"","reAuditStatus":"","approvedState":""},"button":{"startButton":false,"resolveButton":false,"reAudit":false},"butoonToSHow":[{"name":"View Details","value":"viewdetails"},{"name":"Duplicate","value":"duplicate"}]}];

    return (
      <div>
        <div
          className='gor-filter-wrap'
          style={{
            display: _this.props.showFilter ? 'block' : 'none',
            height: filterHeight
          }}
        >
          <ItemSearchFilter
            auditDetail={_this.props.AuditList}
            pollingFunc={_this.polling}
            pollTimerId={_this.state.timerId}
            showAuditFilter={_this.showAuditFilter}
            isFilterApplied={_this.props.isFilterApplied}
            auditfilterState={_this.props.auditFilterStatus || null}
          />
        </div>
        <div className='gorToolBar auditListingToolbar'>
          <div className='gorToolBarWrap auditListingToolbarWrap'>
            <div className='auditHeaderContainer'>
              <label className='container'>
                <input type='checkbox' onChange={null} />
                <span className={'checkmark'} />
              </label>
              <span className='auditHeader'>
                <FormattedMessage
                  id='itemSearch.header.label'
                  description='header label for Item Search'
                  defaultMessage='Item Search'
                />
              </span>
            </div>
          </div>

          <div
            style={{ float: 'right', marginTop: '18px', width: '21%' }}
            className='gor-itemSearch-filter-create-wrap'
          >
            <div className='gor-button-wrap'>
              <button
                className={
                  this.props.isFilterApplied
                    ? 'gor-filterBtn-applied'
                    : 'gor-filterBtn-btn'
                }
                onClick={this.showAuditFilter.bind(this, true)}
              >
                <div className='gor-manage-task' />
                <FormattedMessage
                  id='audit.filter.filterLabel'
                  description='button label for filter'
                  defaultMessage='FILTER DATA'
                />
              </button>
            </div>
          </div>
        </div>
        <div className='waveListWrapper'>
          {this.props.data.loading && (
            <Spinner isLoading={_this.props.data.loading} setSpinner={null} />
          )}
          <GTable options={['table-bordered', 'table-itemsearch']}>
            {tablerowdata && tablerowdata.length >= 1 ? (
              <GTableBody
                data={tablerowdata}
                onScrollHandler={_this._onScrollHandler}
              >
                {tablerowdata
                  ? tablerowdata.map(function(row, idx) {
                      return (
                        <GTableRow
                          key={row.header[0]}
                          index={idx}
                          data={tablerowdata}
                        >
                          <div className='table-cell'>
                            {row.displayStartButton && (
                              <label className='container'>
                                <input type='checkbox' onChange={null} />
                                <span className={'checkmark'} />
                              </label>
                            )}
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
                                  <button
                                    className='gor-add-btn gor-listing-button'
                                    onClick={null}
                                  >
                                    {'Start'}
                                  </button>
                                )}
                              </div>
                              <div className='table-cell'>
                                <ActionDropDown
                                  style={{ right: 0 }}
                                  displayId={row.header[0]}
                                  id={row.header[0]}
                                  clickOptionBack={_this._handleActions}
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
        page_size: 10
      }
    },
    fetchPolicy: 'network-only'
  })
});

const SET_VISIBILITY = gql`
  mutation setAuditFiler($filter: String!) {
    setShowAuditFilter(filter: $filter) @client
  }
`;

const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setAuditFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`;
const SET_UPDATE_SUBSCRIPTION = gql`
  mutation setUpdateSubscription($isUpdateSubsciption: String!) {
    setAuditUpdateSubscription(isUpdateSubsciption: $isUpdateSubsciption)
      @client
  }
`;
const SET_PAGE_NUMBER = gql`
  mutation setPageNumber($pageNumber: Int!) {
    setAuditPageNumber(pageNumber: $pageNumber) @client
  }
`;
const SET_AUDIT_SPINNER_STATE = gql`
  mutation setauditSpinner($auditSpinner: String!) {
    setAuditSpinnerState(auditSpinner: $auditSpinner) @client
  }
`;

const SET_LIST_DATA = gql`
  mutation setListData($listData: String!) {
    setAuditListData(listData: $listData) @client
  }
`;
const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setAuditFilterState(state: $state) @client
  }
`;
const SET_CHECKED_AUDIT = gql`
  mutation setCheckedAudit($checkedAudit: Array!) {
    setCheckedAudit(checkedAudit: $checkedAudit) @client
  }
`;

const withClientData = graphql(auditClientData, {
  props: function(data) {
    return {
      props: data => ({
        showFilter: data.data.auditFilter
          ? data.data.auditFilter.display
          : false,
        isFilterApplied: data.data.auditFilter
          ? data.data.auditFilter.isFilterApplied
          : false,
        isUpdateSubsciption: data.data.auditFilter.isUpdateSubsciption,
        currentPageNumber: data.data.auditFilter.pageNumber,
        auditFilterStatus: data.data.auditFilter
          ? JSON.parse(JSON.stringify(data.data.auditFilter.filterState))
          : null
      })
    };
  }
});

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: ({ mutate, ownProps }) => ({
    showAuditFilter: function(show) {
      mutate({ variables: { filter: show } });
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

const setPageNumber = graphql(SET_PAGE_NUMBER, {
  props: ({ mutate, ownProps }) => ({
    setCurrentPageNumber: function(number) {
      mutate({ variables: { pageNumber: number } });
    }
  })
});
const setListData = graphql(SET_LIST_DATA, {
  props: ({ mutate, ownProps }) => ({
    listDataAudit: function(data) {
      mutate({ variables: { listData: data } });
    }
  })
});

const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    auditfilterState: function(state) {
      mutate({ variables: { state: state } });
    }
  })
});
const setSpinnerState = graphql(SET_AUDIT_SPINNER_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditSpinner: function(spinnerState) {
      mutate({ variables: { auditSpinner: spinnerState } });
    }
  })
});

ItemSearch.contextTypes = {
  intl: React.PropTypes.object.isRequired
};
export default compose(
  withClientData,
  setVisibilityFilter,
  withQuery,
  withApollo
)(
  connect(
    mapStateToProps,
    null
  )(ItemSearch)
);
