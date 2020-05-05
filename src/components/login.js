import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    // fetch("http://localhost:8000/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     user_name: data.Username,
    //     user_password: data.Password,
    //   }),
    // })
    //   .then((res) => res.text())
    //   .then((data) => {
    //     alert(data);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //     console.log(err);
    //   });
    // // console.log(data);

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        user_name: data.Username,
        user_email: data.Email,
        user_password: data.Password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            loign: true,
            token: data,
          })
        );
        console.log("data", data);
        const decodeToken = jwt.decode(data);
        console.log(decodeToken);
        if (decodeToken) {
          window.location.replace("/userinfo");
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err.res.data);
      });
  };

  return (
    <div className="flex  items-center justify-center h-screen ">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
            Login
          </h1>
          <div
            className={errors.lastName ? "field error" : "field"}
            className="mb-4"
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 1 })}
              name="Username"
              type="text"
            />
            {errors.Username && (
              <p className="text-red-500 text-xs italic">First Name required</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold  mb-2">
              Password
            </label>
            <input
              className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ref={register({ required: true, minLength: 8 })}
              name="Password"
              type="password"
            />
            {errors.Password && (
              <p className="text-red-500 text-xs italic">Password required</p>
            )}
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <p>or</p>
          <a className="text-blue-500">
            <Link to="/register">register now</Link>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
