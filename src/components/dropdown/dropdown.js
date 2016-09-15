//styleClass is the name of the css class to be used for styling, defsel is the index of the selected dropdown option.

import React, { Component } from 'react';
import Ddown from 'react-dropdown';


class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {selected: { value: props.currentState.value, label: props.currentState.label}
    }
    this._onSelect = this._onSelect.bind(this)
  }
  _onSelect (option) {
    this.setState({selected: option})
    this.props.pf(option.value);
  }
  render () {
    const defaultOption = this.state.selected

    return (
      <div className={this.props.styleClass}>
        <Ddown options={this.props.items} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
      </div>
    )
  }
}

export default Dropdown;
