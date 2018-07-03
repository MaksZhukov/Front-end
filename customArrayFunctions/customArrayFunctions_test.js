describe("Custom Array Functions", function() {
  var inputArrayTest, inputArrayTestWithChar;
  beforeEach(function() {
    inputArrayTest = [2, 6, 7, 1, 6];
    inputArrayTestWithChar = [2, 3, 6, 1, "f"];
  });
  it("Method 'take' must return first element form array", function() {
    expect(customArrayFunctions.take(inputArrayTest, 1)).toEqual([2]);
  });
  it("Method 'take' return undefined when first argument boolean", function() {
    expect(customArrayFunctions.take(false, 1)).toBeUndefined();
  });
  it("Method 'skip' return undefined when first argument number", function() {
    expect(customArrayFunctions.skip(5, 1)).toBeUndefined();
  });
  it("Method 'map' return undefined when first argument string", function() {
    expect(customArrayFunctions.map("fwq", 1)).toBeUndefined();
  });
  it("Method 'reduce' return undefined when first argument undefined", function() {
    expect(customArrayFunctions.reduce(undefined, 1, 1)).toBeUndefined();
  });
  it("Method 'filter' return undefined when first argument object", function() {
    expect(customArrayFunctions.filter({}, 1)).toBeUndefined();
  });
  it("Method 'foreach' return undefined when first argument null", function() {
    expect(customArrayFunctions.foreach(null, 1)).toBeUndefined();
  });
  it("Method 'reduce' return undefined when first argument is an array not only from numbers", function() {
    expect(
      customArrayFunctions.reduce(
        inputArrayTestWithChar,
        (index, element) => {
          return element;
        },
        1
      )
    ).toBeUndefined();
  });
  it("Method 'skip' return last 2 element", function() {
    expect(customArrayFunctions.skip(inputArrayTest, 3)).toEqual([1, 6]);
  });
  it("Method 'map' return all elements and add '_'", function() {
    expect(
      customArrayFunctions.map(inputArrayTestWithChar, (index, element) => {
        return element + "_";
      })
    ).toEqual(["2_", "3_", "6_", "1_", "f_"]);
  });
  it("Method 'reduce' return sum all elements elements", function() {
    expect(
      customArrayFunctions.reduce(inputArrayTest, (prev, next) => {
        return prev + next;
      })
    ).toEqual(22);
  });
  it("Method 'filter' return all elements < 4", function() {
    expect(
      customArrayFunctions.filter(inputArrayTest, (index, element) => {
        return element < 4;
      })
    ).toEqual([2, 1]);
  });
});
describe("Custom Array Functions chain", function() {
  var inputArrayTest;
  beforeEach(function() {
    inputArrayTest = [-1, -2, -3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });
  it("Chain skip -> take return array elements take 5 elements and skip 3", function() {
    expect(
      customArrayFunctions
        .chain(inputArrayTest)
        .take(5)
        .skip(3)
        .value()
    ).toEqual([1, 2]);
  });
  it("Chain skip -> take -> filter return array elements > 2 take 9 elements and skip 1", function() {
    expect(
      customArrayFunctions
        .chain(inputArrayTest)
        .take(9)
        .skip(1)
        .filter((index, element) => {
          return element > 2;
        })
        .value()
    ).toEqual([3, 4, 5, 6]);
  });
  it("Chain filter -> take return elements > 3 and take 4", function() {
    expect(
      customArrayFunctions
        .chain(inputArrayTest)
        .filter((index, element) => {
          return element > 3;
        })
        .take(4)
        .value()
    ).toEqual([4, 5, 6, 7]);
  });
  it("Chain map -> take return array from 3 elements with add to each 10", function() {
    expect(
      customArrayFunctions
        .chain(inputArrayTest)
        .map((index, element) => {
          return element + 10;
        })
        .take(3)
        .value()
    ).toEqual([9, 8, 7]);
  });
});
describe("Sum", function() {
  var inputArrayTest;
  beforeEach(function() {
    inputArrayTest = [-1, -2, -3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });
  it("Function sum return value from cash", function() {
    var result = customArrayFunctions.sum([inputArrayTest], 1, 7);
    expect(result).toEqual(customArrayFunctions.sum([inputArrayTest], 1, 7));
  });
});
