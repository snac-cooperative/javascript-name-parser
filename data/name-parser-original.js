/**
 * Name Parser
 *
 * Attempts to parse names.
 *
 * @author Robbie Hott
 * @license http://opensource.org/licenses/BSD-3-Clause BSD 3-Clause
 * @copyright 2017 the Rector and Visitors of the University of Virginia
 */

/**
 * Person Name Parser
 *
 * Attempts to parse names that are in RDA format into their SNAC-defined
 * components.
 */
function parsePersonName(name) {

    var parsed = Array();

    var split = name.split(",");

    // split up components by comma
    split.forEach(function(piece, i, all) {
        var component = piece.trim();
        var type = "unknown";
        var pushed = false;

        var match =component.match(/\d+|\d+\s*-|-\s*\d+|\d+\s*-\s*\d+/) ;
        if (component.match(/\d+|\d+\s*-|-\s*\d+|\d+\s*-\s*\d+/)) {
            type = "date";
        }

        // check for parens
        if (component.match(/.*\(.*\).*/)) {
            // split apart based on parens
            var p1 = component.slice(0, component.indexOf('(')).trim();
            var p2 = component.slice(component.indexOf('(')+1, component.indexOf(')')).trim();
            var p3 = component.slice(component.indexOf(')')+1).trim();

            if (p1.length > 0) {
                pushed = true;
                parsed.push({
                    type: type,
                    value: p1,
                    punctuation: null
                });
            }

            if (p2.length > 0) {
                pushed = true;
                parsed.push({
                    type: "parens",
                    value: p2,
                    punctuation: "parens"
                });
            }

            if (p3.length > 0) {
                pushed = true;
                parsed.push({
                    type: type,
                    value: p3,
                    punctuation: null
                });
            }
        }

        // Check for Numeration
        if (i == 0) {
            match = component.match(/(.*) ([IVXCM]+ .*|[IVXCM]+$)/);
            if (match && match.length == 3) {
                pushed = true;
                parsed.push({
                    type: type,
                    value: match[1],
                    punctuation: null
                });
                parsed.push({
                    type: "numeration",
                    value: match[2],
                    punctuation: null
                });
            }
        }

        // split again on spaces
        var spaced = component.split(" ");

        if (!pushed) {
            parsed.push({
                type: type,
                value: component,
                punctuation: null
            });
        }
    });

    parsed.forEach(function(piece, i, all) {
        var next = null;
        var prev = null;
        if (i > 0)
            prev = all[i-1];
        if (i < all.length - 1)
            next = all[i+1];
        var lowered = piece.value.toLowerCase();

        // First guess is that this is a surname if it came first
        if (i == 0 && piece.type == "unknown")
            piece.type = 'surname';

        // If there is only one name part, it is defaulted to be a forename
        if (all.length == 1) {
            piece.type = "forename";
            return;
        }


        // If the previous part was a surname, then this will either be a
        // name addition (if it had parens) or a forename
        if (prev != null && prev.type == 'surname') {
            if (piece.type == 'parens')
                piece.type = 'name addition';
            else if (piece.type == 'unknown')
                piece.type = "forename";
        }

        // If the previous part was a forename and this piece had parens, then
        // it should be a name expansion
        if (prev != null && prev.type == 'forename' && piece.type == 'parens')
            piece.type = "name expansion";

        // If this piece has a title of royalty (English names so far), then this should
        // actually be a name addition
        if (lowered.includes("emperor") ||
                lowered.includes("empress") ||
                lowered.includes("king") ||
                lowered.includes("queen") ||
                lowered.includes("prince") ||
                lowered.includes("chief"))
            piece.type = "name addition";

        // Otherwise, if this piece had parens, then it should be a name addition
        if (piece.type == 'parens')
            piece.type = "name addition";

        // Anything not known is officially a name addition
        if (piece.type == 'unknown')
            piece.type = "name addition";

        // Since you can't have a surname without a forename, if this piece was not set
        // to be a forename and the previous part was a surname, then update the previous
        // to be a forename instead
        if (prev != null && piece.type != 'forename' && prev.type == 'surname')
            prev.type = 'forename';

    });

    var result = Array();

    parsed.forEach(function(piece, i, all) {
        var next = null;
        var prev = null;
        if (i > 0)
            prev = all[i-1];

        if (i < all.length - 1)
            next = all[i+1];


        if (prev != null && prev.type == piece.type) {
            result[result.length - 1].value += ", " + piece.value;
        } else {
            result.push(piece);
        }

    });

    return result;
}

// NodeJS export command
exports.parsePersonName = parsePersonName;
