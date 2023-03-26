import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editid, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editid) {
      const editTodo = todos.find((i) => i.id == editid);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    // f.preventDefault();

    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="App">
        <div className="Container">
          <h1>Todos List</h1>
          <form className="to-do-form" onSubmit={handleSubmit}>
            <input
              value={todo}
              type="text"
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">{editid ? "Edit" : "Go"}</button>
          </form>
          <ul className="allTodos">
            {todos.map((t) => (
              <li className="singleTodo">
                <span className="todoText" key={t.id}>
                  {t.todo}
                </span>
                <div>
                  <button onClick={() => handleEdit(t.id)}>Edit</button>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
