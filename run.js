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


var NameParser = require('./app/name-parser.js');
var Name = require('./app/name.js');

// Read the name from the command line (for this script)
var name = process.argv[2]
var parser = new NameParser();

// Print first guess only, exclude nulls
parsedName = parser.parsePerson(name)
if (parsedName.parsed["Surname"])
    console.log("Surname: ", parsedName.parsed["Surname"]);
if (parsedName.parsed["Forename"])
    console.log("Forename: ", parsedName.parsed["Forename"]);
if (parsedName.parsed["Numeration"])
    console.log("Numeration: ", parsedName.parsed["Numeration"]);
if (parsedName.parsed["NameAdditions"])
    console.log("NameAdditions: ", parsedName.parsed["NameAdditions"]);
if (parsedName.parsed["NameExpansion"])
    console.log("NameExpansion: ", parsedName.parsed["NameExpansion"]);
if (parsedName.parsed["Date"])
    console.log("Date: ", parsedName.parsed["Date"]);

// Uncomment to print guesses
// console.log("\nGuesses: ", parser.guessPerson(name))
