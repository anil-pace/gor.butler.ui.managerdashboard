import React from "react"
import { hashHistory } from "react-router"
import { FormattedMessage } from "react-intl"
import gql from "graphql-tag"
import { connect } from "react-redux"
import { graphql, withApollo, compose } from "react-apollo"
import { SUGGESTED_COUNT, CREATE_SUGGESTED_AUDIT } from "./query/serverQuery"
import {
  GREATER_THAN_TOTAL_COUNT,
  NOT_A_VALID_NUMBER
} from "../../constants/frontEndConstants"
import {
  notifyfeedback,
  notifyFail,
  notifySuccess
} from "../../actions/validationActions"
import Spinner from "../../components/spinner/Spinner"

class SuggestAudit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spinnerState: false,
      breached_slots: 0,
      total_slots: 0,
      suggested_slots: 0,
      remaining_days: 0,
      isEnabledCreateAuditButton: false
    }
  }

  async callGraphql(_query, variables = undefined) {
    return await this.props.client.query({
      query: _query,
      variables: { input: { slot_count: variables } },
      fetchPolicy: "network-only"
    })
  }

  setIntialData(resp) {
    if (resp === "ERROR") {
      this.setState({ error: true })
      return
    }
    this.setState({
      breached_slots: resp.data.AuditSuggestedCount
        ? resp.data.AuditSuggestedCount.list.breached_slots_count
        : 0,
      suggested_slots: resp.data.AuditSuggestedCount
        ? resp.data.AuditSuggestedCount.list.suggested_slots_count
        : 0,
      total_slots: resp.data.AuditSuggestedCount
        ? resp.data.AuditSuggestedCount.list.total_slots
        : 0,
      remaining_days: resp.data.AuditSuggestedCount
        ? resp.data.AuditSuggestedCount.list.remaining_days
        : 0
    })
  }

  componentWillMount() {
    this.callGraphql(SUGGESTED_COUNT)
      .then(resp => {
        this.setIntialData(resp)
      })
      .catch(err => {
        this.setIntialData("ERROR")
      })
  }

  closeModal() {
    let query = { shouldRefresh: true }
    this.setState({ spinnerState: false })
    this.props.removeModal()
    this.props.refreshList(query)
  }

  createSuggestedAudit() {
    let variables = this.slotCount.value
    this.setState({ spinnerState: true })
    this.callGraphql(CREATE_SUGGESTED_AUDIT, variables)
      .then(data => {
        this.props.notifySuccess("Audit created successfully.")
        this.closeModal()
      })
      .catch(error => {
        this.props.notifyFail("Something went wrong. Please Try Again Later")
        this.closeModal()
      })
  }

  _checkInput(value) {
    if (value && value <= this.state.total_slots) return -1
    if (value && value >= this.state.total_slots)
      return GREATER_THAN_TOTAL_COUNT
    if (!value) return NOT_A_VALID_NUMBER
  }

  _typing = e => {
    if (!e.target.value) {
      this.slotCountField.className = "gor-suggest-audit-body-block-input-ok"
      this.slotCountFieldValid.className =
        "gor-suggest-audit-body-block-input-ok"
      return
    }
    let value = parseInt(e.target.value)
    let inputError = this._checkInput(value)
    switch (inputError) {
      case GREATER_THAN_TOTAL_COUNT:
        this.slotCountField.className =
          "gor-suggest-audit-body-block-input-error"
        this.slotCountFieldValid.className =
          "gor-suggest-audit-body-block-input-ok"
        this.setState({ isEnabledCreateAuditButton: false })
        break
      case NOT_A_VALID_NUMBER:
        this.slotCountField.className = "gor-suggest-audit-body-block-input-ok"
        this.slotCountFieldValid.className =
          "gor-suggest-audit-body-block-input-error"
        this.setState({ isEnabledCreateAuditButton: false })
        break
      default:
        this.slotCountField.className = "gor-suggest-audit-body-block-input-ok"
        this.slotCountFieldValid.className =
          "gor-suggest-audit-body-block-input-ok"
        this.setState({ isEnabledCreateAuditButton: true })
        break
    }
  }

  render() {
    return (
      <div>
        {" "}
        <Spinner isLoading={this.state.spinnerState} />
        {this.state.error ? (
          <div className="gor-suggest-audit">
            <div className="gor-suggest-audit-header">
              <span>Create Audit</span>
            </div>
            <div className="gor-suggest-audit-body">
              <div className="gor-suggest-audit-body-tile">
                Something went wrong Please try again.
              </div>
            </div>
            <div className="gor-suggest-audit-action-button">
              <button
                className="gor-cancel-btn"
                onClick={this.props.removeModal.bind(this)}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <div className="gor-suggest-audit">
            <div className="gor-suggest-audit-header">
              <div>
                <span>Create Audit</span>
              </div>
              <div className="gor-suggest-audit-header-description">
                Enter number of slots which you want to audit
              </div>
            </div>
            <div className="gor-suggest-audit-body">
              <div className="gor-suggest-audit-body-tile">
                <div className="gor-suggest-audit-body-tile1">
                  {" "}
                  Breached Slots ({this.state.breached_slots}){" "}
                </div>
                |
                <div className="gor-suggest-audit-body-tile2">
                  {" "}
                  Suggested Slots ({this.state.suggested_slots})
                </div>
                |
                <div className="gor-suggest-audit-body-tile3">
                  {" "}
                  Total Slots ({this.state.total_slots})
                </div>
              </div>
              <div className="gor-suggest-audit-body-block">
                No. of days remaining in this cycle: {this.state.remaining_days}
                <div className="gor-suggest-audit-body-block-input">
                  <div>Enter Slots Count</div>
                  <div className="gor-suggest-audit-body-block-input-wrap">
                    <input
                      className="gor-suggest-audit-body-block-input-field"
                      ref={node => {
                        this.slotCount = node
                      }}
                      onChange={this._typing.bind(this)}
                      placeholder="Ex. 10"
                    />
                  </div>
                </div>
                <div
                  className={"gor-suggest-audit-body-block-input-ok"}
                  ref={node => {
                    this.slotCountField = node
                  }}
                >
                  You cannot exceed limit of system slots
                </div>
                <div
                  className={"gor-suggest-audit-body-block-input-ok"}
                  ref={node => {
                    this.slotCountFieldValid = node
                  }}
                >
                  Please enter a valid number
                </div>
              </div>
            </div>

            <div className="gor-suggest-audit-action-button">
              <button
                className="gor-cancel-btn"
                onClick={this.props.removeModal.bind(this)}
              >
                <FormattedMessage
                  id="pps.configuration.confirm.apply.cancel"
                  description="Cancel apply Profile to PPS"
                  defaultMessage="Cancel"
                />
              </button>
              <button
                disabled={!this.state.isEnabledCreateAuditButton}
                onClick={this.createSuggestedAudit.bind(this)}
                className="gor-save-profile-btn"
              >
                <FormattedMessage
                  id="pps.configuration.confirm.saveAndApply.profile"
                  description="Save and Apply Profile to PPS"
                  defaultMessage="SAVE AND APPLY"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    intlMessages: state.intl.messages,
    timeOffset: state.authLogin.timeOffset
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data))
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data))
    },
    notifySuccess: function(data) {
      dispatch(notifySuccess(data))
    }
  }
}
const SET_AUDIT_SPINNER_STATE = gql`
  mutation setauditSpinner($auditSpinner: String!) {
    setAuditSpinnerState(auditSpinner: $auditSpinner) @client
  }
`

const setSpinnerState = graphql(SET_AUDIT_SPINNER_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditSpinner: function(spinnerState) {
      mutate({ variables: { auditSpinner: spinnerState } })
    }
  })
})

const SET_AUDIT_LIST_REFRESH_STATE = gql`
  mutation setauditListRefresh($auditRefreshFlag: String!) {
    setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
  }
`

const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditListRefresh: function(auditRefreshFlag) {
      mutate({ variables: { auditRefreshFlag: auditRefreshFlag } })
    }
  })
})

export default compose(
  withApollo,
  setAuditListRefreshState,
  setSpinnerState
)(connect(mapStateToProps, mapDispatchToProps)(SuggestAudit))
