import React from 'react';
import UsersTable from './usersTable';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';
import { stringConfig } from '../../constants/backEndConstants';
import {
  INITIAL_HEADER_ORDER,
  WS_ONSEND
} from '../../constants/frontEndConstants';
import { hashHistory } from 'react-router';
import { modal } from 'react-redux-modal';
import AddUser from './addNewUser';
import UserFilter from './userFilter';
import { wsOverviewData } from '../../constants/initData';
import { FormattedMessage } from 'react-intl';
import FilterSummary from '../../components/tableFilter/filterSummary';
import { graphql, withApollo, compose } from 'react-apollo';
import { setWsAction } from '../../actions/socketActions';
import {
  SUBSCRIPTION_QUERY,
  USERS_QUERY,
  userClientData,
  SET_VISIBILITY,
  SET_FILTER_APPLIED,
  SET_FILTER_STATE
} from './queries/userTabQueries';
import gql from 'graphql-tag';
//Mesages for internationalization
const messages = defineMessages({
  userOperator: {
    id: 'userDetails.operator',
    defaultMessage: 'Operator'
  },
  userAdmin: {
    id: 'userDetails.userAdmin',
    defaultMessage: 'Admin'
  },
  qc_operator: {
    id: 'userDetails.qc_operator',
    defaultMessage: 'QC Operator'
  },
  packing_operator: {
    id: 'userDetails.packing_operator',
    defaultMessage: 'Packing Operator'
  },

  userManager: {
    id: 'userDetails.manager',
    defaultMessage: 'Manager'
  },
  userPick: {
    id: 'userDetails.pick.status',
    defaultMessage: 'Pick'
  },
  auditCompletedStatus: {
    id: 'auditdetail.completed.status',
    defaultMessage: 'Audited'
  },
  userPut: {
    id: 'userDetails.put.status',
    defaultMessage: 'Put'
  },
  userAudit: {
    id: 'userDetails.audit.status',
    defaultMessage: 'Audit'
  },
  userFront: {
    id: 'userDetails.front.status',
    defaultMessage: 'Front'
  },
  userBack: {
    id: 'userDetails.back.status',
    defaultMessage: 'Back'
  },
  userOnline: {
    id: 'userDetails.online.status',
    defaultMessage: 'Online'
  },
  userOffline: {
    id: 'userDetails.offline.status',
    defaultMessage: 'Offline'
  },
  userLocation: {
    id: 'userDetails.location',
    defaultMessage: 'PPS {ppsId}'
  }
});

class UsersTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: null, legacyDataSubscribed: false };
    // keep track of subscription handle to not subscribe twice.
    // we don't need to unsubscribe on unmount, because the subscription
    // gets stopped when the query stops.
    this.subscription = null;
    (this.linked = false),
      (this.showUserFilter = this.props.showUserFilter.bind(this));
    this._subscribeLegacyData = this._subscribeLegacyData.bind(this);
  }
  _subscribeLegacyData() {
    this.props.initDataSentCall(wsOverviewData['default']);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.query &&
      (!this.state.query ||
        JSON.stringify(nextProps.location.query) !==
          JSON.stringify(this.state.query))
    ) {
      this.setState({ query: nextProps.location.query });

      this._refreshList(nextProps.location.query);
    }

    if (
      !this.props.data.UserList &&
      nextProps.data.UserList &&
      !this.subscription &&
      !nextProps.data.loading
    ) {
      this.updateSubscription(nextProps.location.query);
    }
    if (!this.state.legacyDataSubscribed && nextProps.socketAuthorized) {
      this.setState(
        () => {
          return { legacyDataSubscribed: true };
        },
        () => {
          this._subscribeLegacyData();
        }
      );
    }
  }

  componentWillUnMount() {
    if (this.subscription) {
      this.subscription();
    }
  }

  updateSubscription(variables) {
    if (this.subscription) {
      this.subscription();
    }
    this.subscription = this.props.data.subscribeToMore({
      variables: variables,
      document: SUBSCRIPTION_QUERY,
      notifyOnNetworkStatusChange: true,
      updateQuery: (previousResult, newResult) => {
        console.log(newResult);

        return Object.assign(
          {},
          {
            UserList: {
              list: newResult.subscriptionData.data.UserList.list,
              __typename: previousResult.UserList.__typename
            }
          }
        );
      }
    });
  }

  _processUserDetails() {
    if (!this.props.data.UserList) {
      return [];
    }
    var nProps = this,
      data = this._filterList(
        nProps.props.data.UserList,
        nProps.props.location.query
      );
    let operator = nProps.context.intl.formatMessage(messages.userOperator);
    let admin = nProps.context.intl.formatMessage(messages.userAdmin);
    let qc_operator = nProps.context.intl.formatMessage(messages.qc_operator);
    let packing_operator = nProps.context.intl.formatMessage(
      messages.packing_operator
    );
    let manager = nProps.context.intl.formatMessage(messages.userManager);
    let pick = nProps.context.intl.formatMessage(stringConfig.pick);
    let put = nProps.context.intl.formatMessage(stringConfig.put);
    let audit = nProps.context.intl.formatMessage(stringConfig.audit);
    let front = nProps.context.intl.formatMessage(messages.userFront);
    let back = nProps.context.intl.formatMessage(messages.userBack);
    let online = nProps.context.intl.formatMessage(stringConfig.online);
    let offline = nProps.context.intl.formatMessage(stringConfig.offline);
    var role = {
      butler_ui: operator,
      butler_supervisor: manager,
      admin: admin,
      qc_operator: qc_operator,
      packing_operator: packing_operator
    };
    var work_mode = { pick: pick, put: put, audit: audit };
    var work_place = { front: front, back: back };

    var userDetails = [],
      roleIdArr = [],
      userData = {};
    for (var i = data.length - 1; i >= 0; i--) {
      userData.id =
        (data[i].first_name || '--') + ' ' + (data[i].last_name || '--');
      if (data[i].logged_in) {
        userData.status = online;
        userData.statusClass = 'online';
        if (data[i].pps.pps_mode && data[i].pps.seat_type) {
          userData.workMode =
            work_mode[data[i].pps.pps_mode] +
            ' ' +
            work_place[data[i].pps.seat_type];
        } else if (data[i].pps.pps_mode) {
          userData.workMode = work_mode[data[i].pps.pps_mode];
        }

        userData.location = nProps.context.intl.formatMessage(
          messages.userLocation,
          { ppsId: data[i].pps.pps_id }
        );
        userData.logInTime =
          nProps.context.intl.formatTime(data[i].login_time, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
          }) +
          ' (' +
          nProps.context.intl.formatRelative(data[i].login_time) +
          ')';
      } else {
        userData.status = offline;
        userData.statusClass = 'offline';
        userData.workMode = '--';
        userData.location = '--';
        userData.logInTime = '--';
      }
      console.log(data[i]);
      userData.role = [];
      userData.uid = data[i].user_id;
      userData.userName = data[i].user_name;
      userData.first = data[i].first_name;
      userData.last = data[i].last_name;
      userData.full_name = data[i].full_name;

      const mappedRoles =
        data[i].role.length &&
        data[i].role.map(elem => {
          const roleLabel = elem
            .toLowerCase()
            .split('role_')
            .join('');
          return role[roleLabel] ? role[roleLabel] : roleLabel;
        });
      if (mappedRoles.length > 0) {
        userData.role.push(mappedRoles);
      }

      userDetails.push(userData);
      userData = {};
    }

    return userDetails;
  }

  _filterList(init_data, query) {
    let filtered_data = init_data.list;
    if (query.username) {
      var match_exp = new RegExp(query.username.split(' ').join('|'), 'gi');
      filtered_data = filtered_data.filter(function(user) {
        return user.full_name.match(match_exp);
      });
    }

    if (query.status) {
      query.status =
        query.status.constructor === Array ? query.status : [query.status];
      filtered_data = filtered_data.filter(function(user) {
        if (query.status.length !== 2) {
          let currentStatus = query.status[0] === 'online' ? true : false;
          return currentStatus === user.logged_in ? user : '';
        }
      });
    }

    if (query.role) {
      query.role = query.role.constructor === Array ? query.role : [query.role];
      filtered_data = filtered_data.filter(function(user) {
        return query.role.indexOf(user.role) > -1;
      });
    }

    if (query.mode) {
      query.mode = query.mode.constructor === Array ? query.mode : [query.mode];
      filtered_data = filtered_data.filter(function(user) {
        return query.mode.indexOf(user.role) > -1;
      });
    }
    return filtered_data;
  }

  /**
   * The method will update the subscription packet
   * and will fetch the data from the socket.
   * @private
   */
  _refreshList(query) {
    let filterSubsData = {};
    if (query.username) {
      let name_query = query.username.split(' ');
      name_query = name_query.filter(function(word) {
        return !!word;
      });
      filterSubsData['username'] =
        name_query.length > 1 ? name_query : name_query.join('').trim();
    }
    if (query.status) {
      query.status =
        query.status.constructor === Array ? query.status : [query.status];
      if (query.status.length !== 2) {
        filterSubsData['logged_in'] = [
          'is',
          query.status[0] === 'online' ? 'true' : 'false'
        ];
      }
    }
    if (query.role) {
      query.role = query.role.constructor === Array ? query.role : [query.role];
      filterSubsData['role'] = [
        'in',
        query.role.constructor === Array ? query.role : [query.role]
      ];
    }
    if (query.mode) {
      let pps_list = [];
      query.mode = query.mode.constructor === Array ? query.mode : [query.mode];
      query.mode.forEach(function(mode) {
        pps_list.push(
          mode.split('__').length > 1
            ? {
                pps_mode: mode.split('__')[0],
                seat_type: mode.split('__')[1]
              }
            : { pps_mode: mode.split('__')[0] }
        );
      });
      filterSubsData['pps'] = ['in', pps_list];
    }
    if (
      Object.keys(query).filter(function(el) {
        return el !== 'page';
      }).length !== 0
    ) {
      this.props.filterApplied(true);
    } else {
      this.props.filterApplied(false);
    }
    this.props.userfilterState({
      tokenSelected: {
        STATUS: query.status || ['all'],
        ROLE: query.role || ['all'],
        WORK_MODE: query.mode || ['all'],
        LOCATION: ['all'],
        __typename: 'UserFilterTokenSelected'
      },
      searchQuery: {
        USER_NAME: query.username || null,
        __typename: 'UserFilterSearchQuery'
      },
      defaultToken: {
        STATUS: ['all'],
        ROLE: ['all'],
        WORK_MODE: ['all'],
        LOCATION: ['all'],
        __typename: 'UserFilterDefaultToken'
      },
      __typename: 'UserFilterState'
    });
  }

  /**
   * The method will update and send the subscription packet
   * to fetch the default list of users
   * @private
   */
  _clearFilter() {
    hashHistory.push({ pathname: '/users', query: {} });
  }

  addModal() {
    modal.add(AddUser, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true, // (optional) if you don't wanna show the top right close button
      existingUserIds: this.props.data.UserList.list.map(function(user) {
        return user.user_name;
      })
      //.. all what you put in here you will get access in the modal props ;),
    });
  }

  _setFilter() {
    var newState = !this.props.showFilter;
    this.props.setFilter(newState);
  }

  render() {
    let filterHeight = screen.height - 190 - 50;
    let updateStatusIntl = '';
    var itemNumber = 7,
      userList;
    userList = this._processUserDetails();
    let self = this;
    return (
      <div>
        <div>
          <div className='gor-User-Table'>
            <div
              className='gor-filter-wrap'
              style={{
                width: this.props.showFilter ? '350px' : '0px',
                height: filterHeight
              }}
            >
              <UserFilter
                userfilterState={this.props.userfilterState}
                noResults={userList.length === 0}
                isFilterApplied={this.props.isFilterApplied}
                filterState={this.props.userFilterStatus}
                showUserFilter={this.showUserFilter}
                userData={userList}
                responseFlag={this.props.responseFlag}
              />
            </div>

            <div className='gorToolBar'>
              <div className='gorToolBarWrap'>
                <div className='gorToolBarElements'>
                  <FormattedMessage
                    id='user.table.heading'
                    description='Heading for users table'
                    defaultMessage='Users'
                  />
                </div>
                <div className='gorToolBarElements'>
                  <div className='gor-user-add-wrap'>
                    <button
                      className='gor-add-btn'
                      onClick={this.addModal.bind(this)}
                    >
                      <FormattedMessage
                        id='user.button.heading'
                        description='button heading for users table'
                        defaultMessage='Add new user'
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className='filterWrapper'>
                <div className='gorToolBarDropDown'>
                  <div className='gor-button-wrap'>
                    <div className='gor-button-sub-status'>
                      {updateStatusIntl} {updateStatusIntl}{' '}
                    </div>
                    <button
                      className={
                        this.props.isFilterApplied
                          ? 'gor-filterBtn-applied'
                          : 'gor-filterBtn-btn'
                      }
                      onClick={this.showUserFilter.bind(this, true)}
                    >
                      <div className='gor-manage-task' />
                      <FormattedMessage
                        id='gor.filter.filterLabel'
                        description='button label for filter'
                        defaultMessage='Filter data'
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*Filter Summary*/}
            <FilterSummary
              noResults={userList.length === 0}
              total={userList.length || 0}
              isFilterApplied={this.props.isFilterApplied}
              responseFlag={this.props.responseFlag}
              filterText={
                <FormattedMessage
                  id='userList.filter.search.bar'
                  description='total users for filter search bar'
                  defaultMessage='{totalUsers} Users found'
                  values={{ totalUsers: userList.length || 0 }}
                />
              }
              refreshList={this._clearFilter.bind(this)}
              refreshText={
                <FormattedMessage
                  id='userList.filter.search.bar.showall'
                  description='button label for show all'
                  defaultMessage='Show all Users'
                />
              }
            />

            <UsersTable data={userList} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userSortHeader: state.sortHeaderState.userHeaderSort || 'role',
    userSortHeaderState:
      state.sortHeaderState.userHeaderSortOrder || INITIAL_HEADER_ORDER,
    socketAuthorized: state.recieveSocketActions.socketAuthorized
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initDataSentCall: function(data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }));
    }
  };
};

UsersTab.contextTypes = {
  intl: React.PropTypes.object.isRequired,
  client: React.PropTypes.object.isRequired
};
UsersTab.PropTypes = {
  manager: React.PropTypes.array,
  userSortHeader: React.PropTypes.string,
  userSortHeaderState: React.PropTypes.string,
  showFilter: React.PropTypes.bool,
  isFilterApplied: React.PropTypes.bool,
  auth_token: React.PropTypes.object,
  userHeaderSort: React.PropTypes.func,
  userHeaderSortOrder: React.PropTypes.func,
  showUserFilter: React.PropTypes.func,
  filterApplied: React.PropTypes.func,
  wsSubscriptionData: React.PropTypes.object
};

const withQuery = graphql(USERS_QUERY, {
  props: data => data,
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: 'network-only'
  })
});

const withClientData = graphql(userClientData, {
  props: data => ({
    todos: data.data.todos,
    showFilter: data.data.userFilter.display,
    isFilterApplied: data.data.userFilter.isFilterApplied,
    userFilterStatus: JSON.parse(
      JSON.stringify(data.data.userFilter.filterState)
    )
  })
});

const setVisibilityFilter = graphql(SET_VISIBILITY, {
  props: ({ mutate, ownProps }) => ({
    showUserFilter: function(show) {
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
const setFilterState = graphql(SET_FILTER_STATE, {
  props: ({ mutate, ownProps }) => ({
    userfilterState: function(state) {
      mutate({ variables: { state: state } });
    }
  })
});
export default compose(
  withClientData,
  setVisibilityFilter,
  setFilterApplied,
  setFilterState,
  withQuery
)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersTab)
);
