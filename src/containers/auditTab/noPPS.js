import React  from 'react';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux' ;
import {tabSelected,subTabSelected} from '../../actions/tabSelectAction'
import {NOTIFICATION,SYS_SUB_TAB_ROUTE_MAP,TAB_ROUTE_MAP,SYSTEM} from '../../constants/frontEndConstants' 
import {BUTLERBOTS,PPS,CHARGING} from '../../constants/backEndConstants'
class NoPPS extends React.Component{
  constructor(props) 
  {
      super(props);  
  }
  handleSysSubTabClick(tabName){
      this.props.removeFn();
      this.props.tabSelected(TAB_ROUTE_MAP[SYSTEM]);
      this.props.subTabSelected(SYS_SUB_TAB_ROUTE_MAP[tabName]);
      sessionStorage.setItem("subTab",SYS_SUB_TAB_ROUTE_MAP[tabName])
  }  
  render()
  {
   return (<div>
   	<FormattedMessage id="audit.start.auditdetails.subheading2" description='Text for audit details subheading when no pps'  
            defaultMessage='There are currently no PPS in audit mode.'/>
            <p>
            <FormattedMessage id="audit.start.auditdetails.please" description='Text for please'  
            defaultMessage='Please '/>
            <a href="#/system/pps" onClick = {this.handleSysSubTabClick.bind(this,PPS)}>
            <FormattedMessage id="audit.start.auditdetails.hyperlink" description='Text for hyperlink'  
            defaultMessage='go to the PPS mode '/>
            </a>
            <FormattedMessage id="audit.start.auditdetails.operations" description='Text change operation'  
            defaultMessage='change PPS operations.'/>
            </p>
     </div>
     );
	}
}
function mapStateToProps(state, ownProps){
    return  {
         subTab:state.tabSelected.subTab || {},
         tab:state.tabSelected.tab || {}
    }
}
var mapDispatchToProps = function(dispatch){
  return {
      tabSelected: function(data){ dispatch(tabSelected(data)); },
    subTabSelected: function(data){ dispatch(subTabSelected(data)); }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(NoPPS);
  