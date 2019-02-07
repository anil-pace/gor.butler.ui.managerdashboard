import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { connect } from "react-redux";
import Tile from "../../components/tile/tile.js";
import GTable from "../../components/gor-table-component/index";
import {
    GTableHeader,
    GTableHeaderCell
} from "../../components/gor-table-component/tableHeader";
import { codeToString } from '../../../src/utilities/codeToString';
import { getFormattedMessages } from '../../../src/utilities/getFormattedMessages';
import { resetForm, notifyfeedback, notifyFail } from '../../actions/validationActions';
import { setNotification } from '../../actions/notificationAction';
import { GTableBody } from "../../components/gor-table-component/tableBody";
import { GTableRow } from "../../components/gor-table-component/tableRow";
import { userRequest } from "../../actions/userActions";
import DotSeparatorContent from "../../components/dotSeparatorContent/dotSeparatorContent";
import {
    WALL_TO_WALL,
} from "../../constants/frontEndConstants";

import AuditAction from "../auditTab/auditAction";
import { graphql, withApollo, compose } from "react-apollo";
import { AuditParse } from '../../../src/utilities/auditResponseParser'
import { ShowError } from '../../../src/utilities/ErrorResponseParser';
import gql from 'graphql-tag';
import { ITEM_SEARCH_PPS_LIST_FETCH_QUERY, ITEM_SEARCH_START_QUERY } from './query/serverQuery';
import { itemSearchClientPPSData } from './query/clientQuery';



class ItemSearchStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAuditPPS: [],
            checkedOtherPPS: [],
            itemSearchId: this.props.itemSearchID,
            visiblePopUp: false,
            type: [{ 'type': "" }],
            items: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    _removeThisModal() {
        this.props.removeModal();
    }

    componentDidMount() {
        //var resultantArr = this._findDisplayidName(this.state.itemSearchId);
    }


    openPopup(e) {
        this.setState({ "visiblePopUp": !this.state.visiblePopUp });
    }
    _findDisplayidName(arrId) {
        var resultantArr = [];
        var dataSet = this.props.auditDetails;
        dataSet.forEach(function (entry) {
            arrId.forEach(function (content) {
                if (content == entry.audit_id) {
                    resultantArr.push({ id: entry.audit_id, dislayID: entry.display_id, name: entry.audit_name, type: entry.audit_type });
                }
            })

        })
        this.setState({ 'type': resultantArr })
        return resultantArr;
    }
    _tableAuditPPSData(itemsData) {
        let tableData = [];
        for (var i = 0; i < itemsData.length; i++) {
            let rowObject = {};
            rowObject.ppsDetails = {
                header: [itemsData[i].pps_id],
                subHeader: [itemsData[i].pps_mode]
            };
            rowObject.assignOperator = itemsData[i].operator_assigned;
            tableData.push(rowObject);
            rowObject = {};
        }
        return tableData;
    }

    _tableotherPPSData(itemsData) {
        let tableData = [];
        for (var i = 0; i < itemsData.length; i++) {
            let rowObject = {};
            rowObject.ppsDetails = {
                header: [itemsData[i].pps_id],
                subHeader: [itemsData[i].pps_mode]
            };
            rowObject.assignOperator = itemsData[i].operator_assigned;
            tableData.push(rowObject);
            rowObject = {};
        }
        return tableData;
    }

    _handlestartaudit(e) {
        var _this = this;
        let allPPSList = this.props.checkedAuditPPSList.concat(
            this.props.checkedOtherPPSList
        );
        let allAuditId =
            this.state.itemSearchId.constructor.name !== "Array"
                ? [this.state.itemSearchId]
                : this.state.itemSearchId;

        e.preventDefault();
        _this.props.client
            .query({
                query: ITEM_SEARCH_START_QUERY,
                variables: {
                    input: {
                        externalServiceRequestId: this.state.itemSearchId,
                        attributes: {
                            ppsIdList: allPPSList
                        }
                    }
                },
                fetchPolicy: 'network-only'
            })
            .then(data => {
                var AuditRequestSubmit = data.data.AuditRequestSubmit ? JSON.parse(data.data.AuditRequestSubmit.list) : ""
                AuditParse(AuditRequestSubmit, 'START_AUDIT', _this)

            });
        this.props.removeModal();
    }

    headerCheckChange(type, e) {
        let ppslist = this.props.ppsList.pps_list;
        let arr = [];
        if (type == "Search") {
            if (e.currentTarget.checked) {
                Object.keys(ppslist).forEach(function (key) {
                    if (ppslist[key].pps_mode == "search") arr.push(ppslist[key].pps_id);
                });
                this.props.setCheckedAuditpps(arr);
            } else {
                this.props.setCheckedAuditpps([]);
            }
        } else {
            if (e.currentTarget.checked) {
                Object.keys(ppslist).forEach(function (key) {
                    if (ppslist[key].pps_mode !== "search") arr.push(ppslist[key].pps_id);
                });
                this.props.setCheckedOtherpps(arr);
            } else {
                this.props.setCheckedOtherpps([]);
            }
        }
    }

    CheckChange(type, e) {
        let arr = [];
        if (type == "Search") {
            arr = JSON.parse(JSON.stringify(this.props.checkedAuditPPSList));
            let a = arr.indexOf(e.currentTarget.id);
            a == -1 ? arr.push(e.currentTarget.id) : arr.splice(a, 1);
            this.props.setCheckedAuditpps(arr);
        } else {
            arr = JSON.parse(JSON.stringify(this.props.checkedOtherPPSList));
            let a = arr.indexOf(e.currentTarget.id);
            a == -1 ? arr.push(e.currentTarget.id) : arr.splice(a, 1);
            this.props.setCheckedOtherpps(arr);
        }
    }

    componentWillUnmount() {
        this.props.setCheckedAuditpps([]);
        this.props.setCheckedOtherpps([]);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.ppsList.pps_list)) {
            let attributeData = nextProps.ppsList.pps_list || [];
            this.setState({ items: attributeData });
            let auditList = [], otherList = [];
            if (this.state.type[0].type == WALL_TO_WALL) {
                for (var i = 0; i < nextProps.ppsList.pps_list.length; i++) {
                    if (nextProps.ppsList.pps_list[i].pps_mode == 'search')
                        auditList.push(nextProps.ppsList.pps_list[i].pps_id);
                    else
                        otherList.push(nextProps.ppsList.pps_list[i].pps_id);
                }
                this.props.setCheckedAuditpps(auditList);
                this.props.setCheckedOtherpps(otherList);
            }
        }

        this.setState({ checkedAuditPPS: nextProps.checkedAuditPPSList });
        this.setState({ checkedOtherPPS: nextProps.checkedOtherPPSList });


    }
    handleChange(input) {
        var updatedList = this.props.ppsList.pps_list;
        let data = input.toLowerCase();
        var queryResult = [];
        Object.keys(updatedList).forEach(function (key) {
            if (
                updatedList[key]["operator_assigned"].toLowerCase().indexOf(data) !=
                -1 ||
                updatedList[key]["pps_mode"].toLowerCase().indexOf(data) != -1
            ) {
                queryResult.push(updatedList[key]);
            }
        });

        this.setState({ items: queryResult });
    }

    render() {
        var dispId_Name = this.state.type;
        let idList = [];
        for (var i = 0; i < dispId_Name.length; i++) {
            idList.push(<div className="auditnameLine">{dispId_Name[i].name + " (" + dispId_Name[i].dislayID + ") "}</div>);
        }

        let me = this;
        let items = this.state.items || [];


        let startAuditHeader = (<FormattedMessage
            id="itemsSearch.starttask.headerstartitemSearch"
            description="Heading for start item search"
            defaultMessage="Start Item Search"
        />);
        let auditModePPS = (
            <FormattedMessage
                id="itemSearch.startItemSearch.itemSearchmodepps"
                description="PPS in search mode"
                defaultMessage="PPS in search mode(s)"
            />
        );
        let otherModePPS = (
            <FormattedMessage
                id="audit.startaudit.othermodepps"
                description="PPS in other mode"
                defaultMessage="PPS in other mode(s)"
            />
        );
        let operatorAssign = (
            <FormattedMessage
                id="audit.startaudit.operatorassign"
                description="Operator"
                defaultMessage="Operator"
            />
        );
        let startButton = (
            <FormattedMessage
                id="audit.startaudit.startButton"
                description="start"
                defaultMessage="START"
            />
        );

        let forAudit = (
            <FormattedMessage
                id="itemSearch.startitemSearch.ForItemSearch"
                description="For item search"
                defaultMessage="For item search"
            />
        );
        let auditlistinfo = (
            <FormattedMessage
                id="audit.startaudit.listauditid"
                description="List of Audits"
                defaultMessage="List of Audits"
            />
        );
        let fortext = (
            <FormattedMessage
                id="audit.startaudit.for"
                description="For"
                defaultMessage="For"
            />
        );
        let view = (
            <FormattedMessage
                id="audit.startaudit.View"
                description="View"
                defaultMessage="View"
            />
        );
        let ppsunavaible = (
            <FormattedMessage
                id="audit.startaudit.ppsunavaible"
                description="PPS not available"
                defaultMessage="PPS Not Available"
            />
        );
        let audit = (
            <FormattedMessage
                id="audit.startaudit.audittext"
                description="audit"
                defaultMessage="audit"
            />
        );

        let checkedAuditPPSCount = this.props.checkedAuditPPSList.length;
        let checkedOtherPPSCount = this.props.checkedOtherPPSList.length;
        let totalAuditPPSCount = 0;
        let totalOtherPPSCount = 0;
        Object.keys(items).forEach(function (key) {
            if (items[key].pps_mode == "search") totalAuditPPSCount++;
            else {
                totalOtherPPSCount++;
            }
        });

        let auditPPS = [],
            otherPPS = [];
        Object.keys(items).map(function (key) {
            if (items[key].pps_mode === "search") {
                auditPPS.push(items[key]);
            } else {
                otherPPS.push(items[key]);
            }
        });
        var tablerowdataAudit = this._tableAuditPPSData(auditPPS);
        var tablerowdataOther = this._tableotherPPSData(otherPPS);

        var tableData = [
            { class: 'auditppscolumn1style' },
            { class: "auditppscolumn2style" },
            { class: "auditppscolumn2style" }
        ];
        var tableDataother = [
            { class: 'otherppscolumn1Style' },
            { class: "otherppscolumn2Style" },
            { class: "otherppscolumn2Style" }
        ];

        return (
            <div>
                <div className="gor-AuditDetails-modal-content">
                    <div className="gor-auditDetails-modal-head">
                        <span className="AuditIDWrapper">
                            {this.props.param == "CHANGE_PPS" ? changePPSHeader : startAuditHeader}
                        </span>

                        <span className="close" onClick={this._removeThisModal.bind(this)}>
                            ×
            </span>
                    </div>

                    <div className="gor-auditDetails-modal-body">
                        {tablerowdataAudit.length == 0 && tablerowdataOther.length == 0 ? <div className="ppsUnavailable">{ppsunavaible}</div> :
                            <div>
                                <div className="content-body">
                                    <span className="left-float">
                                        {this.state.type[0].type == WALL_TO_WALL
                                            ? <div className="auditIdInfo"><span>Wall-to-Wall {audit}</span></div>
                                            : this.state.itemSearchId.length > 1
                                                ? <div className="auditIdInfo">
                                                    <span>
                                                        {fortext}{" "}{" Item Search - " + this.state.itemSearchId}
                                                    </span>

                                                </div>
                                                : <span>{forAudit} {dispId_Name[0].dislayID} {dispId_Name[0].name ? " - " + dispId_Name[0].name : ""}</span>}
                                    </span>

                                    {this.state.visiblePopUp ?

                                        <div className="outerWrapper">
                                            <div className="tooltipHeader">
                                                {auditlistinfo}
                                                <span className="closeTooltip" onClick={this.openPopup.bind(this)}> × </span>
                                            </div>
                                            <div className="tooltipText">
                                                {idList}

                                            </div>
                                        </div>
                                        : ""}

                                </div>

                                {tablerowdataAudit.length > 0 ? (
                                    <GTable options={["table-bordered", "auditStart"]}>
                                        <GTableHeader options={["auditTable"]}>
                                            <GTableHeaderCell key={1} header="Search" className="audittable">
                                                <label className="container" style={{ "margin-left": "10px" }} >{" "}<input type="checkbox" checked={this.props.checkedAuditPPSList.length == 0 ? "" : true} disabled={me.state.type[0].type == WALL_TO_WALL} onChange={me.headerCheckChange.bind(me, "Search")} />
                                                    <span className={totalAuditPPSCount == checkedAuditPPSCount ? "checkmark" : "checkmark1"} />
                                                </label>
                                                <span>
                                                    {tablerowdataAudit.length + " "}
                                                    {auditModePPS}
                                                </span>
                                            </GTableHeaderCell>
                                        </GTableHeader>

                                        <GTableBody data={tablerowdataAudit}>

                                            {tablerowdataAudit ? tablerowdataAudit.map(function (row, idx) {
                                                return (
                                                    <GTableRow
                                                        key={idx}
                                                        index={idx}
                                                        data={tablerowdataAudit}
                                                    >
                                                        {Object.keys(row).map(function (text, index) {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    style={tableData[index].style} className={tableData[index].class ? tableData[index].class + " cell" : "" + "cell"} >
                                                                    {index == 0 ? (
                                                                        <label
                                                                            className="container marginAlign"

                                                                        >
                                                                            {" "}
                                                                            <input
                                                                                type="checkbox"
                                                                                id={
                                                                                    tablerowdataAudit[idx]["ppsDetails"][
                                                                                    "header"
                                                                                    ][0]
                                                                                }
                                                                                checked={
                                                                                    me.state.checkedAuditPPS.indexOf(
                                                                                        tablerowdataAudit[idx][
                                                                                        "ppsDetails"
                                                                                        ]["header"][0]
                                                                                    ) == -1
                                                                                        ? ""
                                                                                        : true
                                                                                }
                                                                                disabled={me.state.type[0].type == WALL_TO_WALL}
                                                                                onChange={me.CheckChange.bind(
                                                                                    me,
                                                                                    "Search"
                                                                                )}
                                                                            />
                                                                            <span className="checkmark" />
                                                                        </label>
                                                                    ) : (
                                                                            ""
                                                                        )}
                                                                    {index == 0 ? (
                                                                        <DotSeparatorContent
                                                                            header={
                                                                                tablerowdataAudit[idx][text]["header"]
                                                                            }
                                                                            subHeader={
                                                                                tablerowdataAudit[idx][text][
                                                                                "subHeader"
                                                                                ]
                                                                            }
                                                                            separator={<div className="dotImage"></div>}
                                                                        />
                                                                    ) : (
                                                                            ""
                                                                        )}
                                                                    {index == 1 ? (
                                                                        <div>
                                                                            {operatorAssign}:{" "}
                                                                            {tablerowdataAudit[idx][text]}
                                                                        </div>
                                                                    ) : (
                                                                            ""
                                                                        )}
                                                                    {index == 2 ? (
                                                                        <DotSeparatorContent
                                                                            header={
                                                                                tablerowdataAudit[idx][text]["header"]
                                                                            }
                                                                            subHeader={
                                                                                tablerowdataAudit[idx][text][
                                                                                "subHeader"
                                                                                ]
                                                                            }
                                                                            headerClassName="viewDetailsSeparatorHeader" subheaderClassName="viewDetailsSeparatorSubHeader"
                                                                            separator={<div className="dotImage"></div>}
                                                                        />
                                                                    ) : (
                                                                            ""
                                                                        )}
                                                                </div>
                                                            );
                                                        })}
                                                    </GTableRow>
                                                );
                                            }) : ""}
                                        </GTableBody>
                                    </GTable>) : ("")}

                                {tablerowdataOther.length > 0 ? (
                                    <GTable options={["table-bordered", "auditOther"]}>
                                        <GTableHeader options={["auditTable"]}>
                                            <GTableHeaderCell
                                                key={1}
                                                header="Search"
                                                className="audittable"
                                            >
                                                <label
                                                    className="container"
                                                    style={{ "margin-left": "10px" }}
                                                >
                                                    {" "}
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            this.props.checkedOtherPPSList.length == 0 ? "" : true
                                                        }
                                                        disabled={me.state.type[0].type == WALL_TO_WALL}
                                                        onChange={me.headerCheckChange.bind(me, "other")}
                                                    />
                                                    <span
                                                        className={
                                                            totalOtherPPSCount == checkedOtherPPSCount
                                                                ? "checkmark"
                                                                : "checkmark1"
                                                        }
                                                    />
                                                </label>
                                                <span>
                                                    {tablerowdataOther.length + " "} {otherModePPS}
                                                </span>
                                            </GTableHeaderCell>
                                        </GTableHeader>

                                        <GTableBody data={tablerowdataOther}>
                                            {tablerowdataOther
                                                ? tablerowdataOther.map(function (row, idx) {
                                                    return (
                                                        <GTableRow
                                                            key={idx}
                                                            index={idx}
                                                            data={tablerowdataOther}
                                                        >
                                                            {Object.keys(row).map(function (text, index) {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        style={tableDataother[index].style}
                                                                        className={tableDataother[index].class ? tableDataother[index].class + " cell" : "" + "cell"}
                                                                    >
                                                                        {index == 0 ? (
                                                                            <label
                                                                                className="container marginAlign"

                                                                            >
                                                                                {" "}
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={
                                                                                        tablerowdataOther[idx]["ppsDetails"][
                                                                                        "header"
                                                                                        ][0]
                                                                                    }
                                                                                    checked={
                                                                                        me.state.checkedOtherPPS.indexOf(
                                                                                            tablerowdataOther[idx][
                                                                                            "ppsDetails"
                                                                                            ]["header"][0]
                                                                                        ) == -1
                                                                                            ? ""
                                                                                            : true
                                                                                    }
                                                                                    onChange={me.CheckChange.bind(
                                                                                        me,
                                                                                        "Other"
                                                                                    )}
                                                                                    disabled={me.state.type[0].type == WALL_TO_WALL}
                                                                                />
                                                                                <span className="checkmark" />
                                                                            </label>
                                                                        ) : (
                                                                                ""
                                                                            )}
                                                                        {index == 0 ? (
                                                                            <DotSeparatorContent
                                                                                header={
                                                                                    tablerowdataOther[idx][text]["header"]
                                                                                }
                                                                                subHeader={
                                                                                    tablerowdataOther[idx][text][
                                                                                    "subHeader"
                                                                                    ]
                                                                                }
                                                                                separator={<div className="dotImage"></div>}
                                                                            />
                                                                        ) : (
                                                                                ""
                                                                            )}
                                                                        {index == 1 ? (
                                                                            <div>
                                                                                {operatorAssign}:{" "}
                                                                                {tablerowdataOther[idx][text]}
                                                                            </div>
                                                                        ) : (
                                                                                ""
                                                                            )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </GTableRow>
                                                    );
                                                })
                                                : ""}
                                        </GTableBody>
                                    </GTable>
                                ) : (
                                        ""
                                    )}
                            </div>

                        }
                    </div>
                    {tablerowdataAudit.length == 0 && tablerowdataOther.length == 0 ? "" :
                        <button
                            className="gor-add-btn gor-listing-button rightMargin"
                            onClick={this._handlestartaudit.bind(this)}
                        >
                            {startButton}
                        </button>
                    }
                </div>
            </div>
        );
    }
}
ItemSearchStart.contextTypes = {
    intl: React.PropTypes.object.isRequired
};


var mapDispatchToProps = function (dispatch) {
    return {
        notifyfeedback: function (data) { dispatch(notifyfeedback(data)) },
        setNotification: function (data) { dispatch(setNotification(data)) },
        notifyFail: function (data) { dispatch(notifyFail(data)) }
    };
};



const SET_CHECKED_AUDIT_PPS = gql`
    mutation setCheckedAuditpps($checkedAuditPPSList: Array!) {
      setCheckedAuditpps(checkedAuditPPSList: $checkedAuditPPSList) @client
    }
`;

const SET_CHECKED_OTHER_PPS = gql`
    mutation setCheckedOtherpps($checkedOtherPPSList: Array!) {
      setCheckedOtherpps(checkedOtherPPSList: $checkedOtherPPSList) @client
    }
`;

const CheckedAuditpps = graphql(SET_CHECKED_AUDIT_PPS, {
    props: ({ mutate, ownProps }) => ({
        setCheckedAuditpps: function (data) {
            mutate({ variables: { checkedAuditPPSList: data } })
        },
    }),
});
const CheckedOtherpps = graphql(SET_CHECKED_OTHER_PPS, {
    props: ({ mutate, ownProps }) => ({
        setCheckedOtherpps: function (data) {
            mutate({ variables: { checkedOtherPPSList: data } })
        },
    }),
});
const SET_AUDIT_LIST_REFRESH_STATE = gql`
    mutation setauditListRefresh($auditRefreshFlag: String!) {
      setAuditListRefreshState(auditRefreshFlag: $auditRefreshFlag) @client
    }
`;
const setAuditListRefreshState = graphql(SET_AUDIT_LIST_REFRESH_STATE, {
    props: ({ mutate, ownProps }) => ({
        setAuditListRefresh: function (auditRefreshFlag) {
            mutate({ variables: { auditRefreshFlag: auditRefreshFlag } })
        },
    }),
});


const withClientData = graphql(itemSearchClientPPSData, {
    props: (data) =>
        ({
            checkedAuditPPSList: data.data.ppsCheckedData ? data.data.ppsCheckedData.checkedAuditPPSList : [],
            checkedOtherPPSList: data.data.ppsCheckedData ? data.data.ppsCheckedData.checkedOtherPPSList : [],
            //auditDetails: data.data.ppsCheckedData ? JSON.parse(data.data.ppsCheckedData.auditDetails) : []
        })
})


const initialQuery = graphql(ITEM_SEARCH_PPS_LIST_FETCH_QUERY, {
    props: function (data) {
        var list = { pps_list: [] }
        if (!data || !data.data.ItemSearchPPSDetails || !data.data.ItemSearchPPSDetails.list) {
            ppsList: list
            return {}
        }
        return {
            ppsList: data.data.ItemSearchPPSDetails.list
        }
    },
    options: ({ match, location }) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
});

export default compose(
    withClientData,
    initialQuery,
    setAuditListRefreshState,
    CheckedAuditpps,
    CheckedOtherpps,
    withApollo)
    (connect(null, mapDispatchToProps)
        (ItemSearchStart));
