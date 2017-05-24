import React from 'react';
import Handle from './handle';

export default function createSliderWithTooltip(Component) {
  return class ComponentWrapper extends React.Component {
    static propTypes={
      tipFormatter: React.PropTypes.func,
    };
    static defaultProps={
      tipFormatter(value) { return value; },
    };
    constructor(props) {
      super(props);
      this.state={ visibles: {} };
    }
    handleTooltipVisibleChange=(index, visible)=> {
      this.setState({
        visibles: {
          ...this.state.visibles,
          [index]: visible,
        },
      });
    }
    handleWithTooltip=({ value, dragging, index, disabled, ...restProps })=> {
      return (
        
          <Handle
            {...restProps}
            onMouseEnter={()=> this.handleTooltipVisibleChange(index, true)}
            onMouseLeave={()=> this.handleTooltipVisibleChange(index, false)}
          />
        
      );
    }
    render() {
      return <Component {...this.props} handle={this.handleWithTooltip} />;
    }
  };
}
