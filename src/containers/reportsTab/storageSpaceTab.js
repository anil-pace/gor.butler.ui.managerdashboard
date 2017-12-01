 /**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import { FormattedMessage,FormattedDate,injectIntl,intlShape,defineMessages} from 'react-intl';
import { connect } from 'react-redux';
import {wsOverviewData} from '../../constants/initData.js';
import Dimensions from 'react-dimensions';
import {withRouter} from 'react-router';
import {updateSubscriptionPacket,setWsAction} from '../../actions/socketActions';

//import {applyOLFilterFlag,wsOLSubscribe,wsOLUnSubscribe,setReportsSpinner,flushWSData} from '../../actions/operationsLogsActions';

import GorPaginateV2 from '../../components/gorPaginate/gorPaginateV2';

import Spinner from '../../components/spinner/Spinner';

import {Table, Column,Cell} from 'fixed-data-table';

import {
    tableRenderer,
    TextCell,
    ProgressCell
} from '../../components/commonFunctionsDataTable';

import FilterSummary from '../../components/tableFilter/filterSummary';

import Dropdown from '../../components/gor-dropdown-component/dropdown';

import {STORAGE_SPACE_URL, STORAGE_SPACE_REPORT_DOWNLOAD_URL} from '../../constants/configConstants';
import {makeAjaxCall} from '../../actions/ajaxActions';
import {recieveStorageSpaceData} from '../../actions/storageSpaceActions';
import {STORAGE_SPACE_FETCH, 
        GET,
        DOWNLOAD_REPORT_REQUEST,
        APP_JSON,
        APP_EXCEL,
        DEFAULT_PAGE_SIZE_OL,
        REALTIME
        } from '../../constants/frontEndConstants';

/*Page size dropdown options*/
const pageSizeDDOpt = [ {value: "25", disabled:false,label: <FormattedMessage id="storageSpace.page.twentyfive" description="Page size 25"
                                                          defaultMessage="25"/>},
            {value: "50",  disabled:false,label: <FormattedMessage id="storageSpace.page.fifty" description="Page size 50"
                                                          defaultMessage="50"/>},
            {value: "100",  disabled:false,label: <FormattedMessage id="storageSpace.page.hundred" description="Page size 100"
                                                          defaultMessage="100"/>}];
/*Intl Messages*/
const  messages= defineMessages({
    genRepTooltip: {
        id: 'storageSpace.genRep.tooltip',
        description: 'Tooltip to display Generate button',
        defaultMessage: 'Reports not available for Realtime filter'
    }
})

class StorageSpaceTab extends React.Component{
    constructor(props,context) {
        super(props,context);
        this.state=this._getInitialState();
        this._handlePageChange= this._handlePageChange.bind(this);
        this._requestReportDownload = this._requestReportDownload.bind(this);
        
    }

    _getInitialState(){
        var data=this._processData(this.props.storageSpaceData.slice(0));  // slice(0) simply duplicates an array
        var dataList = new tableRenderer(data.length);
        dataList.newData=data;
        return {
            columnWidths: {
                slotType: this.props.containerWidth * 0.15,
                slotVolume: this.props.containerWidth * 0.1,
                dimension: this.props.containerWidth * 0.13,
                totalSlots: this.props.containerWidth * 0.1,
                emptySlots: this.props.containerWidth * 0.1,
                slotUtilization: this.props.containerWidth * 0.1
            },
            sortOrder:{
                utilization: "ASC"
            },
            dataList:dataList,
            query:this.props.location.query,
            ubSent:false,
            pageSize:this.props.location.query.pageSize || DEFAULT_PAGE_SIZE_OL,
            dataFetchedOnLoad:false,
            plied:Object.keys(this.props.location.query).length ? true :false,
            totalSize:this.props.totalSize || null
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
        let params={
                'url':STORAGE_SPACE_REPORT_DOWNLOAD_URL,
                'method':GET,
                'contentType': APP_EXCEL,
                'cause':DOWNLOAD_REPORT_REQUEST,
                'token': this.props.auth_token,
                'responseType': "arraybuffer",
                'accept': "text/xls"
            }
        this.props.makeAjaxCall(params);
    }

    _handlePageChange(e){
        this.setState({
            pageSize:e.value,
            dataFetchedOnLoad:false
        },function(){
            let _query =  Object.assign({},this.props.location.query);
            _query.pageSize = this.state.pageSize;
            _query.page = _query.page || 1;
            this.props.router.push({pathname: "/reports/storageSpace",query: _query})
        })
    }
    

    render(){
        var {dataList,totalSize,pageSize} = this.state;
        var _this = this;
        var filterHeight=screen.height - 190 - 50;
        var dataSize = dataList.getSize();
        var timePeriod = _this.props.location.query.time_period;
        var noData = !dataSize && timePeriod !== REALTIME;
        var pageSizeDDDisabled = timePeriod === REALTIME ;
        var location = JSON.parse(JSON.stringify(_this.props.location));
        var totalPage = Math.ceil(totalSize / pageSize);

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
                                       <button disabled = {pageSizeDDDisabled} title={this.props.intl.formatMessage(messages.genRepTooltip)} className="gor-rpt-dwnld" onClick={this._requestReportDownload}>
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
                                                          description='SLOT TYPE'
                                                          defaultMessage='slot type'/>
                                        
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
                <div className="gor-ol-paginate-wrap">
                <div className="gor-ol-paginate-left">
                <Dropdown 
                    options={pageSizeDDOpt} 
                    onSelectHandler={(e) => this._handlePageChange(e)}
                    disabled={false} 
                    selectedOption={DEFAULT_PAGE_SIZE_OL}/>
                </div>
                <div className="gor-ol-paginate-right">
                <GorPaginateV2 disabled={false} location={location} currentPage={this.state.query.page||1} totalPage={isNaN(totalPage) ? 1 : totalPage}/>
                </div>
                </div>
            </div>
        );
    }
};

StorageSpaceTab.propTypes = {
    hasDataChanged: React.PropTypes.bool,
    storageSpaceData: React.PropTypes.array
}
StorageSpaceTab.defaultProps = {
    hasDataChanged:false,
    storageSpaceData: []
}

function mapStateToProps(state, ownProps) {
    return {
        auth_token: state.authLogin.auth_token,
        storageSpaceData: state.storageSpaceReducer.storageSpaceData,
        totalSize:state.storageSpaceReducer.totalSize,
        hasDataChanged:state.storageSpaceReducer.hasDataChanged,
    };
}
function mapDispatchToProps(dispatch){
    return {
        makeAjaxCall: function(params){dispatch(makeAjaxCall(params));},
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Dimensions()(withRouter(injectIntl(StorageSpaceTab))));




