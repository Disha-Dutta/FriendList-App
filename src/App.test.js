import { render, screen } from "@testing-library/react";
import App from "./App";
import { addTodo, search, completeTodo, removeTodo } from "./App";

test("Priya Dutta", () => {
  render(<App />);
  const linkElement = screen.getByText(/Priya/i);
  expect(linkElement).toBeInTheDocument();
});

describe("addTodo", () => {
  it("should add todo to the list", () => {
    const startTodos = [
      { name: "disha", isComplete: false },
      { name: "dutta", isComplete: false },
    ];

    const newTodo = { id: 3, name: "priya", isComplete: false };
    const expected = [
      { id: 3, name: "priya", isComplete: false },
      { id: 1, name: "disha", isComplete: false },
      { id: 2, name: "dutta", isComplete: false },
    ];
    const result = addTodo(startTodos, newTodo);
    expect(result).toEqual(expected);
  });
});

test("search should return the expected item from array", () => {
  const startTodos = [
    { name: "one", isComplete: false },
    { name: "two", isComplete: false },
    { name: "three", isComplete: false },
  ];

  const expected = { name: "two", isComplete: false };

  const result = search(2, startTodos);

  expect(result).toEqual(expected);
});

test("toggleTodo should toggle isComplete prop of a todo", () => {
  const startTodo = { name: "one", isComplete: false };
  const expected = { name: "one", isComplete: true };

  const result = completeTodo(startTodo);

  expect(result).toEqual(expected);
});

test("removeTodo should remove todo from todos by id", () => {
  const startTodos = [
    { id: 1, name: "one", isComplete: false },
    { id: 2, name: "two", isComplete: false },
    { id: 3, name: "three", isComplete: false },
  ];

  const expected = [
    { id: 1, name: "one", isComplete: false },
    { id: 3, name: "three", isComplete: false },
  ];

  const result = removeTodo(startTodos, 2);

  expect(result).toEqual(expected);
});
