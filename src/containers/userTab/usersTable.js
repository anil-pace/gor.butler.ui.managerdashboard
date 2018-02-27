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
            header: [{id: 1, text: "USERS", key: 'full_name', sortable: false},
                {id: 2, text: "STATUS", key: 'status', sortable: false},
                {id: 3, text: "ROLE", key: 'role', sortable: false},
                {id: 4, text: "WORKMODE", key: 'role', sortable: false},
                {id: 5, text: "LOG IN TIME", key: 'role', sortable: false},
                {id: 6, text: "ACTIONS", key: 'role', sortable: false},
            ]
        }

    }

    componentDidMount() {
        this.processUserList()
    }

    processUserList() {

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

    _onSortChange() {

    }

    render() {
        let self = this
        return (
            <div className="users-table">
                <GTable>
                    <GTableHeader>

                        <GTableHeaderCell>
                            <span>{this.props.data.length} USERS</span>
                        </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>STATUS</span>
                    </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>ROLE</span>
                    </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>WORKMODE</span>
                    </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>LOG IN TIME</span>
                    </GTableHeaderCell>
                        <GTableHeaderCell>
                        <span>ACTIONS</span>
                    </GTableHeaderCell>
                    </GTableHeader>

                    <GTableBody data={self.props.data}>

                        {self.props.data && self.props.data.map(function (row, idx) {
                            return (
                                <GTableRow key={idx} index={idx} data={self.props.data}>
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

                                            <button >
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