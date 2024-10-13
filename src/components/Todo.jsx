import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

const Todo = ({ user }) => {
  const [text, setText] = useState("");
  const [myTodos, setMyTodos] = useState([]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "todos", user.uid);

      // Listen to real-time updates on the todos document
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setMyTodos(docSnap.data().todos);
        } else {
          setMyTodos([]); // No todos found, reset the state
        }
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    }
  }, [user]);

  const addTodo = async () => {
    if (!text || !user) return;

    const updatedTodos = [...myTodos, text];
    const docRef = doc(db, "todos", user.uid);

    try {
      await setDoc(docRef, { todos: updatedTodos });
      setText("");
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  const deleteTodo = async (index) => {
    const updatedTodos = myTodos.filter((_, idx) => idx !== index);
    const docRef = doc(db, "todos", user.uid);

    try {
      await setDoc(docRef, { todos: updatedTodos });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h1>Add Todos</h1>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter Something"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="center-align">
        <button onClick={addTodo} className="btn blue">
          Add
        </button>
      </div>
      <ul className="collection">
        {myTodos.map((todo, index) => (
          <li
            className="collection-item"
            key={index}
            style={{ backgroundColor: "green" }}
          >
            {todo}
            <i
              onClick={() => deleteTodo(index)}
              className="material-icons right"
              style={{ cursor: "pointer" }}
            >
              delete
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
