import React  from 'react';
import { FormattedMessage,FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import { connect } from 'react-redux' ;
import {getDaysDiff} from '../../utilities/getDaysDiff';

class AccordianBar extends React.Component{


	_getTimeUpload(create_time, timeOffset){

		if(!create_time){
			return null;
		}
		let timeUpload = {};

		if (!create_time) {
			timeUpload="--";
		}
		else {
			if (getDaysDiff(create_time) < 2) {

				timeUpload= (<div><FormattedRelative
				             value={create_time}
				             unit= "day"
				             />, <FormattedTime
				             value={create_time}
				             hour= "numeric"
				             minute= "numeric"
				             timeZone= {timeOffset}
				             hour12= {false}
				             /></div>
				             );
			}
			else {
				timeUpload= (<FormattedDate
				             value={create_time}
				             hour= "numeric"
				             minute= "numeric"
				             timeZone= {timeOffset}
				             hour12= {false}
				             />);
			}
		}


		return timeUpload;

	}
	render(){

		var timeUpload = this._getTimeUpload(this.props.data.create_time, this.props.timeOffset);
		return (
		        <div> 
		        <div className={this.props.showPanel?"gor-utility-accordian-open":"gor-utility-updown-bar"}  onClick={()=> this.props.handleAccordianState(this.props.index)}>
		        <div className="gor-inline gor-utility-accordian-arrow-wrap">
		        <div className={this.props.showPanel?"gor-down-arrow":"gor-right-arrow"}/>
		        </div>
		        <div className="gor-inline">
		        <div className="gor-utility-master-h1"><FormattedMessage id="utility.uploadHist.fileName" description='Upload file name' defaultMessage='File {fileName}' values={{fileName:this.props.data.seq_num}}/></div>
		        <div className="gor-utility-master-h2"><FormattedMessage id="utility.uploadHist.success" description='Status percent' defaultMessage='Status: {status} % completed' values={{status:this.props.completed.toString()}}/></div> 
		        </div>
		        <div className="gor-inline gor-utility-master-h2" style={{textTransform: 'capitalize'}}>  
		        {timeUpload}
		        </div>
		        </div>
		        {this.props.showPanel?<div className="gor-utility-accordian">
		        <div className="gor-utility-accordian-border"/>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.recAdded" description='Record added' defaultMessage='Records added' /></div> 
		        <div className="gor-inline gor-utility-accordian-h3">-</div> 
		        <div className="gor-inline gor-utility-accordian-h2">{this.props.data.created +" lines"}</div>
		        </div>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.recUpdated" description='Record updated' defaultMessage='Records updated' /></div> 
		        <div className="gor-inline gor-utility-accordian-h3">-</div> 
		        <div className="gor-inline gor-utility-accordian-h2">{this.props.data.updated +" lines"}</div>
		        </div>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.recDeleted" description='Record deleted' defaultMessage='Records deleted' /></div> 
		        <div className="gor-inline gor-utility-accordian-h3">-</div> 
		        <div className="gor-inline gor-utility-accordian-h2">{this.props.data.deleted +" lines"}</div>
		        </div>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.errors" description='Errors' defaultMessage='Errors' /></div> 
		        <div className="gor-inline gor-utility-accordian-h3">-</div> 
		        <div className="gor-inline gor-utility-accordian-h2">{this.props.data.error +" lines"}</div>
		        </div>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.uploadFile" description='Upload File' defaultMessage='Upload File:' /></div>
		        <a href={this.props.data.request_file} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">
		        <FormattedMessage id="utility.uploadHist.download" description='Download' 
		        defaultMessage='Download' />
		        </a>
		        </div>
		        <div className="gor-utility-master-arrordian-h1">
		        <div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.resultFile" description='Result file' 
		        defaultMessage='Result File:' /></div>
		        <a href={this.props.data.response_file?this.props.data.response_file:"javascript:void(0)"} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3"> 
		        <FormattedMessage id="utility.uploadHist.download" description='Download' 
		        defaultMessage='Download' />
		        </a>
		        </div>
		        </div>:""}
		        </div>
		        );
}
};

function mapStateToProps(state, ownProps) {
	return {
		headerInfo: state.headerData.headerInfo,
		shift_start_time: state.headerData.shiftStartTime,
		authToken: state.authLogin.auth_token,
		username: state.authLogin.username,
		system_emergency: state.tabsData.system_emergency || null,
		system_status: state.tabsData.status || null,
		system_data: state.tabsData.system_data || null,
		activeModalKey: state.appInfo.activeModalKey || 0,
		timeOffset: state.authLogin.timeOffset
	}
}

export default connect(mapStateToProps)(AccordianBar) ;