import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
    // fetch("http://localhost:8000/register", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-type": "application/json",
    //   },

    //   body: JSON.stringify({
    //     user_name: data.Username,
    //     user_gender: data.gender,
    //     user_email: data.Email,
    //     user_password: data.Password,
    //     phone_number: data.Phone,
    //   }),
    // })
    //   .then((res) => res.text())
    //   .then((data) => {
    //     alert(data);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //     console.log(err.res.data);
    //   });
    const newUser = {
      user_name: data.Username,
      user_gender: data.gender,
      user_email: data.Email,
      user_password: data.Password,
      phone_number: data.Phone,
    };
    axios
      .post("http://localhost:8000/register", newUser)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <div>
      <div className="flex  items-center justify-center h-screen ">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Register
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true })}
                name="Username"
                type="text"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">Username required</p>
              )}
            </div>
            <div
              className={errors.lastName ? "field error" : "field"}
              className="mb-4"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 5 })}
                name="Email"
                type="email"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs italic">Email required</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  className=" block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="gender"
                  ref={register({ required: true })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">Gender required</p>
              )}
            </div>
            <div
              className={errors.lastName ? "field error" : "field"}
              className="mb-4"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 5 })}
                name="Phone"
                type="number"
              />
              {errors.Phone && (
                <p className="text-red-500 text-xs italic">Phone required</p>
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
                Sign Up
              </button>
              <div className="flex">
                <p>Have an account?</p>
                <a className="text-blue-500 pl-2">
                  <Link to="/login">Login</Link>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
