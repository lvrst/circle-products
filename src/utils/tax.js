/**
 * Applies tax to price
 * @param {Number} price The price which to apply the tax
 * @param {Number} rate The tax rate to apply (default is 20%)
 * @returns Number The price with tax
 */
function tax(price, rate = 0.2) {
    return Math.round(price * (100 + 100 * rate))/100
}

export default tax;