import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, defineMessages } from "react-intl";
import {
  GET_ITEM_RECALL_URL,
  GET_ITEM_RECALL_FIXED_URL
} from "../../../constants/configConstants";
import {
  GET,
  POST,
  ITEM_RECALLED,
  APP_JSON
} from "../../../constants/frontEndConstants";
import {
  getItemRecall,
  clearOrderRecallValidation
} from "../../../actions/utilityActions";

import SkuSelector  from "./skuSelector";
class RecallItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recallState: "ExpiredAll"
    };
  }
  _requestExpiredItems(e) {
    let payload, url;
    if (this.state.recallState === "ExpiredAll") {
      payload = {
        order_id: this.orderId.value
      };
      url = GET_ITEM_RECALL_URL;
    } else {
      payload = {
        order_id: this.orderid.value,
        batch: this.batchNumber.value,
        product_sku: this.skuno.value
      };
      url = GET_ITEM_RECALL_FIXED_URL;
    }
    let data = {
      url: url,
      method: POST,
      token: this.props.auth_token,
      cause: ITEM_RECALLED,
      formdata: payload,
      contentType: APP_JSON
    };
    this.props.getItemRecall(data);
    this.props.clearOrderRecallValidation();
  }

  _handleChangeRunScriptCategory(e) {
    if (e.target.value) {
      var newState = e.target.value;
      this.setState({ recallState: newState });
      if (newState == "ExpiredAll") {
        this.orderid.value = "";
        this.skuno.value = "";
        this.batchNumber = "";
        this.props.clearOrderRecallValidation();
      } else {
        this.orderId.value = "";
        this.props.clearOrderRecallValidation();
      }
      this._validateScriptRecallButton();
    }
  }

  _validateScriptRecallButton() {
    let validated = false;
    if (this.orderId && this.orderId.value !== "") {
      validated = true;
    } else if (
      this.orderid &&
      this.orderid.value !== "" &&
      (this.skuno && this.skuno.value !== "") &&
      (this.batchNumber && this.batchNumber.value !== "")
    ) {
      validated = true;
    }
    this.setState({ activeScriptRcecallButton: validated });
  }

  _selectSKU() {
    var retSKUComponent = <div />;
    return retSKUComponent;
  }

  _getOrderId() {
    var retComponent = (
      <div key="1">
        <div className="gor-utility-recall-header">
          {" "}
          <span>
            <FormattedMessage
              id="utility.script.orderid"
              description="Order ID"
              defaultMessage="Order ID"
            />
          </span>
        </div>
        <div className="gor-audit-input-wrap gor-utility-sku-wrap">
          <input
            className="gor-audit-input gor-input-ok"
            placeholder="Enter Order ID"
            ref={node => {
              this.orderId = node || "";
            }}
            onChange={this._validateScriptRecallButton.bind(this)}
          />
          {this.props.validatedScriptOrderid &&
          this.state.recallState === "ExpiredAll" ? (
            <div className="gor-login-error" />
          ) : (
            ""
          )}
        </div>
        {this.props.validatedScriptOrderid &&
        this.state.recallState === "ExpiredAll" ? (
          <div className="gor-sku-error gor-utility-error-invoice">
            <FormattedMessage
              id="utility.script.incorrectOrderid"
              description="Order ID already exist"
              defaultMessage="Order ID already exist"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
    return retComponent;
  }

  render() {

    let orderIdComp = this._getOrderId();
    let SKUSelectorVisibility = (this.state.recallState === "ExpiredAll")?`hidden`: `visible`;

    return (
      <div key="0" className="gor-script-sku-wrap">
        <div
          className="gor-utility-sku-wrap"
          style={{ marginTop: 10, marginBottom: 10, fontSize: 13 }}
        >
          <div>
            <input
              checked={this.state.recallState === "ExpiredAll"}
              onChange={this._handleChangeRunScriptCategory.bind(this)}
              type="radio"
              id="ExpiredAll"
              name="order_Recall"
              value="ExpiredAll"
            />
            <label>
              <FormattedMessage
                id="utility.orderRecall.category.ExpiredAll"
                description="Expired items"
                defaultMessage="Expired items"
              />
            </label>
          </div>
          <div>
            <input
              checked={this.state.recallState === "Expiredsku"}
              onChange={this._handleChangeRunScriptCategory.bind(this)}
              type="radio"
              id="Expiredsku"
              name="order_Recall"
              value="Expiredsku"
            />
            <label>
              <FormattedMessage
                id="utility.orderRecall.category.Expiredsku"
                description="SKU + attribute(s)"
                defaultMessage="Specific SKU + attribute(s)"
              />
            </label>
          </div>
        </div>
        {orderIdComp}
        <SkuSelector visibility={SKUSelectorVisibility} />
        <div className="gor-script-btn-wrap">
          <button
            className={
              this.state.activeScriptRcecallButton
                ? "gor-download-button got-align"
                : "gor-download-button got-align gor-disable-content"
            }
            onClick={this._requestExpiredItems.bind(this)}
          >
            <FormattedMessage
              id="utility.recall"
              description="label for recall"
              defaultMessage="RECALL"
            />
          </button>
        </div>
      </div>
    );
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    getItemRecall: function(data) {
      dispatch(getItemRecall(data));
    },
    clearOrderRecallValidation: function() {
      dispatch(clearOrderRecallValidation());
    }
  };
};



function mapStateToProps(state, ownProps) {
    return {
        intlMessages: state.intl.messages,
    };
}

RecallItems.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(RecallItems);
