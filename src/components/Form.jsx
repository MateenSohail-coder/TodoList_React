import React, { useState } from "react";

const Form = ({ createTodo }) => {
  const [value, setvalue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(value);
    setvalue("");
  };
  return (
    <form className="mb-4 font-primary w-full" onSubmit={handleSubmit}>
      <h1 className="m-6 text-pink-500 font-semibold   text-4xl">TODO LIST</h1>
      <input
        type="text"
        className="outline-none bg-pink-100 border border-gray-300 p-4 w-[300px] text-gray-800 placeholder-gray-500 rounded-md shadow-sm"
        placeholder="What task do you have today?"
        onChange={(e) => setvalue(e.target.value)}
        value={value}
        required
      />
      <button className="cursor-pointer rounded ml-2 bg-pink-200 hover:bg-blue-700 border-none p-2 text-white shadow-md">
        Add Task
      </button>
    </form>
  );
};

export default Form;
