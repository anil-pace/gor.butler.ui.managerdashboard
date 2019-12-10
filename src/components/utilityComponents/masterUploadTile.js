import React from "react"
import { FormattedMessage } from "react-intl"
import AccordianBar from "./accordianBar"
import FileUpload from "../fileUpload/fileUpload"
import ListItem from "../list/listItem"

class MasterUploadTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPanel: [],
      stateChanged: false
    }
  }

  _handlePanel(index) {
    var accordianState = this.state.showPanel
    var currentState = accordianState[index]
    var stateChanged = !this.state.stateChanged
    accordianState = new Array(
      accordianState.length ? accordianState.length : 0
    ).fill(false)
    accordianState[index] = !currentState

    this.setState({
      showPanel: accordianState,
      stateChanged: stateChanged
    })
  }

  _renderMasterData() {
    var result = [],
      masterUploadBar,
      historyData = this.props.historyData
    if (!this.state.showPanel.length) {
      let accordianState = new Array(
        historyData.length ? historyData.length : 0
      ).fill(false)
      let stateChanged = this.state.stateChanged
      this.state = {
        showPanel: accordianState,
        stateChanged: stateChanged
      }
    }
    for (let i = 0; i < historyData.length; i++) {
      let status =
        ((historyData[i].created +
          historyData[i].deleted +
          historyData[i].failed +
          historyData[i].updated) /
          historyData[i].total) *
        100

      masterUploadBar = (
        <AccordianBar
          timeOffset={this.props.timeOffset}
          completed={Math.ceil(status)}
          showPanel={this.state.showPanel[i]}
          data={historyData[i]}
          handleAccordianState={this._handlePanel.bind(this)}
          index={i}
          key={"acc" + i}
        />
      )
      result.push(masterUploadBar)
    }
    if (result.length === 0) {
      masterUploadBar = (
        <ListItem index={0} key={"listItem" + 0}>
          <div className="gor-inline">
            <div className="gor-utility-master-h1">
              <div className="gor-utility-no-history-found">
                <FormattedMessage
                  id="utility.uploadHist.noresultfound"
                  description="Status "
                  defaultMessage="No Result Found"
                />
              </div>
            </div>
            <div className="gor-inline gor-utility-master-h2" />
          </div>
          <div className="gor-inline gor-utility-master-h2" />
        </ListItem>
      )
      result.push(masterUploadBar)
    }
    return result
  }
  render() {
    var masterDataBody = this._renderMasterData()
    return (
      <div>
        <FileUpload
          uploadBtnText={this.props.uploadBtnText}
          isProcessing={this.props.isMasterUploadProcessing}
          maxFileSize={this.props.maxFileSize}
          acceptedFormats={this.props.acceptedFormats}
          onChange={this.props.onMasterFileUpload}
          errorCode={this.props.errorCode}
          maxSize={this.props.maxSize}
          errorList={this.props.errorList}
        />
        <div className="gor-utility-body-header">
          <FormattedMessage
            id="utility.uploadHistory.head"
            description="Upload History"
            defaultMessage="Upload History"
          />
        </div>
        <div className="gor-utility-history-container">{masterDataBody}</div>
      </div>
    )
  }
}
MasterUploadTile.propTypes = {
  onMasterFileUpload: React.PropTypes.func,
  historyData: React.PropTypes.array,
  acceptedFormats: React.PropTypes.array,
  validationList: React.PropTypes.object,
  maxFileSize: React.PropTypes.number,
  isMasterUploadProcessing: React.PropTypes.bool,
  uploadBtnText: React.PropTypes.string
}

export default MasterUploadTile
