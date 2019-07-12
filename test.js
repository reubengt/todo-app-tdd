var test = require("tape");
var logic = require("./logic");
var testArr = [{
    id: -3,
    description: "first todo",
    done: false
  },
  {
    id: -2,
    description: "second todo",
    done: false
  },
  {
    id: -1,
    description: "third todo",
    done: false
  }
];
var testObj = {
  description: "test todo"
};
test("Example test", function (t) {
  t.pass();
  t.end();
});
test("check that addToDo accepts input", function (t) {
  const actual = typeof logic.addTodo(testArr, testObj);
  const expected = "object";
  t.deepEqual(actual, expected, "should accept input and return an array");
  t.end();
});
test("check that todos hasn't changed", function (t) {
  const actual = logic.addTodo(testArr, testObj).slice(0, testArr.length);
  const expected = testArr;
  t.deepEqual(actual, expected, "should not change the original todos array");
  t.end();
});

test("check that it returns todos array plus new todo", function (t) {
  const actual = logic.addTodo(testArr, testObj);
  const expected = [{
      id: -3,
      description: "first todo",
      done: false
    },
    {
      id: -2,
      description: "second todo",
      done: false
    },
    {
      id: -1,
      description: "third todo",
      done: false
    },
    {
      id: 1,
      description: "test todo",
      done: false
    }
  ];
  t.deepEqual(actual, expected, "returns todo array plus new todo");
  t.end();
});
test("check that newTodo has an id", function (t) {
  const actual = logic
    .addTodo(testArr, testObj)
    .pop()
    .hasOwnProperty("id");
  const expected = true;
  t.deepEqual(actual, expected, "should add a property of id to newTodo");
  t.end();
});

test("check that markTodo accepts input and returns an array", function (t) {
  const testId = -1;
  const actual = typeof logic.addTodo(testArr, testId);
  const expected = "object";
  t.deepEqual(actual, expected, "should accept input and return an array");
  t.end();
});
test("check that the 'done' property is toggled for the specified ID", function (t) {
  const testId = -1;
  const actual = logic.markTodo(testArr, testId);
  const expected = [{
      id: -3,
      description: "first todo",
      done: false
    },
    {
      id: -2,
      description: "second todo",
      done: false
    },
    {
      id: -1,
      description: "third todo",
      done: true
    }
  ];
  t.deepEqual(actual, expected, "should toggle done property");
  t.end();
});
//deleteToDo tests

test("leave the input argument todos unchanged", function (t) {
  const actual = logic.deleteTodo(testArr);
  const expected = [{
      id: -3,
      description: "first todo",
      done: false
    },
    {
      id: -2,
      description: "second todo",
      done: false
    },
    {
      id: -1,
      description: "third todo",
      done: false
    }
  ];
  t.deepEqual(actual, expected, "input is unchanged");
  t.end();
});

test("Check if the idToDelete has been deleted", function (t) {
  const testID = -2;
  const actual = logic.deleteTodo(testArr, testID);
  const expected = [{
      id: -3,
      description: "first todo",
      done: false
    },
    {
      id: -1,
      description: "third todo",
      done: false
    }
  ];
  t.deepEqual(actual, expected, "element has been deleted");
  t.end();
});