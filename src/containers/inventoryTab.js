/**
 * Container for Inventory tab
 * This will be switched based on tab click
 */
import React  from 'react';
import {
    INVENTORY_HISTOGRAM_CONFIG,
    LEGEND_ROUND,
    INV_LINE_LEGEND_IPICKED_COLOR,
    INV_LINE_LEGEND_CONFIG,
    INV_LINE_LEGEND_IPUT_COLOR,
    INV_HIST_LEGEND_COLOR,
    INV_HIST_LEGEND_CONFIG, CATEGORY_COLOR_MAP
} from './../constants/frontEndConstants';
import Legend from './../components/legend/legend';
import InventoryHistogram from './inventoryTab/inventoryHistogram'
import PickPutLineGraph from './../components/inventory/pickPutLineGraph'
import SnapShot from './../components/inventory/snapShot'
import ItemCategoryTable from './../components/inventory/itemCategoryTable'
import InventoryStacked from './../containers/inventoryTab/inventoryStacked'
import {FormattedMessage} from 'react-intl';
const moment = require("moment-timezone")
import {graphql, withApollo, compose} from "react-apollo";
import gql from 'graphql-tag'

const InventoryHistorySubscription = gql`
    subscription InventoryHistoryList {
        InventoryHistory {
            list {
                cbm_used
                items_put
                total_skus
                opening_stock
                warehouse_utilization
                exception_qty
                items_picked
                items_put
                date
                category_data {
                    days_on_hand
                    category_type
                    cbm_used
                    warehouse_utilization
                }
            }
        }
    }
`;


class InventoryTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formattedData: null, selectedData: null}
        this.subscription = null
    }

    _onClickCallBack(data) {
        this.props.setInventoryDate(data.customData);

    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data) || !this.subscription ) {
            this.formatData(nextProps.data)
        }

        if (!this.subscription && nextProps.subscribeToMore) {
            this.updateSubscription(nextProps.subscribeToMore, {})
        }
    }


    updateSubscription(subscription, variables) {
        if (this.subscription) {
            this.subscription()
        }
        this.subscription = subscription({
            variables: variables,
            document: InventoryHistorySubscription,
            notifyOnNetworkStatusChange: true,
            updateQuery: (previousResult, newResult) => {
                return Object.assign({}, previousResult, {
                    InventoryHistory: {
                        list: newResult.subscriptionData.data.InventoryHistory.list
                    }
                });
            },
        });
    }


    formatData(data) {
        let return_data = {}
        let self = this
        data.forEach(function (inv, index) {
            let graphInfo = {}, inventory_data,
                current_stock = 0,
                unusedSpace = 100,
                colorCode = CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length - 1],
                inv_date = inv ? moment(inv.date).tz(sessionStorage.timeOffset) : moment().tz(sessionStorage.timeOffset).subtract(index, 'days')
            if (inv) {
                inventory_data = JSON.parse(JSON.stringify(inv));
                current_stock = inv["opening_stock"] + inv["items_put"] - inv["items_picked"];
                unusedSpace = (100 - inv["warehouse_utilization"])

                if (inventory_data.category_data) {
                    inventory_data.category_data = inventory_data.category_data.map(function (category, index) {
                        category.colorCode = CATEGORY_COLOR_MAP[index] || CATEGORY_COLOR_MAP[CATEGORY_COLOR_MAP.length - 1];
                        return category
                    })
                }


            }

            let otherInfo = {...inventory_data, current_stock, unusedSpace, colorCode}
            graphInfo.xAxisData = [Math.random(), inv_date.format("DD")].join("_")
            graphInfo.yAxisData = current_stock
            graphInfo.items_picked = inv ? inv.items_picked : 0
            graphInfo.items_put = inv ? inv.items_put : 0
            graphInfo.date = inv_date.toDate()
            graphInfo.customData = inv_date.toDate().getTime()
            return_data[inv_date.toDate().getTime()] = {graphInfo, otherInfo}


        })

        this.setState({formattedData: return_data}, function () {
            self.selectData()
        })

    }

    selectData(timeStamp) {
        if (timeStamp) {
            this.setState({selectedData: this.state.formattedData[timeStamp].otherInfo})
        } else {
            let firstIndexData = Object.keys(this.state.formattedData)[0]
            this.setState({selectedData: this.state.formattedData[firstIndexData].otherInfo})
        }

    }


    render() {
        var histogramLegend = {
            data: [{
                color: INV_HIST_LEGEND_COLOR,
                name: <FormattedMessage id="inventory.histogram.legend" description="Inventory Histogram Legend"
                                        defaultMessage="Items Stocked">
                    {(message) => <tspan>{message}</tspan>}
                </FormattedMessage>
            }],
            config: INV_HIST_LEGEND_CONFIG
        }
        var lineChartLagend = {
            data: [
                {
                    color: INV_LINE_LEGEND_IPICKED_COLOR,
                    name: <FormattedMessage id="inventory.linechart.legendPicked"
                                            description="Inventory Linechart Legend for picked"
                                            defaultMessage="Items Picked">
                        {(message) => <tspan>{message}</tspan>}
                    </FormattedMessage>
                },
                {
                    color: INV_LINE_LEGEND_IPUT_COLOR,
                    name: <FormattedMessage id="inventory.linechart.legendPut"
                                            description="Inventory Linechart Legend for put"
                                            defaultMessage="Items Put">
                        {(message) => <tspan>{message}</tspan>}
                    </FormattedMessage>
                }
            ],
            config: INV_LINE_LEGEND_CONFIG
        }

        let timeOffset = sessionStorage.getItem('timeOffset')

        return (
            <div className="gorInventory wrapper">
                <div>
                    <div className="head">

                        <div className="labelCnt"><span><FormattedMessage id="inventory.header"
                                                                          description="Inventory Header Message"
                                                                          defaultMessage="Inventory"/> </span></div>
                    </div>
                    {this.state.formattedData && <div >
                        <div className="histCnt">
                            <div>
                                <div className="histLbl">
                                    <FormattedMessage id="inventory.histogram.header"
                                                      description="Inventory Histogram Header Message"
                                                      defaultMessage="Stock level history"/>
                                </div>
                                <div className="legendCnt">
                                    <Legend legendData={histogramLegend}/>
                                </div>
                                <div className="histogram">
                                    <InventoryHistogram selectData={this.selectData.bind(this)}
                                                        noData={this.props.noData}
                                                        recreatedData={this.state.formattedData}/>
                                </div>
                                <div className="histLbl">
                                    <FormattedMessage id="inventory.linechart.header"
                                                      description="Inventory Line Chart Header Message"
                                                      defaultMessage="Item Movements"/>
                                </div>
                                <div className="legendCnt">
                                    <Legend legendData={lineChartLagend} legendType={LEGEND_ROUND}/>
                                </div>
                                <div className="lineGraph">
                                    <PickPutLineGraph noData={this.props.noData}
                                                      recreatedData={this.state.formattedData}/>

                                </div>

                            </div>
                        </div>
                        <div className="stkSnapSht">
                            <div className="snapShtWrap">
                                <SnapShot
                                    currentDate={this.props.currentDate}
                                    snapshotTabData={this.state.selectedData || {}}/>
                                <InventoryStacked snapshotData={this.state.selectedData || {}}/>
                                <ItemCategoryTable snapshotData={this.state.selectedData || {}}/>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}
const InventoryHistoryQuery = gql`
    query InventoryHistoryList {
        InventoryHistory {
            list {
                cbm_used
                items_put
                total_skus
                opening_stock
                warehouse_utilization
                exception_qty
                items_picked
                items_put
                date
                category_data {
                    days_on_hand
                    category_type
                    cbm_used
                    warehouse_utilization
                }
            }
        }
    }
`;

const withNetworkData = graphql(InventoryHistoryQuery, {
    props: function (result) {
        if (!result.data.InventoryHistory || !result.data.InventoryHistory.list) {
            return null
        }
        return {
            data: result.data.InventoryHistory.list,
            subscribeToMore: result.data.subscribeToMore
        }
    },
    options: ({match, location}) => ({
        variables: {},
        fetchPolicy: 'network-only'
    }),
})


export default compose(
    withNetworkData
)(InventoryTab);

