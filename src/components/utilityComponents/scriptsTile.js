import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, defineMessages } from "react-intl";
import ScriptRow from "./scriptsRow";

import { GET_ITEM_RECALL } from "../../constants/configConstants";
import { GET, ITEM_RECALLED } from "../../constants/frontEndConstants";

import { getItemRecall } from "../../actions/utilityActions";
const messages = defineMessages({
	itemRecallHead: {
		id: "utility.itemRecall.head",
		description: "Expired Items",
		defaultMessage: "Expired Items"
	},
	itemRecallSubHead: {
		id: "utility.itemRecall.subHead",
		description: "(Recall all the expired items)",
		defaultMessage: "(Recall all the expired items)"
	},
	itemRecallButtonText: {
		id: "utility.itemRecall.buttonText",
		description: "RECALL",
		defaultMessage: "RECALL"
	}
});

class ScriptTile extends React.Component {
	_requestExpiredItems() {
		let data = {
			url: GET_ITEM_RECALL,
			method: GET,
			token: this.props.auth_token,
			cause: ITEM_RECALLED
		};
		this.props.getItemRecall(data);
	}

	render() {
		let barData = {
			h1: this.context.intl.formatMessage(messages.itemRecallHead),
			h2: this.context.intl.formatMessage(messages.itemRecallSubHead),
			buttonText: this.context.intl.formatMessage(
				messages.itemRecallButtonText
			)
		};
		return (
			<ScriptRow
				barData={barData}
				barAction={this._requestExpiredItems.bind(this)}
			/>
		);
	}
}

var mapDispatchToProps = function(dispatch) {
	return {
		getItemRecall: function(data) {
			dispatch(getItemRecall(data));
		}
	};
};

ScriptTile.contextTypes = {
	intl: React.PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(ScriptTile);
