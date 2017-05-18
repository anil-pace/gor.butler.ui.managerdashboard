/**
 * Capitalize first letter of string
 * @private
 * @param  {string} - String
 * @return {string} - String with first letter capitalized
 */
 export function capitalize (str) {
 	return str.charAt(0).toUpperCase() + str.substr(1)
 }

/**
 * Clamp position between a range
 * @param  {number} - Value to be clamped
 * @param  {number} - Minimum value in range
 * @param  {number} - Maximum value in range
 * @return {number} - Clamped value
 */
 export function clamp (value, min, max) {
 	return Math.min(Math.max(value, min), max)
 }

/**
 * Save a blob object to a filename
 * @param  {Object} data     Data to be saved as file
 * @param  {String} fileName Name of the file to be saved
 */
 export function saveFile (data, fileName) {
 	var a = document.createElement("a");
 	a.style = "display: none";
 	document.body.appendChild(a);

 	var json = JSON.stringify(data),
 	blob = new Blob([json], {type: "octet/stream"}),
 	url = window.URL.createObjectURL(blob);
 	a.href = url;
 	a.download = fileName;
 	a.click();
 	window.URL.revokeObjectURL(url);
 }

