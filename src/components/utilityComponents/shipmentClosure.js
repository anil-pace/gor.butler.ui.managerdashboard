import React from "react";
import {connect} from 'react-redux';
import { FormattedMessage,defineMessages } from "react-intl";
import UtilityDropDown from "./utilityDropdownWrap";

//import {SHIPMENTS_TO_CLOSE_QUERY,
//UTILITIES_TAB_CLOSE_SHIPMENT,
//} from './queries/msuReconfigTab';

import { graphql, withApollo, compose } from "react-apollo";
import gql from 'graphql-tag';

import {shipmentClosureSuccess, SHOW_SELECTED_ENTRIES} from '../../constants/frontEndConstants';
import {
  notifySuccess,
  notifyFail
} from "./../../actions/validationActions";

const messages = defineMessages({
  shipmentClosureSelectFormatPlaceHolder: {
    id: "utility.shipmentClosure.formatPlaceholder",
    description: "Select shipment",
    defaultMessage: "Select shipment"
  }
});

const OPEN_SHIPMENT_LIST_QUERY = gql`
    query($input:ShipmentClosureListParams){
      ShipmentClosureList(input:$input){
             list
            }
    }
`;

const CLOSE_SHIPMENT_ID_QUERY = gql`
  query($input:CloseShipmentParams){
    CloseShipment(input:$input){
        status
    }
  }
`;

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

  _closeShipment(openShipmentId) {
    this.props.client.query({
      query: CLOSE_SHIPMENT_ID_QUERY,
      variables: (function () {
        return {
          input: {
            shipment_id: openShipmentId,    // HARD- CODED FOR NOW
          }
        }
      }()),
      fetchPolicy: 'network-only'
    }).then(data => {
      this.setState({ fileType: null });
      this.props.notifySuccess(shipmentClosureSuccess);
    })
  }

  render() {
    // const fileType = [
    //   { value: "12345",
    //     label: "12345" 
    //   },
    //   {
    //     value: "67890",
    //     label: "67890"
    //   },
    //   {
    //     value: "11111",
    //     label: "11111"
    //   }
    // ];
    let labelC1, fileTypeList;
    fileTypeList = this.props.fileType;

    labelC1 = [{ value: 'any', label: <FormattedMessage id="msuConfig.token1.all" defaultMessage="Any" /> }];

    if (fileTypeList) {
      fileTypeList.forEach((data) => {
        labelC1.push(
          {
            value: data,
            label: "Open Shipment: " + data
          }
        )
      });
    }

    let currentFileType = fileTypeList ? this._getCurrentDropDownState(labelC1, this.state.fileType) : null;

    return (
      <div>
        <UtilityDropDown
          items={this.props.fileType}
          dropdownLabel="Select shipment"
          placeHolderText={this.context.intl.formatMessage(
            messages.shipmentClosureSelectFormatPlaceHolder
          )}
          changeMode={this._changeShipment.bind(this)}
          currentState={currentFileType}
        />
        <div className="gor-utility-tile-footer">
          <div className="gor-utility-btn-wrap">
            <button
              onClick={this._closeShipment.bind(this, this.state.fileType)}
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

const withQueryGetOpenShipmentList = graphql(OPEN_SHIPMENT_LIST_QUERY, {
  props: function (data) {
    if (!data || !data.data.ShipmentClosureList || !data.data.ShipmentClosureList.list) {
      return {}
    }
    return {
      fileType: data.data.ShipmentClosureList.list
    }
  },
  options: ({ match, location }) => ({
    variables: {},
    fetchPolicy: 'network-only'
  }),
});



function mapDispatchToProps(dispatch) {
  return {
      notifySuccess: function (data) {
          dispatch(notifySuccess(data))
      },
      notifyFail: function (data){
          dispatch(notifyFail(data))
      }
  };
}

export default compose(
  withQueryGetOpenShipmentList
)(connect(null, mapDispatchToProps)(ShipmentClosure));
