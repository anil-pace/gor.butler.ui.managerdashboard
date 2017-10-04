import React from "react";
import { FormattedMessage, FormattedDate, defineMessages } from "react-intl";
import UtilityDropDown from "./utilityDropdownWrap";
import ListItem from "../list/listItem";

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
});

class DownloadReportsTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      fileType: null
    };
  }

  _changeReportCategory(data) {
    this.setState({ category: data.value });
  }

  _changeReportFileType(data) {
    this.setState({ fileType: data.value });
  }

  _generateReport() {
    if (this.props.generateReport) {
      this.props.generateReport(this.state.fileType);
    } else {
      throw new Error("Method for generating report not found");
    }
  }

  _getCurrentDropDownState(fileType, currentValue) {
    for (var i = fileType.length - 1; i >= 0; i--) {
      if (fileType[i].value === currentValue) {
        return fileType[i].label;
      }
    }
    return null;
  }

  _renderDownloadReports(reportsHistory) {
    var result = [];

    // pushing then the list items
    if (reportsHistory.constructor !== Array && reportsHistory.length < 0) {
      //no history of files present from the backend
      return result;
    }
    for (let i = 0 ; i< reportsHistory.length; i++) {
      let listItem = (
        <ListItem
          index={i}
          key={"listItem" + i}
        >
          <div className="gor-inline">
            <div className="gor-utility-master-h1">
              {reportsHistory[i].file_url
                ? <a href={reportsHistory[i].file_url} download>
                    { this.context.intl.formatMessage(messages.downloadLink)}
                  </a>
                : ""}
            </div>
            <div className="gor-inline gor-utility-master-h2">
              <FormattedMessage
                id="utility.uploadHist.success"
                description="Status "
                defaultMessage="Status: {status}"
                values={{ status: reportsHistory[i].status }}
              />
            </div>
          </div>
          <div className="gor-inline gor-utility-master-h2">
            <FormattedDate
              value={new Date(reportsHistory[i].create_time)}
              month="short"
              day="2-digit"
              hour="2-digit"
              minute="2-digit"
              timeZone={this.props.timeOffset}
            />
          </div>
        </ListItem>
      );
      result.push(listItem);
    }
      if(result.length===0){
          let listItem=<ListItem index={0} key={"listItem" + 0}>
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
              <div className="gor-inline gor-utility-master-h2"/>

            </div>
            <div className="gor-inline gor-utility-master-h2"/>

          </ListItem>
          result.push(listItem)
      }
    return <div className="gor-utility-history-container">{result}</div>;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.props.reportsHistory) ===
      JSON.stringify(nextProps.reportsHistory)
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const modes = [
      {
        value: "inventory",
        label: this.context.intl.formatMessage(
          messages.downloadRprtsCategoryInventory
        )
      }
    ];
    const fileType = [
      {
        value: "csv",
        label: this.context.intl.formatMessage(messages.downloadFileFormatCsv)
      },
      {
        value: "xlsx",
        label: this.context.intl.formatMessage(messages.downloadFileFormatXls)
      }
    ];
    let reportsHistory = this._renderDownloadReports(this.props.reportsHistory);

    let currentFileState = this.state.fileType
      ? this._getCurrentDropDownState(fileType, this.state.fileType)
      : null;
    let currentCategoryState = this.state.category
      ? this._getCurrentDropDownState(modes, this.state.category)
      : null;

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
        <div className="gor-utility-body-header">
          <FormattedMessage
            id="utility.downloadReports.history"
            description="Report History"
            defaultMessage="Report History"
          />
        </div>
        <h1>
          {this.context.intl.formatMessage(messages.downloadRprtsStatusHead)}
        </h1>
        {reportsHistory}
      </div>
    );
  }
}
DownloadReportsTile.propTypes = {
  reportsHistChanged: React.PropTypes.bool
};

DownloadReportsTile.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default DownloadReportsTile;
