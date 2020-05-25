/**
 * Created by gaurav.m on 4/12/18.
 */
import React from "react"
import {
  FormattedMessage,
  FormattedDate,
  injectIntl,
  intlShape,
  defineMessages
} from "react-intl"
import GTable from "./../../components/gor-table-component"
import {
  GTableHeader,
  GTableHeaderCell,
  GTableBody,
  GTableRow
} from "./../../components/gor-table-component"
import Spinner from "../../components/spinner/Spinner"
class OperationsLogTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({ list: nextProps.data })
    }
  }

  render() {
    let self = this
    let data_list = this.state.list
    return (
      <div className="ops-log-table">
        <GTable>
          <GTableHeader>
            <GTableHeaderCell>
              <FormattedMessage
                id="operationLog.table.operatingMode"
                description="OPERATING MODE"
                defaultMessage="OPERATING MODE"
              />
            </GTableHeaderCell>
            <GTableHeaderCell>
              <FormattedMessage
                id="operationLog.table.status"
                description="STATUS"
                defaultMessage="STATUS"
              />
            </GTableHeaderCell>
            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.externalId"
                description="External ID"
                defaultMessage="External ID"
              />
            </GTableHeaderCell>
            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.skuId"
                description="Status for PPS"
                defaultMessage="SKU ID"
              />
            </GTableHeaderCell>

            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.sourceId"
                description="Status for PPS"
                defaultMessage="SOURCE ID"
              />
            </GTableHeaderCell>

            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.destinationId"
                description="Status for PPS"
                defaultMessage="DESTINATION ID"
              />
            </GTableHeaderCell>

            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.userId"
                description="Status for PPS"
                defaultMessage="USER ID"
              />
            </GTableHeaderCell>

            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.timestamp"
                description="Status for PPS"
                defaultMessage="TIMESTAMP"
              />
            </GTableHeaderCell>
            <GTableHeaderCell>
              {" "}
              <FormattedMessage
                id="operationLog.table.requestId"
                description="Request ID"
                defaultMessage="REQUEST ID"
              />
            </GTableHeaderCell>
          </GTableHeader>
          <GTableBody
            data={data_list}
            onScrollHandler={this.props.onScrollHandler}
          >
            {data_list.map(function(row, idx) {
              return (
                <GTableRow key={idx} index={idx} data={data_list}>
                  <div className="cell">{row.operatingMode}</div>
                  <div className="cell">
                    <div className={["status", row.status.type].join(" ")}>
                      {row.status.type !== "success"
                        ? row.status.data || row.status.type
                        : row.status.type}
                    </div>
                  </div>
                  <div className="cell">{row.externalId || "--"}</div>
                  <div className="cell">
                    {(row.productInfo.type || "--") +
                      " " +
                      (row.productInfo.id || "--") +
                      "/" +
                      (row.productInfo.quantity
                        ? row.productInfo.quantity + " items"
                        : "--")}
                  </div>
                  <div className="cell">
                    {row.source
                      ? [row.source.type || "--", row.source.id || "--"].join(
                          " "
                        ) +
                        (row.source.children
                          ? "/" +
                            row.source.children[0].type +
                            "-" +
                            row.source.children[0].id
                          : "--") +
                        (row.source.children.length &&
                        row.source.children[0].children &&
                        row.source.children[0].children[0] &&
                        row.source.children[0].children[0].type
                          ? "/" +
                            row.source.children[0].children[0].type +
                            "-" +
                            row.source.children[0].children[0].id
                          : "-")
                      : "-- --"}
                  </div>
                  <div className="cell">
                    {row.destination
                      ? [
                          row.destination.type || "--",
                          row.destination.id || "--"
                        ].join(" ") +
                        (row.destination.children
                          ? "/" +
                            row.destination.children[0].type +
                            "-" +
                            row.destination.children[0].id
                          : "--") +
                        (row.destination.children.length &&
                        row.destination.children[0].children &&
                        row.destination.children[0].children[0] &&
                        row.destination.children[0].children[0].type
                          ? "/" +
                            row.destination.children[0].children[0].type +
                            "-" +
                            row.destination.children[0].children[0].id
                          : "")
                      : "-- --"}
                  </div>
                  <div className="cell">{row.userId}</div>
                  <div className="cell">
                    <FormattedDate
                      value={+row.createdTime}
                      year="numeric"
                      month="long"
                      day="2-digit"
                      hour="2-digit"
                      minute="2-digit"
                      timeZone={self.props.timeOffset}
                    />
                  </div>
                  <div className="cell">{row.requestId}</div>
                </GTableRow>
              )
            })}
            <Spinner
              isLoading={this.props.loading}
              utilClassNames={"infinite-scroll"}
            >
              <div className="infinite-content">
                <p>
                  <FormattedMessage
                    id="notification.infinite.message"
                    description="Infinite scroll message"
                    defaultMessage="Loading More"
                  />
                </p>
              </div>
            </Spinner>
          </GTableBody>
        </GTable>
      </div>
    )
  }
}

OperationsLogTable.PropTypes = {}

export default OperationsLogTable
