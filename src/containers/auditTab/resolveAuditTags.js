import React from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import GTable from "../../components/gor-table-component/index"
import {
  GTableHeader,
  GTableHeaderCell
} from "../../components/gor-table-component/tableHeader"
import { GTableBody } from "../../components/gor-table-component/tableBody"
import { GTableRow } from "../../components/gor-table-component/tableRow"
import { tableRenderer } from "../../components/commonFunctionsDataTable"
import { graphql, withApollo, compose } from "react-apollo"
import gql from "graphql-tag"
import { notifyfeedback, notifyFail } from "../../actions/validationActions"
import { setNotification } from "../../actions/notificationAction"
import { AuditParse } from "../../utilities/auditResponseParser"
import { InputComponent } from "../../components/InputComponent/InputComponent.js"
import { ShowError } from "../../utilities/ErrorResponseParser"
import { auditResolveData } from "./query/clientQuery"
import {
  AUDIT_RESOLVE_SUBMIT_QUERY,
  AUDIT_RESOLVE_TAG_QUERY
} from "./query/serverQuery"
import Dropdown from "../../components/gor-dropdown-component/dropdown"
import { humanizeObjValue } from "../../utilities/utils"

class ResolveAuditTags extends React.Component {
  constructor(props) {
    super(props)
    var data = this.props.auditLines ? this.props.auditLines : []
    this._dataList = new tableRenderer(data ? data.length : 0)
    this._dataList.newData = data
    this.state = {
      auditDataList: this._dataList,
      totalMismatch: 0,
      auditParamType: "",
      auditTagsData: []
    }
  }

  _removeThisModal() {
    this.props.removeModal()
    this.props._removeThisModal()
  }

  componentDidMount() {
    this.setState({ requestObj: this.props.auditConfirmDetail })
    let _input = {
      auditlines: this.props.auditlineIDApproved.map(el => {
        return { slot: el.slot_id, item_id: el.item_id }
      })
    }

    this.callGraphQl(AUDIT_RESOLVE_TAG_QUERY, _input).then(resp => {
      let _auditTagsData = this.props.auditConfirmDetail.data.auditlines
      if (resp && resp.data.AuditResolveTag.list) {
        var respData = JSON.parse(resp.data.AuditResolveTag.list)
        _auditTagsData = _auditTagsData.map(el => {
          let tags = respData.filter(item => {
            return item.slot_id === el.slot_id && item.item_id === el.item_id
          })

          el.possible_tags =
            tags && tags.length && tags[0].possible_tags
              ? humanizeObjValue(tags[0].possible_tags)
              : []
          return el
        })
      }
      let linesWithNotTags = _auditTagsData.filter(
        el => !el.possible_tags.length
      ).length

      this.setState(
        {
          auditTagsData: _auditTagsData,
          auditLinesWithTags:
            this.props.auditConfirmDetail.data.auditlines.length -
            linesWithNotTags
        },
        () => {
          if (
            linesWithNotTags ===
            this.props.auditConfirmDetail.data.auditlines.length
          ) {
            this._confirmIssues()
            this._removeThisModal()
          }
        }
      )
    })
  }

  callGraphQl = (_query, _input = {}) => {
    return this.props.client.query({
      query: _query,
      variables: (function() {
        return {
          input: _input
        }
      })(),
      fetchPolicy: "network-only"
    })
  }

  _confirmIssues() {
    var _this = this
    // since we also need the username for the request generated.
    // hence getting the username from the state and then sending
    // the same during the request.

    var userName = this.props.username || "admin"
    var auditConfirmDetail = {
      data: {
        username: userName,
        auditlines: this.state.auditTagsData.map(el => {
          delete el.slot_id
          delete el.actual_qty
          delete el.possible_tags
          delete el.item_id
          return el
        })
      }
    }
    let dataToSent = JSON.stringify(auditConfirmDetail)
    let _input = { data: dataToSent }
    this.callGraphQl(AUDIT_RESOLVE_SUBMIT_QUERY, _input)
      .then(data => {
        var AuditResolveSubmit = data.data.AuditResolveSubmit
          ? JSON.parse(data.data.AuditResolveSubmit.list)
          : ""
        AuditParse(AuditResolveSubmit, "AUDIT_RESOLVE_CONFIRMED", _this)
      })
      .catch(errors => {
        let code = errors.graphQLErrors[0].code
        ShowError(_this, code)
      })

    this._removeThisModal()
  }

  processedOptions(data) {
    return data.map(el => {
      return {
        value: el.tpid,
        label: el.tag_values && el.tag_values !== "" ? el.tag_values : "-"
      }
    })
  }

  changeSelectedTag(e, index) {
    let _auditTagsData = this.state.auditTagsData
    _auditTagsData[index].selected_tpid = e.value
    this.setState({ auditTagsData: _auditTagsData })
  }

  _renderSkutable() {
    let lotValuePlaceHolder = <div>Select lot values</div>
    let resolveTable = (
      <div>
        <GTable options={["table-bordered"]}>
          <GTableHeader options={["auditTable"]}>
            <GTableHeaderCell key={1}>
              <span className="auditSummary"></span>
            </GTableHeaderCell>
          </GTableHeader>
          <GTableBody>
            {this.state.auditTagsData.map((row, index) => {
              if (row.possible_tags.length)
                return (
                  <GTableRow className={"row"} index={index} data={row}>
                    {Object.keys(row).map(text => {
                      return (
                        <div>
                          {text === "slot_id" ? (
                            <div className={"tagTableCell"}>
                              Slot ID: {row[text]}
                            </div>
                          ) : (
                            ""
                          )}
                          {text === "item_id" ? (
                            <div className={"tagTableCell"}>
                              SKU ID: {row[text]}
                            </div>
                          ) : (
                            ""
                          )}
                          {text === "actual_qty" ? (
                            <div className={"tagTableCell"}>
                              Actual Qty: {row[text]}
                            </div>
                          ) : null}
                          {text === "possible_tags" ? (
                            <div className="tagTableCell bothAligned tableDropdown">
                              <Dropdown
                                options={this.processedOptions(row[text])}
                                onSelectHandler={e =>
                                  this.changeSelectedTag(e, index)
                                }
                                selectedOption={row.selected_tpid}
                                resetOnSelect={false}
                                placeholder={lotValuePlaceHolder}
                                placeholderClass={
                                  "gor-dropdown-placeholder-padding"
                                }
                                widthClass="gor-dropdown-max-width"
                              />
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                  </GTableRow>
                )
            })}
          </GTableBody>
        </GTable>
      </div>
    )
    return resolveTable
  }

  _findDisplayidName(rawString) {
    return rawString.split(",")
  }

  isConfirmDisabled() {
    var count = 0
    this.state.auditTagsData.map(el => {
      if (el.selected_tpid) count++
    })
    if (count === this.state.auditLinesWithTags) return true
    return false
  }

  render() {
    var auditData = this.props.auditData
    var resolveTable = this._renderSkutable()
    let disabled = !this.isConfirmDisabled()

    return (
      <div>
        <div className="gor-modal-content">
          <div className="gor-modal-head">
            <div className="gor-audit-resolve">
              <FormattedMessage
                id="audit.resolve.heading"
                description="Heading for resolve audit"
                defaultMessage="Resolve issues"
              />
              <span
                className="close"
                onClick={this._removeThisModal.bind(this)}
              >
                ×
              </span>
            </div>
          </div>
          <div className="gor-modal-body">
            <div className="gor-usr-form">
              <div className="gor-auditResolve-h1">
                <FormattedMessage
                  id="audit.header.information"
                  description="missing information for audit"
                  defaultMessage="Audit task #{auditId}"
                  values={{
                    missingAudit: this.state.totalMismatch,
                    auditId: auditData[1]
                  }}
                />
              </div>
              <div className="gor-audit-detail">
                {resolveTable}
                <div className="gor-auditResolve-btn-wrap">
                  <div className="gor-auditresolve-btn">
                    <button
                      className="gor-refresh-btn"
                      onClick={this._removeThisModal.bind(this)}
                    >
                      <FormattedMessage
                        id="resolveAudit.cancelLabel"
                        description="button label for cancel"
                        defaultMessage="Cancel"
                      />
                    </button>
                  </div>
                  <div className="gor-auditresolve-btn">
                    <button
                      disabled={disabled}
                      className="gor-add-btn"
                      onClick={this._confirmIssues.bind(this)}
                    >
                      <FormattedMessage
                        id="resolveAudit.confirmLabel"
                        description="button label for confirm"
                        defaultMessage="Confirm"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data))
    },
    setNotification: function(data) {
      dispatch(setNotification(data))
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data))
    }
  }
}

const clientauditResolveData = graphql(auditResolveData, {
  props: data => ({
    auditLines: data.data.auditResolveData
      ? JSON.parse(data.data.auditResolveData.auditLines)
      : "",
    audit_param_type: data.data.auditResolveData.audit_param_type,
    datachange: data.data.auditResolveData.datachange
  })
})

const SET_RESOLVE_DETAILS = gql`
  mutation setResolveDetails($auditPendingLines: String!) {
    setAuditPendingLines(auditPendingLines: $auditPendingLines) @client
  }
`
const setResolveDetails = graphql(SET_RESOLVE_DETAILS, {
  props: ({ mutate, ownProps }) => ({
    setResolveDetails: function(data) {
      mutate({ variables: { auditPendingLines: data } })
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
  setResolveDetails,
  clientauditResolveData,
  setAuditListRefreshState
)(connect(null, mapDispatchToProps)(ResolveAuditTags))
