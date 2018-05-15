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


 // TODO: Guesses
 // TODO: parenthesis removal.


var Name = require ('./name.js');

// pass the name along as a param, push a guess into parts
var NameParser = function() {
    // new Name(name)
    // this.name =  new Name(name).orginal || '';
    // name.parts = this.splitName(name);
    // name.parts = name.parts;
    // name.nameAdditions = [];
    this.guesses = []

};

NameParser.prototype.splitName = function(name) {
    var result = name.split(/,|(\(.*?\))/).map( function(part) {
            if (part) {
                return part.trim();
            }
    });
    return result.filter(function(e) {return e;});
};


NameParser.prototype.guessPerson = function() {

    var guesses = [];
    guesses.push(this.parsePerson());

    // make a guess, push new display object

    if (!name.surname && name.forename.match(/ /)) {
        var parts = name.forename.split(/ (.+)/);
        name.surname = parts[0];
        name.forename = parts[1];
    }
    guesses.push(this.parsePerson());


    // if date, insert comma before first digit
    // if multiple name additions, put them all in one
    //
    return guesses;
};

// Move to name.js?
NameParser.prototype.displayPerson = function(name) {
    var display = { "Surname" : name.surname,
                    "Forename" : name.forename,
                    "NameExpansion" : name.nameExpansion,
                    "Numeration" : name.numeration,
                    "NameAdditions" : name.nameAdditions,
                    "Date" : name.date };

    Object.keys(display).forEach(function(key) {
        if ( !display[key] || display[key].length === 0) {
            delete(display[key]);
        }
    });

    return display;
};

NameParser.prototype.parsePerson = function(name) {
    // console.log("THIS IS PARSA: ", name)
    this.parseDate(name);
    this.parseNumeration(name);
    // console.log(this);
    var length = name.parts.length;

    //TODO: this should be redundant, but it isn't for one-part names.
    if (length == 1) {        // If there is only one name part, it defaults to forename
        name.forename = name.parts[0];
        return this.displayPerson(name);      // what if there just aren't any commas?
    }

    for (var i = 0; i < length; i++) {
        var part = name.parts[i];
        var lowered = part.toLowerCase();
        // console.log("Part: ", part)
        if (i === 0) {
            name.surname = part;    // First part is assumed to be surname
            // console.log("surname: ", part)
            continue;
        }

        if (i === 1) {
            if (part.startsWith('(')) {
                // console.log("nameadd1: ", part)
                name.nameAdditions.push(part);
            }
            else if (lowered.includes("emperor") ||
                    lowered.includes("empress") ||
                    lowered.includes("king") ||
                    lowered.includes("queen") ||
                    lowered.includes("prince") ||
                    lowered.includes("chief")) {
                name.nameAdditions.push(part);
            }
            else {
                // console.log("forename: ", part)
                name.forename = part;
            }
            // If the previous part was a forename and this piece had parens, then
            // it should be a name expansion
                // TODO: Question: Are expansions always preceded by forenames?
                // Improve this? check if parts of first letter on name expansion matches forename
        } else if (name.parts[i - 1] === name.forename && part.startsWith('(')) {
            // when to remove parens?
            name.nameExpansion = part.replace(/\(|\)/g, '');

            // console.log("expans: ", part)
        } else {
            name.nameAdditions.push(part); // Anything not known is officially a name addition
            // console.log("nameadd2: ", part)

        }
    }
    // if there's only one name, it should default to forename, not surname
    if (name.forename === undefined && name.surname) {
        name.forename = name.surname;
        name.surname = undefined;
    }
    // console.log("End result", this)
    return this.displayPerson(name);

};


    // Since you can't have a surname without a forename, if this piece was not set
    // to be a forename and the previous part was a surname, then update the previous
    // to be a forename instead

    // at end, if the thing after surname is not forname, then forename = surname, surname = undefined


NameParser.prototype.parseDate = function(name) {
    for (var i=0; i < name.parts.length; i++) {
        // TODO: fails for Carleton (Family : Carleton, James, 1757-1827 )
        // grab from first digit to last
        if (name.parts[i].match(/\d+|\d+\s*-|-\s*\d+|\d+\s*-\s*\d+/)) {
            // name.date = name.parts[i].match(/-?\d.*\d-?/)[0];
            var match = name.parts[i].match(/-?\d.*\d-?/);
            // name.date = name.parts[i].substring(match.index);
            name.date = match[0];
            name.parts[i] = name.parts[i].substring(0, match.index).trim();
            if (name.parts[i] === '') {
                name.parts.splice(i, 1);
            }
            // name.date = name.parts[i].match(/-?\d.*\d-?/)[0];
            // console.log("Dated: ", name.parts);
        }
    }
};

// Numeration is for titles, , For generational suffix, use nameAdditon
// e.g.  Alexander I => Numeration: I,  Pope John Paul II => Numeration: II
// e.g.  Alexander I => Numeration: I.

NameParser.prototype.parseNumeration = function(name) {
    // Follows forename mostly?
    //get first and second

    var match = name.parts[0].match(/(.*) ([IVXCM]+ .*|[IVXCM]+$)/);
    if (match && match.length == 3) {
        name.numeration = match[2];
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

//alternatives
    // if it's one [], then split on spaces,
    // then try first, last, ; last, first


module.exports = NameParser;
