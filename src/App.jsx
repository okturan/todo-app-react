import React from "react";
import { useTodos } from "./useTodos";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

function App() {
  const { todos, addTodo, toggleAll, itemsLeft, filter, setFilter, clearCompleted } = useTodos();

  return (
    <section className="todoapp">
      <Header addTodo={addTodo} />

      {/* Todo items */}
      {todos.length > 0 && (
        <section className="main">
          <input
            id="toggle-all"
            type="checkbox"
            className="toggle-all"
            checked={itemsLeft === 0}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
      )}

      {/* Todo left & filter & clear */}
      {todos.length > 0 && (
        <Footer
          itemsLeft={itemsLeft}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          hasCompleted={todos.some((todo) => todo.done)}
        />
      )}
    </section>
  );
}

export default App;
