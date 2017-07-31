import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
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
    ActionCell
} from '../../components/commonFunctionsDataTable';
import {modal} from 'react-redux-modal';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import {GOR_USER_TABLE_HEADER_HEIGHT} from '../../constants/frontEndConstants';
class UserDataTable extends React.Component {
    constructor(props) {
        super(props);
        this._dataList=new tableRenderer(this.props.items.length);
        this._defaultSortIndexes=[];
        this._dataList.newData=this.props.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        this.state={
            colSortDirs: {},
            sortedDataList: this._dataList
        },
            this._onSortChange=this._onSortChange.bind(this);
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.items  && nextProps.items.length===0) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        this._dataList=new tableRenderer(nextProps.items.length);
        this._defaultSortIndexes=[];
        this._dataList.newData=nextProps.items;
        var size=this._dataList.getSize();
        for (var index=0; index < size; index++) {
            this._defaultSortIndexes.push(index);
        }
        this.state={
            colSortDirs: {},
            sortedDataList: this._dataList,
        },
            this._onSortChange=this._onSortChange.bind(this);
        this._onFilterChange=this._onFilterChange.bind(this);
        this._onColumnResizeEndCallback=this._onColumnResizeEndCallback.bind(this);
        this._onFilterChange(nextProps.getUserFilter);
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths})=> ({
            columnWidths: {
                ...columnWidths,
                [columnKey]: newColumnWidth,
            }
        }));
    }


    _onFilterChange(e) {
        var filterField=["role", "id", "status", "workMode", "location", "logInTime"], newData;

        if (e.target && !e.target.value) {
            this.setState({
                sortedDataList: this._dataList,
            });
        }
        if (e.target && (e.target.value || e.target.value=== "")) {
            var captureValue=e.target.value;
            newData=new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList)

            this.setState({
                sortedDataList: newData
            }, function () {
                this.props.setUserFilter(captureValue);
                if (this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }

        else {
            newData=new DataListWrapper(filterIndex(e, this.state.sortedDataList, filterField), this._dataList);
            this.setState({
                sortedDataList: newData
            }, function () {
                if (this.props.items.length) {
                    this._onSortChange(this.props.currentSortState, this.props.currentHeaderOrder);
                }
            })
        }

    }


    _onSortChange(columnKey, sortDir) {
        var sortIndexes=this._defaultSortIndexes.slice();
        if (this.state.sortedDataList._indexMap) {
            sortIndexes=this.state.sortedDataList._indexMap.slice();
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


    handleEdit(columnKey, rowIndex) {
        let uid, uname, fname, lname, roleName, sortedIndex;
        if (this.state.sortedDataList.newData=== undefined) {
            sortedIndex=this.state.sortedDataList._indexMap[rowIndex];
            uid=this.state.sortedDataList._data.newData[sortedIndex].uid;
            uname=this.state.sortedDataList._data.newData[sortedIndex].userName;
            fname=this.state.sortedDataList._data.newData[sortedIndex].first;
            lname=this.state.sortedDataList._data.newData[sortedIndex].last;
            roleName=this.state.sortedDataList._data.newData[sortedIndex].roleId;
        }

        else {
            uid=this.state.sortedDataList.newData[rowIndex].uid;
            uname=this.state.sortedDataList.newData[rowIndex].userName;
            fname=this.state.sortedDataList.newData[rowIndex].first;
            lname=this.state.sortedDataList.newData[rowIndex].last;
            roleName=this.state.sortedDataList.newData[rowIndex].roleId;
        }

        modal.add(EditUser, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            id: uid,
            roleName: roleName,
            userName: uname,
            first: fname,
            last: lname
        });
    }

    handleDel(columnKey, rowIndex) {
        let id, name, temp, sortedIndex;
        if (this.state.sortedDataList.newData=== undefined) {
            sortedIndex=this.state.sortedDataList._indexMap[rowIndex];
            id=this.state.sortedDataList._data.newData[sortedIndex].uid;
            name=this.state.sortedDataList._data.newData[sortedIndex].id;
        }

        else {
            id=this.state.sortedDataList.newData[rowIndex].uid;
            name=this.state.sortedDataList.newData[rowIndex].id;
        }
        modal.add(DeleteUser, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            id: id,
            name: name
        });

    }

    _setFilter() {
        var newState=!this.props.showFilter;
        this.props.setFilter(newState);
    }


    render() {
        let updateStatusIntl="";
        let filterHeight=screen.height - 190 - 50;
        let {sortedDataList, colSortDirs, columnWidths}=this.state;
        let columnWidth=(this.props.containerWidth / this.props.itemNumber);
        let heightRes=560, rowsCount=sortedDataList.getSize();
        if (this.props.containerHeight !== 0) {
            heightRes=this.props.containerHeight;
        }
        var selEdit=this.handleEdit.bind(this);
        let selDel=this.handleDel.bind(this);
        let containerHeight=this.props.containerHeight;
        let noData=<div/>;
        if (rowsCount=== 0 || rowsCount=== undefined || rowsCount=== null) {
            noData=<div className="gor-no-data"><FormattedMessage id="user.table.noData"
                                                                    description="No data message for user table"
                                                                    defaultMessage="No User Found"/></div>
            containerHeight=GOR_USER_TABLE_HEADER_HEIGHT;
        }
        return (
            <div>
                <Table
                    rowHeight={50}
                    rowsCount={sortedDataList.getSize()}
                    headerHeight={50}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    width={this.props.containerWidth}
                    height={containerHeight}
                    {...this.props}>
                    <Column
                        columnKey="id"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.id}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.usersCount" description="Users Column"
                                                      defaultMessage="{rowsCount} USERS"
                                                      values={{rowsCount: rowsCount ? rowsCount : '0'}}/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={  <TextCell data={sortedDataList}/>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="status"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.status}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.status" description="Users Status"
                                                      defaultMessage="STATUS"/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<StatusCell data={sortedDataList} statusKey="statusClass"></StatusCell>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="role"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.role}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.role" description="User Role"
                                                      defaultMessage="ROLE"/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="workMode"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.workMode}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.workMode" description="User Workmode"
                                                      defaultMessage="WORKMODE"/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="location"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.location}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.location" description="User location"
                                                      defaultMessage="LOCATION"/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="logInTime"
                        header={
                            <SortHeaderCell onSortChange={this._onSortChange}
                                            sortDir={colSortDirs.logInTime}>
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.logInTime" description="User log in time"
                                                      defaultMessage="LOG IN TIME"/>
                                </div>
                            </SortHeaderCell>
                        }
                        cell={<TextCell data={sortedDataList}/>}
                        width={columnWidth}
                    />
                    <Column
                        columnKey="actions"
                        header={
                            <div className="gor-table-header">
                                <div className="gorToolHeaderEl">
                                    <FormattedMessage id="user.table.action" description="action Column"
                                                      defaultMessage="ACTIONS"/>
                                </div>
                            </div>
                        }
                        cell={<ActionCell data={sortedDataList} selEdit={selEdit} selDel={selDel}
                                          mid={this.props.mid}/>}
                        width={columnWidth}
                    />
                </Table>
                <div> {noData} </div>
            </div>
        );
    }
}

UserDataTable.PropTypes={
    items: React.PropTypes.array,
    containerWidth: React.PropTypes.number,
    itemNumber: React.PropTypes.number,
    currentHeaderOrder: React.PropTypes.object,
    sortHeaderState: React.PropTypes.func,
    lastUpdatedText: React.PropTypes.string,
    showFilter: React.PropTypes.bool,
    lastUpdated: React.PropTypes.string,
    setFilter: React.PropTypes.func,
    containerHeight: React.PropTypes.number,
    currentSortState: React.PropTypes.string,
    responseFlag: React.PropTypes.bool,
    userFilterStatus: React.PropTypes.bool

};

export default Dimensions()(UserDataTable);