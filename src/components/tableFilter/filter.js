import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import ReactSlider from 'react-slider'
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
        this.props.hideFilter();
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
    	                 </div>
    	                 <div className="gor-filter-body-slider-wrap"> 
    	                 	<ReactSlider defaultValue={[0, 100]} withBars />
    	                 </div>
                     </div>
                 <div className="gor-filter-footer"> 
                 	<span className="gor-filter-footer-h2" onClick={this._resetFilter.bind(this)}>
                 		Reset
                 	</span>
                 	<div className="gor-filter-btn-wrap">
                 		<button className="gor-add-btn" onClick={this._submitFilterForm.bind(this)}>
                    		<FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage ="Apply filter"/>
                  		</button>
                 	</div> 
                 </div>
            </div>
		);
	}
};

export default Filter ;