import React, { Component } from 'react';
import Ddown from 'react-dropdown';


class DropdownTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: {}, label: this.props.placeholder}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    this.setState({selected: option})
    this.props.changeMode(option);
  
  }

  render () {
    const defaultOption = this.props.currentState?this.props.currentState:this.props.placeholder;
    return (
      <div className={this.props.styleClass}>
        <Ddown options={this.props.items} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
      </div>
    )
  }
}

export default DropdownTable;
