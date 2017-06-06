import React, { Component } from 'react';
import Ddown from 'react-dropdown';


class DropdownTable extends Component {
  constructor (props) {
    super(props)
    this.state={
      selected: { value: {}, label: this.props.placeholder}
    }
    this._onSelect=this._onSelect.bind(this)
  }

  _onSelect (option) {
    this.setState({selected: option})
    this.props.changeMode(option);
  
  }
//Need to rethink about this condition
 /* shouldComponentUpdate(nextProps,nextState){
    if(JSON.stringify(this.props.currentState)!==JSON.stringify(nextProps.currentState)){
      return true
    }
    return false
  }*/

  render () {
    const defaultOption=this.props.currentState?this.props.currentState:"";
    var dDownProps = {
      options : this.props.items,
      onChange:this._onSelect,
      placeholder:this.props.placeholder
    }
    if(defaultOption){
      dDownProps.value = defaultOption;
    }
     
    return (
      <div className={this.props.styleClass}>
      {this.props.disabled === true ? 
        <Ddown disabled {...dDownProps} />
        :<Ddown {...dDownProps} />
      }
      </div>
    )
  }
}

export default DropdownTable;
