/**
 * Name
 *
 * Name object to be parsed into components
 * @license http://opensource.org/licenses/BSD-3-Clause BSD 3-Clause
 * @copyright 2017 the Rector and Visitors of the University of Virginia
 */


var Name = function(original) {
    this.original = original || ''
    this.parts = this.splitName(original);
    this.nameAdditions = [];
    this.surname = undefined;
    this.forename = undefined;
    this.nameExpansion = undefined;
    this.numeration = undefined;
}



Name.prototype.splitName = function(original) {
    var result = original.split(/,|(\(.*?\))/).map( function(part) {
            if (part) {
                return part.trim();
            }
    });
    return result.filter(function(e) {return e;});
};


module.exports = Name
