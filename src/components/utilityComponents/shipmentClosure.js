import React from "react";
import { FormattedMessage, FormattedDate, defineMessages } from "react-intl";
import UtilityDropDown from "./utilityDropdownWrap";

//import {SHIPMENTS_TO_CLOSE_QUERY,
//UTILITIES_TAB_CLOSE_SHIPMENT,
//} from './queries/msuReconfigTab';

import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag';

const messages = defineMessages({
  shipmentClosureSelectFormatPlaceHolder: {
    id: "utility.shipmentClosure.formatPlaceholder",
    description: "Select shipment",
    defaultMessage: "Select shipment"
  }
});

//const SHIPMENTS_TO_CLOSE_QUERY = gql`
    // query($input:MsuSourceTypeListParams){
    //     MsuSourceTypeList(input:$input){
    //          list
    //         }
    // }
//`;

class ShipmentClosure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileType: null
    };

    this._changeShipment = this._changeShipment.bind(this);
    this._closeShipment = this._closeShipment.bind(this);
  }

  _changeShipment(data) {
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

  _closeShipment() {
    alert(this.state.fileType);
    this.props.client.query({
      query: UTILITIES_TAB_CLOSE_SHIPMENT_POST,
      variables: (function () {
          return {
              input: {
                  rack_id: rackId,    // HARD- CODED FOR NOW
                  destination_type: destType  // HARD- CODED FOR NOW
              }
          }
      }()),
      fetchPolicy: 'network-only'
  }).then(data => {
      this._removeThisModal(); // close the changeRackType modal once put block & change type button has been clicked
      this.props.blockPutAndChangeTypeCallback();
  })
    // if (this.props.generateReport) {
    //   this.props.generateReport(this.state.fileType, this.state.invoiceId);
    // } else {
    //   throw new Error("Could not get the callback here!");
    // }
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
          changeMode={this._changeShipment.bind(this)}
          currentState={currenFileType}
        />
        <div className="gor-utility-tile-footer">
          <div className="gor-utility-btn-wrap">
            <button
              onClick={this._closeShipment.bind(this)}
              className={
                this.state.invoiceId && this.state.fileType
                  ? "gor-download-button"
                  : "gor-download-button gor-enable-content"
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

// const withQueryGetShipmentsTypes = graphql(SHIPMENTS_TO_CLOSE_QUERY, {
//   props: function (data) {
//       if (!data || !data.data.MsuSourceTypeList || !data.data.MsuSourceTypeList.list) {
//           return {}
//       }
//       return {
//           destType: data.data.MsuSourceTypeList.list
//       }
//   },
//   options: ({ match, location }) => ({
//       variables: {},
//       fetchPolicy: 'network-only'
//   }),
// });

export default ShipmentClosure;
// export default compose(
//   withQueryGetShipmentsTypes
// )(ShipmentClosure);
