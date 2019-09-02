import React from 'react';
import { FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import UtilityDropDown from './utilityDropdownWrap';

const messages = defineMessages({
  downloadRprtsStatusHead: {
    id: 'utility.downloadGRN.status.heading',
    description: 'GRN Status',
    defaultMessage: 'GRN Status'
  },
  downloadGrnStnPlaceHolder: {
    id: 'utility.downloadGRN.stnPlaceholder',
    description: 'Enter STN Number',
    defaultMessage: 'Enter STN Number'
  },
  downloadGrnSelectFormatPlaceHolder: {
    id: 'utility.downloadGRN.formatPlaceholder',
    description: 'Enter STN Number',
    defaultMessage: 'Select File type'
  },
  downloadGrnLink: {
    id: 'utility.reportsHistory.clickToDownload',
    description: 'file name',
    defaultMessage: 'Click here to download '
  }
});

class DownloadGRNTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceId: null,
      fileType: null
    };
  }

  _changeGRNFileType(data) {
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
      throw new Error('Could not get the callback here!');
    }
  }

  _closeAndGenerateGRN() {
    if (this.props.generateReport) {
      this.props.closeAndGenerateReport(
        this.state.fileType,
        this.state.invoiceId
      );
    } else {
      throw new Error('Could not get the callback here!');
    }
  }

  _captureQuery(e) {
    if (e.target.value) {
      this.setState({ invoiceId: e.target.value });
    }
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
    let errorMessage = '';
    if (this.props.validatedInvoice === true) {
      errorMessage = (
        <FormattedMessage
          id='utility.downloadGRN.putAwayInProgress'
          description='Put away in Progress'
          defaultMessage='Put away in Progress'
        />
      );
    } else if (this.props.validatedInvoice === false) {
      errorMessage = (
        <FormattedMessage
          id='utility.downloadGRN.putAwayInProgress'
          description='Put away in Progress'
          defaultMessage='Put away in Progress'
        />
      );
    } else {
      errorMessage = this.props.validatedInvoice.reason;
    }
    const fileType = [
      { value: 'csv', label: 'Comma separated values (csv)' },
      {
        value: 'xlsx',
        label: 'ExceL Spreadsheet (xlsx)'
      }
    ];

    let currenFileType = this.state.fileType
      ? this._getCurrentDropDownState(fileType, this.state.fileType)
      : null;
    return (
      <div>
        <div className='gor-utility-invoice-h1'>
          <FormattedMessage
            id='utility.downloadGRN.label'
            description='STN number:'
            defaultMessage='STN number:'
          />
        </div>
        <div className='gor-audit-input-wrap gor-utility-invoice-wrap'>
          <input
            className='gor-audit-input gor-input-ok'
            placeholder={this.context.intl.formatMessage(
              messages.downloadGrnStnPlaceHolder
            )}
            ref={node => {
              this.invoiceId = node;
            }}
            onChange={this._captureQuery.bind(this)}
          />
          {this.props.validatedInvoice === 'ERR002' ||
          this.props.validatedInvoice === false ? (
            <div className='gor-login-error' />
          ) : (
            ''
          )}
        </div>
        {this.props.validatedInvoice.code === 'ERR002' ||
        this.props.validatedInvoice === false ? (
          <div className='gor-sku-error gor-utility-error-invoice'>
            {errorMessage}
          </div>
        ) : (
          ''
        )}
        <UtilityDropDown
          items={fileType}
          dropdownLabel='File format'
          placeHolderText={this.context.intl.formatMessage(
            messages.downloadGrnSelectFormatPlaceHolder
          )}
          changeMode={this._changeGRNFileType.bind(this)}
          currentState={currenFileType}
        />

        <div className='gor-utility-btn-wrap'>
          <button
            onClick={this._closeAndGenerateGRN.bind(this)}
            className={
              this.state.invoiceId && this.state.fileType
                ? 'gor-download-button'
                : 'gor-download-button gor-disable-content'
            }
          >
            <label>
              <FormattedMessage
                id='utility.cloaseAndDownloadGRN.head'
                description='Close and Generate Report'
                defaultMessage='Close and Generate Report'
              />
            </label>
          </button>
          <div style={{ height: '5px' }}> </div>
        </div>
      </div>
    );
  }
}

DownloadGRNTile.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default DownloadGRNTile;
