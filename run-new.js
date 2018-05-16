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
// parser.parsePerson(name);
// NameParser
// var newParser = new parser.NameParser(name);
// newParser.parsePerson();
//


// if (name.parsed["Surname"])
//     console.log("Surname: ", name.parsed["Surname"]);
// if (name.parsed["Forename"])
//     console.log("Forename: ", name.parsed["Forename"]);
// if (name.parsed["Numeration"])
//     console.log("Numeration: ", name.parsed["Numeration"]);
// if (name.parsed["NameAdditions"])
//     console.log("NameAdditions: ", name.parsed["NameAdditions"]);
// if (name.parsed["NameExpansion"])
//     console.log("NameExpansion: ", name.parsed["NameExpansion"]);
// if (name.parsed["Date"])
//     console.log("Date: ", name.parsed["Date"]);

// console.log(name.displayPerson())
console.log(parser.guessPerson(process.argv[2]))

//
// console.log(
// `
// Surname: ${parser.Surname || ''}
// Forename: ${parser.Forename || ''}
// Numeration: ${parser.Numeration || ''}
// Name addition: ${parser.NameAdditions || ''}
// Name expansion: ${parser.NameExpansion || ''}
// date: ${parser.date || ''}
// `
// )
// parser.forEach(function(parse) {
//     console.log("    " + parse.type + ": \t"
//             + (parse.type != "name addition" && parse.type != "name expansion"
//                && parse.type != "Numeration" ? "\t" : "")
//             + (parse.punctuation == 'parens' ? "(" : "")
//             + parse.value
//             + (parse.punctuation == "parens" ? ")" : ""));
// });
// newParser.forEach(function(parsed) {
//     console.log('----------------------------------------------');
//     console.log(
//         `name: ${parsed.name}
//         name addtion: ${parsed.nameAddition}
//         Numeration: ${parsed.Numeration}
//         name expansion: ${parsed.NameExpansion}
//                 `);
// });
