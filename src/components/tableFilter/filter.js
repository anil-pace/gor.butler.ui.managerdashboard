import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';


class Filter extends React.Component{
	constructor(props) 
	{
    	super(props);
    }

    _closeFilter() {
        this.props.hideFilter();
    }	

    _resetFilter() {
        this.props.clearFilter();
    }
    

    _submitFilterForm() {
        this.props.formSubmit();
    }
    


	render(){
		return (
			<div>
                 <div className="gor-filter-header">
                 	<div className="gor-filter-header-h1">
                 		Filter Data
                 	</div>
                 	<div className="gor-filter-header-h2" onClick={this._closeFilter.bind(this)}>
                 		Hide
                 	</div>
                 </div>
                    <div>{this.props.noDataFlag?
                            <div className="gor-no-result-filter">No results found, please try again</div>:""}
                    </div>
                     <div className="gor-filter-body">
    	                 <div className="gor-filter-body-input-wrap"> 
    	                 	{this.props.searchField}
    	                 </div>
    	                 <div className="gor-filter-body-filterToken-wrap"> 
    	                 	<div className="gor-filter-body-filterToken-section1">
    	                 		{this.props.filterTokenC1}
    	                 	</div>
    	                 	<div className="gor-filter-body-filterToken-section1">
    	                 		{this.props.filterTokenC2}
    	                 	</div>
                            <div className="gor-filter-body-filterToken-section1">
                                {this.props.filterTokenC3}
                            </div>
                            <div className="gor-filter-body-filterToken-section1">
                                {this.props.filterTokenC4}
                            </div>
    	                 </div>
    	                 <div className="gor-filter-body-slider-wrap"> 
    	                 	 
                        
                        </div>
    	                 
                     </div>
                 <div className="gor-filter-footer"> 
                 	<span className="gor-filter-footer-h2" onClick={this._resetFilter.bind(this)}>
                 		Reset
                 	</span>
                 	<div className="gor-filter-btn-wrap">
                 		<button className={!this.props.responseFlag?"gor-add-btn":"gor-add-btn gor-disable-content"} onClick={this._submitFilterForm.bind(this)}>
                    		<FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage ="Apply filter"/>
                  		</button>
                 	</div> 
                 </div>
            </div>
		);
	}
};

export default Filter ;