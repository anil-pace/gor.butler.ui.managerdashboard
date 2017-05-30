/**
 * Created by gaurav.m on 4/13/17.
 */
import React  from 'react';
import {FormattedMessage} from 'react-intl'
class FilterSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        /**
         * Don't display the filter summary if count=0
         * or previous number of results is same of updated list.
         */
        if (this.props.total=== nextProps.total || nextProps.total=== 0) {
            return false
        }
        return true;
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