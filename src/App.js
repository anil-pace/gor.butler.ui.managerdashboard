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

		var item1={heading:'Items to Stock', value:'4,74,579', low:'4 PPS stocking 3,546 items/hr'};
        var item2={heading1:'Orders to fulfill', value1:'120', low1:'8 PPS fulfilling per/hr', status1:'On schedule', heading2:'Remaining time', value2:'68mins', low2:'Completing in 8mins', status2:'23:59'};
		var items3={start:"09:10:25", name:"Krish verma gandhi sharma", post:"Manager"}
		

		return (
			
			<div className="mainContainer">
<<<<<<< HEAD
				<Header user={items3}/>
=======
				<Header headData={this.props}/>
>>>>>>> 78d88289eaca9b774df9448e26f05562854a5b42
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

