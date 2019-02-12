import React from 'react';
import { graphql, withApollo, compose } from "react-apollo";
import { ITEM_SEARCH_DETAILS_QUERY } from './query/serverQuery';
import Tile from '../../components/tile/tile.js';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import { GTableHeader, GTableHeaderCell, GTableBody, GTableRow } from '../../components/gor-table-component'
import { FormattedMessage, defineMessages } from 'react-intl';
import moment from 'moment';
import 'moment-timezone';

class ItemSearchDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
    this._processedData = this._processedData.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState((state) => {
        return {
          data: nextProps.data.ItemSearchDetailsList.list
        }
      })
    }

  }
  _processedData() {

    let singleLocationTxt = (<FormattedMessage
      id="itemsSearch.singleLocation.singleLocationText"
      description="Text for Single location"
      defaultMessage="Single location"
    />);

    let multiLocationTxt = (<FormattedMessage
      id="itemsSearch.multiLocationTxt.multiLocationText"
      description="Text for Multi location"
      defaultMessage="Multi location"
    />);

    var processedData = {};
    const data = JSON.parse(JSON.stringify(this.state.data));
    const { timeOffset } = this.props;
    let tableData = [];
    const rawListData = data && JSON.parse(data[0].actuals.containers);

    if (data && data.length) {
      processedData.tiledata = [{
        "PPS ID": `PPS ${data[0].attributes.ppsIdList}`,
        "Item Search Type": data[0].attributes.slot_list ?
          data[0].attributes.slot_list.length > 1 ? multiLocationTxt : singleLocationTxt
          : "--"
      },
      {
        "Start Time": moment(data[0].createdOn).tz(timeOffset).format('DD MMM,YYYY') || "--",
        "End Time": data[0].state === "complete" ? moment(data[0].updatedOn).tz(timeOffset).format('DD MMM,YYYY') : "--",
      }
      ]
    }


    if (rawListData && rawListData.length) {
      for (let i = 0, len = rawListData.length; i < len; i++) {
        //let generatedList = {};
        let datum = rawListData[i];

        let datumState = datum.state;
        let datumProducts = datum.products;
        let datumAttributes = datum.containerAttributes;
        // 3rd column manipulation --OPERATOR -- read from actuals->containers[index]->containerAttributes.user_name
        let operatorName = datumAttributes && datumAttributes.user_name;
        // 4th column manipulation --SLOT -- read from actuals->containers[index]->containerAttributes.location
        let slotId = datumAttributes && datumAttributes.location;

        for (let j = 0; j < datumProducts.length; j++) {
          let generatedList = {};
          generatedList.operator = operatorName || "--";
          generatedList.slot = slotId;

          let actualProducts = datumProducts[j];
          let productQuantity = actualProducts.productQuantity;

          // 1st column manipulation --Nr.part  -- read from actuals->containers[index]->products[0]->productAttributes.pdfa_values.product_sku
          let productAttributes = actualProducts ? actualProducts.productAttributes : null;
          let pdfa_values = productAttributes ? productAttributes.pdfa_values : null
          let productSKU = pdfa_values ? pdfa_values.product_sku : null;
          let packageName = productAttributes ? productAttributes.package_name : null;
          generatedList.id = rawListData[i].id;
          generatedList.skuHeader = [productSKU];
          generatedList.skuFooter = [packageName];

          // 5th column manipulation -- ITEMS FOUND STATUS -- read from actuals->containers[index]->products[0].productQuantity
          let itemStatusMessage = "";
          if (datumState === "complete") {
            if (productQuantity > 0) { itemStatusMessage = productQuantity + " item(s) found" }
            else { itemStatusMessage = "No item found" }
          }
          else if (datumState === "excess") {
            if (productQuantity > 0) { itemStatusMessage = productQuantity + " Excess item(s) found" }
            else { itemStatusMessage = "No excess item found" }
          }
          else if (datumState === "missing") {
            if (productQuantity > 0) { itemStatusMessage = productQuantity + " item(s) missing" }
            else { itemStatusMessage = "No missing item found" }
          }
          generatedList.itemStatus = itemStatusMessage;

          tableData.push(generatedList);
        }

      }

    }
    return {
      processedData,
      tableData
    };
  }

  render() {

    const combinedData = this._processedData()
    const data = combinedData.processedData;
    const tableData = combinedData.tableData;
    const dataLen = Object.keys(data).length;

    return (
      <div>
        <div className="gor-modal-content pps-close">
          <div className='gor-modal-head'>
            <div className='gor-usr-add'>{"Search item task - " + this.props.itemSearchId}

            </div>
            <span className="close" onClick={this.props.removeModal}>×</span>
          </div>
          <div className='gor-modal-body gor-AuditDetails-modal-content is-details'>
            <div className='gor-auditDetails-modal-body'>
              <div className="AuditDetailsWrapper">
                <div className="AuditDetailsHeader">
                  <FormattedMessage id="itemsearch.details" description='Heading for audit details' defaultMessage='Basic details' />
                </div>
                <div className="auditDetailsContent">
                  <div className="auditDetailsLeft">
                    <Tile data={dataLen && data.tiledata[0]} />
                    <Tile data={dataLen && data.tiledata[1]} />
                  </div>

                </div>

                <div className="table-container table-bordered table-itemsearch table-item-search-details">
                  <div className="table-head">
                    <div className="table-head-cell" >
                      <p>{tableData.length + " SKUs in this item search task"}</p>
                    </div>
                  </div>
                  {tableData && tableData.length ? tableData.map(function (row, idx) {
                    return (

                      <GTableRow key={row.id} index={idx} data={tableData} >

                        <div className="table-cell" >
                          <DotSeparatorContent header={row.skuHeader} subHeader={null} separator={<div className="dotImage"></div>} />
                        </div>
                        <div className="table-cell" >
                          {"Operator: " + row.operator}
                        </div>
                        <div className="table-cell" >
                          {"Slot: " + row.slot}
                        </div>
                        <div className="table-cell" >
                          <span>{row.itemStatus}</span>
                        </div>

                      </GTableRow>
                    )
                  }) : <div className="gor-Audit-no-data" style={{ 'background-color': 'white', "height": "auto" }}>
                      <div>
                        <FormattedMessage id='itemSearch.notfound' defaultMessage="No records Present" description="No Data to display" />
                      </div>

                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const withQuery = graphql(ITEM_SEARCH_DETAILS_QUERY, {
  props: (data) => (data),
  options: (props) => ({
    variables: {
      "input": {
        "externalServiceRequestId": props.searchId
      }
    },
    fetchPolicy: 'network-only'
  }),
});




export default compose(withQuery, withApollo)(ItemSearchDetails);