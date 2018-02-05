import React  from 'react';
import { FormattedMessage } from 'react-intl';


class NameInitial extends React.Component{
    constructor(props) 
    {
        super(props); 
        
    }

render()
{
    let originalName=this.props.name;
    let type=this.props.shape?this.props.shape:'round';
    let name=originalName.split(' ');
    let firStNameInitial=name[0]?name[0].charAt(0):'';
    let lastnameInitial=name[1]?name[1].charAt(0):'';

    return (
       <div className="gor-IN-wrapper">
           <div className={"gor-IN-"+type+""} title={originalName}>
           <span className="got-IN-initial">{firStNameInitial.toUpperCase()}{lastnameInitial.toUpperCase()}</span>
           </div>
       </div>
     
    );
  }
}
export default NameInitial;