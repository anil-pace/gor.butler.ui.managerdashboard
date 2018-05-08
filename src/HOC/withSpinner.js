import React  from 'react';
import Spinner from '../components/spinner/Spinner';

export  const withSpinner = (Comp) => (props) => {
 	
    return <div>
    {props.isLoading && <Spinner isLoading={props.isLoading} setSpinner={props.setDownloadReportSpinner}/>}
    <Comp {...props} />
    </div>
   
    
  
}

