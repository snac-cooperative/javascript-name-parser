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
    this.parsed = { "Surname" : null,
                "Forename" : null,
                "NameExpansion" : null,
                "Numeration" : null,
                "NameAdditions" : [],
                "Date" : null
            }
    this.guesses = [this.parsed]
}

Name.prototype.splitName = function(original) {
    var result = original.split(/,|(\(.*?\))/).map( function(part) {
            if (part) {
                return part.trim();
            }
    });
    return result.filter(function(e) {return e;});
};


// Name.prototype.displayPerson = function() {
//
//     var parsed = this.parsed
//     for (var key in parsed) {
//         if ( !parsed[key] || parsed[key].length === 0) {
//             delete(parsed[key]);
//         }
//     }
//
//     return this.parsed;
// };


module.exports = Name
