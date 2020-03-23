/**
 * Created by gaurav.m on 7/26/17.
 */
/**
 * Created by gaurav.m on 7/26/17.
 */
import React from "react"
import { FormattedMessage } from "react-intl"

class ConfirmChangePPSMode extends React.Component {
  constructor(props) {
    super(props)
  }

  changePPSMode(data) {
    this.props.applyMode(data)
    this.props.removeModal()
  }

  render() {
    return (
      <div>
        <div className="gor-create-profile">
          <div className="gor-create-profile-header">
            <div className="gor-question gor-align-middle"></div>
            <div>
              <span>
                <FormattedMessage
                  id="pps.mode.confirm.mode.text"
                  description="Apply mode to all PPS"
                  defaultMessage="Are you sure you want to change mode for all PPS?"
                />
              </span>
            </div>
          </div>
          <div className="gor-create-profile-body">
            <FormattedMessage
              id="pps.mode.confirm.apply.warning"
              description="Warning: All pps mode change might impact the operations"
              defaultMessage="Warning: All pps mode change might impact the operations"
            />
          </div>
          <div className="gor-create-profile-action-button">
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
              onClick={this.changePPSMode.bind(this, this.props.data)}
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
      </div>
    )
  }
}

export default ConfirmChangePPSMode
