import React, { useState } from "react";
import Form from "./Form";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import Edit from "./Edit";
uuidv4();
const Todolist = () => {
  const [todovalue, settodovalue] = useState([]);
  const createTodo = (todo) => {
    settodovalue([
      ...todovalue,
      { id: uuidv4(), task: todo, isEditing: false },
    ]);
  };
  const deleteTodo = (id) => {
    settodovalue(todovalue.filter((todo) => todo.id !== id));
  };
  const edittodo = (id) => {
    settodovalue(
      todovalue.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTask = (task, id) => {
    settodovalue(
      todovalue.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="container bg-purple-500 mt-20 p-8 rounded-md">
      <Form createTodo={createTodo} />
      {todovalue.map((todo, idx) =>
        todo.isEditing ? (
          <Edit key={idx} edittodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={idx}
            deleteTodo={deleteTodo}
            edittodo={edittodo}
          />
        )
      )}
    </div>
  );
};

export default Todolist;
