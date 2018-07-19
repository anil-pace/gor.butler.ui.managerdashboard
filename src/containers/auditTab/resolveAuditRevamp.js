import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import { GET, APP_JSON, AUDIT_RESOLVE_LINES, GOR_BREACHED_LINES, APPROVE_AUDIT, GOR_USER_TABLE_HEADER_HEIGHT, GOR_AUDIT_RESOLVE_MIN_HEIGHT, GOR_AUDIT_RESOLVE_WIDTH, POST, AUDIT_RESOLVE_CONFIRMED, AUDIT_BY_SKU, GOR_AUDIT_STATUS_DATA } from '../../constants/frontEndConstants';
import { AUDIT_URL, PENDING_ORDERLINES, AUDIT_ANAMOLY } from '../../constants/configConstants';
//import AccordionMenu from '../../components/accordian/AccordionMenu';
import DotSeparatorContent from '../../components/dotSeparatorContent/dotSeparatorContent';
import Accordion from '../../components/accordian/accordion';
import Panel from '../../components/accordian/Panel';
import { isArray } from 'util';
const messages = defineMessages({
  raManager: {
    id: "resolveaudit.manager",
    defaultMessage: "Manager:"
  },
  raOperatorAssign: {
    id: "resolveaudit.operatorassign",
    defaultMessage: "Operator assigned:"
  }
});
const receiveMock = [{ "header": { "slot": "001.0.c.01.02", "totalmismatch": [10, 20], "comment": "My comments here", "noofauditline": "2" }, "body": { "IPhone-7-SKU-24323432": { "pdfa": "color:blue|64 GB", "operatorname": "raja dey", "mismatch": [4, 7], "comments": "my commnets", "status": "reject" }, "IPhone-4-SKU-24322212": { "pdfa": "color:blue|16 GB", "operatorname": "Satish", "mismatch": [3, 5], "comments": "satish's commnets", "status": "approve" } } }, { "header": { "slot": "002.0.d.02.04", "totalmismatch": [15, 30], "comment": "My comments here", "noofauditline": "3" }, "body": { "Motorola-SKU-24323432": { "pdfa": "color:Black|16 GB", "operatorname": "Anil kumar", "mismatch": [2, 4], "comments": "anils commnets", "status": "approve" }, "LG-SKU-24342212": { "pdfa": "color:White|32 GB", "operatorname": "Sumit", "mismatch": [1, 3], "comments": "sumit's commnets", "status": "reject" }, "laptop-SKU-24342212": { "pdfa": "color:White|1 TB", "operatorname": "Hemant", "mismatch": [12, 34], "comments": "hemant's commnets", "status": "approve" } } }];
class ResolveAudit extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {


  }
  _removeThisModal() {
    this.props.removeModal();
  }

  componentDidMount() {
    let audit_id = this._findDisplayidName(this.props.auditId);
    let url = AUDIT_URL + "/" + audit_id[0] + PENDING_ORDERLINES;
    let paginationData = {
      'url': url,
      'method': GET,
      'cause': AUDIT_RESOLVE_LINES,
      'token': this.props.auth_token,
      'contentType': APP_JSON
    }
    //   this.props.setResolveAuditSpinner(true);
    //  this.props.getAuditOrderLines(paginationData);  
  }



  _confirmIssues() {

    // since we also need the username for the request generated.
    // hence getting the username from the state and then sending 
    // the same during the request.

    var userName = this.props.username || null;
    var auditConfirmDetail = {
      data: {
        username: userName,
        auditlines: this.state.checkedState
      }
    };

    var url = AUDIT_URL + AUDIT_ANAMOLY;
    let paginationData = {
      'url': url,
      'method': POST,
      'cause': AUDIT_RESOLVE_CONFIRMED,
      'token': this.props.auth_token,
      'contentType': APP_JSON,
      'accept': APP_JSON,
      'formdata': auditConfirmDetail
    }
    this.props.resolveAuditLines(paginationData);

    this._removeThisModal();
  }


  _findDisplayidName(rawString) {
    return rawString.split(',');
  }
  _processDataTile() {
    let tile1Data = {}
    let manager = this.context.intl.formatMessage(messages.raManager);
    let operatorAssign = this.context.intl.formatMessage(messages.raOperatorAssign);
    tile1Data[manager] = "Raja Dey"
    tile1Data[operatorAssign] = "Raja Dey"
    return [tile1Data];
  }


  render() {
    var finalArr = []
    var auditData = this._findDisplayidName(this.props.auditId);
    let tiledata = this._processDataTile();
    let headerData = <div id="raja" className='gor-modal-resolve-bodyRaja' style={{ 'border': '1px solid red', 'width': '50px', 'height': '50px' }}>
      <div className='gor-tabSelectorRaja'>
        <span className="tabsRaja"></span>
        <span className="tabsRaja"></span>
      </div>
    </div>;
    receiveMock.map(function (row, index) {
      var headerObject = "";
      var data = { contentObject: [] };
     
      Object.keys(row).map(function (name, id) {
        if (name == "header") {
          data.headerObject = <div id={id}>
            <DotSeparatorContent header={["SLOT " + row[name].slot]} id={id} />
            <DotSeparatorContent header={[(row[name].totalmismatch).join(' missing out of ')]} />
            <div style={{ 'display': 'inline' }}>{row[name].comment}</div>
            <div style={{ 'display': 'inline' }}>{row[name].noofauditline + " unresoled line"}</div>
          </div>;
        }
        else {
          Object.keys(row[name]).map(function (lineName, id) {
            var obj = <div>
              <DotSeparatorContent header={[Object.keys(row[name])[id]]} subHeader={[row[name][lineName].pdfa]} />
              <DotSeparatorContent header={[row[name][lineName].operatorname]} />
              <DotSeparatorContent header={[[(row[name][lineName].mismatch).join(' missing out of ')]]} />
              <div style={{ 'display': 'inline' }}>{row[name][lineName].comments}</div>
            </div>
            data.contentObject.push(obj);
          })
        }

      })
      finalArr.push(data);
    })


    return (
      <div>
        <div className="gor-modal-content gor-modal-resolve-content">
          <div className='gor-modal-head gor-modal-headResolve'>
            <div className='gor-audit-resolve'>
              <div className="gor-auditResolve-header">
                <div className="resolveHeader">Resolve Audit</div>
                <div className="headerInfo">
                  <FormattedMessage id="auditresolve.header.information" description='missing information for audit'
                    defaultMessage='For Audit {auditName} ({auditId})'
                    values={{ auditId: auditData[1], auditName: auditData[2] }} />
                </div>
              </div>
              <div className="divider"></div>
              <div className="resolveInfoTile">
                <div><span className="infoHeader">Manager:</span><span className="infoHeader infoText">Raja Dey</span></div>
                <div><span className="infoHeader">Operator Assigned:</span><span className="infoHeader infoText">Ram Kumar</span></div>
              </div>
              <span className="close" onClick={this._removeThisModal.bind(this)}>×</span>
            </div>
          </div>
          <div className='gor-modal-resolve-body'>
            <div className='gor-tabSelector'>
              <span className="tabs"></span>
              <span className="tabs"></span>
            </div>
            {
              finalArr.map(function (obj, id) {
                return (
                  <Accordion id="1" title="Accordion 1" header={obj.headerObject}>
                    {
                      (obj.contentObject).map(function (obj1, id1) {
                        return (
                          <Panel title="Panel 1">
                            {obj1}
                          </Panel>
                        )
                      })
                    }
                  </Accordion>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {

  };
}

var mapDispatchToProps = function (dispatch) {
  return {
    // resolveAuditLines: function(data){dispatch(resolveAuditLines(data))},
    // getAuditOrderLines: function(data){dispatch(getAuditOrderLines(data))},
    // setResolveAuditSpinner: function(data){dispatch(setResolveAuditSpinner(data))}
  }
};

ResolveAudit.contextTypes = {
  intl: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(ResolveAudit);