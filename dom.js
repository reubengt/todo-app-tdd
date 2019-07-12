// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(() => {
  // This is the dom node where we will keep our todo
  let container = document.getElementById("todo-container");
  let addTodoForm = document.getElementById("add-todo");

  let state = [
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
  let createTodoNode = todo => {
    let todoNode = document.createElement("li");
    // you will need to use addEventListener
    todoNode.addEventListener("click", function(mark) {
      // Come back to?
    });
    // add span holding description
    let todoSpan = document.createElement("span");
    let descNode = document.createTextNode(todo.description);
    todoNode.appendChild(todoSpan);
    todoSpan.appendChild(descNode);

    // add container for both buttons
    let buttonContainer = document.createElement("div");
    todoNode.appendChild(buttonContainer);

    // add markTodo button
    let markTodoButtonNode = document.createElement("button");
    buttonContainer.appendChild(markTodoButtonNode);
    if (todo.done) {
      markTodoButtonNode.textContent = "✔";
      todoSpan.style.textDecoration = "line-through";
    }

    todoNode.addEventListener("click", e => {
      let newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    // this adds the delete button
    let deleteButtonNode = document.createElement("button");
    deleteButtonNode.textContent = "Delete";
    deleteButtonNode.addEventListener("click", event => {
      let newState = todoFunctions.deleteTodo(state, todo.id);
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
    addTodoForm.addEventListener("submit", event => {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?

      event.preventDefault();
      let description = event.target.elements.description.value;
      console.log(event.target.elements.description.value); // event.target ....
      // hint: todoFunctions.addTodo
      let newState = todoFunctions.addTodo(state, {
        description: description
      }); // ?? change this!
      update(newState);
    });
  }

  // you should not need to change this function
  let update = newState => {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  let renderState = state => {
    let todoListNode = document.createElement("ul");

    state.forEach(todo => {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
