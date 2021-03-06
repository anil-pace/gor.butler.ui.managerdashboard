import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { connect } from "react-redux";
import Tile from "../../components/tile/tile.js";
import { GTable } from "../../components/gor-table-component/index";
import {
  GTableHeader,
  GTableHeaderCell
} from "../../components/gor-table-component/tableHeader";
import { GTableBody } from "../../components/gor-table-component/tableBody";
import { GTableRow } from "../../components/gor-table-component/tableRow";
import {
  setCheckedAuditpps,
  setCheckedOtherpps
} from "../../actions/auditActions";
import { userRequest } from "../../actions/userActions";
import DotSeparatorContent from "../../components/dotSeparatorContent/dotSeparatorContent";
import {
  GET_PPSLIST,
  START_AUDIT,
  GET,
  APP_JSON,
  POST,
  START_AUDIT_TASK,
  CHANGE_PPS_TASK
} from "../../constants/frontEndConstants";
import {
  PPSLIST_ACTIVE_AUDIT_URL,
  PPSLIST_ALL_URL,
  START_AUDIT_URL,
  START_CHANGE_PPS_URL
} from "../../constants/configConstants";
import SearchFilter from "../../components/searchFilter/searchFilter";
import AuditAction from "../auditTab/auditAction";
import { modal } from "react-redux-modal";

const messages = defineMessages({
  pendingAudit: {
    id: "audit.startaudit.pendingAudit",
    defaultMessage: " Audits pending"
  },
  linesRemaining: {
    id: "audit.startaudit.linesRemaining",
    defaultMessage: " lines remaining to be Audited"
  },
  searchPlaceholder: {
    id: "audit.startaudit.searchPlaceholder",
    defaultMessage: "Search PPS by opertor name or mode"
  }
});
class AuditStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAuditPPS: [],
      checkedOtherPPS: [],
      auditId: this.props.auditID,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  _removeThisModal() {
    this.props.removeModal();
  }

  _tableAuditPPSData(itemsData) {
    let pendingAudit = this.context.intl.formatMessage(messages.pendingAudit);
    let linesRemaining = this.context.intl.formatMessage(
      messages.linesRemaining
    );

    let tableData = [];
    for (var i = 0; i < itemsData.length; i++) {
      let rowObject = {};
      rowObject.ppsDetails = {
        header: [itemsData[i].pps_id],
        subHeader: [itemsData[i].pps_mode]
      };
      rowObject.assignOperator = itemsData[i].operator_assigned;
      rowObject.auditStatus = {
        header: [itemsData[i].audits_pending + pendingAudit],
        subHeader: [itemsData[i].auditlines_pending + linesRemaining]
      };
      tableData.push(rowObject);
      rowObject = {};
    }
    return tableData;
  }

  _tableotherPPSData(itemsData) {
    let tableData = [];
    for (var i = 0; i < itemsData.length; i++) {
      let rowObject = {};
      rowObject.ppsDetails = {
        header: [itemsData[i].pps_id],
        subHeader: [itemsData[i].pps_mode]
      };
      rowObject.assignOperator = itemsData[i].operator_assigned;
      tableData.push(rowObject);
      rowObject = {};
    }
    return tableData;
  }
  _handlestartaudit(e) {
    let allAuditId,
      URL = "",
      cause = "",
      param = "";
    let allPPSList = this.props.checkedAuditPPSList.concat(
      this.props.checkedOtherPPSList
    );
    allAuditId =
      this.state.auditId.constructor.name !== "Array"
        ? [this.state.auditId]
        : this.state.auditId;
    if (this.props.param == "CHANGE_PPS") {
      URL = START_CHANGE_PPS_URL;
      param = CHANGE_PPS_TASK;
    } else {
      URL = START_AUDIT_URL;
      param = START_AUDIT_TASK;
    }
    let formdata = {
      audit_id_list: allAuditId,
      pps_list: allPPSList
    };
    e.preventDefault();
    if (this.props.checkedOtherPPSList.length > 0) {
      let data = (
        <FormattedMessage
          id="audit.ppschangeStart"
          defaultMessage="A mode change request will be sent for PPS that are not in Audit mode.Do you still wish to proceed?"
          description="Text for cancel"
        />
      );

      modal.add(AuditAction, {
        title: "",
        size: "large", // large, medium or small,
        closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideCloseButton: false,
        data: data,
        param: param,
        formdata: formdata,
        URL: URL
      });
      this._removeThisModal();
    } else {
      let userData = {
        url: URL,
        formdata: formdata,
        method: POST,
        cause: START_AUDIT_TASK,
        contentType: APP_JSON,
        accept: APP_JSON,
        token: this.props.auth_token
      };
      this.props.userRequest(userData);
      this.props.removeModal();
    }

    // this.props.setCheckedAudit({});
  }

  headerCheckChange(type, e) {
    let ppslist = this.props.ppsList.pps_list;
    let arr = []; // this.props.checkedAudit
    if (type == "Audit") {
      if (e.currentTarget.checked) {
        Object.keys(ppslist).forEach(function(key) {
          if (ppslist[key].pps_mode == "audit") arr.push(ppslist[key].pps_id);
        });
        this.props.setCheckedAuditpps(arr);
      } else {
        this.props.setCheckedAuditpps([]);
      }
    } else {
      if (e.currentTarget.checked) {
        Object.keys(ppslist).forEach(function(key) {
          if (ppslist[key].pps_mode !== "audit") arr.push(ppslist[key].pps_id);
        });
        this.props.setCheckedOtherpps(arr);
      } else {
        this.props.setCheckedOtherpps([]);
      }
    }
  }

  CheckChange(type, e) {
    let arr = [];
    if (type == "Audit") {
      arr = this.props.checkedAuditPPSList;
      let a = arr.indexOf(e.currentTarget.id);
      a == -1 ? arr.push(e.currentTarget.id) : arr.splice(a, 1);
      this.props.setCheckedAuditpps(arr);
    } else {
      arr = this.props.checkedOtherPPSList;
      let a = arr.indexOf(e.currentTarget.id);
      a == -1 ? arr.push(e.currentTarget.id) : arr.splice(a, 1);
      this.props.setCheckedOtherpps(arr);
    }
  }
  componentDidMount() {
      let urlStr = "";
    if (this.props.param === "CHANGE_PPS"){
        urlStr = PPSLIST_ACTIVE_AUDIT_URL
    }else{
        urlStr = PPSLIST_ALL_URL
    }

    let userData = {
      url: urlStr,
      method: GET,
      cause: GET_PPSLIST,
      contentType: APP_JSON,
      accept: APP_JSON,
      token: sessionStorage.getItem("auth_token")
    };
    this.props.userRequest(userData);
    let attributeData = this.props.ppsList.pps_list
      ? this.props.ppsList.pps_list
      : [];
    this.setState({ items: attributeData });
  }

  componentWillUnmount() {
    this.props.setCheckedAuditpps([]);
    this.props.setCheckedOtherpps([]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.ppsList.pps_list) !==
      JSON.stringify(nextProps.ppsList.pps_list)
    ) {
      let attributeData = nextProps.ppsList.pps_list || [];
      this.setState({ items: attributeData });
    }

    this.setState({ checkedAuditPPS: nextProps.checkedAuditPPSList });
    this.setState({ checkedOtherPPS: nextProps.checkedOtherPPSList });

   
  }
  handleChange(input) {
    var updatedList = this.props.ppsList.pps_list;
    let data = input.toLowerCase();
    var queryResult = [];
    Object.keys(updatedList).forEach(function(key) {
      if (
        updatedList[key]["operator_assigned"].toLowerCase().indexOf(data) !=
          -1 ||
        updatedList[key]["pps_mode"].toLowerCase().indexOf(data) != -1
      ) {
        queryResult.push(updatedList[key]);
      }
    });

    this.setState({ items: queryResult });
  }

  render() {
    console.log(this.props.auditID);
    let me = this;
    let items = this.state.items || [];
    let changePPSHeader=( <FormattedMessage
      id="audit.audittask.headerchangeppd"
      description="Heading for change pps"
      defaultMessage="Change PPS"
    />);
    let startAuditHeader=( <FormattedMessage
      id="audit.audittask.headerstartaudit"
      description="Heading for start audit"
      defaultMessage="Start Audit"
    />);
    let auditModePPS = (
      <FormattedMessage
        id="audit.startaudit.auditmodepps"
        description="PPS in audit mode"
        defaultMessage="PPS in audit mode"
      />
    );
    let otherModePPS = (
      <FormattedMessage
        id="audit.startaudit.othermodepps"
        description="PPS in other mode"
        defaultMessage="PPS in other mode"
      />
    );
    let operatorAssign = (
      <FormattedMessage
        id="audit.startaudit.operatorassign"
        description="Operator Assigned"
        defaultMessage="Operator Assigned"
      />
    );
    let startButton = (
      <FormattedMessage
        id="audit.startaudit.startButton"
        description="start"
        defaultMessage="START"
      />
    );
    let searchPlaceholder = this.context.intl.formatMessage(
      messages.searchPlaceholder
    );
    let forAudit = (
      <FormattedMessage
        id="audit.startaudit.Foraudit"
        description="For audit"
        defaultMessage="For audit"
      />
    );

    let checkedAuditPPSCount = this.props.checkedAuditPPSList.length;
    let checkedOtherPPSCount = this.props.checkedOtherPPSList.length;
    let totalAuditPPSCount = 0;
    let totalOtherPPSCount = 0;
    Object.keys(items).forEach(function(key) {
      if (items[key].pps_mode == "audit") totalAuditPPSCount++;
      else {
        totalOtherPPSCount++;
      }
    });

    let auditPPS = [],
      otherPPS = [];
    Object.keys(items).map(function(key) {
      if (items[key].pps_mode === "audit") {
        auditPPS.push(items[key]);
      } else {
        otherPPS.push(items[key]);
      }
    });
    var tablerowdataAudit = this._tableAuditPPSData(auditPPS);
    var tablerowdataOther = this._tableotherPPSData(otherPPS);

    var tableData = [
      { id: 1, text: "SKU CODE", sortable: true, width: 35 },
      { id: 2, text: "NAME", sortable: true, width: 32 },
      { id: 3, text: "OPENING STOCK", searchable: false, width: 32}
    ];
    var tableDataother = [
      { id: 1, text: "SKU CODE", sortable: true, width: 35 },
      { id: 2, text: "NAME", sortable: true, width: 65 },
      { id: 3, text: "OPENING STOCK", searchable: false }
    ];

    return (
      <div>
        <div className="gor-AuditDetails-modal-content">
          <div className="gor-auditDetails-modal-head">
            <span className="AuditIDWrapper">
              {this.props.param == "CHANGE_PPS"?changePPSHeader:startAuditHeader}
            </span>

            <span className="close" onClick={this._removeThisModal.bind(this)}>
              ×
            </span>
          </div>

          <div className="gor-auditDetails-modal-body">
            <div className="content-body">
              <span className="left-float">
                {forAudit} - {this.state.auditId}
              </span>
              <div className="ppsSearchWrap">
                <SearchFilter
                  handleChange={this.handleChange}
                  placeHolder={searchPlaceholder}
                />
              </div>
            </div>
            {tablerowdataAudit.length > 0 ? (
              <GTable options={["table-bordered", "auditStart"]}>
                <GTableHeader options={["auditTable"]}>
                  <GTableHeaderCell key={1}header="Audit"className="audittable">
                    <label className="container" style={{ "margin-left": "10px" }} >{" "}<input type="checkbox" checked={ this.props.checkedAuditPPSList.length == 0 ? "" : true} onChange={me.headerCheckChange.bind(me, "Audit")}/>
                      <span className={totalAuditPPSCount == checkedAuditPPSCount ? "checkmark": "checkmark1"}/>
                    </label>
                    <span>
                      {tablerowdataAudit.length}
                      {auditModePPS}
                    </span>
                  </GTableHeaderCell>
                </GTableHeader>

                <GTableBody data={tablerowdataAudit}>
                  {tablerowdataAudit? tablerowdataAudit.map(function(row, idx) {
                        return (
                          <GTableRow
                            key={idx}
                            index={idx}
                            data={tablerowdataAudit}
                          >
                            {Object.keys(row).map(function(text, index) {
                              return (
                                <div
                                  key={index}
                                  style={
                                    tableData[index].width ? {flex:"1 0 " +tableData[index].width +"%"}: {}} className="cell" >
                                  {index == 0 ? (
                                    <label
                                      className="container"
                                      style={{
                                        "margin-top": "15px",
                                        "margin-left": "10px"
                                      }}
                                    >
                                      {" "}
                                      <input
                                        type="checkbox"
                                        id={
                                          tablerowdataAudit[idx]["ppsDetails"][
                                            "header"
                                          ][0]
                                        }
                                        checked={
                                          me.state.checkedAuditPPS.indexOf(
                                            tablerowdataAudit[idx][
                                              "ppsDetails"
                                            ]["header"][0]
                                          ) == -1
                                            ? ""
                                            : true
                                        }
                                        onChange={me.CheckChange.bind(
                                          me,
                                          "Audit"
                                        )}
                                      />
                                      <span className="checkmark" />
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                  {index == 0 ? (
                                    <DotSeparatorContent
                                      header={
                                        tablerowdataAudit[idx][text]["header"]
                                      }
                                      subHeader={
                                        tablerowdataAudit[idx][text][
                                          "subHeader"
                                        ]
                                      }
                                      separator={"."}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {index == 1 ? (
                                    <div>
                                      {operatorAssign}:{" "}
                                      {tablerowdataAudit[idx][text]}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {index == 2 ? (
                                    <DotSeparatorContent
                                      header={
                                        tablerowdataAudit[idx][text]["header"]
                                      }
                                      subHeader={
                                        tablerowdataAudit[idx][text][
                                          "subHeader"
                                        ]
                                      }
                                      separator={"."}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </GTableRow>
                        );
                      })
                    : ""}
                </GTableBody>
              </GTable>
            ) : (
              ""
            )}

            {tablerowdataOther.length > 0 ? (
              <GTable options={["table-bordered"]}>
                <GTableHeader options={["auditTable"]}>
                  <GTableHeaderCell
                    key={1}
                    header="Audit"
                    className="audittable"
                  >
                    <label
                      className="container"
                      style={{ "margin-left": "10px" }}
                    >
                      {" "}
                      <input
                        type="checkbox"
                        checked={
                          this.props.checkedOtherPPSList.length == 0 ? "" : true
                        }
                        onChange={me.headerCheckChange.bind(me, "other")}
                      />
                      <span
                        className={
                          totalOtherPPSCount == checkedOtherPPSCount
                            ? "checkmark"
                            : "checkmark1"
                        }
                      />
                    </label>
                    <span>
                      {tablerowdataOther.length} {otherModePPS}
                    </span>
                  </GTableHeaderCell>
                </GTableHeader>

                <GTableBody data={tablerowdataOther}>
                  {tablerowdataOther
                    ? tablerowdataOther.map(function(row, idx) {
                        return (
                          <GTableRow
                            key={idx}
                            index={idx}
                            data={tablerowdataOther}
                          >
                            {Object.keys(row).map(function(text, index) {
                              return (
                                <div
                                  key={index}
                                  style={
                                    tableDataother[index].width
                                      ? {
                                          flex:
                                            "1 0 " +
                                            tableDataother[index].width +
                                            "%"
                                        }
                                      : {}
                                  }
                                  className="cell"
                                >
                                  {index == 0 ? (
                                    <label
                                      className="container"
                                      style={{
                                        "margin-top": "15px",
                                        "margin-left": "10px"
                                      }}
                                    >
                                      {" "}
                                      <input
                                        type="checkbox"
                                        id={
                                          tablerowdataOther[idx]["ppsDetails"][
                                            "header"
                                          ][0]
                                        }
                                        checked={
                                          me.state.checkedOtherPPS.indexOf(
                                            tablerowdataOther[idx][
                                              "ppsDetails"
                                            ]["header"][0]
                                          ) == -1
                                            ? ""
                                            : true
                                        }
                                        onChange={me.CheckChange.bind(
                                          me,
                                          "Other"
                                        )}
                                      />
                                      <span className="checkmark" />
                                    </label>
                                  ) : (
                                    ""
                                  )}
                                  {index == 0 ? (
                                    <DotSeparatorContent
                                      header={
                                        tablerowdataOther[idx][text]["header"]
                                      }
                                      subHeader={
                                        tablerowdataOther[idx][text][
                                          "subHeader"
                                        ]
                                      }
                                      separator={"."}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {index == 1 ? (
                                    <div>
                                      {operatorAssign}:{" "}
                                      {tablerowdataOther[idx][text]}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </GTableRow>
                        );
                      })
                    : ""}
                </GTableBody>
              </GTable>
            ) : (
              ""
            )}
          </div>
          <button
            className="gor-add-btn gor-listing-button rightMargin"
            onClick={this._handlestartaudit.bind(this)}
          >
            {startButton}
          </button>
        </div>
      </div>
    );
  }
}
AuditStart.contextTypes = {
  intl: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    auditType: state.auditInfo.auditType || {},
    ppsList: state.auditInfo.ppsList || [],
    auth_token: state.authLogin.auth_token,
    checkedAuditPPSList: state.auditInfo.checkedAuditPPSList || [],
    checkedOtherPPSList: state.auditInfo.checkedOtherPPSList || []
  };
}

var mapDispatchToProps = function(dispatch) {
  return {
    userRequest: function(data) {
      dispatch(userRequest(data));
    },
    setCheckedAuditpps: function(data) {
      dispatch(setCheckedAuditpps(data));
    },
    setCheckedOtherpps: function(data) {
      dispatch(setCheckedOtherpps(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuditStart);
