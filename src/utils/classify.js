/**
 * Change category name string from the API into className string
 * @param {string} string The category name from API with single quotes and whitespaces
 * @returns string The category name as CSS class
 */
function classify(string='') {
    return string.replace(/\s+/g, '-').replaceAll('\'', '')
}

export default classify;