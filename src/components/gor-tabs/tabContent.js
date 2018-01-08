import React  from 'react';

export const Tab = (props) => {
	if(props.internalTab===false){
		return (
        <li className={`tab ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
        onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                {props.tabName}
            
        </li>
    )

	}
	else{
		return (
        <li className={`audit-tabInternal ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
        onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                <span className={`audit-index  ${props.isActive ? 'active' : ''}`}>{props.index+1}</span>
                {props.tabName}
            
        </li>
    )
	}
    
}

 

