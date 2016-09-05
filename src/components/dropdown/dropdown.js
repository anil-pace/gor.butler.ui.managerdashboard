import React, { Component } from 'react';
import Ddown from 'react-dropdown';


class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { value: props.items[0].value, label: props.items[0].label}
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    console.log('You selected ', option.value)
    this.setState({selected: option})
    this.props.pf(option.value);

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

export default Dropdown;
