import React  from 'react';
import ReactDOM  from 'react-dom';
import Tilex from '../components/tile1x/Tilex';
import { connect } from 'react-redux';
import { FormattedMessage,FormattedNumber ,FormattedPlural} from 'react-intl';

class PutStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props)
    }	
    	/**
    	 * [function to format display data coming from server/mock]
    	 * @return {[void]} 
    	 */
        _formatContainerData() {
    		var lowStr,totalPut = this.props.ppsData ? this.props.ppsData.totalPut : null,
    		putData = Object.assign({},this.props.putData),
    		putThroughput = this.props.throughputData ? this.props.throughputData.put_throughput : null,
    		value = putData ? putData.value : null,pluralMsg,
    		heading;

    		//Setting display values based on server values/mock
    		if (!value){
    			value = <FormattedMessage id="widget.put.heading.value" description='Total Items Stocked' 
            		defaultMessage='None'/>;
            		
    			lowStr = <FormattedMessage id="widget.put.status.offline" description='Offline Status' 
            		defaultMessage='Offline'/>;
    		}
    		else if(!totalPut){
    			lowStr = <FormattedMessage id="widget.put.status.starting" description='Awaiting throughput data' 
            					defaultMessage='Starting...'/>;
    		}
    		else{
    			value = <FormattedNumber value={value}/>
                putThroughput = <FormattedNumber value={putThroughput}/>
                pluralMsg = <FormattedPlural
                            value={totalPut}
                            one='PPS'
                            other='PPS'
                        />
                lowStr = <FormattedMessage id="widget.put.throughput" description='Throughput message' 
            					defaultMessage='{count} {pluralMsg} stocking {throughput} items/hr'
            					values={{
							        count: totalPut,
                                    pluralMsg: pluralMsg,
							        throughput:putThroughput
							    }}/>;
    		}

    		putData.heading = <FormattedMessage id="widget.put.heading" description='Put Item Heading' 
            					defaultMessage='Items stocked'/>;
            putData.value = value;
            putData.low = lowStr;
            putData.logo = "iStock";
    		
    		return putData
    		
    	}

    render()
    {
    	var putData = this._formatContainerData();
    	return (
			 <Tilex items={putData}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
	return {
        putData: state.putInfo.putData,
        ppsData:state.ppsInfo.ppsData,
        throughputData : state.throughputInfo.throughputData,
        
    };
}
 
export 	default connect(mapStateToProps)(PutStatusWidget);
