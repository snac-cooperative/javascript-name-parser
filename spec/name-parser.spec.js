var NameParser = require('../app/name-parser.js');

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

    it("returns null if no date", function() {
        name = parser.parsePerson("Shakespeare, William");
        expect(name.parsed["Date"]).toEqual(null);
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
        expect(james1.parsed["Numeration"]).toBe(null);
        expect(james2.parsed["Numeration"]).toBe(null);
    });

    it("can identify name expansions", function() {
        var robert = parser.parsePerson("Smith, Robert L. (Robert Lewis), 1940-");
        var neville = parser.parsePerson("Neville, W. A. (William A.)");
        expect(robert.parsed["NameExpansion"]).toEqual("Robert Lewis");
        expect(neville.parsed["NameExpansion"]).toEqual("William A.");
    });

    it("can identify and remove parenthesis", function() {
        var robert = parser.parsePerson("Smith, Robert L. (Robert Lewis), 1940-");
        var neville = parser.parsePerson("Neville, W. A. (William A.)");
        expect(robert.parsed["NameExpansion"]).toEqual("Robert Lewis");
        expect(neville.parsed["NameExpansion"]).toEqual("William A.");
    });
});



describe("Name parser guessPerson", function() {
    parser = new NameParser()

    // TODO:
    // it("Can parse Chief Black Foot with Spirit ", function() {
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
        expect(name.parsed["Forename"]).toEqual("James")
        expect(name.parsed["Date"]).toEqual("1444-1501")
    });

    it("can guess forename and surename when not split by comma", function() {
        var guesses = parser.guessPerson("Smith James") // => Smith, James
        expect(guesses[1]["Surname"]).toEqual("Smith")
        expect(guesses[1]["Forename"]).toEqual("James")
        expect(guesses[2]["Surname"]).toEqual("James")  // guesses both in case order doesn't match RDA
        expect(guesses[2]["Forename"]).toEqual("Smith")

    });
});
