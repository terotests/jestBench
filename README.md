# jestBench

A standalone, framework or testmethod agnostic testing environment and syncronous test-runner running in the browser.

The jestBench makes no assumptions of what kind of data you are collecting, which libraries you are using or how you decided if the test failed or not. It only requires you to write a test function which accepts a callback function as first parameter to report the results.

JestBench is basicly a wrapper for anything that can be run inside IFRAME in your browser. Typically you want to import bunch of test libraries, custom preparation code, styles and HTML together with your test code and usually also the testing libraries like Jasmine or similar.

The purpose of this library is to make trivial to create a setup where test-code can live and run, just like CodePen or jsFiddle. One benefit of this approach is also that the test data can also be serialized in JSON format, as well as the results.

The steps taken are:

1. Select the external scripts and stylesheets for the tests
2. **Create Array of test functions which return the test results**
3. Optionally specify IndexedDB database where to store the results 
4. Optionally specify callback, which stores the test results somewhere else

And then just run the test setup. For other options see the documentation.


## Running

Include the script and run with options

```javascript
jestBench().runTests( options );   
```
Callbacks from the test functions will be collected and can be stored to IndexedDB or manually using `onReady` -event handler.

# Description of options

##  Script timeout

If the script does not execute the callback function in 5 seconds, it is invoced automatically. You can specify custom timeout using
```javascript
var options = {
        timeOut : 1000, // 1 second
```


##  External scripts

Any external JavaScript file can be loaded to Iframe using

```javascript
var options = {
        scripts : [
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js",
        ],
```

##  Stylesheets

Any external JavaScript file can be loaded to Iframe using

```javascript
var options = {
        stylesheets : [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"
        ],
```

##  Inline HTML

To inject content to the testing page option `html` can be used

```javascript
var options = {
        html : "<div class='alert alert-info'>inline HTML</div>",
```

##  Inline JavaScript

JavaScript can be embedded also as inline text with `prepCode`

```javascript
var options = {
        prepCode : "function inlineJsCode() { }",
```

##  Size of the IFrame

The size of the IFrame can also be specified, can be useful when testing for different screen sizes.

```javascript
var options = {
        width : 500, height : 300,
```

#  Writing the test functions

Each test function will get a clean IFRAME to run at. The test functions can be written or added in the options block and the first parameter of the test function is the callback to report the results of the test ( can be anything ).

```javascript      
var options = {
        tests : [
            function(callBack) { .... }
        ]
    }
```
Each test function gets the callback where to return the results of the test asyncronously. This
means that the tests can also expect user interaction or acceptance from the user
from the test result.

For example you could have a button to click if the test results looks OK to the the tester. After the test is run the IFRAME is cleared from the browser and next is created.

If you want, you can also specify the test function as string in which case the callback function name is 'testResults'

```javascript      
var options = {
        tests : [
            "console.log('Hello');testResults(true);" // inline JS as string
        ],
```

The tests are run sequentially, so the next test does not start before the previous has completed.

```javascript      
var options = {
        tests : [
            function(callBackFn) {
                // run first
                callBackFn( true ); // moves the control tp next
            },
            function(cb) {
               // this does not start before the previus callback has called
            }
        ],
```

#  Collecting the results

After all the tests have been run, the results from all the callbacks from the tests is returned to `onReady` callback.

```javascript
var options = {
        onReady : function(results) {
            // list of all the results
            console.log(results);
        },
```        

#  Storing the test results to IndexedDB

You can also specify optional `toIndexedDB` key which value will become the name of the IndexedDB database to store all the test results.
You can browse this database through Chrome Dev tools or read the values from the IndexedDB.

TODO: function to return all the test values from IndexedDB is coming soon! :)

```javascript
var options = {
        toIndexedDB : "my.testDb", // name of the database
        description : "Additional information to the DB"
```

The results are in format
```javascript
{testRunUTC: 1434904052517, extra: "description given", results: [ ... ]}
```

## Retrieve the stored test results from the IndexedDB

```javascript
jestBench().getDbResults( "my.testDb", function(list) {
                console.log("The test results are");
                console.log(list);
            } )
```

The results are in format
```javascript
{testRunUTC: 1434904052517, extra: "description given", results: [ ... ]}
```

# Full Example of usage

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
        prepCode : "function inlineJsCode() { }",
        width : 500, height : 300,
        tests : [
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

http://jsfiddle.net/555L47rm/


# Licence

MIT.







