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
    it("is keeps original name string", function() {
        name = new Name("Shakespeare, William, 1564-1616")
        var parser = new NameParser(name);
        expect(name.original).toEqual("Shakespeare, William, 1564-1616");
        // console.log(parser);
    });

    it("can split on parens", function() {
        name = new Name("Nelson, P. Mabel (Precious Mabel), 1887-")
        // var parser = new NameParser(name);
        expect(parser.parts[2]).toEqual("(Precious Mabel)");
        // console.log(parser);
    });

    it("can extract a date", function() {
        name = new Name("Shakespeare, William, 1564-1616")
        var parser = new NameParser(name);
        parser.parseDate();
        expect(parser.date).toEqual("1564-1616");
        // console.log(parser);
    });

    it("can extract a partial", function() {
        name = new Name("Shakespeare, William, 1564-")
        var birth = new NameParser(name);
        name = new Name("Shakespeare, William, -1616")
        var death = new NameParser(name);
        birth.parseDate();
        death.parseDate();
        expect(birth.date).toEqual("1564-");
        expect(death.date).toEqual("-1616");
        // console.log(parser);
    });

    it("can extract two possible dates", function() {
        // TODO: Name additions are repeated here. Fix
        var parser = new NameParser(new Name("John II Comnenus, Emperor of the East, 1087 or 1088-1143"));
        parser.parseDate();
        expect(parser.date).toEqual("1087 or 1088-1143");
        // console.log(parser);
    });

    it("returns undefined if no date", function() {
        var parser = new NameParser(new Name("Shakespeare, William"));
        parser.parseDate();
        expect(parser.date).toEqual(undefined);
        // console.log(parser);
    });
});


describe("Name parser parsePerson", function() {

    it("can parse numeration", function() {
        var parser = new NameParser(new Name("Albrecht VII, Archduke of Austria, 1559-1621"));
        parser.parseNumeration();
        expect(parser.numeration).toEqual("VII");
        // console.log(parser);
    });

    it("can tell difference between initials and numeration", function() {
        var james1 = new NameParser(new Name("Smith, James I. M., 1559-1621"));
        var james2 = new NameParser(new Name("Smith, James V. X., 1559-1621"));
        james1.parseNumeration();
        james2.parseNumeration();
        expect(james1.numeration).toBe(undefined);
        expect(james2.numeration).toBe(undefined);
    });

    it("can identify name expansions", function() {
        var robert = new NameParser(new Name("Smith, Robert L. (Robert Lewis), 1940-"));
        var neville = new NameParser(new Name("Neville, W. A. (William A.)"));
        robert.parsePerson();
        neville.parsePerson();
        expect(robert.nameExpansion).toEqual("Robert Lewis");
        expect(neville.nameExpansion).toEqual("William A.");
    });

    it("can identify remove parenthesis", function() {
        // var robert = new NameParser(new Name("Smith, Robert L. (Robert Lewis), 1940-"));
        // var neville = new NameParser(new Name("Neville, W. A. (William A.)"));
        // robert.parsePerson();
        // neville.parsePerson();
        // expect(robert.nameExpansion).toEqual("Robert Lewis");
        // expect(neville.nameExpansion).toEqual("William A.");
    });



    // first, last
    // last, first
    //
    // it("Can parse Chief Black Foot", function() {
    //     var parser = new NameParser(new Name("Black Foot, Chief, -1877 (Spirit)"));
    //     parser.parsePerson();
    //     // console.log(parser)
    //     expect(parser.forename).toEqual("Black Foot");
    //     expect(parser.nameAdditions).toEqual(["Chief", "Spirit)"]);
    //
    //     expect(parser.date).toEqual("-1877");
    //     // console.log(parser);
    // });

    it("Doesn't delete date", function() {
        var parser = new NameParser(new Name("Carleton (Family : Carleton, James, 1757-1827 )"));
        parser.parseDate();
        // console.log(parser)
        // expect(parser.forename).toEqual("Black Foot");
        // expect(parser.nameAdditions).toEqual(["Chief", "Spirit)"]);

        expect(parser.date).toEqual("1757-1827");
        // console.log(parser);
    });

    it("Can parse a name with just a forename", function() {
        var parser = new NameParser(new Name("James 1444-1501"))

    });

    it("can guess at ", function() {
        "Smith James" // => Smith, James
        "James Smith" // => James, Smith
        // var robert = new NameParser(new Name("Smith, Robert L. (Robert Lewis), 1940-"));
        // var neville = new NameParser(new Name("Neville, W. A. (William A.)"));
        // robert.parsePerson();
        // neville.parsePerson();
        // expect(robert.nameExpansion).toEqual("Robert Lewis");
        // expect(neville.nameExpansion).toEqual("William A.");
    });
});


// describe("Display Name", function() {
//     it("can show a full name", function() {
//         var parser = new NameParser(new Name("Shakespeare, William, 1564-1616"));
//         parser.parsePerson();
//
//         expect(parser.displayName()).toEqual("Shakespeare, William, 1564-1616");
//         // console.log(parser);
//     });
// });
