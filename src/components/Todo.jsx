import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const Todo = ({ task, deleteTodo, edittodo }) => {
  return (
    <div className="flex justify-between items-center bg-purple-300 text-gray-800 py-3 px-4 rounded-md mb-1 shadow-sm cursor-pointer">
      <p className="font-primary text-white">{task.task}</p>
      <div className="flex items-center gap-x-4">
        <AiFillEdit
          className="text-blue-600 text-xl hover:text-blue-800"
          onClick={() => edittodo(task.id)}
        />
        <BsTrash
          className="text-red-600 text-xl hover:text-red-800"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
