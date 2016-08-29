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
import {socketMiddleware} from './middleware/socketMiddleware'






class App extends React.Component{
	constructor(props) 
	{
    	super(props);
    	
    }	
    componentDidMount() {
	    const { dispatch, type } = this.props;
	    dispatch(getFetchData(type));
  	}
  	componentWillMount(){
  		const { dispatch, type } = this.props;
	    dispatch(getFetchData(type));
  	}
  	componentWillReceiveProps(nextProps) {
	    console.log(nextProps);
  	}
  	processData(){

  	}
    
	render(){
		
		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr'};
        var item2={heading1:'Orders to fulfill', value1:'120', low1:'8 PPS fulfilling per/hr', status1:'On schedule', heading2:'Remaining time', value2:'68mins', low2:'Completing in 8mins', status2:'23:59'};
		

		return (
			
			<div className="mainContainer">
				<Header headData={this.props}/>
				<Tabs/>
				<div className="gorWidgetWrap">
				<div className="section group">
					<div className="col span_2_of_4">
						<Tilex items={item1}/>
						<Tilex items={item1}/>
					</div>
					<div className="col span_2_of_4 gorNoML">
						<Tile2x items={item2}/>
					</div>
				</div>
				<OrderStatsWidget/>

			
			
				<PerformanceWidget/>
				</div>
			</div>
			
		);
	}
};


function mapStateToProps(state,ownProps) {
 
  
  return state.getData[state.getData.selectedAction] || {
    type:'REQUEST_HEADER',
    data:[],
    isFetching:true
  }
}
export  default connect(mapStateToProps)(App);

