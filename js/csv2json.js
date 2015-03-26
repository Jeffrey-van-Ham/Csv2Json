/**
 * Created by Jeffrey van Ham on 26/03/15.
 */

(function() {

    $(document).ready(function () {
        var app = new App();
        app.run();
    });

    var App = (function ()
    {
        function App() {}

        /**
         * Initialize App
         */
        App.prototype.run = function ()
        {
            this.initFormSubmitHandler();
            this.initShowExampleHandler();
        };

        /**
         * Initialize show example handler
         */
        App.prototype.initShowExampleHandler = function ()
        {
            $('.example-toggle').on('click', function(){
                $('.example').toggle();
            });
        };

        /**
         * Initialize Submit form handler
         */
        App.prototype.initFormSubmitHandler = function ()
        {
            var self, fileInput, csvInput, csvString;
            self = this;
            fileInput = $('.csv-file');
            csvInput = $('.csv');
            $('form').on('submit', function () {
                if (fileInput.val() !== '') {
                    csvString = self.loadCsvFromFile(fileInput, function(csvString){
                        self.createJsonView(self.convertArray2Object(self.convertCsv2Array(csvString)));
                    });
                } else {
                    csvString = $(csvInput).val();
                    self.createJsonView(self.convertArray2Object(self.convertCsv2Array(csvString)));
                }
            });
        };

        /**
         * Load csv from local file
         * @param fileInput
         * @param callback
         */
        App.prototype.loadCsvFromFile = function(fileInput, callback)
        {
            var file, fileReader, csvOutput;
            file = fileInput.get(0).files[0];
            fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function(){
                csvOutput = fileReader.result;
                callback(csvOutput);
            }
        };

        /**
         * Create view for translation result
         * @param translationObject
         */
        App.prototype.createJsonView = function(translationObject)
        {
            var translations, language;
            $('.json-response').empty();

            for (language in translationObject) {
                translations = translationObject[language];
                this.createJsonColumn(language, translations)
            }

        };

        /**
         * Create column for language object
         * @param language
         * @param translations
         */
        App.prototype.createJsonColumn = function(language, translations)
        {
            var column, columnTitle, columnBody, downloadBtn, json;
            json = JSON.stringify(translations, null, 2);
            column = $('<div class="col-sm-6 language"></div>');
            columnTitle = $('<div class="column-title">' + language + '</div>');
            downloadBtn = $('<button class="btn btn-xs btn-primary pull-right">Download</button>');
            columnBody = $('<textarea class="column-body form-control">' + json + '</textarea>');
            $('.json-response').append(column.append(columnTitle.append(downloadBtn)).append(columnBody));
            this.initDownloadButtonClickHandler(downloadBtn, json, language)
        };

        /**
         * Initialize download json
         * @param downloadBtn
         * @param json
         * @param language
         */
        App.prototype.initDownloadButtonClickHandler = function(downloadBtn, json, language)
        {
            var self = this;
            downloadBtn.on('click', function(){
                self.downloadJson(json, language);
            });
        };

        /**
         * Download the actual json file
         * @param json
         * @param language
         */
        App.prototype.downloadJson = function(json, language)
        {
            var blob, downloadLink;
            blob = new Blob([json], {type:'text/json'});
            downloadLink = document.createElement("a");
            downloadLink.download = language + '.json';
            downloadLink.innerHTML = "My Hidden Link";
            window.URL = window.URL || window.webkitURL;
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = function(event) {
                document.body.removeChild(event.target)
            };
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        };

        /**
         * Convert Csv to Array
         * @param csv
         * @returns {Array}
         */
        App.prototype.convertCsv2Array = function(csv)
        {
            var rows, i;
            rows = csv.split(/\n/g);
            for (i = 0; i < rows.length; i++){
                rows[i] = rows[i].split(/("[^"]*"|[^,"]+),/g);
                rows[i] = this.stripArrayValues(rows[i])
            }
            return rows;
        };

        /**
         * Strip " and trim the columns per row
         * @param row
         * @returns {Array}
         */
        App.prototype.stripArrayValues = function(row)
        {
            var i, columns, column;
            columns = [];

            for(i = 0; i < row.length; i++) {
                column = row[i];
                if (column !== ""){
                    columns.push($.trim(column.replace(/"/g, '').replace('…', '...')));
                }
            }
            return columns;
        };

        /**
         * Convert array to object
         * @param array
         * @returns {Object}
         */
        App.prototype.convertArray2Object = function(array)
        {
            var i, j, key, language, translation, translationObject;

            translationObject = {};

            for (j = 1; j < array[0].length; j++) {
                language = array[0][j];

                translationObject[language] = {};

                for (i = 1; i < array.length; i++) {
                    key = array[i][0];
                    translation = array[i][j];
                    translationObject[language][key] = translation;
                }

            }

            return translationObject;
        };

        return App;
    })();

}).call(this);