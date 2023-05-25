import React, { useState } from "react";
import { useEffect } from "react";

import { getAuth } from "firebase/auth";
import { db } from "../../backend/firebase";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [showContentInput, setShowContentInput] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const backgroundImg = [
    "./pictures/background/gm_image_not_supported_gm_grey_24dp.png",
    "./pictures/background/celebration_light_thumb_0715.svg",
    "./pictures/background/grocery_light_thumb_0615.svg",
    "./pictures/background/food_light_thumb_0615.svg",
    "./pictures/background/places_light_thumb_0615.svg",
  ];

  const asd = getAuth();
  const user = asd.currentUser;

  useEffect(() => {
    // Function to fetch todos from Firestore for the current user
    const fetchTodos = async () => {
      // Query todos collection where the user is equal to the current user's ID
      const q = query(collection(db, "todos"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const todoList = querySnapshot.docs.map((doc) => doc.data());
      setTodos(todoList);
    };

    fetchTodos();
  }, [user]);

  const addTodo = async () => {
    // Create a new todo object
    const newTodo = {
      id: Date.now(),
      title: titleValue,
      content: contentValue,
      completed: false,
      backgroundURL: "",
      user: user, // Associate the todo with the current user
    };

    try {
      // Add the todo to the Firestore collection
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      newTodo.id = docRef.id; // Update the todo ID with the Firestore generated ID

      // Update the todos state with the new todo
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      // Clear the input values
      setTitleValue("");
      setContentValue("");
      // Other state updates...
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleContentInput = () => {
    setShowContentInput(!showContentInput);
    setShowNoteInput(!showNoteInput);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const changeTodoBackground = (id, backgroundURL) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          backgroundURL: backgroundURL,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  /* useEffect(() => {
    const addItemToTodos = async () => {
      try {
        const docId = await addItem(todos);
        console.log("Item added with ID:", docId);
      } catch (error) {
        console.error(error);
      }
    };

    addItemToTodos();
  }, [todos]);*/

  return (
    <div className="mt-[110px] bg-gray-100 h-screen">
      <h1>Todo List</h1>
      <div className="shadow-2xl w-[50%] bg-white rounded-lg m-4 flex flex-col p-2">
        {showNoteInput && (
          <input
            type="text"
            className="border mb-2"
            placeholder="Enter Your Note..."
            onClick={toggleContentInput}
          />
        )}
        {showContentInput && (
          <div className="flex flex-col">
            <input
              type="text"
              className="border mb-2"
              placeholder="Enter title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <textarea
              className="border mb-2"
              placeholder="Enter content"
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            />
          </div>
        )}
        <div>
          <button onClick={addTodo} className="bg-red-300 p-2 rounded-lg">
            Add Todo
          </button>
          <button className="bg-red-300 p-2 rounded-lg">Add Image</button>
        </div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-4">
        {todos.map((todo) => (
          <div
            style={{
              backgroundImage: `url(${todo.backgroundURL})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="rounded-lg p-2 my-4 bg-yellow-300"
            key={todo.id}
          >
            <input
              className="-translate-x-4 -translate-y-4 rounded text-yellow-500 focus:ring-0"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.title}
            </span>
            <div>
              <div className="h-28 p-2">{todo.content}</div>
              <div className="flex justify-evenly">
                <button
                  onClick={() => setShowImage(!showImage)}
                  className="bg-red-200"
                >
                  Background
                </button>
                {showImage && (
                  <div className="absolute translate-y-8 flex flex-wrap shadow-lg border-2">
                    {/* Assuming you have a list of background images */}
                    {backgroundImg.map((img, index) => (
                      <img
                        src={img}
                        alt={"background"}
                        key={index}
                        onClick={() => changeTodoBackground(todo.id, img)}
                        className="m-2 object-cover rounded-full h-12 w-12 shadow-lg border-2"
                      />
                    ))}
                  </div>
                )}
                <button
                  className="bg-red-200"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
