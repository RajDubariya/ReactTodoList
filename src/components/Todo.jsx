import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import FeatherIcon from "feather-icons-react";

const BASE_URL = "http://localhost:8000/todo";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    try {
      if (todo === "") {
        alert("please enter something in todo");
      } else {
        const response = await axios.post(
          `${BASE_URL}/createtodo`,
          { todo: todo },
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const createdTodo = response.data;

        setTodos((prevTodos) => [...prevTodos, createdTodo]);
        setTodo("");

        // console.log(todo);
        fetchTodo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`, {
        headers: {
          "auth-token": token,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          "auth-token": token,
        },
      });
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, updatedTodo) => {
    try {
      await axios.put(
        `${BASE_URL}/${id}`,
        { todo: updatedTodo },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-screen mt-5">
        <div className=" w-screen  flex items-center justify-center">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className=" w-1/2 rounded-md bg-[#252525] text-[#f0f0f5] text-lg capitalize py-2 px-3 outline outline-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
            placeholder="Enter Your Todo"
          />
          <button
            onClick={handleAdd}
            className="capitalize bg-sky-500 px-5 py-2  mx-4 text-lg text-[#f0f0f5] rounded-md flex items-center"
          >
            Add
          </button>
        </div>

        <div className="text-white w-screen flex items-center justify-center mt-6">
          <ul className=" w-[90%] flex flex-col justify-center items-center">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between p-3  bg-[#252525] w-1/2 capitalize my-2 text-lg rounded-lg outline outline-gray-500/40"
              >
                {todo.editing ? (
                  <>
                    <input
                      type="text"
                      className=" w-1/2 rounded-md bg-[#252525] text-[#f0f0f5] text-lg capitalize py-1 px-3 outline outline-gray-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-gray-400"
                      value={todo.updatedTodo}
                      onChange={(e) => {
                        const updatedTodos = [...todos];
                        updatedTodos.find(
                          (t) => t._id === todo._id
                        ).updatedTodo = e.target.value;
                        setTodos(updatedTodos);
                      }}
                    />
                    <div className="flex items-center">
                      <FeatherIcon
                        icon="check"
                        size={25}
                        onClick={() => handleUpdate(todo._id, todo.updatedTodo)}
                        className="text-green-500 cursor-pointer mx-2"
                      />
                      <FeatherIcon
                        icon="x"
                        size={25}
                        onClick={() => {
                          const updatedTodos = [...todos];
                          updatedTodos.find(
                            (t) => t._id === todo._id
                          ).editing = false;
                          setTodos(updatedTodos);
                        }}
                        className="text-red-500 cursor-pointer mx-2"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p>{todo.todo}</p>
                    <div className="flex items-center">
                      <FeatherIcon
                        icon="edit-3"
                        size={25}
                        onClick={() => {
                          const updatedTodos = [...todos];
                          updatedTodos.find(
                            (t) => t._id === todo._id
                          ).editing = true;
                          setTodos(updatedTodos);
                        }}
                        className="text-sky-500 cursor-pointer mx-2"
                      />
                      <FeatherIcon
                        icon="trash-2"
                        size={25}
                        onClick={() => handleDelete(todo._id)}
                        className="text-red-500 cursor-pointer mx-2"
                      />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
