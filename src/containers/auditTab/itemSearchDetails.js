import React  from 'react';
import {graphql, withApollo, compose} from "react-apollo";
import {ITEM_SEARCH_DETAILS_QUERY} from './query/serverQuery';
import Tile from '../../components/tile/tile.js';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from '../../components/gor-table-component'
import { FormattedMessage,defineMessages } from 'react-intl';
import moment from 'moment';
import 'moment-timezone';

//let itemSearchId =null
class ItemSearchDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state={
          data:null
        }
        this._processedData = this._processedData.bind(this);
        
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
          this.setState((state)=>{
          return {
            data: nextProps.data.ItemSearchDetailsList.list 
          }
        })
        }
    
  }
  _processedData(){
    var processedData={};
    const data = JSON.parse(JSON.stringify(this.state.data));
    const {timeOffset} = this.props;
    let listData=[];
    const rawListData = data && JSON.parse(data[0].actuals.containers);
    if(data && data.length){
        processedData.tiledata = [{
            "Created By":"--",
            "Operator": "--",
            "Item Search Type": "--"
        },
        {
            "Start Time": moment(data[0].createdOn).tz(timeOffset).format('DD MMM,YYYY') || "--",
            "End Time": "--",
            "Progress": "--"
        },{
            "PPS ID": `PPS ${data[0].attributes.ppsIdList}`,
            "Show KQ":"--",
            "Reminder":"--"
        }
        ]
    }
    if(rawListData && rawListData.length){
        for(let i=0,len = rawListData.length; i<len;i++){
          let generatedList={};
          let datum = rawListData[i];
          //let containers = datum.expectations.containers[0] || null
          let productAttributes = datum ? datum.products[0].productAttributes : null;
          let pdfa_values = productAttributes ? productAttributes.pdfa_values : null
          let sku = pdfa_values ? pdfa_values.product_sku : null;
          generatedList.id = rawListData[i].id;
          generatedList.skuHeader=[sku];
          if(pdfa_values){
            let pdfaValues=[];
            delete pdfa_values.product_sku;
            for(let k in pdfa_values){
              pdfaValues.push(pdfa_values[k])
            }
            generatedList.pdfaHeader=[`${pdfaValues.length} Attributes Selected`];
            generatedList.pdfaSubHeader=pdfaValues;
          }
          generatedList.operator = "--";
          generatedList.slot = datum.containerAttributes && datum.containerAttributes.location;
          generatedList.itemStatus = "--"
          listData.push(generatedList);
        }
        
    }
    return {
      processedData,
      listData
    };
  }

    render() {
       
        const combinedData = this._processedData()
        const data = combinedData.processedData;
        const listData = combinedData.listData;
        const dataLen = Object.keys(data).length;
       // const tablerowdata = [1,2,3,4];
        return (
             <div>
                <div className="gor-modal-content pps-close">
                    <div className='gor-modal-head'>
                        <div className='gor-usr-add'>{"Search item task"}
                           
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
                        <Tile data={dataLen && data.tiledata[0]}/>
                        <Tile data={dataLen && data.tiledata[1]}/>
                        <Tile className="width-auto" data={dataLen && data.tiledata[2]}/>
                        </div>
                        
                     </div>

                     <div className="table-container table-bordered table-itemsearch table-item-search-details">
                     <div className="table-head">
                        <div className="table-head-cell" >
                                  <p>{listData.length+" SKUs in this item search task"}</p>
                                </div>
                     </div>
                            {listData && listData.length ? listData.map(function (row, idx) {
                                return (

                                <GTableRow key={row.id} index={idx} data={listData} >

                                <div className="table-cell" >
                                  <DotSeparatorContent header={row.skuHeader} subHeader={null} separator={<div className="dotImage"></div>} />
                                </div>
                                <div className="table-cell" >
                                  <DotSeparatorContent header={row.pdfaHeader} subHeader={row.pdfaSubHeader} separator={<div className="dotImage"></div>} />
                                </div>
                                
                                <div className="table-cell" >
                                  {"Slot: "+row.slot}
                                </div>
                                <div className="table-cell" >
                                  <span>{row.itemStatus}</span>
                                </div>
                               
                                </GTableRow>
                                )
                              }) :<div className="gor-Audit-no-data" style={{'background-color':'white',"height":"auto"}}>
                                <div>
                                <FormattedMessage id='itemSearch.notfound'  defaultMessage="No records Present" description="No Data to display"/>
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
          "input":{
            "externalServiceRequestId":props.searchId
          }
        },
        fetchPolicy: 'network-only'
    }),
});




export default compose(withQuery,withApollo)(ItemSearchDetails) ;