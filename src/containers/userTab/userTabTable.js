import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Table, Column, Cell} from 'fixed-data-table';
import DropdownTemp from '../../components/dropdown/dropdownTemp'
import Dimensions from 'react-dimensions';
import {SortHeaderCell,tableRenderer,SortTypes,TextCell,ComponentCell,StatusCell,filterIndex,DataListWrapper,sortData} from '../../components/commonFunctionsDataTable';

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

  handleChange(columnKey,rowIndex) {
    console.log("checked");
    console.log(columnKey)
    console.log(rowIndex)
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

  _showModal(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

  }
  _hideModal(){
      var modal = document.getElementById('myModal');
      modal.style.display = "none";    
  }

  render() {
    var {sortedDataList, colSortDirs,columnWidths} = this.state;
    var columnWidth= (this.props.containerWidth/this.props.itemNumber)
    var checkState = this.handleChange.bind(this);
    return (
      <div>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span>Add new user</span><span className="close" onClick={this._hideModal()}>×</span>
            <p>Some text in the Modal.</p>
            <div className=''>Enter User details</div>
            <div className=''>A User ID will be required to log into the system</div>
          
            <div className=''>User ID</div>
            <input className='field' type="text" id="userid"  ref={node => { this.userId = node }}/>

            <div className=''>First Name</div>
            <input className='field-small' type="text" id="firstname"  ref={node => { this.firstName = node }}/>

            <div className=''>Last Name</div>
            <input className='field-small' type="text" id="lastname"  ref={node => { this.lastName = node }}/>

            <div className=''>Choose a role</div>
            <div className=''>User will be given a specific level of control over the Butler system depending on the designated role</div>


            <div className=''>
              <input type="radio" id="operator"  ref={node => { this.operator = node }} /><span className=''>Operator</span>
              <div className=''>Grant access to the Operator Interface at each Pick Put Station in the Butler system</div>
              <input type="checkbox" id="pick"  ref={node => { this.pick = node }} /><span className=''>Operator</span>
              <input type="checkbox" id="put"  ref={node => { this.put = node }} /><span className=''>Operator</span>
              <input type="checkbox" id="audit"  ref={node => { this.audit = node }} /><span className=''>Operator</span>            
            </div>

            <div className=''>
              <input type="radio" id="supervisor"  ref={node => { this.supervisor = node }} /><span className=''>Supervisor</span>
              <div className=''>Grant access to the Management Interface and Operator Interface for the Butler system</div>
            </div>

            <div className=''>
              <input type="radio" id="manager"  ref={node => { this.manager = node }} /><span className=''>Manager</span>
              <div className=''>Grant access to the Management Interface and Operator Interface to all systems</div>
            </div>

            <div className=''>Create password</div>
            <div className=''>Min of 6 digits will be required for logging into the Operator Interface</div>

            <div className=''>Password</div>
            <input className='field' type="password" id="password1"  ref={node => { this.password1 = node }}/>
            <input className='field' type="password" id="password2"  ref={node => { this.password2 = node }}/>
               <button className="gor-add-btn">Add new user</button>
          
          </div>
        </div>
        
        <div className="gorToolBar">
          <div className="gorToolBarWrap">
            <div className="gorToolBarElements">
              <FormattedMessage id="user.table.heading" description="Heading for users table" 
              defaultMessage ="USERS"/>
            </div>
            <div className="gorToolBarElements">
                <button className="gor-add-btn" onClick={this._showModal()}>Add new user</button>
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
        height={500}
        {...this.props}>
        <Column
          columnKey="name"
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
          cell={  <ComponentCell data={sortedDataList} checkState={checkState}/>}
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
          cell={<StatusCell data={sortedDataList} ></StatusCell>}
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
          columnKey="productivity"
          header={
            <SortHeaderCell >
               <FormattedMessage id="user.table.productivity" description="User productivity" 
              defaultMessage ="PRODUCTIVITY"/>
            </SortHeaderCell>
          }
          cell={<TextCell data={sortedDataList}  />}
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
          width={columnWidth}
        />
      </Table>
      </div>
    );
  }
}
export default Dimensions()(UserDataTable);
