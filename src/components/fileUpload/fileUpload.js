import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import {
  UTILITY002,
  UTILITY001,
  MB,
  KB
} from "../../constants/frontEndConstants";

const messages=defineMessages({
  noLines: {
      id: 'utility.max.lines',
      description: 'lines internationalization',
      defaultMessage: " lines",
  }
});/**
 * Generic component for file upload
 */
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCode: null
    };
  }

  _onFileChange(event) {
      var fileSizeExceed = false;
      var files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.props.maxFileSize) {
          fileSizeExceed = true;
        }
      }
      this.setState({
          errorCode: !fileSizeExceed ? null : UTILITY001
        },() => {
          if(!fileSizeExceed){
            this.props.onChange(files[0]);
          }
        });
  }

  _onInputClick() {
    this.refs.fileUpload.value = null;
  }

  render() {
    let isProcessing = this.props.isProcessing;
    let maxSize =
      this.props.maxFileSize > MB
        ? Math.round(this.props.maxFileSize / MB) + "mb"
        : Math.round(this.props.maxFileSize / KB) + "kb";
    let errorLine = this.props.maxSize
      ? this.props.errorCode && this.props.errorCode === UTILITY002
        ? this.props.maxSize + this.context.intl.formatMessage(messages.noLines)
        : maxSize
      : "";
    if (this.state.errorCode === UTILITY001) {
      errorLine = maxSize;
    }

    return (
      <div>
        <div className="gor-utility-btn-wrap">
          <button className="gor-filterBtn-applied">
            <label>
              {!isProcessing ? (
                this.props.uploadBtnText
              ) : (
                <div className="gor-orange-spinner gor-csv-processing" />
              )}
            </label>
          </button>
          <label className={"gor-csvUploadWrap"}>
            <input
              type="file"
              ref="fileUpload"
              name={"csvUpload"}
              disabled={isProcessing}
              className={"gor-csvUpload"}
              accept={this.props.acceptedFormats.toString()}
              onClick={this._onInputClick.bind(this)}
              onChange={this._onFileChange.bind(this)}
            />
          </label>
          <p className={"gor-upl-msg"}>
            {" "}
            <FormattedMessage
              id="utility.fileSize.message"
              description="Maximum File Size:  MB"
              defaultMessage="Maximum File Size: {maxSize}"
              values={{ maxSize: maxSize }}
            />
          </p>
          <p className={"gor-upl-msg gor-upl-err"}>
            {this.state.errorCode ? (
              <FormattedMessage
                id="masterdata.maxlimit.uiCheck.filesize"
                description="File size error on UI check"
                defaultMessage="File size can not be greater than "
                values={maxSize}
              />
            ) : (
              ""
            )}
            {this.props.errorList[this.props.errorCode]}{" "}
            <FormattedMessage
              id="utility.fileSize.errorline"
              description="Line or size"
              defaultMessage=" {errorLine}"
              values={{ errorLine: errorLine }}
            />
          </p>
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  onChange: React.PropTypes.func,
  uploadBtnText: React.PropTypes.string,
  maxFileSize: React.PropTypes.number,
  acceptedFormats: React.PropTypes.array
};
export default FileUpload;