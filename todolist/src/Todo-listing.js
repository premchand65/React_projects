import React, { useReducer, useState } from "react";

const initialState = {
  todos: []
};
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [...state.todos, action.payload]
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
    default:
      return state;
  }
} 

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo
      };
      dispatch({ type: "ADD_TODO", payload: newTodoItem });
      setNewTodo("");
    }
  };
  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };
  const updateTodo = (id, newText) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } });
  };

  return (
   
    <div className="box">
      <h1>Todo List</h1>
      <input type="text" placeholder="Add a new todo"value={newTodo}onChange={(e) => setNewTodo(e.target.value)}/>
      <button onClick={addTodo}>Add</button>
      <ol>
        {state.todos.map((todo) => (
          <li key={todo.id}>{todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => {const newText = prompt("Edit todo:", todo.text);
                if (newText !== null) {
                  updateTodo(todo.id, newText);}}} >
              Edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoApp;