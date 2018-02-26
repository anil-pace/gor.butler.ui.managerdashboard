import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class SearchFilter extends React.Component{
  constructor(props) 
  {
      super(props); 
      this._finalChangeHandler  = this._debounce(this._finalChangeHandler,this.props.callBackDelay);
  }

  _debounce(fn, delay){
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay || 0);
    };
  }

  _handleChange(event){
    this._finalChangeHandler(event.target.value);
    
  }
  _finalChangeHandler(value){
    this.props.searchCallBack(value);
  }
  

  render(){
      return (
        <div className="searchBarWrapper">
            <div className="searchIconWrap"> 
              <div className="gor-search-icon"></div>
            </div>
            <div className="inputWrapper"> 
              <input type="text" className="gor-search-input-wrap" placeholder={this.props.placeHolder || "Search..."} onChange={(e)=>{this._handleChange(e)}}/>
            </div>
        </div>
      );  
    }
}

export default SearchFilter;