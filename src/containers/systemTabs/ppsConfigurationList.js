/**
 * Created by gaurav.m on 6/22/17.
 */
import React from "react"
import { FormattedMessage } from "react-intl"

class PPSList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.selectPPSProfile({ pps: props.ppsList[0] })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.ppsList,
      selectedProfile: nextProps.selectedProfile,
      selectedPPS: nextProps.selectedPPS
    })

    if (
      JSON.stringify(this.state.selectedPPS) !==
        JSON.stringify(nextProps.selectedPPS) ||
      (this.state.selectedProfile &&
        this.state.selectedProfile.profile_name !==
          nextProps.selectedProfile.profile_name)
    ) {
      this.selectPPSProfile({
        pps: nextProps.selectedPPS || nextProps.ppsList[0],
        profile: nextProps.selectedProfile || null
      })
    }
  }

  selectPPSProfile({ pps, profile }, event) {
    if (profile) {
      this.props.selectPPSProfileForConfiguration({
        pps: pps,
        profile: profile
      })
    } else if (
      this.props.selectedPPS &&
      pps.pps_id === this.props.selectedPPS.pps_id
    ) {
      //Already Selected PPS, Do Nothing
    } else {
      this.props.selectPPSProfileForConfiguration({ pps: pps })
    }
  }

  render() {
    let self = this
    if (!self.props.selectedPPS) {
      return null
    }
    return (
      <div className="pps-list-container">
        <div>
          <div className="pps-list-header">
            <FormattedMessage
              id="pps.configuration.header.text"
              description="PPS Configurations"
              defaultMessage="PPS Configurations"
            />
          </div>
          <div className="pps-list">
            {this.state.data.map(function(pps) {
              return (
                <div
                  className={[
                    "pps-list-item",
                    pps.pps_id === self.props.selectedPPS.pps_id
                      ? "selected"
                      : null
                  ].join(" ")}
                  key={pps.pps_id}
                  onClick={self.selectPPSProfile.bind(self, { pps: pps })}
                >
                  <div className="pps-list-item-name">
                    {"PPS-" + pps.pps_id}
                  </div>
                  <div className="pps-list-item-profiles">
                    {pps.pps_id === self.props.selectedPPS.pps_id &&
                      pps.pps_profiles.map(function(profile) {
                        return (
                          <div
                            className="pps-profile-item"
                            onClick={self.selectPPSProfile.bind(self, {
                              pps,
                              profile
                            })}
                            key={profile.profile_name}
                          >
                            <div
                              className={[
                                profile.profile_name ===
                                self.props.selectedProfile.profile_name
                                  ? "selected"
                                  : "",
                                "pps-profile-name"
                              ].join(" ")}
                            >
                              {profile.profile_name}
                            </div>
                            <div className="profile-label-container">
                              {profile.applied && (
                                <span className="profile-applied-label">
                                  <FormattedMessage
                                    id="pps.configuration.applied.text"
                                    description="Applied"
                                    defaultMessage="Applied"
                                  />
                                </span>
                              )}
                              {profile.requested && !profile.applied && (
                                <span className="profile-requested-label">
                                  <FormattedMessage
                                    id="pps.configuration.requested.text"
                                    description="Requested"
                                    defaultMessage="Requested"
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    {pps.pps_id !== self.props.selectedPPS.pps_id &&
                      pps.pps_profiles.map(function(profile) {
                        return profile.applied ? (
                          <div key={profile.profile_name}>
                            {profile.profile_name}{" "}
                            <FormattedMessage
                              id="pps.configuration.profileAplied.text"
                              description=" profile applied"
                              defaultMessage=" profile applied"
                            />
                          </div>
                        ) : null
                      })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default PPSList
