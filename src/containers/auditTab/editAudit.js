import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  defineMessages
} from 'react-intl';
import { connect } from 'react-redux';
import { VALID_SKU } from '../../constants/frontEndConstants';
import SelectAttributes from '../../components/gor-select-attributes/selectAttributes';
import { InputComponent } from '../../components/InputComponent/InputComponent.js';
import Filter from '../../components/gor-filter-component/filter';
import SearchFilterComponent from '../../components/gor-search-component/searchFilter';
import GorTabs from '../../components/gor-tabs/tabs';
import { Tab } from '../../components/gor-tabs/tabContent';
import CSVUpload from '../../components/gor-drag-drop-upload/index';
import Spinner from '../../components/spinner/Spinner';
import { setValidationAuditSpinner } from '../../actions/auditActions';
import { modal } from 'react-redux-modal';
import SkuAlerts from './skuAlerts';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
  processValidationDataSKU,
  processValidationData
} from './utilityFunctions';
import { getFormattedMessages } from '../../../src/utilities/getFormattedMessages';
import {
  resetForm,
  notifyfeedback,
  notifyFail
} from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import { AuditParse } from '../../../src/utilities/auditResponseParser';
import { ShowError } from '../../../src/utilities/ErrorResponseParser';
import { auditEditDupData, auditNeedRefreshFlag } from './query/clientQuery';
import {
  AUDIT_VALIDATE_QUERY,
  AUDIT_EDIT_DUPLICATE_QUERY
} from './query/serverQuery';

const attributeComponentMessages = {
  apply: (
    <FormattedMessage
      id='Audit.selectAttribute.apply'
      description='Texts for select attribute component'
      defaultMessage='Apply'
    />
  ),
  add_set_of_attributes: (
    <FormattedMessage
      id='Audit.selectAttribute.addSetofAttributes'
      description='Texts for select attribute component'
      defaultMessage='+ ADD SET OF ATTRIBUTES'
    />
  ),
  footer_message: (
    <FormattedMessage
      id='Audit.selectAttribute.footerMessage'
      description='Texts for select attribute component'
      defaultMessage='Note: You can add multiple sets of attributes'
    />
  ),
  back: (
    <FormattedMessage
      id='Audit.selectAttribute.back'
      description='Texts for select attribute component'
      defaultMessage='Back'
    />
  ),
  clear_all: (
    <FormattedMessage
      id='Audit.selectAttribute.clearAll'
      description='Texts for select attribute component'
      defaultMessage='Clear All'
    />
  ),
  add_more_sets_of_attributes: (
    <FormattedMessage
      id='Audit.selectAttribute.addMoreSets'
      description='Texts for select attribute component'
      defaultMessage='Add more Sets of Attributes'
    />
  )
};
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
  searchPlaceholderSKU: {
    id: 'audit.searchinputplaceholder.text',
    description: 'text for search audit input placeholder',
    defaultMessage: 'Search SKU'
  },
  searchPlaceholderLocation: {
    id: 'audit.locinputplaceholder.text',
    description: 'text for search audit input placeholder',
    defaultMessage: 'Search Location'
  },
  e026: {
    id: 'audit.locationdoesnotexist.text',
    description: 'text for audit location does not exist error',
    defaultMessage: 'Location does not exist'
  },
  e027: {
    id: 'audit.skudoesnotexist.text',
    description: 'text for audit sku does not exist error',
    defaultMessage: 'SKU does not exist'
  },
  e0xx: {
    id: 'audit.duplicatelocation.text',
    description: 'text for audit duplicate location error',
    defaultMessage: 'Duplicate entry'
  }
});

class EditAudit extends React.Component {
  constructor(props) {
    super(props);
    this.processValidationDataSKU = processValidationDataSKU;
    this.processValidationData = processValidationData;

    this.state = {
      copyPasteSKU: {
        data: [
          {
            checked: false,
            index: 0,
            value: '',
            visible: true,
            errorMessage: ''
          }
        ],
        focusedEl: '0',
        selectionStart: 0,
        isInputEmpty: true
      },
      copyPasteLocation: {
        data: [
          {
            checked: false,
            index: 0,
            value: '',
            visible: true,
            errorMessage: ''
          }
        ],
        focusedEl: '0',
        selectionStart: 0,
        isInputEmpty: true
      },
      filterApplied: false,
      filterSelectionState: 'none',
      locationAttributes: {},
      skuAttributes: {},
      csvUploaded: false,
      locationMode: 'location',
      skuMode: 'sku',
      checkedState: true,
      isValidCsv: true,
      isAuditCreated: false,
      activeTabIndex: 0,
      validateclicked: false,
      selectedSKUList: {},
      auditSpinner: this.props.auditSpinner,
      audit_Id: this.props.auditId
    };

    this._updateInput = this._updateInput.bind(this);
    this._addNewInput = this._addNewInput.bind(this);
    this._onAttributeCheck = this._onAttributeCheck.bind(this);
    this._onFilterSelection = this._onFilterSelection.bind(this);
    this._deleteTuples = this._deleteTuples.bind(this);
    this._onLocationModeSelection = this._onLocationModeSelection.bind(this);
    this._onSkuModeSelection = this._onSkuModeSelection.bind(this);
    this._dropHandler = this._dropHandler.bind(this);
    this._parseCSVFile = this._parseCSVFile.bind(this);
    this._onFileUpload = this._onFileUpload.bind(this);
    this._validateLocation = this._validateLocation.bind(this);
    this._onBackClick = this._onBackClick.bind(this);
    this._validateSKU = this._validateSKU.bind(this);
    this._invokeAlert = this._invokeAlert.bind(this);
    this._searchCallBack = this._searchCallBack.bind(this);
    this._createAudit = this._createAudit.bind(this);
  }

  componentDidMount() {
    var _this = this;
    var auditId = this.state.audit_Id;
    this.props.client
      .query({
        query: AUDIT_EDIT_DUPLICATE_QUERY,
        variables: (function() {
          return {
            data: { audit_id: auditId }
          };
        })(),
        fetchPolicy: 'network-only'
      })
      .then(data => {
        var auditRawData = data.data.EditAuditDetails.list
          ? JSON.parse(data.data.EditAuditDetails.list)
          : {};
        let dataSentToProps = {};
        if (auditRawData && auditRawData.attributes_list_sets) {
          let processedDataSKUEditDup = _this.processValidationDataSKU(
            auditRawData,
            'Edit_Dup'
          );
          dataSentToProps = {
            auditEditData: processedDataSKUEditDup,
            hasDataChanged: !_this.props.hasDataChanged,
            skuDataChanged: !_this.props.skuDataChanged,
            auditSpinner: false,
            auditValidationSpinner: false,
            locationAttributes: null
          };
        } else {
          let processedData = _this.processValidationData(
            auditRawData,
            'Edit_Dup'
          ); //(action.data)
          dataSentToProps = {
            locationAttributes: processedData,
            hasDataChanged: !_this.props.hasDataChanged,
            locationDataChanged: !_this.props.locationDataChanged,
            auditValidationSpinner: false
          };
        }
        _this.props.SetEditDupDetails(dataSentToProps);
      })
      .catch(errors => {
        let code = errors.graphQLErrors[0].code;
        let message = errors.graphQLErrors[0].message;
        ShowError(_this, code);
      });
  }

  componentWillUnmount() {}

  _removeThisModal() {
    this.props.removeModal();
  }
  componentWillReceiveProps(nextProps) {
    var a = nextProps.auditEditData;
    if (this.props.hasDataChanged !== nextProps.hasDataChanged) {
      let locationAttributes = [],
        validatedLocations = [],
        validationDone = true,
        skuAttributes = {},
        validatedSKUs = [],
        validationDoneSKU = true,
        attrList = {},
        activeTabIndex = 0;
      if (
        nextProps.locationAttributes &&
        Object.keys(nextProps.locationAttributes).length
      ) {
        locationAttributes = JSON.parse(
          JSON.stringify(nextProps.locationAttributes)
        );
        validatedLocations =
          this._processLocationAttributes(locationAttributes.data) || [];
        validationDone = Object.keys(locationAttributes).length ? true : false;
        skuAttributes = {};
        validatedSKUs = [];
        activeTabIndex = 1;
        this.kqCheck.checked = locationAttributes.kq;
      } else {
        if (
          this.props.auditEditData !== nextProps.auditEditData &&
          !nextProps.skuAttributes
        ) {
          skuAttributes = JSON.parse(JSON.stringify(nextProps.auditEditData));
          attrList = nextProps.auditEditData.outerObj;
          this.kqCheck.checked = skuAttributes.kq;
        } else {
          skuAttributes = JSON.parse(JSON.stringify(nextProps.skuAttributes));
          attrList = {};
        }
        (validatedLocations = this.state.copyPasteLocation.data),
          (validatedSKUs = this._processSkuAttributes(
            skuAttributes.data || []
          ));
        (validationDone = Object.keys(locationAttributes).length
          ? true
          : false),
          (validationDoneSKU = Object.keys(skuAttributes).length
            ? true
            : false);
        activeTabIndex = 0;
      }
      this.setState(
        {
          copyPasteLocation: {
            data: validatedLocations,
            focusedEl: '0',
            selectionStart: this.state.copyPasteLocation.selectionStart
          },
          copyPasteSKU: {
            data: validatedSKUs,
            focusedEl: '0',
            selectionStart: this.state.copyPasteSKU.selectionStart
          },
          locationAttributes,
          validationDone,
          skuAttributes,
          validationDoneSKU,
          activeTabIndex,
          auditSpinner: nextProps.auditSpinner
        },
        function() {
          this._onAttributeSelectionFirstTime();
          if (activeTabIndex == 1) {
            this.auditNameLoc.value = locationAttributes.audit_name;
          } else {
            this.auditNameSKU.value = skuAttributes.audit_name;
          }
        }
      );
    }
    if (this.props.auditSpinner !== nextProps.auditSpinner) {
      this.setState({
        auditSpinner: nextProps.auditSpinner
      });
    }
  }

  _onAttributeSelectionFirstTime() {
    var selectedSKUList = JSON.parse(
      JSON.stringify(this.state.selectedSKUList)
    );
    this.state.copyPasteSKU.data.map((tuple, i) => {
      let selAtt = this.state.skuAttributes.outerObj[tuple.value];
      var sku = tuple.value;
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
    });
  }

  _onAttributeSelection(selectedAttributes, index) {
    var selAtt = JSON.parse(JSON.stringify(selectedAttributes));
    var selectedSKUList = JSON.parse(
      JSON.stringify(this.state.selectedSKUList)
    );
    var sku = this.state.copyPasteSKU['data'][index].value;
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
          focusedEl: this.state.copyPasteSKU.focusedEl,
          selectionStart: this.state.copyPasteSKU.selectionStart
        }
      });
    } else {
      this.setState({
        copyPasteLocation: {
          data: copyPasteLocation,
          focusedEl: this.state.copyPasteLocation.focusedEl,
          selectionStart: this.state.copyPasteLocation.selectionStart
        }
      });
    }
  }
  _processSkuAttributes(data) {
    var processedData = [];
    for (let i = 0, len = data.length; i < len; i++) {
      let tuple = {};
      let error_code = data[i].status
        ? data[i].status === true
          ? ''
          : data[i].status.error_code
        : ''; //MIGHT

      tuple.checked = false;
      tuple.index = i;
      tuple.visible = true;
      tuple.value = data[i].skuName;
      tuple.errorMessage = data[i].status
        ? data[i].status === true
          ? ''
          : this.props.intl.formatMessage(messages[error_code])
        : ''; //MIGHT

      processedData.push(tuple);
    }
    return processedData;
  }
  _processLocationAttributes(data) {
    var processedData = [];
    for (let i = 0, len = data.length; i < len; i++) {
      let children = data[i].children,
        tuple = {};
      tuple.checked = false;
      tuple.index = i;
      tuple.visible = true;
      tuple.value = data[i].name;
      let error_code = data[i].status === true ? '' : data[i].status.error_code;
      tuple.errorMessage =
        data[i].status === true
          ? ''
          : this.props.intl.formatMessage(messages[error_code]);
      processedData.push(tuple);
      if (children) {
        for (let j = 0; j < children.length; j++) {
          let child = {};
          child.checked = false;
          child.index = j;
          child.value = children[j].name;
          let error_code =
            children[j].status === true ? '' : children[j].status.error_code;
          child.errorMessage =
            children[j].status === true
              ? ''
              : this.props.intl.formatMessage(messages[error_code]);
          processedData.push(child);
        }
      }
    }
    return processedData;
  }

  _validateSKU(type) {
    var _this = this;
    let validSKUData = {
      audit_param_name: this.auditNameSKU.value,
      audit_param_type: 'sku'
    };
    let arrSKU = this.state.copyPasteSKU.data.slice(0);
    let selectedSKUList = JSON.parse(
      JSON.stringify(this.state.selectedSKUList)
    );
    let auditParamValue = [];
    let sendRequest = false;

    if (
      this.props.auditId &&
      type !== 'validate' &&
      this.props.param !== 'duplicate'
    ) {
      validSKUData.audit_id = this.props.auditId;
      validSKUData.action =
        type === 'create' || type === 'confirm' ? 'edit' : '';
      validSKUData.audit_creator_name =
        type === 'create' || type === 'confirm' ? this.props.username : '';
      validSKUData.kq = this.kqCheck.checked;
    }
    if (this.props.param == 'duplicate' && type !== 'validate') {
      validSKUData.action = 'duplicate';
      validSKUData.audit_creator_name = this.props.username;
      validSKUData.kq = this.kqCheck.checked;
    }

    if (type === 'validate') {
      validSKUData.audit_param_value = {};
      for (let i = 0, len = arrSKU.length; i < len; i++) {
        auditParamValue.push(arrSKU[i].value.trim());
      }
      validSKUData.audit_param_value = auditParamValue;
      sendRequest = true;
    } else if (
      type === 'confirm' ||
      type === 'create' ||
      type === 'duplicate'
    ) {
      let selectedAttributeCount = Object.keys(selectedSKUList).length;
      let isAttributeSelected = arrSKU.length === selectedAttributeCount;
      if (!isAttributeSelected && (type === 'create' || type === 'duplicate')) {
        this._invokeAlert({
          validateSKU: this._validateSKU,
          noneSelected: !selectedAttributeCount ? true : false,
          totalSKUCount: arrSKU.length,
          missingSKUCount: arrSKU.length - selectedAttributeCount
        });
      } else {
        validSKUData.audit_param_value = {};
        validSKUData.audit_param_value.attributes_list = [];

        let { selectedSKUList } = this.state;
        let skuList = this.state.copyPasteSKU.data;
        for (let i = 0, len = skuList.length; i < len; i++) {
          if (selectedSKUList[skuList[i].value]) {
            validSKUData.audit_param_value.attributes_list.push(
              selectedSKUList[skuList[i].value]
            );
          } else {
            let noAttributeSKU = {};
            noAttributeSKU.sku = skuList[i].value;
            noAttributeSKU.attributes_sets = [];
            validSKUData.audit_param_value.attributes_list.push(noAttributeSKU);
          }
        }
        sendRequest = true;
        this.props.removeModal();
      }
    }

    this.props.setValidAuditSpinner(true);
    if (sendRequest) {
      let dataToSent;
      dataToSent = {
        sku: {
          audit_id: validSKUData.audit_id,
          audit_param_type: validSKUData.audit_param_type,
          audit_param_name: validSKUData.audit_param_name,
          action: validSKUData.action,
          audit_creator_name: validSKUData.audit_creator_name || 'admin',
          data:
            type === 'create' || type === 'duplicate'
              ? JSON.stringify(validSKUData.audit_param_value.attributes_list)
              : JSON.stringify(validSKUData.audit_param_value),
          kq: validSKUData.kq
        }
      };

      this.props.client
        .query({
          query: AUDIT_VALIDATE_QUERY,
          variables: dataToSent,
          fetchPolicy: 'network-only'
        })
        .then(data => {
          var auditEditData = data.data.AuditSKUList
            ? JSON.parse(data.data.AuditSKUList.list)
            : '';
          if (
            validSKUData.action == 'edit' ||
            validSKUData.action == 'duplicate'
          ) {
            AuditParse(auditEditData, validSKUData.action, _this);
          }

          let audit_name = this.auditNameSKU.value;
          if (auditEditData && auditEditData.attributes_list) {
            let processedDataSKU = _this.processValidationDataSKU(
              auditEditData,
              null,
              true,
              audit_name
            );
            var dataToSentToProps = {
              skuAttributes: processedDataSKU,
              hasDataChanged: !_this.props.hasDataChanged,
              skuDataChanged: !_this.props.skuDataChanged,
              auditValidationSpinner: false,
              locationAttributes: null
            };
            _this.props.SetEditDupValidateDetails(dataToSentToProps);
          } else {
            let processedData = _this.processValidationData(
              auditEditData.audit_location_validation_response
            ); //(action.data)
            var dataToSentToProps = {
              locationAttributes: processedData,
              hasDataChanged: !_this.props.hasDataChanged,
              locationDataChanged: !_this.props.locationDataChanged,
              auditValidationSpinner: false
            };
            _this.props.SetEditDupValidateDetails(dataToSentToProps);
          }
        })
        .catch(errors => {
          let code = errors.graphQLErrors[0].code;
          let message = errors.graphQLErrors[0].message;
          ShowError(_this, code);
        });
    }
  }

  _validateLocation(type) {
    var _this = this;
    var action = '';
    let validLocationData, validLocationDataCreateAudit;
    let arrLocation = this.state.copyPasteLocation.data.slice(0);
    let auditParamValue = [];

    for (let i = 0, len = arrLocation.length; i < len; i++) {
      auditParamValue.push(arrLocation[i].value.trim());
    }

    validLocationData = {
      sku: {
        audit_param_name: this.auditNameLoc.value,
        audit_param_type: 'location',
        data: JSON.stringify(auditParamValue)
      }
    };

    if (
      this.props.auditId &&
      this.props.param !== 'duplicate' &&
      type !== 'validate'
    ) {
      validLocationDataCreateAudit = {
        sku: {
          audit_id: this.props.auditId,
          audit_param_name: this.auditNameLoc.value,
          audit_param_type: 'location',
          action: type === 'create' || type === 'confirm' ? 'edit' : '',
          audit_creator_name:
            type === 'create' || type === 'confirm'
              ? this.props.username
              : 'admin',
          kq:
            type === 'create' || type === 'confirm' ? this.kqCheck.checked : '',
          data: JSON.stringify(auditParamValue)
        }
      };
      action = type === 'create' || type === 'confirm' ? 'edit' : '';
    } else if (type !== 'validate') {
      validLocationDataCreateAudit = {
        sku: {
          audit_param_name: this.auditNameLoc.value,
          audit_param_type: 'location',
          action: 'duplicate',
          audit_creator_name: this.props.username || 'admin',
          kq: this.kqCheck.checked,
          data: JSON.stringify(auditParamValue)
        }
      };
      action = 'duplicate';
    } else {
      validLocationDataCreateAudit = {
        sku: {
          audit_param_name: this.auditNameLoc.value,
          audit_param_type: 'location',
          action: 'validate',
          audit_creator_name: this.props.username || 'admin',
          kq: this.kqCheck.checked,
          audit_param_value: JSON.stringify(auditParamValue)
        }
      };
      action = 'validate';
    }

    this.props.setValidAuditSpinner(true);
    const AUDIT_VALIDATE_QUERY = gql`
      query AuditSKUList($sku: dataListParams) {
        AuditSKUList(input: $sku) {
          list
        }
      }
    `;
    if (true) {
      let dataToSent;
      dataToSent =
        type === 'create' || type === 'duplicate'
          ? validLocationDataCreateAudit
          : validLocationData;

      this.props.client
        .query({
          query: AUDIT_VALIDATE_QUERY,
          variables: dataToSent,
          fetchPolicy: 'network-only'
        })
        .then(data => {
          var auditEditData = data.data.AuditSKUList
            ? JSON.parse(data.data.AuditSKUList.list)
            : '';
          var values = {},
            stringInfo = {},
            msg = {};
          if (action == 'edit' || action == 'duplicate') {
            AuditParse(auditEditData, action, _this);
          } else {
            if (auditEditData && auditEditData.attributes_list) {
              let processedDataSKU = _this.processValidationDataSKU(
                auditEditData,
                null,
                true,
                audit_name
              );
              var dataToSentToProps = {
                skuAttributes: processedDataSKU,
                hasDataChanged: !_this.props.hasDataChanged,
                skuDataChanged: !_this.props.skuDataChanged,
                auditValidationSpinner: false,
                locationAttributes: null
              };
              _this.props.SetEditDupValidateDetails(dataToSentToProps);
            } else {
              let processedData = _this.processValidationData(
                auditEditData.audit_location_validation_response
              ); //(action.data)
              var dataToSentToProps = {
                locationAttributes: processedData,
                hasDataChanged: !_this.props.hasDataChanged,
                locationDataChanged: !_this.props.locationDataChanged,
                auditValidationSpinner: false
              };
              _this.props.SetEditDupValidateDetails(dataToSentToProps);
            }
          }
        })
        .catch(errors => {
          let code = errors.graphQLErrors[0].code;
          let message = errors.graphQLErrors[0].message;
          ShowError(_this, code);
        });
    }

    if (type === 'create' || type == 'duplicate') {
      this.props.removeModal();
    }
  }

  _searchDropdownEntries(skuState, processedSkuResponse) {
    if (skuState === VALID_SKU && processedSkuResponse.keys) {
      var key = processedSkuResponse.keys[0]; //not generic need to change in version 2 of pdfa
      var dropdownDataField = { value: '' },
        dropdownData = [];
      var skuAttributes = this.props.skuAttributes.audit_attributes_values[key];
      for (var i = skuAttributes.length - 1; i >= 0; i--) {
        dropdownDataField.value = skuAttributes[i];
        dropdownData.push(dropdownDataField);
        dropdownDataField = { value: '' };
      }
      return dropdownData;
    }
  }
  _searchCallBack(value) {
    value = value.trim().toLowerCase();
    var activeTabIndex = this.state.activeTabIndex;
    var data =
      activeTabIndex === 0
        ? JSON.parse(JSON.stringify(this.state.copyPasteSKU.data))
        : JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
    var filteredList = [];
    if (value !== '') {
      //Traversing the list
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].value.toLowerCase().indexOf(value) > -1) {
          data[i].visible = true;
        } else {
          data[i].visible = false;
        }
      }
      if (activeTabIndex === 0) {
        this.setState({
          copyPasteSKU: {
            data: data,
            focusedEl: '0',
            selectionStart: this.state.copyPasteSKU.selectionStart
          },
          filterApplied: true
        });
      } else {
        this.setState({
          copyPasteLocation: {
            data: data,
            focusedEl: '0',
            selectionStart: this.state.copyPasteLocation.selectionStart
          },
          filterApplied: true
        });
      }
    } else {
      let filteredData = this._resetStateData(data);
      if (activeTabIndex === 0) {
        this.setState({
          filterApplied: false,
          copyPasteSKU: {
            data: filteredData,
            focusedEl: '0',
            selectionStart: this.state.copyPasteSKU.selectionStart
          }
        });
      } else {
        this.setState({
          filterApplied: false,
          copyPasteLocation: {
            data: filteredData,
            focusedEl: '0',
            selectionStart: this.state.copyPasteLocation.selectionStart
          }
        });
      }
    }
  }

  _addNewInput(type) {
    var stateInputList = JSON.parse(
      JSON.stringify(
        type === 'location'
          ? this.state.copyPasteLocation.data
          : this.state.copyPasteSKU.data
      )
    );
    var tuple = {
      checked: false,
      index: stateInputList.length,
      value: '',
      visible: true,
      errorMessage: '',
      manualEntry: true
    };
    stateInputList.push(tuple);
    if (type === 'location') {
      this.setState({
        copyPasteLocation: {
          data: stateInputList,
          focusedEl: (stateInputList.length - 1).toString(),
          selectionStart: this.state.copyPasteLocation.selectionStart
        }
      });
    } else {
      this.setState({
        copyPasteSKU: {
          data: stateInputList,
          focusedEl: (stateInputList.length - 1).toString(),
          selectionStart: this.state.copyPasteSKU.selectionStart
        }
      });
    }
  }
  _updateInput(event, id) {
    var input = event.target.value.trim(),
      selectionStart = event.target.selectionStart,
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
      focusedEl = id ? id.toString() : '0';

    if (inputList.length > 1) {
      for (let i = 0, len = inputList.length; i < len; i++) {
        let tuple = {};
        tuple.checked = false;
        tuple.index = i;
        tuple.visible = true;
        tuple.value = inputList[i];
        tuple.errorMessage = '';
        processedList.push(tuple);
      }
      stateInputList = processedList;
      focusedEl = '0';
    } else {
      let tuple = Object.assign({}, stateInputList[parseInt(id)]);
      tuple.value = input;
      tuple.visible = true;
      stateInputList.splice(id, 1, tuple);
      focusedEl = id.toString();
    }
    if (activeTabIndex !== 0) {
      this.setState({
        copyPasteLocation: {
          data: stateInputList,
          focusedEl,
          selectionStart,
          isInputEmpty: false
        }
      });
    } else {
      this.setState({
        copyPasteSKU: {
          data: stateInputList,
          focusedEl,
          selectionStart,
          isInputEmpty: false
        }
      });
    }
  }

  /*Function to check the location mode selection*/
  _onLocationModeSelection(selection) {
    var curSel = this.state.locationMode;
    if (curSel !== selection) {
      this.setState({
        locationMode: selection,
        validationDone: false,
        validationDoneSKU: false,
        skuAttributes: {},
        locationAttributes: {}
      });
    }
  }

  _onSkuModeSelection(selection) {
    var curSel = this.state.skuMode;
    if (curSel !== selection) {
      this.setState({
        skuMode: selection,
        validationDone: false,
        validationDoneSKU: false,
        skuAttributes: {},
        locationAttributes: {}
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
          focusedEl: '0',
          selectionStart: this.state.copyPasteSKU.selectionStart
        }
      });
    } else {
      this.setState({
        copyPasteLocation: {
          data: selectedTuples,
          focusedEl: '0',
          selectionStart: this.state.copyPasteLocation.selectionStart
        }
      });
    }
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
      if (selection === 'select_all') {
        tuple.checked = true;
        processedData.push(tuple);
      } else if (selection === 'select_all_valid') {
        if (tuple.errorMessage === '') {
          tuple.checked = true;
        } else {
          tuple.checked = false;
        }
        processedData.push(tuple);
      } else if (selection === 'select_all_invalid') {
        if (tuple.errorMessage !== '') {
          tuple.checked = true;
        } else {
          tuple.checked = false;
        }
        processedData.push(tuple);
      } else if (selection === 'deselect_all') {
        tuple.checked = false;
        processedData.push(tuple);
      }
    }
    if (selection === 'deselect_all') {
      filterSelectionState = 'none';
    } else if (selection === 'select_all') {
      filterSelectionState = 'all';
    } else {
      filterSelectionState = 'partial';
    }

    if (activeTabIndex === 0) {
      this.setState({
        copyPasteSKU: {
          data: processedData,
          focusedEl: this.state.copyPasteSKU.focusedEl,
          selectionStart: this.state.copyPasteSKU.selectionStart
        },
        filterSelectionState
      });
    } else {
      this.setState({
        copyPasteLocation: {
          data: processedData,
          focusedEl: this.state.copyPasteLocation.focusedEl,
          selectionStart: this.state.copyPasteLocation.selectionStart
        },
        filterSelectionState
      });
    }
  }
  _dropHandler(evt) {
    evt.preventDefault();
    // If dropped items aren't files, reject them
    var dt = evt.dataTransfer;
    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dt.items.length; i++) {
        if (dt.items[i].kind === 'file') {
          let fileName = dt.items[i].getAsFile();
          this._parseCSVFile(fileName);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < dt.files.length; i++) {
        let fileName = dt.files[i].name;
        this._parseCSVFile(fileName);
      }
    }
  }
  _parseCSVFile(fileObject) {
    var _this = this;
    var textType = /(text.*|vnd.ms-excel)/;
    var fileExt = fileObject.name.substring(
      fileObject.name.lastIndexOf('.'),
      fileObject.name.length
    );
    if (fileObject.type.match(textType) && fileExt === '.csv') {
      var reader = new FileReader();

      reader.onload = function() {
        let data = reader.result.trim().split(/[\s,;\t\n]+/);
        let processedList = [];
        for (let i = 0, len = data.length; i < len; i++) {
          let tuple = {};
          tuple.checked = false;
          tuple.index = i;
          tuple.value = data[i];
          tuple.visible = true;
          tuple.errorMessage = '';
          processedList.push(tuple);
        }

        if (_this.state.activeTabIndex === 1) {
          _this.setState({
            copyPasteLocation: {
              data: processedList,
              focusedEl: '0',
              selectionStart: _this.state.copyPasteLocation.selectionStart
            },
            locationMode: 'location',
            locationAttributes: {},
            validationDone: false,
            csvUploaded: true,
            isValidCsv: true
          });
        } else {
          _this.setState({
            copyPasteSKU: {
              data: processedList,
              focusedEl: '0',
              selectionStart: _this.state.copyPasteSKU.selectionStart
            },
            skuMode: 'sku',
            skuAttributes: {},
            validationDoneSKU: false,
            csvUploaded: true,
            isValidCsv: true
          });
        }
      };
      reader.readAsText(fileObject);
    } else {
      _this.setState({ isValidCsv: false });
      console.log('File not supported!');
    }
  }
  _onFileUpload(event) {
    var fileObject = event.target.files[0];
    this._parseCSVFile(fileObject);
  }
  _resetStateData(data) {
    for (let i = 0, len = data.length; i < len; i++) {
      data[i].visible = true;
    }
    return data;
  }
  _onBackClick() {
    var data =
      this.state.activeTabIndex === 0
        ? JSON.parse(JSON.stringify(this.state.copyPasteSKU.data))
        : JSON.parse(JSON.stringify(this.state.copyPasteLocation.data));
    var resetData = this._resetStateData(data);
    if (this.state.activeTabIndex === 0) {
      this.setState({
        validationDoneSKU: false,
        skuAttributes: {},
        copyPasteSKU: {
          data: resetData,
          focusedEl: '0',
          selectionStart: this.state.copyPasteSKU.selectionStart
        },
        validateclicked: false,
        selectedSKUList: {},
        auditSpinner: false
      });
    } else {
      this.setState({
        validationDone: false,
        locationAttributes: {},
        copyPasteLocation: {
          data: resetData,
          focusedEl: '0',
          selectionStart: this.state.copyPasteLocation.selectionStart
        },
        validateclicked: false,
        auditSpinner: false
      });
    }
  }
  _onTabClick(tabIndex) {
    this.setState({
      activeTabIndex: tabIndex,
      locationAttributes: tabIndex === 0 ? {} : this.state.locationAttributes,
      skuAttributes: tabIndex === 1 ? {} : this.state.skuAttributes,
      validationDoneSKU: tabIndex === 1 ? false : this.state.validationDoneSKU,
      validationDone: tabIndex === 1 ? false : this.state.validationDone,
      filterApplied: false,
      copyPasteLocation: {
        data:
          tabIndex === 1
            ? [
                {
                  checked: false,
                  index: 0,
                  value: '',
                  visible: true,
                  errorMessage: ''
                }
              ]
            : this.state.copyPasteLocation.data,
        focusedEl: '0',
        selectionStart: this.state.copyPasteLocation.selectionStart
      },
      copyPasteSKU: {
        data:
          tabIndex === 0
            ? [
                {
                  checked: false,
                  index: 0,
                  value: '',
                  visible: true,
                  errorMessage: ''
                }
              ]
            : this.state.copyPasteSKU.data,
        focusedEl: '0',
        selectionStart: this.state.copyPasteSKU.selectionStart
      }
    });
  }
  _invokeAlert(additionalProps) {
    modal.add(SkuAlerts, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      param: 'edit',
      ...additionalProps // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;)
    });
  }
  _createAudit(type) {
    if (this.state.activeTabIndex === 0) {
      if (type == 'duplicate') this._validateSKU('duplicate');
      else this._validateSKU('create');
    } else {
      if (type == 'duplicate') this._validateLocation('duplicate');
      else this._validateLocation('create');
    }
  }

  render() {
    let self = this;
    var header = '',
      button = '';
    let validSkuMessg = (
      <FormattedMessage
        id='audit.valid.sku'
        description='text for valid sku'
        defaultMessage='SKU confirmed'
      />
    );
    let validLocationMessg = (
      <FormattedMessage
        id='audit.valid.location'
        description='text for valid location'
        defaultMessage='Location valid'
      />
    );
    let invalidSkuMessg = (
      <FormattedMessage
        id='audit.invalid.sku'
        description='text for invalid sku'
        defaultMessage='Please enter correct SKU number'
      />
    );
    let invalidLocationMessg = (
      <FormattedMessage
        id='audit.invalid.location'
        description='text for invalid location'
        defaultMessage='Please enter correct Location number'
      />
    );
    let validSkuNoAtriMessg = (
      <FormattedMessage
        id='audit.noAtrributes.sku'
        description='text for valid sku with no attributed'
        defaultMessage='SKU confirmed but no Box Id found'
      />
    );
    let uploadCsvMessg = (
      <FormattedMessage
        id='audit.uploadcsv.text'
        description='text for upload csv and validate'
        defaultMessage='Upload CSV and validate'
      />
    );
    let selectAttributesMessg = (
      <FormattedMessage
        id='audit.selectattributes.text'
        description='text for select attributes'
        defaultMessage='Select attributes'
      />
    );
    let auditBySkuMessg = (
      <FormattedMessage
        id='audit.auditbysku.text'
        description='text for Enter SKU and validate'
        defaultMessage='Audit by SKU'
      />
    );
    let enterSkuMessg = (
      <FormattedMessage
        id='audit.auditbysku.editEnterSKU'
        description='text for audit by sku'
        defaultMessage='Enter SKU and validate'
      />
    );
    let skuSelectAttributes = (
      <FormattedMessage
        id='audit.auditbysku.selectAttributes'
        description='text for Select Attributes'
        defaultMessage='Select Attributes'
      />
    );
    let auditByLocationMessg = (
      <FormattedMessage
        id='audit.auditbylocation.text'
        description='text for audit by location'
        defaultMessage='Audit by Location'
      />
    );
    let selectAllLabel = (
      <FormattedMessage
        id='Audit.inputCheckbox.selectAllLabel'
        description='audit dropdown option for Select All'
        defaultMessage='Select All'
      />
    );
    let selectAllInvalidLabel = (
      <FormattedMessage
        id='Audit.inputCheckbox.selectAllInvalidLabel'
        description='audit dropdown option for Select All Invalid'
        defaultMessage='Select all invalid'
      />
    );
    let selectAllValidLabel = (
      <FormattedMessage
        id='Audit.inputCheckbox.selectAllValidLabel'
        description='audit dropdown option for Select All valid'
        defaultMessage='Select all valid'
      />
    );

    let deselectAllLabel = (
      <FormattedMessage
        id='Audit.inputCheckbox.deselectAllLabel'
        description='audit dropdown option for Deselecting all'
        defaultMessage='Deselect All'
      />
    );
    let searchSKUPH = this.props.intl.formatMessage(
      messages.searchPlaceholderSKU
    );
    let searchLocPH = this.props.intl.formatMessage(
      messages.searchPlaceholderLocation
    );
    var validateclicked = self.state.validateclicked;
    let {
      validationDone,
      validationDoneSKU,
      activeTabIndex,
      filterApplied
    } = self.state;
    let copyPasteSKU = self.state.copyPasteSKU;
    let copyPasteLocation = self.state.copyPasteLocation;
    let allLocationsValid =
      Object.keys(self.state.locationAttributes).length &&
      !self.state.locationAttributes.totalInvalid
        ? true
        : false;
    let allSKUsValid =
      self.state.skuAttributes && self.state.skuAttributes.totalInvalid === 0
        ? true
        : false;
    let enableCreateAudit;
    if (activeTabIndex === 0) {
      if (validationDoneSKU && allSKUsValid) {
        enableCreateAudit = true;
      } else {
        enableCreateAudit = false;
      }
    } else {
      if (validationDone && allLocationsValid) {
        enableCreateAudit = true;
      } else {
        enableCreateAudit = false;
      }
    }
    const filterOptions = [
      {
        value: 'select_all',
        label: selectAllLabel,
        disabled: false
      },
      {
        value: 'select_all_valid',
        label: selectAllValidLabel,
        disabled: false
      },
      {
        value: 'select_all_invalid',
        label: selectAllInvalidLabel,
        disabled: false
      },
      {
        value: 'deselect_all',
        label: deselectAllLabel,
        disabled: false
      }
    ];

    if (this.props.param == 'edit') {
      header = (
        <div className='gor-usr-add'>
          <FormattedMessage
            id='audit.edit.heading'
            description='Heading for edir audit'
            defaultMessage='Edit audit'
          />
        </div>
      );
      button = (
        <button
          onClick={() => {
            this._createAudit('create');
          }}
          className={
            enableCreateAudit
              ? 'gor-create-audit-btn'
              : 'gor-create-audit-btn disabled'
          }
        >
          <FormattedMessage
            id='audits.edit.password.button'
            description='Text for add audit button'
            defaultMessage='UPDATE'
          />
        </button>
      );
    } else if (this.props.param == 'duplicate') {
      header = (
        <div className='gor-usr-add'>
          <FormattedMessage
            id='audit.createduplicate.heading'
            description='Heading for duplicate audit'
            defaultMessage='Duplicate audit'
          />
        </div>
      );
      button = (
        <button
          onClick={() => {
            this._createAudit('duplicate');
          }}
          className={
            enableCreateAudit
              ? 'gor-create-audit-btn'
              : 'gor-create-audit-btn disabled'
          }
        >
          <FormattedMessage
            id='audits.add.password.button'
            description='Text for add audit button'
            defaultMessage='Create audit'
          />
        </button>
      );
    } else {
      header = (
        <div className='gor-usr-add'>
          <FormattedMessage
            id='audit.add.heading'
            description='Heading for add audit'
            defaultMessage='Create New audit'
          />
        </div>
      );
      button = (
        <button
          onClick={() => {
            this._createAudit('create');
          }}
          className={
            enableCreateAudit
              ? 'gor-create-audit-btn'
              : 'gor-create-audit-btn disabled'
          }
        >
          <FormattedMessage
            id='audits.add.password.button'
            description='Text for add audit button'
            defaultMessage='Create audit'
          />
        </button>
      );
    }

    return (
      <div>
        <div className='gor-modal-content gor-audit-create'>
          <div className='gor-modal-head'>
            {header}
            <span className='close' onClick={this._removeThisModal.bind(this)}>
              ×
            </span>
          </div>
          <div className='gor-modal-body'>
            <div className='gor-audit-form new-audit'>
              <GorTabs
                onTabClick={self._onTabClick.bind(self)}
                defaultActiveTabIndex={this.state.activeTabIndex}
                tabClass={'tabs-audit'}
                internalTab={false}
              >
                <Tab
                  tabName={auditBySkuMessg}
                  iconClassName={'icon-class-0'}
                  linkClassName={'link-class-0'}
                  internalTab={false}
                >
                  <div>
                    <div className='gor-usr-hdsm-audit'>
                      <FormattedMessage
                        id='audit.select.sku.value'
                        description='Name of audit'
                        defaultMessage='Enter audit name:'
                      />
                    </div>
                    <div>
                      <input
                        className='gor-audit-name-wrap'
                        type='text'
                        ref={input => {
                          this.auditNameSKU = input;
                        }}
                        placeholder={self.props.intl.formatMessage(
                          messages.auditnameplaceholder
                        )}
                      />
                    </div>
                    <div className='gor-usr-hdsm-audit'>
                      <FormattedMessage
                        id='audit.select.sku.modeinput'
                        description='Text for sku mode'
                        defaultMessage='Select mode of input:'
                      />
                    </div>

                    <div className='gor-audit-button-wrap'>
                      <button
                        onClick={() => self._onSkuModeSelection('sku')}
                        className={`gor-loc-mode-btn ${
                          self.state.skuMode === 'sku'
                            ? 'active-mode'
                            : 'inactive-mode'
                        }`}
                        type='button'
                      >
                        <FormattedMessage
                          id='audits.enterSKU'
                          description='Button for entering skus'
                          defaultMessage='Enter Sku'
                        />
                      </button>
                      <button
                        onClick={() => self._onSkuModeSelection('sku_csv')}
                        className={`gor-loc-mode-btn ${
                          self.state.skuMode === 'sku_csv'
                            ? 'active-mode'
                            : 'inactive-mode'
                        }`}
                        type='button'
                      >
                        <FormattedMessage
                          id='audits.csvUpload'
                          description='Button for csv upload'
                          defaultMessage='Upload CSV file'
                        />
                      </button>
                    </div>

                    <div
                      className={`sku-mode ${
                        self.state.skuMode === 'sku'
                          ? 'active-mode'
                          : 'inactive-mode'
                      }`}
                    >
                      <GorTabs
                        defaultActiveTabIndex={!validationDoneSKU ? 0 : 1}
                        disabledTabIndex={validationDoneSKU ? 0 : 1}
                        tabClass={'sub-tabs-audit'}
                      >
                        <Tab
                          tabName={
                            <span className={'sub-tab-name'}>
                              <i className={'sub-tab-index'}>1</i>
                              {enterSkuMessg}
                            </span>
                          }
                          iconClassName={'icon-class-0'}
                          linkClassName={'link-class-0'}
                        >
                          {!validationDoneSKU && (
                            <div className='gor-audit-inputlist-wrap'>
                              <div>
                                <div className='gor-sub-head-audit-input'>
                                  <FormattedMessage
                                    id='audit.add.sku.subheading'
                                    description='Subtext for enter sku'
                                    defaultMessage='Use copy and paste if you have muktiple sku numbers'
                                  />
                                </div>
                              </div>
                              <div>
                                {copyPasteSKU.data.map(function(tuple, i) {
                                  let focus =
                                    self.state.copyPasteSKU.focusedEl ===
                                    i.toString()
                                      ? true
                                      : false;
                                  return tuple.visible ? (
                                    <div
                                      className='gor-audit-input-wrap'
                                      key={tuple.value + i}
                                    >
                                      <InputComponent.CopyPaste
                                        className={
                                          'gor-audit-input gor-input-ok'
                                        }
                                        autoFocus={focus}
                                        selectionStart={
                                          self.state.copyPasteSKU.selectionStart
                                        }
                                        updateInput={self._updateInput}
                                        index={i}
                                        value={tuple.value}
                                        placeholder={self.props.intl.formatMessage(
                                          messages.auditinputplaceholder
                                        )}
                                      />
                                    </div>
                                  ) : null;
                                })}
                                <div>
                                  <button
                                    className='gor-audit-addnew-button'
                                    type='button'
                                    onClick={() => this._addNewInput('sku')}
                                  >
                                    <FormattedMessage
                                      id='audits.addAuditSkuCP'
                                      description='Text for adding a location'
                                      defaultMessage='+ Add New'
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Tab>
                        <Tab
                          tabName={
                            <span className={'sub-tab-name'}>
                              <i className={'sub-tab-index'}>2</i>
                              {skuSelectAttributes}
                            </span>
                          }
                          iconClassName={'icon-class-1'}
                          linkClassName={'link-class-1'}
                        >
                          <div className={'gor-global-notification'}>
                            {validationDoneSKU && allSKUsValid ? (
                              <div className={'gor-audit-att-ribbon'}>
                                <div className='gor-sku-validation-btn-wrap'>
                                  <button
                                    onClick={this._onBackClick}
                                    className={'gor-audit-edit-att'}
                                  >
                                    <FormattedMessage
                                      id='audits.editSKUText'
                                      description='Text for editing a location'
                                      defaultMessage='BACK TO EDIT'
                                    />
                                  </button>
                                  <div className='sku-search'>
                                    {' '}
                                    <SearchFilterComponent
                                      animate={true}
                                      callBackDelay={300}
                                      placeHolder={searchSKUPH}
                                      searchCallBack={this._searchCallBack}
                                    />
                                  </div>
                                </div>
                                <div className={'message success'}>
                                  <FormattedMessage
                                    id='audit.skuValidation.success'
                                    description='Audit sku verification success message'
                                    defaultMessage='{valid} out of {total} SKUs valid'
                                    values={{
                                      valid: self.state.skuAttributes.totalValid
                                        ? self.state.skuAttributes.totalValid.toString()
                                        : '0',
                                      total: self.state.skuAttributes.totalSKUs
                                        ? self.state.skuAttributes.totalSKUs.toString()
                                        : '0'
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className='gor-sku-validation-btn-wrap'>
                                  <Filter
                                    options={filterOptions}
                                    checkState={self.state.filterSelectionState}
                                    onSelectHandler={this._onFilterSelection}
                                  />
                                  <span className='gor-delete-outline'>
                                    <span
                                      className={
                                        self.state.filterSelectionState ===
                                        'none'
                                          ? 'gor-delete-location-disabled'
                                          : 'gor-delete-location'
                                      }
                                      onClick={this._deleteTuples}
                                    />
                                  </span>
                                </div>
                                <div className={'message error'}>
                                  <FormattedMessage
                                    id='audit.skuValidation.error'
                                    description='Audit sku verification error message'
                                    defaultMessage='{invalid} Error found out of {total} SKUs, Please rectify or enter valid SKUs'
                                    values={{
                                      invalid: self.state.skuAttributes
                                        .totalInvalid
                                        ? self.state.skuAttributes.totalInvalid.toString()
                                        : '0',
                                      total: self.state.skuAttributes.totalSKUs
                                        ? self.state.skuAttributes.totalSKUs.toString()
                                        : '0'
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          {validationDoneSKU && (
                            <div className='gor-audit-inputlist-wrap'>
                              <div className={'note-message'}>
                                <FormattedMessage
                                  id='audit.skuValidation.note'
                                  description='Audit location verification error message'
                                  defaultMessage='Note: Not setting any attributes will result in auditing the entire SKU with all attributes'
                                />
                              </div>
                              <div>
                                {copyPasteSKU.data.map((tuple, i) => {
                                  var self = this;
                                  let tuples = [],
                                    attributeList = self.state.skuAttributes
                                      .data
                                      ? self.state.skuAttributes.data[i]
                                          .attributeList
                                      : {},
                                    attributeSet = self.state.skuAttributes.data
                                      ? self.state.skuAttributes.outerObj[
                                          tuple.value
                                        ]
                                      : {};
                                  if (tuple.visible) {
                                    tuples.push(
                                      <div
                                        className={
                                          allSKUsValid
                                            ? 'gor-valid-row'
                                            : 'gor-valid-row has-error'
                                        }
                                        key={tuple.value + i}
                                      >
                                        <InputComponent.AfterValidation
                                          className={
                                            'gor-audit-input gor-input-ok'
                                          }
                                          autoFocus={focus}
                                          updateInput={self._updateInput}
                                          index={i}
                                          allRowValid={allSKUsValid}
                                          selectionStart={
                                            self.state.copyPasteSKU
                                              .selectionStart
                                          }
                                          onAttributeCheck={
                                            self._onAttributeCheck
                                          }
                                          checked={tuple.checked}
                                          key={tuple.value}
                                          manualEntry={tuple.manualEntry}
                                          errorMessage={
                                            !allSKUsValid
                                              ? tuple.errorMessage
                                              : ''
                                          }
                                          value={tuple.value}
                                          placeholder={self.props.intl.formatMessage(
                                            messages.auditinputplaceholder
                                          )}
                                        />
                                        {allSKUsValid &&
                                          attributeList.length > 0 && (
                                            <SelectAttributes
                                              messages={
                                                attributeComponentMessages
                                              }
                                              attributeList={attributeList}
                                              prefilledData={attributeSet}
                                              applyCallBack={self._onAttributeSelection.bind(
                                                self
                                              )}
                                              index={i}
                                              usePositionHack={true}
                                            />
                                          )}
                                      </div>
                                    );
                                  }
                                  return tuples;
                                })}

                                {!validationDoneSKU && (
                                  <div>
                                    <button
                                      className='gor-audit-addnew-button'
                                      type='button'
                                      onClick={() => this._addNewInput('sku')}
                                    >
                                      <FormattedMessage
                                        id='audits.addAuditSkuValid'
                                        description='Text for adding a location'
                                        defaultMessage='+ Add New'
                                      />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Tab>
                      </GorTabs>
                      {!allSKUsValid && (
                        <div
                          className={
                            'gor-sku-validation-btn-wrap' +
                            (this.state.auditSpinner
                              ? ' gor-disable-content'
                              : '')
                          }
                        >
                          <button
                            className={'gor-auditValidate-btn'}
                            type='button'
                            onClick={e => this._validateSKU('validate')}
                          >
                            {this.state.auditSpinner ? (
                              <Spinner
                                isLoading={this.state.auditSpinner}
                                utilClassNames={'gor-orange-spinner'}
                              />
                            ) : (
                              <FormattedMessage
                                id='audits.validateSKU'
                                description='Text for validate sku button'
                                defaultMessage='Validate'
                              />
                            )}
                          </button>
                        </div>
                      )}

                      <div />
                    </div>
                    <div
                      className={`location-mode ${
                        self.state.skuMode === 'sku_csv'
                          ? 'active-mode'
                          : 'inactive-mode'
                      }`}
                    >
                      <div>
                        <div className='gor-audit-csvupload-wrap'>
                          {!self.state.isValidCsv ? (
                            <div className='gor-global-notification'>
                              <div className='message error'>
                                <FormattedMessage
                                  id='audit.csvupload.error'
                                  description='Audit location Csv upload error message'
                                  defaultMessage='Error found, Please upload a valid .csv file'
                                />
                              </div>
                            </div>
                          ) : (
                            ''
                          )}

                          <div className='gor-audit-drag-drop-container'>
                            <CSVUpload
                              onDrop={this._dropHandler}
                              onFileUpload={this._onFileUpload}
                            >
                              <div className={'file-drop'}>
                                <div className='gor-file-upload' />
                                <p>
                                  <FormattedMessage
                                    id='audits.draganddrop.text'
                                    description='Text for csv Drag and Drop'
                                    defaultMessage='Drag and drop'
                                  />
                                </p>
                                <h1>
                                  <span className='gor-audit-csvupload-or'>
                                    <FormattedMessage
                                      id='audits.draganddropor.text'
                                      description='Text for or'
                                      defaultMessage='OR'
                                    />
                                  </span>
                                </h1>
                              </div>
                            </CSVUpload>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab
                  tabName={auditByLocationMessg}
                  iconClassName={'icon-class-0'}
                  linkClassName={'link-class-0'}
                  internalTab={false}
                >
                  <div>
                    <div className='gor-usr-hdsm-audit'>
                      <FormattedMessage
                        id='audit.select.sku.value'
                        description='Name of audit'
                        defaultMessage='Enter audit name:'
                      />
                    </div>
                    <input
                      className='gor-audit-name-wrap'
                      type='text'
                      ref={input => {
                        this.auditNameLoc = input;
                      }}
                      placeholder={self.props.intl.formatMessage(
                        messages.auditnameplaceholder
                      )}
                    />

                    <div className='gor-usr-hdsm-audit'>
                      <FormattedMessage
                        id='audit.select.mode'
                        description='Text for location mode'
                        defaultMessage='Select mode of input:'
                      />
                    </div>
                    <div className='gor-audit-button-wrap'>
                      <button
                        onClick={() =>
                          self._onLocationModeSelection('location')
                        }
                        className={`gor-loc-mode-btn ${
                          self.state.locationMode === 'location'
                            ? 'active-mode'
                            : 'inactive-mode'
                        }`}
                        type='button'
                      >
                        <FormattedMessage
                          id='audits.enterLocation'
                          description='Button for entering skus'
                          defaultMessage='Enter Location'
                        />
                      </button>
                      <button
                        onClick={() =>
                          self._onLocationModeSelection('location_csv')
                        }
                        className={`gor-loc-mode-btn ${
                          self.state.locationMode === 'location_csv'
                            ? 'active-mode'
                            : 'inactive-mode'
                        }`}
                        type='button'
                      >
                        <FormattedMessage
                          id='audits.csvUpload'
                          description='Button for csv upload'
                          defaultMessage='Upload CSV file'
                        />
                      </button>
                    </div>

                    <div
                      className={`location-mode ${
                        self.state.locationMode === 'location'
                          ? 'active-mode'
                          : 'inactive-mode'
                      }`}
                    >
                      <div className='gor-usr-hdsm-audit'>
                        <FormattedMessage
                          id='audit.add.location.heading'
                          description='Text for location heading'
                          defaultMessage='Enter Location and validate'
                        />
                      </div>

                      {!validationDone ? (
                        <div className='gor-audit-inputlist-wrap gor-audit-location-wrap'>
                          <div className='gor-sub-head-audit-input'>
                            <FormattedMessage
                              id='audit.add.location.subheading'
                              description='Subtext for enter location'
                              defaultMessage='Use copy and paste if you have multiple MSU and Slot numbers'
                            />
                          </div>

                          {copyPasteLocation.data.map(function(tuple, i) {
                            let focus =
                              self.state.copyPasteLocation.focusedEl ===
                              i.toString()
                                ? true
                                : false;
                            return tuple.visible ? (
                              <div
                                className='gor-audit-input-wrap'
                                key={tuple.value + i}
                              >
                                <InputComponent.CopyPaste
                                  className={'gor-audit-input gor-input-ok'}
                                  autoFocus={focus}
                                  updateInput={self._updateInput}
                                  index={i}
                                  selectionStart={
                                    self.state.copyPasteLocation.selectionStart
                                  }
                                  value={tuple.value}
                                  placeholder={self.props.intl.formatMessage(
                                    messages.auditinputplaceholder
                                  )}
                                />
                              </div>
                            ) : null;
                          })}

                          <div>
                            <button
                              className='gor-audit-addnew-button'
                              type='button'
                              onClick={() => this._addNewInput('location')}
                            >
                              <FormattedMessage
                                id='audits.addAuditLocationCP'
                                description='Text for adding a location'
                                defaultMessage='+ Add New'
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className='gor-audit-inputlist-wrap gor-audit-location-wrap'>
                          <div className={'gor-global-notification'}>
                            {allLocationsValid ? (
                              <div className={'gor-audit-att-ribbon'}>
                                <div className='gor-sku-validation-btn-wrap'>
                                  <button
                                    onClick={this._onBackClick}
                                    className={'gor-audit-edit-att'}
                                  >
                                    <FormattedMessage
                                      id='audits.editLocation'
                                      description='Text for editing a location'
                                      defaultMessage='BACK TO EDIT'
                                    />
                                  </button>
                                </div>
                                <div className={'message success'}>
                                  <FormattedMessage
                                    id='audit.locationValidation.success'
                                    description='Audit location verification success message'
                                    defaultMessage='{valid} out of {total} locations valid'
                                    values={{
                                      valid: self.state.locationAttributes
                                        .totalValid
                                        ? self.state.locationAttributes.totalValid.toString()
                                        : '0',
                                      total: self.state.locationAttributes
                                        .totalLocations
                                        ? self.state.locationAttributes.totalLocations.toString()
                                        : '0'
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className='gor-sku-validation-btn-wrap'>
                                  <Filter
                                    options={filterOptions}
                                    checkState={self.state.filterSelectionState}
                                    onSelectHandler={this._onFilterSelection}
                                  />
                                  <span className='gor-delete-outline'>
                                    <span
                                      className={
                                        self.state.filterSelectionState ===
                                        'none'
                                          ? 'gor-delete-location-disabled'
                                          : 'gor-delete-location'
                                      }
                                      onClick={this._deleteTuples}
                                    />
                                  </span>
                                </div>
                                <div className={'message error'}>
                                  <FormattedMessage
                                    id='audit.locationValidation.error'
                                    description='Audit location verification error message'
                                    defaultMessage='{invalid} Error found out of {total} Locations, Please rectify or enter valid Location'
                                    values={{
                                      invalid: self.state.locationAttributes
                                        .totalInvalid
                                        ? self.state.locationAttributes.totalInvalid.toString()
                                        : '0',
                                      total: self.state.locationAttributes
                                        .totalLocations
                                        ? self.state.locationAttributes.totalLocations.toString()
                                        : '0'
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='gor-sub-head-audit-input'>
                            <FormattedMessage
                              id='audit.locationValidation.subheading'
                              description='Subtext for enter location'
                              defaultMessage='MSU will always supercede and all slots in the MSU will be audited'
                            />
                          </div>
                          {copyPasteLocation.data.map((tuple, i) => {
                            let tuples = [];
                            if (tuple.visible) {
                              tuples.push(
                                <div key={tuple.value + i}>
                                  <InputComponent.AfterValidation
                                    className={'gor-audit-input gor-input-ok'}
                                    autoFocus={focus}
                                    updateInput={self._updateInput}
                                    index={i}
                                    key={tuple.value}
                                    manualEntry={tuple.manualEntry}
                                    allRowValid={allLocationsValid}
                                    onAttributeCheck={self._onAttributeCheck}
                                    checked={tuple.checked}
                                    selectionStart={
                                      self.state.copyPasteLocation
                                        .selectionStart
                                    }
                                    errorMessage={
                                      !allLocationsValid
                                        ? tuple.errorMessage
                                        : ''
                                    }
                                    value={tuple.value}
                                    placeholder={self.props.intl.formatMessage(
                                      messages.auditinputplaceholder
                                    )}
                                  />
                                </div>
                              );
                            }

                            return tuples;
                          })}
                          <div>
                            <button
                              className={
                                !allLocationsValid
                                  ? 'gor-audit-addnew-button'
                                  : 'gor-audit-addnew-button-disabled'
                              }
                              type='button'
                              onClick={() => this._addNewInput('location')}
                            >
                              <FormattedMessage
                                id='audits.locationValidation.addLocation'
                                description='Text for adding a location'
                                defaultMessage='+ Add New'
                              />
                            </button>
                          </div>
                        </div>
                      )}
                      <div className={'gor-sku-validation-btn-wrap'}>
                        <button
                          className={
                            self.state.copyPasteLocation.isInputEmpty ||
                            (validationDone && allLocationsValid)
                              ? 'gor-auditValidate-btn-disabled'
                              : 'gor-auditValidate-btn'
                          }
                          type='button'
                          onClick={e => this._validateLocation('validate')}
                        >
                          <label>
                            {this.state.auditSpinner ? (
                              <div className='gor-orange-spinner' />
                            ) : (
                              <FormattedMessage
                                id='audits.validateSKU'
                                description='Text for validate sku button'
                                defaultMessage='Validate'
                              />
                            )}
                          </label>
                        </button>
                      </div>

                      <div />
                    </div>
                    <div
                      className={`location-mode ${
                        self.state.locationMode === 'location_csv'
                          ? 'active-mode'
                          : 'inactive-mode'
                      }`}
                    >
                      <div>
                        <div className='gor-audit-csvupload-wrap'>
                          {!self.state.isValidCsv ? (
                            <div className='gor-global-notification'>
                              <div className='message error'>
                                <FormattedMessage
                                  id='audit.csvupload.error'
                                  description='Audit location Csv upload error message'
                                  defaultMessage='Error found, Please upload a valid .csv file'
                                />
                              </div>
                            </div>
                          ) : (
                            ''
                          )}

                          <div className='gor-audit-drag-drop-container'>
                            <CSVUpload
                              onDrop={this._dropHandler}
                              onFileUpload={this._onFileUpload}
                            >
                              <div className={'file-drop'}>
                                <div className='gor-file-upload' />
                                <p>
                                  <FormattedMessage
                                    id='audits.draganddrop.text'
                                    description='Text for csv Drag and Drop'
                                    defaultMessage='Drag and drop'
                                  />
                                </p>
                                <h1>
                                  <span className='gor-audit-csvupload-or'>
                                    <FormattedMessage
                                      id='audits.draganddropor.text'
                                      description='Text for or'
                                      defaultMessage='OR'
                                    />
                                  </span>
                                </h1>
                              </div>
                            </CSVUpload>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </GorTabs>

              <div className={'audit-sub-footer'}>
                <section className={'set-kq-wrp'}>
                  <div className={'kq-check-wrp'}>
                    <span>
                      <input
                        type='checkbox'
                        ref={input => {
                          this.kqCheck = input;
                        }}
                      />
                    </span>
                  </div>
                  <div className={'kq-check-label'}>
                    <p className={'kq-check-msg'}>
                      {' '}
                      <FormattedMessage
                        id='audit.kq.label.msg'
                        description='Audit location Csv upload error message'
                        defaultMessage='Show KQ on Butler Operator Interface'
                      />
                    </p>
                    <p className={'kq-check-submsg'}>
                      {' '}
                      <FormattedMessage
                        id='audit.kq.label.submsg'
                        description='Audit location Csv upload error message'
                        defaultMessage='Selecting this will enable key in quantity for this audit task'
                      />
                    </p>
                  </div>
                </section>
              </div>
            </div>
            <div className={'audit-footer'}>{button}</div>
          </div>
        </div>
      </div>
    );
  }
}

EditAudit.PropTypes = {
  skuValidationSpinner: React.PropTypes.boolean,
  locationValidationSpinner: React.PropTypes.boolean,
  locationValidationSpinnerCsv: React.PropTypes.boolean,
  auditType: React.PropTypes.object,
  skuCheck: React.PropTypes.object,
  locCheck: React.PropTypes.object,
  auth_token: React.PropTypes.string,
  skuAttributes: React.PropTypes.object,
  locationAttributes: React.PropTypes.object,
  intl: intlShape.isRequired,
  auditSpinner: React.PropTypes.bool,
  setAuditSpinner: React.PropTypes.func
};

EditAudit.defaultProps = {
  skuValidationSpinner: false,
  locationValidationSpinner: false,
  locationValidationSpinnerCsv: false,
  auditType: {},
  skuCheck: {},
  locCheck: {},
  skuAttributes: {},
  locationAttributes: {},
  hasDataChanged: false,
  skuDataChanged: false,
  auditSpinner: false,
  locationDataChanged: false
};

function mapDispatchToProps(dispatch) {
  return {
    resetForm: function() {
      dispatch(resetForm());
    },
    notifyfeedback: function(data) {
      dispatch(notifyfeedback(data));
    },
    setNotification: function(data) {
      dispatch(setNotification(data));
    },
    notifyFail: function(data) {
      dispatch(notifyFail(data));
    }
  };
}

const clientauditEditDupData = graphql(auditEditDupData, {
  props: data => ({
    auditEditData: data.data.auditEditDupData
      ? JSON.parse(data.data.auditEditDupData.auditEditData)
      : '',
    auditSpinner: data.data.auditEditDupData
      ? data.data.auditEditDupData.auditValidationSpinner
      : '',
    hasDataChanged: data.data.auditEditDupData
      ? data.data.auditEditDupData.hasDataChanged
      : '',
    locationAttributes: data.data.auditEditDupData.locationAttributes
      ? JSON.parse(data.data.auditEditDupData.locationAttributes)
      : {},
    skuDataChanged: data.data.auditEditDupData
      ? data.data.auditEditDupData.skuDataChanged
      : '',
    skuAttributes: data.data.auditEditDupData
      ? JSON.parse(data.data.auditEditDupData.skuAttributes)
      : '',
    locationDataChanged: data.data.auditEditDupData
      ? data.data.auditEditDupData.locationDataChanged
      : ''
  })
});
const clientauditNeedRefreshFlag = graphql(auditNeedRefreshFlag, {
  props: data => ({
    auditRefreshFlag: data.data.auditNeedRefreshFlag
      ? JSON.parse(data.data.auditNeedRefreshFlag.auditRefreshFlag)
      : ''
  })
});

const SET_AUDIT_LIST_REFRESH_STATE = gql`
  mutation setauditListRefresh($auditRefreshFlag: String!) {
    setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
  }
`;
const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
  props: ({ mutate, ownProps }) => ({
    setAuditListRefresh: function(auditRefreshFlag) {
      mutate({ variables: { auditRefreshFlag: auditRefreshFlag } });
    }
  })
});
const SET_EDIT_DUP_DETAILS = gql`
  mutation setEditDupDetails($edit_Dup_Details: String!) {
    setAuditEditDupDetails(edit_Dup_Details: $edit_Dup_Details) @client
  }
`;
const SET_EDIT_DUP_VALIDATE_DETAILS = gql`
  mutation setEditDupValidateDetails($edit_Dup_Validate_Details: String!) {
    setAuditEditDupValidateDetails(
      edit_Dup_Validate_Details: $edit_Dup_Validate_Details
    ) @client
  }
`;
const SET_VALID_AUDIT_SPINNER_STATE = gql`
  mutation setvalidAuditSpinner($validAuditSpinner: String!) {
    setValidAuditSpinnerState(validAuditSpinner: $validAuditSpinner) @client
  }
`;
const setSpinnerState = graphql(SET_VALID_AUDIT_SPINNER_STATE, {
  props: ({ mutate, ownProps }) => ({
    setValidAuditSpinner: function(validAuditSpinner) {
      mutate({ variables: { validAuditSpinner: validAuditSpinner } });
    }
  })
});
const setEditDupDetails = graphql(SET_EDIT_DUP_DETAILS, {
  props: ({ mutate, ownProps }) => ({
    SetEditDupDetails: function(applied) {
      mutate({ variables: { edit_Dup_Details: applied } });
    }
  })
});
const setEditDupValidateDetails = graphql(SET_EDIT_DUP_VALIDATE_DETAILS, {
  props: ({ mutate, ownProps }) => ({
    SetEditDupValidateDetails: function(applied) {
      mutate({ variables: { edit_Dup_Validate_Details: applied } });
    }
  })
});

export default compose(
  withApollo,
  setEditDupDetails,
  setEditDupValidateDetails,
  clientauditEditDupData,
  setSpinnerState,
  clientauditNeedRefreshFlag,
  setAuditListRefreshState
)(
  connect(
    null,
    mapDispatchToProps
  )(injectIntl(EditAudit))
);
