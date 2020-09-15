import {
  SPECIFIC_SKU_ID,
  SPECIFIC_LOCATION_ID,
  AUDIT_TASK_ID
} from "../constants/frontEndConstants"
/**
 * Capitalize first letter of string
 * @private
 * @param  {string} - String
 * @return {string} - String with first letter capitalized
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

/**
 * Clamp position between a range
 * @param  {number} - Value to be clamped
 * @param  {number} - Minimum value in range
 * @param  {number} - Maximum value in range
 * @return {number} - Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Save a blob object to a filename
 * @param  {Object} data     Data to be saved as file
 * @param  {String} fileName Name of the file to be saved
 */
export function saveFile(data, fileName) {
  var a = document.createElement("a")
  a.style = "display: none"
  document.body.appendChild(a)
  var ext = fileName.substring(fileName.lastIndexOf("."), fileName.length)
  var type =
    ext.toLowerCase() === "csv"
      ? "octet/stream"
      : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  var blob = new Blob([data], { type: type }),
    url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
}

/**
 * It will return the inputfield id based on selected token
 * @param  {array} selectedToken   array of  token name
 * @param  {string} flag Based on this flag Audit Task inputfield wil not return
 */
export function mappingArray(selectedToken, flag) {
  var mappingArray = []
  selectedToken.map(function(value, i) {
    if (value === "sku") {
      mappingArray.push(SPECIFIC_SKU_ID)
    } else if (value === "location") {
      mappingArray.push(SPECIFIC_LOCATION_ID)
    }
  })
  if (!flag) {
    mappingArray.push(AUDIT_TASK_ID)
  }
  return mappingArray
}

/**
 * Return the diff between two array
 * @param  {array} mainArray Main array where to search
 * @param  {array} arraytoSearch SubArray which contain what to search
 */
export function arrayDiff(mainArray, arraytoSearch) {
  return mainArray.filter(function(a) {
    return arraytoSearch.indexOf(a) == -1
  })
}
/**
 * Remove duplicates from array of objects
 * @param  {array} Array from where duplicates need to be removed
 * @param  {prop} Key based on which duplicates need to be removed
 */
export function removeDuplicates(arr, prop) {
  var obj = {}
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i]
  }
  var newArr = []
  for (var key in obj) newArr.push(obj[key])
  return newArr
}

export function humanizeObjValue(list) {
  return list.map(el => {
    el.tag_values = JSON.stringify(el.tag_values)
      // .replace(/^[\s_]+|[\s_]+$/g, "")
      // .replace(/[_\s]+/g, " ")
      .replace(/[\])}[{(]/g, "")
    // .replace(/['"]+/g, "")
    return el
  })
}
