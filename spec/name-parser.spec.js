var Name = require('../name-parser')
var NameParser = require('../name-parser.js');

// Priority & Order of Ops


// Parsing
// Person
    // parens?
    // numeration
    // dates
    //

// Display
  // surname, forename Numeration, nameaddition nameaddtion, date

// If following a surname

// Guesses
//  if forname has split forename on space, and surname/forename, forename/surname it
//


describe("Name", function() {
    var parser = new NameParser;
    it("keeps original name string", function() {
        name = parser.parsePerson("Shakespeare, William, 1564-1616")
        expect(name.original).toEqual("Shakespeare, William, 1564-1616");
    });

    it("can split on parens", function() {
        name = parser.parsePerson("Nelson, P. Mabel (Precious Mabel), 1887-")
        expect(name.parts[2]).toEqual("(Precious Mabel)");
        // console.log(name)
    });

    it("can extract a date", function() {
        var name = parser.parsePerson("Shakespeare, William, 1564-1616")
        expect(name.parsed["Date"]).toEqual("1564-1616");
    });

    it("can extract a partial", function() {

        var birth = parser.parsePerson("Shakespeare, William, 1564-")
        var death = parser.parsePerson("Shakespeare, William, -1616")

        expect(birth.parsed["Date"]).toEqual("1564-");
        expect(death.parsed["Date"]).toEqual("-1616");
    });

    it("can extract two possible dates", function() {
        name = parser.parsePerson("John II Comnenus, Emperor of the East, 1087 or 1088-1143");
        expect(name.parsed["Date"]).toEqual("1087 or 1088-1143");
    });

    it("returns undefined if no date", function() {
        name = parser.parsePerson("Shakespeare, William");
        expect(name.parsed["Date"]).toEqual(undefined);
    });
});


describe("Name parser parsePerson", function() {
    parser = new NameParser()

    it("can parse numeration", function() {
        name = parser.parsePerson("Albrecht VII, Archduke of Austria, 1559-1621");
        expect(name.parsed["Numeration"]).toEqual("VII");
    });

    it("can tell difference between initials and numeration", function() {
        var james1 = parser.parsePerson("Smith, James I. M., 1559-1621");
        var james2 = parser.parsePerson("Smith, James V. X., 1559-1621");
        expect(james1.parsed["Numeration"]).toBe(undefined);
        expect(james2.parsed["Numeration"]).toBe(undefined);
    });

    it("can identify name expansions", function() {
        var robert = parser.parsePerson("Smith, Robert L. (Robert Lewis), 1940-");
        var neville = parser.parsePerson("Neville, W. A. (William A.)");
        expect(robert.nameExpansion).toEqual("Robert Lewis");
        expect(neville.nameExpansion).toEqual("William A.");
    });

    it("can identify remove parenthesis", function() {
        var robert = parser.parsePerson("Smith, Robert L. (Robert Lewis), 1940-");
        var neville = parser.parsePerson("Neville, W. A. (William A.)");
        expect(robert.nameExpansion).toEqual("Robert Lewis");
        expect(neville.nameExpansion).toEqual("William A.");
    });



    // first, last
    // last, first
    //
    // it("Can parse Chief Black Foot", function() {
    //     var parser = parser.parsePerson("Black Foot, Chief, -1877 (Spirit)");
    //     parser.parsePerson();
    //     // console.log(parser)
    //     expect(parser.forename).toEqual("Black Foot");
    //     expect(parser.nameAdditions).toEqual(["Chief", "Spirit)"]);
    //
    //     expect(parser.parsed["Date"]).toEqual("-1877");
    // });

    it("Doesn't delete date", function() {
        var name = parser.parsePerson("Carleton (Family : Carleton, James, 1757-1827 )");
        expect(name.parsed["Date"]).toEqual("1757-1827");
    });

    it("Can parse a name with just a forename", function() {
        var name = parser.parsePerson("James 1444-1501")
        expect(name.parsed["Date"]).toEqual("1444-1501")
    });

    it("can guess forename and surename when not split by comma", function() {
        var "Smith James" // => Smith, James

        // var robert = parser.parsePerson("Smith, Robert L. (Robert Lewis), 1940-");
        // var neville = parser.parsePerson("Neville, W. A. (William A.)");
        // robert.parsePerson();
        // neville.parsePerson();
        // expect(robert.nameExpansion).toEqual("Robert Lewis");
        // expect(neville.nameExpansion).toEqual("William A.");
    });
});


// describe("Display Name", function() {
//     it("can show a full name", function() {
//         var parser = parser.parsePerson("Shakespeare, William, 1564-1616");
//         parser.parsePerson();
//
//         expect(parser.displayName()).toEqual("Shakespeare, William, 1564-1616");
//     });
// });
