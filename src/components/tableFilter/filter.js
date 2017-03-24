import React  from 'react';
import ReactDOM  from 'react-dom';
import { FormattedMessage } from 'react-intl';
import RangeSlider from '../../components/rangeSlider/rangeSlider'
import {filterMarks} from '../../constants/frontEndConstants';

class Filter extends React.Component{
	constructor(props) 
	{
    	super(props);
        this._changeSLiderRange = this._changeSLiderRange.bind(this)
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
    _changeSLiderRange(e){
        console.log(e);
        var range = {max:e[1],min:e[0]};
      this.props.rangechange(range);  
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
    	                 	 
                        <span className="sliderHeaderText">PERFORMANCE RANGE</span>
                             <RangeSlider.Range 
                                 min={0}
                                 max={500}
                                 step={100}
                                 marks={filterMarks}
                                 maxValue={500}
                                 defaultValue={[200,400]}
                                 allowCross={false}
                                 onChange={this._changeSLiderRange}
                                  />
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