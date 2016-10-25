import React from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import Dimensions from 'react-dimensions';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData,ActionCell} from '../../components/commonFunctionsDataTable';
import {modal} from 'react-redux-modal';
import CreateAudit from '../createAudit';
import EditUser from './editUser';
import DeleteUser from './deleteUser';

class UserDataTable extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new tableRenderer(this.props.items.length);
    this._defaultSortIndexes = [];
    this._dataList.newData=this.props.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    this.state = {
      sortedDataList: this._dataList,
      },
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
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
    if (!e.target.value) {
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    this.setState({
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList), this._dataList),
    });
  }

  componentWillReceiveProps(nextProps){
    this._dataList = new tableRenderer(nextProps.items.length);
    this._defaultSortIndexes = [];
    this._dataList.newData=nextProps.items;
    var size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }
    this.state = {
      sortedDataList: this._dataList,
      },
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
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
    if (!e.target.value) {
      this.setState({
        sortedDataList: this._dataList,
      });
    }
    this.setState({
      sortedDataList: new DataListWrapper(filterIndex(e,this._dataList), this._dataList),
    });
  }

  

  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    this.setState({
      sortedDataList: new DataListWrapper(sortData(columnKey, sortDir,sortIndexes,this._dataList), this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  } 

  addModal() {
    modal.add(CreateAudit, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true // (optional) if you don't wanna show the top right close button
      //.. all what you put in here you will get access in the modal props ;),
    });
  }
  handleEdit(columnKey,rowIndex) {
    let uid=this.state.sortedDataList.newData[rowIndex].uid,uname=this.state.sortedDataList.newData[rowIndex].userName,fname=this.state.sortedDataList.newData[rowIndex].first,lname=this.state.sortedDataList.newData[rowIndex].last;
    modal.add(EditUser, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      id:uid,
      userName:uname,
      first:fname,
      last:lname
    });

   
  }
  handleDel(columnKey,rowIndex) {
    let id=this.state.sortedDataList.newData[rowIndex].uid,name=this.state.sortedDataList.newData[rowIndex].id;
    modal.add(DeleteUser, {
      title: '',
      size: 'large', // large, medium or small,
      closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
      hideCloseButton: true,
      id:id,
      name:name    });
   
  }
 //  _showModal(){
 // //    this.myModal.style.display = "block";
 //       this.refs.modal.style.display = "block";   
 //  }
 //  _hideModal(){
 // //    this.myModal.style.display = "none";    
 //       this.refs.modal.style.display = "none";   
 
 //  }

  render() {
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    var heightRes = 560;
    if(this.props.containerHeight !== 0) {
      heightRes = this.props.containerHeight;
    }
    var selEdit = this.handleEdit.bind(this);
    var selDel= this.handleDel.bind(this); 
    return (
      <div>
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
              <FormattedMessage id="user.table.heading" description="Heading for users table" 
              defaultMessage ="USERS"/>
            </div>
            <div className="gorToolBarElements">
                <button className="gor-add-btn" onClick={this.addModal.bind(this)}>Add new user</button>
            </div>            
          </div>
          <div className="filterWrapper">  
        <div className="gorFilter">
            <div className="searchbox-magnifying-glass-icon"/>
            <input className="gorInputFilter"
              onChange={this._onFilterChange}
              placeholder="Filter by status">
            </input>
        </div>
        </div>
       </div>
      <Table
        rowHeight={66}
        rowsCount={sortedDataList.getSize()}
        headerHeight={70}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={this.props.containerWidth}
        height={this.props.containerHeight}
        {...this.props}>
        <Column
          columnKey="id"
          header={
            <SortHeaderCell >
              <div className="gorToolHeaderEl">
              <div className="gorToolHeaderEl">
                {sortedDataList.getSize()} 
                <FormattedMessage id="user.table.users" description="Users Column" 
              defaultMessage =" USERS"/> 
              </div>
              <div className="gorToolHeaderSubText"> Total:{sortedDataList.getSize()} </div>
              </div>
            </SortHeaderCell>
          }
          cell={  <TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="status"
          header={
            <SortHeaderCell >
              <div>
              <FormattedMessage id="user.table.status" description="Users Status" 
              defaultMessage ="STATUS"/> 
              </div>
            </SortHeaderCell>
          }
          cell={<StatusCell data={sortedDataList} statusKey="statusClass" ></StatusCell>}
          width={columnWidth}
        />
        <Column
          columnKey="role"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.role" description="User Role" 
              defaultMessage ="ROLE"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="workMode"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.workMode" description="User Workmode" 
              defaultMessage ="WORKMODE"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="location"
          header={
            <SortHeaderCell>
               <FormattedMessage id="user.table.location" description="User location" 
              defaultMessage ="LOCATION"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList} />}
          width={columnWidth}
        />
        <Column
          columnKey="logInTime"
          header={
            <SortHeaderCell >
               <FormattedMessage id="user.table.logInTime" description="User log in time" 
              defaultMessage ="LOG IN TIME"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
          width={columnWidth}
        />
        <Column
          columnKey="actions"
          header={
            <SortHeaderCell >
               ACTIONS
            </SortHeaderCell>
          }
          cell={<ActionCell data={sortedDataList} selEdit={selEdit} selDel={selDel} mid={this.props.mid}/>}
          width={columnWidth}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(UserDataTable);
