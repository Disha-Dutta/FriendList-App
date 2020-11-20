import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo">
      {todo.text}

      <div>
        {todo.isCompleted ? (
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => completeTodo(index)}
          >
            ★
          </button>
        ) : (
          <button onClick={() => completeTodo(index)}>☆</button>
        )}
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo, searchTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter to do item"
        />
      </form>
      {/* <button onClick={(e) => searchTodo(e)}>Search</button> */}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Rajinder",
      isCompleted: false,
    },
    {
      text: "Priya Dutta",
      isCompleted: false,
    },
    {
      text: "Ruhani",
      isCompleted: false,
    },
  ]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState(todos);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(4);

  const search = (e) => {
    if (value) {
      let filterData = todos.filter((item) => {
        const lc = item.text.toLowerCase();
        const filter = value.toLowerCase();

        return lc.includes(filter);
      });
      setFilter(filterData);
      // setTodos(filterData);
    } else {
      setFilter(todos);
      // setTodos(todos);
    }
  };

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
    setFilter(newTodos);
  };

  const completeTodo = (index) => {
    // let newTodos = [...todos];
    const newTodos = [...filter];
    var todo = newTodos[index];
    todo.isCompleted = !todo.isCompleted;
    newTodos.splice(index, 1);
    todo.isCompleted ? newTodos.unshift(todo) : newTodos.push(todo);
    // setTodos(newTodos);
    setFilter(newTodos);
  };

  const removeTodo = (index) => {
    // const newTodos = [...todos];
    const newTodos = [...filter];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setFilter(newTodos);
  };

  const handlePagination = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  console.log(indexOfLastTodo, indexOfFirstTodo);
  // setTodos(todos.slice(indexOfFirstTodo, indexOfLastTodo));
  // setFilter(filter.slice(indexOfFirstTodo, indexOfLastTodo));
  console.log(filter.slice(indexOfFirstTodo, indexOfLastTodo));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filter.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={(e) => handlePagination(e)}>
        {number}
      </li>
    );
  });

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm todo={todos} addTodo={addTodo} />
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
        />
        <button onClick={(e) => search(e)}>Search</button>
        {filter.slice(indexOfFirstTodo, indexOfLastTodo).map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        {/* {filter.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))} */}
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    </div>
  );
}

export default App;
