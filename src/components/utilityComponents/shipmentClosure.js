import React from "react";
import { FormattedMessage, FormattedDate, defineMessages } from "react-intl";
import UtilityDropDown from "./utilityDropdownWrap";

const messages = defineMessages({
  shipmentClosureSelectFormatPlaceHolder: {
    id: "utility.shipmentClosure.formatPlaceholder",
    description: "Select shipment",
    defaultMessage: "Select shipment"
  }
});

class ShipmentClosure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: null
    };
  }

  _changeShipmentToClose(data) {
    this.setState({ fileType: data.value });
  }
  _getCurrentDropDownState(fileType, currentValue) {
    for (var i = fileType.length - 1; i >= 0; i--) {
      if (fileType[i].value === currentValue) {
        return fileType[i].label;
      }
    }
    return null;
  }
  _generateGRN() {
    if (this.props.generateReport) {
      this.props.generateReport(this.state.fileType, this.state.invoiceId);
    } else {
      throw new Error("Could not get the callback here!");
    }
  }

  render() {
    const fileType = [
      { value: "12345",
        label: "12345" 
      },
      {
        value: "67890",
        label: "67890"
      },
      {
        value: "11111",
        label: "11111"
      }
    ];

    let currenFileType = this.state.fileType
      ? this._getCurrentDropDownState(fileType, this.state.fileType)
      : null;
    return (
      <div>
        <UtilityDropDown
          items={fileType}
          dropdownLabel="Select shipment"
          placeHolderText={this.context.intl.formatMessage(
            messages.shipmentClosureSelectFormatPlaceHolder
          )}
          changeMode={this._changeShipmentToClose.bind(this)}
          currentState={currenFileType}
        />
        <div className="gor-utility-tile-footer">
          <div className="gor-utility-btn-wrap">
            <button
              onClick={this._generateGRN.bind(this)}
              className={
                this.state.invoiceId && this.state.fileType
                  ? "gor-download-button"
                  : "gor-download-button gor-disable-content"
              }
            >
              <label>
                <FormattedMessage
                  id="closeShipmentBtnHeader"
                  description="Close Shipment"
                  defaultMessage="CLOSE SHIPMENT"
                />
              </label>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ShipmentClosure.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default ShipmentClosure;
