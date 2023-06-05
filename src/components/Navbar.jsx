import React from "react";
import todo from "../assets/todo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <>
      <div className=" flex items-center justify-between bg-[#101014]  h-16 max-w-screen mx-auto border-gray-600 border-b shadow shadow-gray-500 px-4">
        <h2 className="flex items-center w-full px-4">
          <img src={todo} alt="" className="w-[50px]" />
        </h2>

        <div className={`text-[#f0f0f5]`}>
          <ul className=" flex  items-center justify-evenly w-[200px] ">
            {!token && (
              <li>
                <Link
                  to="/"
                  className="capitalize bg-sky-500 px-5 py-3 rounded-md"
                >
                  login
                </Link>
              </li>
            )}
            {token && (
              <li>
                <Link
                  to="/"
                  onClick={() => localStorage.removeItem("token")}
                  className="capitalize bg-sky-500 px-5 py-3 rounded-md"
                >
                  logout
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/signup"
                className=" capitalize bg-sky-500 px-5 py-3 rounded-md"
              >
                sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
