"use strict";
const customArrayFunctions = (function() {
  function isArrayNumber(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "number") {
        return false;
      }
    }
    return true;
  }

  function take(arr, n) {
    if (Array.isArray(arr)) {
      return arr.slice(0, n);
    }
  }

  function skip(arr, n) {
    if (Array.isArray(arr)) {
      return arr.slice(n, arr.length);
    }
  }

  function map(arr, callback) {
    if (Array.isArray(arr)) {
      var length = arr.length,
        newarr = [];
      for (var i = 0; i < length; i = i + 1) {
        newarr.push(callback(i, arr[i]));
      }
      return newarr;
    }
  }

  function reduce(arr, callback, val) {
    if (Array.isArray(arr) && isArrayNumber(arr)) {
      var length = arr.length,
        i = 0,
        value;
      value = val === undefined ? arr[i++] : val;
      for (; i < length; i++) {
        value = callback(value, arr[i]);
      }
      return value;
    }
  }

  function filter(arr, callback) {
    if (Array.isArray(arr)) {
      var length = arr.length,
        newarr = [];
      for (var i = 0; i < length; i = i + 1) {
        if (callback(i, arr[i])) {
          newarr.push(arr[i]);
        }
      }
      return newarr;
    }
  }

  function foreach(arr, callback) {
    if (Array.isArray(arr)) {
      var length = arr.length;
      for (var i = 0; i < length; i = i + 1) {
        callback(i, arr[i]);
      }
    }
  }
  function chain(arr) {
    function wrapChain(func) {
      return function(...args) {
        arr = func.call(null, arr, ...args);
        return this;
      };
    }
    return {
      take: wrapChain(self.take),
      skip: wrapChain(self.skip),
      map: wrapChain(self.map),
      filter: wrapChain(self.filter),
      value: () => arr
    };
  }
  function sum() {
    var cash = {};
    return (arr, start, end) => {
      var result = 0,
        key = arr.toString() + start + end;
      if (key in cash) {
        return cash[key];
      }
      for (let i = start - 1; i < end; i++) {
        result += arr[i];
      }
      cash[key] = result;
      return result;
    };
  }
  var self = {
    take: take,
    skip: skip,
    map: map,
    reduce: reduce,
    filter: filter,
    foreach: foreach,
    chain: chain,
    sum: new sum()
  };

  return self;
})();
