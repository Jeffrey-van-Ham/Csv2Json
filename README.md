Csv2Json Converter
==================

This is not a jQuery plugin or anyting you can use straight away in your application. This csv2json converter comes with an interface in which you can easially convert your csv file to json. This can be done by copying the csv content and pasting it in the interface or by selecting the csv straight away.

This Csv2Json converter expects the csv to be in a specific format. Each Column is split into a new json object except for the first column. The first column represents the json keys. The first row represents the identifier for the json converted json objects. The first column of the first row is ignored. This csv2json converter is being used for converting translation csv files into json such as the example below. But it can ofcourse be used in many different cases.

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
