import React  from 'react';
class HamBurger extends React.Component{
	constructor(props) 
	{
    	super(props);
    	this.state={menuVisible:false};
    }	
    _toggleDropdown(){
    	var currentVisibility = this.state.menuVisible;
    	currentVisibility = !currentVisibility;
    	this.setState({menuVisible:currentVisibility});
  	}
    _processList(){
    	var optionList, listItems=[]; 
    	optionList = this.props.data.optionList || []; 	
    	for(let index=0;index<optionList.length;index++){
    		listItems.push(<span className={'gor-hamburger-option '+optionList[index].optionClass} key={index} >
                        		{optionList[index].icon && <div className='gor-option-icon'>
                        										<div className={optionList[index].icon}></div></div>}
                        			<span>{optionList[index].optionText}</span>
                        		{optionList[index].fnButton && <button className='gor-btn-small gor-right' onClick={optionList[index].fnButton.bind(this)}>{optionList[index].buttonText}</button>}
                      		</span>);
    	}
    	return listItems;
    }
	render(){
		var listItems = this._processList();
		var dropDownMenu = (<span className='gor-hamburger-wrapper' style={(this.state.menuVisible)?{display:'block'}:{display:'none'}}>{listItems}</span>);
		return (
				<div className={"gor-menuWrap "+this.props.data.menuStyle} 
				style={this.state.menuVisible?{borderLeft:'1px solid #aaaaaa',borderRight:'1px solid #aaaaaa'}:{}}
				 onClick={this._toggleDropdown.bind(this)}>
					<div className="blockSystem">
						<div className={"gor-upperText "+this.props.data.headingStyle}>
							{this.props.data.heading}
						</div>
						<div className={"gor-subText "+this.props.data.headingStyle}>
							{this.props.data.subHeading}
						</div>
					</div>	
					<div className={'gor-menuIcon '+(this.state.menuVisible?'gor-dropdown-open':'gor-dropdown-close')} >
					</div>
					{dropDownMenu}									
				</div>		
			);
	}
};

export default HamBurger ;