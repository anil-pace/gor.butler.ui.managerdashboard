/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';

class Zone extends React.Component {
    

    render() {
        return (
            <div className="gor-zone-tile">
                <div className="left-content">
                </div>
                <div className="right-content">
                <p className="zone-name">ZONE 1</p>
                <p className="operating-status">OPERATING</p>
                </div>
            </div>
        );
    }
}
;





Zone.PropTypes={
    ppsFilter: React.PropTypes.string,
    
}

export default Zone ;

