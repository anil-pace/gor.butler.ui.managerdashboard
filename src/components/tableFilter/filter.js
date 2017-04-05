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
                         <FormattedMessage id="gor-filter-filterLabel" description="label for filter" 
            defaultMessage ="Filter data"/>
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
                             
                       {this.props.slides}
                             </div>
                         
                     </div>
                 <div className="gor-filter-footer"> 
                    <span className="gor-filter-footer-h2" onClick={this._resetFilter.bind(this)}>
                        Reset
                    </span>
                    <div className="gor-filter-btn-wrap">
                        <button className='gor-add-btn' onClick={this._submitFilterForm.bind(this)}>
                            {!this.props.responseFlag? <FormattedMessage id="gor.filter.heading" description="filter heading"  defaultMessage ="Apply filter"/> :<div className='spinnerImage'></div>}
                        </button>


                    </div> 
                 </div>
            </div>
        );
    }
};

Filter.PropTypes={
  noDataFlag:React.PropTypes.bool,
 filterTokenC1:React.PropTypes.object,
 filterTokenC2:React.PropTypes.object,
 filterTokenC3:React.PropTypes.object,
 filterTokenC4:React.PropTypes.object,
 searchField:React.PropTypes.object,
 slides:React.PropTypes.object,
 responseFlag:React.PropTypes.bool,
formSubmit: React.PropTypes.func,
clearFilter:React.PropTypes.func,
hideFilter:React.PropTypes.func
};

export default Filter ;