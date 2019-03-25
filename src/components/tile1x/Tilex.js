import React from 'react';
class Tilex extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='gor-tile gor-single'>
        <div className='gor-up-tile'>
          <div className='gor-tile-left'>
            <span className='gor-heading'>{this.props.items.heading}</span>
            <p
              className={
                'gor-heading-value ' + this.props.items.valueLeftStatus
              }
            >
              {this.props.items.value}
            </p>
            <p className='gor-status' />
          </div>
          <div className={'gor-tile-right ' + this.props.items.logo} />
        </div>
        <div className='gor-low-tile'>
          <span>{this.props.items.low}</span>
        </div>
      </div>
    );
  }
}

export default Tilex;
