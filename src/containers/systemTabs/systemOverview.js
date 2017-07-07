/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Spinner from '../../components/spinner/Spinner';
import Zone from '../../components/systemOverview/zoneTile.js'
import {hashHistory} from 'react-router'


class SystemOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state={query:null,sortedDataList:null}
    }

    render() {
        return (
            <div>
                <Zone />
            </div>
        );
    }
}
;




SystemOverview.contextTypes={
    intl: React.PropTypes.object.isRequired
}
SystemOverview.PropTypes={
    ppsFilter: React.PropTypes.string,
    
}

export default SystemOverview ;

