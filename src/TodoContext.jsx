import React, { createContext, useState, useEffect, useCallback } from "react";

export const TodoContext = createContext();

const initialData = [
  { done: true, text: "Experience JavaScript" },
  { done: true, text: "Code responsibly" },
  { done: false, text: "Promote Patika" },
  { done: false, text: "Listen to talks" },
  { done: true, text: "Watch tutorials" },
  { done: false, text: "Have a life!" },
];

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos || initialData;
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text) => {
    setTodos((prevTodos) => [...prevTodos, { text, done: false }]);
  }, []);

  const updateTodo = useCallback((index, newText) => {
    setTodos((prevTodos) => prevTodos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo)));
  }, []);

  const deleteTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_todo, todoIndex) => todoIndex !== index));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  }, []);

  const toggleTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.map((todo, i) => (i === index ? { ...todo, done: !todo.done } : todo)));
  }, []);

  const toggleAll = useCallback(() => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, done: !prevTodos.every((t) => t.done) })));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        itemsLeft,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
        setFilter,
      }}>
      {children}
    </TodoContext.Provider>
  );
}
