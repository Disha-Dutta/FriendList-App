import { render, screen } from "@testing-library/react";
import App from "./App";
import { addFriend, search, addToFav, removeFriend } from "./App.helper";

test("Priya Dutta", () => {
  render(<App />);
  const linkElement = screen.getByText(/Priya/i);
  expect(linkElement).toBeInTheDocument();
});

test("addFriend should add friend to the list", () => {
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

  const result = addFriend(startTodos, newTodo);
  expect(result).toEqual(expected);
});

test("search should return the expected item from array", () => {
  const startTodos = [
    { name: "one", isFav: false },
    { name: "two", isFav: false },
    { name: "three", isFav: false },
  ];

  const expected = { name: "two", isFav: false };

  const result = search(2, startTodos);

  expect(result).toEqual(expected);
});

test("addToFav should toggle isFav prop of a todo", () => {
  const startTodo = { name: "one", isFav: false };
  const expected = { name: "one", isFav: true };

  const result = addToFav(startTodo);

  expect(result).toEqual(expected);
});

test("removeFriend should remove todo from todos by id", () => {
  const startTodos = [
    { id: 1, name: "one", isFav: false },
    { id: 2, name: "two", isFav: false },
    { id: 3, name: "three", isFav: false },
  ];

  const expected = [
    { id: 1, name: "one", isFav: false },
    { id: 3, name: "three", isFav: false },
  ];

  const result = removeFriend(startTodos, 2);

  expect(result).toEqual(expected);
});
