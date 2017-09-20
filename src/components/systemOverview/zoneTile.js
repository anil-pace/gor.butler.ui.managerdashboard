/**
 * Dumb component to display zones
 */
import React  from 'react';

class Zone extends React.Component {
    

    render() {
        return (
            <div className={"gor-zone-tile "+this.props.statusClass+" "+(this.props.emergencyStatus ? this.props.emergencyType : "")} onClick={(e)=>{this.props.onZoneClick(this.props.id,this.props.status)}}>
                <div className="left-content">
                <div className={"gor-zone-status"}>
                    <span></span>
                </div>
                </div>
                <div className="right-content">
                <p className="zone-name">{this.props.name}</p>
                <p className="operating-status">{this.props.statusText}</p>
                <p>{this.props.zoneStatusText}</p>
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

