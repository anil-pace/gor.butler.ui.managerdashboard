import React, { Component } from 'react';
import Ddown from 'react-dropdown';


class DropdownTemp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: props.items[0].value, label: props.items[0].label}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    this.setState({selected: option})
    

  }

  render () {
    const defaultOption = this.state.selected
    return (
      <div className="ddown">
        <Ddown options={this.props.items} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
      </div>
    )
  }
}

export default DropdownTemp;
