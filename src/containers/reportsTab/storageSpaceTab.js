/**
 * Container for Storage Space tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';


import Spinner from '../../components/spinner/Spinner';
import Dropdown from '../../components/gor-dropdown-component/dropdown';
import { Table, Column, Cell } from 'fixed-data-table';
import { tableRenderer, TextCell, ProgressCell } from '../../components/commonFunctionsDataTable';


import { STORAGE_SPACE_URL, STORAGE_SPACE_REPORT_DOWNLOAD_URL } from '../../constants/configConstants';
import { STORAGE_SPACE_FETCH, GET, POST, DOWNLOAD_REPORT_REQUEST, APP_JSON} from '../../constants/frontEndConstants';

import { makeAjaxCall } from '../../actions/ajaxActions';
import { setReportsSpinner } from '../../actions/operationsLogsActions';

/*Intl Messages*/
const  messages= defineMessages({
    reportToolTip: {
        id: 'storageSpace.report.tooltip',
        description: 'Tooltip to display Generate button',
        defaultMessage: 'Reports not available for Realtime filter'
    }
})

class StorageSpaceTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state=this._getInitialState();
        this._requestReportDownload = this._requestReportDownload.bind(this);
        
    }

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

    _processData(data){
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
        return processedData;
    }

    componentWillReceiveProps(nextProps) {        
        if(!this.state.dataFetchedOnLoad){
            this.setState({
                dataFetchedOnLoad:true
            },function(){
                this._getStorageSpaceData(nextProps)
            })
        }
        let rawData = nextProps.storageSpaceData.slice(0);
        let data = this._processData(rawData);
        let dataList = new tableRenderer(data.length)
        dataList.newData=data;
        this.setState({
            dataList
        })
    }
    
    
    componentDidMount(){
        this._getStorageSpaceData(this.props);
    }

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

    render(){
        var {dataList} = this.state;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();

        return (
            <div className="gorTesting wrapper gor-storage-space">
                <Spinner isLoading={this.props.reportsSpinner} setSpinner={this.props.setReportsSpinner}/>
                <div className="gorToolBar">
                                <div className="gorToolBarWrap">
                                    <div className="gorToolBarElements">
                                        <FormattedMessage id="storageSpace.table.heading" description="Heading for PPS"
                                                          defaultMessage="Storage space information"/>
                                        
                                    </div>
                                </div>
                                <div className="filterWrapper">
                                    <div className="gorToolBarDropDown">
                                        <div className="gor-button-wrap">
                                           <button title={this.props.intl.formatMessage(messages.reportToolTip)} className="gor-rpt-dwnld" onClick={this._requestReportDownload}>
                                            <FormattedMessage id="storageSpace.table.downloadBtn"
                                            description="button label for download report"
                                            defaultMessage="Generate Report"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                    
                </div>
               
                <Table
                    rowHeight={80}
                    rowsCount={dataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={null}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={dataSize ? document.documentElement.clientHeight * 0.6 : 71}
                    {...this.props}>
                    <Column
                        columnKey="slotType"
                        header={
                                <Cell >
                                    <div className="gorToolHeaderEl">
                                        <FormattedMessage id="storageSpace.table.slotType"
                                                          description='slot type'
                                                          defaultMessage='SLOT TYPE'/>
                                        
                                    </div>
                                </Cell>
                                
                            
                        }
                        cell={<TextCell data={dataList} classKey={"type"} />}
                        fixed={true}
                        width={this.state.columnWidths.slotType}
                        isResizable={true}
                    />
                    <Column
                        columnKey="slotVolume"
                        header={
                            <Cell >

                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.slotVolume" description="slot volume"
                                                      defaultMessage="SLOT VOLUME"/>

                                   
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"volume"}/>}
                        fixed={true}
                        width={this.state.columnWidths.slotVolume}
                        isResizable={true}
                    />
                    <Column
                        columnKey="dimension"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.dimension" description="Dimension"
                                                      defaultMessage="DIMENSION (L*B*H)"/>
                                </div>
                            </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"dimension"}/>}
                        fixed={true}
                        width={this.state.columnWidths.dimension}
                        isResizable={true}
                    />
                    <Column
                        columnKey="totalSlots"
                        
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.totalSlots" description="Status for total slots"
                                                      defaultMessage="TOTAL SLOTS"/>
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"executionId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.totalSlots}
                        isResizable={true}
                    />
                    <Column
                        columnKey="emptySlots"
                        header={
                                <Cell>
                                <div className="gorToolHeaderEl">

                                    <FormattedMessage id="storageSpace.table.emptySlots" description="Status for empty slots"
                                                      defaultMessage="EMPTY SLOTS"/>

                                  
                                </div>
                                </Cell>
                        }
                        cell={<TextCell data={dataList} setClass={"skuId"}/>}
                        fixed={true}
                        width={this.state.columnWidths.emptySlots}
                        isResizable={true}
                    />
                     <Column
                        columnKey="slotUtilization"
                        header={
                            <Cell>
                            <div className="gorToolHeaderEl">
                                <FormattedMessage id="storageSpace.table.slotUtilization" description="Status for PPS"
                                                  defaultMessage="SLOT UTILIZATION"/>
                            </div>
                            </Cell>
                        }
                        

                        cell={<ProgressCell data={dataList} setClass={"destinationId"}> </ProgressCell>}
                        fixed={true}
                        width={this.state.columnWidths.slotUtilization}
                        isResizable={true}
                    />
                </Table>
                {!dataSize ? <div className="gor-no-data"><FormattedMessage id="storageSpace.table.noData"
                                                                    description="No data message for Storage space"
                                                                    defaultMessage="No Data Found"/></div>:""}
            </div>
        );
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

function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        storageSpaceData: state.storageSpaceReducer.storageSpaceData,
        reportsSpinner:state.storageSpaceReducer.reportsSpinner,
        username: state.authLogin.username
    };
}
function mapDispatchToProps(dispatch){
    return {
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params))},
        setReportsSpinner:function(data){dispatch(setReportsSpinner(data))}
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(injectIntl(StorageSpaceTab)));

