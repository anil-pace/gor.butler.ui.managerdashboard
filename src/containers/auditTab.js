import React  from 'react';
import ReactDOM  from 'react-dom';
import UserDataTable from './userTab/userTabTable';
import Loader from '../components/loader/Loader';
import { connect } from 'react-redux'; 
import {AUDIT_RETRIEVE} from '../constants/appConstants';
import {AUDIT_URL} from '../constants/configConstants';
import {getAuditData} from '../actions/auditActions';
import AuditTable from './auditTab/auditTable'

class AuditTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    componentDidMount() {
    	this.getPageData();
    }

    getPageData() {
      let url = AUDIT_URL;
      let auditData={
              'url':url,
              'method':'GET',
              'cause': AUDIT_RETRIEVE,
              'token': sessionStorage.getItem('auth_token'),
              'contentType':'application/json'
          } 
        this.props.getAuditData(auditData);  
    }

	render(){
    var itemNumber = 7, renderTab = <div/>;
    if(this.props.auditDetail.length !== 0) {
      renderTab = <AuditTable items={this.props.auditDetail} itemNumber={itemNumber}  intlMessg={this.props.intlMessages} refreshData={this.getPageData.bind(this)}/>
    }
				
		return (
			<div>
				<div>
					<div className="gorUserTable">
						{renderTab}
					</div>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state, ownProps){
  //console.log(state)
  return {
    auditDetail: state.recieveAuditDetail.auditDetail || [],
    intlMessages: state.intl.messages
  };
}

var mapDispatchToProps = function(dispatch){
  return {
    getAuditData: function(data){ dispatch(getAuditData(data)); }
  }
};



export  default connect(mapStateToProps,mapDispatchToProps)(AuditTab);


