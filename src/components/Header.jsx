import React, { useState } from "react";
import { useTodos } from "../useTodos";

function Header() {
  const { addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = newTodo.trim();
    if (trimmedText) {
      addTodo(trimmedText);
      setNewTodo("");
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
}

export default Header;
