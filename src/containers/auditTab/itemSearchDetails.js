import React  from 'react';
import {graphql, withApollo, compose} from "react-apollo";
import {ITEM_SEARCH_DETAILS_QUERY} from './query/serverQuery';
import Tile from '../../components/tile/tile.js';
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
    const {timeOffset} = this.props
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
    return processedData;
  }

    render() {
       
        const data = this._processedData();
        const dataLen = Object.keys(data).length;
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
    options: ({match, location}) => ({
        variables: {
          "input":{
            "externalServiceRequestId":"Search-order39dec"
          }
        },
        fetchPolicy: 'network-only'
    }),
});




export default compose(withQuery,withApollo)(ItemSearchDetails) ;