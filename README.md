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

If the script does not execute the callback function in 1.5 seconds, it is invoced automatically. You can specify custom timeout using
```javascript
var options = {
        timeOut : 1000, // 1 second
```
If timeout occurs, the execution moves to the next test. The result of the current testi will be

```javascript
 { "result": false, "exception": true, "text": "timeout 1000ms" }
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
























   

 


   
## Class jestBench


        
- [jestBench::fiddle](readme.md#jestBench::fiddle)(options, parentNode)

- [jestBench::getDbResults](readme.md#jestBench::getDbResults)(databaseName, callBackFn)

        
- [jestBench::runTests](readme.md#jestBench::runTests)(options)

- [jestBench::saveToIndexed](readme.md#jestBench::saveToIndexed)(databaseName, rows, extra)



   
    
    
    
    
    
    
    
### trait _dataTrait

        
- [_dataTrait::guid](readme.md#_dataTrait::guid)(t)

- [_dataTrait::isArray](readme.md#_dataTrait::isArray)(t)

- [_dataTrait::isFunction](readme.md#_dataTrait::isFunction)(fn)

- [_dataTrait::isObject](readme.md#_dataTrait::isObject)(t)


    
    
    
    


   
      
            
## Class _promise


        
- [_promise::all](readme.md#_promise::all)(firstArg)

- [_promise::collect](readme.md#_promise::collect)(collectFn, promiseList, results)

- [_promise::fail](readme.md#_promise::fail)(fn)

- [_promise::fulfill](readme.md#_promise::fulfill)(withValue)

- [_promise::genPlugin](readme.md#_promise::genPlugin)(fname, fn)

        
- [_promise::isFulfilled](readme.md#_promise::isFulfilled)(t)

- [_promise::isPending](readme.md#_promise::isPending)(t)

- [_promise::isRejected](readme.md#_promise::isRejected)(v)

- [_promise::nodeStyle](readme.md#_promise::nodeStyle)(fname, fn)

- [_promise::onStateChange](readme.md#_promise::onStateChange)(fn)

- [_promise::plugin](readme.md#_promise::plugin)(n, fn)

- [_promise::props](readme.md#_promise::props)(obj)

- [_promise::reject](readme.md#_promise::reject)(withReason)

- [_promise::rejectReason](readme.md#_promise::rejectReason)(reason)

- [_promise::resolve](readme.md#_promise::resolve)(x)

- [_promise::state](readme.md#_promise::state)(newState)

- [_promise::then](readme.md#_promise::then)(onFulfilled, onRejected)

- [_promise::triggerStateChange](readme.md#_promise::triggerStateChange)(t)

- [_promise::value](readme.md#_promise::value)(v)



   
    
### trait util_fns

        
- [util_fns::isArray](readme.md#util_fns::isArray)(someVar)

- [util_fns::isFunction](readme.md#util_fns::isFunction)(fn)

- [util_fns::isObject](readme.md#util_fns::isObject)(obj)


    
    
    
    


   
      
    
      
            
## Class later


        
- [later::add](readme.md#later::add)(fn, thisObj, args)

- [later::after](readme.md#later::after)(seconds, fn, name)

- [later::asap](readme.md#later::asap)(fn)

- [later::every](readme.md#later::every)(seconds, fn, name)

        
- [later::once](readme.md#later::once)(key, fn, value)

- [later::onFrame](readme.md#later::onFrame)(fn)

- [later::polyfill](readme.md#later::polyfill)(t)

- [later::removeFrameFn](readme.md#later::removeFrameFn)(fn)



   


   



      
    



      
    
      
            
## Class _localDB


        
- [_localDB::_initDB](readme.md#_localDB::_initDB)(t)

- [_localDB::clearDatabases](readme.md#_localDB::clearDatabases)(fn)

- [_localDB::createTable](readme.md#_localDB::createTable)(name, options)

- [_localDB::getDB](readme.md#_localDB::getDB)(t)

- [_localDB::getStore](readme.md#_localDB::getStore)(store_name, mode)

        
- [_localDB::table](readme.md#_localDB::table)(name)



   
    
    
    
### trait _dataTrait

        
- [_dataTrait::guid](readme.md#_dataTrait::guid)(t)

- [_dataTrait::isArray](readme.md#_dataTrait::isArray)(t)

- [_dataTrait::isFunction](readme.md#_dataTrait::isFunction)(fn)

- [_dataTrait::isObject](readme.md#_dataTrait::isObject)(t)


    
    


   
      
            
## Class dbTable


        
- [dbTable::addRows](readme.md#dbTable::addRows)(rows)

- [dbTable::clear](readme.md#dbTable::clear)(t)

- [dbTable::count](readme.md#dbTable::count)(t)

- [dbTable::forEach](readme.md#dbTable::forEach)(fn)

- [dbTable::get](readme.md#dbTable::get)(key)

- [dbTable::getAll](readme.md#dbTable::getAll)(t)

        
- [dbTable::readAndDelete](readme.md#dbTable::readAndDelete)(t)

- [dbTable::update](readme.md#dbTable::update)(key, data)



   
    
### trait _dataTrait

        
- [_dataTrait::guid](readme.md#_dataTrait::guid)(t)

- [_dataTrait::isArray](readme.md#_dataTrait::isArray)(t)

- [_dataTrait::isFunction](readme.md#_dataTrait::isFunction)(fn)

- [_dataTrait::isObject](readme.md#_dataTrait::isObject)(t)


    
    


   
      
    



      
    
      
    



      
    
      
            
## Class sequenceStepper


        
- [sequenceStepper::_classFactory](readme.md#sequenceStepper::_classFactory)(id, manual)

- [sequenceStepper::addCommands](readme.md#sequenceStepper::addCommands)(cmdFunction, failure)

        
- [sequenceStepper::step](readme.md#sequenceStepper::step)(t)



   
    
### trait _dataTrait

        
- [_dataTrait::guid](readme.md#_dataTrait::guid)(t)

- [_dataTrait::isArray](readme.md#_dataTrait::isArray)(t)

- [_dataTrait::isFunction](readme.md#_dataTrait::isFunction)(fn)

- [_dataTrait::isObject](readme.md#_dataTrait::isObject)(t)


    
    


   
      
    



      
    
      
    
      
            
## Class later


        
- [later::add](readme.md#later::add)(fn, thisObj, args)

- [later::after](readme.md#later::after)(seconds, fn, name)

- [later::asap](readme.md#later::asap)(fn)

- [later::every](readme.md#later::every)(seconds, fn, name)

        
- [later::once](readme.md#later::once)(key, fn, value)

- [later::onFrame](readme.md#later::onFrame)(fn)

- [later::polyfill](readme.md#later::polyfill)(t)

- [later::removeFrameFn](readme.md#later::removeFrameFn)(fn)



   


   



      
    





   
## Class jestBench


The class has following internal singleton variables:
        
        
### <a name="jestBench::fiddle"></a>jestBench::fiddle(options, parentNode)


```javascript
var iframe = document.createElement("IFRAME");
var myId = this.guid();

var html = decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chead%3E"); 

if(options.scripts) options.scripts.forEach( function(s) {
    html+=decodeURIComponent("%3Cscript%20src%3D'")+s+decodeURIComponent("'%3E%3C%2Fscript%3E");
});
if(options.stylesheets) options.stylesheets.forEach( function(s) {
    html+='<link rel="stylesheet" href="'+s+'"></link>';
});
if(options.head) html+=options.head;
html+="</head><body>";

if(!options.callBackName) options.callBackName = "fiddleDone";

if(options.onReady && options.callBackName ) {
    var ls = window['localStorage'];
    var waitFor = function() {
        var res;
        if( res = ls.getItem(myId) ) {
            later().removeFrameFn( waitFor );
            options.onReady( JSON.parse( res ) );
        }
    }
    later().onFrame(waitFor);
    html += decodeURIComponent("%3Cscript%3E")+"function "+options.callBackName+"(v){window['localStorage'].setItem('"+myId+"', JSON.stringify(v));}";
    html += decodeURIComponent("%3C%2Fscript%3E");
}

if(options.html) html+=options.html;
if(options.jsCode) html+=decodeURIComponent("%3Cscript%3E")+options.jsCode+decodeURIComponent("%3C%2Fscript%3E");
html+="</body></html>";
if(parentNode) {
    parentNode.appendChild(iframe);
} else {
    document.body.appendChild(iframe);
}

iframe.contentWindow.document.open();
iframe.contentWindow.document.write(html);
iframe.contentWindow.document.close();    
var s = iframe.style;
s.width  = (options.width || 800)+"px";
s.height = (options.height || 600)+"px";

return iframe;
```

### <a name="jestBench::getDbResults"></a>jestBench::getDbResults(databaseName, callBackFn)


```javascript
var db = _localDB(databaseName,
    {
        tables : {
            sessions : {
                createOptions : {  autoIncrement : true }
            }
        }
        
    });
db.then( function() {
    
    db.table("sessions").getAll().then( function( res ) {
        callBackFn( res );
    })
    .fail(function() {
        callBackFn( null );
    });
})
```

### jestBench::constructor( options )

```javascript
this._options = options;
```
        
### <a name="jestBench::runTests"></a>jestBench::runTests(options)


```javascript

var me = this;
this._results = [];

var myCnt = options.tests.length;
var currCnt = 0;

var stepper = sequenceStepper();
// addCommands

options.tests.forEach( function(fn) {
   
   var jsCode = "", myFrame;
   jsCode+="try {";
   
   if(!options.timeOut) options.timeOut = 1500;

   if( options.timeOut ) {
       jsCode+="\n setTimeout( function() { fiddleDone({result : false, exception:true, text :'timeout "+options.timeOut+"ms' }); }, "+options.timeOut+");\n";
   }   

   if( options.prepCode ) {
       jsCode+=";\n"+options.prepCode+";\n";
   } 
   if(typeof fn === 'string') {
       jsCode += "(function(testResults) {"+fn+"})(fiddleDone)";
   } else {
       // this should run the function... 
       jsCode += "("+fn.toString()+")(fiddleDone)";
   }
   jsCode+="\n} catch(e) { fiddleDone({result : false, exception:true, text : e.message }); } ";
   
   stepper.addCommands(
       function( done ) {
           var obj = {
               stylesheets : options.stylesheets || [],
               scripts : options.scripts || [],
               html : options.html || "",
               jsCode : jsCode,
               width : options.width || 800,
               height : options.height || 600,
               onReady : function(res) {
                   me._results.push(res);
                   myFrame.parentNode.removeChild(myFrame);
                   done();
                   currCnt++;
                   if(currCnt==myCnt) {
                       if(options.onReady) {
                            options.onReady( me._results );   
                       }
                       if(options.toIndexedDB) {
                           me.saveToIndexed( options.toIndexedDB, me._results, options.description );
                       }
                   }
               }
           };
           myFrame = me.fiddle( obj );
       });

});
```

### <a name="jestBench::saveToIndexed"></a>jestBench::saveToIndexed(databaseName, rows, extra)


```javascript
var db = _localDB(databaseName,
    {
        tables : {
            sessions : {
                createOptions : {  autoIncrement : true }
            }
        }
        
    });
db.then( function() {
    
    db.table("sessions").addRows( [ {
        testRunUTC : (new Date()).getTime(),
        extra   : extra || {} ,
        results :  rows 
    }]);
})
```



   
    
    
    
    
    
    
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait::guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait::isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait::isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait::isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    
    
    


   
      
            
## Class _promise


The class has following internal singleton variables:
        
        
### <a name="_promise::all"></a>_promise::all(firstArg)


```javascript

var args;
if(this.isArray(firstArg)) {
  args = firstArg;
} else {
  args = Array.prototype.slice.call(arguments, 0);
}
// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = new Array(targetLen);
    
return this.then(
    function() {
 
        var allPromise = _promise();
        if(args.length==0) {
            allPromise.resolve([]);
        }
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[index] = v;
                    // console.log("Got a promise...",b, " cnt = ", rCnt);
                    rCnt++;
                    if(rCnt==targetLen) {
                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });



    

```

### <a name="_promise::collect"></a>_promise::collect(collectFn, promiseList, results)


```javascript

var args;
if(this.isArray(promiseList)) {
  args = promiseList;
} else {
  args = [promiseList];
}

// console.log(args);
var targetLen = args.length,
    isReady = false,
    noMore = false,
    rCnt = 0,
    myPromises = [],
    myResults = results || {};
    
return this.then(
    function() {
 
        var allPromise = _promise();
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if( (isReady && !noMore) || (noMore==false && targetLen == rCnt) ) {
                        allPromise.resolve(myResults);
                        noMore = true;
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise::fail"></a>_promise::fail(fn)


```javascript
return this.then(null, fn);
```

### <a name="_promise::fulfill"></a>_promise::fulfill(withValue)


```javascript
// if(this._fulfilled || this._rejected) return;

if(this._rejected) return;
if(this._fulfilled && withValue != this._stateValue) {
    return;
}

var me = this;
this._fulfilled = true;
this._stateValue = withValue;

var chCnt = this._childPromises.length;

while(chCnt--) {
    var p = this._childPromises.shift();
    if(p._onFulfill) {
        try {
            var x = p._onFulfill(withValue);
            // console.log("Returned ",x);
            if(typeof(x)!="undefined") {
                p.resolve(x);
            } else {
                p.fulfill(withValue);
            }
        } catch(e) {
            // console.error(e);
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.fulfill(withValue);
    }
};
// this._childPromises.length = 0;
this._state = 1;
this.triggerStateChange();

```

### <a name="_promise::genPlugin"></a>_promise::genPlugin(fname, fn)


```javascript
var me = this;
this.plugin(fname,
    function() {
        var args = Array.prototype.slice.call(arguments,0);
        console.log("Plugin args", args);
        var myPromise = _promise();
        this.then(function(v) {
            var args2 = Array.prototype.slice.call(arguments,0);
            var z = args.concat(args2);
            var res = fn.apply(this,z); 
            myPromise.resolve(res);
        }, function(r) {
            myPromise.reject(r);
        });
        return myPromise;

    }
);
```

### _promise::constructor( onFulfilled, onRejected )

```javascript
// 0 = pending
// 1 = fullfilled
// 2 = error

this._state = 0;
this._stateValue = null;
this._isAPromise = true;
this._childPromises = [];

if(this.isFunction(onFulfilled))
    this._onFulfill = onFulfilled;
if(this.isFunction(onRejected))
    this._onReject = onRejected;
    
if(!onRejected && this.isFunction(onFulfilled) ) {
    
    
    
    var me = this;
    later().asap(
        function() {
            console.log("--- calling the onFulfilled ");
            onFulfilled( function(v) {
                me.resolve(v)
            }, function(v) {
                me.resolve(v);
            });           
        });
 
}
```
        
### <a name="_promise::isFulfilled"></a>_promise::isFulfilled(t)


```javascript
return this._state == 1;
```

### <a name="_promise::isPending"></a>_promise::isPending(t)


```javascript
return this._state == 0;
```

### <a name="_promise::isRejected"></a>_promise::isRejected(v)


```javascript
return this._state == 2;
```

### <a name="_promise::nodeStyle"></a>_promise::nodeStyle(fname, fn)


```javascript
var me = this;
this.plugin(fname,
    function() {
        var args = Array.prototype.slice.call(arguments,0);
        var last, userCb, cbIndex=0;
        if(args.length>=0) {
            last = args[args.length-1];
            if(Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length-1;
            }
        }

        var mainPromise = wishes().pending();
        this.then(function() {
            var nodePromise = wishes().pending();
            var args2 = Array.prototype.slice.call(arguments,0);
            console.log("Orig args", args);
            console.log("Then args", args2);
            var z;
            if(args.length==0) 
                z = args2;
            if(args2.length==0)
                z = args;
            if(!z) z = args2.concat(args);
            cbIndex = z.length; // 0,fn... 2
            if(userCb) cbIndex--;
            z[cbIndex] = function(err) {
                if(err) {
                    console.log("Got error ",err);
                    nodePromise.reject(err);
                    mainPromise.reject(err);
                    return;
                }
                if(userCb) {
                    var args = Array.prototype.slice.call(arguments);
                    var res = userCb.apply(this, args);
                    mainPromise.resolve(res);
                } else {
                    var args = Array.prototype.slice.call(arguments,1);
                    mainPromise.resolve.apply(mainPromise,args);
                }
            }
            nodePromise.then( function(v) {
                mainPromise.resolve(v);
            });
            
            console.log("nodeStyle after concat", z);
            var res = fn.apply(this,z); 
            // myPromise.resolve(res);
            // return nodePromise;
            return nodePromise;
        }, function(v) {
            mainPromise.reject(v);
        });
        return mainPromise;
        /*
           log("..... now waiting "+ms);
           var p = waitFor(ms);
           p.then( function(v) {
               myPromise.resolve(v);
           });
       */
    }
);
```

### <a name="_promise::onStateChange"></a>_promise::onStateChange(fn)


```javascript

if(!this._listeners)
    this._listeners = [];

this._listeners.push(fn);
```

### <a name="_promise::plugin"></a>_promise::plugin(n, fn)


```javascript

_myTrait_[n] = fn;

return this;
```

### <a name="_promise::props"></a>_promise::props(obj)


```javascript
var args = [];

for(var n in obj) {
    if(obj.hasOwnProperty(n)) {
        args.push({
           name : n,
           promise : obj[n]
        });
    }
}


// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = {};
    
return this.then(
    function() {
 
        var allPromise = wishes().pending();
        args.forEach( function(def) {
            var b = def.promise,
                name = def.name;
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[name] = v;
                    rCnt++;
                    if(rCnt==targetLen) {
                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise::reject"></a>_promise::reject(withReason)


```javascript

// if(this._rejected || this._fulfilled) return;

// conso

if(this._fulfilled) return;
if(this._rejected && withReason != this._rejectReason) return;


this._state = 2;
this._rejected = true;
this._rejectReason = withReason;
var me = this;

var chCnt = this._childPromises.length;
while(chCnt--) {
    var p = this._childPromises.shift();

    if(p._onReject) {
        try {
            p._onReject(withReason);
            p.reject(withReason);
        } catch(e) {
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.reject(withReason);
    }
};

// this._childPromises.length = 0;
this.triggerStateChange();

```

### <a name="_promise::rejectReason"></a>_promise::rejectReason(reason)


```javascript
if(reason) {
    this._rejectReason = reason;
    return;
}
return this._rejectReason;
```

### <a name="_promise::resolve"></a>_promise::resolve(x)


```javascript

// console.log("Resolving ", x);

// can not do this many times...
if(this._state>0) return;

if(x==this) {
    // error
    this._rejectReason = "TypeError";
    this.reject(this._rejectReason);
    return;
}

if(this.isObject(x) && x._isAPromise) {
    
    // 
    this._state = x._state;
    this._stateValue = x._stateValue;
    this._rejectReason = x._rejectReason;
    // ... 
    if(this._state===0) {
        var me = this;
        x.onStateChange( function() {
            if(x._state==1) {
                // console.log("State change");
                me.resolve(x.value());
            } 
            if(x._state==2) {
                me.reject(x.rejectReason());                
            }
        });
    }
    if(this._state==1) {
        // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
        this.fulfill(this._stateValue);    
    }
    if(this._state==2) {
        // console.log("Relved to be Promise was rejected ", x._rejectReason);
        this.reject(this._rejectReason);
    }
    return;
}
if(this.isObject(x) && x.then && this.isFunction(x.then)) {
    // console.log("Thenable ", x);
    var didCall = false;
    try {
        // Call the x.then
        var  me = this;
        x.then.call(x, 
            function(y) {
                if(didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
            },
            function(r) {
                if(didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
            });
    } catch(e) {
        if(!didCall) this.reject(e);
    }
    return;    
}
this._state = 1;
this._stateValue = x;

// fulfill the promise...
this.fulfill(x);

```

### <a name="_promise::state"></a>_promise::state(newState)


```javascript
if(typeof(newState)!="undefined") {
    this._state = newState;
}
return this._state;
```

### <a name="_promise::then"></a>_promise::then(onFulfilled, onRejected)


```javascript

if(!onRejected) onRejected = function() {};

var p = new _promise(onFulfilled, onRejected);
var me = this;

if(this._state==1) {
    later().asap( function() {
        me.fulfill(me.value());
    });
}
if(this._state==2) {
    ater().asap( function() {
        me.reject(me.rejectReason());
    });
}
this._childPromises.push(p);
return p;



```

### <a name="_promise::triggerStateChange"></a>_promise::triggerStateChange(t)


```javascript
var me = this;
if(!this._listeners) return;
this._listeners.forEach( function(fn) {
    fn(me); 
});
// one-timer
this._listeners.length = 0;
```

### <a name="_promise::value"></a>_promise::value(v)


```javascript
if(typeof(v)!="undefined") {
    this._stateValue = v;
    return this;
}
return this._stateValue;
```



   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns::isArray"></a>util_fns::isArray(someVar)


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="util_fns::isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns::isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    
    
    


   
      
    
      
            
## Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later::add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later::after"></a>later::after(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0,
    remove : true
};
```

### <a name="later::asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later::every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {
    
   this.polyfill();
 
   var frame, cancelFrame;
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   if(v.remove) {
                       if(v.nextTime > 0) {
                          v.fn(); 
                          delete _everies[n];
                       } else {
                          v.nextTime = ms + v.step; 
                       }
                   } else {
                       v.fn();
                       v.nextTime = ms + v.step;
                   }
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later::once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later::onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later::polyfill"></a>later::polyfill(t)


```javascript

```

### <a name="later::removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    



      
    
      
            
## Class _localDB


The class has following internal singleton variables:
        
* _initDone
        
* _dbList
        
* _db
        
        
### <a name="_localDB::_initDB"></a>_localDB::_initDB(t)


```javascript

if(_db) return;
// In the following line, you should include the prefixes of implementations you want to test.
_db = window.indexedDB; //  || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

_initDone = true;

_dbList = _localDB( "sys.db", {
    tables : {
        databases : {
            createOptions : { keyPath : "name" },
        }
    }
});
```

### <a name="_localDB::clearDatabases"></a>_localDB::clearDatabases(fn)


```javascript
// console.log("Clear databases called ");

_dbList.then( function() {
  var dbs = _dbList.table("databases");
  // console.log(" --- reading --- ");
  dbs.forEach( function(data, cursor) {
     if(fn(data)) {
         // console.log("Trying to delete ", data.name);
         _db.deleteDatabase(data.name);
         cursor.delete();
     }       
  });

})
```

### <a name="_localDB::createTable"></a>_localDB::createTable(name, options)


```javascript

var objectStore = this._db.createObjectStore(name, options);

return this.table( name );


```

### <a name="_localDB::getDB"></a>_localDB::getDB(t)


```javascript
return this._db;
```

### <a name="_localDB::getStore"></a>_localDB::getStore(store_name, mode)


```javascript
var tx = this._db.transaction(store_name, mode);
return tx.objectStore(store_name);
```

### _localDB::constructor( dbName, options )

```javascript

if(this._db) return;
this._initDB();

if(!dbName) {
    return;
}

var me = this;

var request = _db.open(dbName, 4);

request.onerror = function(event) {
  // Do something with request.errorCode!
  console.error( event.target.errorCode );
};
request.onsuccess = function(event) {
  // Do something with request.result!
  _dbList.then( function() {
      var dbs = _dbList.table("databases");
      dbs.addRows( [{ name : dbName }]);
  })
  me._db = event.target.result;
  me.resolve(true);
  
};
request.onupgradeneeded = function (event) {

    var db = event.target.result;
    me._db = db;

    if(options && options.tables) {
        for(var n in options.tables) {
            if(options.tables.hasOwnProperty(n)) {
                var opts = options.tables[n];
                // Create another object store called "names" with the autoIncrement flag set as true.    
                var objStore = db.createObjectStore(n, opts.createOptions);
            }
        }
    }

};

```
        
### <a name="_localDB::table"></a>_localDB::table(name)


```javascript
return dbTable(this._db, name);
```



   
    
    
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait::guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait::isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait::isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait::isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
            
## Class dbTable


The class has following internal singleton variables:
        
        
### <a name="dbTable::addRows"></a>dbTable::addRows(rows)


```javascript

var prom = _promise();

var transaction = this._db.transaction([this._table], "readwrite");

var me = this;
// Do something when all the data is added to the database.
transaction.oncomplete = function(event) {
  // console.log("Writing into "+me._table+" was successfull");
  prom.resolve(true);
};

transaction.onerror = function(event) {
  prom.reject(event);
};

var objectStore = transaction.objectStore(this._table);
for (var i in rows) {
  var request = objectStore.add(rows[i]);
  request.onsuccess = function(event) {
    // console.log("Row ",i," written succesfully");
  };
}

return prom;
```

### <a name="dbTable::clear"></a>dbTable::clear(t)


```javascript

var prom = _promise();
var transaction = this._db.transaction(this._table, "readwrite");
var objectStore = transaction.objectStore(this._table);
var request = objectStore.clear();
request.onerror = function(event) {
  prom.fail(event.target.errorCode);
};
request.onsuccess = function(event) {
  prom.resolve( true );
};

return prom;

```

### <a name="dbTable::count"></a>dbTable::count(t)


```javascript
var prom = _promise();
var transaction = this._db.transaction([this._table], "readonly");

transaction.objectStore(this._table).count().onsuccess = function(e) {
	prom.resolve(e.target.result);
};

return prom;

```

### <a name="dbTable::forEach"></a>dbTable::forEach(fn)


```javascript

var trans = this._db.transaction(this._table, "readwrite");
var store = trans.objectStore(this._table);
var items = [];

trans.oncomplete = function(evt) {  
    
};

var cursorRequest = store.openCursor();

cursorRequest.onerror = function(error) {
    console.log(error);
};

cursorRequest.onsuccess = function(evt) {                    
    var cursor = evt.target.result;
    if (cursor) {
        fn(cursor.value, cursor);
        cursor.continue();
    }
};

```

### <a name="dbTable::get"></a>dbTable::get(key)


```javascript

var prom = _promise();
var transaction = this._db.transaction(this._table, "readonly");
var objectStore = transaction.objectStore(this._table);
var request = objectStore.get(key);

request.onerror = function(event) {
  // Handle errors!
  console.log("Could not get ", key);
  prom.fail(event.target.errorCode);
};
request.onsuccess = function(event) {
  prom.resolve( request.result );
};

return prom;
```

### <a name="dbTable::getAll"></a>dbTable::getAll(t)


```javascript

var prom = _promise();

var trans = this._db.transaction(this._table, "readonly");
var store = trans.objectStore(this._table);
var items = [];

trans.oncomplete = function(evt) {  
    prom.resolve(items);
};

var cursorRequest = store.openCursor();

cursorRequest.onerror = function(error) {
    console.log(error);
};

cursorRequest.onsuccess = function(evt) {                    
    var cursor = evt.target.result;
    if (cursor) {
        items.push(cursor.value);
        cursor.continue();
    }
};

return prom;

```

### dbTable::constructor( db, tableName )

```javascript

this._db = db;
this._table = tableName;

```
        
### <a name="dbTable::readAndDelete"></a>dbTable::readAndDelete(t)


```javascript

var prom = _promise();

var trans = this._db.transaction(this._table, "readwrite");
var store = trans.objectStore(this._table);
var items = [];

trans.oncomplete = function(evt) {  
    prom.resolve(items);
};

var cursorRequest = store.openCursor();

cursorRequest.onerror = function(error) {
    console.log(error);
};

cursorRequest.onsuccess = function(evt) {                    
    var cursor = evt.target.result;
    if (cursor) {
        items.push(cursor.value);
        cursor.delete(); // remove the key and continue...
        cursor.continue();
    }
};

return prom;

```

### <a name="dbTable::update"></a>dbTable::update(key, data)


```javascript
var prom = _promise();
var me = this;
var transaction = this._db.transaction([this._table], "readwrite");
var objectStore = transaction.objectStore(this._table);
try {
    var request = objectStore.get(key);
    request.onerror = function(event) {
      if(!request.result) {
          me.addRows([data]).then( function() {
              prom.resolve(data);
          });
          return;
      }     
      prom.fail(event.target.errorCode);
    };
    request.onsuccess = function(event) {
      if(!request.result) {
          me.addRows([data]).then( function() {
              prom.resolve(data);
          });
          return;
      }
      var requestUpdate = objectStore.put(data);
      requestUpdate.onerror = function(event) {
         // Do something with the error
         prom.fail( "update failed " );
      };
      requestUpdate.onsuccess = function(event) {
         // Success - the data is updated!
         prom.resolve(data);
      };
      
    };
} catch(e) {
    return this.addRows( [data] );
}

return prom;
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait::guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait::isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait::isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait::isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
    



      
    
      
            
## Class sequenceStepper


The class has following internal singleton variables:
        
* _instances
        
        
### <a name="sequenceStepper::_classFactory"></a>sequenceStepper::_classFactory(id, manual)


```javascript

if(id===false && manual) return;

if(!_instances) {
    _instances = {};
}

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="sequenceStepper::addCommands"></a>sequenceStepper::addCommands(cmdFunction, failure)


```javascript

if(this.isArray(cmdFunction)) {
    var me = this;
    cmdFunction.forEach( function(c) {
        me.addCommands( c );
    });
    return this;
}

this._commands.push( { 
                        fnCmd : cmdFunction, 
                        fnFail: failure, 
                        async : true }  );
```

### sequenceStepper::constructor( myId, manual )

```javascript

if(!this._commands) {
    this._commands = [];
    this.waitingList = [];
    this._index = 0;
}

var me = this;
if(!manual) {
    later().every(1/30, function() {
        me.step();
    });
}

```
        
### <a name="sequenceStepper::step"></a>sequenceStepper::step(t)


```javascript
var i = this._index,
    len = this._commands.length;
    
if(i==len) return;

var first = _promise(),
    currentProm = first,
    myPromise = _promise(),
    me = this;

while(i<len) {
    var fn = this._commands[i];
    (function(fn) {
        currentProm = currentProm.then( function() {
            
            var p = _promise();
            
            // if(fn.async) {

            fn.fnCmd( function(res) {
                p.resolve(true); 
            }, function(failReason) {
                p.resolve(true);
                if(fn.fnFail) fn.fnFail( failReason );
            });                   

            return p; 
        }).fail( function(reason) {
            if(fn.fnFail) fn.fnFail( reason );
        });
    }(fn));
    this._index++;
    i++;
}

currentProm.then( function() {
   me.waitingList.shift(); // remvoe this promise from the queque
   myPromise.resolve(true);
   if(me.waitingList.length) {
       var newP = me.waitingList[0];
       newP.resolve(true);
   } 
}).fail( function(m) {
    
});


this.waitingList.push(first);
if(this.waitingList.length==1) {
    first.resolve(true);
} 
return myPromise;

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait::guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait::isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait::isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait::isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
    
      
            
## Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later::add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later::after"></a>later::after(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0,
    remove : true
};
```

### <a name="later::asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later::every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {
    
   this.polyfill();
 
   var frame, cancelFrame;
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   if(v.remove) {
                       if(v.nextTime > 0) {
                          v.fn(); 
                          delete _everies[n];
                       } else {
                          v.nextTime = ms + v.step; 
                       }
                   } else {
                       v.fn();
                       v.nextTime = ms + v.step;
                   }
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later::once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later::onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later::polyfill"></a>later::polyfill(t)


```javascript

```

### <a name="later::removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    




