Csv2Json Converter
==================

This Csv2Json converter expects the csv to be in a specific format. Each Column is split into a new json object except for the first column. The first column represents the json keys. The first row represents the identifier for the json converted json objects. The first column of the first row is ignored.

### Example

| key     | en-US   | nl-NL   | fr-FR     |
|---------|---------|---------|-----------|
| hello   | Hello   | Hallo   | Bonjour   |
| goodbye | Goodbye | Vaarwel | Au revoir |

### Csv input

key,en-US,nl-NL,fr-FR

hello, Hello, Hallo, Bonjour

goodbye, Goodbye, Vaarwel, Au revoir

### Json output

en-US { "hello" : "Hello", "goodbye" : "Goodbye" }

nl-NL { "hello" : "Hallo", "goodbye" : "Vaarwel" }

fr-FR { "hello" : "Bonjour" , "goodbye" : Au revoir" }