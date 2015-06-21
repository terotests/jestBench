# jestBench

A standalone testing environment, which can be used as a wrapper for anything that can be run inside IFRAME in your browser.

This means that you can run all you favourite test frameworks, be it `Mocha`, `Jasmine` or `QUnit` or any of them combined or without them using this simple tool.

The steps taken are:

1. Set up the scripts, stylsheets
2. Create preparation code
3. Create test functions which return the test results
4. Optionally specify IndexedDB database where to store the results 
5. Optionally specify callback, which stores the test results somewhere else

## Example of usage

All the test functions are run in separate clean IFRAME instance which has the environment set up for the code to be run.

```javascript
var options = {
        stylesheets : [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"
        ],
        scripts : [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
        ],
        html : "<div class='alert alert-info'>inline HTML</div>",
        jsCode : "function inlineJsCode() { }",
        width : 500, height : 300,
        fns : [
            function(cb) {
                // Javascript code to be run first step
                cb(prompt("OK?") ? true : false);  // return results (can be anything, object etc)
            },
            function(cb) {
            // Javascript code to be run at second step
                cb(false); // return results (can be anything, object etc)
            },
            // inline JS code can be as string
            "console.log('Hello');testResults(true);"
        ],
        onReady : function(r) {
            // list of all the results
            console.log(r);
        },
        toIndexedDB : "my.testDb",
        description : "Tests to be run"
    }

jestBench().runTests( options );     
```








