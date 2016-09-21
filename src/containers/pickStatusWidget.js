import React  from 'react';
import ReactDOM  from 'react-dom';
import Tile2x from '../components/tile2x/Tile2x';
import { connect } from 'react-redux' ;
import { FormattedMessage } from 'react-intl';

class PickStatusWidget extends React.Component{
	/**
	 * Called once before rendering of component,used to displatch fetch action
	 * @return {[type]}
	 */
	constructor(props) 
	{
    	super(props);
        //console.log(this.props.ordersData);
    }	
    _parseProps (){
        let statusClass='', statusLogo='', headingleft='',valueStatus='',textleft='',headingright='',textright='', statusleft='',statusright='',lowleft='',lowright='',logo='',items={};
        headingleft=<FormattedMessage id="pickWidget.headingleft" description='Heading for pick status widget' 
            defaultMessage='Orders to fullfill'/>;
        logo=' iPick';

        textleft=this.props.ordersData.count_pending;
        if(!textleft)
        {
            valueStatus='gor-none';
            textleft=<FormattedMessage id="pickWidget.textleft" description='Heading for pick status widget' 
            defaultMessage='NONE'/>;

            lowleft=this.props.ordersData.avg+' Idle';
        }
        else
        {
            headingright=<FormattedMessage id="pickWidget.headingright" description='Heading for pick status widget' 
            defaultMessage='Time to cut-off'/>;
            
            textright='something';


            lowleft=<FormattedMessage id="pickWidget.lowleft" description='Heading for pick status widget' 
            defaultMessage='PPS Opertaing' /> + this.props.ordersData.avg + 
            <FormattedMessage id="pickWidget.heading" description='Heading for pick status widget' 
            defaultMessage='per/hr'/>;
            
            statusright=this.props.ordersData.time_current;
            
            lowright=<FormattedMessage id="pickWidget.lowright" description='Heading for pick status widget' 
            defaultMessage='Estimated time' />+'8hr 3min';

            if(this.props.ordersData.status==='On Schedule')
            {
                statusClass='gor-success';
                statusLogo='overview-tile-ontime-icon';

                statusleft=<FormattedMessage id="pickWidget.statusleft" description='Heading for pick status widget' 
            defaultMessage='On Schedule'/>
            }
            else
            {
                statusClass='gor-breach';            
                statusleft=this.props.ordersData.status;
            }
        }
        items={headingleft:headingleft, headingright:headingright, textleft:textleft, valueStatus:valueStatus, textright:textright, statusleft:statusleft, statusClass:statusClass, statusLogo:statusLogo, statusright:statusright, lowleft:lowleft, lowright:lowright, logo:logo};
        return items;
    }
    render()
    {
        var items=this._parseProps();
        return (
			 <Tile2x items={items}/>
    	);
    }

 }
function mapStateToProps(state, ownProps){
    
    return  {
         "ordersData":state.ordersInfo.ordersData || {}
    }
}
 export default connect(mapStateToProps)(PickStatusWidget);

 