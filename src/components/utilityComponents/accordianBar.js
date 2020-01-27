import React  from 'react';
import { FormattedMessage,FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import {getDaysDiff} from '../../utilities/getDaysDiff';

class AccordianBar extends React.Component{


	_getTimeUpload(create_time, timeOffset){
		let timeUpload = {};

		if (!create_time) {
			timeUpload="--";
		}
		else {
			if (getDaysDiff(create_time) < 2) {

				timeUpload= (<div><FormattedRelative
				             value={create_time}
				             timeZone={timeOffset}
				             units= 'day'
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
							 year= 'numeric'
	                         month= 'short'
	                         day= '2-digit'
	                         hour= "2-digit"
	                         minute= "2-digit"
				             timeZone= {timeOffset}
				             hour12= {false}
				             />);
			}
		}


		return timeUpload;

	}
	render(){

		var timeUpload = this._getTimeUpload(this.props.data.createTime, this.props.timeOffset);
		return (
			<div> 
			<div className={this.props.showPanel?"gor-utility-accordian-open":"gor-utility-updown-bar"}  onClick={()=> this.props.handleAccordianState(this.props.index)}>
	    							<div className="gor-inline gor-utility-accordian-arrow-wrap">
	    								<div className={this.props.showPanel?"gor-down-arrow":"gor-right-arrow"}/>
	    							</div>
	    							<div className="gor-inline">
										<div className="gor-utility-master-h1" 
										title = {this.props.data.fileName}
											style ={{
											whiteSpace: "nowrap",
											width: "15em",
											overflow: "hidden",
											textOverflow: "ellipsis",
											
  }}><FormattedMessage id="utility.uploadHist.fileName" description='Upload file name' defaultMessage='{fileName}' values={{fileName:this.props.data.fileName}}/></div>
	    								<div className="gor-utility-master-h2"><FormattedMessage id="utility.uploadHist.success" description='Status percent' defaultMessage='Status: {status} % completed' values={{status:this.props.completed.toString()}}/></div> 
	    							</div>
	    							<div className="gor-inline gor-utility-master-h2"> 
	    								<FormattedDate
								            value={new Date(this.props.data.createTime)}
								            month='short'
							                day='2-digit'
							                hour="2-digit"
							                minute="2-digit"
								        />
	    								
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
	    								<div className="gor-inline gor-utility-accordian-h2">{this.props.data.failed +" lines"}</div>
	    							</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.uploadFile" description='Upload File' defaultMessage='Upload File:' /></div>
	    						  		{this.props.data.requestfile?
	    						  		<a href={this.props.data.requestfile} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">
	    						  		<FormattedMessage id="utility.uploadHist.download" description='Download' 
	    						  		defaultMessage='Download' />
	    						  		</a>:""}
	    						  	</div>
	    						  	<div className="gor-utility-master-arrordian-h1">
	    						  		<div className="gor-inline gor-utility-accordian-h1"><FormattedMessage id="utility.uploadHist.resultFile" description='Result file' 
	    						  		defaultMessage='Result File:' /></div>
	    						  		{this.props.data.responsefile? 
	    						  			<a href={this.props.data.responsefile} download className="gor-inline gor-utility-accordian-button gor-utility-accordian-h3">
	    						  			<FormattedMessage id="utility.uploadHist.download" description='Download' defaultMessage='Download' />
	    						  			</a>: ""}
	    						  	</div>
	    						</div>:""}
    						 </div>
		);
	}
};

export default AccordianBar ;