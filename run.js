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


var parser = require('./name-parser.js');

// Read the name from the command line (for this script)
var name = process.argv[2];
var parsed = parser.parsePersonName(name);

parsed.forEach(function(parse) {
    console.log("    " + parse.type + ": \t"
            + (parse.type != "name addition" && parse.type != "name expansion"
               && parse.type != "numeration" ? "\t" : "")
            + (parse.punctuation == 'parens' ? "(" : "") 
            + parse.value 
            + (parse.punctuation == "parens" ? ")" : ""));
});


