var messages = [
  {
    "id": "audit.table.duplicateTask",
    "description": "duplicateTask option for audit",
    "defaultMessage": "Duplicate task",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.table.deleteRecord",
    "description": "deleteRecord option for audit",
    "defaultMessage": "Delete record",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.table.cancelTask",
    "description": "cancel option for task",
    "defaultMessage": "Cancel Task",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.edit.button",
    "description": "edit button",
    "defaultMessage": "Edit",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.Delete.button",
    "description": "Delete button",
    "defaultMessage": "Delete",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.attributesType.heading",
    "description": "heading for attribute",
    "defaultMessage": "Box Id",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.resolveUnresolve",
    "description": "resolveUnresolve issue for audit table",
    "defaultMessage": "{resolvedCount} issues, {unresolvedCount} unresolved",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.resolveIssues",
    "description": "resolve issue for audit table",
    "defaultMessage": "{resolvedCount} issues",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.unresolveIssues",
    "description": "unresolve issue for audit table",
    "defaultMessage": "{unresolvedCount} {unresolvedCount, plural, one {unresolved issue} other {unresolved issues}}",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.resolveAudit.approve",
    "description": "resolve button",
    "defaultMessage": "Approve",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.resolveAudit.reject",
    "description": "resolve button",
    "defaultMessage": "Reject",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.startAudit.button",
    "description": "start button",
    "defaultMessage": "Start audit",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.resolveAudit.button",
    "description": "resolve button",
    "defaultMessage": "Resolve",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "commonDataTable.viewIssues.button",
    "description": "viewIssues button",
    "defaultMessage": "View issues",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "pps.configuration.profile.requestedText",
    "description": "requested profile for PPS",
    "defaultMessage": "Requested Profile: {requestedProfile}",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.resolveUnresolve.tooltip.header",
    "description": "resolveUnresolve issue for audit table",
    "defaultMessage": "{resolvedCount} audit lines, {unresolvedCount} audit lines",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.resolveUnresolve.tooltip.content",
    "description": "unresolve issue for audit table",
    "defaultMessage": "Approve or reject audit line with issues",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.unresolveIssues.tooltip.header",
    "description": "unresolve issue for audit table",
    "defaultMessage": "{unresolvedCount} {unresolvedCount, plural, one {unresolved audit line} other {unresolved audit lines}}",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.unresolveIssues.tooltip.content",
    "description": "unresolve issue for audit table",
    "defaultMessage": "Approve or reject audit line with issues",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.rejected.tooltip.header",
    "description": "rejected issue for audit table",
    "defaultMessage": "{rejected_lines}/{total_lines} {rejected_lines, plural, one {audit line} other {audit lines}} were rejected",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.rejected.tooltip.content",
    "description": "Re-audit the rejected audit lines",
    "defaultMessage": "Re-audit the rejected audit lines",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.created.tooltip.header",
    "description": "resolveUnresolve issue for audit table",
    "defaultMessage": "Assign PPS to start audit task",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "audit.created.tooltip.content",
    "description": "unresolve issue for audit table",
    "defaultMessage": "Click on \"Start Audit\" to assign PPS",
    "filepath": "./src/components/commonFunctionsDataTable.js"
  },
  {
    "id": "utility.fileSize.message",
    "description": "Maximum File Size:  MB",
    "defaultMessage": "Maximum File Size: {maxSize}",
    "filepath": "./src/components/fileUpload/fileUpload.js"
  },
  {
    "id": "utility.fileSize.errorline",
    "description": "Line or size",
    "defaultMessage": "{errorLine}",
    "filepath": "./src/components/fileUpload/fileUpload.js"
  },
  {
    "id": "footer.text",
    "description": "Footer description",
    "defaultMessage": "Copyright @ {dtYear} GreyOrange Pte Ltd",
    "filepath": "./src/components/footer/Footer.js"
  },
  {
    "id": "paginate.page.heading",
    "description": "Heading for paginate page",
    "defaultMessage": "Page",
    "filepath": "./src/components/gorPaginate/gorPaginate.js"
  },
  {
    "id": "paginate.page.pageNum",
    "description": "Heading for paginate pageNum",
    "defaultMessage": "of {totalPage}",
    "filepath": "./src/components/gorPaginate/gorPaginate.js"
  },
  {
    "id": "paginate.page.heading",
    "description": "Heading for paginate page",
    "defaultMessage": "Page",
    "filepath": "./src/components/gorPaginate/gorPaginateV2.js"
  },
  {
    "id": "paginate.page.pageNum",
    "description": "Heading for paginate pageNum",
    "defaultMessage": "of {totalPage}",
    "filepath": "./src/components/gorPaginate/gorPaginateV2.js"
  },
  {
    "id": "graph.noData",
    "description": "No data message for graph",
    "defaultMessage": "No Data",
    "filepath": "./src/components/graphd3/graph_horizontal.js"
  },
  {
    "id": "horizontal.graph.noData",
    "description": "No data message for graph",
    "defaultMessage": "No Data",
    "filepath": "./src/components/graphd3/graphd3.js"
  },
  {
    "id": "snapshot.inventory.usedSpace",
    "description": "Text for used space",
    "defaultMessage": "{utilisedSpace}% space utilized",
    "filepath": "./src/components/graphd3/stackedChartHorizontal.js"
  },
  {
    "id": "header.zones.status",
    "description": "Zone status",
    "defaultMessage": "SYSTEM NORMAL",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.inOperation",
    "description": "Zone in operation count",
    "defaultMessage": "{activeZones}/{totalZones} zones in operation",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.emergency",
    "description": "System Emergency",
    "defaultMessage": "SYSTEM STOPPED",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.inOperation1",
    "description": "Zone in operation count",
    "defaultMessage": "{activeZones} zones in operation",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.noOperation",
    "description": "Zone in operation count",
    "defaultMessage": "No zones in operation",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.option.release",
    "description": "release operation option",
    "defaultMessage": "Release the Emergency Stop button from the Zigbee box in order\n                              to resume operation.",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.emergency.stopped",
    "description": "System Emergency",
    "defaultMessage": "SYSTEM STOPPED",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.emergency.paused",
    "description": "System Emergency",
    "defaultMessage": "SYSTEM PAUSED",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.inOperation2",
    "description": "Zone in operation count",
    "defaultMessage": "{activeZones} zones in operation",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.button.resume",
    "description": "Button text",
    "defaultMessage": "Resume System",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.butler",
    "description": "Header description",
    "defaultMessage": "Butler",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.start",
    "description": "Start time",
    "defaultMessage": "Start time:{time}",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.count",
    "description": "Zone status count",
    "defaultMessage": "{activeZones}/{totalZones} Zones",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.zones.viewAll",
    "description": "View all system details",
    "defaultMessage": "View system details",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "header.logout",
    "description": "Text for logout",
    "defaultMessage": "Logout",
    "filepath": "./src/components/header/header.js"
  },
  {
    "id": "healthTab.status.on",
    "description": "on status for healthtab",
    "defaultMessage": "Open",
    "filepath": "./src/components/health/Health.js"
  },
  {
    "id": "healthTab.status.off",
    "description": "off status for healthtab",
    "defaultMessage": "Close",
    "filepath": "./src/components/health/Health.js"
  },
  {
    "id": "inventory.histogram.legend",
    "description": "Inventory Histogram Legend",
    "defaultMessage": "Items Stocked",
    "filepath": "./src/components/inventory/inventory.js"
  },
  {
    "id": "inventory.linechart.legendPicked",
    "description": "Inventory Linechart Legend for picked",
    "defaultMessage": "Items Picked",
    "filepath": "./src/components/inventory/inventory.js"
  },
  {
    "id": "inventory.linechart.legendPut",
    "description": "Inventory Linechart Legend for put",
    "defaultMessage": "Items Put",
    "filepath": "./src/components/inventory/inventory.js"
  },
  {
    "id": "inventory.header",
    "description": "Inventory Header Message",
    "defaultMessage": "Inventory",
    "filepath": "./src/components/inventory/inventory.js"
  },
  {
    "id": "itemTable.categoryType.category",
    "description": "Category Name",
    "defaultMessage": "Category",
    "filepath": "./src/components/inventory/itemCategoryTable.js"
  },
  {
    "id": "itemTable.cbmUsed.cbm",
    "description": "CBM Used field",
    "defaultMessage": "CBM Used",
    "filepath": "./src/components/inventory/itemCategoryTable.js"
  },
  {
    "id": "itemTable.daysInHand.count",
    "description": "Days in Hand",
    "defaultMessage": "Days in Hand",
    "filepath": "./src/components/inventory/itemCategoryTable.js"
  },
  {
    "id": "inventory.linechart.toolTipPut",
    "description": "Text for put in tooltip",
    "defaultMessage": "Put",
    "filepath": "./src/components/inventory/pickPutLineGraph.js"
  },
  {
    "id": "inventory.linechart.toolTipPick",
    "description": "Text for pick in tooltip",
    "defaultMessage": "Picked",
    "filepath": "./src/components/inventory/pickPutLineGraph.js"
  },
  {
    "id": "inventory.linechart.toolTipEntity",
    "description": "Text inventory entity",
    "defaultMessage": "Items",
    "filepath": "./src/components/inventory/pickPutLineGraph.js"
  },
  {
    "id": "inventory.linechart.noDataText",
    "defaultMessage": "No Item Movement",
    "filepath": "./src/components/inventory/pickPutLineGraph.js"
  },
  {
    "id": "inventory.linechart.today",
    "description": "Text to show today",
    "defaultMessage": "Today's",
    "filepath": "./src/components/inventory/pickPutLineGraph.js"
  },
  {
    "id": "inventory.snaphot.date",
    "description": "Snapshot date string",
    "defaultMessage": "Today's",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.currentStock",
    "description": "Snapshot table header",
    "defaultMessage": "Current Stock",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.closingStock",
    "description": "Snapshot table header",
    "defaultMessage": "Closing Stock",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.header",
    "description": "Snapshot header",
    "defaultMessage": "stock snapshot",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.itemsPut",
    "description": "Snapshot table header",
    "defaultMessage": "Items Put",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.itemsPick",
    "description": "Snapshot table header",
    "defaultMessage": "Items Pick",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.openingStock",
    "description": "Snapshot table header",
    "defaultMessage": "Opening Stock",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.sku",
    "description": "Snapshot table header",
    "defaultMessage": "SKUs",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "inventory.snaphot.cbmUsed",
    "description": "Snapshot table header",
    "defaultMessage": "CBM Used",
    "filepath": "./src/components/inventory/snapShot.js"
  },
  {
    "id": "login.butler.language",
    "description": "Text for language",
    "defaultMessage": "Language",
    "filepath": "./src/components/login/login.js"
  },
  {
    "id": "login.butler.manageInterface",
    "description": "Text for Management Interface",
    "defaultMessage": "Management Interface",
    "filepath": "./src/components/login/loginForm.js"
  },
  {
    "id": "login.butler.error.username",
    "description": "Text for missing username error",
    "defaultMessage": "Please enter your username",
    "filepath": "./src/components/login/loginForm.js"
  },
  {
    "id": "login.butler.error.password",
    "description": "Text for missing password error",
    "defaultMessage": "Please enter your password",
    "filepath": "./src/components/login/loginForm.js"
  },
  {
    "id": "login.form.username",
    "description": "Placeholder text for username",
    "defaultMessage": "Username",
    "filepath": "./src/components/login/messages.js"
  },
  {
    "id": "login.form.password",
    "description": "Placeholder text for password",
    "defaultMessage": "Password",
    "filepath": "./src/components/login/messages.js"
  },
  {
    "id": "login.form.button",
    "description": "Text for button",
    "defaultMessage": "Login",
    "filepath": "./src/components/login/messages.js"
  },
  {
    "id": "pps.dropdown.placeholder",
    "description": "placeholder for pps mode change",
    "defaultMessage": "Change PPS mode",
    "filepath": "./src/components/login/messages.js"
  },
  {
    "id": "table.filter.placeholder",
    "description": "placeholder for table filter",
    "defaultMessage": "Filter by keywords",
    "filepath": "./src/components/login/messages.js"
  },
  {
    "id": "notifications.read.message",
    "description": "No unread notifications",
    "defaultMessage": "You have no unread Notifications",
    "filepath": "./src/components/notifications/notifications.js"
  },
  {
    "id": "notifications.read.noresult",
    "description": "No Result Found",
    "defaultMessage": "No Result Found",
    "filepath": "./src/components/notifications/notifications.js"
  },
  {
    "id": "notification.all.link",
    "description": "View all notifications link",
    "defaultMessage": "VIEW ALL NOTIFICATIONS",
    "filepath": "./src/components/notifications/notifications.js"
  },
  {
    "id": "OrderSubTab.waves",
    "description": "waves tab for OrderSubTab",
    "defaultMessage": "Waves",
    "filepath": "./src/components/subtab/ordersTabs.js"
  },
  {
    "id": "OrderSubTab.orderlist",
    "description": "orderlist tab for OrderSubTab",
    "defaultMessage": "Order List",
    "filepath": "./src/components/subtab/ordersTabs.js"
  },
  {
    "id": "sysOverview.tab.heading",
    "description": "System overview Tab",
    "defaultMessage": "Overview",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "butlerBot.tab.heading",
    "description": "butler bot tab",
    "defaultMessage": "Butler Bots",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "pps.tab.heading",
    "description": "pps tab",
    "defaultMessage": "Pick Put Stations",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "chargingstation.tab.heading",
    "description": "charging station tab",
    "defaultMessage": "Charging Station",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "ppsConfiguration.tab.heading",
    "description": "pps configuration tab",
    "defaultMessage": "PPS Configuration",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "sysControllers.tab.heading",
    "description": "Syatem controllers Tab",
    "defaultMessage": "System Controllers",
    "filepath": "./src/components/subtab/subTabs.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/components/tableFilter/filter.js"
  },
  {
    "id": "gor.filter.heading",
    "description": "filter heading",
    "defaultMessage": "Apply filter",
    "filepath": "./src/components/tableFilter/filter.js"
  },
  {
    "id": "utility.uploadHist.fileName",
    "description": "Upload file name",
    "defaultMessage": "File {fileName}",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.success",
    "description": "Status percent",
    "defaultMessage": "Status: {status} % completed",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.recAdded",
    "description": "Record added",
    "defaultMessage": "Records added",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.recUpdated",
    "description": "Record updated",
    "defaultMessage": "Records updated",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.recDeleted",
    "description": "Record deleted",
    "defaultMessage": "Records deleted",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.errors",
    "description": "Errors",
    "defaultMessage": "Errors",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.uploadFile",
    "description": "Upload File",
    "defaultMessage": "Upload File:",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.download",
    "description": "Download",
    "defaultMessage": "Download",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.uploadHist.resultFile",
    "description": "Result file",
    "defaultMessage": "Result File:",
    "filepath": "./src/components/utilityComponents/accordianBar.js"
  },
  {
    "id": "utility.downloadGRN.status.heading",
    "description": "GRN Status",
    "defaultMessage": "GRN Status",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.stnPlaceholder",
    "description": "Enter STN Number",
    "defaultMessage": "Enter STN Number",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.formatPlaceholder",
    "description": "Enter STN Number",
    "defaultMessage": "Select File type",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.reportsHistory.clickToDownload",
    "description": "file name",
    "defaultMessage": "Click here to download",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.uploadHist.success",
    "description": "Status",
    "defaultMessage": "Status: {status}",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.label",
    "description": "STN number:",
    "defaultMessage": "STN number:",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.stnError",
    "description": "Please enter correct STN number",
    "defaultMessage": "Please enter correct STN number",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.head",
    "description": "Generate Report",
    "defaultMessage": "Generate Report",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadGRN.history",
    "description": "Report History",
    "defaultMessage": "Report History",
    "filepath": "./src/components/utilityComponents/downloadGRTile.js"
  },
  {
    "id": "utility.downloadReport.head",
    "description": "Download Reports",
    "defaultMessage": "Download Reports",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadReport.Status.heading",
    "description": "Reports Status",
    "defaultMessage": "Reports Status",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRprts.CategoryLabel",
    "description": "Category",
    "defaultMessage": "Category",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRprts.CategoryPlchldr",
    "description": "Select Category",
    "defaultMessage": "Select Category",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRprts.CategoryInventory",
    "description": "Inventory",
    "defaultMessage": "Inventory",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRprts.FileFormatPlchldr",
    "description": "Select File Format",
    "defaultMessage": "Select File Format",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRprts.FileFormatLabel",
    "description": "File Format",
    "defaultMessage": "File Format",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadRports.csvFormat",
    "description": "Comma separated values (csv)",
    "defaultMessage": "Comma separated values (csv)",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utiltiy.downloadRports.xlsFormat",
    "description": "ExceL Spreadsheet (xlsx)",
    "defaultMessage": "ExceL Spreadsheet (xlsx)",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.grnHistory.clickToDownload",
    "description": "file name",
    "defaultMessage": "Click here to download",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.uploadHist.success",
    "description": "Status",
    "defaultMessage": "Status: {status}",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadReports.head",
    "description": "Generate Report",
    "defaultMessage": "Generate Report",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.downloadReports.history",
    "description": "Report History",
    "defaultMessage": "Report History",
    "filepath": "./src/components/utilityComponents/downloadReportsTile.js"
  },
  {
    "id": "utility.uploadHistory.head",
    "description": "Upload History",
    "defaultMessage": "Upload History",
    "filepath": "./src/components/utilityComponents/masterUploadTile.js"
  },
  {
    "id": "utility.itemRecall.head",
    "description": "Expired Items",
    "defaultMessage": "Expired Items",
    "filepath": "./src/components/utilityComponents/scriptsTile.js"
  },
  {
    "id": "utility.itemRecall.subHead",
    "description": "(Recall all the expired items)",
    "defaultMessage": "(Recall all the expired items)",
    "filepath": "./src/components/utilityComponents/scriptsTile.js"
  },
  {
    "id": "utility.itemRecall.buttonText",
    "description": "RECALL",
    "defaultMessage": "RECALL",
    "filepath": "./src/components/utilityComponents/scriptsTile.js"
  },
  {
    "id": "utility.downDlabel",
    "description": "label for download",
    "defaultMessage": "DOWNLOAD",
    "filepath": "./src/components/utilityComponents/utilityTile.js"
  },
  {
    "id": "stringConfig.open",
    "description": "Text to display on",
    "defaultMessage": "Open",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.off",
    "description": "Text to show off",
    "defaultMessage": "Close",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.fclose",
    "description": "Text to show off",
    "defaultMessage": "Force Close",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.per_hour",
    "description": "Text to show per_hour",
    "defaultMessage": "per_hour",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.pick",
    "description": "Text to show pick",
    "defaultMessage": "pick",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.put",
    "description": "Text to show put",
    "defaultMessage": "put",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.audit",
    "description": "Text to show audit",
    "defaultMessage": "audit",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.soft",
    "description": "Text to show soft",
    "defaultMessage": "soft",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.hard",
    "description": "Text to show hard",
    "defaultMessage": "hard",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.soft_manual",
    "description": "Text to show soft_manual",
    "defaultMessage": "soft_manual",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.pending",
    "description": "Text to show pending",
    "defaultMessage": "In Progress",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.wave.pending",
    "description": "Text to show pending",
    "defaultMessage": "Pending",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.disconnected",
    "description": "Text to show disconnected",
    "defaultMessage": "Disconnected",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.connected",
    "description": "Text to show connected",
    "defaultMessage": "Connected",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.completed",
    "description": "Text to show completed",
    "defaultMessage": "Completed",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.Completed",
    "description": "Text to show Completed",
    "defaultMessage": "completed",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.in_progress",
    "description": "Text to show In Progress",
    "defaultMessage": "In Progress",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.breached",
    "description": "Text to show breached",
    "defaultMessage": "Breached",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.fulfillable",
    "description": "Text to show fulfillable",
    "defaultMessage": "In Progress",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.abandoned",
    "description": "Text to show abandoned",
    "defaultMessage": "Abandoned",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.manual",
    "description": "Text to show manual",
    "defaultMessage": "Manual",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.auto",
    "description": "Text to show auto",
    "defaultMessage": "Auto",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.notFulfillable",
    "description": "Text to show In progress",
    "defaultMessage": "Unfulfillable",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.exception",
    "description": "Text to show exception",
    "defaultMessage": "Exception",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.online",
    "description": "Text to show Online",
    "defaultMessage": "online",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.offline",
    "description": "Text to show Offline",
    "defaultMessage": "offline",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.received",
    "description": "Text to show received",
    "defaultMessage": "In Progress",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.cancelled",
    "description": "Text to show cancelled",
    "defaultMessage": "Cancelled",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.butler_supervisor",
    "description": "Text to show Manager",
    "defaultMessage": "Manager",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.butler_ui",
    "description": "Text to show Operator",
    "defaultMessage": "Operator",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.admin",
    "description": "Text to show admin",
    "defaultMessage": "Admin",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.qc",
    "description": "Text to show Qc operator",
    "defaultMessage": "QC Operator",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.packing_operator",
    "description": "Text to show packing operator",
    "defaultMessage": "Packing Operator",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.temporary_unfulfillable",
    "description": "Text for temporary unfulfillable status",
    "defaultMessage": "On hold",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.audit_resolved",
    "description": "Text for audit resolved status",
    "defaultMessage": "Resolved",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.audit_pending_approval",
    "description": "Text for audit pending approval status",
    "defaultMessage": "Unresolved",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.audit_rejected",
    "description": "Text for audit rejected status",
    "defaultMessage": "Rejected",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md001",
    "description": "Text for safety checklist item 1",
    "defaultMessage": "No personnel are present in the no-man zone.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md002",
    "description": "Text for safety checklist item 2",
    "defaultMessage": "All Butler and MSU positions have been corrected.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md003",
    "description": "Text for safety checklist item 3",
    "defaultMessage": "All no-man zone gates are properly closed.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md004",
    "description": "Text for safety checklist item 4",
    "defaultMessage": "All no-man gate limit switches are active and working.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md005",
    "description": "Text for safety checklist item 5",
    "defaultMessage": "All Hard Emergency buttons are released.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md006",
    "description": "Text for safety checklist item 6",
    "defaultMessage": "All Zigbee boxes are online.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md007",
    "description": "Text for safety checklist item 7",
    "defaultMessage": "Peripherals status known.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md008",
    "description": "Text for safety checklist item 8",
    "defaultMessage": "Physical inventory verified.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md009",
    "description": "Text for safety checklist item 9",
    "defaultMessage": "No Emergency buttons in 'Pressed' state.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md010",
    "description": "Text for safety checklist item 10",
    "defaultMessage": "All shutters open  in active zones.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md011",
    "description": "Text for safety checklist item 11",
    "defaultMessage": "No humans in operations area.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.md012",
    "description": "Text for safety checklist item 12",
    "defaultMessage": "All paths cleared of any debris.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "stringConfig.audit_reaudited",
    "description": "Text for audit reaudited status",
    "defaultMessage": "Re-audited",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "roleDesc.butler_supervisor",
    "description": "Text for Manager description",
    "defaultMessage": "Grant access to the Management Interface and Operator Interface to all systems",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "roleDesc.butler_ui",
    "description": "Text for Operator description",
    "defaultMessage": "Grant access to the Operator Interface at each Pick Put Station in the Butler system",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "pwdDesc.butler_supervisor",
    "description": "Text for password description of manager",
    "defaultMessage": "A password of at least 8 alphanumeric characters will be required for logging into the Management Interface and Operator Interface.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "pwdDesc.butler_ui",
    "description": "Text for password description of operator",
    "defaultMessage": "A password of 6 digits will be required for logging into the Operator Interface.",
    "filepath": "./src/constants/backEndConstants.js"
  },
  {
    "id": "login.lang.english",
    "description": "English option in the language drop down",
    "defaultMessage": "English (United States)",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.lang.japanese",
    "description": "Japanese option in the language drop down",
    "defaultMessage": "日本語",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.lang.spanish",
    "description": "SPANISH option in the language drop down",
    "defaultMessage": "Español",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.lang.chinese",
    "description": "Chinese option in the language drop down",
    "defaultMessage": "中文",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.lang.german",
    "description": "German option in the language drop down",
    "defaultMessage": "Deutsche",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.lang.french",
    "description": "French option in the language drop down",
    "defaultMessage": "Français",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.autologout.message",
    "description": "Auto logout message",
    "defaultMessage": "Due to session expiry, Auto Logout has been triggered!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.butler.fail",
    "description": "Text for login failure",
    "defaultMessage": "Invalid username and/or password, please try again",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.butler.connection.fail",
    "description": "Text for connection failure",
    "defaultMessage": "Connection failure",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.butler.unauthorized",
    "description": "Text for unauthorized login",
    "defaultMessage": "You are not authorized",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.success.edit",
    "description": "Text for successfully editing user",
    "defaultMessage": "User details updated successfully",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "ppsDetail.modeChange.success",
    "description": "Success Message for PPS mode",
    "defaultMessage": "PPS Mode Change Request Processed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "ppsDetail.modeChange.isAlreadyRequested",
    "description": "PPS is already in requested mode",
    "defaultMessage": "PPS is already in requested mode",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "ppsDetail.modeChange.tryLater",
    "description": "Previous Change request is pending",
    "defaultMessage": "Previous request of changing mode is already pending, Please try later!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.usernameExists",
    "description": "Text for already registered username",
    "defaultMessage": "An account has already been created with this User ID",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.passwordMissing",
    "description": "Text for passwords missing",
    "defaultMessage": "Password not provided!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.passwordMatch",
    "description": "Text for passwords not matching",
    "defaultMessage": "Passwords do not match!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.username",
    "description": "Text for missing username",
    "defaultMessage": "Username is a required field!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.role",
    "description": "Text for missing roles",
    "defaultMessage": "Role is a required field!",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "appInfo.success",
    "description": "Text for success",
    "defaultMessage": "Successfull",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.invalid.id",
    "description": "Text for invalid user ID",
    "defaultMessage": "Please enter a valid User ID",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.invalid.format",
    "description": "Text for invalid user ID format",
    "defaultMessage": "Please use only letters (a-z), numbers, and periods",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "login.empty.password",
    "description": "Text for empty password",
    "defaultMessage": "Please enter a password",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.empty.name",
    "description": "Text for empty user name",
    "defaultMessage": "Please enter a user name",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.invalid.name",
    "description": "Text for invalid user name",
    "defaultMessage": "Special characters like \"~\",\"@\",\"%\" are not allowed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.invalid.password.operator",
    "description": "Text for invalid password for operator",
    "defaultMessage": "Please enter a password of at least 6 alphanumeric characters",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.invalid.password.manager",
    "description": "Text for invalid password for manager",
    "defaultMessage": "Please enter a password of at least 8 alphanumeric characters",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "user.match.password",
    "description": "Text for passwords not matching",
    "defaultMessage": "Both password entered do not match. Please try again",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "msu.name.prefix",
    "description": "prefix for msu name",
    "defaultMessage": "MSU",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "chargingStation.name.prefix",
    "description": "prefix for charging station name",
    "defaultMessage": "CS",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "pps.name.prefix",
    "description": "prefix for pps name",
    "defaultMessage": "PPS",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.invalid.sku",
    "description": "Text for invalid SKU ID",
    "defaultMessage": "Please enter a valid SKU Number",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.invalid.location",
    "description": "Text for invalid location ID",
    "defaultMessage": "Please enter a valid location Number",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.location",
    "description": "Text for invalid location",
    "defaultMessage": "Location does not exist",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.sku",
    "description": "Text for invalid sku",
    "defaultMessage": "SKU does not exist",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.g016",
    "description": "Text for unsuccessful audit deletion",
    "defaultMessage": "Given audit does not exists",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.AE001",
    "description": "Text for invalid audit ID",
    "defaultMessage": "Audit Id does not exists",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.AE002",
    "description": "Text for invalid PPS",
    "defaultMessage": "Valid PPS not found for Audit",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.AE004",
    "description": "Text for already processed location",
    "defaultMessage": "Audit of location already under process",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.AE005",
    "description": "Text for already processed sku",
    "defaultMessage": "Audit of sku already under process",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.AE006",
    "description": "Text for already processed audit",
    "defaultMessage": "Audit ID already processed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.create.audit.success",
    "description": "Text for successfull audit creation",
    "defaultMessage": "New audit task created successfully",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.start.audit.success",
    "description": "Text for successfull audit creation",
    "defaultMessage": "PPS assigned successfully. Audit task started",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.delete.audit.processed",
    "description": "Text for already processed audit",
    "defaultMessage": "Audit already processed. Cannot delete",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.Location.audit.pending",
    "description": "Text for Location of audit pending for approval",
    "defaultMessage": "Location of audit pending for approval",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.Location.currently.processed",
    "description": "Text for Location of audit currently being processed",
    "defaultMessage": "Location of audit currently being processed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.user.fail",
    "description": "Text for error in updating user",
    "defaultMessage": "Error in updating user",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.user.response",
    "description": "Text for error in response",
    "defaultMessage": "Error in response",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.audit.create",
    "description": "Text for error in creating audit",
    "defaultMessage": "Error in creating audit",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.api",
    "description": "Text for unregistered API response",
    "defaultMessage": "API response not registered",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.connection",
    "description": "Text for connection refused",
    "defaultMessage": "Network Failure",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.400",
    "description": "Text for bad request",
    "defaultMessage": "Network error: 400 Bad Request",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.401",
    "description": "Text for Unauthorizedun",
    "defaultMessage": "Network error: 401 Unauthorized",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.403",
    "description": "Text for Forbidden",
    "defaultMessage": "Network error: 403 Forbidden",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.405",
    "description": "Text for method not allowed",
    "defaultMessage": "Network error: 405 Method Not Allowed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.408",
    "description": "Text for request timeout",
    "defaultMessage": "Network error: 408 Request Time-out",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.409",
    "description": "Text for conflict",
    "defaultMessage": "Network error: 409 Conflict",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.500",
    "description": "Text for internal server error",
    "defaultMessage": "Network error: 500 Internal Servor Error",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "notify.error.502",
    "description": "Text for bad gateway",
    "defaultMessage": "Network error: 502 Bad Gateway",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "inventory.histogram.noDataText",
    "description": "Inventory Histogram No Data Text",
    "defaultMessage": "No Stock Found",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "users.add.password.subheading.manager",
    "description": "Subheading for create password",
    "defaultMessage": "A password of at least 8 alphanumeric characters will be required for logging into the Management Interface and Operator Interface",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "users.add.password.subheading.operator",
    "description": "Subheading for create password operator",
    "defaultMessage": "A password of 6 digits will be required for logging into the Operator Interface.",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "emergency.resume.coreerror",
    "description": "Error while resuming operation",
    "defaultMessage": "Cannot connect to butler core",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "emergency.resume.statuserror",
    "description": "Error while resuming operation",
    "defaultMessage": "Emergency status not soft_manual",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "emergency.resume.Softemergency",
    "description": "Soft emergency still there",
    "defaultMessage": "Soft emergency still there",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "emergency.resume.success",
    "description": "Operations resumed",
    "defaultMessage": "Operation resumed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "masterdata.maxlimit.records",
    "description": "Records in file should not be greater than",
    "defaultMessage": "Records in file should not be greater than",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "masterdata.maxlimit.filesize",
    "description": "File size should not be greater than",
    "defaultMessage": "File size should not be greater than",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.cancellation.error.g020",
    "description": "Internal server error while requesting for audit cancel",
    "defaultMessage": "Internal server error while requesting for audit cancel",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.cancellation.error.g021",
    "description": "Audit Id already sent for cancellation",
    "defaultMessage": "Audit Id already sent for cancellation",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.cancellation.error.g023",
    "description": "Audit Id already successfully cancelled",
    "defaultMessage": "Audit Id already successfully cancelled",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "audit.cancellation.error.g024",
    "description": "Audit Id cancellation request has been process and cannot be cancelled",
    "defaultMessage": "Audit Id cancellation request has been process and cannot be cancelled",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "pps.statusChange.allStatusSuccess",
    "description": "Records in file should not be greater than",
    "defaultMessage": "Status change request successful",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "pps.modeChange.allModeSuccess",
    "description": "Records in file should not be greater than",
    "defaultMessage": "Mode change request successful",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.normal",
    "description": "Status text for zone",
    "defaultMessage": "OPERATING",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.pauseInit",
    "description": "Status text for zone",
    "defaultMessage": "PAUSE INITIATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.pauseActivated",
    "description": "Status text for zone",
    "defaultMessage": "PAUSE ACTIVATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.pauseDeactive",
    "description": "Status text for zone",
    "defaultMessage": "PAUSE DEACTIVATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.clearInit",
    "description": "Status text for zone",
    "defaultMessage": "CLEAR INITIATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.clearActive",
    "description": "Status text for zone",
    "defaultMessage": "CLEAR ACTIVATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.clearDeactivated",
    "description": "Status text for zone",
    "defaultMessage": "CLEAR DEACTIVATED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.emergencyStop",
    "description": "Status text for zone",
    "defaultMessage": "EMERGENCY STOP",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.emergencyPause",
    "description": "Status text for zone",
    "defaultMessage": "EMERGENCY PAUSE",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.stopped",
    "description": "Status text for zone",
    "defaultMessage": "STOPPED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.status.paused",
    "description": "Status text for zone",
    "defaultMessage": "PAUSED",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.zone_pause",
    "description": "Status text for zone",
    "defaultMessage": "Zone pause activated",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.zone_clear",
    "description": "Status text for zone",
    "defaultMessage": "Zone clear activated",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.emergency_stop",
    "description": "Status text for zone",
    "defaultMessage": "Emergency stop activated",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.emergency_pause",
    "description": "Status text for zone",
    "defaultMessage": "Emergency pause activated",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.none",
    "description": "Status text for zone",
    "defaultMessage": "Standard",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.button_press",
    "description": "Status text for zone",
    "defaultMessage": "Button pressed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.emergency_stop_button_press",
    "description": "Status text for zone",
    "defaultMessage": "Emergency stop button pressed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.emergency_pause_button_press",
    "description": "Status text for zone",
    "defaultMessage": "Emergency pause button pressed",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.latch_gate",
    "description": "Status text for zone",
    "defaultMessage": "Entry gate breached",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.light_curtain",
    "description": "Status text for zone",
    "defaultMessage": "Light curtains breached",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "zoning.action.noneSensor",
    "description": "Status text for zone",
    "defaultMessage": "Standard",
    "filepath": "./src/constants/messageConstants.js"
  },
  {
    "id": "widget.audit.heading.value",
    "description": "Total Items Audited",
    "defaultMessage": "None",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "widget.audit.status.idle",
    "description": "Audit PPS idle message",
    "defaultMessage": "{count} idle PPS (Audit mode)",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "widget.audit.throughput",
    "description": "Throughput message",
    "defaultMessage": "{pps_count} PPS auditing {throughput} items/hr",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "widget.audit.offline",
    "description": "Message for system offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "widget.audit.emergency",
    "description": "Message for system in emergency state",
    "defaultMessage": "--",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "widget.audit.heading",
    "description": "Audit Item Heading",
    "defaultMessage": "Items audited",
    "filepath": "./src/containers/auditStatusWidget.js"
  },
  {
    "id": "auditdetail.created.status",
    "defaultMessage": "Created",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.pending.status",
    "defaultMessage": "Pending",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.progress.status",
    "defaultMessage": "In Progress",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.completed.status",
    "defaultMessage": "Completed",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.sku.prefix",
    "defaultMessage": "SKU",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.location.prefix",
    "defaultMessage": "Location",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditPendingApp.prefix",
    "defaultMessage": "Issues found",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditRejected.prefix",
    "defaultMessage": "Rejected",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditResolved.prefix",
    "defaultMessage": "Resolved",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditReaudited.prefix",
    "defaultMessage": "Re-audited",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditCancelled.prefix",
    "defaultMessage": "Cancelled",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditdetail.auditCancellingText.text",
    "defaultMessage": "Cancelling...",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "audit.table.heading",
    "description": "Heading for audit table",
    "defaultMessage": "Audit Tasks",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "audit.table.buttonLable",
    "description": "button label for audit create",
    "defaultMessage": "Create New Task",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditList.filter.search.bar",
    "description": "total results for filter search bar",
    "defaultMessage": "{total} results found",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "auditList.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all results",
    "filepath": "./src/containers/auditTab.js"
  },
  {
    "id": "audit.inputField.id",
    "defaultMessage": "AUDIT TASK ID",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.inputField.sku",
    "defaultMessage": "SPECIFIC SKU ID",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.inputField.location",
    "defaultMessage": "SPECIFIC LOCATION ID",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.tokenfield.typeAudit",
    "defaultMessage": "AUDIT TYPE",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.tokenfield.STATUS",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token1.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token1.sku",
    "defaultMessage": "SKU",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token1.location",
    "defaultMessage": "Location",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.issueFound",
    "defaultMessage": "Issue found",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.rejected",
    "defaultMessage": "Rejected",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.resolved",
    "defaultMessage": "Resolved",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.inProgress",
    "defaultMessage": "In progress",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.pending",
    "defaultMessage": "Pending",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.created",
    "defaultMessage": "Created",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.token2.completed",
    "defaultMessage": "Completed",
    "filepath": "./src/containers/auditTab/auditFilter.js"
  },
  {
    "id": "audit.placeholder",
    "description": "audit dropdown placeholder",
    "defaultMessage": "Manage Tasks",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "auditList.alert.lable",
    "description": "audit list alert lable",
    "defaultMessage": "{auditIssue} {auditIssue, plural, one {Alert} other {Alerts}}",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.noData",
    "description": "No data message for audit table",
    "defaultMessage": "No Audit Task Found",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "auditTable.stationID.heading",
    "description": "Heading for audit ID for auditTable",
    "defaultMessage": "AUDIT ID",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "auditTable.SubAuditID",
    "description": "total Sub auditID for auditTable",
    "defaultMessage": "Total:{rowsCount}",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.type",
    "description": "audit type for audit table",
    "defaultMessage": "AUDIT TYPE",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.auditType",
    "description": "audit type for audit table",
    "defaultMessage": "SKU ({sku}) . Location ({location})",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.STATUS",
    "description": "STATUS for audit",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "auditTable.status",
    "description": "status completed audit",
    "defaultMessage": "{auditCompleted} Completed",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.startTime",
    "description": "startTime for audit",
    "defaultMessage": "START TIME",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.progress",
    "description": "progress for audit task",
    "defaultMessage": "PROGRESS(%)",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.Totalprogress",
    "description": "total progress for audit table",
    "defaultMessage": "{totalProgress}% Completed",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.timeCompleted",
    "description": "timeCompleted for audit",
    "defaultMessage": "TIME COMPLETED",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.table.action",
    "description": "action Column",
    "defaultMessage": "ACTIONS",
    "filepath": "./src/containers/auditTab/auditTable.js"
  },
  {
    "id": "audit.valid.sku",
    "description": "text for valid sku",
    "defaultMessage": "SKU confirmed",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.invalid.sku",
    "description": "text for invalid sku",
    "defaultMessage": "Please enter correct SKU number",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.noAtrributes.sku",
    "description": "text for valid sku with no attributed",
    "defaultMessage": "SKU confirmed but no Box Id found",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.heading",
    "description": "Heading for add audit",
    "defaultMessage": "Create new audit",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.subheading",
    "description": "Subheading for add audit",
    "defaultMessage": "Select and enter details below to create a new audit task",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.auditdetails.heading",
    "description": "Text for audit details heading",
    "defaultMessage": "Select audit type by",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.typedetails.sku",
    "description": "Text for sku",
    "defaultMessage": "Audit by SKU code",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.typedetails.location",
    "description": "Text for location",
    "defaultMessage": "Audit by Location code",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.sku.heading",
    "description": "Text for SKU heading",
    "defaultMessage": "Enter SKU and validate",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audits.validateSKU",
    "description": "Text for validate sku button",
    "defaultMessage": "Validate",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.dropdown.heading",
    "description": "Text for dropdown heading",
    "defaultMessage": "Choose Box Id (Optional)",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.location.heading",
    "description": "Text for location heading",
    "defaultMessage": "Enter Location",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.location.subheading",
    "description": "Subtext for enter location",
    "defaultMessage": "Format: (XXX.X.X.XX)",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.add.sku.subheading",
    "description": "Subtext for copy paste sku",
    "defaultMessage": "Use copy and paste if you have muktiple sku numbers",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audits.add.password.button",
    "description": "Text for add audit button",
    "defaultMessage": "Create audit",
    "filepath": "./src/containers/auditTab/createAudit.js"
  },
  {
    "id": "audit.delete.heading",
    "description": "Text for audit delete heading",
    "defaultMessage": "Are you sure you would like to delete audit task {task_name} ?",
    "filepath": "./src/containers/auditTab/deleteAudit.js"
  },
  {
    "id": "audit.duplicate.heading",
    "description": "Text for audit duplicate heading",
    "defaultMessage": "Are you sure you would like to duplicate audit task {task_name} ?",
    "filepath": "./src/containers/auditTab/duplicateAudit.js"
  },
  {
    "id": "audit.start.auditdetails.subheading2",
    "description": "Text for audit details subheading when no pps",
    "defaultMessage": "There are currently no PPS in audit mode.",
    "filepath": "./src/containers/auditTab/noPPS.js"
  },
  {
    "id": "audit.start.auditdetails.please",
    "description": "Text for please",
    "defaultMessage": "Please",
    "filepath": "./src/containers/auditTab/noPPS.js"
  },
  {
    "id": "audit.start.auditdetails.hyperlink",
    "description": "Text for hyperlink",
    "defaultMessage": "go to the PPS mode",
    "filepath": "./src/containers/auditTab/noPPS.js"
  },
  {
    "id": "audit.start.auditdetails.operations",
    "description": "Text change operation",
    "defaultMessage": "change PPS operations.",
    "filepath": "./src/containers/auditTab/noPPS.js"
  },
  {
    "id": "resolveAudit.table.batchID",
    "description": "batch id Column",
    "defaultMessage": "BOX ID.",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.table.expectedItems",
    "description": "expectedItems Column",
    "defaultMessage": "EXPECTED QUANTITY",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.table.actualQuantity",
    "description": "actualQuantity Column",
    "defaultMessage": "ACTUAL QUANTITY",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.table.STATUS",
    "description": "status Column",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.table.resolve",
    "description": "resolve Column",
    "defaultMessage": "RESOLVE",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.inSlot.text",
    "defaultMessage": "In slot",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.table.slot",
    "description": "slot id Column",
    "defaultMessage": "SLOT ID",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.resolve.heading",
    "description": "Heading for resolve audit",
    "defaultMessage": "Resolve issues",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.viewIssues.heading",
    "description": "Heading for view issues audit",
    "defaultMessage": "View issues",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.missing.information",
    "description": "missing information for audit",
    "defaultMessage": "Audit task #{auditId} - {auditType}",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.missing.auditType",
    "description": "missing information for audit type",
    "defaultMessage": "Mismatch found in {totalLines} slot",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.cancelLabel",
    "description": "button label for cancel",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.confirmLabel",
    "description": "button label for confirm",
    "defaultMessage": "Confirm",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "resolveAudit.closeLabel",
    "description": "button label for close",
    "defaultMessage": "Close",
    "filepath": "./src/containers/auditTab/resolveAudit.js"
  },
  {
    "id": "audit.start.ppscheckbox",
    "description": "Text for PPS",
    "defaultMessage": "PPS {eta}",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.start.heading",
    "description": "Heading for start audit",
    "defaultMessage": "Start audit task",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.start.subheading",
    "description": "Subheading for start audit",
    "defaultMessage": "Assign one or more PPS and start the audit task",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.start.auditdetails.heading",
    "description": "Text for audit details heading",
    "defaultMessage": "Assign PPS for {task}",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.start.auditdetails.subheading1",
    "description": "Text for audit details subheading when pps present",
    "defaultMessage": "All PPS below are currently in the audit mode.",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.start.button",
    "description": "Text for start audit button",
    "defaultMessage": "Start task now",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "audit.back.button",
    "description": "Text for go back button",
    "defaultMessage": "Go Back",
    "filepath": "./src/containers/auditTab/startAudit.js"
  },
  {
    "id": "emergency.heading",
    "description": "Text for emergency heading",
    "defaultMessage": "Systemwide emergency stop",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.type",
    "description": "Text for emergency type",
    "defaultMessage": "The butler system is now stopped by a {type} emergency.",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.action",
    "description": "Text for emergency action",
    "defaultMessage": "System reset required before returning to operation",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.stop",
    "description": "Text for emergency stop",
    "defaultMessage": "Stoppped:",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.trigger",
    "description": "Text for emergency trigger",
    "defaultMessage": "Triggered at:",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.operator",
    "description": "Text for emergency operator",
    "defaultMessage": "Operator:",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "emergency.button",
    "description": "Text for close button",
    "defaultMessage": "Close",
    "filepath": "./src/containers/Emergency.js"
  },
  {
    "id": "operation.alert.release",
    "description": "Text for emergency button release heading",
    "defaultMessage": "All Emergency-stop buttons released",
    "filepath": "./src/containers/emergencyProcess/emergencyRelease.js"
  },
  {
    "id": "operation.alert.release.text",
    "description": "Text for emergency stop button release",
    "defaultMessage": "All Emergency-stop buttons have been released.",
    "filepath": "./src/containers/emergencyProcess/emergencyRelease.js"
  },
  {
    "id": "operation.alert.release.subtext",
    "description": "Text for next stop to resume operation",
    "defaultMessage": "You will be required to enter your password in order to view the checklist.\n              Approving all the items on checklist will resume the warehouse operation",
    "filepath": "./src/containers/emergencyProcess/emergencyRelease.js"
  },
  {
    "id": "operation.alert.release.button",
    "description": "Text button to resume operation",
    "defaultMessage": "Resume operation",
    "filepath": "./src/containers/emergencyProcess/emergencyRelease.js"
  },
  {
    "id": "operation.fire.header",
    "description": "Header Text FIRE EMERGENCY",
    "defaultMessage": "FIRE EMERGENCY",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.fire.cautionText",
    "description": "Description Text FIRE EMERGENCY",
    "defaultMessage": "Fire emergency has been triggered and system has started its safety measures.",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.fire.evacuation",
    "description": "Description Text evacuation",
    "defaultMessage": "Please follow evacuation procedures immediately.",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.fire.escape",
    "description": "Description Text escape",
    "defaultMessage": "Clearing escape path",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.fire.shutter",
    "description": "Description Text clear shutter",
    "defaultMessage": "Clearing all shutters",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.alert.release.button",
    "description": "Text button to resume operation",
    "defaultMessage": "RESUME OPERATION",
    "filepath": "./src/containers/emergencyProcess/fireHazard.js"
  },
  {
    "id": "operation.alert.pause",
    "description": "Text for operation stopped heading",
    "defaultMessage": "Butler System - Operation Paused",
    "filepath": "./src/containers/emergencyProcess/OperationPause.js"
  },
  {
    "id": "operation.alert.pause.text",
    "description": "Text for emergency button press",
    "defaultMessage": "Emergency-Pause activated via Controller {controller} in {zone}.",
    "filepath": "./src/containers/emergencyProcess/OperationPause.js"
  },
  {
    "id": "operation.alert.pause.nonPOE",
    "description": "Text for operation stopped heading",
    "defaultMessage": "Operation Paused",
    "filepath": "./src/containers/emergencyProcess/OperationPause.js"
  },
  {
    "id": "operation.alert.pause.subtext",
    "description": "Subtext for pause alert",
    "defaultMessage": "You must check the emergency situation and release the Emergency Pause button in order to resume the operation in warehouse",
    "filepath": "./src/containers/emergencyProcess/OperationPause.js"
  },
  {
    "id": "operation.alert.stop",
    "description": "Text for operation stopped heading",
    "defaultMessage": "Butler System - Operation Stopped",
    "filepath": "./src/containers/emergencyProcess/OperationStop.js"
  },
  {
    "id": "operation.alert.stop.text",
    "description": "Text for emergency button press",
    "defaultMessage": "Emergency-Stop activated via Conroller {controller} in {zone}.",
    "filepath": "./src/containers/emergencyProcess/OperationStop.js"
  },
  {
    "id": "operation.alert.stop.nonPOE",
    "description": "Text for operation stopped heading",
    "defaultMessage": "Operation Stopped",
    "filepath": "./src/containers/emergencyProcess/OperationStop.js"
  },
  {
    "id": "operation.alert.stop.subtext",
    "description": "Subtext for pause alert",
    "defaultMessage": "You must check the emergency situation and release the Emergency Stop button in order to resume the operation in warehouse",
    "filepath": "./src/containers/emergencyProcess/OperationStop.js"
  },
  {
    "id": "operation.pause.heading",
    "description": "Text for pause operation heading",
    "defaultMessage": "Pause Operation",
    "filepath": "./src/containers/emergencyProcess/pauseOperation.js"
  },
  {
    "id": "operation.pause.text",
    "description": "Text for pause operation action",
    "defaultMessage": "All Butler bots, PPS and other sysytem components will be paused once\n              completed the last action",
    "filepath": "./src/containers/emergencyProcess/pauseOperation.js"
  },
  {
    "id": "operation.pause.error",
    "description": "Text for wrong password",
    "defaultMessage": "The entered input does not match. Please try again.",
    "filepath": "./src/containers/emergencyProcess/pauseOperation.js"
  },
  {
    "id": "operation.pause.cancel",
    "description": "Text for cancel button",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/emergencyProcess/pauseOperation.js"
  },
  {
    "id": "operation.pause.button",
    "description": "Text for pause button",
    "defaultMessage": "Pause Operation",
    "filepath": "./src/containers/emergencyProcess/pauseOperation.js"
  },
  {
    "id": "operation.resume.heading",
    "description": "Text for resume operation heading",
    "defaultMessage": "Resume Operation",
    "filepath": "./src/containers/emergencyProcess/resumeOperation.js"
  },
  {
    "id": "operation.resume.text",
    "description": "Text for resume operation body",
    "defaultMessage": "To resume operation, you will be required to go through a safety\n                checklist to make sure that the Butler system is ready",
    "filepath": "./src/containers/emergencyProcess/resumeOperation.js"
  },
  {
    "id": "operation.resume.error",
    "description": "Text for wrong password",
    "defaultMessage": "The entered input does not match. Please try again.",
    "filepath": "./src/containers/emergencyProcess/resumeOperation.js"
  },
  {
    "id": "operation.cancel",
    "description": "Text for cancel",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/emergencyProcess/resumeOperation.js"
  },
  {
    "id": "operation.resume.view",
    "description": "Text for viewing safety checklist",
    "defaultMessage": "View safety checklist",
    "filepath": "./src/containers/emergencyProcess/resumeOperation.js"
  },
  {
    "id": "operation.safety.steperror",
    "description": "Text for error in step",
    "defaultMessage": "(Check again)",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.firesafety.heading",
    "description": "Text for safety heading",
    "defaultMessage": "Resume Checklist",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.safety.heading",
    "description": "Text for fire safety heading",
    "defaultMessage": "Safety Checklist",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.safety.steps",
    "description": "Text for approval steps",
    "defaultMessage": "Check approval steps",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.safety.text",
    "description": "Text for ticking items",
    "defaultMessage": "Tick every item to confirm that the system is safe to resume operation.",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.safety.errors",
    "description": "Text for safety error",
    "defaultMessage": "System has found some of these steps were not followed. \n                    Please check or contact service engineer for support",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.firesafety.confirm",
    "description": "Text for Resume Opeartion button",
    "defaultMessage": "Resume Opeartion",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "operation.safety.confirm",
    "description": "Text for confirm button",
    "defaultMessage": "Confirm",
    "filepath": "./src/containers/emergencyProcess/safetyChecklist.js"
  },
  {
    "id": "inventory.histogram.header",
    "description": "Inventory Histogram Header Message",
    "defaultMessage": "Stock level history",
    "filepath": "./src/containers/inventoryTab.js"
  },
  {
    "id": "inventory.linechart.header",
    "description": "Inventory Line Chart Header Message",
    "defaultMessage": "Item Movements",
    "filepath": "./src/containers/inventoryTab.js"
  },
  {
    "id": "inventory.histogram.noDataText",
    "description": "Text when there is no stock",
    "defaultMessage": "No Stock Found",
    "filepath": "./src/containers/inventoryTab/inventoryHistogram.js"
  },
  {
    "id": "inventory.histogram.today",
    "description": "Text to show today",
    "defaultMessage": "Today's",
    "filepath": "./src/containers/inventoryTab/inventoryHistogram.js"
  },
  {
    "id": "itemCat.category.heading",
    "description": "Item category table's column category heading",
    "defaultMessage": "Category",
    "filepath": "./src/containers/inventoryTab/itemCategoryTable.js"
  },
  {
    "id": "itemCat.CBM.heading",
    "description": "Item category table's column CBM heading",
    "defaultMessage": "CBM Used",
    "filepath": "./src/containers/inventoryTab/itemCategoryTable.js"
  },
  {
    "id": "itemCat.daysOnHand.heading",
    "description": "Item category table's column days On Hand heading",
    "defaultMessage": "Days on Hand",
    "filepath": "./src/containers/inventoryTab/itemCategoryTable.js"
  },
  {
    "id": "logout.question",
    "description": "Text for logout question",
    "defaultMessage": "Are you sure you would like to log out now?",
    "filepath": "./src/containers/logoutTab.js"
  },
  {
    "id": "logout.cancel",
    "description": "Text for cancel",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/logoutTab.js"
  },
  {
    "id": "logout.done",
    "description": "Text for logout button",
    "defaultMessage": "Log out now",
    "filepath": "./src/containers/logoutTab.js"
  },
  {
    "id": "notification.table.description",
    "description": "Table first head",
    "defaultMessage": "Description",
    "filepath": "./src/containers/notifications/viewAllNotificationWrapper.js"
  },
  {
    "id": "notification.table.time",
    "description": "Table second head",
    "defaultMessage": "Time",
    "filepath": "./src/containers/notifications/viewAllNotificationWrapper.js"
  },
  {
    "id": "notification.all.head",
    "description": "Notification head",
    "defaultMessage": "Notifications",
    "filepath": "./src/containers/notifications/viewAllNotificationWrapper.js"
  },
  {
    "id": "notification.infinite.message",
    "description": "Infinite scroll message",
    "defaultMessage": "Loading More",
    "filepath": "./src/containers/notifications/viewAllNotificationWrapper.js"
  },
  {
    "id": "pickPerformance.dropdown",
    "description": "pickPerformance dropdown label",
    "defaultMessage": "PPS Pick Performance",
    "filepath": "./src/containers/orderStatsWidget.js"
  },
  {
    "id": "putPerformance.dropdown",
    "description": "putPerformance dropdown label",
    "defaultMessage": "PPS Put Performance",
    "filepath": "./src/containers/orderStatsWidget.js"
  },
  {
    "id": "auditPerformance.dropdown",
    "description": "auditPerformance dropdown label",
    "defaultMessage": "PPS Audit Performance",
    "filepath": "./src/containers/orderStatsWidget.js"
  },
  {
    "id": "order.inputField.id",
    "defaultMessage": "ORDER ID",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.token.status",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.token.timePeriod",
    "defaultMessage": "TIME PERIOD",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.all",
    "defaultMessage": "All orders",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.breach",
    "defaultMessage": "Breached orders",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.completed",
    "defaultMessage": "Completed orders",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.exep",
    "defaultMessage": "Exception",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.unfulfillable",
    "defaultMessage": "Unfulfillable",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.onhold",
    "defaultMessage": "On hold",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.cancelled",
    "defaultMessage": "Cancelled",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.STATUS.inprogress",
    "defaultMessage": "In Progress",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.all",
    "defaultMessage": "All",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.oneHr",
    "defaultMessage": "Last 1 hours",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.twoHR",
    "defaultMessage": "Last 2 hours",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.sixHr",
    "defaultMessage": "Last 6 hours",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.twoHr",
    "defaultMessage": "Last 12 hours",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "order.timePeriod.oneday",
    "defaultMessage": "Last 1 day",
    "filepath": "./src/containers/orderTab/orderFilter.js"
  },
  {
    "id": "orderList.progress.status",
    "description": "In 'progress message' for orders",
    "defaultMessage": "In Progress",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderList.completed.status",
    "description": "'Completed' status",
    "defaultMessage": "Completed",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderList.exception.status",
    "description": "'Exception' status",
    "defaultMessage": "Exception",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderList.Unfulfillable.status",
    "description": "'Unfulfillable' status",
    "defaultMessage": "Unfulfillable",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderlist.Refreshed.at",
    "description": "'Refreshed' status",
    "defaultMessage": "Last Updated",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderlistTab.orderListRefreshedat",
    "description": "Refresh Status text",
    "defaultMessage": "Last Updated",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "order.table.heading",
    "description": "Heading for order list",
    "defaultMessage": "OrderList",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "order.table.buttonLable",
    "description": "button label for refresh",
    "defaultMessage": "Refresh Data",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderlist.filter.search.bar",
    "description": "total order for filter search bar",
    "defaultMessage": "{total} Orders found",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "orderlist.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all orders",
    "filepath": "./src/containers/orderTab/orderListTab.js"
  },
  {
    "id": "table.filter.placeholder",
    "description": "placeholder for table filter",
    "defaultMessage": "Filter by keywords",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.allDrop",
    "description": "allOrders dropdown option for orderlist",
    "defaultMessage": "All orders",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.breachedDrop",
    "description": "breached dropdown option for orderlist",
    "defaultMessage": "Breached orders",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "pendingDrop.table.allDrop",
    "description": "pending dropdown option for orderlist",
    "defaultMessage": "Pending orders",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "completedDrop.table.allDrop",
    "description": "completed dropdown option for orderlist",
    "defaultMessage": "Completed orders",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "exceptionDrop.table",
    "description": "exception order dropdown for orderlist",
    "defaultMessage": "Exception",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.allTimeDrop",
    "description": "allTime dropdown option for orderlist",
    "defaultMessage": "All",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.oneHrDrop",
    "description": "oneHr dropdown option for orderlist",
    "defaultMessage": "Last 1 hours",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "pendingDrop.table.twoHrDrop",
    "description": "twoHr dropdown option for orderlist",
    "defaultMessage": "Last 2 hours",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "completedDrop.table.sixHrDrop",
    "description": "sixHr dropdown option for orderlist",
    "defaultMessage": "Last 6 hours",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "pendingDrop.table.twelveHrDrop",
    "description": "twelveHr dropdown option for orderlist",
    "defaultMessage": "Last 12 hours",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "completedDrop.table.oneDayDrop",
    "description": "oneDay dropdown option for orderlist",
    "defaultMessage": "Last 1 day",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.noData",
    "description": "No data message for orderlist table",
    "defaultMessage": "No Orders Found",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.order.headingText",
    "description": "Heading for order IDs in ordertable",
    "defaultMessage": "ORDER ID",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.subTotalorder",
    "description": "subtotal order for ordertable",
    "defaultMessage": "Total:{totalOrder}",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderList.table.status",
    "description": "Status for orders",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.pickBy",
    "description": "pick by for orderlist",
    "defaultMessage": "PICK BY",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.pendingOrders",
    "description": "pendingOrders header ordertable",
    "defaultMessage": "{pendingOrders, number} {pendingOrders, plural, one {order} other {orders}} pending",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.operatingMode",
    "description": "receivedTime for Orders",
    "defaultMessage": "RECEIVED TIME",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.completedTime",
    "description": "completedTime for orderlist",
    "defaultMessage": "COMPLETED",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.totalCompletedOrder",
    "description": "totalCompletedOrder header ordertable",
    "defaultMessage": "{totalCompletedOrder, number} {totalCompletedOrder, plural, one {order} other {orders}} completed",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.table.orderLine",
    "description": "orderLine for orderlist",
    "defaultMessage": "ORDER LINE",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "orderlist.itemsPerOrder",
    "description": "itemsPerOrder header ordertable",
    "defaultMessage": "Avg {itemsPerOrder, number} {itemsPerOrder, plural, one {item} other {items}}/order",
    "filepath": "./src/containers/orderTab/orderListTable.js"
  },
  {
    "id": "wave.inputField.id",
    "defaultMessage": "WAVE ID",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.token.status",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.STATUS.all",
    "defaultMessage": "All waves",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.STATUS.breach",
    "defaultMessage": "Breached",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.STATUS.pending",
    "defaultMessage": "Pending",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.STATUS.warning",
    "defaultMessage": "Warning",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "wave.STATUS.inprogress",
    "defaultMessage": "In progress",
    "filepath": "./src/containers/orderTab/waveFilter.js"
  },
  {
    "id": "waveDetail.id.prefix",
    "defaultMessage": "WAVE-{waveId}",
    "filepath": "./src/containers/orderTab/waveTab.js"
  },
  {
    "id": "waves.table.heading",
    "description": "Heading for waves",
    "defaultMessage": "Waves",
    "filepath": "./src/containers/orderTab/waveTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/orderTab/waveTab.js"
  },
  {
    "id": "waveList.filter.search.bar",
    "description": "total waves for filter search bar",
    "defaultMessage": "{total} Waves found",
    "filepath": "./src/containers/orderTab/waveTab.js"
  },
  {
    "id": "waveList.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Waves",
    "filepath": "./src/containers/orderTab/waveTab.js"
  },
  {
    "id": "waves.table.noData",
    "description": "No data message for waves table",
    "defaultMessage": "No Waves Found",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.heading",
    "description": "heading for WavesTable",
    "defaultMessage": "Waves",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.Totalwaves",
    "description": "total waves for WavesTable",
    "defaultMessage": "Total:{totalwave}",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.status",
    "description": "Status for waves",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.startTime",
    "description": "StartTime for butlerbot",
    "defaultMessage": "START TIME",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.pending.status",
    "description": "pending status for WavesTable",
    "defaultMessage": "{pendingWave, number} {pendingWave, plural, one {wave} other {waves}} pending",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.cutOffTime",
    "description": "cutOffTime for waves",
    "defaultMessage": "CUT-OFF TIME",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.progress.status",
    "description": "progress status for WavesTable",
    "defaultMessage": "{progressWave, number} {progressWave, plural, one {wave} other {waves}} in progress",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.ordersToFulfill",
    "description": "orders to fulfill for waves",
    "defaultMessage": "ORDERS TO FULFILL",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.orderRemaining.status",
    "description": "orderRemaining status for WavesTable",
    "defaultMessage": "{orderRemaining} remaining",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.progress",
    "description": "progress for waves",
    "defaultMessage": "PROGRESS(%)",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.completed.status",
    "description": "completed status for WavesTable",
    "defaultMessage": "{completedWaves, number} {completedWaves, plural, one {wave} other {waves}} completed",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "waves.table.totalOrders",
    "description": "totalOrders for waves",
    "defaultMessage": "TOTAL ORDERS",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "WavesTable.totalOrders.status",
    "description": "totalOrders status for WavesTable",
    "defaultMessage": "{totalOrders, number} {totalOrders, plural, one {order} other {orders}}",
    "filepath": "./src/containers/orderTab/waveTable.js"
  },
  {
    "id": "performanceParam.graph",
    "description": "Performance param graph",
    "defaultMessage": "items/hr",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "health.pps",
    "description": "pps health",
    "defaultMessage": "PPS",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "health.Butler",
    "description": "Butler bots health",
    "defaultMessage": "Butler bots",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "health.ChargingStation",
    "description": "Charging Stations health",
    "defaultMessage": "Charging Stations",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "systemHealth.dropdown",
    "description": "systemHealth dropdown label",
    "defaultMessage": "System Health",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "PPSpickPerformance.dropdown",
    "description": "PPSpickPerformance dropdown label",
    "defaultMessage": "PPS Pick Performance",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "PPSputPerformance.dropdown",
    "description": "PPSputPerformance dropdown label",
    "defaultMessage": "PPS Put Performance",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "PPSauditPerformance.dropdown",
    "description": "PPSauditPerformance dropdown label",
    "defaultMessage": "PPS Audit Performance",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "health.noData",
    "description": "pps graph nodata",
    "defaultMessage": "No Data",
    "filepath": "./src/containers/performanceWidget.js"
  },
  {
    "id": "widget.pick.headingleft",
    "description": "Heading for pick status widget",
    "defaultMessage": "Orders to fullfill",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.completed",
    "description": "Text for completed",
    "defaultMessage": "COMPLETED",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.none",
    "description": "Text for no orders",
    "defaultMessage": "None",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.idle",
    "description": "Pick PPS idle message",
    "defaultMessage": "{count} idle PPS (Pick mode)",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.throughput",
    "description": "Throughput message",
    "defaultMessage": "{count} PPS fullfilling at {throughput} items/hr",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.lowright",
    "description": "Estimated time",
    "defaultMessage": "Estimated to complete in {eta}",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.headingright",
    "description": "Heading for cut-off time",
    "defaultMessage": "Time to cut-off",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.textright",
    "description": "Time remaining",
    "defaultMessage": "{cut_off}",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.statusleft.onschedule",
    "description": "Text for on schedule",
    "defaultMessage": "On Schedule",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.statusleft.atrisk",
    "description": "Text for orders at risk",
    "defaultMessage": "{count_risk} {count_risk, plural, one {order} other {orders}} at risk",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.emergency",
    "description": "Message for system in emergency state",
    "defaultMessage": "--",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.statusleft.delay",
    "description": "Text for delay in orders",
    "defaultMessage": "Delayed",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.lowright.emergency",
    "description": "Estimated time",
    "defaultMessage": "Estimated to complete in --",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.pick.offline",
    "description": "Message for system offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/pickStatusWidget.js"
  },
  {
    "id": "widget.put.heading.value",
    "description": "Total Items Stocked",
    "defaultMessage": "None",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "widget.put.status.idle",
    "description": "Put PPS idle message",
    "defaultMessage": "{count} idle PPS (Put mode)",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "widget.put.throughput",
    "description": "Throughput message",
    "defaultMessage": "{count} {pluralMsg} stocking {throughput} items/hr",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "widget.put.offline",
    "description": "Message for system offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "widget.put.emergency",
    "description": "Message for system in emergency state",
    "defaultMessage": "--",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "widget.put.heading",
    "description": "Put Item Heading",
    "defaultMessage": "Items stocked",
    "filepath": "./src/containers/putStatusWidget.js"
  },
  {
    "id": "butletbot.inputField.id",
    "defaultMessage": "BOT ID",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.inputField.sku",
    "defaultMessage": "SPECIFIC LOCATION/ZONE",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.tokenfield.STATUS",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.tokenfield.MODE",
    "defaultMessage": "MODE",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.stopped",
    "defaultMessage": "Stopped",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.error",
    "defaultMessage": "Error",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.warning",
    "defaultMessage": "Warning",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.Online",
    "defaultMessage": "Online",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token1.Offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.any",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.pick",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.put",
    "defaultMessage": "Put",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.audit",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.charging",
    "defaultMessage": "Charging",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butletbot.token2.notSet",
    "defaultMessage": "Not set",
    "filepath": "./src/containers/systemTabs/butlerBotFilter.js"
  },
  {
    "id": "butlerDetail.name.prefix",
    "description": "prefix for butler id",
    "defaultMessage": "BOT - {botId}",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "pps.name.prefix",
    "description": "prefix for pps id",
    "defaultMessage": "PPS {ppsId}",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "charger.name.prefix",
    "description": "prefix for charger id",
    "defaultMessage": "CS - {csId}",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "msu.name.prefix",
    "description": "prefix for msu id",
    "defaultMessage": "MSU - {msuId}",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "audit.name.prefix",
    "description": "prefix for audit",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "pick.name.prefix",
    "description": "prefix for Pick",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "Put.name.prefix",
    "description": "prefix for put",
    "defaultMessage": "Put",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "Charging.name.prefix",
    "description": "prefix for Charging",
    "defaultMessage": "Charging",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "Move.name.prefix",
    "description": "prefix for Charging",
    "defaultMessage": "Move",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "moving.task",
    "description": "moving task",
    "defaultMessage": "Moving to",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "movingMount.task",
    "description": "movingMount task",
    "defaultMessage": "Moving to mount",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "movingDismount.task",
    "description": "movingDismount task",
    "defaultMessage": "Moving to dismount",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "docked.task",
    "description": "docked task",
    "defaultMessage": "Docked at",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "butlerBot.table.heading",
    "description": "Heading for butlerbot",
    "defaultMessage": "Butler Bots",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "botList.filter.search.bar",
    "description": "total bots for filter search bar",
    "defaultMessage": "{total} Bots found",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "botList.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Bots",
    "filepath": "./src/containers/systemTabs/butlerbotTab.js"
  },
  {
    "id": "butlerbot.table.noData",
    "description": "No data message for butlerbot table",
    "defaultMessage": "No Butler Bot Found",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.TotalBot",
    "description": "Column name for the Bot id in bot table",
    "defaultMessage": "BOTS",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.subTotalBot",
    "description": "sub text for totalbot ButlerBotTable",
    "defaultMessage": "Total: {totalBot}",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "butlerBot.table.status",
    "description": "Status for butlerbot",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.status",
    "description": "status for ButlerBotTable",
    "defaultMessage": "{onlineBots} Online",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "butlerBot.table.currentTask",
    "description": "Current task for butlerbot",
    "defaultMessage": "CURRENT TASK",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.botState",
    "description": "bot state for ButlerBotTable",
    "defaultMessage": "Pick ({pick}) . Put ({put}) . Charging ({charging}) . Idle ({idle})",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "butlerBot.table.msu",
    "description": "MSU Status for butlerbot",
    "defaultMessage": "MSU MOUNTED",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.mounted",
    "description": "msu mounted for ButlerBotTable",
    "defaultMessage": "{msuMounted} Mounted",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "butlerBot.table.location",
    "description": "Location for butlerbot",
    "defaultMessage": "LOCATION",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.locations",
    "description": "msu Location for ButlerBotTable",
    "defaultMessage": "{locations} Locations",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "butlerBot.table.voltage",
    "description": "voltage for butlerbot",
    "defaultMessage": "VOLTAGE",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "ButlerBotTable.avgVoltage",
    "description": "avgVoltage for ButlerBotTable",
    "defaultMessage": "Avg {voltage}",
    "filepath": "./src/containers/systemTabs/butlerbotTable.js"
  },
  {
    "id": "charging.inputField.id",
    "defaultMessage": "CHARGING STATION ID",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.token.status",
    "defaultMessage": "DOCKING STATUS",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.token.timePeriod",
    "defaultMessage": "OPERATING MODE",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.STATUS.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.STATUS.breach",
    "defaultMessage": "Connected",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.STATUS.pending",
    "defaultMessage": "Disconnected",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.timePeriod.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.timePeriod.oneHr",
    "defaultMessage": "Manual",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "charging.timePeriod.twoHR",
    "defaultMessage": "Auto",
    "filepath": "./src/containers/systemTabs/chargingStationFilter.js"
  },
  {
    "id": "chargersDetail.name.prefix",
    "description": "prefix for cs id in chargersDetail",
    "defaultMessage": "Charging Stations - {csId}",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "chargersDetail.butler.prefix",
    "description": "prefix for butler id in chargersDetail",
    "defaultMessage": "Butler - {botId}",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "ChargingStations.table.heading",
    "description": "Heading for ChargingStations",
    "defaultMessage": "Charging Stations",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "ChargingStationsTable.filter.search.bar",
    "description": "total stations for filter search bar",
    "defaultMessage": "{total} Stations found",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "ChargingStationsTable.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Stations",
    "filepath": "./src/containers/systemTabs/chargingStationsTab.js"
  },
  {
    "id": "ChargingStations.table.noData",
    "description": "No data message for ChargingStations table",
    "defaultMessage": "No Charging Stations Found",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStationsTable.stationID.heading",
    "description": "StationID heading",
    "defaultMessage": "STATION ID",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStationsTable.SubstationID",
    "description": "total SubStationID for ChargingStationsTable",
    "defaultMessage": "Total:{rowsCount}",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStations.table.STATUS",
    "description": "STATUS for ChargingStations",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "csTable.status",
    "description": "status for cs table",
    "defaultMessage": "{csConnected} connected",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStations.table.operatingMode",
    "description": "operatingMode for ChargingStations",
    "defaultMessage": "OPERATING MODE",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStationsTable.mode",
    "description": "cs mode for ChargingStationsTable",
    "defaultMessage": "Manual ({manual}) . Auto ({auto})",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStations.table.connectedBots",
    "description": "connectedBots for ChargingStations",
    "defaultMessage": "BOTS CONNECTED",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ChargingStationsTable.totalBots",
    "description": "total bots ChargingStationsTable",
    "defaultMessage": "{totalBots} bots connected",
    "filepath": "./src/containers/systemTabs/chargingStationsTable.js"
  },
  {
    "id": "ppsclose.tblhead1.text",
    "description": "Table first head",
    "defaultMessage": "SLOT ID",
    "filepath": "./src/containers/systemTabs/closePPSList.js"
  },
  {
    "id": "ppsclose.tblhead2.text",
    "description": "Table second head",
    "defaultMessage": "MSU Pending",
    "filepath": "./src/containers/systemTabs/closePPSList.js"
  },
  {
    "id": "ppsclose.tblhead3.text",
    "description": "Table third head",
    "defaultMessage": "ACTION",
    "filepath": "./src/containers/systemTabs/closePPSList.js"
  },
  {
    "id": "pps.close.cancel",
    "description": "Text for cancel close",
    "defaultMessage": "CANCEL",
    "filepath": "./src/containers/systemTabs/closePPSList.js"
  },
  {
    "id": "pps.close.confirm",
    "description": "Text for close confirm",
    "defaultMessage": "CONFIRM",
    "filepath": "./src/containers/systemTabs/closePPSList.js"
  },
  {
    "id": "pps.configuration.confirm.apply.profile",
    "description": "Apply Profile to PPS",
    "defaultMessage": "Are you sure you want to change the profile?",
    "filepath": "./src/containers/systemTabs/confirmApplyProfile.js"
  },
  {
    "id": "pps.configuration.confirm.apply.cancel",
    "description": "Cancel apply Profile to PPS",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/systemTabs/confirmApplyProfile.js"
  },
  {
    "id": "pps.configuration.confirm.change.profile",
    "description": "Change Profile to PPS",
    "defaultMessage": "Change",
    "filepath": "./src/containers/systemTabs/confirmApplyProfile.js"
  },
  {
    "id": "pps.configuration.create.profile.header",
    "description": "Save a new profile",
    "defaultMessage": "Save a new profile",
    "filepath": "./src/containers/systemTabs/createPPSProfile.js"
  },
  {
    "id": "pps.configuration.create.profile.name.label",
    "description": "New Profile Name",
    "defaultMessage": "New Profile Name",
    "filepath": "./src/containers/systemTabs/createPPSProfile.js"
  },
  {
    "id": "pps.configuration.create.profile.cancel",
    "description": "Cancel",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/systemTabs/createPPSProfile.js"
  },
  {
    "id": "pps.configuration.create.profile.button.text",
    "description": "Save A New Profile",
    "defaultMessage": "Save A New Profile",
    "filepath": "./src/containers/systemTabs/createPPSProfile.js"
  },
  {
    "id": "NotificationTable.table.heading",
    "description": "Heading for NotificationTable",
    "defaultMessage": "Notifications",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "NotificationTable.table.component",
    "description": "component for NotificationTable",
    "defaultMessage": "COMPONENT",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "Notifications.table.status",
    "description": "Status for NotificationTable",
    "defaultMessage": "EVENT TYPE",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "NotificationTable.table.description",
    "description": "description for current component",
    "defaultMessage": "DESCRIPTION",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "NotificationTable.table.remark",
    "description": "remark for component",
    "defaultMessage": "REMARKS",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "NotificationTable.table.location",
    "description": "Starting Time for Component",
    "defaultMessage": "TIME",
    "filepath": "./src/containers/systemTabs/notificationTable.js"
  },
  {
    "id": "pps.configuration.bins.selection.label",
    "description": "Select a bin to manage tags",
    "defaultMessage": "Select a bin to manage tags",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.direction.label",
    "description": "Bin Direction",
    "defaultMessage": "Current PPS Selection",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.direction.left",
    "description": "Bin Direction LEFT",
    "defaultMessage": "LEFT",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.direction.right",
    "description": "Bin Direction RIGHT",
    "defaultMessage": "RIGHT",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.selection.count",
    "description": "total users for filter search bar",
    "defaultMessage": "Select a bin to activate or deactivate ({deactivated}/{total} bins deactivated)",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.group.selection.count",
    "description": "total users for filter search bar",
    "defaultMessage": "Select a bin group to enable or disable ({disabled}/{total} groups disabled)",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.tagCount.text",
    "description": "Tag",
    "defaultMessage": "Tag",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.activation.button.text",
    "description": "ACTIVATE",
    "defaultMessage": "ACTIVATE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.deactivation.button.text",
    "description": "DEACTIVATE",
    "defaultMessage": "DEACTIVATE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.group.enable.button.text",
    "description": "ENABLE",
    "defaultMessage": "ENABLE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.bins.group.disable.button.text",
    "description": "DISABLE",
    "defaultMessage": "DISABLE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationBins.js"
  },
  {
    "id": "pps.configuration.header.text",
    "description": "PPS Configurations",
    "defaultMessage": "PPS Configurations",
    "filepath": "./src/containers/systemTabs/ppsConfigurationList.js"
  },
  {
    "id": "pps.configuration.applied.text",
    "description": "Applied",
    "defaultMessage": "Applied",
    "filepath": "./src/containers/systemTabs/ppsConfigurationList.js"
  },
  {
    "id": "pps.configuration.requested.text",
    "description": "Requested",
    "defaultMessage": "Requested",
    "filepath": "./src/containers/systemTabs/ppsConfigurationList.js"
  },
  {
    "id": "pps.configuration.profileAplied.text",
    "description": "profile applied",
    "defaultMessage": "profile applied",
    "filepath": "./src/containers/systemTabs/ppsConfigurationList.js"
  },
  {
    "id": "pps.configuration.bins.tags.label",
    "description": "Assign tags to bin",
    "defaultMessage": "Assign tags to bin",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.bins.activation.label",
    "description": "Bin activate/deactivate",
    "defaultMessage": "Bin activate/deactivate",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.group.activation.label",
    "description": "Bin group enable/disable",
    "defaultMessage": "Bin group enable/disable",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.bins.frontView.label",
    "description": "Front View",
    "defaultMessage": "Front View",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.cancel.text",
    "description": "CANCEL",
    "defaultMessage": "CANCEL",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.next.text",
    "description": "NEXT",
    "defaultMessage": "NEXT",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.saveApply.text",
    "description": "SAVE AND APPLY",
    "defaultMessage": "SAVE AND APPLY",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.back.text",
    "description": "BACK",
    "defaultMessage": "BACK",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.saveNewProfile.text",
    "description": "SAVE AS NEW PROFILE",
    "defaultMessage": "SAVE AS NEW PROFILE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.configuration.buttons.save.text",
    "description": "SAVE",
    "defaultMessage": "SAVE",
    "filepath": "./src/containers/systemTabs/ppsConfigurationTab.js"
  },
  {
    "id": "pps.inputField.id",
    "defaultMessage": "PPS ID",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.inputField.oprator",
    "defaultMessage": "OPERATOR ASSIGNED",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.token.status",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.token.timePeriod",
    "defaultMessage": "MODE",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.STATUS.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.STATUS.stopped",
    "defaultMessage": "Open",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.STATUS.error",
    "defaultMessage": "Close",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.STATUS.fclose",
    "defaultMessage": "Force Close",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.MODE.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.MODE.pick",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.MODE.put",
    "defaultMessage": "Put",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "pps.MODE.audit",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "v.MODE.notset",
    "defaultMessage": "Not set",
    "filepath": "./src/containers/systemTabs/ppsFilter.js"
  },
  {
    "id": "ppsDetail.name.prefix",
    "description": "prefix for pps id in ppsDetail",
    "defaultMessage": "PPS-{ppsId}",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "ppsDetail.performance.prefix.items",
    "description": "prefix for pps id in ppsDetail",
    "defaultMessage": "{performance} items/hr",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "pps.close.heading",
    "description": "Heading for Close PPS",
    "defaultMessage": "Close PPS",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.pickDrop",
    "description": "pick dropdown option for PPS",
    "defaultMessage": "Put",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.putDrop",
    "description": "put dropdown option for PPS",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.auditDrop",
    "description": "audit dropdown option for PPS",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.openStatusLabel",
    "description": "audit dropdown option for Status change",
    "defaultMessage": "Open Selected PPS",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.closeStatusLabel",
    "description": "audit dropdown option for Status change",
    "defaultMessage": "Close Selected PPS",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.statusPlaceholder",
    "description": "Placeholder for status dropdown",
    "defaultMessage": "Change PPS Status",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPS.table.modePlaceholder",
    "description": "Placeholder for mode dropdown",
    "defaultMessage": "Change PPS Mode",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "pps.table.heading",
    "description": "Heading for PPS",
    "defaultMessage": "Pick Put Stations",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "PPStable.selected",
    "description": "selected pps for ppsSelected",
    "defaultMessage": "{selected} selected",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "ppsList.filter.search.bar",
    "description": "total pps for filter search bar",
    "defaultMessage": "{total} Stations found",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "ppsList.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Stations",
    "filepath": "./src/containers/systemTabs/ppsTab.js"
  },
  {
    "id": "pps.dropdown.placeholder",
    "description": "mode change for pps",
    "defaultMessage": "Change PPS Mode",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.table.noData",
    "description": "No data message for PPStable",
    "defaultMessage": "No PPS Found",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.ppsColumn.heading",
    "description": "PPS - column Heading",
    "defaultMessage": "PPS",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.Subpps",
    "description": "sub pps",
    "defaultMessage": "Total: {ppsTotal}",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.status",
    "description": "Status for PPS",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.status",
    "description": "status for PPS table",
    "defaultMessage": "{ppsOnState} Open",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.operatingMode",
    "description": "operatingMode for PPS",
    "defaultMessage": "CURRENT MODE",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.ppsState",
    "description": "pps state for PPStable",
    "defaultMessage": "Pick ({pick}) . Put ({put}) . Audit ({audit}) . Not set ({notSet})",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.requestedMode.text",
    "description": "PPStable.requestedMode.text",
    "defaultMessage": "Requested Mode:",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.requestedStatus",
    "description": "Requested status for PPS",
    "defaultMessage": "REQUESTED STATUS",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.performance",
    "description": "performance Status for PPS",
    "defaultMessage": "PERFORMANCE",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.avgThroughput",
    "description": "avgThroughput for PPStable",
    "defaultMessage": "Avg {avgThroughput} items/hr",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.operatorAssigned",
    "description": "operatorAssigned for PPS",
    "defaultMessage": "OPERATOR ASSIGNED",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPStable.totalOperator",
    "description": "totalOperator for PPStable",
    "defaultMessage": "{operatorNum} operators",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "PPS.table.profiles",
    "description": "profiles for PPS",
    "defaultMessage": "PROFILES USED",
    "filepath": "./src/containers/systemTabs/PPStable.js"
  },
  {
    "id": "pps.configuration.confirm.saveAndapply.profile",
    "description": "Save and ppply Profile to PPS",
    "defaultMessage": "Are you sure you want to save and apply the profile?",
    "filepath": "./src/containers/systemTabs/saveApplyProfile.js"
  },
  {
    "id": "pps.configuration.confirm.apply.cancel",
    "description": "Cancel apply Profile to PPS",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/systemTabs/saveApplyProfile.js"
  },
  {
    "id": "pps.configuration.confirm.saveAndApply.profile",
    "description": "Save and Apply Profile to PPS",
    "defaultMessage": "SAVE AND APPLY",
    "filepath": "./src/containers/systemTabs/saveApplyProfile.js"
  },
  {
    "id": "sysController.table.heading",
    "description": "Heading for PPS",
    "defaultMessage": "System Controllers",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.summary.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Zones",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysControllers.idColumn.heading",
    "description": "CONTROLLER ID",
    "defaultMessage": "CONTROLLER ID",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.status",
    "description": "Status for PPS",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.location",
    "description": "Location",
    "defaultMessage": "LOCATION",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.conDetails",
    "description": "Status for PPS",
    "defaultMessage": "CONNECTION DETAILS",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.ethernetStatus",
    "description": "sysController.table.ethernetStatus",
    "defaultMessage": "Ethernet Network:",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.zigbeeStatus",
    "description": "sysController.table.zigbeeStatus",
    "defaultMessage": "Zigbee Network:",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysController.table.operatingMode",
    "description": "Status for PPS",
    "defaultMessage": "OPERATING MODE",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysControllers.table.noData",
    "description": "No data message for PPStable",
    "defaultMessage": "No Controllers Found",
    "filepath": "./src/containers/systemTabs/sysControllers.js"
  },
  {
    "id": "sysOverView.zones.count",
    "description": "Zone status count",
    "defaultMessage": "{activeZones}/{totalZones} Operating Zones",
    "filepath": "./src/containers/systemTabs/sysOverview.js"
  },
  {
    "id": "pps.configuration.tag.search.placeholder",
    "defaultMessage": "Enter a tag...",
    "filepath": "./src/containers/systemTabs/tags.js"
  },
  {
    "id": "pps.configuration.tags.label",
    "description": "Tags",
    "defaultMessage": "Tags",
    "filepath": "./src/containers/systemTabs/tags.js"
  },
  {
    "id": "pps.configuration.tags.searchResults.text",
    "description": "Search Results",
    "defaultMessage": "Search Results",
    "filepath": "./src/containers/systemTabs/tags.js"
  },
  {
    "id": "pps.configuration.tags.all.text",
    "description": "All Tags",
    "defaultMessage": "All Tags",
    "filepath": "./src/containers/systemTabs/tags.js"
  },
  {
    "id": "pps.configuration.tags.add.text",
    "description": "Add",
    "defaultMessage": "Add",
    "filepath": "./src/containers/systemTabs/tags.js"
  },
  {
    "id": "tabs.offline",
    "description": "offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "overview.tab.heading",
    "description": "overview tab",
    "defaultMessage": "OVERVIEW",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "system.tab.heading",
    "description": "system tab",
    "defaultMessage": "SYSTEM",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "orders.tab.heading",
    "description": "orders tab",
    "defaultMessage": "ORDERS",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "users.tab.heading",
    "description": "users tab",
    "defaultMessage": "USERS",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "inventory.tab.heading",
    "description": "inventory tab",
    "defaultMessage": "INVENTORY",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "audit.tab.heading",
    "description": "audit tab",
    "defaultMessage": "AUDIT",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "utilities.tab.heading",
    "description": "audit tab",
    "defaultMessage": "UTILITIES",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "overviewStatus.tab.fulfilling",
    "description": "overview Status fulfilling orders",
    "defaultMessage": "Fulfilling orders",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "overviewStatus.tab.default",
    "description": "default overview Status",
    "defaultMessage": "None",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "overviewStatus.tab.stop",
    "description": "overview Status emergency",
    "defaultMessage": "STOPPED",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "systemStatus.tab.online",
    "description": "system Status online",
    "defaultMessage": "Online",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "ordersStatus.tab.heading",
    "description": "orders Status",
    "defaultMessage": "{count}% fulfilled",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "usersStatus.tab.heading#",
    "description": "users Status",
    "defaultMessage": "{count} {count, plural, =0 {user} one {user} other {users}} online",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "inventoryStatus.tab.heading",
    "description": "inventory Status",
    "defaultMessage": "{count}% space utilized",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "auditStatus.tab.heading",
    "description": "audit Status",
    "defaultMessage": "{count} in progress",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "auditStatus.tab.alert.heading",
    "description": "audit Status alert",
    "defaultMessage": "{count} {count, plural, one {alert} other {alerts}}",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "operation.alert.resumed",
    "description": "Text to resume operation",
    "defaultMessage": "All operation has been resumed to normal state.",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "operation.alert.triggeremergency",
    "description": "Text button to trigger emergency",
    "defaultMessage": "Fire emergency triggered.Follow evacuation procedures immediately",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "operation.alert.toastifydetails",
    "description": "Text button to viewdetails",
    "defaultMessage": "VIEW DETAILS",
    "filepath": "./src/containers/tabs.js"
  },
  {
    "id": "userDetails.operator",
    "defaultMessage": "Operator",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.manager",
    "defaultMessage": "Manager",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.pick.status",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "auditdetail.completed.status",
    "defaultMessage": "Completed",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.put.status",
    "defaultMessage": "Put",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.audit.status",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.front.status",
    "defaultMessage": "Front",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.back.status",
    "defaultMessage": "Back",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.online.status",
    "defaultMessage": "Online",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.offline.status",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "userDetails.location",
    "defaultMessage": "PPS {ppsId}",
    "filepath": "./src/containers/usersTab.js"
  },
  {
    "id": "users.add.heading",
    "description": "Heading for Add new user",
    "defaultMessage": "Add new user",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.subheading",
    "description": "Subheading for add new user",
    "defaultMessage": "All the fields are mandatory",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.userdetails.heading",
    "description": "Text for user details heading",
    "defaultMessage": "Enter User details",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.userdetails.subheading",
    "description": "Text for user details subheading",
    "defaultMessage": "A User ID will be required to log into the system",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.userdetails.userid",
    "description": "Text for user id",
    "defaultMessage": "User ID",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.userdetails.firstname",
    "description": "Text for first name",
    "defaultMessage": "First Name",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.userdetails.lastname",
    "description": "Text for last name",
    "defaultMessage": "Last Name",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.password.heading",
    "description": "Heading for create password",
    "defaultMessage": "Create password",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.password.field1",
    "description": "Text for password",
    "defaultMessage": "Password",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.password.field2",
    "description": "Text for confirm password",
    "defaultMessage": "Confirm Password",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.add.password.button",
    "description": "Text for add new user button",
    "defaultMessage": "Add new user",
    "filepath": "./src/containers/userTab/addNewUser.js"
  },
  {
    "id": "users.delete.heading",
    "description": "Text for user delete heading",
    "defaultMessage": "Are you sure you would like to delete \"{user_name}\" ?",
    "filepath": "./src/containers/userTab/deleteUser.js"
  },
  {
    "id": "users.delete.subheading",
    "description": "Text for user delete subheading",
    "defaultMessage": "Information related to the user will be lost",
    "filepath": "./src/containers/userTab/deleteUser.js"
  },
  {
    "id": "users.delete.cancel",
    "description": "Text for Cancel button",
    "defaultMessage": "Cancel",
    "filepath": "./src/containers/userTab/deleteUser.js"
  },
  {
    "id": "users.delete.confirm",
    "description": "Text for Delete button",
    "defaultMessage": "Delete",
    "filepath": "./src/containers/userTab/deleteUser.js"
  },
  {
    "id": "users.edit.heading",
    "description": "Heading for Edit user",
    "defaultMessage": "Edit user",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.subheading",
    "description": "Subheading for Edit user",
    "defaultMessage": "All the fields are mandatory",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.userdetails.heading",
    "description": "Text for user details heading",
    "defaultMessage": "Enter User details",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.userdetails.subheading",
    "description": "Text for user details subheading",
    "defaultMessage": "A User ID will be required to log into the system",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.userdetails.userid",
    "description": "Text for user id",
    "defaultMessage": "User ID",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.userdetails.firstname",
    "description": "Text for first name",
    "defaultMessage": "First Name",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.userdetails.lastname",
    "description": "Text for last name",
    "defaultMessage": "Last Name",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.changepassword.heading",
    "description": "Heading for Change password",
    "defaultMessage": "Change password",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.changepassword.subheading",
    "description": "Subheading for create password",
    "defaultMessage": "New password will be effective when user log-in next time",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.password.field1",
    "description": "Text for password",
    "defaultMessage": "Password",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.password.field2",
    "description": "Text for confirm password",
    "defaultMessage": "Confirm Password",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.password.",
    "description": "Heading for Password",
    "defaultMessage": "New Password",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.password.query",
    "description": "Text for change password",
    "defaultMessage": "Change Password",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.edit.password.button",
    "description": "Text for edit user button",
    "defaultMessage": "Save",
    "filepath": "./src/containers/userTab/editUser.js"
  },
  {
    "id": "users.add.roledetails.heading",
    "description": "Heading for role",
    "defaultMessage": "Choose a role",
    "filepath": "./src/containers/userTab/roleGroup.js"
  },
  {
    "id": "users.add.roledetails.subheading",
    "description": "Subheading for role",
    "defaultMessage": "User will be given a specific level of control over the Butler system depending on the designated role",
    "filepath": "./src/containers/userTab/roleGroup.js"
  },
  {
    "id": "user.inputField.id",
    "defaultMessage": "USER NAME",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.role.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.tokenfield.status",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.tokenfield.role",
    "defaultMessage": "ROLE",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.tokenfield.mode",
    "defaultMessage": "WORK MODE",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.tokenfield.location",
    "defaultMessage": "LOCATION",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.status.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.status.online",
    "defaultMessage": "Online",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.status.offline",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.pickfront",
    "defaultMessage": "Pick Front",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.pickback",
    "defaultMessage": "Pick Back",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.putfront",
    "defaultMessage": "Put Front",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.putback",
    "defaultMessage": "Put Back",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.audit",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.workmode.management",
    "defaultMessage": "Management",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.location.all",
    "defaultMessage": "Any",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.location.issueFound",
    "defaultMessage": "Pick Put Station",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.location.rejected",
    "defaultMessage": "QC Station",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "user.location.resolved",
    "defaultMessage": "Head Office",
    "filepath": "./src/containers/userTab/userFilter.js"
  },
  {
    "id": "users.roles.info.heading",
    "description": "Heading for roles description",
    "defaultMessage": "Role definitions",
    "filepath": "./src/containers/userTab/userRoles.js"
  },
  {
    "id": "users.add.roledetails.heading",
    "description": "Heading for role",
    "defaultMessage": "Choose a role",
    "filepath": "./src/containers/userTab/userRoles.js"
  },
  {
    "id": "users.add.roledetails.subheading",
    "description": "Subheading for role",
    "defaultMessage": "User will be given a specific level of control over the Butler system depending on the designated role",
    "filepath": "./src/containers/userTab/userRoles.js"
  },
  {
    "id": "userDetails.operator",
    "defaultMessage": "Operator",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.manager",
    "defaultMessage": "Manager",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.pick.status",
    "defaultMessage": "Pick",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "auditdetail.completed.status",
    "defaultMessage": "Completed",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.put.status",
    "defaultMessage": "Put",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.audit.status",
    "defaultMessage": "Audit",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.front.status",
    "defaultMessage": "Front",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.back.status",
    "defaultMessage": "Back",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.online.status",
    "defaultMessage": "Online",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.offline.status",
    "defaultMessage": "Offline",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userDetails.location",
    "defaultMessage": "PPS {ppsId}",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "user.table.heading",
    "description": "Heading for users table",
    "defaultMessage": "Users",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "user.button.heading",
    "description": "button heading for users table",
    "defaultMessage": "Add new user",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "gor.filter.filterLabel",
    "description": "button label for filter",
    "defaultMessage": "Filter data",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userList.filter.search.bar",
    "description": "total users for filter search bar",
    "defaultMessage": "{totalUsers} Users found",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "userList.filter.search.bar.showall",
    "description": "button label for show all",
    "defaultMessage": "Show all Users",
    "filepath": "./src/containers/userTab/usersTab.js"
  },
  {
    "id": "user.table.noData",
    "description": "No data message for user table",
    "defaultMessage": "No User Found",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.usersCount",
    "description": "Users Column",
    "defaultMessage": "{rowsCount} USERS",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.status",
    "description": "Users Status",
    "defaultMessage": "STATUS",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.role",
    "description": "User Role",
    "defaultMessage": "ROLE",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.workMode",
    "description": "User Workmode",
    "defaultMessage": "WORKMODE",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.location",
    "description": "User location",
    "defaultMessage": "LOCATION",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.logInTime",
    "description": "User log in time",
    "defaultMessage": "LOG IN TIME",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "user.table.action",
    "description": "action Column",
    "defaultMessage": "ACTIONS",
    "filepath": "./src/containers/userTab/userTabTable.js"
  },
  {
    "id": "utility.masterData.head",
    "description": "Master data upload",
    "defaultMessage": "Master data upload",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.scriptsTile.head",
    "description": "Run Script",
    "defaultMessage": "Run Script",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadReport.head",
    "description": "Download Reports",
    "defaultMessage": "Download Reports",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadRprts.CategoryLabel",
    "description": "Category",
    "defaultMessage": "Category",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadRprts.CategoryPlchldr",
    "description": "Select Category",
    "defaultMessage": "Select Category",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadRprts.FileFormatPlchldr",
    "description": "Select File Format",
    "defaultMessage": "Select File Format",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadRprts.FileFormatLabel",
    "description": "File Format",
    "defaultMessage": "File Format",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.downloadRports.csvFormat",
    "description": "Comma separated values (csv)",
    "defaultMessage": "Comma separated values (csv)",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utiltiy.downloadRports.xlsFormat",
    "description": "ExceL Spreadsheet (xlsx)",
    "defaultMessage": "ExceL Spreadsheet (xlsx)",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.goodsRcvdNotes.head",
    "description": "Goods Received Notes",
    "defaultMessage": "Goods Received Notes",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedgerHead.head",
    "description": "Inventory Stock Ledger",
    "defaultMessage": "Inventory Stock Ledger",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedgerRawTransactionHead.head",
    "description": "Stock Ledger Raw Transactions",
    "defaultMessage": "Stock Ledger Raw Transactions",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.uploadBtn.label",
    "description": "Upload Master Data",
    "defaultMessage": "Upload Master Data",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.category.all",
    "description": "all",
    "defaultMessage": "All",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.category.sku",
    "description": "sku",
    "defaultMessage": "Specific SKU",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.incorrectSku",
    "description": "Please enter correct SKU",
    "defaultMessage": "Please enter correct SKU",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.duration.label",
    "description": "Time Duration:",
    "defaultMessage": "Time Duration:",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.duration.today",
    "description": "Today",
    "defaultMessage": "Today",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedger.duration.yesterday",
    "description": "Yesterday",
    "defaultMessage": "Yesterday",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "utility.stockLedgerRawTransaction.duration.today",
    "description": "today",
    "defaultMessage": "Today",
    "filepath": "./src/containers/utilityTab.js"
  },
  {
    "id": "butlerDetail.online.status",
    "description": "online status for butlerDetail",
    "defaultMessage": "Online",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "butlerDetail.offline.status",
    "description": "offline status for butlerDetail",
    "defaultMessage": "Offline",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "butlerDetail.name.prefix",
    "description": "prefix for butler id",
    "defaultMessage": "BOT - {botId}",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "pps.name.prefix",
    "description": "prefix for pps id",
    "defaultMessage": "PPS - {ppsId}",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "charger.name.prefix",
    "description": "prefix for charger id",
    "defaultMessage": "CS - {csId}",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "msu.name.prefix",
    "description": "prefix for msu id",
    "defaultMessage": "MSU - {msuId}",
    "filepath": "./src/reducers/butlerDetailReducer.js"
  },
  {
    "id": "notify.success.add",
    "description": "Text for successfull user addition",
    "defaultMessage": "New user \"{first} {last}\" added successfully",
    "filepath": "./src/utilities/codeToString.js"
  },
  {
    "id": "notify.success.delete",
    "description": "Text for successfull user deletion",
    "defaultMessage": "User \"{first} {last}\" deleted successfully",
    "filepath": "./src/utilities/codeToString.js"
  },
  {
    "id": "notify.delete.audit.success",
    "description": "Text for successfull audit deletion",
    "defaultMessage": "Audit task {audit_id} has been deleted",
    "filepath": "./src/utilities/codeToString.js"
  },
  {
    "id": "pps.mode.reject",
    "description": "PPS mode change reject",
    "defaultMessage": "{unsuccessful}/{totalCount} mode change request rejected",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "pps.mode.success",
    "description": "PPS mode change success",
    "defaultMessage": "Mode change request successfull",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "pps.status.reject",
    "description": "PPS status change reject",
    "defaultMessage": "{unsuccessful}/{totalCount} status change request rejected",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "pps.status.success",
    "description": "PPS status change success",
    "defaultMessage": "Status change request successfull",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "utility.downloadGRN.generateSuccess",
    "description": "GRN Request submitted successfully",
    "defaultMessage": "GRN Request submitted successfully",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "utility.downloadInventory.generateSuccess",
    "description": "Inventory Report Request submitted successfully",
    "defaultMessage": "Inventory Report Request submitted successfully",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "utility.downloadGRN.refreshed",
    "description": "GRN History Refreshed!",
    "defaultMessage": "GRN History Refreshed!",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "utility.downloadReprt.refreshed",
    "description": "Reports History Refreshed!",
    "defaultMessage": "Reports History Refreshed!",
    "filepath": "./src/utilities/getFormattedMessages.js"
  },
  {
    "id": "audit.resolve.success",
    "description": "Text for resolved audit lines",
    "defaultMessage": "Audit task {auditId} with {auditType} - {auditTypeValue} has been approved",
    "filepath": "./src/utilities/statusToString.js"
  },
  {
    "id": "audit.resolve.rejected",
    "description": "Text for rejected audit lines",
    "defaultMessage": "Audit task {auditId} with {auditType} - {auditTypeValue} has been rejected",
    "filepath": "./src/utilities/statusToString.js"
  },
  {
    "id": "utility.item.recall",
    "description": "Item recall message",
    "defaultMessage": "{itemCount} expired items recalled",
    "filepath": "./src/utilities/statusToString.js"
  }
]