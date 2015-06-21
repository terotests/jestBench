var jestBench_prototype = function() {
  'use strict';
  var _promise_prototype = function() {
    'use strict';
    var later_prototype = function() {;
      (function(_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;
        _myTrait_.add = function(fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        }
        _myTrait_.after = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        }
        _myTrait_.asap = function(fn) {
          this.add(fn);

        }
        _myTrait_.every = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof(window) != "undefined") {
              var frame = window['requestAnimationFrame'],
                cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame)
              frame = function(cb) {
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
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }

              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    if (v.remove) {
                      if (v.nextTime > 0) {
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
                  if (v.until) {
                    if (v.until < ms) {
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
        });
        _myTrait_.once = function(key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        }
        _myTrait_.onFrame = function(fn) {

          _framers.push(fn);
        }
        _myTrait_.polyfill = function(t) {
          // --- let's not ---
        }
        _myTrait_.removeFrameFn = function(fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        }
      }(this));
    }
    var later = function(a, b, c, d, e, f, g, h) {
      if (this instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();
    if (typeof(window) != 'undefined') window['later'] = later;
    if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
    (function(_myTrait_) {
      _myTrait_.isArray = function(someVar) {
        return Object.prototype.toString.call(someVar) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(obj) {
        return obj === Object(obj);
      }
    }(this));;
    (function(_myTrait_) {
      _myTrait_.all = function(firstArg) {

        var args;
        if (this.isArray(firstArg)) {
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
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[index] = v;
                  // console.log("Got a promise...",b, " cnt = ", rCnt);
                  rCnt++;
                  if (rCnt == targetLen) {
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





      }
      _myTrait_.collect = function(collectFn, promiseList, results) {

        var args;
        if (this.isArray(promiseList)) {
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
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
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

      }
      _myTrait_.fail = function(fn) {
        return this.then(null, fn);
      }
      _myTrait_.fulfill = function(withValue) {
        // if(this._fulfilled || this._rejected) return;

        if (this._rejected) return;
        if (this._fulfilled && withValue != this._stateValue) {
          return;
        }

        var me = this;
        this._fulfilled = true;
        this._stateValue = withValue;

        var chCnt = this._childPromises.length;

        while (chCnt--) {
          var p = this._childPromises.shift();
          if (p._onFulfill) {
            try {
              var x = p._onFulfill(withValue);
              // console.log("Returned ",x);
              if (typeof(x) != "undefined") {
                p.resolve(x);
              } else {
                p.fulfill(withValue);
              }
            } catch (e) {
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

      }
      _myTrait_.genPlugin = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log("Plugin args", args);
            var myPromise = _promise();
            this.then(function(v) {
              var args2 = Array.prototype.slice.call(arguments, 0);
              var z = args.concat(args2);
              var res = fn.apply(this, z);
              myPromise.resolve(res);
            }, function(r) {
              myPromise.reject(r);
            });
            return myPromise;

          }
        );
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
        // 0 = pending
        // 1 = fullfilled
        // 2 = error

        this._state = 0;
        this._stateValue = null;
        this._isAPromise = true;
        this._childPromises = [];

        if (this.isFunction(onFulfilled))
          this._onFulfill = onFulfilled;
        if (this.isFunction(onRejected))
          this._onReject = onRejected;

        if (!onRejected && this.isFunction(onFulfilled)) {



          var me = this;
          later().asap(
            function() {
              console.log("--- calling the onFulfilled ");
              onFulfilled(function(v) {
                me.resolve(v)
              }, function(v) {
                me.resolve(v);
              });
            });

        }
      });
      _myTrait_.isFulfilled = function(t) {
        return this._state == 1;
      }
      _myTrait_.isPending = function(t) {
        return this._state == 0;
      }
      _myTrait_.isRejected = function(v) {
        return this._state == 2;
      }
      _myTrait_.nodeStyle = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var last, userCb, cbIndex = 0;
            if (args.length >= 0) {
              last = args[args.length - 1];
              if (Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length - 1;
              }
            }

            var mainPromise = wishes().pending();
            this.then(function() {
              var nodePromise = wishes().pending();
              var args2 = Array.prototype.slice.call(arguments, 0);
              console.log("Orig args", args);
              console.log("Then args", args2);
              var z;
              if (args.length == 0)
                z = args2;
              if (args2.length == 0)
                z = args;
              if (!z) z = args2.concat(args);
              cbIndex = z.length; // 0,fn... 2
              if (userCb) cbIndex--;
              z[cbIndex] = function(err) {
                if (err) {
                  console.log("Got error ", err);
                  nodePromise.reject(err);
                  mainPromise.reject(err);
                  return;
                }
                if (userCb) {
                  var args = Array.prototype.slice.call(arguments);
                  var res = userCb.apply(this, args);
                  mainPromise.resolve(res);
                } else {
                  var args = Array.prototype.slice.call(arguments, 1);
                  mainPromise.resolve.apply(mainPromise, args);
                }
              }
              nodePromise.then(function(v) {
                mainPromise.resolve(v);
              });

              console.log("nodeStyle after concat", z);
              var res = fn.apply(this, z);
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
      }
      _myTrait_.onStateChange = function(fn) {

        if (!this._listeners)
          this._listeners = [];

        this._listeners.push(fn);
      }
      _myTrait_.plugin = function(n, fn) {

        _myTrait_[n] = fn;

        return this;
      }
      _myTrait_.props = function(obj) {
        var args = [];

        for (var n in obj) {
          if (obj.hasOwnProperty(n)) {
            args.push({
              name: n,
              promise: obj[n]
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
            args.forEach(function(def) {
              var b = def.promise,
                name = def.name;
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[name] = v;
                  rCnt++;
                  if (rCnt == targetLen) {
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

      }
      _myTrait_.reject = function(withReason) {

        // if(this._rejected || this._fulfilled) return;

        // conso

        if (this._fulfilled) return;
        if (this._rejected && withReason != this._rejectReason) return;


        this._state = 2;
        this._rejected = true;
        this._rejectReason = withReason;
        var me = this;

        var chCnt = this._childPromises.length;
        while (chCnt--) {
          var p = this._childPromises.shift();

          if (p._onReject) {
            try {
              p._onReject(withReason);
              p.reject(withReason);
            } catch (e) {
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

      }
      _myTrait_.rejectReason = function(reason) {
        if (reason) {
          this._rejectReason = reason;
          return;
        }
        return this._rejectReason;
      }
      _myTrait_.resolve = function(x) {

        // console.log("Resolving ", x);

        // can not do this many times...
        if (this._state > 0) return;

        if (x == this) {
          // error
          this._rejectReason = "TypeError";
          this.reject(this._rejectReason);
          return;
        }

        if (this.isObject(x) && x._isAPromise) {

          // 
          this._state = x._state;
          this._stateValue = x._stateValue;
          this._rejectReason = x._rejectReason;
          // ... 
          if (this._state === 0) {
            var me = this;
            x.onStateChange(function() {
              if (x._state == 1) {
                // console.log("State change");
                me.resolve(x.value());
              }
              if (x._state == 2) {
                me.reject(x.rejectReason());
              }
            });
          }
          if (this._state == 1) {
            // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
            this.fulfill(this._stateValue);
          }
          if (this._state == 2) {
            // console.log("Relved to be Promise was rejected ", x._rejectReason);
            this.reject(this._rejectReason);
          }
          return;
        }
        if (this.isObject(x) && x.then && this.isFunction(x.then)) {
          // console.log("Thenable ", x);
          var didCall = false;
          try {
            // Call the x.then
            var me = this;
            x.then.call(x,
              function(y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              },
              function(r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
          } catch (e) {
            if (!didCall) this.reject(e);
          }
          return;
        }
        this._state = 1;
        this._stateValue = x;

        // fulfill the promise...
        this.fulfill(x);

      }
      _myTrait_.state = function(newState) {
        if (typeof(newState) != "undefined") {
          this._state = newState;
        }
        return this._state;
      }
      _myTrait_.then = function(onFulfilled, onRejected) {

        if (!onRejected) onRejected = function() {};

        var p = new _promise(onFulfilled, onRejected);
        var me = this;

        if (this._state == 1) {
          later().asap(function() {
            me.fulfill(me.value());
          });
        }
        if (this._state == 2) {
          ater().asap(function() {
            me.reject(me.rejectReason());
          });
        }
        this._childPromises.push(p);
        return p;



      }
      _myTrait_.triggerStateChange = function(t) {
        var me = this;
        if (!this._listeners) return;
        this._listeners.forEach(function(fn) {
          fn(me);
        });
        // one-timer
        this._listeners.length = 0;
      }
      _myTrait_.value = function(v) {
        if (typeof(v) != "undefined") {
          this._stateValue = v;
          return this;
        }
        return this._stateValue;
      }
    }(this));
  }
  var _promise = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _promise) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _promise(a, b, c, d, e, f, g, h);
  };
  _promise._classInfo = {
    name: '_promise'
  };
  _promise.prototype = new _promise_prototype();
  if (typeof(window) != 'undefined') window['_promise'] = _promise;
  if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
  var _localDB_prototype = function() {
    'use strict';
    var dbTable_prototype = function() {;
      (function(_myTrait_) {
        var _eventOn;
        var _commands;
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          //return Math.random();
          // return Math.random().toString(36);

          /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
          /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
        }
        _myTrait_.isArray = function(t) {

          if (typeof(t) == "undefined") return this.__isA;

          return Object.prototype.toString.call(t) === '[object Array]';
        }
        _myTrait_.isFunction = function(fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        }
        _myTrait_.isObject = function(t) {

          if (typeof(t) == "undefined") return this.__isO;

          return t === Object(t);
        }
      }(this));;
      (function(_myTrait_) {
        _myTrait_.addRows = function(rows) {

          var prom = _promise();

          var transaction = this._db.transaction([this._table], "readwrite");

          var me = this;
          // Do something when all the data is added to the database.
          transaction.oncomplete = function(event) {
            // console.log("Writing into "+me._table+" was successfull");
            prom.resolve(true);
          };

          transaction.onerror = function(event) {
            // Don't forget to handle errors!
          };

          var objectStore = transaction.objectStore(this._table);
          for (var i in rows) {
            var request = objectStore.add(rows[i]);
            request.onsuccess = function(event) {
              // console.log("Row ",i," written succesfully");
            };
          }

          return prom;
        }
        _myTrait_.clear = function(t) {

          var prom = _promise();
          var transaction = this._db.transaction(this._table, "readwrite");
          var objectStore = transaction.objectStore(this._table);
          var request = objectStore.clear();
          request.onerror = function(event) {
            prom.fail(event.target.errorCode);
          };
          request.onsuccess = function(event) {
            prom.resolve(true);
          };

          return prom;

        }
        _myTrait_.count = function(t) {
          var prom = _promise();
          var transaction = this._db.transaction([this._table], "readonly");

          transaction.objectStore(this._table).count().onsuccess = function(e) {
            prom.resolve(e.target.result);
          };

          return prom;

        }
        _myTrait_.forEach = function(fn) {

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

        }
        _myTrait_.get = function(key) {

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
            prom.resolve(request.result);
          };

          return prom;
        }
        _myTrait_.getAll = function(t) {

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

        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(db, tableName) {

          this._db = db;
          this._table = tableName;

        });
        _myTrait_.readAndDelete = function(t) {

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

        }
        _myTrait_.update = function(key, data) {
          var prom = _promise();
          var me = this;
          var transaction = this._db.transaction([this._table], "readwrite");
          var objectStore = transaction.objectStore(this._table);
          try {
            var request = objectStore.get(key);
            request.onerror = function(event) {
              if (!request.result) {
                me.addRows([data]).then(function() {
                  prom.resolve(data);
                });
                return;
              }
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function(event) {
              if (!request.result) {
                me.addRows([data]).then(function() {
                  prom.resolve(data);
                });
                return;
              }
              var requestUpdate = objectStore.put(data);
              requestUpdate.onerror = function(event) {
                // Do something with the error
                prom.fail("update failed ");
              };
              requestUpdate.onsuccess = function(event) {
                // Success - the data is updated!
                prom.resolve(data);
              };

            };
          } catch (e) {
            return this.addRows([data]);
          }

          return prom;
        }
      }(this));
    }
    var dbTable = function(a, b, c, d, e, f, g, h) {
      if (this instanceof dbTable) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != dbTable._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new dbTable(a, b, c, d, e, f, g, h);
    };
    dbTable._classInfo = {
      name: 'dbTable'
    };
    dbTable.prototype = new dbTable_prototype();
    if (typeof(window) != 'undefined') window['dbTable'] = dbTable;
    if (typeof(window) != 'undefined') window['dbTable_prototype'] = dbTable_prototype;;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _initDone;
      var _dbList;
      var _db;
      _myTrait_._initDB = function(t) {

        if (_db) return;
        // In the following line, you should include the prefixes of implementations you want to test.
        _db = window.indexedDB; //  || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        _initDone = true;

        _dbList = _localDB("sys.db", {
          tables: {
            databases: {
              createOptions: {
                keyPath: "name"
              },
            }
          }
        });
      }
      _myTrait_.clearDatabases = function(fn) {
        // console.log("Clear databases called ");

        _dbList.then(function() {
          var dbs = _dbList.table("databases");
          // console.log(" --- reading --- ");
          dbs.forEach(function(data, cursor) {
            if (fn(data)) {
              // console.log("Trying to delete ", data.name);
              _db.deleteDatabase(data.name);
              cursor.delete();
            }
          });

        })
      }
      _myTrait_.createTable = function(name, options) {

        var objectStore = this._db.createObjectStore(name, options);

        return this.table(name);


      }
      _myTrait_.getDB = function(t) {
        return this._db;
      }
      _myTrait_.getStore = function(store_name, mode) {
        var tx = this._db.transaction(store_name, mode);
        return tx.objectStore(store_name);
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(dbName, options) {

        if (this._db) return;
        this._initDB();

        if (!dbName) {
          return;
        }

        var me = this;

        var request = _db.open(dbName, 4);

        request.onerror = function(event) {
          // Do something with request.errorCode!
          console.error(event.target.errorCode);
        };
        request.onsuccess = function(event) {
          // Do something with request.result!
          _dbList.then(function() {
            var dbs = _dbList.table("databases");
            dbs.addRows([{
              name: dbName
            }]);
          })
          me._db = event.target.result;
          me.resolve(true);

        };
        request.onupgradeneeded = function(event) {

          var db = event.target.result;
          me._db = db;

          if (options && options.tables) {
            for (var n in options.tables) {
              if (options.tables.hasOwnProperty(n)) {
                var opts = options.tables[n];
                // Create another object store called "names" with the autoIncrement flag set as true.    
                var objStore = db.createObjectStore(n, opts.createOptions);
              }
            }
          }

        };

      });
      _myTrait_.table = function(name) {
        return dbTable(this._db, name);
      }
    }(this));
  }
  _localDB_prototype.prototype = _promise.prototype
  var _localDB = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _localDB) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _localDB._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _localDB(a, b, c, d, e, f, g, h);
  };
  _localDB._classInfo = {
    name: '_localDB'
  };
  _localDB.prototype = new _localDB_prototype();
  if (typeof(window) != 'undefined') window['_localDB'] = _localDB;
  if (typeof(window) != 'undefined') window['_localDB_prototype'] = _localDB_prototype;
  var sequenceStepper_prototype = function() {;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        //return Math.random();
        // return Math.random().toString(36);

        /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
        /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _instances;
      if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
      _myTrait_.__factoryClass.push(function(id, manual) {

        if (id === false && manual) return;

        if (!_instances) {
          _instances = {};
        }

        if (_instances[id]) {
          return _instances[id];
        } else {
          _instances[id] = this;
        }
      });
      _myTrait_.addCommands = function(cmdFunction, failure) {

        if (this.isArray(cmdFunction)) {
          var me = this;
          cmdFunction.forEach(function(c) {
            me.addCommands(c);
          });
          return this;
        }

        this._commands.push({
          fnCmd: cmdFunction,
          fnFail: failure,
          async: true
        });
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(myId, manual) {

        if (!this._commands) {
          this._commands = [];
          this.waitingList = [];
          this._index = 0;
        }

        var me = this;
        if (!manual) {
          later().every(1 / 30, function() {
            me.step();
          });
        }

      });
      _myTrait_.step = function(t) {
        var i = this._index,
          len = this._commands.length;

        if (i == len) return;

        var first = _promise(),
          currentProm = first,
          myPromise = _promise(),
          me = this;

        while (i < len) {
          var fn = this._commands[i];
          (function(fn) {
            currentProm = currentProm.then(function() {

              var p = _promise();

              // if(fn.async) {

              fn.fnCmd(function(res) {
                p.resolve(true);
              }, function(failReason) {
                p.resolve(true);
                if (fn.fnFail) fn.fnFail(failReason);
              });

              return p;
            }).fail(function(reason) {
              if (fn.fnFail) fn.fnFail(reason);
            });
          }(fn));
          this._index++;
          i++;
        }

        currentProm.then(function() {
          me.waitingList.shift(); // remvoe this promise from the queque
          myPromise.resolve(true);
          if (me.waitingList.length) {
            var newP = me.waitingList[0];
            newP.resolve(true);
          }
        }).fail(function(m) {

        });


        this.waitingList.push(first);
        if (this.waitingList.length == 1) {
          first.resolve(true);
        }
        return myPromise;

      }
    }(this));
  }
  var sequenceStepper = function(a, b, c, d, e, f, g, h) {
    if (this instanceof sequenceStepper) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new sequenceStepper(a, b, c, d, e, f, g, h);
  };
  sequenceStepper._classInfo = {
    name: 'sequenceStepper'
  };
  sequenceStepper.prototype = new sequenceStepper_prototype();
  if (typeof(window) != 'undefined') window['sequenceStepper'] = sequenceStepper;
  if (typeof(window) != 'undefined') window['sequenceStepper_prototype'] = sequenceStepper_prototype;;
  (function(_myTrait_) {
    var _eventOn;
    var _commands;
    _myTrait_.guid = function(t) {

      return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    }
    _myTrait_.isArray = function(t) {

      if (typeof(t) == "undefined") return this.__isA;

      return Object.prototype.toString.call(t) === '[object Array]';
    }
    _myTrait_.isFunction = function(fn) {
      return Object.prototype.toString.call(fn) == '[object Function]';
    }
    _myTrait_.isObject = function(t) {

      if (typeof(t) == "undefined") return this.__isO;

      return t === Object(t);
    }
  }(this));;
  (function(_myTrait_) {
    _myTrait_.fiddle = function(options, parentNode) {
      var iframe = document.createElement("IFRAME");
      var myId = this.guid();

      var html = decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chead%3E");

      if (options.scripts) options.scripts.forEach(function(s) {
        html += decodeURIComponent("%3Cscript%20src%3D'") + s + decodeURIComponent("'%3E%3C%2Fscript%3E");
      });
      if (options.stylesheets) options.stylesheets.forEach(function(s) {
        html += '<link rel="stylesheet" href="' + s + '"></link>';
      });
      if (options.head) html += options.head;
      html += "</head><body>";

      if (!options.callBackName) options.callBackName = "fiddleDone";

      if (options.onReady && options.callBackName) {
        var ls = window['localStorage'];
        var waitFor = function() {
          var res;
          if (res = ls.getItem(myId)) {
            later().removeFrameFn(waitFor);
            options.onReady(JSON.parse(res));
          }
        }
        later().onFrame(waitFor);
        html += decodeURIComponent("%3Cscript%3E") + "function " + options.callBackName + "(v){window['localStorage'].setItem('" + myId + "', JSON.stringify(v));}";
        html += decodeURIComponent("%3C%2Fscript%3E");
      }

      if (options.html) html += options.html;
      if (options.jsCode) html += decodeURIComponent("%3Cscript%3E") + options.jsCode + decodeURIComponent("%3C%2Fscript%3E");
      html += "</body></html>";
      if (parentNode) {
        parentNode.appendChild(iframe);
      } else {
        document.body.appendChild(iframe);
      }

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
      var s = iframe.style;
      s.width = (options.width || 800) + "px";
      s.height = (options.height || 600) + "px";

      return iframe;
    }
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(options) {
      this._options = options;
    });
    _myTrait_.runTests = function(options) {

      var me = this;
      this._results = [];

      var myCnt = options.tests.length;
      var currCnt = 0;

      var stepper = sequenceStepper();
      // addCommands

      options.tests.forEach(function(fn) {

        var jsCode = "",
          myFrame;
        if (options.prepCode) {
          jsCode += ";\n" + options.prepCode + ";\n";
        }
        if (typeof fn === 'string') {
          jsCode += "(function(testResults) {" + fn + "})(fiddleDone)";
        } else {
          // this should run the function... 
          jsCode += "(" + fn.toString() + ")(fiddleDone)";
        }

        stepper.addCommands(
          function(done) {
            var obj = {
              stylesheets: options.stylesheets || [],
              scripts: options.scripts || [],
              html: options.html || "",
              jsCode: jsCode,
              width: options.width || 800,
              height: options.height || 600,
              onReady: function(res) {
                me._results.push(res);
                myFrame.parentNode.removeChild(myFrame);
                done();
                currCnt++;
                if (currCnt == myCnt) {
                  if (options.onReady) {
                    options.onReady(me._results);
                  }
                  if (options.toIndexedDB) {
                    me.saveToIndexed(options.toIndexedDB, me._results, options.description);
                  }
                }
              }
            };
            myFrame = me.fiddle(obj);
          });

      });
    }
    _myTrait_.saveToIndexed = function(databaseName, rows, extra) {
      var db = _localDB(databaseName, {
        tables: {
          sessions: {
            createOptions: {
              autoIncrement: true
            }
          }
        }

      });
      db.then(function() {

        db.table("sessions").addRows([{
          testRunUTC: (new Date()).getTime(),
          extra: extra || {},
          results: rows
        }]);
      })
    }
  }(this));
}
var jestBench = function(a, b, c, d, e, f, g, h) {
  if (this instanceof jestBench) {
    var args = [a, b, c, d, e, f, g, h];
    if (this.__factoryClass) {
      var m = this;
      var res;
      this.__factoryClass.forEach(function(initF) {
        res = initF.apply(m, args);
      });
      if (Object.prototype.toString.call(res) == '[object Function]') {
        if (res._classInfo.name != jestBench._classInfo.name) return new res(a, b, c, d, e, f, g, h);
      } else {
        if (res) return res;
      }
    }
    if (this.__traitInit) {
      var m = this;
      this.__traitInit.forEach(function(initF) {
        initF.apply(m, args);
      })
    } else {
      if (typeof this.init == 'function')
        this.init.apply(this, args);
    }
  } else return new jestBench(a, b, c, d, e, f, g, h);
};
jestBench._classInfo = {
  name: 'jestBench'
};
jestBench.prototype = new jestBench_prototype();
if (typeof(window) != 'undefined') window['jestBench'] = jestBench;
if (typeof(window) != 'undefined') window['jestBench_prototype'] = jestBench_prototype;