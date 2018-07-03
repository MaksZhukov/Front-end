class CustomArrayFunctions {
	constructor (){
		this.sum = this.sum();
	}
  isArrayNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "number") {
        return false;
      }
    }
    return true;
  }
  take(arr, n) {
    if (Array.isArray(arr)) {
      return arr.slice(0, n);
    }
  }

  skip(arr, n) {
    if (Array.isArray(arr)) {
      return arr.slice(n, arr.length);
    }
  }

  map(arr, callback) {
    if (Array.isArray(arr)) {
      let length = arr.length,
        newarr = [];
      for (let i = 0; i < length; i = i + 1) {
        newarr.push(callback(i, arr[i]));
      }
      return newarr;
    }
  }

  reduce(arr, callback, val) {
    if (Array.isArray(arr) && this.isArrayNumber(arr)) {
      let length = arr.length,
        i = 0,
        value;
      value = val === undefined ? arr[i++] : val;
      for (; i < length; i++) {
        value = callback(value, arr[i]);
      }
      return value;
    }
  }

  filter(arr, callback) {
    if (Array.isArray(arr)) {
      let length = arr.length,
        newarr = [];
      for (let i = 0; i < length; i = i + 1) {
        if (callback(i, arr[i])) {
          newarr.push(arr[i]);
        }
      }
      return newarr;
    }
  }

  foreach(arr, callback) {
    if (Array.isArray(arr)) {
      let length = arr.length;
      for (let i = 0; i < length; i = i + 1) {
        callback(i, arr[i]);
      }
    }
  }
  chain(arr) {
    let wrapChain = func => {
      return (...args) => {
        arr = func.call(null, arr, ...args);
        return this.chain(arr);
      };
    };
    return {
      take: wrapChain(this.take),
      skip: wrapChain(this.skip),
      map: wrapChain(this.map),
      filter: wrapChain(this.filter),
      value: () => arr
    };
  }
  sum() {
		let cash = {};
		return (arr, start, end) => {
			let result = 0,
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
}

const customArrayFunctions = new CustomArrayFunctions();
