/**
 * Container for Overview tab
 * This will be switched based on tab click
 */

import React from 'react';
import SubTab from '../../components/subtab/subTab';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { subTabSelected } from '../../actions/tabSelectAction';
import {
  AUDIT_SUB_TAB_ROUTE_MAP,
  AUDIT_LISTING,
  ITEM_SEARCH
} from '../../constants/frontEndConstants';
import { FormattedMessage } from 'react-intl';

class AuditTab extends React.Component {
  handleSysSubTabClick(tabName) {
    this.props.subTabSelected(AUDIT_SUB_TAB_ROUTE_MAP[tabName]);
    sessionStorage.setItem('subTab', AUDIT_SUB_TAB_ROUTE_MAP[tabName]);
  }

  render() {
    var auditTab = (
      <FormattedMessage
        id='auditSubTabs.auditTab'
        description='Audit tab for Audit tab'
        defaultMessage='Audit'
      />
    );
    var itemSearch = (
      <FormattedMessage
        id='auditSubTabs.itemSearch'
        description='Item Search tab for Audit tab'
        defaultMessage='Item Search'
      />
    );

    let showItemSearchTab = false;
    try {
      if (this.props.config.item_search_enabled) {
        showItemSearchTab = true;
      }
    } catch (err) {}

    return (
      <div>
        <div className='gorMainSubtab'>
          <Link
            to='/audit/auditlisting'
            onClick={this.handleSysSubTabClick.bind(this, AUDIT_LISTING)}
          >
            <SubTab
              item={auditTab}
              changeClass={
                this.props.subTab === AUDIT_LISTING
                  ? 'gor-main-blockSelect'
                  : 'gor-main-block'
              }
            />
          </Link>

          {showItemSearchTab ? (
            <Link
              to='/audit/itemSearch'
              onClick={this.handleSysSubTabClick.bind(this, ITEM_SEARCH)}
            >
              <SubTab
                item={itemSearch}
                changeClass={
                  this.props.subTab === ITEM_SEARCH
                    ? 'gor-main-blockSelect'
                    : 'gor-main-block'
                }
              />
            </Link>
          ) : (
            ''
          )}

          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    subTab: state.tabSelected.subTab || {},
    tab: state.tabSelected.tab,
    config: state.config || {}
  };
}

var mapDispatchToProps = function(dispatch) {
  return {
    subTabSelected: function(data) {
      dispatch(subTabSelected(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditTab);
