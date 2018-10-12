/**
 * Container for Storage Space tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';
import SlotsTable from './SlotsTable';
import { tableRenderer, TextCell, ProgressCell } from '../../components/commonFunctionsDataTable';
import {
    notifySuccess,
    notifyFail,
} from "./../../actions/validationActions";

import {
    REQUEST_REPORT_SUCCESS,
    REQUEST_REPORT_FAILURE
} from "../../constants/messageConstants";
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
        this.state={generateSlotReport:""};
    }

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
                rowObj.slotUtilization = Math.floor(rowData.utilization*100);
                processedData.push(rowObj);
            }
        }
    }
        return processedData;
    }


    generateSlotReport(event){
       this.props.client.query({
        query: GENERATE_SLOT_REPORT_QUERY,
        variables:{input:{requestedBy:this.props.username}}
       }).then(result => {
        console.log(result);
        if(result.data.GenerateSlotLogReport.data==="success"){
            this.props.notifySuccess(REQUEST_REPORT_SUCCESS);
        }
        else{
            this.props.notifyFail(REQUEST_REPORT_FAILURE);
        }
        this.setState({ generateSlotReport: result.data.GenerateSlotLogReport.data })
    })
    }




    render(){
        var data=this._processData(this.props.slotList);

        var filterHeight=screen.height - 190 - 50;
        
        var dataList={
            newData:this._processData(this.props.slotList),
            size:this._processData(this.props.slotList).length
        }
        
        
        if(!this.props.slotList){
            return null;
        }
        
        else {
            
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
                        
                        <SlotsTable data={data} dataList={dataList}/>
                    </div>
                </div>
            </div>
        );

        }



        
    }
};



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

function mapStateToProps(state, ownProps) {
    return {
        username: state.authLogin.username
    };
}


var mapDispatchToProps=function (dispatch) {
    return {
        notifySuccess: function (data) {
            dispatch(notifySuccess(data));
        }
        ,
        notifyFail: function (data) {
            dispatch(notifyFail(data));
        }
    }
};



export default compose(
    withQuery
)(connect(mapStateToProps, mapDispatchToProps)(Dimensions()(injectIntl(withApollo(StorageSpaceTab)))));