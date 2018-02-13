import React  from 'react';

export const Tab = (props) => {
    return (
        <li className={`tab ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
        onClick={!props.disabled ? (event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                } : null}>
                {props.tabName}
            
        </li>
    )
}
