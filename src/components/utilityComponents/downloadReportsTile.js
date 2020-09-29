import React from "react"
import { FormattedMessage, FormattedDate, defineMessages } from "react-intl"
import UtilityDropDown from "./utilityDropdownWrap"
import ListItem from "../list/listItem"

const messages = defineMessages({
  downloadReportsHead: {
    id: "utility.downloadReport.head",
    description: "Download Reports",
    defaultMessage: "Download Reports"
  },
  downloadRprtsStatusHead: {
    id: "utility.downloadReport.Status.heading",
    description: "Reports Status",
    defaultMessage: "Reports Status"
  },
  downloadRprtsCategoryLabel: {
    id: "utility.downloadRprts.CategoryLabel",
    description: "Category",
    defaultMessage: "Category"
  },
  downloadRprtsCategoryPlchldr: {
    id: "utility.downloadRprts.CategoryPlchldr",
    description: "Select Category",
    defaultMessage: "Select Category"
  },
  downloadRprtsCategoryInventory: {
    id: "utility.downloadRprts.CategoryInventory",
    description: "Inventory",
    defaultMessage: "Inventory"
  },
  downloadReportsCategoryItemMaster: {
    id: "utility.downloadRprts.CategoryItemMaster",
    description: "Item Master",
    defaultMessage: "Item Master"
  },
  downloadFileFormatPlchldr: {
    id: "utility.downloadRprts.FileFormatPlchldr",
    description: "Select File Format",
    defaultMessage: "Select File Format"
  },
  downloadFileFormatLabel: {
    id: "utility.downloadRprts.FileFormatLabel",
    description: "File Format",
    defaultMessage: "File Format"
  },
  downloadFileFormatCsv: {
    id: "utility.downloadRports.csvFormat",
    description: "Comma separated values (csv)",
    defaultMessage: "Comma separated values (csv)"
  },
  downloadFileFormatXls: {
    id: "utiltiy.downloadRports.xlsFormat",
    description: "ExceL Spreadsheet (xlsx)",
    defaultMessage: "ExceL Spreadsheet (xlsx)"
  },
  downloadLink: {
    id: "utility.grnHistory.clickToDownload",
    description: "file name",
    defaultMessage: "Click here to download "
  }
})

class DownloadReportsTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      fileType: null
    }
  }

  _changeReportCategory(data) {
    this.setState({ category: data.value })
  }

  _changeReportFileType(data) {
    this.setState({ fileType: data.value })
  }

  _generateReport() {
    if (this.props.generateReport && this.state.category === "inventory") {
      this.props.generateReport(this.state.fileType)
    } else if (
      this.props.generateItemMasterReport &&
      this.state.category === "itemMaster"
    ) {
      this.props.generateItemMasterReport()
    } else {
      throw new Error("Method for generating report not found")
    }
  }

  _getCurrentDropDownState(fileType, currentValue) {
    for (var i = fileType.length - 1; i >= 0; i--) {
      if (fileType[i].value === currentValue) {
        return fileType[i].label
      }
    }
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.props.reportsHistory) ===
      JSON.stringify(nextProps.reportsHistory)
    ) {
      return true
    } else {
      return false
    }
  }

  render() {
    const modes = [
      {
        value: "inventory",
        label: this.context.intl.formatMessage(
          messages.downloadRprtsCategoryInventory
        )
      },
      {
        value: "itemMaster",
        label: this.context.intl.formatMessage(
          messages.downloadReportsCategoryItemMaster
        )
      }
    ]
    const fileType = [
      {
        value: "csv",
        label: this.context.intl.formatMessage(messages.downloadFileFormatCsv)
      }
    ]

    let currentFileState = this.state.fileType
      ? this._getCurrentDropDownState(fileType, this.state.fileType)
      : null
    let currentCategoryState = this.state.category
      ? this._getCurrentDropDownState(modes, this.state.category)
      : null

    return (
      <div>
        <UtilityDropDown
          items={modes}
          dropdownLabel={this.context.intl.formatMessage(
            messages.downloadRprtsCategoryLabel
          )}
          placeHolderText={this.context.intl.formatMessage(
            messages.downloadRprtsCategoryPlchldr
          )}
          changeMode={this._changeReportCategory.bind(this)}
          currentState={currentCategoryState}
        />
        <UtilityDropDown
          items={fileType}
          dropdownLabel={this.context.intl.formatMessage(
            messages.downloadFileFormatLabel
          )}
          placeHolderText={this.context.intl.formatMessage(
            messages.downloadFileFormatPlchldr
          )}
          changeMode={this._changeReportFileType.bind(this)}
          currentState={currentFileState}
        />
        <div className="gor-utility-btn-wrap">
          <button
            onClick={this._generateReport.bind(this)}
            className={
              this.state.category && this.state.fileType
                ? "gor-download-button"
                : "gor-download-button gor-disable-content"
            }
          >
            <label>
              <FormattedMessage
                id="utility.downloadReports.head"
                description="Generate Report"
                defaultMessage="Generate Report"
                x
              />
            </label>
          </button>
        </div>
      </div>
    )
  }
}
DownloadReportsTile.propTypes = {
  reportsHistChanged: React.PropTypes.bool
}

DownloadReportsTile.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default DownloadReportsTile
