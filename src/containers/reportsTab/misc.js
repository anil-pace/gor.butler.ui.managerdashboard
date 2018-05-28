import React from "react";
import UtilityTile from "../../components/utilityComponents/utilityTile";
import DownloadReportTile from "../../components/utilityComponents/downloadReportsTile";
import DownloadGRNTile from "../../components/utilityComponents/downloadGRTile";
import {
  INVENTORY_REPORT_URL,
  GR_REPORT_URL
} from "../../constants/configConstants";
import { connect } from "react-redux";
import {
  getGRdata,
  validateInvoiceID
} from "../../actions/utilityActions";
import { setInventoryReportSpinner } from "../../actions/spinnerAction";
import {
  GET,
  GR_REPORT_RESPONSE,
  INVENTORY_REPORT_RESPONSE,
  WS_ONSEND
} from "../../constants/frontEndConstants";

import { defineMessages } from "react-intl";
import {
  updateSubscriptionPacket,
  setWsAction
} from "./../../actions/socketActions";
import { wsOverviewData } from "./../../constants/initData.js";

//Mesages for internationalization
const messages = defineMessages({
  downloadReportsHead: {
    id: "utility.downloadReport.head",
    description: "Download Reports",
    defaultMessage: "Download Reports"
  },
  goodsRcvdNotesHead: {
    id: "utility.goodsRcvdNotes.head",
    description: "Goods Received Notes",
    defaultMessage: "Goods Received Notes"
  }
});

class UtilityTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportState: {},
      grnState: {},
      utilityTabRefreshed: null
    };
  }

  _changeReportCategory(data) {
    var newState = this.state.reportState;
    newState.category = data.value;
    this.setState({ reportState: newState });
  }

  _changeReportFileType(data) {
    var newState = this.state.reportState;
    newState.fileType = data.value;
    this.setState({ reportState: newState });
  }


  _generateReport(reqFileType) {
    let fileType = "csv";
    if (reqFileType) {
      fileType = reqFileType;
    }
    let url = INVENTORY_REPORT_URL + "?sync=false&format=" + fileType;
    let data = {
      url: url,
      method: GET,
      token: this.props.auth_token,
      responseType: "arraybuffer",
      cause: INVENTORY_REPORT_RESPONSE
    };
    this.props.setInventoryReportSpinner(true);
    this.props.getGRdata(data);
  }

  _generateGRN(reqFileType, invoiceId) {
    var fileType = "csv";
    if (reqFileType) {
      fileType = reqFileType;
    }
    if (!invoiceId) {
      throw new Error("Did not receive the Invoice id for GRN generation!");
    }
    var url =
      GR_REPORT_URL + "/" + invoiceId + "?sync=false&format=" + fileType;
    let data = {
      url: url,
      method: GET,
      token: this.props.auth_token,
      cause: GR_REPORT_RESPONSE,
      responseType: "arraybuffer"
    };
    this.props.getGRdata(data);
    this.props.validateInvoiceID(false);
  }

  componentDidMount() {
    this._getfilemaxsize();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      nextProps.socketAuthorized &&
      nextProps.utilityTabRefreshed !== this.state.utilityTabRefreshed
    ) {
      this.setState({
        utilityTabRefreshed: nextProps.utilityTabRefreshed
      });
      this._subscribeData();
    }
  }

  _subscribeData() {
    let updatedWsSubscription = this.props.wsSubscriptionData;
    this.props.initDataSentCall(updatedWsSubscription["default"]);
    this.props.updateSubscriptionPacket(updatedWsSubscription);
  }

  render() {
    let show_gr_report = false;
    let show_inventory_report = false;

    try {
      show_gr_report = this.props.config.utility_tab.widgets.gr_report;
    } catch (ex) {
      //Do nothing
    }

    try {
      show_inventory_report = this.props.config.utility_tab.widgets.reports
        .inventory_report;
    } catch (ex) {
      //Do nothing
    }

    return (
      <div>
        {show_inventory_report && show_gr_report ? (
          <div>
            <UtilityTile
              tileHead={this.context.intl.formatMessage(
                messages.downloadReportsHead
              )}
            >
              <DownloadReportTile
                generateReport={this._generateReport.bind(this)}
                timeOffset={this.props.timeOffset}
              />
            </UtilityTile>

            <UtilityTile
              tileHead={this.context.intl.formatMessage(
                messages.goodsRcvdNotesHead
              )}
              showFooter={false}
            >
              <DownloadGRNTile
                validatedInvoice={this.props.validatedInvoice}
                generateReport={this._generateGRN.bind(this)}
                timeOffset={this.props.timeOffset}
              />
            </UtilityTile>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth_token: state.authLogin.auth_token,
    timeOffset: state.authLogin.timeOffset,
    utilityTabRefreshed: state.utilityValidations.utilityTabRefreshed,
    validatedInvoice: state.utilityValidations.invalidInvoice || false,
    newFileUploaded: state.utilityValidations.newFileUploaded,
    wsSubscriptionData:
      state.recieveSocketActions.socketDataSubscriptionPacket || wsOverviewData,
    socketAuthorized: state.recieveSocketActions.socketAuthorized,
    config: state.config || {}
  };
}

var mapDispatchToProps = function(dispatch) {
  return { 
    getGRdata: function(data) {
      dispatch(getGRdata(data));
    },
    validateInvoiceID: function(data) {
      dispatch(validateInvoiceID(data));
    },
    setInventoryReportSpinner: function(data) {
      dispatch(setInventoryReportSpinner(data));
    },
    updateSubscriptionPacket: function(data) {
      dispatch(updateSubscriptionPacket(data));
    },
    initDataSentCall: function(data) {
      dispatch(setWsAction({ type: WS_ONSEND, data: data }));
    }
  };
};
UtilityTab.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilityTab);
