/**
 * Created by gaurav.m on 4/13/17.
 */
import React  from 'react';

class FilterSummary extends React.Component {
    

    shouldComponentUpdate(nextProps) {
        /**
         * Don't display the filter summary if count=0
         * or previous number of results is same of updated list.
         */
        if ((this.props.total!== nextProps.total || nextProps.total) || (this.props.isFilterApplied !== nextProps.isFilterApplied)) {
            return true
        }
        return false;
    }

    render() {
        return (
            <div>
                {this.props.isFilterApplied && !this.props.responseFlag ? <div className="gor-filter-search-result-bar">
                    {this.props.filterText}
                    <span className="gor-filter-search-show-all" onClick={this.props.refreshList}>
                        {this.props.refreshText}
                                                          </span>
                </div> : ""}
            </div>
        )
    }
}

FilterSummary.propTypes={
    refreshList: React.PropTypes.func.isRequired
}

export default FilterSummary ;