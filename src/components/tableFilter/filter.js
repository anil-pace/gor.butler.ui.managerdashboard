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
 
    }	
	render(){
		return (
			<div>
                 <div className="gor-filter-header">
                 	<div className="gor-filter-header-h1">
                 		Filter Data
                 	</div>
                 	<div className="gor-filter-header-h2" onClick={this.props.hideFilter}>
                 		Hide
                 	</div>
                 </div>
                 <div className="gor-filter-body">
	                 <div className="gor-filter-body-input-wrap"> 
	                 	{this.props.searchField}
	                 </div>
	                 <div className="gor-filter-body-filterToken-wrap"> 
	                 	<div className="gor-filter-body-filterToken-section1">
	                 		{this.props.filterToken}
	                 	</div>
	                 	<div className="gor-filter-body-filterToken-section1">
	                 		{this.props.filterToken}
	                 	</div>
	                 </div>
	                 <div className="gor-filter-body-slider-wrap"> 
	                 	<ReactSlider defaultValue={[0, 100]} withBars />
	                 </div>
                 </div>
                 <div className="gor-filter-footer"> 
                 	<div className="gor-filter-footer-h2">
                 		Reset
                 	</div>
                 	<div className="gor-filter-btn-wrap">
                 		<button className="gor-add-btn" onClick={this.props.hideFilter}>
                    		<FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage ="Apply filter"/>
                  		</button>
                 	</div> 
                 </div>
            </div>
		);
	}
};

export default Filter ;