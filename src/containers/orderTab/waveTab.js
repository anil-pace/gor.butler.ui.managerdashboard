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
		var itemNumber = 7;		
		return (
			<div className="gorTesting">
				<WavesTable items={this.props.waveDetail.waveData} itemNumber={itemNumber}/>
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
