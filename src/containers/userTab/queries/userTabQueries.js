import gql from 'graphql-tag';

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID) {
    deleteUser(id: $id) {
      status
    }
  }
`;
export const EDIT_USER_MUTATION = gql`
  mutation editUser($id: ID, $input: CreateUserInput) {
    editUser(id: $id, input: $input) {
      username
      firstname
      lastname
      code
      description
      details
    }
  }
`;
export const SUBSCRIPTION_QUERY = gql`
  subscription USER_CHANNEL($username: String) {
    UserList(input: { username: $username }) {
      list {
        first_name
        last_name
        user_id
        logged_in
        role
        user_name
        login_time
        full_name
      }
    }
  }
`;

export const USERS_QUERY = gql`
  query UserList($input: UserListParams) {
    UserList(input: $input) {
      list {
        first_name
        last_name
        user_id
        logged_in
        role
        user_name
        login_time
        full_name
      }
    }
  }
`;
export const userClientData = gql`
  query {
    todos @client
    userFilter @client {
      display
      isFilterApplied
      filterState {
        tokenSelected {
          STATUS
          ROLE
          WORK_MODE
          LOCATION
        }
        searchQuery {
          USER_NAME
        }
        defaultToken {
          STATUS
          ROLE
          WORK_MODE
          LOCATION
        }
      }
    }
  }
`;

export const SET_VISIBILITY = gql`
  mutation setUserFiler($filter: String!) {
    setShowUserFilter(filter: $filter) @client
  }
`;

export const SET_FILTER_APPLIED = gql`
  mutation setFilterApplied($isFilterApplied: String!) {
    setUserFilterApplied(isFilterApplied: $isFilterApplied) @client
  }
`;
export const SET_FILTER_STATE = gql`
  mutation setFilterState($state: String!) {
    setUserFilterState(state: $state) @client
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput) {
    createUser(input: $input) {
      password
      username
      code
      description
      firstname
      lastname
    }
  }
`;
export const ROLE_LIST_QUERY = gql`
  query RoleList($input: RoleListParams) {
    RoleList(input: $input) {
      list {
        id
        name
        internal
      }
    }
  }
`;
