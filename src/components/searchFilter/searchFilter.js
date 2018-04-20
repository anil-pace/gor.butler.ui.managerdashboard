import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class searchFilter extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.handleChange(e.target.value);
  }
  

  render(){
      return (
        <div className="searchBarWrapper">
            <div className="searchIconWrap"> 
              <div className="gor-search-icon"></div>
            </div>
            <div className="inputWrapper"> 
              <input type="text" className="gor-search-input-wrap" ref={(node) => { this.inputText = node; }} placeholder={this.props.placeHolder} onChange={this.handleChange}/>
            </div>
        </div>
      );  
    }
}

export default searchFilter;