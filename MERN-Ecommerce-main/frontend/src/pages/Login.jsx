import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const navigate = useNavigate();

  const BASE_URL = "https://trendify-fvdq.onrender.com/api/users";

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const endpoint =
      currentState === "Login" ? `${BASE_URL}/login` : `${BASE_URL}/register`;

    const payload =
      currentState === "Login"
        ? { email, password }
        : { name, email, password };

    try {
      const { data } = await axios.post(endpoint, payload);
      alert(`${currentState} successful`);
      console.log("Response:", data);

      if (data.userId) {
        localStorage.setItem("userId", data.userId); // ✅ Store user ID
      }

      navigate(currentState === "Login" ? "/" : "/login");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in.");

    try {
      const res = await axios.put(`${BASE_URL}/update/${userId}`, {
        name: updateName,
        email: updateEmail,
      });
      alert("User updated successfully");
      console.log(res.data);
    } catch (err) {
      alert("Error updating user");
    }
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in.");

    try {
      await axios.delete(`${BASE_URL}/delete/${userId}`);
      alert("Account deleted successfully");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (err) {
      alert("Error deleting account");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
            Create a new account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
            Login here
          </p>
        )}
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>

      {/* Update/Delete buttons */}
      {currentState === "Login" && (
        <>
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            placeholder="New Name"
            className="w-full px-3 py-2 mt-4 border border-gray-600"
          />
          <input
            type="email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            placeholder="New Email"
            className="w-full px-3 py-2 border border-gray-600"
          />
          <button
            type="button"
            onClick={handleUpdate}
            className="px-8 py-2 mt-2 bg-blue-600 text-white"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-8 py-2 mt-2 bg-red-600 text-white"
          >
            Delete Account
          </button>
        </>
      )}
    </form>
  );
};

export default Login;
