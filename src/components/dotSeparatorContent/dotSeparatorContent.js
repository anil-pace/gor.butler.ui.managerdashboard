import React  from 'react';
//import { FormattedMessage } from 'react-intl';


class DotSeparator extends React.Component{
   
  removeEmptyElement(actualArray){
    var index = -1,
        arr_length = actualArray ? actualArray.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = actualArray[index] ? actualArray[index].toString().trim():"";

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
  } 

render()
{
    let separator=this.props.separator||'.';
    let header=this.removeEmptyElement(this.props.header);
    let subHeader=this.removeEmptyElement(this.props.subHeader);
    let finalHeader=[],finalSubHeader=[];
    let headerClassName=this.props.headerClassName?this.props.headerClassName:"headerName";
    let subheaderClassName=this.props.subheaderClassName?this.props.subheaderClassName:"subheaderName";
    header.map(function(item, i){
                (header.length==i+1)?finalHeader.push(<span title={item} className={headerClassName}>{item}</span>):finalHeader.push(<span><span title={item} className={headerClassName}>{item}</span><span className='headerSeparation'>{separator}</span></span>)   
    })

    subHeader.map(function(item, i){
        (subHeader.length==i+1)?finalSubHeader.push(<span  title={item} className={subheaderClassName}>{item}</span>):finalSubHeader.push(<span><span  title={item} className={subheaderClassName}>{item}</span><span className='subHeaderSeparation'>{separator}</span></span>)   
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