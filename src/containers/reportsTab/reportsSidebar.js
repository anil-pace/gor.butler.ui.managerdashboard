/**
 * Created by gaurav.m on 5/22/17.
 */
import React from 'react'
import ReportDownloadDropDown from './reportDownloadDropdownWrap'
import {FormattedMessage} from 'react-intl'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
class ReportsSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {skuNumber: "", category: "All", reportType: null, errors: {}}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reportGenerationParams && JSON.stringify(this.state) !== JSON.stringify(nextProps.reportGenerationParams)) {
            this.setState(nextProps.reportGenerationParams)
        }
    }

    _changeReportFileType(data) {
        this.setState({reportType: data.value})
    }

    _handleChangeSkuNumber(event) {
        this.setState({skuNumber: event.target.value})
        let errors = this.state.errors
        if (!event.target.value) {
            errors.sku = "invalid"
        }else{
            delete errors.sku
        }
        this.setState({errors: errors})
    }

    _handleChangeCategory(event) {
        this.setState({category: event.target.value})
    }

    generateReport() {
        if (Object.keys(this.state.errors).length > 0) {
            return false
        }
        let _query = {}
        _query.category = this.state.category
        if (_query.category !== 'All') {
            _query.skuNumber = this.state.skuNumber
        }
        _query.reportType = this.state.reportType
        hashHistory.push({pathname: "/reports", query: _query})
    }

    _getCurrentCategory(reportTypes, current) {
        let current_category = null
        reportTypes.forEach(function (reportType) {
            if (reportType.value === current) {
                current_category = reportType.label
            }
        })
        return current_category
    }

    render() {
        let reportTypes = [{value: 'csv', label: "Inventory Stock Ledger Report"}]
        let currentCategory = this._getCurrentCategory(reportTypes, this.state.reportType)
        return (
            <div>
                <div className="reportSidebarHeader">
                    <FormattedMessage id="reports.sidebar.header.text"
                                      description="Generate Reports"
                                      defaultMessage="Generate Reports"/>
                </div>
                <div className="reportSidebarFormContainer">

                    <ReportDownloadDropDown key="2" items={reportTypes} dropdownLabel="Select Category"
                                            placeHolderText="Select Category"
                                            changeMode={this._changeReportFileType.bind(this)}
                                            currentState={currentCategory}/>
                    <div className="reportsSidebarCategoryContainer">
                        <div className="categoryAll">
                            <input onChange={this._handleChangeCategory.bind(this)}
                                   checked={this.state.category === 'All'} type="radio" name="category" value="All"/>All
                        </div>
                        <div className="categorySku">
                            <input type="radio" name="category" onChange={this._handleChangeCategory.bind(this)}
                                   checked={this.state.category === 'sku'} value="sku"/>Of SKU/Name
                        </div>


                    </div>
                    {this.state.category === "sku" ? <div className="reportsSidebarSkuContainer">
                        <input onChange={this._handleChangeSkuNumber.bind(this)}
                               className={"gor-report-download-input-wrap" + (this.state.errors['sku'] ? " gor-input-error" : "")}
                               type="text" name="skuNumber"
                               placeholder="Enter SKU Number/Name" value={this.state.skuNumber}/>
                    </div> : null}
                </div>
                <div style={{padding: '25px'}}>
                    <button onClick={this.generateReport.bind(this)} style={{float: 'right'}}
                            className="gor-report-download-btn">
                        {!this.props.generateReportSpinner? <FormattedMessage id="reports.sidebar.generate.buttonText" description="Generate Button Text"  defaultMessage ="Generate"/> :<div className='spinnerImage'></div>}
                    </button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        reportGenerationParams: state.reportsDetail.reportGenerationParams || [],
        generateReportSpinner: state.spinner.generateReportSpinner || false
    };
}
export default connect(mapStateToProps, null)(ReportsSidebar) ;