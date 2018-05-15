/**
 * NodeJS run file
 *
 * Reads a name from the command line, parses it, and prints out
 * the components.
 *
 * @author Robbie Hott
 * @license http://opensource.org/licenses/BSD-3-Clause BSD 3-Clause
 * @copyright 2017 the Rector and Visitors of the University of Virginia
 */


var NameParser = require('./name-parser.js');
var Name = require('./name.js');

// Read the name from the command line (for this script)
var name = new Name(process.argv[2]);
// var parsed = parser.parsePersonName(name);
var parser = new NameParser();
parser.parsePerson(name);
// NameParser
// var newParser = new parser.NameParser(name);
// newParser.parsePerson();
//


if (name.surname)
    console.log("Surname: ", name.surname);
if (name.forename)
    console.log("Forename: ", name.forename);
if (name.numeration)
    console.log("Numeration: ", name.numeration);
if (name.nameAdditions.length > 0)
    console.log("NameAdditions: ", name.nameAdditions);
if (name.nameExpansion)
    console.log("NameExpansion: ", name.nameExpansion);
if (name.date)
    console.log("Date: ", parser.date);

//
// console.log(
// `
// Surname: ${parser.surname || ''}
// Forename: ${parser.forename || ''}
// Numeration: ${parser.numeration || ''}
// Name addition: ${parser.nameAdditions || ''}
// Name expansion: ${parser.nameExpansion || ''}
// date: ${parser.date || ''}
// `
// )
// parser.forEach(function(parse) {
//     console.log("    " + parse.type + ": \t"
//             + (parse.type != "name addition" && parse.type != "name expansion"
//                && parse.type != "numeration" ? "\t" : "")
//             + (parse.punctuation == 'parens' ? "(" : "")
//             + parse.value
//             + (parse.punctuation == "parens" ? ")" : ""));
// });
// newParser.forEach(function(parsed) {
//     console.log('----------------------------------------------');
//     console.log(
//         `name: ${parsed.name}
//         name addtion: ${parsed.nameAddition}
//         numeration: ${parsed.numeration}
//         name expansion: ${parsed.nameExpansion}
//                 `);
// });
