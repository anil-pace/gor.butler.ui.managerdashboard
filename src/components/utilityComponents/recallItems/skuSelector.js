import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape, defineMessages } from "react-intl";
import { resetForm } from "../../../actions/validationActions";
import SkuAlerts from "./skuAlerts";
import {
	ERROR,
	SKU,
	LOCATION,
	CREATE_AUDIT,
	APP_JSON,
	POST,
	GET,
	VALIDATE_SKU_ID,
	VALIDATE_LOCATION_ID,
	VALIDATE_LOCATION_ID_CSV,
	VALID_SKU,
	VALID_LOCATION,
	NO_ATTRIBUTE_SKU,
	SKU_NOT_EXISTS,
	LOCATION_NOT_EXISTS,
	NO_SKU_VALIDATION,
	NO_LOCATION_VALIDATION,
	WATING_FOR_VALIDATION,
	CREATE_AUDIT_REQUEST
} from "../../../constants/frontEndConstants";
import {
	AUDIT_URL,
	AUDIT_VALIDATION_URL,
	AUDIT_CREATION_URL
} from "../../../constants/configConstants";
import FieldError from "../../../components/fielderror/fielderror";
import { locationStatus, skuStatus } from "../../../utilities/fieldCheck";
import SearchDropdown from "../../../components/dropdown/searchDropdown";
import SelectAttributes from "../../../components/gor-select-attributes/selectAttributes";
import { InputComponent } from "../../../components/InputComponent/InputComponent.js";
import Filter from "../../../components/gor-filter-component/filter";
import GorTabs from "../../../components/gor-tabs/tabs";
import { Tab } from "../../../components/gor-tabs/tabContent";
import CSVUpload from "../../../components/gor-drag-drop-upload/index";
import { makeAjaxCall } from "../../../actions/ajaxActions";
import Spinner from "../../../components/spinner/Spinner";
import { setAuditSpinner } from "../../../actions/auditActions";
import { modal } from "react-redux-modal";
const messages = defineMessages({
	auditnameplaceholder: {
		id: 'audit.nameplaceholder.text',
		description: 'text for audit name placeholder',
		defaultMessage: 'Time, place or products'
	},
	auditinputplaceholder: {
		id: 'audit.inputplaceholder.text',
		description: 'text for audit input placeholder',
		defaultMessage: 'e.g: 012678ABC'
	},
	e027: {
		id: 'audit.skudoesnotexist.text',
		description: 'text for audit sku does not exist error',
		defaultMessage: 'SKU does not exist'
	},
})
class SkuSelector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visibility: `hidden`,
			copyPasteSKU: {
				data: [
					{
						checked: false,
						index: 0,
						value: "",
						errorMessage: ""
					}
				],
				focusedEl: "0",
				isInputEmpty: true
			},
			copyPasteLocation: {
				data: [
					{
						checked: false,
						index: 0,
						value: "",
						errorMessage: ""
					}
				],
				focusedEl: "0",
				isInputEmpty: true
			},
			filterSelectionState: "none",
			locationAttributes: {},
			skuAttributes: {},
			csvUploaded: false,
			locationMode: "location",
			skuMode: "sku",
			checkedState: true,
			isValidCsv: true,
			isAuditCreated: false,
			activeTabIndex: 0,
			validateclicked: false,
			selectedSKUList: {},
			auditSpinner: this.props.auditSpinner
		};

		this._updateInput = this._updateInput.bind(this);
		this._addNewInput = this._addNewInput.bind(this);
		this._onAttributeCheck = this._onAttributeCheck.bind(this);
		this._onFilterSelection = this._onFilterSelection.bind(this);
		this._deleteTuples = this._deleteTuples.bind(this);
		this._onBackClick = this._onBackClick.bind(this);
		this._validateSKU = this._validateSKU.bind(this);
		this._onAttributeSelection = this._onAttributeSelection.bind(this);
		this._invokeAlert = this._invokeAlert.bind(this);
	}
	componentWillUnmount() {
		this.props.resetForm();
	}
	_invokeAlert(additionalProps) {
		modal.add(SkuAlerts, {
			title: "",
			size: "large", // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideCloseButton: true,
			...additionalProps // (optional) if you don't wanna show the top right close button
			//.. all what you put in here you will get access in the modal props ;)
		});
	}
	_onBackClick() {
		if (this.state.activeTabIndex === 0) {
			this.setState({
				validationDoneSKU: true,
				skuAttributes: {},
				validateclicked: false,
				selectedSKUList: {},
				auditSpinner: false
			});
		} else {
			this.setState({
				validationDone: false,
				locationAttributes: {},
				validateclicked: false,
				auditSpinner: false
			});
		}
	}
	_addNewInput(type) {
		var stateInputList = JSON.parse(
			JSON.stringify(
				type === "location"
					? this.state.copyPasteLocation.data
					: this.state.copyPasteSKU.data
			)
		);
		var tuple = {
			checked: false,
			index: stateInputList.length,
			value: "",
			errorMessage: true
		};
		stateInputList.push(tuple);
		if (type === "location") {
			this.setState({
				copyPasteLocation: {
					data: stateInputList,
					focusedEl: (stateInputList.length - 1).toString()
				}
			});
		} else {
			this.setState({
				copyPasteSKU: {
					data: stateInputList,
					focusedEl: (stateInputList.length - 1).toString()
				}
			});
		}
	}
	_updateInput(event, id) {
		var input = event.target.value.trim(),
			inputList = input.split(/[\s,;\t\n]+/),
			processedList = [],
			activeTabIndex = this.state.activeTabIndex,
			stateInputList = JSON.parse(
				JSON.stringify(
					activeTabIndex === 1
						? this.state.copyPasteLocation.data
						: this.state.copyPasteSKU.data
				)
			),
			focusedEl = id ? id.toString() : "0";

		if (inputList.length > 1) {
			for (let i = 0, len = inputList.length; i < len; i++) {
				let tuple = {};
				tuple.checked = false;
				tuple.index = i;
				tuple.value = inputList[i];
				tuple.errorMessage = "";
				processedList.push(tuple);
			}
			stateInputList = processedList;
			focusedEl = "0";
		} else {
			let tuple = Object.assign({}, stateInputList[parseInt(id)]);
			tuple.value = input;
			stateInputList.splice(id, 1, tuple);
			focusedEl = id.toString();
		}
		if (activeTabIndex !== 0) {
			this.setState({
				copyPasteLocation: {
					data: stateInputList,
					focusedEl,
					isInputEmpty: false
				}
			});
		} else {
			this.setState({
				copyPasteSKU: {
					data: stateInputList,
					focusedEl,
					isInputEmpty: false
				}
			});
		}
	}


	componentWillReceiveProps(nextProps) {
		if (this.props.hasDataChanged !== nextProps.hasDataChanged) {
			let locationAttributes = JSON.parse(
				JSON.stringify(nextProps.locationAttributes)
			),
				skuAttributes = JSON.parse(
					JSON.stringify(nextProps.skuAttributes)
				),
				validatedLocations =
					this.state.activeTabIndex === 0
						? this.state.copyPasteLocation.data
						: this._processLocationAttributes(
							locationAttributes.data || []
						),
				validatedSKUs =
					this.state.activeTabIndex === 0
						? this._processSkuAttributes(skuAttributes.data || [])
						: this.state.copyPasteSKU.data,
				validationDone = Object.keys(locationAttributes).length
					? true
					: false,
				validationDoneSKU = Object.keys(skuAttributes).length
					? true
					: false;

			this.setState({
				copyPasteLocation: {
					data: validatedLocations,
					focusedEl: "0"
				},
				copyPasteSKU: {
					data: validatedSKUs,
					focusedEl: "0"
				},
				locationAttributes,
				validationDone,
				skuAttributes,
				validationDoneSKU,
				auditSpinner: nextProps.auditSpinner
			});
		}
		if (this.props.auditSpinner !== nextProps.auditSpinner) {
			this.setState({
				auditSpinner: nextProps.auditSpinner
			});
		}
		if (this.props.visibility !== nextProps.visibility) {
			this.setState({
				visibility: nextProps.visibility
			})
		}
	}
	_onAttributeSelection(selectedAttributes, index) {
		var selAtt = JSON.parse(JSON.stringify(selectedAttributes));
		var selectedSKUList = JSON.parse(
			JSON.stringify(this.state.selectedSKUList)
		);
		var attributeList = [];
		var sku = this.state.copyPasteSKU["data"][index].value;
		var tuple = {};
		tuple.sku = sku;
		tuple.attributes_sets = [];
		for (let key in selAtt) {
			let categories = {};
			for (let k in selAtt[key]) {
				if (!categories[selAtt[key][k].category]) {
					categories[selAtt[key][k].category] = [];
				}
				categories[selAtt[key][k].category].push(k);
			}
			tuple.attributes_sets.push(categories);
		}
		selectedSKUList[sku] = tuple;

		this.setState({
			selectedSKUList
		});
	}
	_onFilterSelection(selection) {
		var activeTabIndex = this.state.activeTabIndex;
		var validatedData = JSON.parse(
			JSON.stringify(
				activeTabIndex !== 0
					? this.state.copyPasteLocation.data
					: this.state.copyPasteSKU.data
			)
		);
		var processedData = [],
			filterSelectionState;
		for (let i = 0, len = validatedData.length; i < len; i++) {
			let tuple = Object.assign({}, validatedData[i]);
			if (selection === "select_all") {
				tuple.checked = true;
				processedData.push(tuple);
			} else if (selection === "select_all_valid") {
				if (tuple.errorMessage.constructor === Boolean) {
					tuple.checked = true;
				} else {
					tuple.checked = false;
				}
				processedData.push(tuple);
			} else if (selection === "select_all_invalid") {
				if (tuple.errorMessage.constructor !== Boolean) {
					tuple.checked = true;
				} else {
					tuple.checked = false;
				}
				processedData.push(tuple);
			} else if (selection === "deselect_all") {
				tuple.checked = false;
				processedData.push(tuple);
			}
		}
		if (selection === "deselect_all") {
			filterSelectionState = "none";
		} else if (selection === "select_all") {
			filterSelectionState = "all";
		} else {
			filterSelectionState = "partial";
		}

		if (activeTabIndex === 0) {
			this.setState({
				copyPasteSKU: {
					data: processedData,
					focusedEl: this.state.copyPasteSKU.focusedEl
				},
				filterSelectionState
			});
		} else {
			this.setState({
				copyPasteLocation: {
					data: processedData,
					focusedEl: this.state.copyPasteLocation.focusedEl
				},
				filterSelectionState
			});
		}
	}
	_deleteTuples() {
		var selectedTuples = [];
		var tuples =
			this.state.activeTabIndex === 0
				? this.state.copyPasteSKU.data
				: this.state.copyPasteLocation.data;
		for (let i = 0, len = tuples.length; i < len; i++) {
			if (!tuples[i].checked) {
				selectedTuples.push(Object.assign({}, tuples[i]));
			}
		}
		if (this.state.activeTabIndex === 0) {
			this.setState({
				copyPasteSKU: {
					data: selectedTuples,
					focusedEl: "0"
				}
			});
		} else {
			this.setState({
				copyPasteLocation: {
					data: selectedTuples,
					focusedEl: "0"
				}
			});
		}
	}
	_onAttributeCheck(event, index) {
		var copyPasteLocation = JSON.parse(
			JSON.stringify(
				this.state.activeTabIndex === 0
					? this.state.copyPasteSKU.data
					: this.state.copyPasteLocation.data
			)
		);
		var tuple = Object.assign({}, copyPasteLocation[parseInt(index)]);
		tuple.checked = event.target.checked;
		copyPasteLocation.splice(parseInt(index), 1, tuple);
		if (this.state.activeTabIndex === 0) {
			this.setState({
				copyPasteSKU: {
					data: copyPasteLocation,
					focusedEl: this.state.copyPasteSKU.focusedEl
				}
			});
		} else {
			this.setState({
				copyPasteLocation: {
					data: copyPasteLocation,
					focusedEl: this.state.copyPasteLocation.focusedEl
				}
			});
		}
	}
	_processSkuAttributes(data) {
		var processedData = [];
		for (let i = 0, len = data.length; i < len; i++) {
			let tuple = {};
			let error_code =
				data[i].status === true ? "" : data[i].status.error_code;
			tuple.checked = false;
			tuple.index = i;
			tuple.value = data[i].skuName;
			tuple.errorMessage =
				data[i].status === true
					? data[i].status
					: this.props.intl.formatMessage(messages[error_code]);
			processedData.push(tuple);
		}
		return processedData;
	}
	_processLocationAttributes(data) {
		var processedData = [];
		let self = this;
		for (let i = 0, len = data.length; i < len; i++) {
			let children = data[i].children,
				tuple = {};
			tuple.checked = false;
			tuple.index = i;
			tuple.value = data[i].name;
			let error_code =
				data[i].status === true ? "" : data[i].status.error_code;
			tuple.errorMessage =
				data[i].status === true
					? data[i].status
					: this.props.intl.formatMessage(messages[error_code]);
			processedData.push(tuple);
			if (children) {
				for (let j = 0; j < children.length; j++) {
					let child = {};
					child.checked = false;
					child.index = j;
					child.value = children[j].name;
					let error_code =
						children[j].status === true
							? ""
							: children[j].status.error_code;
					child.errorMessage =
						children[j].status === true
							? children[j].status
							: this.props.intl.formatMessage(
								messages[error_code]
							);
					processedData.push(child);
				}
			}
		}
		return processedData;
	}

	_validateSKU(type) {
		let validSKUData = {
			audit_param_name: "name",
			audit_param_type: "sku"
		};
		let arrSKU = this.state.copyPasteSKU.data.slice(0);
		let selectedSKUList = JSON.parse(
			JSON.stringify(this.state.selectedSKUList)
		);
		let auditParamValue = [];
		let sendRequest = false;

		if (type === "validate") {
			validSKUData.audit_param_value = {};
			for (let i = 0, len = arrSKU.length; i < len; i++) {
				auditParamValue.push(arrSKU[i].value.trim());
			}
			validSKUData.audit_param_value.sku_list = auditParamValue;
			sendRequest = true;
		}
		if (sendRequest) {
			let urlData = {
				url: AUDIT_VALIDATION_URL,
				formdata: validSKUData,
				method: GET,//POST,
				cause: VALIDATE_SKU_ID,
				contentType: APP_JSON,
				accept: APP_JSON,
				token: this.props.auth_token
			};
			this.props.setAuditSpinner(true);
			this.props.makeAjaxCall(urlData);
		}
	}
	render() {
		let validSkuMessg = (
			<FormattedMessage
				id="audit.valid.sku"
				description="text for valid sku"
				defaultMessage="SKU confirmed"
			/>
		);
		let validLocationMessg = (
			<FormattedMessage
				id="audit.valid.location"
				description="text for valid location"
				defaultMessage="Location valid"
			/>
		);
		let invalidSkuMessg = (
			<FormattedMessage
				id="audit.invalid.sku"
				description="text for invalid sku"
				defaultMessage="Please enter correct SKU number"
			/>
		);
		let invalidLocationMessg = (
			<FormattedMessage
				id="audit.invalid.location"
				description="text for invalid location"
				defaultMessage="Please enter correct Location number"
			/>
		);
		let validSkuNoAtriMessg = (
			<FormattedMessage
				id="audit.noAtrributes.sku"
				description="text for valid sku with no attributed"
				defaultMessage="SKU confirmed but no Box Id found"
			/>
		);
		let uploadCsvMessg = (
			<FormattedMessage
				id="audit.uploadcsv.text"
				description="text for upload csv and validate"
				defaultMessage="Upload CSV and validate"
			/>
		);
		let selectAttributesMessg = (
			<FormattedMessage
				id="audit.selectattributes.text"
				description="text for select attributes"
				defaultMessage="Select attributes"
			/>
		);
		let auditBySkuMessg = (
			<FormattedMessage
				id="audit.auditbysku.text"
				description="text for audit by sku"
				defaultMessage="Audit by SKU"
			/>
		);
		let skuSelectAttributes = (
			<FormattedMessage
				id="audit.auditbysku.selectAttributes"
				description="text for audit by sku"
				defaultMessage="Select Attributes"
			/>
		);
		let auditByLocationMessg = (
			<FormattedMessage
				id="audit.auditbylocation.text"
				description="text for audit by location"
				defaultMessage="Audit by Location"
			/>
		);

		var validateclicked = this.state.validateclicked;

		let self = this;

		let { validationDone, validationDoneSKU, activeTabIndex } = self.state;
		let allLocationsValid =
			self.state.locationAttributes &&
				!self.state.locationAttributes.totalInvalid
				? true
				: false;
		let allSKUsValid =
			self.state.skuAttributes &&
				self.state.skuAttributes.totalInvalid === 0
				? true
				: false;
		const selectAllLabel = (
			<FormattedMessage
				id="Audit.inputCheckbox.selectAllLabel"
				description="audit dropdown option for Select All"
				defaultMessage="Select All"
			/>
		);
		let selectAllInvalidLabel = (
			<FormattedMessage
				id="Audit.inputCheckbox.selectAllInvalidLabel"
				description="audit dropdown option for Select All Invalid"
				defaultMessage="Select all invalid"
			/>
		);
		let selectAllValidLabel = (
			<FormattedMessage
				id="Audit.inputCheckbox.selectAllValidLabel"
				description="audit dropdown option for Select All valid"
				defaultMessage="Select all valid"
			/>
		);

		let deselectAllLabel = (
			<FormattedMessage
				id="Audit.inputCheckbox.deselectAllLabel"
				description="audit dropdown option for Deselecting all"
				defaultMessage="Deselect All"
			/>
		);

		const filterOptions = [
			{
				value: "select_all",
				label: selectAllLabel,
				disabled: false
			},
			{
				value: "select_all_valid",
				label: selectAllValidLabel,
				disabled: false
			},
			{
				value: "select_all_invalid",
				label: selectAllInvalidLabel,
				disabled: false
			},
			{
				value: "deselect_all",
				label: deselectAllLabel,
				disabled: false
			}
		];

		return (

			<div className="gor-modal-content gor-audit-create" style={{ visibility: this.state.visibility }}>
				<div className='gor-modal-body'>
					<div className='gor-audit-form new-audit'>
						<GorTabs defaultActiveTabIndex={0} tabClass={"tabs-audit"} >
							<Tab tabName={auditBySkuMessg} iconClassName={'icon-class-0'}
								linkClassName={'link-class-0'}>
								<div>
									<div className={'sku-mode active-mode'}>
										<GorTabs defaultActiveTabIndex={!validationDoneSKU ? 0 : 1} disabledTabIndex={validationDoneSKU ? 0 : 1} tabClass={"sub-tabs-audit"}>
											<Tab tabName={<span className={"sub-tab-name"}><i className={"sub-tab-index"}>1</i>{auditBySkuMessg}</span>} iconClassName={'icon-class-0'}
												linkClassName={'link-class-0'}  >
												{!validationDoneSKU && <div className="gor-audit-inputlist-wrap" >
													<div>
														<div className='gor-sub-head-audit-input'><FormattedMessage id="audit.add.sku.subheading" description='Subtext for enter sku'
															defaultMessage='Use copy and paste if you have muktiple sku numbers' /></div>
													</div>
													<div>
														{self.state.copyPasteSKU.data.map(function (tuple, i) {
															let focus = (self.state.copyPasteSKU.focusedEl === i.toString()) ? true : false;
															return (<div className="gor-audit-input-wrap" key={tuple.value + i}>
																<InputComponent.CopyPaste
																	className={"gor-audit-input gor-input-ok"}
																	autoFocus={focus}
																	updateInput={self._updateInput}
																	index={i}
																	value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)} />
															</div>)
														})}
														<div>
															<button className='gor-audit-addnew-button' type="button" onClick={() => this._addNewInput("sku")}><FormattedMessage id="audits.addLocation" description='Text for adding a location'
																defaultMessage='+ Add New' /></button>
														</div>
													</div>



												</div>}
											</Tab>
											<Tab tabName={<span className={"sub-tab-name"}><i className={"sub-tab-index"}>2</i>{skuSelectAttributes}</span>} iconClassName={'icon-class-1'}
												linkClassName={'link-class-1'}  >
												<div className={"gor-global-notification"}>
													{validationDoneSKU && allSKUsValid ?
														<div className={"gor-audit-att-ribbon"}>
															<div className="gor-sku-validation-btn-wrap">
																<button onClick={this._onBackClick} className={"gor-audit-edit-att"}><FormattedMessage id="audits.editLocation" description='Text for editing a location'
																	defaultMessage='BACK TO EDIT' /></button>

															</div>
															<div className={"message success"}>
																<FormattedMessage id="audit.locationValidation.success" description='Audit location verification success message'
																	defaultMessage='{valid} out of {total} locations valid'
																	values={
																		{
																			valid: self.state.skuAttributes.totalValid ? self.state.skuAttributes.totalValid.toString() : "0",
																			total: self.state.skuAttributes.totalSKUs ? self.state.skuAttributes.totalSKUs.toString() : "0"
																		}
																	} />
															</div></div> : <div><div className="gor-sku-validation-btn-wrap"><Filter options={filterOptions} checkState={self.state.filterSelectionState} onSelectHandler={this._onFilterSelection} />
																<span className="gor-delete-outline">
																	<span className={self.state.filterSelectionState === "none" ? "gor-delete-location-disabled" : "gor-delete-location"} onClick={this._deleteTuples}></span>
																</span>
															</div>
															<div className={"message error"}>
																<FormattedMessage id="audit.locationValidation.error" description='Audit location verification error message'
																	defaultMessage='{invalid} Error found out of {total} Locations, Please rectify or enter valid Location'
																	values={
																		{
																			invalid: self.state.skuAttributes.totalInvalid ? self.state.skuAttributes.totalInvalid.toString() : "0",
																			total: self.state.skuAttributes.totalSKUs ? self.state.skuAttributes.totalSKUs.toString() : "0"
																		}
																	} />
															</div></div>}
												</div>
												{validationDoneSKU && <div className="gor-audit-inputlist-wrap" >
													<div>
														{self.state.copyPasteSKU.data.map((tuple, i) => {
															let tuples = [],
																attributeList = this.state.skuAttributes.data[i].attributeList;
															tuples.push(<div className={"gor-valid-row"} key={tuple.value + i}>
																<InputComponent.AfterValidation
																	className={"gor-audit-input gor-input-ok"}
																	autoFocus={focus}
																	updateInput={self._updateInput}
																	index={i}
																	allRowValid={allSKUsValid}
																	onAttributeCheck={self._onAttributeCheck}
																	checked={tuple.checked}
																	errorMessage={!allSKUsValid ? tuple.errorMessage : true}
																	value={tuple.value} placeholder={self.props.intl.formatMessage(messages.auditinputplaceholder)} />
																{allSKUsValid && attributeList.length > 0 && <SelectAttributes
																	attributeList={attributeList}
																	applyCallBack={this._onAttributeSelection}
																	index={i}
																/>}
															</div>)
															return (tuples)
														})}
													</div>
												</div>}
											</Tab>
										</GorTabs>
										{!allSKUsValid && <div className={"gor-sku-validation-btn-wrap" + (this.props.skuValidationSpinner ? " gor-disable-content" : "")}>
											<button className={"gor-auditValidate-btn"} type="button" onClick={(e) => this._validateSKU("validate")}>{this.state.auditSpinner ? <Spinner isLoading={this.state.auditSpinner} utilClassNames={"gor-orange-spinner"} /> : <FormattedMessage id="audits.validateSKU" description='Text for validate sku button'
												defaultMessage='Validate' />}</button>
										</div>}
									</div>
								</div>
							</Tab>
							<Tab tabName={auditByLocationMessg} iconClassName={'icon-class-0'}
								linkClassName={'link-class-0'} internalTab={false} >
							</Tab>
						</GorTabs>
					</div>
				</div>
			</div>
		);
	}
}

SkuSelector.PropTypes = {
	skuValidationSpinner: React.PropTypes.boolean,
	auditType: React.PropTypes.object,
	skuCheck: React.PropTypes.object,
	auth_token: React.PropTypes.string,
	skuAttributes: React.PropTypes.object,
	intl: intlShape.isRequired,
	auditSpinner: React.PropTypes.bool,
	setAuditSpinner: React.PropTypes.func

}


SkuSelector.defaultProps = {
	skuValidationSpinner:false,
	auditType:{},
	skuCheck:{},
	skuAttributes:{},
	locationAttributes:{},
	hasDataChanged:false
  };
var mapDispatchToProps = function (dispatch) {
	return {
		resetForm: function () { dispatch(resetForm()); },
		makeAjaxCall: function (data) { dispatch(makeAjaxCall(data)) },
		setAuditSpinner: function (data) {dispatch(setAuditSpinner(data))}
	};
};

function mapStateToProps(state, ownProps){
	return {
		skuValidationSpinner: state.auditInfo.skuValidationSpinner ,
		locationValidationSpinner: state.auditInfo.locationValidationSpinner ,
		locationValidationSpinnerCsv: state.auditInfo.locationValidationSpinnerCsv ,
		auditType:  state.auditInfo.auditType,
		skuCheck: state.appInfo.skuInfo,
		locCheck: state.appInfo.locInfo,
		auth_token:state.authLogin.auth_token,
		skuAttributes: state.auditInfo.skuAttributes,
		locationAttributes:state.auditInfo.locationAttributes,
		hasDataChanged:state.auditInfo.hasDataChanged,
		auditSpinner: state.spinner.auditSpinner || false
	};
  }
  

SkuSelector.contextTypes = {
	intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkuSelector));
