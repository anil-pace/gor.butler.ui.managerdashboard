/**
 * Container for Overview tab
 * This will be switched based on tab click
 */
import React  from 'react';
import WavesTable from './waveTable';
import { connect } from 'react-redux';

class WaveTab extends React.Component{
	constructor(props) 
	{
    	super(props);
    }	
	render(){
		var itemNumber = 7, waveData = this.props.waveDetail.waveData, waveState = {"pendingWave":"--", "progressWave":"--", "orderRemaining":"--", "completedWaves":"--", "totalOrders":"--"};	
		var totalOrders = 0, orderToFulfill = 0, completedWaves = 0, pendingWaves = 0, progressWave = 0 ;
		if(waveData && waveData.length) {
  		for (var i = waveData.length - 1; i >= 0; i--) {
  				if(waveData[i].totalOrders) {
  					totalOrders = waveData[i].totalOrders + totalOrders;
  				}
  				if(waveData[i].ordersToFulfill) {
  					orderToFulfill = waveData[i].ordersToFulfill + orderToFulfill;
  				}

  				if(waveData[i].progress === 100) {
  					completedWaves++;
  				}
          if(waveData[i].statusClass === "pending") {
              pendingWaves++;
          }

          if(waveData[i].statusClass === "progress") {
              progressWave++;
          }
  			}
  			waveState = {"pendingWave":pendingWaves, "progressWave":progressWave, "orderRemaining":orderToFulfill, "completedWaves":completedWaves, "totalOrders":totalOrders};	
  		}
		return (
			<div className="gorTesting">
				<WavesTable items={waveData} itemNumber={itemNumber} waveState={waveState}/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps){
  return {
      waveDetail: state.waveInfo || {}
  };
};

export default connect(mapStateToProps)(WaveTab) ;
