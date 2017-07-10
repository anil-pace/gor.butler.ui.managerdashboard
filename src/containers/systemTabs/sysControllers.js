/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import Zone from '../../components/systemOverview/zoneTile.js'


class SystemOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state={query:null,sortedDataList:null}
    }

    render() {
        return (
            <div className="gor-zone-wrapper">
            <div className="gor-zone-header">
            <span>11/11 Operating Zones</span>
            </div>
            <div className="gor-zt-wrap">
                <Zone />
                <Zone />
            </div>
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

