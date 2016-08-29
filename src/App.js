import React  from 'react';
import ReactDOM  from 'react-dom';

import HealthTabs from './components/health/healthTabs';
import Health from './components/health/health';
import Tabs from './components/tabs/tabs';
import Header from './components/header/header';
import Tilex from './components/tile1x/Tilex';
import Tile2x from './components/tile2x/Tile2x';
import OrderStatsWidget from './components/widgetContainer/orderStatsWidget'
import PerformanceWidget from './components/widgetContainer/performanceWidget'
import { REQUEST_HEADER, getFetchData } from './actions/headerAction'
import { connect } from 'react-redux';






class App extends React.Component{
	constructor(props) 
	{
    	super(props);
    	
    }	
    componentDidMount() {
	    const { dispatch, type } = this.props;
	    console.log(this.props);
	    dispatch(getFetchData(type));
  	}
  	componentWillReceiveProps(nextProps) {
	    console.log(nextProps);
  	}
    
	render(){
		//console.log(this.props);
		return (
			
			<div className="mainContainer">
				<Header headData={this.props}/>
				<Tabs/>
				<div className="section group">
					<div className="col span_2_of_4">
						<Tilex/>
						<Tilex/>
					</div>
					<div className="col span_2_of_4 gorNoML">
						<Tile2x/>
					</div>
				</div>
				<OrderStatsWidget/>

			
			
				<PerformanceWidget/>
			</div>
			
		);
	}
};
function mapStateToProps(state) {
  const { getDummyData, getData } = state
  const {
    isFetching,
    type=REQUEST_HEADER,
    data=[4,5,6]
  } = getData[REQUEST_HEADER] || {
    isFetching: true,
    data: []
  }

  return {
    type,
    data,
    isFetching,
  }
}
export  default connect(mapStateToProps)(App);

