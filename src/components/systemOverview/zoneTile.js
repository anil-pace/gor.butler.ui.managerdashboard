/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';

class Zone extends React.Component {
    

    render() {
        return (
            <div className="gor-zone-tile" onClick={(e)=>{this.props.onZoneClick(this.props.id,this.props.status)}}>
                <div className="left-content">
                <div className={"gor-zone-status "+this.props.statusClass}>
                    <span></span>
                </div>
                </div>
                <div className="right-content">
                <p className="zone-name">{this.props.name}</p>
                <p className="operating-status">{this.props.status}</p>
                </div>
            </div>
        );
    }
}
;





Zone.PropTypes={
    status: React.PropTypes.object,
    name:React.PropTypes.object,
    statusClass:React.PropTypes.string
}

export default Zone ;

