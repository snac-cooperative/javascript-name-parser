# javascript-name-parser
SNAC-Compatible Name Parser in Javascript. Designed to parse RDA formatted names into SNAC name components.


### Tests
`jasmine spec/name-parser.spec.js` to run test suite.

### Print names
`cat data/names.txt | ./run-names.sh`
`echo "Shakespeare, William, 1564-1616" | ./run-names.sh`

### Usage
To use, instantiate the parser and call `parsePerson('Full Name')` or, for multiple possible parsings, `guessPerson('Full Name')`.
``` javascript
var NameParser = require('name-parser.js');

parser = new NameParser()
name = parser.parsePerson("Shakespeare, W. (William), 1564-1616")

    Name {
      original: 'Shakespeare, W. (William), 1564-1616',
      parts: [ 'Shakespeare', 'W.', '(William)' ],
      parsed:
       { Surname: 'Shakespeare',
         Forename: 'W.',
         NameExpansion: 'William',
         Numeration: null,
         NameAdditions: [],
         Date: '1564-1616' },
      guesses:
       [ { Surname: 'Shakespeare',
           Forename: 'W.',
           NameExpansion: 'William',
           Numeration: null,
           NameAdditions: [],
           Date: '1564-1616' } ] }


guesses = parser.guessPerson("Shakespeare William 1564-1616")
    [ { Surname: null,
        Forename: 'Shakespeare William',
        NameExpansion: null,
        Numeration: null,
        NameAdditions: [],
        Date: '1564-1616' },
      { Surname: 'Shakespeare',
        Forename: 'William',
        NameExpansion: null,
        Numeration: null,
        NameAdditions: [],
        Date: '1564-1616' },
      { Surname: 'William',
        Forename: 'Shakespeare',
        NameExpansion: null,
        Numeration: null,
        NameAdditions: [],
        Date: '1564-1616' } ]

```
