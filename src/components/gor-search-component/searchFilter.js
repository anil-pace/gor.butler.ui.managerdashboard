import React  from 'react';
import { FormattedMessage } from 'react-intl'; 

class SearchFilter extends React.Component{
  constructor(props) 
  {
      super(props); 
      this._finalChangeHandler  = this._debounce(this._finalChangeHandler,this.props.callBackDelay);
      this._animateBox = this._animateBox.bind(this);
      this.state={
        opened:false
      }
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
  _animateBox(e){
    if(e.currentTarget === e.target){
      this.setState({
        opened:!this.state.opened
      })
    }
  }
  

  render(){
      let animate = this.props.animate,
      opened=this.state.opened,
      cssClass;
      if(animate && opened){
        cssClass = "animated opened"
      }else if(animate){
        cssClass = "animated";
      }
      else{
        cssClass = ""
      }

      return (
        <div className={"searchBarWrapper "+cssClass} >
            <div className="searchIconWrap"> 
              <span className="gor-search-icon searchbox-magnifying-glass-icon" onClick={animate ? this._animateBox : null}></span>
            </div>
            <div className="inputWrapper"> 
              <input type="text" className="gor-search-input-wrap" placeholder={this.props.placeHolder || "Search..."} onChange={(e)=>{this._handleChange(e)}}/>
            </div>
        </div>
      );  
    }
}

export default SearchFilter;