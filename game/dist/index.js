var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// ../node_modules/@colyseus/schema/build/umd/index.js
var require_umd = __commonJS({
  "../node_modules/@colyseus/schema/build/umd/index.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.schema = {}));
    })(exports, function(exports2) {
      "use strict";
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }
      function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }
      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      }
      typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      var SWITCH_TO_STRUCTURE = 255;
      var TYPE_ID = 213;
      exports2.OPERATION = void 0;
      (function(OPERATION) {
        OPERATION[OPERATION["ADD"] = 128] = "ADD";
        OPERATION[OPERATION["REPLACE"] = 0] = "REPLACE";
        OPERATION[OPERATION["DELETE"] = 64] = "DELETE";
        OPERATION[OPERATION["DELETE_AND_ADD"] = 192] = "DELETE_AND_ADD";
        OPERATION[OPERATION["TOUCH"] = 1] = "TOUCH";
        OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
      })(exports2.OPERATION || (exports2.OPERATION = {}));
      var ChangeTree = (
        /** @class */
        function() {
          function ChangeTree2(ref, parent, root) {
            this.changed = false;
            this.changes = /* @__PURE__ */ new Map();
            this.allChanges = /* @__PURE__ */ new Set();
            this.caches = {};
            this.currentCustomOperation = 0;
            this.ref = ref;
            this.setParent(parent, root);
          }
          ChangeTree2.prototype.setParent = function(parent, root, parentIndex) {
            var _this = this;
            if (!this.indexes) {
              this.indexes = this.ref instanceof Schema3 ? this.ref["_definition"].indexes : {};
            }
            this.parent = parent;
            this.parentIndex = parentIndex;
            if (!root) {
              return;
            }
            this.root = root;
            if (this.ref instanceof Schema3) {
              var definition = this.ref["_definition"];
              for (var field in definition.schema) {
                var value = this.ref[field];
                if (value && value["$changes"]) {
                  var parentIndex_1 = definition.indexes[field];
                  value["$changes"].setParent(this.ref, root, parentIndex_1);
                }
              }
            } else if (typeof this.ref === "object") {
              this.ref.forEach(function(value2, key) {
                if (value2 instanceof Schema3) {
                  var changeTreee = value2["$changes"];
                  var parentIndex_2 = _this.ref["$changes"].indexes[key];
                  changeTreee.setParent(_this.ref, _this.root, parentIndex_2);
                }
              });
            }
          };
          ChangeTree2.prototype.operation = function(op) {
            this.changes.set(--this.currentCustomOperation, op);
          };
          ChangeTree2.prototype.change = function(fieldName, operation) {
            if (operation === void 0) {
              operation = exports2.OPERATION.ADD;
            }
            var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
            this.assertValidIndex(index, fieldName);
            var previousChange = this.changes.get(index);
            if (!previousChange || previousChange.op === exports2.OPERATION.DELETE || previousChange.op === exports2.OPERATION.TOUCH) {
              this.changes.set(index, {
                op: !previousChange ? operation : previousChange.op === exports2.OPERATION.DELETE ? exports2.OPERATION.DELETE_AND_ADD : operation,
                // : OPERATION.REPLACE,
                index
              });
            }
            this.allChanges.add(index);
            this.changed = true;
            this.touchParents();
          };
          ChangeTree2.prototype.touch = function(fieldName) {
            var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
            this.assertValidIndex(index, fieldName);
            if (!this.changes.has(index)) {
              this.changes.set(index, { op: exports2.OPERATION.TOUCH, index });
            }
            this.allChanges.add(index);
            this.touchParents();
          };
          ChangeTree2.prototype.touchParents = function() {
            if (this.parent) {
              this.parent["$changes"].touch(this.parentIndex);
            }
          };
          ChangeTree2.prototype.getType = function(index) {
            if (this.ref["_definition"]) {
              var definition = this.ref["_definition"];
              return definition.schema[definition.fieldsByIndex[index]];
            } else {
              var definition = this.parent["_definition"];
              var parentType = definition.schema[definition.fieldsByIndex[this.parentIndex]];
              return Object.values(parentType)[0];
            }
          };
          ChangeTree2.prototype.getChildrenFilter = function() {
            var childFilters = this.parent["_definition"].childFilters;
            return childFilters && childFilters[this.parentIndex];
          };
          ChangeTree2.prototype.getValue = function(index) {
            return this.ref["getByIndex"](index);
          };
          ChangeTree2.prototype.delete = function(fieldName) {
            var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
            if (index === void 0) {
              console.warn("@colyseus/schema ".concat(this.ref.constructor.name, ": trying to delete non-existing index: ").concat(fieldName, " (").concat(index, ")"));
              return;
            }
            var previousValue = this.getValue(index);
            this.changes.set(index, { op: exports2.OPERATION.DELETE, index });
            this.allChanges.delete(index);
            delete this.caches[index];
            if (previousValue && previousValue["$changes"]) {
              previousValue["$changes"].parent = void 0;
            }
            this.changed = true;
            this.touchParents();
          };
          ChangeTree2.prototype.discard = function(changed, discardAll) {
            var _this = this;
            if (changed === void 0) {
              changed = false;
            }
            if (discardAll === void 0) {
              discardAll = false;
            }
            if (!(this.ref instanceof Schema3)) {
              this.changes.forEach(function(change) {
                if (change.op === exports2.OPERATION.DELETE) {
                  var index = _this.ref["getIndex"](change.index);
                  delete _this.indexes[index];
                }
              });
            }
            this.changes.clear();
            this.changed = changed;
            if (discardAll) {
              this.allChanges.clear();
            }
            this.currentCustomOperation = 0;
          };
          ChangeTree2.prototype.discardAll = function() {
            var _this = this;
            this.changes.forEach(function(change) {
              var value = _this.getValue(change.index);
              if (value && value["$changes"]) {
                value["$changes"].discardAll();
              }
            });
            this.discard();
          };
          ChangeTree2.prototype.cache = function(field, cachedBytes) {
            this.caches[field] = cachedBytes;
          };
          ChangeTree2.prototype.clone = function() {
            return new ChangeTree2(this.ref, this.parent, this.root);
          };
          ChangeTree2.prototype.ensureRefId = function() {
            if (this.refId !== void 0) {
              return;
            }
            this.refId = this.root.getNextUniqueId();
          };
          ChangeTree2.prototype.assertValidIndex = function(index, fieldName) {
            if (index === void 0) {
              throw new Error('ChangeTree: missing index for field "'.concat(fieldName, '"'));
            }
          };
          return ChangeTree2;
        }()
      );
      function addCallback($callbacks, op, callback, existing) {
        if (!$callbacks[op]) {
          $callbacks[op] = [];
        }
        $callbacks[op].push(callback);
        existing === null || existing === void 0 ? void 0 : existing.forEach(function(item, key) {
          return callback(item, key);
        });
        return function() {
          return spliceOne($callbacks[op], $callbacks[op].indexOf(callback));
        };
      }
      function removeChildRefs(changes) {
        var _this = this;
        var needRemoveRef = typeof this.$changes.getType() !== "string";
        this.$items.forEach(function(item, key) {
          changes.push({
            refId: _this.$changes.refId,
            op: exports2.OPERATION.DELETE,
            field: key,
            value: void 0,
            previousValue: item
          });
          if (needRemoveRef) {
            _this.$changes.root.removeRef(item["$changes"].refId);
          }
        });
      }
      function spliceOne(arr, index) {
        if (index === -1 || index >= arr.length) {
          return false;
        }
        var len = arr.length - 1;
        for (var i = index; i < len; i++) {
          arr[i] = arr[i + 1];
        }
        arr.length = len;
        return true;
      }
      var DEFAULT_SORT = function(a, b) {
        var A = a.toString();
        var B = b.toString();
        if (A < B)
          return -1;
        else if (A > B)
          return 1;
        else
          return 0;
      };
      function getArrayProxy(value) {
        value["$proxy"] = true;
        value = new Proxy(value, {
          get: function(obj, prop) {
            if (typeof prop !== "symbol" && !isNaN(prop)) {
              return obj.at(prop);
            } else {
              return obj[prop];
            }
          },
          set: function(obj, prop, setValue) {
            if (typeof prop !== "symbol" && !isNaN(prop)) {
              var indexes = Array.from(obj["$items"].keys());
              var key = parseInt(indexes[prop] || prop);
              if (setValue === void 0 || setValue === null) {
                obj.deleteAt(key);
              } else {
                obj.setAt(key, setValue);
              }
            } else {
              obj[prop] = setValue;
            }
            return true;
          },
          deleteProperty: function(obj, prop) {
            if (typeof prop === "number") {
              obj.deleteAt(prop);
            } else {
              delete obj[prop];
            }
            return true;
          },
          has: function(obj, key) {
            if (typeof key !== "symbol" && !isNaN(Number(key))) {
              return obj["$items"].has(Number(key));
            }
            return Reflect.has(obj, key);
          }
        });
        return value;
      }
      var ArraySchema = (
        /** @class */
        function() {
          function ArraySchema2() {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
            }
            this.$changes = new ChangeTree(this);
            this.$items = /* @__PURE__ */ new Map();
            this.$indexes = /* @__PURE__ */ new Map();
            this.$refId = 0;
            this.push.apply(this, items);
          }
          ArraySchema2.prototype.onAdd = function(callback, triggerAll) {
            if (triggerAll === void 0) {
              triggerAll = true;
            }
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
          };
          ArraySchema2.prototype.onRemove = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.DELETE, callback);
          };
          ArraySchema2.prototype.onChange = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.REPLACE, callback);
          };
          ArraySchema2.is = function(type4) {
            return (
              // type format: ["string"]
              Array.isArray(type4) || // type format: { array: "string" }
              type4["array"] !== void 0
            );
          };
          Object.defineProperty(ArraySchema2.prototype, "length", {
            get: function() {
              return this.$items.size;
            },
            set: function(value) {
              if (value === 0) {
                this.clear();
              } else {
                this.splice(value, this.length - value);
              }
            },
            enumerable: false,
            configurable: true
          });
          ArraySchema2.prototype.push = function() {
            var _this = this;
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              values[_i] = arguments[_i];
            }
            var lastIndex;
            values.forEach(function(value) {
              lastIndex = _this.$refId++;
              _this.setAt(lastIndex, value);
            });
            return lastIndex;
          };
          ArraySchema2.prototype.pop = function() {
            var key = Array.from(this.$indexes.values()).pop();
            if (key === void 0) {
              return void 0;
            }
            this.$changes.delete(key);
            this.$indexes.delete(key);
            var value = this.$items.get(key);
            this.$items.delete(key);
            return value;
          };
          ArraySchema2.prototype.at = function(index) {
            var key = Array.from(this.$items.keys())[index];
            return this.$items.get(key);
          };
          ArraySchema2.prototype.setAt = function(index, value) {
            var _a, _b;
            if (value === void 0 || value === null) {
              console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");
              return;
            }
            if (this.$items.get(index) === value) {
              return;
            }
            if (value["$changes"] !== void 0) {
              value["$changes"].setParent(this, this.$changes.root, index);
            }
            var operation = (_b = (_a = this.$changes.indexes[index]) === null || _a === void 0 ? void 0 : _a.op) !== null && _b !== void 0 ? _b : exports2.OPERATION.ADD;
            this.$changes.indexes[index] = index;
            this.$indexes.set(index, index);
            this.$items.set(index, value);
            this.$changes.change(index, operation);
          };
          ArraySchema2.prototype.deleteAt = function(index) {
            var key = Array.from(this.$items.keys())[index];
            if (key === void 0) {
              return false;
            }
            return this.$deleteAt(key);
          };
          ArraySchema2.prototype.$deleteAt = function(index) {
            this.$changes.delete(index);
            this.$indexes.delete(index);
            return this.$items.delete(index);
          };
          ArraySchema2.prototype.clear = function(changes) {
            this.$changes.discard(true, true);
            this.$changes.indexes = {};
            this.$indexes.clear();
            if (changes) {
              removeChildRefs.call(this, changes);
            }
            this.$items.clear();
            this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
            this.$changes.touchParents();
          };
          ArraySchema2.prototype.concat = function() {
            var _a;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
            }
            return new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], (_a = Array.from(this.$items.values())).concat.apply(_a, items), false)))();
          };
          ArraySchema2.prototype.join = function(separator) {
            return Array.from(this.$items.values()).join(separator);
          };
          ArraySchema2.prototype.reverse = function() {
            var _this = this;
            var indexes = Array.from(this.$items.keys());
            var reversedItems = Array.from(this.$items.values()).reverse();
            reversedItems.forEach(function(item, i) {
              _this.setAt(indexes[i], item);
            });
            return this;
          };
          ArraySchema2.prototype.shift = function() {
            var indexes = Array.from(this.$items.keys());
            var shiftAt = indexes.shift();
            if (shiftAt === void 0) {
              return void 0;
            }
            var value = this.$items.get(shiftAt);
            this.$deleteAt(shiftAt);
            return value;
          };
          ArraySchema2.prototype.slice = function(start, end) {
            var sliced = new ArraySchema2();
            sliced.push.apply(sliced, Array.from(this.$items.values()).slice(start, end));
            return sliced;
          };
          ArraySchema2.prototype.sort = function(compareFn) {
            var _this = this;
            if (compareFn === void 0) {
              compareFn = DEFAULT_SORT;
            }
            var indexes = Array.from(this.$items.keys());
            var sortedItems = Array.from(this.$items.values()).sort(compareFn);
            sortedItems.forEach(function(item, i) {
              _this.setAt(indexes[i], item);
            });
            return this;
          };
          ArraySchema2.prototype.splice = function(start, deleteCount) {
            if (deleteCount === void 0) {
              deleteCount = this.length - start;
            }
            var items = [];
            for (var _i = 2; _i < arguments.length; _i++) {
              items[_i - 2] = arguments[_i];
            }
            var indexes = Array.from(this.$items.keys());
            var removedItems = [];
            for (var i = start; i < start + deleteCount; i++) {
              removedItems.push(this.$items.get(indexes[i]));
              this.$deleteAt(indexes[i]);
            }
            for (var i = 0; i < items.length; i++) {
              this.setAt(start + i, items[i]);
            }
            return removedItems;
          };
          ArraySchema2.prototype.unshift = function() {
            var _this = this;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              items[_i] = arguments[_i];
            }
            var length = this.length;
            var addedLength = items.length;
            var previousValues = Array.from(this.$items.values());
            items.forEach(function(item, i) {
              _this.setAt(i, item);
            });
            previousValues.forEach(function(previousValue, i) {
              _this.setAt(addedLength + i, previousValue);
            });
            return length + addedLength;
          };
          ArraySchema2.prototype.indexOf = function(searchElement, fromIndex) {
            return Array.from(this.$items.values()).indexOf(searchElement, fromIndex);
          };
          ArraySchema2.prototype.lastIndexOf = function(searchElement, fromIndex) {
            if (fromIndex === void 0) {
              fromIndex = this.length - 1;
            }
            return Array.from(this.$items.values()).lastIndexOf(searchElement, fromIndex);
          };
          ArraySchema2.prototype.every = function(callbackfn, thisArg) {
            return Array.from(this.$items.values()).every(callbackfn, thisArg);
          };
          ArraySchema2.prototype.some = function(callbackfn, thisArg) {
            return Array.from(this.$items.values()).some(callbackfn, thisArg);
          };
          ArraySchema2.prototype.forEach = function(callbackfn, thisArg) {
            Array.from(this.$items.values()).forEach(callbackfn, thisArg);
          };
          ArraySchema2.prototype.map = function(callbackfn, thisArg) {
            return Array.from(this.$items.values()).map(callbackfn, thisArg);
          };
          ArraySchema2.prototype.filter = function(callbackfn, thisArg) {
            return Array.from(this.$items.values()).filter(callbackfn, thisArg);
          };
          ArraySchema2.prototype.reduce = function(callbackfn, initialValue) {
            return Array.prototype.reduce.apply(Array.from(this.$items.values()), arguments);
          };
          ArraySchema2.prototype.reduceRight = function(callbackfn, initialValue) {
            return Array.prototype.reduceRight.apply(Array.from(this.$items.values()), arguments);
          };
          ArraySchema2.prototype.find = function(predicate, thisArg) {
            return Array.from(this.$items.values()).find(predicate, thisArg);
          };
          ArraySchema2.prototype.findIndex = function(predicate, thisArg) {
            return Array.from(this.$items.values()).findIndex(predicate, thisArg);
          };
          ArraySchema2.prototype.fill = function(value, start, end) {
            throw new Error("ArraySchema#fill() not implemented");
          };
          ArraySchema2.prototype.copyWithin = function(target, start, end) {
            throw new Error("ArraySchema#copyWithin() not implemented");
          };
          ArraySchema2.prototype.toString = function() {
            return this.$items.toString();
          };
          ArraySchema2.prototype.toLocaleString = function() {
            return this.$items.toLocaleString();
          };
          ArraySchema2.prototype[Symbol.iterator] = function() {
            return Array.from(this.$items.values())[Symbol.iterator]();
          };
          Object.defineProperty(ArraySchema2, Symbol.species, {
            get: function() {
              return ArraySchema2;
            },
            enumerable: false,
            configurable: true
          });
          ArraySchema2.prototype.entries = function() {
            return this.$items.entries();
          };
          ArraySchema2.prototype.keys = function() {
            return this.$items.keys();
          };
          ArraySchema2.prototype.values = function() {
            return this.$items.values();
          };
          ArraySchema2.prototype.includes = function(searchElement, fromIndex) {
            return Array.from(this.$items.values()).includes(searchElement, fromIndex);
          };
          ArraySchema2.prototype.flatMap = function(callback, thisArg) {
            throw new Error("ArraySchema#flatMap() is not supported.");
          };
          ArraySchema2.prototype.flat = function(depth) {
            throw new Error("ArraySchema#flat() is not supported.");
          };
          ArraySchema2.prototype.findLast = function() {
            var arr = Array.from(this.$items.values());
            return arr.findLast.apply(arr, arguments);
          };
          ArraySchema2.prototype.findLastIndex = function() {
            var arr = Array.from(this.$items.values());
            return arr.findLastIndex.apply(arr, arguments);
          };
          ArraySchema2.prototype.with = function(index, value) {
            var copy = Array.from(this.$items.values());
            copy[index] = value;
            return new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], copy, false)))();
          };
          ArraySchema2.prototype.toReversed = function() {
            return Array.from(this.$items.values()).reverse();
          };
          ArraySchema2.prototype.toSorted = function(compareFn) {
            return Array.from(this.$items.values()).sort(compareFn);
          };
          ArraySchema2.prototype.toSpliced = function(start, deleteCount) {
            var copy = Array.from(this.$items.values());
            return copy.toSpliced.apply(copy, arguments);
          };
          ArraySchema2.prototype.setIndex = function(index, key) {
            this.$indexes.set(index, key);
          };
          ArraySchema2.prototype.getIndex = function(index) {
            return this.$indexes.get(index);
          };
          ArraySchema2.prototype.getByIndex = function(index) {
            return this.$items.get(this.$indexes.get(index));
          };
          ArraySchema2.prototype.deleteByIndex = function(index) {
            var key = this.$indexes.get(index);
            this.$items.delete(key);
            this.$indexes.delete(index);
          };
          ArraySchema2.prototype.toArray = function() {
            return Array.from(this.$items.values());
          };
          ArraySchema2.prototype.toJSON = function() {
            return this.toArray().map(function(value) {
              return typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
            });
          };
          ArraySchema2.prototype.clone = function(isDecoding) {
            var cloned;
            if (isDecoding) {
              cloned = new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], Array.from(this.$items.values()), false)))();
            } else {
              cloned = new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], this.map(function(item) {
                return item["$changes"] ? item.clone() : item;
              }), false)))();
            }
            return cloned;
          };
          return ArraySchema2;
        }()
      );
      function getMapProxy(value) {
        value["$proxy"] = true;
        value = new Proxy(value, {
          get: function(obj, prop) {
            if (typeof prop !== "symbol" && // accessing properties
            typeof obj[prop] === "undefined") {
              return obj.get(prop);
            } else {
              return obj[prop];
            }
          },
          set: function(obj, prop, setValue) {
            if (typeof prop !== "symbol" && (prop.indexOf("$") === -1 && prop !== "onAdd" && prop !== "onRemove" && prop !== "onChange")) {
              obj.set(prop, setValue);
            } else {
              obj[prop] = setValue;
            }
            return true;
          },
          deleteProperty: function(obj, prop) {
            obj.delete(prop);
            return true;
          }
        });
        return value;
      }
      var MapSchema = (
        /** @class */
        function() {
          function MapSchema2(initialValues) {
            var _this = this;
            this.$changes = new ChangeTree(this);
            this.$items = /* @__PURE__ */ new Map();
            this.$indexes = /* @__PURE__ */ new Map();
            this.$refId = 0;
            if (initialValues) {
              if (initialValues instanceof Map || initialValues instanceof MapSchema2) {
                initialValues.forEach(function(v, k2) {
                  return _this.set(k2, v);
                });
              } else {
                for (var k in initialValues) {
                  this.set(k, initialValues[k]);
                }
              }
            }
          }
          MapSchema2.prototype.onAdd = function(callback, triggerAll) {
            if (triggerAll === void 0) {
              triggerAll = true;
            }
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
          };
          MapSchema2.prototype.onRemove = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.DELETE, callback);
          };
          MapSchema2.prototype.onChange = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.REPLACE, callback);
          };
          MapSchema2.is = function(type4) {
            return type4["map"] !== void 0;
          };
          MapSchema2.prototype[Symbol.iterator] = function() {
            return this.$items[Symbol.iterator]();
          };
          Object.defineProperty(MapSchema2.prototype, Symbol.toStringTag, {
            get: function() {
              return this.$items[Symbol.toStringTag];
            },
            enumerable: false,
            configurable: true
          });
          Object.defineProperty(MapSchema2, Symbol.species, {
            get: function() {
              return MapSchema2;
            },
            enumerable: false,
            configurable: true
          });
          MapSchema2.prototype.set = function(key, value) {
            if (value === void 0 || value === null) {
              throw new Error("MapSchema#set('".concat(key, "', ").concat(value, "): trying to set ").concat(value, " value on '").concat(key, "'."));
            }
            key = key.toString();
            var hasIndex = typeof this.$changes.indexes[key] !== "undefined";
            var index = hasIndex ? this.$changes.indexes[key] : this.$refId++;
            var operation = hasIndex ? exports2.OPERATION.REPLACE : exports2.OPERATION.ADD;
            var isRef = value["$changes"] !== void 0;
            if (isRef) {
              value["$changes"].setParent(this, this.$changes.root, index);
            }
            if (!hasIndex) {
              this.$changes.indexes[key] = index;
              this.$indexes.set(index, key);
            } else if (!isRef && this.$items.get(key) === value) {
              return;
            } else if (isRef && // if is schema, force ADD operation if value differ from previous one.
            this.$items.get(key) !== value) {
              operation = exports2.OPERATION.ADD;
            }
            this.$items.set(key, value);
            this.$changes.change(key, operation);
            return this;
          };
          MapSchema2.prototype.get = function(key) {
            return this.$items.get(key);
          };
          MapSchema2.prototype.delete = function(key) {
            this.$changes.delete(key);
            return this.$items.delete(key);
          };
          MapSchema2.prototype.clear = function(changes) {
            this.$changes.discard(true, true);
            this.$changes.indexes = {};
            this.$indexes.clear();
            if (changes) {
              removeChildRefs.call(this, changes);
            }
            this.$items.clear();
            this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
            this.$changes.touchParents();
          };
          MapSchema2.prototype.has = function(key) {
            return this.$items.has(key);
          };
          MapSchema2.prototype.forEach = function(callbackfn) {
            this.$items.forEach(callbackfn);
          };
          MapSchema2.prototype.entries = function() {
            return this.$items.entries();
          };
          MapSchema2.prototype.keys = function() {
            return this.$items.keys();
          };
          MapSchema2.prototype.values = function() {
            return this.$items.values();
          };
          Object.defineProperty(MapSchema2.prototype, "size", {
            get: function() {
              return this.$items.size;
            },
            enumerable: false,
            configurable: true
          });
          MapSchema2.prototype.setIndex = function(index, key) {
            this.$indexes.set(index, key);
          };
          MapSchema2.prototype.getIndex = function(index) {
            return this.$indexes.get(index);
          };
          MapSchema2.prototype.getByIndex = function(index) {
            return this.$items.get(this.$indexes.get(index));
          };
          MapSchema2.prototype.deleteByIndex = function(index) {
            var key = this.$indexes.get(index);
            this.$items.delete(key);
            this.$indexes.delete(index);
          };
          MapSchema2.prototype.toJSON = function() {
            var map = {};
            this.forEach(function(value, key) {
              map[key] = typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
            });
            return map;
          };
          MapSchema2.prototype.clone = function(isDecoding) {
            var cloned;
            if (isDecoding) {
              cloned = Object.assign(new MapSchema2(), this);
            } else {
              cloned = new MapSchema2();
              this.forEach(function(value, key) {
                if (value["$changes"]) {
                  cloned.set(key, value["clone"]());
                } else {
                  cloned.set(key, value);
                }
              });
            }
            return cloned;
          };
          return MapSchema2;
        }()
      );
      var registeredTypes = {};
      function registerType(identifier, definition) {
        registeredTypes[identifier] = definition;
      }
      function getType(identifier) {
        return registeredTypes[identifier];
      }
      var SchemaDefinition = (
        /** @class */
        function() {
          function SchemaDefinition2() {
            this.indexes = {};
            this.fieldsByIndex = {};
            this.deprecated = {};
            this.descriptors = {};
          }
          SchemaDefinition2.create = function(parent) {
            var definition = new SchemaDefinition2();
            definition.schema = Object.assign({}, parent && parent.schema || {});
            definition.indexes = Object.assign({}, parent && parent.indexes || {});
            definition.fieldsByIndex = Object.assign({}, parent && parent.fieldsByIndex || {});
            definition.descriptors = Object.assign({}, parent && parent.descriptors || {});
            definition.deprecated = Object.assign({}, parent && parent.deprecated || {});
            return definition;
          };
          SchemaDefinition2.prototype.addField = function(field, type4) {
            var index = this.getNextFieldIndex();
            this.fieldsByIndex[index] = field;
            this.indexes[field] = index;
            this.schema[field] = Array.isArray(type4) ? { array: type4[0] } : type4;
          };
          SchemaDefinition2.prototype.hasField = function(field) {
            return this.indexes[field] !== void 0;
          };
          SchemaDefinition2.prototype.addFilter = function(field, cb) {
            if (!this.filters) {
              this.filters = {};
              this.indexesWithFilters = [];
            }
            this.filters[this.indexes[field]] = cb;
            this.indexesWithFilters.push(this.indexes[field]);
            return true;
          };
          SchemaDefinition2.prototype.addChildrenFilter = function(field, cb) {
            var index = this.indexes[field];
            var type4 = this.schema[field];
            if (getType(Object.keys(type4)[0])) {
              if (!this.childFilters) {
                this.childFilters = {};
              }
              this.childFilters[index] = cb;
              return true;
            } else {
              console.warn("@filterChildren: field '".concat(field, "' can't have children. Ignoring filter."));
            }
          };
          SchemaDefinition2.prototype.getChildrenFilter = function(field) {
            return this.childFilters && this.childFilters[this.indexes[field]];
          };
          SchemaDefinition2.prototype.getNextFieldIndex = function() {
            return Object.keys(this.schema || {}).length;
          };
          return SchemaDefinition2;
        }()
      );
      function hasFilter(klass) {
        return klass._context && klass._context.useFilters;
      }
      var Context = (
        /** @class */
        function() {
          function Context2() {
            this.types = {};
            this.schemas = /* @__PURE__ */ new Map();
            this.useFilters = false;
          }
          Context2.prototype.has = function(schema) {
            return this.schemas.has(schema);
          };
          Context2.prototype.get = function(typeid) {
            return this.types[typeid];
          };
          Context2.prototype.add = function(schema, typeid) {
            if (typeid === void 0) {
              typeid = this.schemas.size;
            }
            schema._definition = SchemaDefinition.create(schema._definition);
            schema._typeid = typeid;
            this.types[typeid] = schema;
            this.schemas.set(schema, typeid);
          };
          Context2.create = function(options) {
            if (options === void 0) {
              options = {};
            }
            return function(definition) {
              if (!options.context) {
                options.context = new Context2();
              }
              return type3(definition, options);
            };
          };
          return Context2;
        }()
      );
      var globalContext = new Context();
      function type3(type4, options) {
        if (options === void 0) {
          options = {};
        }
        return function(target, field) {
          var context = options.context || globalContext;
          var constructor = target.constructor;
          constructor._context = context;
          if (!type4) {
            throw new Error("".concat(constructor.name, ': @type() reference provided for "').concat(field, `" is undefined. Make sure you don't have any circular dependencies.`));
          }
          if (!context.has(constructor)) {
            context.add(constructor);
          }
          var definition = constructor._definition;
          definition.addField(field, type4);
          if (definition.descriptors[field]) {
            if (definition.deprecated[field]) {
              return;
            } else {
              try {
                throw new Error("@colyseus/schema: Duplicate '".concat(field, "' definition on '").concat(constructor.name, "'.\nCheck @type() annotation"));
              } catch (e) {
                var definitionAtLine = e.stack.split("\n")[4].trim();
                throw new Error("".concat(e.message, " ").concat(definitionAtLine));
              }
            }
          }
          var isArray = ArraySchema.is(type4);
          var isMap = !isArray && MapSchema.is(type4);
          if (typeof type4 !== "string" && !Schema3.is(type4)) {
            var childType = Object.values(type4)[0];
            if (typeof childType !== "string" && !context.has(childType)) {
              context.add(childType);
            }
          }
          if (options.manual) {
            definition.descriptors[field] = {
              enumerable: true,
              configurable: true,
              writable: true
            };
            return;
          }
          var fieldCached = "_".concat(field);
          definition.descriptors[fieldCached] = {
            enumerable: false,
            configurable: false,
            writable: true
          };
          definition.descriptors[field] = {
            get: function() {
              return this[fieldCached];
            },
            set: function(value) {
              if (value === this[fieldCached]) {
                return;
              }
              if (value !== void 0 && value !== null) {
                if (isArray && !(value instanceof ArraySchema)) {
                  value = new (ArraySchema.bind.apply(ArraySchema, __spreadArray([void 0], value, false)))();
                }
                if (isMap && !(value instanceof MapSchema)) {
                  value = new MapSchema(value);
                }
                if (value["$proxy"] === void 0) {
                  if (isMap) {
                    value = getMapProxy(value);
                  } else if (isArray) {
                    value = getArrayProxy(value);
                  }
                }
                this.$changes.change(field);
                if (value["$changes"]) {
                  value["$changes"].setParent(this, this.$changes.root, this._definition.indexes[field]);
                }
              } else if (this[fieldCached]) {
                this.$changes.delete(field);
              }
              this[fieldCached] = value;
            },
            enumerable: true,
            configurable: true
          };
        };
      }
      function filter(cb) {
        return function(target, field) {
          var constructor = target.constructor;
          var definition = constructor._definition;
          if (definition.addFilter(field, cb)) {
            constructor._context.useFilters = true;
          }
        };
      }
      function filterChildren(cb) {
        return function(target, field) {
          var constructor = target.constructor;
          var definition = constructor._definition;
          if (definition.addChildrenFilter(field, cb)) {
            constructor._context.useFilters = true;
          }
        };
      }
      function deprecated(throws) {
        if (throws === void 0) {
          throws = true;
        }
        return function(target, field) {
          var constructor = target.constructor;
          var definition = constructor._definition;
          definition.deprecated[field] = true;
          if (throws) {
            definition.descriptors[field] = {
              get: function() {
                throw new Error("".concat(field, " is deprecated."));
              },
              set: function(value) {
              },
              enumerable: false,
              configurable: true
            };
          }
        };
      }
      function defineTypes(target, fields, options) {
        if (options === void 0) {
          options = {};
        }
        if (!options.context) {
          options.context = target._context || options.context || globalContext;
        }
        for (var field in fields) {
          type3(fields[field], options)(target.prototype, field);
        }
        return target;
      }
      function utf8Length(str) {
        var c = 0, length = 0;
        for (var i = 0, l = str.length; i < l; i++) {
          c = str.charCodeAt(i);
          if (c < 128) {
            length += 1;
          } else if (c < 2048) {
            length += 2;
          } else if (c < 55296 || c >= 57344) {
            length += 3;
          } else {
            i++;
            length += 4;
          }
        }
        return length;
      }
      function utf8Write(view, offset, str) {
        var c = 0;
        for (var i = 0, l = str.length; i < l; i++) {
          c = str.charCodeAt(i);
          if (c < 128) {
            view[offset++] = c;
          } else if (c < 2048) {
            view[offset++] = 192 | c >> 6;
            view[offset++] = 128 | c & 63;
          } else if (c < 55296 || c >= 57344) {
            view[offset++] = 224 | c >> 12;
            view[offset++] = 128 | c >> 6 & 63;
            view[offset++] = 128 | c & 63;
          } else {
            i++;
            c = 65536 + ((c & 1023) << 10 | str.charCodeAt(i) & 1023);
            view[offset++] = 240 | c >> 18;
            view[offset++] = 128 | c >> 12 & 63;
            view[offset++] = 128 | c >> 6 & 63;
            view[offset++] = 128 | c & 63;
          }
        }
      }
      function int8$1(bytes, value) {
        bytes.push(value & 255);
      }
      function uint8$1(bytes, value) {
        bytes.push(value & 255);
      }
      function int16$1(bytes, value) {
        bytes.push(value & 255);
        bytes.push(value >> 8 & 255);
      }
      function uint16$1(bytes, value) {
        bytes.push(value & 255);
        bytes.push(value >> 8 & 255);
      }
      function int32$1(bytes, value) {
        bytes.push(value & 255);
        bytes.push(value >> 8 & 255);
        bytes.push(value >> 16 & 255);
        bytes.push(value >> 24 & 255);
      }
      function uint32$1(bytes, value) {
        var b4 = value >> 24;
        var b3 = value >> 16;
        var b2 = value >> 8;
        var b1 = value;
        bytes.push(b1 & 255);
        bytes.push(b2 & 255);
        bytes.push(b3 & 255);
        bytes.push(b4 & 255);
      }
      function int64$1(bytes, value) {
        var high = Math.floor(value / Math.pow(2, 32));
        var low = value >>> 0;
        uint32$1(bytes, low);
        uint32$1(bytes, high);
      }
      function uint64$1(bytes, value) {
        var high = value / Math.pow(2, 32) >> 0;
        var low = value >>> 0;
        uint32$1(bytes, low);
        uint32$1(bytes, high);
      }
      function float32$1(bytes, value) {
        writeFloat32(bytes, value);
      }
      function float64$1(bytes, value) {
        writeFloat64(bytes, value);
      }
      var _int32$1 = new Int32Array(2);
      var _float32$1 = new Float32Array(_int32$1.buffer);
      var _float64$1 = new Float64Array(_int32$1.buffer);
      function writeFloat32(bytes, value) {
        _float32$1[0] = value;
        int32$1(bytes, _int32$1[0]);
      }
      function writeFloat64(bytes, value) {
        _float64$1[0] = value;
        int32$1(bytes, _int32$1[0]);
        int32$1(bytes, _int32$1[1]);
      }
      function boolean$1(bytes, value) {
        return uint8$1(bytes, value ? 1 : 0);
      }
      function string$1(bytes, value) {
        if (!value) {
          value = "";
        }
        var length = utf8Length(value);
        var size = 0;
        if (length < 32) {
          bytes.push(length | 160);
          size = 1;
        } else if (length < 256) {
          bytes.push(217);
          uint8$1(bytes, length);
          size = 2;
        } else if (length < 65536) {
          bytes.push(218);
          uint16$1(bytes, length);
          size = 3;
        } else if (length < 4294967296) {
          bytes.push(219);
          uint32$1(bytes, length);
          size = 5;
        } else {
          throw new Error("String too long");
        }
        utf8Write(bytes, bytes.length, value);
        return size + length;
      }
      function number$1(bytes, value) {
        if (isNaN(value)) {
          return number$1(bytes, 0);
        } else if (!isFinite(value)) {
          return number$1(bytes, value > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
        } else if (value !== (value | 0)) {
          bytes.push(203);
          writeFloat64(bytes, value);
          return 9;
        }
        if (value >= 0) {
          if (value < 128) {
            uint8$1(bytes, value);
            return 1;
          }
          if (value < 256) {
            bytes.push(204);
            uint8$1(bytes, value);
            return 2;
          }
          if (value < 65536) {
            bytes.push(205);
            uint16$1(bytes, value);
            return 3;
          }
          if (value < 4294967296) {
            bytes.push(206);
            uint32$1(bytes, value);
            return 5;
          }
          bytes.push(207);
          uint64$1(bytes, value);
          return 9;
        } else {
          if (value >= -32) {
            bytes.push(224 | value + 32);
            return 1;
          }
          if (value >= -128) {
            bytes.push(208);
            int8$1(bytes, value);
            return 2;
          }
          if (value >= -32768) {
            bytes.push(209);
            int16$1(bytes, value);
            return 3;
          }
          if (value >= -2147483648) {
            bytes.push(210);
            int32$1(bytes, value);
            return 5;
          }
          bytes.push(211);
          int64$1(bytes, value);
          return 9;
        }
      }
      var encode = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        utf8Write,
        int8: int8$1,
        uint8: uint8$1,
        int16: int16$1,
        uint16: uint16$1,
        int32: int32$1,
        uint32: uint32$1,
        int64: int64$1,
        uint64: uint64$1,
        float32: float32$1,
        float64: float64$1,
        writeFloat32,
        writeFloat64,
        boolean: boolean$1,
        string: string$1,
        number: number$1
      });
      function utf8Read(bytes, offset, length) {
        var string2 = "", chr = 0;
        for (var i = offset, end = offset + length; i < end; i++) {
          var byte = bytes[i];
          if ((byte & 128) === 0) {
            string2 += String.fromCharCode(byte);
            continue;
          }
          if ((byte & 224) === 192) {
            string2 += String.fromCharCode((byte & 31) << 6 | bytes[++i] & 63);
            continue;
          }
          if ((byte & 240) === 224) {
            string2 += String.fromCharCode((byte & 15) << 12 | (bytes[++i] & 63) << 6 | (bytes[++i] & 63) << 0);
            continue;
          }
          if ((byte & 248) === 240) {
            chr = (byte & 7) << 18 | (bytes[++i] & 63) << 12 | (bytes[++i] & 63) << 6 | (bytes[++i] & 63) << 0;
            if (chr >= 65536) {
              chr -= 65536;
              string2 += String.fromCharCode((chr >>> 10) + 55296, (chr & 1023) + 56320);
            } else {
              string2 += String.fromCharCode(chr);
            }
            continue;
          }
          console.error("Invalid byte " + byte.toString(16));
        }
        return string2;
      }
      function int8(bytes, it) {
        return uint8(bytes, it) << 24 >> 24;
      }
      function uint8(bytes, it) {
        return bytes[it.offset++];
      }
      function int16(bytes, it) {
        return uint16(bytes, it) << 16 >> 16;
      }
      function uint16(bytes, it) {
        return bytes[it.offset++] | bytes[it.offset++] << 8;
      }
      function int32(bytes, it) {
        return bytes[it.offset++] | bytes[it.offset++] << 8 | bytes[it.offset++] << 16 | bytes[it.offset++] << 24;
      }
      function uint32(bytes, it) {
        return int32(bytes, it) >>> 0;
      }
      function float32(bytes, it) {
        return readFloat32(bytes, it);
      }
      function float64(bytes, it) {
        return readFloat64(bytes, it);
      }
      function int64(bytes, it) {
        var low = uint32(bytes, it);
        var high = int32(bytes, it) * Math.pow(2, 32);
        return high + low;
      }
      function uint64(bytes, it) {
        var low = uint32(bytes, it);
        var high = uint32(bytes, it) * Math.pow(2, 32);
        return high + low;
      }
      var _int32 = new Int32Array(2);
      var _float32 = new Float32Array(_int32.buffer);
      var _float64 = new Float64Array(_int32.buffer);
      function readFloat32(bytes, it) {
        _int32[0] = int32(bytes, it);
        return _float32[0];
      }
      function readFloat64(bytes, it) {
        _int32[0] = int32(bytes, it);
        _int32[1] = int32(bytes, it);
        return _float64[0];
      }
      function boolean(bytes, it) {
        return uint8(bytes, it) > 0;
      }
      function string(bytes, it) {
        var prefix = bytes[it.offset++];
        var length;
        if (prefix < 192) {
          length = prefix & 31;
        } else if (prefix === 217) {
          length = uint8(bytes, it);
        } else if (prefix === 218) {
          length = uint16(bytes, it);
        } else if (prefix === 219) {
          length = uint32(bytes, it);
        }
        var value = utf8Read(bytes, it.offset, length);
        it.offset += length;
        return value;
      }
      function stringCheck(bytes, it) {
        var prefix = bytes[it.offset];
        return (
          // fixstr
          prefix < 192 && prefix > 160 || // str 8
          prefix === 217 || // str 16
          prefix === 218 || // str 32
          prefix === 219
        );
      }
      function number(bytes, it) {
        var prefix = bytes[it.offset++];
        if (prefix < 128) {
          return prefix;
        } else if (prefix === 202) {
          return readFloat32(bytes, it);
        } else if (prefix === 203) {
          return readFloat64(bytes, it);
        } else if (prefix === 204) {
          return uint8(bytes, it);
        } else if (prefix === 205) {
          return uint16(bytes, it);
        } else if (prefix === 206) {
          return uint32(bytes, it);
        } else if (prefix === 207) {
          return uint64(bytes, it);
        } else if (prefix === 208) {
          return int8(bytes, it);
        } else if (prefix === 209) {
          return int16(bytes, it);
        } else if (prefix === 210) {
          return int32(bytes, it);
        } else if (prefix === 211) {
          return int64(bytes, it);
        } else if (prefix > 223) {
          return (255 - prefix + 1) * -1;
        }
      }
      function numberCheck(bytes, it) {
        var prefix = bytes[it.offset];
        return prefix < 128 || prefix >= 202 && prefix <= 211;
      }
      function arrayCheck(bytes, it) {
        return bytes[it.offset] < 160;
      }
      function switchStructureCheck(bytes, it) {
        return (
          // previous byte should be `SWITCH_TO_STRUCTURE`
          bytes[it.offset - 1] === SWITCH_TO_STRUCTURE && // next byte should be a number
          (bytes[it.offset] < 128 || bytes[it.offset] >= 202 && bytes[it.offset] <= 211)
        );
      }
      var decode = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        int8,
        uint8,
        int16,
        uint16,
        int32,
        uint32,
        float32,
        float64,
        int64,
        uint64,
        readFloat32,
        readFloat64,
        boolean,
        string,
        stringCheck,
        number,
        numberCheck,
        arrayCheck,
        switchStructureCheck
      });
      var CollectionSchema = (
        /** @class */
        function() {
          function CollectionSchema2(initialValues) {
            var _this = this;
            this.$changes = new ChangeTree(this);
            this.$items = /* @__PURE__ */ new Map();
            this.$indexes = /* @__PURE__ */ new Map();
            this.$refId = 0;
            if (initialValues) {
              initialValues.forEach(function(v) {
                return _this.add(v);
              });
            }
          }
          CollectionSchema2.prototype.onAdd = function(callback, triggerAll) {
            if (triggerAll === void 0) {
              triggerAll = true;
            }
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
          };
          CollectionSchema2.prototype.onRemove = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
          };
          CollectionSchema2.prototype.onChange = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
          };
          CollectionSchema2.is = function(type4) {
            return type4["collection"] !== void 0;
          };
          CollectionSchema2.prototype.add = function(value) {
            var index = this.$refId++;
            var isRef = value["$changes"] !== void 0;
            if (isRef) {
              value["$changes"].setParent(this, this.$changes.root, index);
            }
            this.$changes.indexes[index] = index;
            this.$indexes.set(index, index);
            this.$items.set(index, value);
            this.$changes.change(index);
            return index;
          };
          CollectionSchema2.prototype.at = function(index) {
            var key = Array.from(this.$items.keys())[index];
            return this.$items.get(key);
          };
          CollectionSchema2.prototype.entries = function() {
            return this.$items.entries();
          };
          CollectionSchema2.prototype.delete = function(item) {
            var entries = this.$items.entries();
            var index;
            var entry;
            while (entry = entries.next()) {
              if (entry.done) {
                break;
              }
              if (item === entry.value[1]) {
                index = entry.value[0];
                break;
              }
            }
            if (index === void 0) {
              return false;
            }
            this.$changes.delete(index);
            this.$indexes.delete(index);
            return this.$items.delete(index);
          };
          CollectionSchema2.prototype.clear = function(changes) {
            this.$changes.discard(true, true);
            this.$changes.indexes = {};
            this.$indexes.clear();
            if (changes) {
              removeChildRefs.call(this, changes);
            }
            this.$items.clear();
            this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
            this.$changes.touchParents();
          };
          CollectionSchema2.prototype.has = function(value) {
            return Array.from(this.$items.values()).some(function(v) {
              return v === value;
            });
          };
          CollectionSchema2.prototype.forEach = function(callbackfn) {
            var _this = this;
            this.$items.forEach(function(value, key, _) {
              return callbackfn(value, key, _this);
            });
          };
          CollectionSchema2.prototype.values = function() {
            return this.$items.values();
          };
          Object.defineProperty(CollectionSchema2.prototype, "size", {
            get: function() {
              return this.$items.size;
            },
            enumerable: false,
            configurable: true
          });
          CollectionSchema2.prototype.setIndex = function(index, key) {
            this.$indexes.set(index, key);
          };
          CollectionSchema2.prototype.getIndex = function(index) {
            return this.$indexes.get(index);
          };
          CollectionSchema2.prototype.getByIndex = function(index) {
            return this.$items.get(this.$indexes.get(index));
          };
          CollectionSchema2.prototype.deleteByIndex = function(index) {
            var key = this.$indexes.get(index);
            this.$items.delete(key);
            this.$indexes.delete(index);
          };
          CollectionSchema2.prototype.toArray = function() {
            return Array.from(this.$items.values());
          };
          CollectionSchema2.prototype.toJSON = function() {
            var values = [];
            this.forEach(function(value, key) {
              values.push(typeof value["toJSON"] === "function" ? value["toJSON"]() : value);
            });
            return values;
          };
          CollectionSchema2.prototype.clone = function(isDecoding) {
            var cloned;
            if (isDecoding) {
              cloned = Object.assign(new CollectionSchema2(), this);
            } else {
              cloned = new CollectionSchema2();
              this.forEach(function(value) {
                if (value["$changes"]) {
                  cloned.add(value["clone"]());
                } else {
                  cloned.add(value);
                }
              });
            }
            return cloned;
          };
          return CollectionSchema2;
        }()
      );
      var SetSchema = (
        /** @class */
        function() {
          function SetSchema2(initialValues) {
            var _this = this;
            this.$changes = new ChangeTree(this);
            this.$items = /* @__PURE__ */ new Map();
            this.$indexes = /* @__PURE__ */ new Map();
            this.$refId = 0;
            if (initialValues) {
              initialValues.forEach(function(v) {
                return _this.add(v);
              });
            }
          }
          SetSchema2.prototype.onAdd = function(callback, triggerAll) {
            if (triggerAll === void 0) {
              triggerAll = true;
            }
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
          };
          SetSchema2.prototype.onRemove = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
          };
          SetSchema2.prototype.onChange = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
          };
          SetSchema2.is = function(type4) {
            return type4["set"] !== void 0;
          };
          SetSchema2.prototype.add = function(value) {
            var _a, _b;
            if (this.has(value)) {
              return false;
            }
            var index = this.$refId++;
            if (value["$changes"] !== void 0) {
              value["$changes"].setParent(this, this.$changes.root, index);
            }
            var operation = (_b = (_a = this.$changes.indexes[index]) === null || _a === void 0 ? void 0 : _a.op) !== null && _b !== void 0 ? _b : exports2.OPERATION.ADD;
            this.$changes.indexes[index] = index;
            this.$indexes.set(index, index);
            this.$items.set(index, value);
            this.$changes.change(index, operation);
            return index;
          };
          SetSchema2.prototype.entries = function() {
            return this.$items.entries();
          };
          SetSchema2.prototype.delete = function(item) {
            var entries = this.$items.entries();
            var index;
            var entry;
            while (entry = entries.next()) {
              if (entry.done) {
                break;
              }
              if (item === entry.value[1]) {
                index = entry.value[0];
                break;
              }
            }
            if (index === void 0) {
              return false;
            }
            this.$changes.delete(index);
            this.$indexes.delete(index);
            return this.$items.delete(index);
          };
          SetSchema2.prototype.clear = function(changes) {
            this.$changes.discard(true, true);
            this.$changes.indexes = {};
            this.$indexes.clear();
            if (changes) {
              removeChildRefs.call(this, changes);
            }
            this.$items.clear();
            this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
            this.$changes.touchParents();
          };
          SetSchema2.prototype.has = function(value) {
            var values = this.$items.values();
            var has = false;
            var entry;
            while (entry = values.next()) {
              if (entry.done) {
                break;
              }
              if (value === entry.value) {
                has = true;
                break;
              }
            }
            return has;
          };
          SetSchema2.prototype.forEach = function(callbackfn) {
            var _this = this;
            this.$items.forEach(function(value, key, _) {
              return callbackfn(value, key, _this);
            });
          };
          SetSchema2.prototype.values = function() {
            return this.$items.values();
          };
          Object.defineProperty(SetSchema2.prototype, "size", {
            get: function() {
              return this.$items.size;
            },
            enumerable: false,
            configurable: true
          });
          SetSchema2.prototype.setIndex = function(index, key) {
            this.$indexes.set(index, key);
          };
          SetSchema2.prototype.getIndex = function(index) {
            return this.$indexes.get(index);
          };
          SetSchema2.prototype.getByIndex = function(index) {
            return this.$items.get(this.$indexes.get(index));
          };
          SetSchema2.prototype.deleteByIndex = function(index) {
            var key = this.$indexes.get(index);
            this.$items.delete(key);
            this.$indexes.delete(index);
          };
          SetSchema2.prototype.toArray = function() {
            return Array.from(this.$items.values());
          };
          SetSchema2.prototype.toJSON = function() {
            var values = [];
            this.forEach(function(value, key) {
              values.push(typeof value["toJSON"] === "function" ? value["toJSON"]() : value);
            });
            return values;
          };
          SetSchema2.prototype.clone = function(isDecoding) {
            var cloned;
            if (isDecoding) {
              cloned = Object.assign(new SetSchema2(), this);
            } else {
              cloned = new SetSchema2();
              this.forEach(function(value) {
                if (value["$changes"]) {
                  cloned.add(value["clone"]());
                } else {
                  cloned.add(value);
                }
              });
            }
            return cloned;
          };
          return SetSchema2;
        }()
      );
      var ClientState = (
        /** @class */
        function() {
          function ClientState2() {
            this.refIds = /* @__PURE__ */ new WeakSet();
            this.containerIndexes = /* @__PURE__ */ new WeakMap();
          }
          ClientState2.prototype.addRefId = function(changeTree) {
            if (!this.refIds.has(changeTree)) {
              this.refIds.add(changeTree);
              this.containerIndexes.set(changeTree, /* @__PURE__ */ new Set());
            }
          };
          ClientState2.get = function(client) {
            if (client.$filterState === void 0) {
              client.$filterState = new ClientState2();
            }
            return client.$filterState;
          };
          return ClientState2;
        }()
      );
      var ReferenceTracker = (
        /** @class */
        function() {
          function ReferenceTracker2() {
            this.refs = /* @__PURE__ */ new Map();
            this.refCounts = {};
            this.deletedRefs = /* @__PURE__ */ new Set();
            this.nextUniqueId = 0;
          }
          ReferenceTracker2.prototype.getNextUniqueId = function() {
            return this.nextUniqueId++;
          };
          ReferenceTracker2.prototype.addRef = function(refId, ref, incrementCount) {
            if (incrementCount === void 0) {
              incrementCount = true;
            }
            this.refs.set(refId, ref);
            if (incrementCount) {
              this.refCounts[refId] = (this.refCounts[refId] || 0) + 1;
            }
          };
          ReferenceTracker2.prototype.removeRef = function(refId) {
            var refCount = this.refCounts[refId];
            if (refCount === void 0) {
              console.warn("trying to remove reference ".concat(refId, " that doesn't exist"));
              return;
            }
            if (refCount === 0) {
              console.warn("trying to remove reference ".concat(refId, " with 0 refCount"));
              return;
            }
            this.refCounts[refId] = refCount - 1;
            this.deletedRefs.add(refId);
          };
          ReferenceTracker2.prototype.clearRefs = function() {
            this.refs.clear();
            this.deletedRefs.clear();
            this.refCounts = {};
          };
          ReferenceTracker2.prototype.garbageCollectDeletedRefs = function() {
            var _this = this;
            this.deletedRefs.forEach(function(refId) {
              if (_this.refCounts[refId] > 0) {
                return;
              }
              var ref = _this.refs.get(refId);
              if (ref instanceof Schema3) {
                for (var fieldName in ref["_definition"].schema) {
                  if (typeof ref["_definition"].schema[fieldName] !== "string" && ref[fieldName] && ref[fieldName]["$changes"]) {
                    _this.removeRef(ref[fieldName]["$changes"].refId);
                  }
                }
              } else {
                var definition = ref["$changes"].parent._definition;
                var type4 = definition.schema[definition.fieldsByIndex[ref["$changes"].parentIndex]];
                if (typeof Object.values(type4)[0] === "function") {
                  Array.from(ref.values()).forEach(function(child) {
                    return _this.removeRef(child["$changes"].refId);
                  });
                }
              }
              _this.refs.delete(refId);
              delete _this.refCounts[refId];
            });
            this.deletedRefs.clear();
          };
          return ReferenceTracker2;
        }()
      );
      var EncodeSchemaError = (
        /** @class */
        function(_super) {
          __extends(EncodeSchemaError2, _super);
          function EncodeSchemaError2() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          return EncodeSchemaError2;
        }(Error)
      );
      function assertType(value, type4, klass, field) {
        var typeofTarget;
        var allowNull = false;
        switch (type4) {
          case "number":
          case "int8":
          case "uint8":
          case "int16":
          case "uint16":
          case "int32":
          case "uint32":
          case "int64":
          case "uint64":
          case "float32":
          case "float64":
            typeofTarget = "number";
            if (isNaN(value)) {
              console.log('trying to encode "NaN" in '.concat(klass.constructor.name, "#").concat(field));
            }
            break;
          case "string":
            typeofTarget = "string";
            allowNull = true;
            break;
          case "boolean":
            return;
        }
        if (typeof value !== typeofTarget && (!allowNull || allowNull && value !== null)) {
          var foundValue = "'".concat(JSON.stringify(value), "'").concat(value && value.constructor && " (".concat(value.constructor.name, ")") || "");
          throw new EncodeSchemaError("a '".concat(typeofTarget, "' was expected, but ").concat(foundValue, " was provided in ").concat(klass.constructor.name, "#").concat(field));
        }
      }
      function assertInstanceType(value, type4, klass, field) {
        if (!(value instanceof type4)) {
          throw new EncodeSchemaError("a '".concat(type4.name, "' was expected, but '").concat(value.constructor.name, "' was provided in ").concat(klass.constructor.name, "#").concat(field));
        }
      }
      function encodePrimitiveType(type4, bytes, value, klass, field) {
        assertType(value, type4, klass, field);
        var encodeFunc = encode[type4];
        if (encodeFunc) {
          encodeFunc(bytes, value);
        } else {
          throw new EncodeSchemaError("a '".concat(type4, "' was expected, but ").concat(value, " was provided in ").concat(klass.constructor.name, "#").concat(field));
        }
      }
      function decodePrimitiveType(type4, bytes, it) {
        return decode[type4](bytes, it);
      }
      var Schema3 = (
        /** @class */
        function() {
          function Schema4() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            Object.defineProperties(this, {
              $changes: {
                value: new ChangeTree(this, void 0, new ReferenceTracker()),
                enumerable: false,
                writable: true
              },
              // $listeners: {
              //     value: undefined,
              //     enumerable: false,
              //     writable: true
              // },
              $callbacks: {
                value: void 0,
                enumerable: false,
                writable: true
              }
            });
            var descriptors = this._definition.descriptors;
            if (descriptors) {
              Object.defineProperties(this, descriptors);
            }
            if (args[0]) {
              this.assign(args[0]);
            }
          }
          Schema4.onError = function(e) {
            console.error(e);
          };
          Schema4.is = function(type4) {
            return type4["_definition"] && type4["_definition"].schema !== void 0;
          };
          Schema4.prototype.onChange = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.REPLACE, callback);
          };
          Schema4.prototype.onRemove = function(callback) {
            return addCallback(this.$callbacks || (this.$callbacks = {}), exports2.OPERATION.DELETE, callback);
          };
          Schema4.prototype.assign = function(props) {
            Object.assign(this, props);
            return this;
          };
          Object.defineProperty(Schema4.prototype, "_definition", {
            get: function() {
              return this.constructor._definition;
            },
            enumerable: false,
            configurable: true
          });
          Schema4.prototype.setDirty = function(property, operation) {
            this.$changes.change(property, operation);
          };
          Schema4.prototype.listen = function(prop, callback, immediate) {
            var _this = this;
            if (immediate === void 0) {
              immediate = true;
            }
            if (!this.$callbacks) {
              this.$callbacks = {};
            }
            if (!this.$callbacks[prop]) {
              this.$callbacks[prop] = [];
            }
            this.$callbacks[prop].push(callback);
            if (immediate && this[prop] !== void 0) {
              callback(this[prop], void 0);
            }
            return function() {
              return spliceOne(_this.$callbacks[prop], _this.$callbacks[prop].indexOf(callback));
            };
          };
          Schema4.prototype.decode = function(bytes, it, ref) {
            if (it === void 0) {
              it = { offset: 0 };
            }
            if (ref === void 0) {
              ref = this;
            }
            var allChanges = [];
            var $root = this.$changes.root;
            var totalBytes = bytes.length;
            var refId = 0;
            $root.refs.set(refId, this);
            while (it.offset < totalBytes) {
              var byte = bytes[it.offset++];
              if (byte == SWITCH_TO_STRUCTURE) {
                refId = number(bytes, it);
                var nextRef = $root.refs.get(refId);
                if (!nextRef) {
                  throw new Error('"refId" not found: '.concat(refId));
                }
                ref = nextRef;
                continue;
              }
              var changeTree = ref["$changes"];
              var isSchema = ref["_definition"] !== void 0;
              var operation = isSchema ? byte >> 6 << 6 : byte;
              if (operation === exports2.OPERATION.CLEAR) {
                ref.clear(allChanges);
                continue;
              }
              var fieldIndex = isSchema ? byte % (operation || 255) : number(bytes, it);
              var fieldName = isSchema ? ref["_definition"].fieldsByIndex[fieldIndex] : "";
              var type4 = changeTree.getType(fieldIndex);
              var value = void 0;
              var previousValue = void 0;
              var dynamicIndex = void 0;
              if (!isSchema) {
                previousValue = ref["getByIndex"](fieldIndex);
                if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
                  dynamicIndex = ref instanceof MapSchema ? string(bytes, it) : fieldIndex;
                  ref["setIndex"](fieldIndex, dynamicIndex);
                } else {
                  dynamicIndex = ref["getIndex"](fieldIndex);
                }
              } else {
                previousValue = ref["_".concat(fieldName)];
              }
              if ((operation & exports2.OPERATION.DELETE) === exports2.OPERATION.DELETE) {
                if (operation !== exports2.OPERATION.DELETE_AND_ADD) {
                  ref["deleteByIndex"](fieldIndex);
                }
                if (previousValue && previousValue["$changes"]) {
                  $root.removeRef(previousValue["$changes"].refId);
                }
                value = null;
              }
              if (fieldName === void 0) {
                console.warn("@colyseus/schema: definition mismatch");
                var nextIterator = { offset: it.offset };
                while (it.offset < totalBytes) {
                  if (switchStructureCheck(bytes, it)) {
                    nextIterator.offset = it.offset + 1;
                    if ($root.refs.has(number(bytes, nextIterator))) {
                      break;
                    }
                  }
                  it.offset++;
                }
                continue;
              } else if (operation === exports2.OPERATION.DELETE)
                ;
              else if (Schema4.is(type4)) {
                var refId_1 = number(bytes, it);
                value = $root.refs.get(refId_1);
                if (operation !== exports2.OPERATION.REPLACE) {
                  var childType = this.getSchemaType(bytes, it, type4);
                  if (!value) {
                    value = this.createTypeInstance(childType);
                    value.$changes.refId = refId_1;
                    if (previousValue) {
                      value.$callbacks = previousValue.$callbacks;
                      if (previousValue["$changes"].refId && refId_1 !== previousValue["$changes"].refId) {
                        $root.removeRef(previousValue["$changes"].refId);
                      }
                    }
                  }
                  $root.addRef(refId_1, value, value !== previousValue);
                }
              } else if (typeof type4 === "string") {
                value = decodePrimitiveType(type4, bytes, it);
              } else {
                var typeDef = getType(Object.keys(type4)[0]);
                var refId_2 = number(bytes, it);
                var valueRef = $root.refs.has(refId_2) ? previousValue || $root.refs.get(refId_2) : new typeDef.constructor();
                value = valueRef.clone(true);
                value.$changes.refId = refId_2;
                if (previousValue) {
                  value["$callbacks"] = previousValue["$callbacks"];
                  if (previousValue["$changes"].refId && refId_2 !== previousValue["$changes"].refId) {
                    $root.removeRef(previousValue["$changes"].refId);
                    var entries = previousValue.entries();
                    var iter = void 0;
                    while ((iter = entries.next()) && !iter.done) {
                      var _a = iter.value, key = _a[0], value_1 = _a[1];
                      allChanges.push({
                        refId: refId_2,
                        op: exports2.OPERATION.DELETE,
                        field: key,
                        value: void 0,
                        previousValue: value_1
                      });
                    }
                  }
                }
                $root.addRef(refId_2, value, valueRef !== previousValue);
              }
              if (value !== null && value !== void 0) {
                if (value["$changes"]) {
                  value["$changes"].setParent(changeTree.ref, changeTree.root, fieldIndex);
                }
                if (ref instanceof Schema4) {
                  ref[fieldName] = value;
                } else if (ref instanceof MapSchema) {
                  var key = dynamicIndex;
                  ref["$items"].set(key, value);
                  ref["$changes"].allChanges.add(fieldIndex);
                } else if (ref instanceof ArraySchema) {
                  ref.setAt(fieldIndex, value);
                } else if (ref instanceof CollectionSchema) {
                  var index = ref.add(value);
                  ref["setIndex"](fieldIndex, index);
                } else if (ref instanceof SetSchema) {
                  var index = ref.add(value);
                  if (index !== false) {
                    ref["setIndex"](fieldIndex, index);
                  }
                }
              }
              if (previousValue !== value) {
                allChanges.push({
                  refId,
                  op: operation,
                  field: fieldName,
                  dynamicIndex,
                  value,
                  previousValue
                });
              }
            }
            this._triggerChanges(allChanges);
            $root.garbageCollectDeletedRefs();
            return allChanges;
          };
          Schema4.prototype.encode = function(encodeAll, bytes, useFilters) {
            if (encodeAll === void 0) {
              encodeAll = false;
            }
            if (bytes === void 0) {
              bytes = [];
            }
            if (useFilters === void 0) {
              useFilters = false;
            }
            var rootChangeTree = this.$changes;
            var refIdsVisited = /* @__PURE__ */ new WeakSet();
            var changeTrees = [rootChangeTree];
            var numChangeTrees = 1;
            for (var i = 0; i < numChangeTrees; i++) {
              var changeTree = changeTrees[i];
              var ref = changeTree.ref;
              var isSchema = ref instanceof Schema4;
              changeTree.ensureRefId();
              refIdsVisited.add(changeTree);
              if (changeTree !== rootChangeTree && (changeTree.changed || encodeAll)) {
                uint8$1(bytes, SWITCH_TO_STRUCTURE);
                number$1(bytes, changeTree.refId);
              }
              var changes = encodeAll ? Array.from(changeTree.allChanges) : Array.from(changeTree.changes.values());
              for (var j = 0, cl = changes.length; j < cl; j++) {
                var operation = encodeAll ? { op: exports2.OPERATION.ADD, index: changes[j] } : changes[j];
                var fieldIndex = operation.index;
                var field = isSchema ? ref["_definition"].fieldsByIndex && ref["_definition"].fieldsByIndex[fieldIndex] : fieldIndex;
                var beginIndex = bytes.length;
                if (operation.op !== exports2.OPERATION.TOUCH) {
                  if (isSchema) {
                    uint8$1(bytes, fieldIndex | operation.op);
                  } else {
                    uint8$1(bytes, operation.op);
                    if (operation.op === exports2.OPERATION.CLEAR) {
                      continue;
                    }
                    number$1(bytes, fieldIndex);
                  }
                }
                if (!isSchema && (operation.op & exports2.OPERATION.ADD) == exports2.OPERATION.ADD) {
                  if (ref instanceof MapSchema) {
                    var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                    string$1(bytes, dynamicIndex);
                  }
                }
                if (operation.op === exports2.OPERATION.DELETE) {
                  continue;
                }
                var type4 = changeTree.getType(fieldIndex);
                var value = changeTree.getValue(fieldIndex);
                if (value && value["$changes"] && !refIdsVisited.has(value["$changes"])) {
                  changeTrees.push(value["$changes"]);
                  value["$changes"].ensureRefId();
                  numChangeTrees++;
                }
                if (operation.op === exports2.OPERATION.TOUCH) {
                  continue;
                }
                if (Schema4.is(type4)) {
                  assertInstanceType(value, type4, ref, field);
                  number$1(bytes, value.$changes.refId);
                  if ((operation.op & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
                    this.tryEncodeTypeId(bytes, type4, value.constructor);
                  }
                } else if (typeof type4 === "string") {
                  encodePrimitiveType(type4, bytes, value, ref, field);
                } else {
                  var definition = getType(Object.keys(type4)[0]);
                  assertInstanceType(ref["_".concat(field)], definition.constructor, ref, field);
                  number$1(bytes, value.$changes.refId);
                }
                if (useFilters) {
                  changeTree.cache(fieldIndex, bytes.slice(beginIndex));
                }
              }
              if (!encodeAll && !useFilters) {
                changeTree.discard();
              }
            }
            return bytes;
          };
          Schema4.prototype.encodeAll = function(useFilters) {
            return this.encode(true, [], useFilters);
          };
          Schema4.prototype.applyFilters = function(client, encodeAll) {
            var _a, _b;
            if (encodeAll === void 0) {
              encodeAll = false;
            }
            var root = this;
            var refIdsDissallowed = /* @__PURE__ */ new Set();
            var $filterState = ClientState.get(client);
            var changeTrees = [this.$changes];
            var numChangeTrees = 1;
            var filteredBytes = [];
            var _loop_1 = function(i2) {
              var changeTree = changeTrees[i2];
              if (refIdsDissallowed.has(changeTree.refId)) {
                return "continue";
              }
              var ref = changeTree.ref;
              var isSchema = ref instanceof Schema4;
              uint8$1(filteredBytes, SWITCH_TO_STRUCTURE);
              number$1(filteredBytes, changeTree.refId);
              var clientHasRefId = $filterState.refIds.has(changeTree);
              var isEncodeAll = encodeAll || !clientHasRefId;
              $filterState.addRefId(changeTree);
              var containerIndexes = $filterState.containerIndexes.get(changeTree);
              var changes = isEncodeAll ? Array.from(changeTree.allChanges) : Array.from(changeTree.changes.values());
              if (!encodeAll && isSchema && ref._definition.indexesWithFilters) {
                var indexesWithFilters = ref._definition.indexesWithFilters;
                indexesWithFilters.forEach(function(indexWithFilter) {
                  if (!containerIndexes.has(indexWithFilter) && changeTree.allChanges.has(indexWithFilter)) {
                    if (isEncodeAll) {
                      changes.push(indexWithFilter);
                    } else {
                      changes.push({ op: exports2.OPERATION.ADD, index: indexWithFilter });
                    }
                  }
                });
              }
              for (var j = 0, cl = changes.length; j < cl; j++) {
                var change = isEncodeAll ? { op: exports2.OPERATION.ADD, index: changes[j] } : changes[j];
                if (change.op === exports2.OPERATION.CLEAR) {
                  uint8$1(filteredBytes, change.op);
                  continue;
                }
                var fieldIndex = change.index;
                if (change.op === exports2.OPERATION.DELETE) {
                  if (isSchema) {
                    uint8$1(filteredBytes, change.op | fieldIndex);
                  } else {
                    uint8$1(filteredBytes, change.op);
                    number$1(filteredBytes, fieldIndex);
                  }
                  continue;
                }
                var value = changeTree.getValue(fieldIndex);
                var type4 = changeTree.getType(fieldIndex);
                if (isSchema) {
                  var filter2 = ref._definition.filters && ref._definition.filters[fieldIndex];
                  if (filter2 && !filter2.call(ref, client, value, root)) {
                    if (value && value["$changes"]) {
                      refIdsDissallowed.add(value["$changes"].refId);
                    }
                    continue;
                  }
                } else {
                  var parent = changeTree.parent;
                  var filter2 = changeTree.getChildrenFilter();
                  if (filter2 && !filter2.call(parent, client, ref["$indexes"].get(fieldIndex), value, root)) {
                    if (value && value["$changes"]) {
                      refIdsDissallowed.add(value["$changes"].refId);
                    }
                    continue;
                  }
                }
                if (value["$changes"]) {
                  changeTrees.push(value["$changes"]);
                  numChangeTrees++;
                }
                if (change.op !== exports2.OPERATION.TOUCH) {
                  if (change.op === exports2.OPERATION.ADD || isSchema) {
                    filteredBytes.push.apply(filteredBytes, (_a = changeTree.caches[fieldIndex]) !== null && _a !== void 0 ? _a : []);
                    containerIndexes.add(fieldIndex);
                  } else {
                    if (containerIndexes.has(fieldIndex)) {
                      filteredBytes.push.apply(filteredBytes, (_b = changeTree.caches[fieldIndex]) !== null && _b !== void 0 ? _b : []);
                    } else {
                      containerIndexes.add(fieldIndex);
                      uint8$1(filteredBytes, exports2.OPERATION.ADD);
                      number$1(filteredBytes, fieldIndex);
                      if (ref instanceof MapSchema) {
                        var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                        string$1(filteredBytes, dynamicIndex);
                      }
                      if (value["$changes"]) {
                        number$1(filteredBytes, value["$changes"].refId);
                      } else {
                        encode[type4](filteredBytes, value);
                      }
                    }
                  }
                } else if (value["$changes"] && !isSchema) {
                  uint8$1(filteredBytes, exports2.OPERATION.ADD);
                  number$1(filteredBytes, fieldIndex);
                  if (ref instanceof MapSchema) {
                    var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                    string$1(filteredBytes, dynamicIndex);
                  }
                  number$1(filteredBytes, value["$changes"].refId);
                }
              }
            };
            for (var i = 0; i < numChangeTrees; i++) {
              _loop_1(i);
            }
            return filteredBytes;
          };
          Schema4.prototype.clone = function() {
            var _a;
            var cloned = new this.constructor();
            var schema = this._definition.schema;
            for (var field in schema) {
              if (typeof this[field] === "object" && typeof ((_a = this[field]) === null || _a === void 0 ? void 0 : _a.clone) === "function") {
                cloned[field] = this[field].clone();
              } else {
                cloned[field] = this[field];
              }
            }
            return cloned;
          };
          Schema4.prototype.toJSON = function() {
            var schema = this._definition.schema;
            var deprecated2 = this._definition.deprecated;
            var obj = {};
            for (var field in schema) {
              if (!deprecated2[field] && this[field] !== null && typeof this[field] !== "undefined") {
                obj[field] = typeof this[field]["toJSON"] === "function" ? this[field]["toJSON"]() : this["_".concat(field)];
              }
            }
            return obj;
          };
          Schema4.prototype.discardAllChanges = function() {
            this.$changes.discardAll();
          };
          Schema4.prototype.getByIndex = function(index) {
            return this[this._definition.fieldsByIndex[index]];
          };
          Schema4.prototype.deleteByIndex = function(index) {
            this[this._definition.fieldsByIndex[index]] = void 0;
          };
          Schema4.prototype.tryEncodeTypeId = function(bytes, type4, targetType) {
            if (type4._typeid !== targetType._typeid) {
              uint8$1(bytes, TYPE_ID);
              number$1(bytes, targetType._typeid);
            }
          };
          Schema4.prototype.getSchemaType = function(bytes, it, defaultType) {
            var type4;
            if (bytes[it.offset] === TYPE_ID) {
              it.offset++;
              type4 = this.constructor._context.get(number(bytes, it));
            }
            return type4 || defaultType;
          };
          Schema4.prototype.createTypeInstance = function(type4) {
            var instance = new type4();
            instance.$changes.root = this.$changes.root;
            return instance;
          };
          Schema4.prototype._triggerChanges = function(changes) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var uniqueRefIds = /* @__PURE__ */ new Set();
            var $refs = this.$changes.root.refs;
            var _loop_2 = function(i2) {
              var change = changes[i2];
              var refId = change.refId;
              var ref = $refs.get(refId);
              var $callbacks = ref["$callbacks"];
              if ((change.op & exports2.OPERATION.DELETE) === exports2.OPERATION.DELETE && change.previousValue instanceof Schema4) {
                (_b = (_a = change.previousValue["$callbacks"]) === null || _a === void 0 ? void 0 : _a[exports2.OPERATION.DELETE]) === null || _b === void 0 ? void 0 : _b.forEach(function(callback) {
                  return callback();
                });
              }
              if (!$callbacks) {
                return "continue";
              }
              if (ref instanceof Schema4) {
                if (!uniqueRefIds.has(refId)) {
                  try {
                    (_c = $callbacks === null || $callbacks === void 0 ? void 0 : $callbacks[exports2.OPERATION.REPLACE]) === null || _c === void 0 ? void 0 : _c.forEach(function(callback) {
                      return callback();
                    });
                  } catch (e) {
                    Schema4.onError(e);
                  }
                }
                try {
                  if ($callbacks.hasOwnProperty(change.field)) {
                    (_d = $callbacks[change.field]) === null || _d === void 0 ? void 0 : _d.forEach(function(callback) {
                      return callback(change.value, change.previousValue);
                    });
                  }
                } catch (e) {
                  Schema4.onError(e);
                }
              } else {
                if (change.op === exports2.OPERATION.ADD && change.previousValue === void 0) {
                  (_e = $callbacks[exports2.OPERATION.ADD]) === null || _e === void 0 ? void 0 : _e.forEach(function(callback) {
                    var _a2;
                    return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                  });
                } else if (change.op === exports2.OPERATION.DELETE) {
                  if (change.previousValue !== void 0) {
                    (_f = $callbacks[exports2.OPERATION.DELETE]) === null || _f === void 0 ? void 0 : _f.forEach(function(callback) {
                      var _a2;
                      return callback(change.previousValue, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                    });
                  }
                } else if (change.op === exports2.OPERATION.DELETE_AND_ADD) {
                  if (change.previousValue !== void 0) {
                    (_g = $callbacks[exports2.OPERATION.DELETE]) === null || _g === void 0 ? void 0 : _g.forEach(function(callback) {
                      var _a2;
                      return callback(change.previousValue, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                    });
                  }
                  (_h = $callbacks[exports2.OPERATION.ADD]) === null || _h === void 0 ? void 0 : _h.forEach(function(callback) {
                    var _a2;
                    return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                  });
                }
                if (change.value !== change.previousValue) {
                  (_j = $callbacks[exports2.OPERATION.REPLACE]) === null || _j === void 0 ? void 0 : _j.forEach(function(callback) {
                    var _a2;
                    return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                  });
                }
              }
              uniqueRefIds.add(refId);
            };
            for (var i = 0; i < changes.length; i++) {
              _loop_2(i);
            }
          };
          Schema4._definition = SchemaDefinition.create();
          return Schema4;
        }()
      );
      function dumpChanges(schema) {
        var changeTrees = [schema["$changes"]];
        var numChangeTrees = 1;
        var dump = {};
        var currentStructure = dump;
        var _loop_1 = function(i2) {
          var changeTree = changeTrees[i2];
          changeTree.changes.forEach(function(change) {
            var ref = changeTree.ref;
            var fieldIndex = change.index;
            var field = ref["_definition"] ? ref["_definition"].fieldsByIndex[fieldIndex] : ref["$indexes"].get(fieldIndex);
            currentStructure[field] = changeTree.getValue(fieldIndex);
          });
        };
        for (var i = 0; i < numChangeTrees; i++) {
          _loop_1(i);
        }
        return dump;
      }
      var reflectionContext = { context: new Context() };
      var ReflectionField = (
        /** @class */
        function(_super) {
          __extends(ReflectionField2, _super);
          function ReflectionField2() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          __decorate([
            type3("string", reflectionContext)
          ], ReflectionField2.prototype, "name", void 0);
          __decorate([
            type3("string", reflectionContext)
          ], ReflectionField2.prototype, "type", void 0);
          __decorate([
            type3("number", reflectionContext)
          ], ReflectionField2.prototype, "referencedType", void 0);
          return ReflectionField2;
        }(Schema3)
      );
      var ReflectionType = (
        /** @class */
        function(_super) {
          __extends(ReflectionType2, _super);
          function ReflectionType2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fields = new ArraySchema();
            return _this;
          }
          __decorate([
            type3("number", reflectionContext)
          ], ReflectionType2.prototype, "id", void 0);
          __decorate([
            type3([ReflectionField], reflectionContext)
          ], ReflectionType2.prototype, "fields", void 0);
          return ReflectionType2;
        }(Schema3)
      );
      var Reflection = (
        /** @class */
        function(_super) {
          __extends(Reflection2, _super);
          function Reflection2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.types = new ArraySchema();
            return _this;
          }
          Reflection2.encode = function(instance) {
            var _a;
            var rootSchemaType = instance.constructor;
            var reflection = new Reflection2();
            reflection.rootType = rootSchemaType._typeid;
            var buildType = function(currentType, schema) {
              for (var fieldName in schema) {
                var field = new ReflectionField();
                field.name = fieldName;
                var fieldType = void 0;
                if (typeof schema[fieldName] === "string") {
                  fieldType = schema[fieldName];
                } else {
                  var type_1 = schema[fieldName];
                  var childTypeSchema = void 0;
                  if (Schema3.is(type_1)) {
                    fieldType = "ref";
                    childTypeSchema = schema[fieldName];
                  } else {
                    fieldType = Object.keys(type_1)[0];
                    if (typeof type_1[fieldType] === "string") {
                      fieldType += ":" + type_1[fieldType];
                    } else {
                      childTypeSchema = type_1[fieldType];
                    }
                  }
                  field.referencedType = childTypeSchema ? childTypeSchema._typeid : -1;
                }
                field.type = fieldType;
                currentType.fields.push(field);
              }
              reflection.types.push(currentType);
            };
            var types = (_a = rootSchemaType._context) === null || _a === void 0 ? void 0 : _a.types;
            for (var typeid in types) {
              var type_2 = new ReflectionType();
              type_2.id = Number(typeid);
              buildType(type_2, types[typeid]._definition.schema);
            }
            return reflection.encodeAll();
          };
          Reflection2.decode = function(bytes, it) {
            var context = new Context();
            var reflection = new Reflection2();
            reflection.decode(bytes, it);
            var schemaTypes = reflection.types.reduce(function(types, reflectionType) {
              var schema = (
                /** @class */
                function(_super2) {
                  __extends(_, _super2);
                  function _() {
                    return _super2 !== null && _super2.apply(this, arguments) || this;
                  }
                  return _;
                }(Schema3)
              );
              var typeid = reflectionType.id;
              types[typeid] = schema;
              context.add(schema, typeid);
              return types;
            }, {});
            reflection.types.forEach(function(reflectionType) {
              var schemaType = schemaTypes[reflectionType.id];
              reflectionType.fields.forEach(function(field) {
                var _a;
                if (field.referencedType !== void 0) {
                  var fieldType2 = field.type;
                  var refType = schemaTypes[field.referencedType];
                  if (!refType) {
                    var typeInfo = field.type.split(":");
                    fieldType2 = typeInfo[0];
                    refType = typeInfo[1];
                  }
                  if (fieldType2 === "ref") {
                    type3(refType, { context })(schemaType.prototype, field.name);
                  } else {
                    type3((_a = {}, _a[fieldType2] = refType, _a), { context })(schemaType.prototype, field.name);
                  }
                } else {
                  type3(field.type, { context })(schemaType.prototype, field.name);
                }
              });
            });
            var rootType = schemaTypes[reflection.rootType];
            var rootInstance = new rootType();
            for (var fieldName in rootType._definition.schema) {
              var fieldType = rootType._definition.schema[fieldName];
              if (typeof fieldType !== "string") {
                rootInstance[fieldName] = typeof fieldType === "function" ? new fieldType() : new (getType(Object.keys(fieldType)[0])).constructor();
              }
            }
            return rootInstance;
          };
          __decorate([
            type3([ReflectionType], reflectionContext)
          ], Reflection2.prototype, "types", void 0);
          __decorate([
            type3("number", reflectionContext)
          ], Reflection2.prototype, "rootType", void 0);
          return Reflection2;
        }(Schema3)
      );
      registerType("map", { constructor: MapSchema });
      registerType("array", { constructor: ArraySchema });
      registerType("set", { constructor: SetSchema });
      registerType("collection", { constructor: CollectionSchema });
      exports2.ArraySchema = ArraySchema;
      exports2.CollectionSchema = CollectionSchema;
      exports2.Context = Context;
      exports2.MapSchema = MapSchema;
      exports2.Reflection = Reflection;
      exports2.ReflectionField = ReflectionField;
      exports2.ReflectionType = ReflectionType;
      exports2.Schema = Schema3;
      exports2.SchemaDefinition = SchemaDefinition;
      exports2.SetSchema = SetSchema;
      exports2.decode = decode;
      exports2.defineTypes = defineTypes;
      exports2.deprecated = deprecated;
      exports2.dumpChanges = dumpChanges;
      exports2.encode = encode;
      exports2.filter = filter;
      exports2.filterChildren = filterChildren;
      exports2.hasFilter = hasFilter;
      exports2.registerType = registerType;
      exports2.type = type3;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// src/constants.ts
var MAP_WIDTH = 800;
var SERVER_TIMESTEP = 1e3 / 10;
var CLIENT_TIMESTEP = 1e3 / 60;
var SHIP_VX = 0.2;

// src/controllers/player.ts
var PlayerController = class {
  constructor(state) {
    this.state = state;
    this.prevState = state.clone();
  }
  tick(dt) {
    this.state.x = (this.state.x + SHIP_VX * dt) % MAP_WIDTH;
    this.invokeCallback();
  }
  invokeCallback() {
    if (this.callback)
      this.callback(this.state, this.prevState);
  }
  setCallback(callback) {
    this.callback = callback;
  }
  reconcile(playerState) {
    this.state = playerState;
    this.invokeCallback();
  }
};

// src/controllers/room.ts
var RoomController = class {
  constructor(state) {
    this.players = [];
    this.players.push(new PlayerController(state.player0));
    this.players.push(new PlayerController(state.player1));
    this.players.push(new PlayerController(state.player2));
  }
  tick(dt) {
    this.players.forEach((player) => player.tick(dt));
  }
};

// src/schemas/player.ts
var import_schema = __toESM(require_umd(), 1);
var PlayerSchema = class extends import_schema.Schema {
  constructor() {
    super(...arguments);
    this.x = Math.random() * MAP_WIDTH;
  }
};
__decorateClass([
  (0, import_schema.type)("number")
], PlayerSchema.prototype, "x", 2);
__decorateClass([
  (0, import_schema.type)("string")
], PlayerSchema.prototype, "sessionId", 2);

// src/schemas/room.ts
var import_schema2 = __toESM(require_umd(), 1);
var RoomSchema = class extends import_schema2.Schema {
  constructor() {
    super(...arguments);
    this.player0 = new PlayerSchema();
    this.player1 = new PlayerSchema();
    this.player2 = new PlayerSchema();
  }
};
__decorateClass([
  (0, import_schema2.type)(PlayerSchema)
], RoomSchema.prototype, "player0", 2);
__decorateClass([
  (0, import_schema2.type)(PlayerSchema)
], RoomSchema.prototype, "player1", 2);
__decorateClass([
  (0, import_schema2.type)(PlayerSchema)
], RoomSchema.prototype, "player2", 2);
export {
  CLIENT_TIMESTEP,
  MAP_WIDTH,
  PlayerController,
  PlayerSchema,
  RoomController,
  RoomSchema,
  SERVER_TIMESTEP
};
