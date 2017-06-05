import React  from 'react';
import { FormattedMessage,FormattedDate } from 'react-intl';

class AccordianBar extends React.Component{
	render(){
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
	    							<div className="gor-inline gor-utility-master-h2"> 
	    								<FormattedDate
								            value={new Date(this.props.data.create_time)}
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

export default AccordianBar ;