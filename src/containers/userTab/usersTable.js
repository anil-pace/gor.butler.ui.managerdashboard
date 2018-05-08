/**
 * Created by gaurav.m on 2/27/18.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import Dimensions from 'react-dimensions';
import {modal} from 'react-redux-modal';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import GTable from './../../components/gor-table-component'
import {GTableHeader, GTableHeaderCell, GTableBody, GTableRow} from './../../components/gor-table-component'
class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: [{id: 0, text: "USERS", key: 'full_name', sortable: true,sortDir:"ASC"},
                {id: 1, text: "STATUS", key: 'status', sortable: true},
                {id: 2, text: "ROLE", key: 'role', sortable: true},
                {id: 3, text: "WORKMODE", key: 'role', sortable: true},
                {id: 4, text: "LOG IN TIME", key: 'role', sortable: true},
                {id: 5, text: "LOG IN TIME", key: 'role', sortable: true},
                {id: 6, text: "ACTIONS", key: 'role', sortable: false},
            ],
            userList:props.data
        }

    }

    handleEdit(user) {
        let uid = user.uid;
        let uname = user.userName;
        let fname = user.first;
        let lname = user.last;
        let roleName = user.roleId;


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

    handleDel(user) {
        let uid = user.uid;
        let uname = user.id;
        modal.add(DeleteUser, {
            title: '',
            size: 'large', // large, medium or small,
            closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
            hideCloseButton: true,
            id: uid,
            name: uname
        });

    }

    _onSortChange(header) {
        let updated_header = this.state.header.map(function (hdr) {
            if (header.id === hdr.id) {
                hdr.sortDir = hdr.sortDir === 'asc' ? 'desc' : 'asc'
            } else {
                hdr.sortDir = ''
            }
            return hdr
        })
        let updated_list=this.state.userList.sort(function(a, b){
            if(a[header.key].toLowerCase() < b[header.key].toLowerCase()) return header.sortDir==='asc'?-1:1;
            if(a[header.key].toLowerCase() > b[header.key].toLowerCase()) return header.sortDir==='asc'?1:-1;
            return 0;
        })
        this.setState({header: updated_header,userList:updated_list})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.length!==0){
            this.setState({userList:nextProps.data})
        }
    }

    render() {
        let self = this
        return (
            <div className="users-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell header={self.state.header[0]} onClick={self._onSortChange.bind(self, this.state.header[0])}>
                            <span><FormattedMessage id="user.table.usersCount" description="Users Column"
                                                    defaultMessage="{rowsCount} USERS"
                                                    values={{rowsCount: this.state.userList.length}}/> {}</span>
                        </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[1]} onClick={self._onSortChange.bind(self, this.state.header[1])}>
                        <span><FormattedMessage id="user.table.status" description="Users Status"
                                                defaultMessage="STATUS"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[2]} onClick={self._onSortChange.bind(self, this.state.header[2])}>
                        <span><FormattedMessage id="user.table.role" description="User Role"
                                                defaultMessage="ROLE"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[3]} onClick={self._onSortChange.bind(self, this.state.header[3])}>
                        <span><FormattedMessage id="user.table.workMode" description="User Workmode"
                                                defaultMessage="WORKMODE"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[4]} onClick={self._onSortChange.bind(self, this.state.header[4])}>
                        <span><FormattedMessage id="user.table.location" description="User location"
                                                defaultMessage="LOCATION"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell header={self.state.header[5]} onClick={self._onSortChange.bind(self, this.state.header[5])}>
                        <span><FormattedMessage id="user.table.logInTime" description="User log in time"
                                                defaultMessage="LOG IN TIME"/></span>
                    </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>ACTIONS</span>
                    </GTableHeaderCell>
                    </GTableHeader>

                    <GTableBody data={self.state.userList}>

                        {self.state.userList && self.state.userList.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} data={self.state.userList}>
                                    <div
                                        style={self.state.header[0].width ? {flex: '1 0 ' + self.state.header[0].width + "%"} : {}}
                                        className="cell">
                                        {row.id}
                                    </div>
                                    <div
                                        style={self.state.header[1].width ? {flex: '1 0 ' + self.state.header[1].width + "%"} : {}}
                                        className="cell">
                                        <div className={row.status}>{row.status}</div>
                                    </div>
                                    <div
                                        style={self.state.header[2].width ? {flex: '1 0 ' + self.state.header[2].width + "%"} : {}}
                                        className="cell">
                                        {row.role}
                                    </div>
                                    <div
                                        style={self.state.header[3].width ? {flex: '1 0 ' + self.state.header[3].width + "%"} : {}}
                                        className="cell">
                                        {row.workMode}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.location}
                                    </div>
                                    <div
                                        style={self.state.header[4].width ? {flex: '1 0 ' + self.state.header[4].width + "%"} : {}}
                                        className="cell">
                                        {row.logInTime}
                                    </div>
                                    <div
                                        style={self.state.header[5].width ? {flex: '1 0 ' + self.state.header[5].width + "%"} : {}}
                                        className="cell">
                                        <div className="gor-user-Logo-wrap">
                                             <button onClick={self.handleEdit.bind(self, row)}>
                                                <div className="gor-edit-icon"/>
                                                <span>
                                                    <FormattedMessage id="commonDataTable.edit.button"
                                                                      description='edit button' defaultMessage='Edit'/>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="gor-user-Logo-wrap">

                                            <button onClick={self.handleDel.bind(self,row)}>
                                                <div className="gor-del-icon"/>
                                                <span><FormattedMessage id="commonDataTable.Delete.button"
                                                                        description='Delete button'
                                                                        defaultMessage='Delete'/></span>

                                            </button>
                                        </div>
                                    </div>

                                </GTableRow>
                            )
                        })}
                    </GTableBody>
                </GTable>
            </div>
        );
    }
}

UsersTable.PropTypes = {};

export default Dimensions()(UsersTable);