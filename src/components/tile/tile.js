import React  from 'react';
//import { FormattedMessage } from 'react-intl';


class Tile extends React.Component{
   

render()
{
  let data=this.props.data;
  let line=[];
  
  Object.keys(data).forEach(function(key) {
    line.push(<div><span className='spanKey'>{key}</span><span>:</span><span className='spanValue'>{data[key]}</span></div>);
});
    return (
        <div className="orderDetailsColumn">
        <div className="orderDetailsRow">
           {line}
        </div>
     </div>
     
    );
  }
}
export default Tile;