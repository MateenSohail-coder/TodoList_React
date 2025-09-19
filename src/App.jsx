import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let Todos = JSON.parse(localStorage.getItem("todos"));
      settodos(Todos);
    }
  }, []);
  const savetols = (params) => {
    localStorage.setItem("todos", JSON.stringify(params));
  };
  const handleAdd = () => {
    if (!todo.trim()) return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(newTodos);
    savetols(newTodos); // Pass the new array to the save function
    settodo("");
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetols(newtodos);
  };
  const handleDelete = (e, id) => {
    let newtodos;
    newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetols(newtodos);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    savetols(newtodos);
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="todoscontainer flex flex-col gap-3 mt-2.5 w-full px-2 md:w-[50%] mx-auto ">
        <div className="heading text-center text-2xl font-bold text-red-600 border-2 border-rose-600 bg-red-300 p-2 rounded-4xl">
          Todos
        </div>
        <div className="todoinput flex h-13 rounded-4xl border-2 border-rose-500 ">
          <input
            onChange={handleChange}
            placeholder="Write todos here...."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            value={todo}
            type="text"
            className="focus:border-0 focus:outline-0 h-full w-[70%] md:w-[80%] text-xl pl-3.5 pr-2.5 text-rose-600"
          />{" "}
          <button
            onClick={handleAdd}
            className="h-full hover:bg-rose-600 w-[30%] md:w-[20%] bg-rose-500 text-xl text-red-50 rounded-[22px] cursor-pointer"
          >
            Save
          </button>
        </div>
        <div className="tasks mb-28 flex flex-col gap-3.5 w-full">
          {todos.length === 0 && (
            <div className="text-center font-bold text-2xl text-rose-300">
              No Todos Here
            </div>
          )}
          {todos.map((items) => {
            return (
              <div
                key={items.id}
                className="task w-full min-h-14 rounded-4xl flex gap-2.5 items-center p-2.5 border-2 border-rose-600"
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  name={items.id}
                  onChange={handleCheckbox}
                  checked={items.isCompleted}
                />
                <div
                  className={
                    items.isCompleted
                      ? "content w-[70%] md:w-[85%] h-auto line-through text-xl text-rose-300 break-words whitespace-normal"
                      : "content w-[70%] md:w-[85%] h-auto text-rose-600 text-xl break-words whitespace-normal"
                  }
                >
                  {items.todo}
                </div>

                <div
                  onClick={(e) => {
                    handleEdit(e, items.id);
                  }}
                  className="edit cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 transition-all hover:fill-blue-900 fill-blue-600 injected-svg"
                    data-src="https://cdn.hugeicons.com/icons/pencil-edit-02-solid-rounded.svg?v=2.0"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.8846 3.08477C17.9976 1.97174 19.8022 1.97174 20.9152 3.08477C22.0283 4.1978 22.0283 6.00237 20.9152 7.1154L20.4556 7.57505L16.425 3.54442L16.8846 3.08477ZM15.3643 4.60508L19.3949 8.63571L13.2659 14.7647C12.6623 15.3684 11.9059 15.7966 11.0778 16.0036L8.18192 16.7276C7.92634 16.7915 7.65597 16.7166 7.46969 16.5303C7.2834 16.344 7.20851 16.0737 7.27241 15.8181L7.99638 12.9222C8.20342 12.0941 8.63164 11.3377 9.23526 10.7341L15.3643 4.60508ZM10.5138 4.25L10.4522 4.25C8.90646 4.24998 7.66026 4.24996 6.66959 4.36706C5.64431 4.48825 4.76696 4.74633 4.02722 5.3534C3.78107 5.55542 3.55536 5.78112 3.35335 6.02728C2.74627 6.76701 2.48819 7.64436 2.367 8.66963C2.2499 9.6603 2.24992 10.9065 2.24994 12.4522V12.4522V13.0709V13.0709C2.24991 14.8438 2.24989 16.2728 2.401 17.3967C2.55788 18.5635 2.8935 19.546 3.67375 20.3262C4.45402 21.1065 5.43644 21.4421 6.60324 21.599C7.72709 21.75 9.15603 21.75 10.9288 21.75H11.5477C13.0934 21.75 14.3396 21.75 15.3303 21.6329C16.3556 21.5117 17.2329 21.2537 17.9727 20.6466C18.2188 20.4446 18.4445 20.2189 18.6465 19.9727C19.2536 19.233 19.5117 18.3557 19.6329 17.3304C19.75 16.3397 19.75 15.0935 19.7499 13.5479V13.5478V13.4861C19.7499 12.9492 19.3147 12.5139 18.7777 12.5139C18.2408 12.5139 17.8055 12.9492 17.8055 13.4861C17.8055 15.108 17.8039 16.239 17.7019 17.1021C17.6024 17.9438 17.4191 18.4033 17.1434 18.7392C17.0222 18.8869 16.8868 19.0223 16.7391 19.1435C16.4032 19.4192 15.9438 19.6024 15.102 19.7019C14.2389 19.804 13.1079 19.8056 11.486 19.8056H10.9999C9.13922 19.8056 7.84149 19.8035 6.86234 19.6718C5.91115 19.544 5.40745 19.3101 5.04868 18.9513C4.68992 18.5925 4.456 18.0888 4.32811 17.1376C4.19646 16.1585 4.19439 14.8607 4.19439 13V12.5139C4.19439 10.892 4.19598 9.76104 4.29801 8.89788C4.3975 8.05618 4.58079 7.59669 4.85644 7.26081C4.97764 7.11312 5.11307 6.97769 5.26076 6.85649C5.59664 6.58084 6.05613 6.39756 6.89784 6.29806C7.761 6.19604 8.89194 6.19445 10.5138 6.19445C11.0508 6.19445 11.4861 5.75917 11.4861 5.22222C11.4861 4.68528 11.0508 4.25 10.5138 4.25Z"
                    ></path>
                  </svg>
                </div>
                <div
                  onClick={(e) => {
                    handleDelete(e, items.id);
                  }}
                  className="delete cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 transition-all hover:fill-red-600 fill-neutral-600 injected-svg"
                    data-src="https://cdn.hugeicons.com/icons/delete-02-solid-rounded.svg?v=2.0"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    role="img"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.5825 15.6564C19.5058 16.9096 19.4449 17.9041 19.3202 18.6984C19.1922 19.5131 18.9874 20.1915 18.5777 20.7849C18.2029 21.3278 17.7204 21.786 17.1608 22.1303C16.5491 22.5067 15.8661 22.6713 15.0531 22.75L8.92739 22.7499C8.1135 22.671 7.42972 22.5061 6.8176 22.129C6.25763 21.7841 5.77494 21.3251 5.40028 20.7813C4.99073 20.1869 4.78656 19.5075 4.65957 18.6917C4.53574 17.8962 4.47623 16.9003 4.40122 15.6453L3.75 4.75H20.25L19.5825 15.6564ZM9.5 17.9609C9.08579 17.9609 8.75 17.6252 8.75 17.2109L8.75 11.2109C8.75 10.7967 9.08579 10.4609 9.5 10.4609C9.91421 10.4609 10.25 10.7967 10.25 11.2109L10.25 17.2109C10.25 17.6252 9.91421 17.9609 9.5 17.9609ZM15.25 11.2109C15.25 10.7967 14.9142 10.4609 14.5 10.4609C14.0858 10.4609 13.75 10.7967 13.75 11.2109V17.2109C13.75 17.6252 14.0858 17.9609 14.5 17.9609C14.9142 17.9609 15.25 17.6252 15.25 17.2109V11.2109Z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.3473 1.28277C13.9124 1.33331 14.4435 1.50576 14.8996 1.84591C15.2369 2.09748 15.4712 2.40542 15.6714 2.73893C15.8569 3.04798 16.0437 3.4333 16.2555 3.8704L16.6823 4.7507H21C21.5523 4.7507 22 5.19842 22 5.7507C22 6.30299 21.5523 6.7507 21 6.7507C14.9998 6.7507 9.00019 6.7507 3 6.7507C2.44772 6.7507 2 6.30299 2 5.7507C2 5.19842 2.44772 4.7507 3 4.7507H7.40976L7.76556 3.97016C7.97212 3.51696 8.15403 3.11782 8.33676 2.79754C8.53387 2.45207 8.76721 2.13237 9.10861 1.87046C9.57032 1.51626 10.1121 1.33669 10.6899 1.28409C11.1249 1.24449 11.5634 1.24994 12 1.25064C12.5108 1.25146 12.97 1.24902 13.3473 1.28277ZM9.60776 4.7507H14.4597C14.233 4.28331 14.088 3.98707 13.9566 3.7682C13.7643 3.44787 13.5339 3.30745 13.1691 3.27482C12.9098 3.25163 12.5719 3.2507 12.0345 3.2507C11.4837 3.2507 11.137 3.25166 10.8712 3.27585C10.4971 3.30991 10.2639 3.45568 10.0739 3.78866C9.94941 4.00687 9.81387 4.29897 9.60776 4.7507Z"
                    ></path>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
