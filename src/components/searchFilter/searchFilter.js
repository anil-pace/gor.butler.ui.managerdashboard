import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class searchFilter extends React.Component{
  constructor(props) 
  {
      super(props); 
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.handleChange(this.inputText.value);
  }
  

  render(){
      return (
        <div className="searchBarWrapper">
            <div className="searchIconWrap"> 
              <div className="gor-search-icon"></div>
            </div>
            <div className="inputWrapper"> 
              <input type="text" className="gor-search-input-wrap" placeholder={this.props.placeHolder} onChange={this.handleChange}/>
            </div>
        </div>
      );  
    }
}

export default searchFilter;