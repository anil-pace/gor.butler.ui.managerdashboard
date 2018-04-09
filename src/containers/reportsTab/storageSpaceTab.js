/**
 * Container for Storage Space tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';
import SlotsTable from './SlotsTable'

import Spinner from '../../components/spinner/Spinner';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import { Table, Column, Cell } from 'fixed-data-table';
import { tableRenderer, TextCell, ProgressCell } from '../../components/commonFunctionsDataTable';


import { STORAGE_SPACE_URL, STORAGE_SPACE_REPORT_DOWNLOAD_URL } from '../../constants/configConstants';
import { STORAGE_SPACE_FETCH, GET, POST, DOWNLOAD_REPORT_REQUEST, APP_JSON} from '../../constants/frontEndConstants';

import { makeAjaxCall } from '../../actions/ajaxActions';
import { setReportsSpinner } from '../../actions/operationsLogsActions';
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'

/*Intl Messages*/
const  messages= defineMessages({
    reportToolTip: {
        id: 'storageSpace.report.tooltip',
        description: 'Tooltip to display Generate button',
        defaultMessage: 'Reports not available for Realtime filter'
    }
})


const SLOTS_QUERY = gql`
    query SlotList($input: SlotListParams) {
        SlotList(input:$input){
            list {
                slot_type
                slot_dimensions
                slot_volume
                number_of_slots
                number_of_empty_slots
                utilization

            }
        }
    }
`;


const GENERATE_SLOT_REPORT_QUERY = gql`
    query GenerateSlotLogReport($input: GenerateSlotLogReportParams) {
        GenerateSlotLogReport(input:$input){
           data
        }
    }
`;


class StorageSpaceTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.subscription = null;
        this.linked = false;
        //this.state=this._getInitialState();
        //this._requestReportDownload = this._requestReportDownload.bind(this);
        this.state={generateSlotReport:""};
    }
/*
    _getInitialState(){
        var data=this._processData(this.props.storageSpaceData.slice(0));  // slice(0) simply duplicates an array
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                slotType: this.props.containerWidth * 0.15,
                slotVolume: this.props.containerWidth * 0.13,
                dimension: this.props.containerWidth * 0.13,
                totalSlots: this.props.containerWidth * 0.13,
                emptySlots: this.props.containerWidth * 0.13,
                slotUtilization: this.props.containerWidth * 0.18
            },
            sortOrder:{
                utilization: "ASC"
            },
            dataList:dataList,
            dataFetchedOnLoad:false
        }
    }
*/
    _processData(data){
        if(data){
        var dataLen = data.length;
        var processedData=[];
        if(dataLen){
            for(let i=0 ;i < dataLen ; i++){
                let rowData = data[i];
                let rowObj = {};
                rowObj.slotType =  rowData.slot_type;
                rowObj.slotVolume = rowData.slot_volume + " cc";
                rowObj.dimension = rowData.slot_dimensions+ " cm";
                rowObj.totalSlots = rowData.number_of_slots;
                rowObj.emptySlots = rowData.number_of_empty_slots;
                rowObj.slotUtilization = rowData.utilization;
                processedData.push(rowObj);
            }
        }
    }
        return processedData;
    }

   
    
    
    componentDidMount(){
        //this._getStorageSpaceData(this.props);
    }
/*
    _getStorageSpaceData(props){
        this.props.setReportsSpinner(true);
        let params={
                'url':STORAGE_SPACE_URL,
                'method':GET,
                'contentType':APP_JSON,
                'accept':APP_JSON,
                'cause':STORAGE_SPACE_FETCH,
                'token': this.props.auth_token
            }
        this.props.makeAjaxCall(params);
    }
    */
    /*
    _requestReportDownload(){
        let formData = {
                        "requestedBy": this.props.username
                        }
        let params={
                'url':STORAGE_SPACE_REPORT_DOWNLOAD_URL,
                'method':POST,
                'contentType': APP_JSON,
                'cause':DOWNLOAD_REPORT_REQUEST,
                'token': this.props.auth_token,
                'responseType': "arraybuffer",
                'formdata':formData,
                'accept': APP_JSON
            }
        this.props.makeAjaxCall(params);
    }
*/


    generateSlotReport(event){
       this.props.client.query({
        query: GENERATE_SLOT_REPORT_QUERY,
        variables:{input:{requestedBy:this.props.username}}
       }).then(result => {
        console.log(result);
        this.setState({ generateSlotReport: result.data.GenerateSlotLogReport.data })
    })
    }




    render(){
        var data=this._processData(this.props.slotList);

        //var dataList = new tableRenderer(data.length);
        //dataList.newData=data;
        //var dataSize = dataList.getSize();

        var filterHeight=screen.height - 190 - 50;
        /*
        var dataList={
            newData:this._processData(this.props.slotList),
            size:this._processData(this.props.slotList).length
        }
        var dataSize = dataList.size;
        */
        if(!this.props.slotList){
            return null;
        }
        
        else {
            //return(<div>{JSON.stringify(dataList)}</div>);
            return (
            <div className="gorTesting wrapper gor-storage-space">
                <div>
                    <div>
                    <div className="gorToolBar">
                            <div className="gorToolBarWrap">
                                <div className="gorToolBarElements">
                                    <FormattedMessage id="storageSpace.table.heading" description="Heading for Storage Space"
                                                          defaultMessage="Storage space information"/>
                                </div>
                                
                            </div>

                            <div className="filterWrapper">
                            
                                <div className="gorToolBarDropDown">
                                    <div className="gor-button-wrap">
                                       <button  title={this.props.intl.formatMessage(messages.reportToolTip)} className="gor-rpt-dwnld" onClick={this.generateSlotReport.bind(this)}>
                                        <FormattedMessage id="storageSpace.table.downloadBtn"
                                        description="button label for download report"
                                        defaultMessage="GENERATE REPORT"/>
                                        </button>
                                            
                                    </div>
                                </div>

                            </div>
            


                        </div>
                        
                        <SlotsTable data={data}/>
                    </div>
                </div>
            </div>
        );

        }



        
    }
};

StorageSpaceTab.propTypes = {
    storageSpaceData: React.PropTypes.array,
    reportsSpinner: React.PropTypes.bool
}

StorageSpaceTab.defaultProps = {
    storageSpaceData: [],
    reportsSpinner:true
}
/*
function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        storageSpaceData: state.storageSpaceReducer.storageSpaceData,
        reportsSpinner:state.storageSpaceReducer.reportsSpinner,
        username: state.authLogin.username
    };
}
*/
const withQuery = graphql(SLOTS_QUERY, {
    props: function(data){
        if(!data || !data.data.SlotList || !data.data.SlotList.list){
            return {}
        }
        return {
            slotList: data.data.SlotList.list
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

/*
const withQuery_2 = graphql(GENERATE_SLOT_REPORT_QUERY, {
    props: function(data){
        if(!data || !data.data.GenerateSlotLogReport){
            return {}
        }
        return {
            generateSlotReport: data.data.GenerateSlotLogReport
        }
    },
    options: props => ({
        variables: {requestedBy:props.username},
        fetchPolicy: 'network-only'
    }),
});
*/
function mapStateToProps(state, ownProps) {
    return {
        username: state.authLogin.username
    };
}

/*
function mapDispatchToProps(dispatch){
    return {
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params))},
        setReportsSpinner:function(data){dispatch(setReportsSpinner(data))}
    }
};

*/



export default compose(
    withQuery
)(connect(mapStateToProps)(Dimensions()(injectIntl(withApollo(StorageSpaceTab)))));
