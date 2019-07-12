// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var state = [
    {
      id: -3,
      description: "first todo"
    },
    {
      id: -2,
      description: "second todo"
    },
    {
      id: -1,
      description: "third todo"
    }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    // you will need to use addEventListener
    todoNode.addEventListener("click", function(mark) {
      // Come back to?
    });
    // add span holding description
    var todoSpan = document.createElement("span");
    var descNode = document.createTextNode(todo.description);
    todoNode.appendChild(todoSpan);
    todoSpan.appendChild(descNode);

    // add container for both buttons
    var buttonContainer = document.createElement("div");
    todoNode.appendChild(buttonContainer);

    // add markTodo button
    var markTodoButtonNode = document.createElement("button");
    markTodoButtonNode.setAttribute("aria-label", "Mark as done");
    buttonContainer.appendChild(markTodoButtonNode);
    if (todo.done) {
      markTodoButtonNode.setAttribute("aria-label", "Mark as not done");
      markTodoButtonNode.textContent = "✔";
      todoSpan.style.textDecoration = "line-through";
    }

    todoNode.addEventListener("click", function(e) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    // this adds the delete button
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.textContent = "Delete";
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    buttonContainer.appendChild(deleteButtonNode);

    // add classes for css
    todoNode.className = "todo";
    todoSpan.className = "todospan";
    buttonContainer.className = "buttoncontainer";
    deleteButtonNode.classList.add("button", "delete");
    markTodoButtonNode.classList.add("button", "mark");
    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?

      event.preventDefault();
      var description = event.target.elements.description.value;

      if (description !== "") {
        var newState = todoFunctions.addTodo(state, {
          description: description
        }); // ?? change this!
        event.target.elements.description.value = "";

        update(newState);
      }
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
