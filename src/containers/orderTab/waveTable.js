import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import Dropdown from '../../components/dropdown/dropdown'
import Dimensions from 'react-dimensions'
import {FormattedMessage} from 'react-intl';
import {FormattedDate, FormattedTime, FormattedRelative, defineMessages} from 'react-intl';
import {
    SortHeaderCell,
    tableRenderer,
    SortTypes,
    TextCell,
    ComponentCell,
    StatusCell,
    filterIndex,
    DataListWrapper,
    sortData,
    ProgressCell
} from '../../components/commonFunctionsDataTable';
import {GOR_STATUS, GOR_STATUS_PRIORITY, GOR_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
import WaveFilter from './waveFilter';


class WavesTable extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.items && this.props.items.length) {
            this._dataList = new tableRenderer(this.props.items.length);
        }
        else {
            this._dataList = new tableRenderer(0);
        }
        this._defaultSortIndexes = [];
        this._dataList.newData = this.props.items || [];
        var size = this._dataList.getSize();
        for (var index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        var columnWidth = (this.props.containerWidth / this.props.itemNumber);
        this.state = {
            sortedDataList: this._dataList,
            colSortDirs: {},
            columnWidths: {
                id: columnWidth,
                status: columnWidth,
                startTime: columnWidth,
                cutOffTime: columnWidth,
                ordersToFulfill: columnWidth,
                progress: columnWidth,
                totalOrders: columnWidth
            },
        };
        this._onSortChange = this._onSortChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if ((nextProps.items && !nextProps.items.length)) {
            return false;
        }
        return true;
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.items && nextProps.items.length) {
            this._dataList = new tableRenderer(nextProps.items.length);
        }
        else {
            this._dataList = new tableRenderer(0);
        }
        this._defaultSortIndexes = [];
        this._dataList.newData = nextProps.items;
        var size = this._dataList.getSize();
        for (var index = 0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        var columnWidth = (nextProps.containerWidth / nextProps.itemNumber)
        this.state = {
            sortedDataList: this._dataList,
            colSortDirs: {},
            columnWidths: {
                id: columnWidth,
                status: columnWidth,
                startTime: columnWidth,
                cutOffTime: columnWidth,
                ordersToFulfill: columnWidth,
                progress: columnWidth,
                totalOrders: columnWidth
            },
        };
        this._onSortChange = this._onSortChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onFilterChange(nextProps.getWaveFilter);

    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }

    _onFilterChange(e) {
        var filterField = ["startTime", "id", "status", "cutOffTime"], newData;
        if (e.target && !e.target.value) {
            this.setState({
                sortedDataList: this._dataList,
            });
        }
        if (e.target && (e.target.value || e.target.value === "")) {
            var captureValue = e.target.value;
            newData = new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList)

            this.setState({
                sortedDataList: newData
            }, function () {
                this.props.setWaveFilter(captureValue);
                if (this.props.items && this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }

        else {
            newData = new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList);
            this.setState({
                sortedDataList: newData
            }, function () {
                if (this.props.items && this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }
    }

    _onSortChange(columnKey, sortDir) {
        if (columnKey === GOR_STATUS) {
            columnKey = GOR_STATUS_PRIORITY;
        }
        var sortIndexes = this._defaultSortIndexes.slice();
        if (this.state.sortedDataList._indexMap) {
            sortIndexes = this.state.sortedDataList._indexMap.slice();
        }
        this.setState({
            sortedDataList: new DataListWrapper(sortData(columnKey, sortDir, sortIndexes, this._dataList), this._dataList),
            colSortDirs: {
                [columnKey]: sortDir,
            },
        });
        this.props.sortHeaderOrder(sortDir);
        this.props.sortHeaderState(columnKey);
    }

    _setFilter() {
        var newState = !this.props.showFilter;
        this.props.setFilter(newState);
    }

  render() {
    var showFilterWave =true;
    let filterHeight = screen.height-190-50;

    var {sortedDataList, colSortDirs,columnWidths} = this.state;  
    var heightRes = 500, totalwave = sortedDataList.getSize(), pendingWave = this.props.waveState.pendingWave, progressWave = this.props.waveState.progressWave, completedWaves = this.props.waveState.completedWaves ;
    var orderRemaining = this.props.waveState.orderRemaining.toLocaleString(), totalOrders = this.props.waveState.totalOrders.toLocaleString(), headerAlert = <div/>;

    if(this.props.containerHeight !== 0) {
      heightRes = this.props.containerHeight;
    }
    if(this.props.waveState.alertNum && this.props.waveState.alertNum !== 0) {
     headerAlert =  <div className="gorToolHeaderEl alertState"> <div className="table-subtab-alert-icon"/> <div className="gor-inline">{this.props.waveState.alertNum} Alerts </div> </div>
    }
    var noData = <div/>;
    if(totalwave === 0 || totalwave === undefined || totalwave === null) {
     noData =  <div className="gor-no-data"> <FormattedMessage id="waves.table.noData" description="No data message for waves table" 
        defaultMessage ="No Waves Found"/>  </div>
     heightRes = GOR_TABLE_HEADER_HEIGHT;
    }
    return (
      <div className="gorTableMainContainer">
      <div className="gor-filter-wrap" style={{'width':this.props.showFilter?'350px':'0px', height:filterHeight}}> 
         <WaveFilter refreshOption={this.props.refreshOption} responseFlag={this.props.responseFlag}/>  
       </div>
      <div className="gorToolBar">
      <div className="gorToolBarWrap">
      <div className="gorToolBarElements">
      <FormattedMessage id="waves.table.heading" description="Heading for waves" 
      defaultMessage ="Waves"/>
      
      </div>
      </div>



  <div className="filterWrapper"> 
        <div className="gorToolBarDropDown">
        <div className="gor-button-wrap">
        <div className="gor-button-sub-status">{this.props.lastUpdatedText} {this.props.lastUpdated} </div>
          
        {showFilterWave?<button className={this.props.waveFilterStatus?"gor-filterBtn-applied":"gor-filterBtn-btn"} onClick={this._setFilter.bind(this)} >
          <div className="gor-manage-task"/>
          <FormattedMessage id="order.table.filterLabel" description="button label for filter"
          defaultMessage ="Filter data"/>
         </button>:""}
       </div>
        </div>     
        </div>


                </div>

                {/*Filter Summary*/}
                {this.props.isFilterApplied && !this.props.responseFlag ? <div className="gor-filter-search-result-bar">
                    <FormattedMessage id="waveList.filter.search.bar" description='total waves for filter search bar'
                                      defaultMessage='{total} Users found'
                                      values={{total: sortedDataList.getSize() || 0}}/>
                    <span className="gor-filter-search-show-all" onClick={this.props.refreshList}>
                                                            <FormattedMessage id="waveList.filter.search.bar.showall"
                                                                              description="button label for show all"
                                                                              defaultMessage="Show all Waves"/>
                                                          </span>
                </div> : ""}
                <Table
                    rowHeight={50}
                    rowsCount={sortedDataList.getSize()}
                    headerHeight={70}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={heightRes}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.id}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="WavesTable.heading" description='heading for WavesTable'
                                                      defaultMessage='Waves'/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.Totalwaves"
                                                          description='total waves for WavesTable'
                                                          defaultMessage='Total:{totalwave}'
                                                          values={{totalwave: totalwave ? totalwave : '0'}}/>

                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={  <TextCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.id}
                        isResizable={true}
                    />
                    <Column
                        columnKey="status"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.statusPriority}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.status" description="Status for waves"
                                                      defaultMessage="STATUS"/>
                                    <div>
                                        <div>
                                            <div className="statuslogoWrap">
                                                {headerAlert}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<StatusCell data={sortedDataList} statusKey="statusClass"></StatusCell>}
                        fixed={true}
                        width={columnWidths.status}
                        isResizable={true}
                    />
                    <Column
                        columnKey="startTime"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.startTime}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.startTime" description="StartTime for butlerbot"
                                                      defaultMessage="START TIME"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.pending.status"
                                                          description='pending status for WavesTable'
                                                          defaultMessage='{pendingWave} waves pending'
                                                          values={{pendingWave: pendingWave ? pendingWave : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.startTime}
                        isResizable={true}
                    />
                    <Column
                        columnKey="cutOffTime"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.cutOffTime}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.cutOffTime" description="cutOffTime for waves"
                                                      defaultMessage="CUT-OFF TIME"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.progress.status"
                                                          description='progress status for WavesTable'
                                                          defaultMessage='{progressWave} waves in progress'
                                                          values={{progressWave: progressWave ? progressWave : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell style={{textTransform: 'capitalize'}} data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.cutOffTime}
                        isResizable={true}
                    />
                    <Column
                        columnKey="ordersToFulfill"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.ordersToFulfill}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.ordersToFulfill"
                                                      description="orders to fulfill for waves"
                                                      defaultMessage="ORDERS TO FULFILL"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.orderRemaining.status"
                                                          description='orderRemaining status for WavesTable'
                                                          defaultMessage='{orderRemaining} remaining'
                                                          values={{orderRemaining: orderRemaining ? orderRemaining : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.ordersToFulfill}
                        isResizable={true}
                    />
                    <Column
                        columnKey="progress"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.progress}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.progress" description="progress for waves"
                                                      defaultMessage="PROGRESS(%)"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.completed.status"
                                                          description='completed status for WavesTable'
                                                          defaultMessage='{completedWaves} waves completed'
                                                          values={{completedWaves: completedWaves ? completedWaves : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<ProgressCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.progress}
                        isResizable={true}
                    />
                    <Column
                        columnKey="totalOrders"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.totalOrders}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="waves.table.totalOrders" description="totalOrders for waves"
                                                      defaultMessage="TOTAL ORDERS"/>
                                    <div className="gorToolHeaderSubText">
                                        <FormattedMessage id="WavesTable.totalOrders.status"
                                                          description='totalOrders status for WavesTable'
                                                          defaultMessage='{totalOrders} orders'
                                                          values={{totalOrders: totalOrders ? totalOrders : '0'}}/>
                                    </div>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        fixed={true}
                        width={columnWidths.totalOrders}
                        isResizable={true}
                    />
                </Table>
                <div> {noData} </div>
            </div>
        );
    }
}
WavesTable.PropTypes = {
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    sortHeaderState: React.PropTypes.func,
    refreshOption: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    showFilter: React.PropTypes.bool,
    lastUpdated: React.PropTypes.string,
    responseFlag: React.PropTypes.bool,
    setWaveFilter: React.PropTypes.func,
    setFilter: React.PropTypes.func,
    containerHeight: React.PropTypes.number
};
export default Dimensions()(WavesTable);
