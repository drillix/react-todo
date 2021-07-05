import { useState } from "react";
import { useRef } from "react";
import "./App.css";

function App() {
  //todo data set
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn ReactJs", done: false },
    { id: 2, text: "graidup work", done: true },
    { id: 3, text: "workbench purchase", done: false },
    { id: 4, text: "Get new shoes for work", done: false },
    { id: 5, text: "upgrade closet", done: false },
    { id: 6, text: "Learn more", done: false },
  ]);

  return (
    //todo app render
    <div className="App">
      <h3>Todo List</h3>
      <Todolist todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function Todolist({ todos,setTodos }) {

  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }


  return (
    //fetch todo list from todo object dataset
    <ul>
      {todos.map(todo => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{ textDecoration: todo.done ? "line-through" : "" }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }


  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
     
    >
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = useRef();

  function handleAddTodo(e) {
    e.preventDefault();
    const text = e.target.elements.addTodo.value;

    if(text === ''){
      alert('enter something!')
      
    }else{

    const todo = {
      id: Math.random(),
      text,
      done: false,
    };
    setTodos((prevTodos) => {
     
          //add todo from input
      return prevTodos.concat(todo);
      
    
    });
    inputRef.current.value = "";}
  }

  return (
    //todo input form
    <form onSubmit={handleAddTodo} >
      <input type="text" name="addTodo" placeholder="Add Todo" ref={inputRef} />
      <button type="submit"> Submit</button>
    </form>
  );
}

export default App;
