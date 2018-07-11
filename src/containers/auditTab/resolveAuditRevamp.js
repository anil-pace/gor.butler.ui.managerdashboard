import React  from 'react';
import { FormattedMessage,defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import Tile from '../../components/tile/tile.js';
import {GET,APP_JSON,AUDIT_RESOLVE_LINES,GOR_BREACHED_LINES,APPROVE_AUDIT,GOR_USER_TABLE_HEADER_HEIGHT,GOR_AUDIT_RESOLVE_MIN_HEIGHT,GOR_AUDIT_RESOLVE_WIDTH, POST, AUDIT_RESOLVE_CONFIRMED,AUDIT_BY_SKU,GOR_AUDIT_STATUS_DATA} from '../../constants/frontEndConstants';
import {AUDIT_URL, PENDING_ORDERLINES, AUDIT_ANAMOLY} from '../../constants/configConstants';
import AccordionMenu from '../../components/accordian/AccordionMenu';
import Accordion from '../../components/accordian/Accordion';
import Panel from '../../components/accordian/Panel';
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
class ResolveAudit extends React.Component{
  constructor(props) 
  {
      super(props); 
      
  }

  componentWillReceiveProps(nextProps){

     
  }
  _removeThisModal() {
    this.props.removeModal();
  }

  componentDidMount() {
   let audit_id= this._findDisplayidName(this.props.auditId);
        let url=AUDIT_URL + "/" + audit_id[0] + PENDING_ORDERLINES; 
        let paginationData={
         'url':url,
         'method':GET,
         'cause': AUDIT_RESOLVE_LINES,
         'token': this.props.auth_token,
         'contentType':APP_JSON
        } 
      //   this.props.setResolveAuditSpinner(true);
      //  this.props.getAuditOrderLines(paginationData);  
  }
  


  _confirmIssues() {

    // since we also need the username for the request generated.
    // hence getting the username from the state and then sending 
    // the same during the request.
    
    var userName=this.props.username||null; 
    var auditConfirmDetail={data:{
      username: userName,
      auditlines:this.state.checkedState
    }};

    var url=AUDIT_URL + AUDIT_ANAMOLY;
     let paginationData={
         'url':url,
         'method':POST,
         'cause': AUDIT_RESOLVE_CONFIRMED,
         'token': this.props.auth_token,
         'contentType':APP_JSON,
         'accept':APP_JSON,
         'formdata': auditConfirmDetail
        }
        this.props.resolveAuditLines(paginationData);
     
    this._removeThisModal();
  }


  _findDisplayidName(rawString)
  {
    return rawString.split(',');
  }
  _processDataTile(){
    let tile1Data={} 
    let manager = this.context.intl.formatMessage(messages.raManager);
    let operatorAssign = this.context.intl.formatMessage(messages.raOperatorAssign);
    tile1Data[manager]="Raja Dey"
    tile1Data[operatorAssign]="Raja Dey"
    return [tile1Data];
}

  
  render()
  {
    
    var auditData=this._findDisplayidName(this.props.auditId);
    let tiledata=this._processDataTile();
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
                                    values={{auditId:auditData[1],auditName:auditData[2]}}/> 
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
            </div>
            <AccordionMenu title="AccordionMenu">
     <Accordion id="1" title="Accordion 1">
     <div>
       <Panel title="Panel 1">
           <h3>This is within panel 1</h3>
           <div>
               This is panel body.
           </div>
       </Panel>
       <Panel title="Panel 2">
       </Panel>
       </div>
     </Accordion>
      <Accordion id="2" title="Accordion 2">
      <div>
      <Accordion id="3" title="Accordian Inside">
      <div>
      <Panel title="Panel inside">
       </Panel>
       </div>
      </Accordion>
       <Panel title="Panel 3">
       </Panel>
       <Panel title="Panel 4">
       </Panel>
       </div>
     </Accordion>
   </AccordionMenu>
          </div>
          
        </div>
      );
    }
  }

  function mapStateToProps(state, ownProps){
  return {
    
  };
}

var mapDispatchToProps=function(dispatch){
  return {
    // resolveAuditLines: function(data){dispatch(resolveAuditLines(data))},
    // getAuditOrderLines: function(data){dispatch(getAuditOrderLines(data))},
    // setResolveAuditSpinner: function(data){dispatch(setResolveAuditSpinner(data))}
  }
};

ResolveAudit.contextTypes={
 intl:React.PropTypes.object.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(ResolveAudit);