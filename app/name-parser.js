/**
 * Name Parser
 *
 * Attempts to parse names.
 *
 * @author Robbie Hott, Joseph Glass
 * @license http://opensource.org/licenses/BSD-3-Clause BSD 3-Clause
 * @copyright 2017 the Rector and Visitors of the University of Virginia
 */

/**
 * Person Name Parser
 *
 * Attempts to parse names that are in RDA format into their SNAC-defined
 * components.
 */


var Name = require ('./name.js');

var NameParser = function() {
};

/**
 * Guess Person
 *
 * Takes a person name string and parses it into several possible arrangements
 *
 * @param string name The person name
 * @return object[] Array of Javascript Name Parser Name objects
 */
NameParser.prototype.guessPerson = function(name) {
    name = this.parsePerson(name)
    var firstParse = name.parsed
    var clonedParse = Object.assign({}, firstParse)

    // Guess Surname and Forename
    if (!name.parsed["Surname"] && name.parsed["Forename"].match(/ /)) {
        var newClone = Object.assign({}, clonedParse)
        var forenameWithSpace = newClone["Forename"]

        lastSpace = forenameWithSpace.lastIndexOf(' ')
        newClone["Surname"] = forenameWithSpace.slice(0, lastSpace).trim()
        newClone["Forename"] = forenameWithSpace.slice(lastSpace).trim()

        flippedNames = Object.assign({}, newClone)
        flippedNames["Surname"] = newClone["Forename"]
        flippedNames["Forename"] = newClone["Surname"]

        name.guesses.push(newClone);
        name.guesses.push(flippedNames);
    }


    // if multiple name additions, add guess with them combined
    if (name.parsed["NameAdditions"] > 1) {
        var newClone = Object.assign({}, clonedParse)
        newClone["NameAdditions"] = newClone["NameAdditions"].join(' ');
        name.guesses.push(newClone);
    }

    // if date, insert comma before first digit

    return name.guesses;
};


/**
 * Parse Person
 *
 * Parses a person name string into name components.
 *
 * @param string name The person name
 * @return Name Javascript parser name object
 */
NameParser.prototype.parsePerson = function(name) {
    name = new Name(name)
    this.parseDate(name);
    this.parseNumeration(name);
    var length = name.parts.length;

    //TODO: this should be redundant, but it isn't for one-part names.
    if (length == 1) {        // If there is only one name part, it defaults to forename
        name.parsed["Forename"] = name.parts[0];
        return name;      // what if there just aren't any commas?
    }

    for (var i = 0; i < length; i++) {
        var part = name.parts[i];
        var lowered = part.toLowerCase();
        // console.log("Part: ", part)
        if (i === 0) {
            name.parsed["Surname"] = part;    // First part is assumed to be surname
            continue;
        }

        if (i === 1) {
            if (part.startsWith('(')) {
                // console.log("nameadd1: ", part)
                name.parsed["NameAdditions"].push(part);
            }
            else if (lowered.includes("emperor") ||
                    lowered.includes("empress") ||
                    lowered.includes("king") ||
                    lowered.includes("queen") ||
                    lowered.includes("prince") ||
                    lowered.includes("chief")) {
                name.parsed["NameAdditions"].push(part);
            }
            else {
                // console.log("forename: ", part)
                name.parsed["Forename"] = part;
            }
            // If the previous part was a forename and this piece had parens, then
            // it should be a name expansion
                // TODO: Question: Are expansions always preceded by forenames?
                // Improve this? check if parts of first letter on name expansion matches forename
        } else if (name.parts[i - 1] === name.parsed["Forename"] && part.startsWith('(')) {
            name.parsed["NameExpansion"] = part.replace(/\(|\)/g, '');             // when to remove parens?
            // console.log("expans: ", part)
        } else {
            name.parsed["NameAdditions"].push(part.replace(/\(|\)/g, '')); // Anything not known is officially a name addition
            // console.log("nameadd2: ", part)

        }
    }
    // if there's only one name, it should default to forename, not surname
    if (name.parsed["Forename"] === undefined && name.parsed["Surname"]) {
        name.parsed["Forename"] = name.parsed["Surname"];
        delete name.parsed["Surname"]
    }
    // console.log("End result", this)
    return name;

};

/**
 * Parse Date
 *
 * Parses a date out of a Name object
 *
 * @param  Name  name
 * @return string Date string
 */
NameParser.prototype.parseDate = function(name) {
    for (var i=0; i < name.parts.length; i++) {
        // TODO: fails for Carleton (Family : Carleton, James, 1757-1827 )
        // TODO: Build smarter date-parsing? 'active 1679-1708' => 1679-1708, 'died 1455'/ 'd. 1455' => -1445
        // grab from first digit to last
        if (name.parts[i].match(/\d+|\d+\s*-|-\s*\d+|\d+\s*-\s*\d+/)) {
            // name.parsed["Date"] = name.parts[i].match(/-?\d.*\d-?/)[0];
            var match = name.parts[i].match(/-?\d.*\d-?/);
            // name.parsed["Date"] = name.parts[i].substring(match.index);
            name.parsed["Date"] = match[0];
            name.parts[i] = name.parts[i].substring(0, match.index).trim();
            if (name.parts[i] === '') {
                name.parts.splice(i, 1);
            }
            // name.parsed["Date"] = name.parts[i].match(/-?\d.*\d-?/)[0];
            // console.log("Dated: ", name.parts);
        }
    }
    return name.parsed["Date"];
};

// Numeration is for titles, , For generational suffix, use nameAdditon
// e.g.  Alexander I => Numeration: I,  Pope John Paul II => Numeration: II
// e.g.  Alexander I => Numeration: I.

/**
 * Parse Numeration
 *
 * Parses a numeration out of a Name object
 *
 * @param  Name  name object
 * @return string Numeration string
 */
NameParser.prototype.parseNumeration = function(name) {
    // Follows forename mostly?
    //get first and second

    var match = name.parts[0].match(/(.*) ([IVXCM]+ .*|[IVXCM]+$)/);
    if (match && match.length == 3) {
        name.parsed["Numeration"] = match[2];
        name.parts[0] = match[1];
    }
};


function isEquivalent(a, b) {

	var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
            var property = aProps[i];
        if (a[property] != b[property]) {
            return false;
        }
    }
    return true;
}

module.exports = NameParser;
