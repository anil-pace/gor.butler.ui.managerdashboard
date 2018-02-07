import React  from 'react';
//import { FormattedMessage } from 'react-intl';


class DotSeparator extends React.Component{
   

render()
{
    let separator=this.props.separator||'.';
    let header=this.props.header;
    let subHeader=this.props.subHeader;
    let finalHeader=[],finalSubHeader=[];
    header.map(function(item, i){
                (header.length==i+1)?finalHeader.push(<span className="headerName">{item}</span>):finalHeader.push(<span><span className='headerName'>{item}</span><span className='headerSeparation'>{separator}</span></span>)   
    })

    subHeader.map(function(item, i){
        (subHeader.length==i+1)?finalSubHeader.push(<span className="subheaderName">{item}</span>):finalSubHeader.push(<span><span  className="subheaderName">{item}</span><span className='subHeaderSeparation'>{separator}</span></span>)   
})    
    return (
       <div className="gor-separator">
       <div>{finalHeader}</div>
       <div>{finalSubHeader}</div>
       </div>
     
    );
  }
}
export default DotSeparator;