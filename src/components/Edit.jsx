import React, { useState } from "react";

const Edit = ({ edittodo, task }) => {
  const [value, setvalue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    edittodo(value, task.id);
    setvalue("");
  };
  return (
    <form className="mb-4 font-primary w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="outline-none bg-transparent border border-gray-50 p-4 w-[300px]"
        placeholder="Update Task"
        onChange={(e) => setvalue(e.target.value)}
        value={value}
      />
      <button className="cursor-pointer rounded ml-2 bg-pink-200 border-none p-2 text-white">
        Update Task
      </button>
    </form>
  );
};

export default Edit;
