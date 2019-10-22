/**
 * Created by gaurav.m on 2/28/18.
 */
import gql from 'graphql-tag'
var formatData = function(obj) {
  if (!obj) {
    return obj
  }
  let self = JSON.parse(JSON.stringify(obj))
  Object.keys(obj).forEach(function(key) {
    if (obj.hasOwnProperty(key) && typeof key === 'object') {
      obj[key].__typename = key
      formatData(obj[key])
    }
  })
  self.__typename = 'ppsConfiguration'

  return self
}
const ppsConfigurationState = {
  defaults: {
    selectedPPS: null,
    selectedPPSProfile: null,
    selectedPPSBin: null,
    selectedPPSBinGroup: null,
    ppsConfigurationSpinner: false
  },
  resolvers: {
    Mutation: {
      setSelectedProfile: (_, variables, { cache }) => {
        let selectedPPSProfile
        if (variables.state.profile) {
          selectedPPSProfile = JSON.parse(
            JSON.stringify(variables.state.profile)
          )
        } else {
          variables.state.pps.pps_profiles.forEach(function(prfl, index) {
            if (prfl.applied) {
              selectedPPSProfile = JSON.parse(JSON.stringify(prfl))
            }
          })
        }
        let selectedPPSBin = null
        cache.writeData({
          data: {
            selectedPPS: formatData(variables.state.pps),
            selectedPPSProfile: formatData(selectedPPSProfile),
            selectedPPSBin: formatData(selectedPPSBin)
          }
        })
        return null
      },
      setSelectedBin: (_, variables, { cache }) => {
        let previous = {}
        previous.selectedPPSBin = variables.state.bin.pps_bin_id
          ? formatData(JSON.parse(JSON.stringify(variables.state.bin)))
          : null
        /**
         * TODO: Need to add bin id (The combination of PPS_id and Bin_id)
         */
        cache.writeData({ data: { selectedPPSBin: previous.selectedPPSBin } })
        return null
      },

      setSelectedBinGroup: (_, variables, { cache }) => {
        cache.writeData({
          data: { selectedPPSBinGroup: variables.state.group }
        })
        return null
      },

      setClearSelectedBin: (_, variables, { cache }) => {
        let previous = {}
        previous.selectedPPSBin = null
        cache.writeData({ data: { selectedPPSBin: previous.selectedPPSBin } })
        return null
      },
      setPPSConfigurationSpinner: (_, variables, { cache }) => {
        cache.writeData({ data: { ppsConfigurationSpinner: variables.state } })
        return null
      },

      addTagToSelectedBin: (_, variables, { cache }) => {
        let selected_tag = variables.state.tag
        let selected_bin = JSON.parse(JSON.stringify(variables.state.bin))

        const query = gql`
          query {
            selectedPPSProfile @client {
              applied
              profile_name
              bin_group_details {
                bin_group_id
                enabled
              }
              pps_bin_details {
                bin_group_id
                bin_tags
                height
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
              }
            }
          }
        `
        let previous = cache.readQuery({ query }).selectedPPSProfile

        previous.pps_bin_details.map(function(bin) {
          if (bin.pps_bin_id === variables.state.bin.pps_bin_id) {
            if (!bin.bin_tags) {
              bin.bin_tags = []
            }
            if (bin.bin_tags.indexOf(selected_tag) < 0) {
              bin.bin_tags = [...bin.bin_tags, selected_tag]
            } else {
              let index = bin.bin_tags.indexOf(selected_tag)
              var data = JSON.parse(JSON.stringify(bin.bin_tags))
              data.splice(index, 1)
              bin.bin_tags = JSON.parse(JSON.stringify(data))
            }
            selected_bin = bin
          }
          return bin
        })

        cache.writeData({
          data: { selectedPPSProfile: previous, selectedPPSBin: selected_bin }
        })
        return null
      },
      setPPSBinStatus: (_, variables, { cache }) => {
        let bin_status = variables.state.enabled
        let selected_bin = JSON.parse(JSON.stringify(variables.state.bin))
        const query = gql`
          query {
            selectedPPSProfile @client {
              applied
              profile_name
              bin_group_details {
                bin_group_id
                enabled
              }
              pps_bin_details {
                bin_group_id
                bin_tags
                height
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
              }
            }
          }
        `
        let previous = cache.readQuery({ query }).selectedPPSProfile

        previous.pps_bin_details.map(function(bin) {
          if (bin.pps_bin_id === variables.state.bin.pps_bin_id) {
            bin.enabled = bin_status
            selected_bin = bin
          }
          return bin
        })

        cache.writeData({
          data: { selectedPPSProfile: previous, selectedPPSBin: selected_bin }
        })
        return null
      },
      setPPSBinGroupStatus: (_, variables, { cache }) => {
        let bin_group_status = variables.state.enabled
        const query = gql`
          query {
            selectedPPSProfile @client {
              applied
              profile_name
              bin_group_details {
                bin_group_id
                enabled
              }
              pps_bin_details {
                bin_group_id
                bin_tags
                height
                direction
                enabled
                length
                orig_cordinates
                pps_bin_id
              }
            }

            selectedPPSBinGroup @client {
              bin_group_id
              enabled
            }
          }
        `
        let previous = cache.readQuery({ query }).selectedPPSProfile
        let selected_group = cache.readQuery({ query }).selectedPPSBinGroup

        previous.bin_group_details.map(function(group) {
          if (group.bin_group_id === selected_group.bin_group_id) {
            group.enabled = bin_group_status
            selected_group = group
          }
          return group
        })

        cache.writeData({
          data: {
            selectedPPSProfile: formatData(previous),
            selectedPPSBinGroup: formatData(selected_group)
          }
        })
        return null
      },

      ppsProfileSavedMutation: (_, variables, { cache }) => {
        const query = gql`
          query {
            selectedPPS @client {
              pps_id
              pps_mode
              status
              pps_profiles {
                applied
                profile_name
                bin_group_details {
                  bin_group_id
                  enabled
                }
                pps_bin_details {
                  bin_group_id
                  bin_tags
                  height
                  direction
                  enabled
                  length
                  orig_cordinates
                  pps_bin_id
                }
              }
            }
          }
        `

        let selectedPPS = cache.readQuery({ query }).selectedPPS
        let savedProfile = JSON.parse(JSON.stringify(variables.state.profile))
        selectedPPS.pps_profiles.map(function(profile) {
          if (profile.profile_name === savedProfile.profile_name) {
            profile = savedProfile
          }
          return savedProfile
        })

        cache.writeData({
          data: {
            selectedPPS: formatData(selectedPPS),
            selectedPPSProfile: formatData(savedProfile)
          }
        })
        return null
      },

      ppsProfileCreatedMutation: (_, variables, { cache }) => {
        const query = gql`
          query {
            selectedPPS @client {
              pps_id
              pps_mode
              status
              pps_profiles {
                applied
                create_time
                pps_id
                profile_name
                requested
                update_time
                bin_group_details {
                  bin_group_id
                  enabled
                }
                pps_bin_details {
                  bin_group_id
                  bin_tags
                  height
                  direction
                  enabled
                  length
                  orig_cordinates
                  pps_bin_id
                }
              }
            }
          }
        `

        let previous = cache.readQuery({ query }).selectedPPS
        let createdProfile = JSON.parse(JSON.stringify(variables.state.profile))
        previous.pps_profiles.push(formatData(createdProfile))

        cache.writeData({
          data: {
            selectedPPS: previous,
            selectedPPSProfile: formatData(createdProfile)
          }
        })
        return null
      },

      cancelPPSProfileChanges: (_, variables, { cache }) => {
        const query = gql`
          query {
            selectedPPS @client {
              pps_id
              pps_mode
              status
              pps_profiles {
                applied
                profile_name
                bin_group_details {
                  bin_group_id
                  enabled
                }
                pps_bin_details {
                  bin_group_id
                  bin_tags
                  height
                  direction
                  enabled
                  length
                  orig_cordinates
                  pps_bin_id
                }
              }
            }

            selectedPPSProfile @client {
              profile_name
              pps_bin_details {
                bin_group_id
                bin_tags
                pps_bin_id
              }
            }
          }
        `
        let selectedPPS = cache.readQuery({ query }).selectedPPS
        let already_selected_profile = cache.readQuery({ query })
          .selectedPPSProfile
        let selected_profile = JSON.parse(
          JSON.stringify(
            selectedPPS.pps_profiles.filter(function(profile) {
              return (
                profile.profile_name === already_selected_profile.profile_name
              )
            })[0]
          )
        )
        cache.writeData({
          data: {
            selectedPPSProfile: selected_profile, //If no profile is selected, select the default profile
            selectedPPSBin: null,
            selectedPPSBinGroup: null
          }
        })
        return null
      }
    }
  }
}

export default ppsConfigurationState
