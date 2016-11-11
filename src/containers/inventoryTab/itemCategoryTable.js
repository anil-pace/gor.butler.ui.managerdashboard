import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class ItemCategoryTable extends React.Component {
  constructor(props) {
    super(props);
}

render() {
    return (
       <table>
       <thead>
       <tr>
       <th><FormattedMessage id="itemCat.category.heading" description="Item category table's column category heading"
       defaultMessage="Category" /></th>
       <th><FormattedMessage id="itemCat.CBM.heading" description="Item category table's column CBM heading"
       defaultMessage="CBM Used" /></th>
       <th><FormattedMessage id="itemCat.daysOnHand.heading" description="Item category table's column days On Hand heading"
       defaultMessage="Days on Hand" /></th>
       </tr>
       </thead>
       <tbody>
       
       <tr>
       <td>{this.props.categories}</td>
       <td>{this.props.CBMUsed}</td>
       <td>{this.props.daysOnHand}</td>
       </tr>
       </tbody>
       </table>
       );
}

};
/**
 * Function to pass state values as props
 */

 function mapStateToProps(state,ownProps) {
   return {
      categories: state.itemCatData.categories,
      CBMUsed : state.itemCatData.CBMUsed,
      daysOnHand: state.itemCatData.daysOnHand
  }
} 
export default connect(mapStateToProps)(ItemCategoryTable);
