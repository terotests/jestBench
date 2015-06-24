// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var jestBench_prototype = function jestBench_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {
      var _eventOn;
      var _commands;

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {

        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param float t
       */
      _myTrait_.isArray = function (t) {
        return Object.prototype.toString.call(t) === '[object Array]';
      };

      /**
       * @param float fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      };

      /**
       * @param float t
       */
      _myTrait_.isObject = function (t) {
        return t === Object(t);
      };
    })(this);

    // the subclass definition comes around here then

    // The class definition is here...
    var _promise_prototype = function _promise_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float someVar
         */
        _myTrait_.isArray = function (someVar) {
          return Object.prototype.toString.call(someVar) === '[object Array]';
        };

        /**
         * @param Function fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param Object obj
         */
        _myTrait_.isObject = function (obj) {
          return obj === Object(obj);
        };
      })(this);

      // the subclass definition comes around here then

      // The class definition is here...
      var later_prototype = function later_prototype() {
        // Then create the traits and subclasses for this class here...

        (function (_myTrait_) {
          var _initDone;
          var _callers;
          var _oneTimers;
          var _everies;
          var _framers;

          // Initialize static variables here...

          /**
           * @param function fn
           * @param float thisObj
           * @param float args
           */
          _myTrait_.add = function (fn, thisObj, args) {
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
          };

          /**
           * @param float seconds
           * @param float fn
           * @param float name
           */
          _myTrait_.after = function (seconds, fn, name) {

            if (!name) {
              name = 'time' + new Date().getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0,
              remove: true
            };
          };

          /**
           * @param function fn
           */
          _myTrait_.asap = function (fn) {
            this.add(fn);
          };

          /**
           * @param float seconds
           * @param float fn
           * @param float name
           */
          _myTrait_.every = function (seconds, fn, name) {

            if (!name) {
              name = 'time' + new Date().getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0
            };
          };

          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
          _myTrait_.__traitInit.push(function (interval, fn) {
            if (!_initDone) {

              this.polyfill();

              var frame, cancelFrame;
              if (typeof window != 'undefined') {
                var frame = window['requestAnimationFrame'],
                    cancelFrame = window['cancelRequestAnimationFrame'];
                ['', 'ms', 'moz', 'webkit', 'o'].forEach(function (x) {
                  if (!frame) {
                    frame = window[x + 'RequestAnimationFrame'];
                    cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                  }
                });
              }

              if (!frame) frame = function (cb) {
                return setTimeout(cb, 16);
              };

              if (!cancelFrame) cancelFrame = function (id) {
                clearTimeout(id);
              };

              _callers = [];
              _oneTimers = {};
              _everies = {};
              _framers = [];
              var lastMs = 0;

              var _callQueQue = function _callQueQue() {
                var ms = new Date().getTime();
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

          /**
           * @param  key
           * @param float fn
           * @param float value
           */
          _myTrait_.once = function (key, fn, value) {
            // _oneTimers

            _oneTimers[key] = [fn, value];
          };

          /**
           * @param function fn
           */
          _myTrait_.onFrame = function (fn) {

            _framers.push(fn);
          };

          /**
           * @param float t
           */
          _myTrait_.polyfill = function (t) {};

          /**
           * @param float fn
           */
          _myTrait_.removeFrameFn = function (fn) {

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
          };
        })(this);
      };

      var later = function later(a, b, c, d, e, f, g, h) {
        var m = this,
            res;
        if (m instanceof later) {
          var args = [a, b, c, d, e, f, g, h];
          if (m.__factoryClass) {
            m.__factoryClass.forEach(function (initF) {
              res = initF.apply(m, args);
            });
            if (typeof res == 'function') {
              if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (m.__traitInit) {
            m.__traitInit.forEach(function (initF) {
              initF.apply(m, args);
            });
          } else {
            if (typeof m.init == 'function') m.init.apply(m, args);
          }
        } else return new later(a, b, c, d, e, f, g, h);
      };
      // inheritance is here

      later._classInfo = {
        name: 'later'
      };
      later.prototype = new later_prototype();

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param Array firstArg
         */
        _myTrait_.all = function (firstArg) {

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

          return this.then(function () {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[index] = v;
                  // console.log("Got a promise...",b, " cnt = ", rCnt);
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function collectFn
         * @param array promiseList
         * @param Object results
         */
        _myTrait_.collect = function (collectFn, promiseList, results) {

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

          return this.then(function () {

            var allPromise = _promise();
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if (isReady && !noMore || noMore == false && targetLen == rCnt) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.fail = function (fn) {
          return this.then(null, fn);
        };

        /**
         * @param float withValue
         */
        _myTrait_.fulfill = function (withValue) {
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
                if (typeof x != 'undefined') {
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
        };

        /**
         * @param float fname
         * @param float fn
         */
        _myTrait_.genPlugin = function (fname, fn) {
          var me = this;
          this.plugin(fname, function () {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log('Plugin args', args);
            var myPromise = _promise();
            this.then(function (v) {
              var args2 = Array.prototype.slice.call(arguments, 0);
              var z = args.concat(args2);
              var res = fn.apply(this, z);
              myPromise.resolve(res);
            }, function (r) {
              myPromise.reject(r);
            });
            return myPromise;
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled)) this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected)) this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {

            var me = this;
            later().asap(function () {
              console.log('--- calling the onFulfilled ');
              onFulfilled(function (v) {
                me.resolve(v);
              }, function (v) {
                me.resolve(v);
              });
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.isFulfilled = function (t) {
          return this._state == 1;
        };

        /**
         * @param float t
         */
        _myTrait_.isPending = function (t) {
          return this._state == 0;
        };

        /**
         * @param bool v
         */
        _myTrait_.isRejected = function (v) {
          return this._state == 2;
        };

        /**
         * @param float fname
         * @param float fn
         */
        _myTrait_.nodeStyle = function (fname, fn) {
          var me = this;
          this.plugin(fname, function () {
            var args = Array.prototype.slice.call(arguments, 0);
            var last,
                userCb,
                cbIndex = 0;
            if (args.length >= 0) {
              last = args[args.length - 1];
              if (Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length - 1;
              }
            }

            var mainPromise = wishes().pending();
            this.then(function () {
              var nodePromise = wishes().pending();
              var args2 = Array.prototype.slice.call(arguments, 0);
              console.log('Orig args', args);
              console.log('Then args', args2);
              var z;
              if (args.length == 0) z = args2;
              if (args2.length == 0) z = args;
              if (!z) z = args2.concat(args);
              cbIndex = z.length; // 0,fn... 2
              if (userCb) cbIndex--;
              z[cbIndex] = function (err) {
                if (err) {
                  console.log('Got error ', err);
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
              };
              nodePromise.then(function (v) {
                mainPromise.resolve(v);
              });

              console.log('nodeStyle after concat', z);
              var res = fn.apply(this, z);
              // myPromise.resolve(res);
              // return nodePromise;
              return nodePromise;
            }, function (v) {
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
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.onStateChange = function (fn) {

          if (!this._listeners) this._listeners = [];

          this._listeners.push(fn);
        };

        /**
         * @param float n
         * @param float fn
         */
        _myTrait_.plugin = function (n, fn) {

          _myTrait_[n] = fn;

          return this;
        };

        /**
         * @param Object obj
         */
        _myTrait_.props = function (obj) {
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

          return this.then(function () {

            var allPromise = wishes().pending();
            args.forEach(function (def) {
              var b = def.promise,
                  name = def.name;
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[name] = v;
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param Object withReason
         */
        _myTrait_.reject = function (withReason) {

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
        };

        /**
         * @param Object reason
         */
        _myTrait_.rejectReason = function (reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        };

        /**
         * @param Object x
         */
        _myTrait_.resolve = function (x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = 'TypeError';
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
              x.onStateChange(function () {
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
              x.then.call(x, function (y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              }, function (r) {
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
        };

        /**
         * @param float newState
         */
        _myTrait_.state = function (newState) {
          if (typeof newState != 'undefined') {
            this._state = newState;
          }
          return this._state;
        };

        /**
         * @param function onFulfilled
         * @param function onRejected
         */
        _myTrait_.then = function (onFulfilled, onRejected) {

          if (!onRejected) onRejected = function () {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function () {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            ater().asap(function () {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;
        };

        /**
         * @param float t
         */
        _myTrait_.triggerStateChange = function (t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function (fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        };

        /**
         * @param float v
         */
        _myTrait_.value = function (v) {
          if (typeof v != 'undefined') {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        };
      })(this);
    };

    var _promise = function _promise(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _promise._classInfo = {
      name: '_promise'
    };
    _promise.prototype = new _promise_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _localDB_prototype = function _localDB_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      // the subclass definition comes around here then

      // The class definition is here...
      var dbTable_prototype = function dbTable_prototype() {
        // Then create the traits and subclasses for this class here...

        // trait comes here...

        (function (_myTrait_) {
          var _eventOn;
          var _commands;

          // Initialize static variables here...

          /**
           * @param float t
           */
          _myTrait_.guid = function (t) {

            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          };

          /**
           * @param float t
           */
          _myTrait_.isArray = function (t) {
            return Object.prototype.toString.call(t) === '[object Array]';
          };

          /**
           * @param float fn
           */
          _myTrait_.isFunction = function (fn) {
            return Object.prototype.toString.call(fn) == '[object Function]';
          };

          /**
           * @param float t
           */
          _myTrait_.isObject = function (t) {
            return t === Object(t);
          };
        })(this);

        (function (_myTrait_) {

          // Initialize static variables here...

          /**
           * @param float rows
           */
          _myTrait_.addRows = function (rows) {

            var prom = _promise();

            var transaction = this._db.transaction([this._table], 'readwrite');

            var me = this;
            // Do something when all the data is added to the database.
            transaction.oncomplete = function (event) {
              // console.log("Writing into "+me._table+" was successfull");
              prom.resolve(true);
            };

            transaction.onerror = function (event) {
              prom.reject(event);
            };

            var objectStore = transaction.objectStore(this._table);
            for (var i in rows) {
              var request = objectStore.add(rows[i]);
              request.onsuccess = function (event) {};
            }

            return prom;
          };

          /**
           * @param float t
           */
          _myTrait_.clear = function (t) {

            var prom = _promise();
            var transaction = this._db.transaction(this._table, 'readwrite');
            var objectStore = transaction.objectStore(this._table);
            var request = objectStore.clear();
            request.onerror = function (event) {
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function (event) {
              prom.resolve(true);
            };

            return prom;
          };

          /**
           * @param float t
           */
          _myTrait_.count = function (t) {
            var prom = _promise();
            var transaction = this._db.transaction([this._table], 'readonly');

            transaction.objectStore(this._table).count().onsuccess = function (e) {
              prom.resolve(e.target.result);
            };

            return prom;
          };

          /**
           * @param float fn
           */
          _myTrait_.forEach = function (fn) {

            var trans = this._db.transaction(this._table, 'readwrite');
            var store = trans.objectStore(this._table);
            var items = [];

            trans.oncomplete = function (evt) {};

            var cursorRequest = store.openCursor();

            cursorRequest.onerror = function (error) {
              console.log(error);
            };

            cursorRequest.onsuccess = function (evt) {
              var cursor = evt.target.result;
              if (cursor) {
                fn(cursor.value, cursor);
                cursor['continue']();
              }
            };
          };

          /**
           * @param float key
           */
          _myTrait_.get = function (key) {

            var prom = _promise();
            var transaction = this._db.transaction(this._table, 'readonly');
            var objectStore = transaction.objectStore(this._table);
            var request = objectStore.get(key);

            request.onerror = function (event) {
              // Handle errors!
              console.log('Could not get ', key);
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function (event) {
              prom.resolve(request.result);
            };

            return prom;
          };

          /**
           * @param float t
           */
          _myTrait_.getAll = function (t) {

            var prom = _promise();

            var trans = this._db.transaction(this._table, 'readonly');
            var store = trans.objectStore(this._table);
            var items = [];

            trans.oncomplete = function (evt) {
              prom.resolve(items);
            };

            var cursorRequest = store.openCursor();

            cursorRequest.onerror = function (error) {
              console.log(error);
            };

            cursorRequest.onsuccess = function (evt) {
              var cursor = evt.target.result;
              if (cursor) {
                items.push(cursor.value);
                cursor['continue']();
              }
            };

            return prom;
          };

          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
          _myTrait_.__traitInit.push(function (db, tableName) {

            this._db = db;
            this._table = tableName;
          });

          /**
           * @param float t
           */
          _myTrait_.readAndDelete = function (t) {

            var prom = _promise();

            var trans = this._db.transaction(this._table, 'readwrite');
            var store = trans.objectStore(this._table);
            var items = [];

            trans.oncomplete = function (evt) {
              prom.resolve(items);
            };

            var cursorRequest = store.openCursor();

            cursorRequest.onerror = function (error) {
              console.log(error);
            };

            cursorRequest.onsuccess = function (evt) {
              var cursor = evt.target.result;
              if (cursor) {
                items.push(cursor.value);
                cursor['delete'](); // remove the key and continue...
                cursor['continue']();
              }
            };

            return prom;
          };

          /**
           * @param float key
           * @param float data
           */
          _myTrait_.update = function (key, data) {
            var prom = _promise();
            var me = this;
            var transaction = this._db.transaction([this._table], 'readwrite');
            var objectStore = transaction.objectStore(this._table);
            try {
              var request = objectStore.get(key);
              request.onerror = function (event) {
                if (!request.result) {
                  me.addRows([data]).then(function () {
                    prom.resolve(data);
                  });
                  return;
                }
                prom.fail(event.target.errorCode);
              };
              request.onsuccess = function (event) {
                if (!request.result) {
                  me.addRows([data]).then(function () {
                    prom.resolve(data);
                  });
                  return;
                }
                var requestUpdate = objectStore.put(data);
                requestUpdate.onerror = function (event) {
                  // Do something with the error
                  prom.fail('update failed ');
                };
                requestUpdate.onsuccess = function (event) {
                  // Success - the data is updated!
                  prom.resolve(data);
                };
              };
            } catch (e) {
              return this.addRows([data]);
            }

            return prom;
          };
        })(this);
      };

      var dbTable = function dbTable(a, b, c, d, e, f, g, h) {
        var m = this,
            res;
        if (m instanceof dbTable) {
          var args = [a, b, c, d, e, f, g, h];
          if (m.__factoryClass) {
            m.__factoryClass.forEach(function (initF) {
              res = initF.apply(m, args);
            });
            if (typeof res == 'function') {
              if (res._classInfo.name != dbTable._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (m.__traitInit) {
            m.__traitInit.forEach(function (initF) {
              initF.apply(m, args);
            });
          } else {
            if (typeof m.init == 'function') m.init.apply(m, args);
          }
        } else return new dbTable(a, b, c, d, e, f, g, h);
      };
      // inheritance is here

      dbTable._classInfo = {
        name: 'dbTable'
      };
      dbTable.prototype = new dbTable_prototype();

      (function (_myTrait_) {
        var _initDone;
        var _dbList;
        var _db;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._initDB = function (t) {

          if (_db) return;
          // In the following line, you should include the prefixes of implementations you want to test.
          _db = window.indexedDB; //  || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

          _initDone = true;

          _dbList = _localDB('sys.db', {
            tables: {
              databases: {
                createOptions: {
                  keyPath: 'name'
                } }
            }
          });
        };

        /**
         * @param float fn
         */
        _myTrait_.clearDatabases = function (fn) {
          // console.log("Clear databases called ");

          _dbList.then(function () {
            var dbs = _dbList.table('databases');
            // console.log(" --- reading --- ");
            dbs.forEach(function (data, cursor) {
              if (fn(data)) {
                // console.log("Trying to delete ", data.name);
                _db.deleteDatabase(data.name);
                cursor['delete']();
              }
            });
          });
        };

        /**
         * @param float name
         * @param float options
         */
        _myTrait_.createTable = function (name, options) {

          var objectStore = this._db.createObjectStore(name, options);

          return this.table(name);
        };

        /**
         * @param float t
         */
        _myTrait_.getDB = function (t) {
          return this._db;
        };

        /**
         * @param float store_name
         * @param float mode
         */
        _myTrait_.getStore = function (store_name, mode) {
          var tx = this._db.transaction(store_name, mode);
          return tx.objectStore(store_name);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (dbName, options) {

          if (this._db) return;
          this._initDB();

          if (!dbName) {
            return;
          }

          var me = this;

          var request = _db.open(dbName, 4);

          request.onerror = function (event) {
            // Do something with request.errorCode!
            console.error(event.target.errorCode);
          };
          request.onsuccess = function (event) {
            // Do something with request.result!
            _dbList.then(function () {
              var dbs = _dbList.table('databases');
              dbs.addRows([{
                name: dbName
              }]);
            });
            me._db = event.target.result;
            me.resolve(true);
          };
          request.onupgradeneeded = function (event) {

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

        /**
         * @param float name
         */
        _myTrait_.table = function (name) {
          return dbTable(this._db, name);
        };
      })(this);
    };

    var _localDB = function _localDB(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _localDB) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _localDB._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _localDB(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    _localDB_prototype.prototype = _promise.prototype;

    _localDB._classInfo = {
      name: '_localDB'
    };
    _localDB.prototype = new _localDB_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var sequenceStepper_prototype = function sequenceStepper_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instances;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id, manual) {

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

        /**
         * @param float cmdFunction
         * @param float failure
         */
        _myTrait_.addCommands = function (cmdFunction, failure) {

          if (this.isArray(cmdFunction)) {
            var me = this;
            cmdFunction.forEach(function (c) {
              me.addCommands(c);
            });
            return this;
          }

          this._commands.push({
            fnCmd: cmdFunction,
            fnFail: failure,
            async: true
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (myId, manual) {

          if (!this._commands) {
            this._commands = [];
            this.waitingList = [];
            this._index = 0;
          }

          var me = this;
          if (!manual) {
            later().every(1 / 30, function () {
              me.step();
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.step = function (t) {
          var i = this._index,
              len = this._commands.length;

          if (i == len) return;

          var first = _promise(),
              currentProm = first,
              myPromise = _promise(),
              me = this;

          while (i < len) {
            var fn = this._commands[i];
            (function (fn) {
              currentProm = currentProm.then(function () {

                var p = _promise();

                // if(fn.async) {

                fn.fnCmd(function (res) {
                  p.resolve(true);
                }, function (failReason) {
                  p.resolve(true);
                  if (fn.fnFail) fn.fnFail(failReason);
                });

                return p;
              }).fail(function (reason) {
                if (fn.fnFail) fn.fnFail(reason);
              });
            })(fn);
            this._index++;
            i++;
          }

          currentProm.then(function () {
            me.waitingList.shift(); // remvoe this promise from the queque
            myPromise.resolve(true);
            if (me.waitingList.length) {
              var newP = me.waitingList[0];
              newP.resolve(true);
            }
          }).fail(function (m) {});

          this.waitingList.push(first);
          if (this.waitingList.length == 1) {
            first.resolve(true);
          }
          return myPromise;
        };
      })(this);
    };

    var sequenceStepper = function sequenceStepper(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof sequenceStepper) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new sequenceStepper(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    sequenceStepper._classInfo = {
      name: 'sequenceStepper'
    };
    sequenceStepper.prototype = new sequenceStepper_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
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
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.after = function (seconds, fn, name) {

          if (!name) {
            name = 'time' + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = 'time' + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof window != 'undefined') {
              var frame = window['requestAnimationFrame'],
                  cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function (x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
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

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

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
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param float options
       * @param float parentNode
       */
      _myTrait_.fiddle = function (options, parentNode) {
        var iframe = document.createElement('IFRAME');
        var myId = this.guid();

        var html = decodeURIComponent('%3C!DOCTYPE%20html%3E%3Chead%3E');

        if (options.scripts) options.scripts.forEach(function (s) {
          html += decodeURIComponent('%3Cscript%20src%3D\'') + s + decodeURIComponent('\'%3E%3C%2Fscript%3E');
        });
        if (options.stylesheets) options.stylesheets.forEach(function (s) {
          html += '<link rel="stylesheet" href="' + s + '"></link>';
        });
        if (options.head) html += options.head;
        html += '</head><body>';

        if (!options.callBackName) options.callBackName = 'fiddleDone';

        if (options.onReady && options.callBackName) {
          var ls = window['localStorage'];
          var waitFor = function waitFor() {
            var res;
            if (res = ls.getItem(myId)) {
              later().removeFrameFn(waitFor);
              options.onReady(JSON.parse(res));
            }
          };
          later().onFrame(waitFor);
          html += decodeURIComponent('%3Cscript%3E') + 'function ' + options.callBackName + '(v){window[\'localStorage\'].setItem(\'' + myId + '\', JSON.stringify(v));}';
          html += decodeURIComponent('%3C%2Fscript%3E');
        }

        if (options.html) html += options.html;
        if (options.jsCode) html += decodeURIComponent('%3Cscript%3E') + options.jsCode + decodeURIComponent('%3C%2Fscript%3E');
        html += '</body></html>';
        if (parentNode) {
          parentNode.appendChild(iframe);
        } else {
          document.body.appendChild(iframe);
        }

        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
        var s = iframe.style;
        s.width = (options.width || 800) + 'px';
        s.height = (options.height || 600) + 'px';

        return iframe;
      };

      /**
       * @param float databaseName
       * @param float callBackFn
       */
      _myTrait_.getDbResults = function (databaseName, callBackFn) {
        var db = _localDB(databaseName, {
          tables: {
            sessions: {
              createOptions: {
                autoIncrement: true
              }
            }
          }

        });
        db.then(function () {

          db.table('sessions').getAll().then(function (res) {
            callBackFn(res);
          }).fail(function () {
            callBackFn(null);
          });
        });
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {
        this._options = options;
      });

      /**
       * @param float options
       */
      _myTrait_.runTests = function (options) {

        var me = this;
        this._results = [];

        var myCnt = options.tests.length;
        var currCnt = 0;

        var stepper = sequenceStepper();
        // addCommands

        options.tests.forEach(function (fn) {

          var jsCode = '',
              myFrame;
          jsCode += 'try {';

          if (!options.timeOut) options.timeOut = 1500;

          if (options.timeOut) {
            jsCode += '\n setTimeout( function() { fiddleDone({result : false, exception:true, text :\'timeout ' + options.timeOut + 'ms\' }); }, ' + options.timeOut + ');\n';
          }

          if (options.prepCode) {
            jsCode += ';\n' + options.prepCode + ';\n';
          }
          if (typeof fn === 'string') {
            jsCode += '(function(testResults) {' + fn + '})(fiddleDone)';
          } else {
            // this should run the function...
            jsCode += '(' + fn.toString() + ')(fiddleDone)';
          }
          jsCode += '\n} catch(e) { fiddleDone({result : false, exception:true, text : e.message }); } ';

          stepper.addCommands(function (done) {
            var obj = {
              stylesheets: options.stylesheets || [],
              scripts: options.scripts || [],
              html: options.html || '',
              jsCode: jsCode,
              width: options.width || 800,
              height: options.height || 600,
              onReady: function onReady(res) {
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
      };

      /**
       * @param float databaseName
       * @param float rows
       * @param float extra
       */
      _myTrait_.saveToIndexed = function (databaseName, rows, extra) {
        var db = _localDB(databaseName, {
          tables: {
            sessions: {
              createOptions: {
                autoIncrement: true
              }
            }
          }

        });
        db.then(function () {

          db.table('sessions').addRows([{
            testRunUTC: new Date().getTime(),
            extra: extra || {},
            results: rows
          }]);
        });
      };
    })(this);
  };

  var jestBench = function jestBench(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof jestBench) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != jestBench._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new jestBench(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  jestBench._classInfo = {
    name: 'jestBench'
  };
  jestBench.prototype = new jestBench_prototype();

  (function () {
    if (typeof define !== 'undefined' && define !== null && define.amd != null) {
      __amdDefs__['jestBench'] = jestBench;
      this.jestBench = jestBench;
    } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
      module.exports['jestBench'] = jestBench;
    } else {
      this.jestBench = jestBench;
    }
  }).call(new Function('return this')());

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());

// console.log("Row ",i," written succesfully");