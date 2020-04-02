import React from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import GTable, {
  GTableHeader,
  GTableHeaderCell,
  GTableBody,
  GTableRow
} from "../../../components/gor-table-component/index"

import {
  POST,
  APP_JSON,
  GET_PENDING_MSU
} from "../../../constants/frontEndConstants"
import { GET_PPS_MSU } from "../../../constants/configConstants"
import { graphql, withApollo, compose } from "react-apollo"
import { GET_PENDING_MSU_QUERY } from "./queries/ppsTab"

const closeAll = "closeAll"
const fcloseAll = "fcloseAll"
const close = "close"
const fclose = "force_close"
class ClosePPSList extends React.Component {
  constructor(props) {
    super(props)
    var initialState = this._getInitialState()
    this.state = initialState
  }
  _getInitialState() {
    var checkedPPS = Object.keys(this.props.checkedPPS)
    var len = checkedPPS.length
    var state = {}
    for (let i = 0; i < len; i++) {
      state[checkedPPS[i]] = {}
      state[checkedPPS[i]].checkedValue = ""
    }
    return state
  }

  removeThisModal() {
    this.props.removeModal()
  }
  _handleClosePPS(e) {
    e.preventDefault()
    var selectedPPS = JSON.parse(JSON.stringify(this.state))
    var requestJSON = {}
    requestJSON["requested_status"] = {}
    for (let k in selectedPPS) {
      requestJSON["requested_status"][k] = selectedPPS[k].checkedValue
    }
    this.props.handleStatusChange({ value: "close" }, requestJSON)
    this.props.removeModal()
  }

  _onRadioChange(ppsId, value) {
    this.setState({
      [ppsId]: {
        checkedValue: value
      }
    })
  }
  _setAllStatus(selection) {
    var radioSelection = selection === closeAll ? close : fclose
    var state = JSON.parse(JSON.stringify(this.state))
    for (let k in state) {
      if (state.hasOwnProperty(k)) {
        state[k].checkedValue = radioSelection
      }
    }
    this.setState(state)
  }
  _processData() {
    var processedData = {}
    var checkedPPS = Object.keys(this.props.checkedPPS)
    var ppsLen = checkedPPS.length
    var pendingMSU = this.props.pendingMSU
      ? this.props.pendingMSU.successful
      : {}

    var areAllSelected = true
    processedData.header = [
      {
        id: 1,
        text: (
          <FormattedMessage
            id="ppsclose.thead1.text"
            description="Table first head"
            defaultMessage="PPS ID"
          />
        ),
        sortable: false
      },
      {
        id: 2,
        text: (
          <FormattedMessage
            id="ppsclose.thead2.text"
            description="Table second head"
            defaultMessage="RACKS PENDING"
          />
        ),
        sortable: false
      },
      {
        id: 3,
        text: (
          <FormattedMessage
            id="ppsclose.thead3.text"
            description="Table third head"
            defaultMessage="ITEMS PENDING"
          />
        ),
        sortable: false
      },
      {
        id: 4,
        text: (
          <FormattedMessage
            id="ppsclose.thead4.text"
            description="Table fourth head"
            defaultMessage="ACTION"
          />
        ),
        sortable: false
      }
    ]
    processedData.filteredData = []
    for (let i = 0; i < ppsLen; i++) {
      let row = []
      row.push("PPS " + checkedPPS[i])
      if (Object.keys(pendingMSU).length > 0) {
        row.push(
          pendingMSU[checkedPPS[i]].hasOwnProperty("pending_rack_count")
            ? pendingMSU[checkedPPS[i]].pending_rack_count
            : "-"
        )
        row.push(
          pendingMSU[checkedPPS[i]].hasOwnProperty("pending_pick_count")
            ? pendingMSU[checkedPPS[i]].pending_pick_count
            : "-"
        )
      }

      row.push(
        <div key={i}>
          <label>
            <input
              type="radio"
              value={close}
              name={"radio_pps_" + checkedPPS[i]}
              onChange={this._onRadioChange.bind(this, checkedPPS[i], close)}
              checked={this.state[checkedPPS[i]].checkedValue === close}
            />
            Close
          </label>
          <label>
            <input
              type="radio"
              value={fclose}
              name={"radio_pps_" + checkedPPS[i]}
              onChange={this._onRadioChange.bind(this, checkedPPS[i], fclose)}
              checked={this.state[checkedPPS[i]].checkedValue === fclose}
            />
            Force Close
          </label>
        </div>
      )
      processedData.filteredData.push(row)
      if (!this.state[checkedPPS[i]].checkedValue) {
        areAllSelected = false
      }
    }
    processedData.confirmDisable = !areAllSelected
    return processedData
  }

  render() {
    var processedData = this._processData()
    var self = this

    return (
      <div>
        <div className="gor-modal-content pps-close">
          <div className="gor-modal-head">
            <div className="gor-usr-add">{this.props.heading}</div>
            <span className="close" onClick={this.removeThisModal.bind(this)}>
              ×
            </span>
          </div>
          <div className="gor-modal-body">
            <form
              action="#"
              id="editUserForm"
              ref={node => {
                this.editUserForm = node
              }}
              onSubmit={e => this._handleClosePPS(e)}
            >
              <div className="pps-close-wrap">
                <div className="pps-close-head">
                  <div className="left-sec">
                    <label>Close or Force close PPS</label>
                  </div>
                  <div className="right-sec">
                    <a
                      href="javascript:void(0)"
                      className="close-all-link"
                      onClick={this._setAllStatus.bind(this, closeAll)}
                    >
                      CLOSE ALL
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="fclose-all-link"
                      onClick={this._setAllStatus.bind(this, fcloseAll)}
                    >
                      FORCE CLOSE ALL
                    </a>
                  </div>
                </div>
                <div className="close-pps-table">
                  <GTable options={["table-bordered"]}>
                    <GTableHeader>
                      {processedData.header.map(function(header, index) {
                        return (
                          <GTableHeaderCell
                            key={index}
                            header={header}
                            onClick={
                              header.sortable
                                ? self._onSortChange.bind(self, header)
                                : false
                            }
                          >
                            <span>{header.text}</span>
                          </GTableHeaderCell>
                        )
                      })}
                    </GTableHeader>
                    <GTableBody data={processedData.filteredData}>
                      {processedData.filteredData
                        ? processedData.filteredData.map(function(row, idx) {
                            return (
                              <GTableRow
                                key={idx}
                                index={idx}
                                offset={processedData.offset}
                                max={processedData.max}
                                data={processedData.filteredData}
                              >
                                {row.map(function(text, index) {
                                  return (
                                    <div
                                      key={index}
                                      style={
                                        processedData.header[index].width
                                          ? {
                                              flex:
                                                "1 0 " +
                                                processedData.header[index]
                                                  .width +
                                                "%"
                                            }
                                          : {}
                                      }
                                      className="cell"
                                    >
                                      {text}
                                    </div>
                                  )
                                })}
                              </GTableRow>
                            )
                          })
                        : ""}
                    </GTableBody>
                  </GTable>
                </div>
              </div>
              <div className="pps-close-wrap pps-submit-cont">
                <button
                  type="button"
                  onClick={this.props.removeModal}
                  className="gor-add-btn black pps-close-cancel"
                >
                  <FormattedMessage
                    id="pps.close.cancel"
                    description="Text for cancel close"
                    defaultMessage="CANCEL"
                  />
                </button>
                <button
                  type="submit"
                  disabled={processedData.confirmDisable}
                  className="gor-add-btn"
                >
                  <FormattedMessage
                    id="pps.close.confirm"
                    description="Text for close confirm"
                    defaultMessage="CONFIRM"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
const withQuery = graphql(GET_PENDING_MSU_QUERY, {
  props: data => {
    return {
      pendingMSU: data.data.PendingMSUList
        ? JSON.parse(data.data.PendingMSUList.list)
        : null
    }
  },
  options(props) {
    return {
      variables: {
        input: {
          pps_id: Object.keys(props.checkedPPS)
        }
      },
      fetchPolicy: "network-only"
    }
  }
})

export default compose(withQuery)(ClosePPSList)
