import React  from 'react';
import Tilex from '../components/tile1x/Tilex';
import { connect } from 'react-redux';
import { FormattedMessage,FormattedNumber ,FormattedPlural} from 'react-intl';
import {STOCK_ICON,GOR_NONE} from '../constants/frontEndConstants';

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
    		var lowStr,valueLeftStatus='',totalPut=this.props.ppsData ? this.props.ppsData.totalPut : 0,
    		putData=Object.assign({},this.props.putData),
    		putThroughput=this.props.throughputData ? this.props.throughputData.put_throughput : 0,
    		value=putData ? putData.value : 0,pluralMsg,
    		heading;
            totalPut=<FormattedNumber value={totalPut}/>;
    		//Setting display values based on server values/mock
    		if (!value){
    			value=<FormattedMessage id="widget.put.heading.value" description='Total Items Stocked' 
            		defaultMessage='None'/>;
                valueLeftStatus=GOR_NONE;
    			lowStr=<FormattedMessage id="widget.put.status.idle" description='Put PPS idle message' 
                defaultMessage='{count} idle PPS (Put mode)'
                values={{
                    count: totalPut
                }}/>;
    		}
    		else{
    			value=<FormattedNumber value={value}/>
                putThroughput=<FormattedNumber value={putThroughput}/>
                
                pluralMsg=<FormattedMessage id="widget.put.count" description='Total put count'
                            defaultMessage="{count} {count,plural,one {PPS} other {PPS}}" 
                            values={{count:totalPut}}
                            />;  
                
                lowStr=<FormattedMessage id="widget.put.throughput" description='Throughput message' 
                                defaultMessage='{pluralMsg} stocking {throughput} items/hr'
                                values={{
                                    count: totalPut,
                                    pluralMsg: pluralMsg,
                                    throughput:putThroughput
                                }}/>;;
    		}
            if(!this.props.system_status)
            {
             lowStr=<FormattedMessage id="widget.put.offline" description='Message for system offline' 
                defaultMessage='Offline'/>;
            }
            if(this.props.systemEmergency){
             lowStr=<FormattedMessage id="widget.put.emergency" description='Message for system in emergency state' 
                defaultMessage='--'/>;                
            }

    		putData.heading=<FormattedMessage id="widget.put.heading" description='Put Item Heading' 
            					defaultMessage='Items stocked'/>;
            putData.value=value;
            putData.low=lowStr;
            putData.logo=STOCK_ICON;
    		putData.valueLeftStatus=valueLeftStatus;
    		return putData
    		
    	}

    render()
    {
    	var putData=this._formatContainerData();
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
        system_status: state.tabsData.status||null,
        systemEmergency: state.tabsData.system_emergency||null
    };
}
 
export 	default connect(mapStateToProps)(PutStatusWidget);
