import { useEffect, useState } from "react";
import { TodoBox } from "../TodoBox/TodoBox";
import iconSun from "./../../assets/img/icon-sun.svg";
import iconMoon from "./../../assets/img/icon-moon.svg";
import { ModeType, TodoInfo } from "../../types/type";
import { TodoFooter } from "../TodoFooter/TodoFooter";
import { useTheme } from "../../context/theme";

export const Todo = () => {
  const [list, setList] = useState<TodoInfo[] | null>(null);
  const [dragItem, setDragItem] = useState<TodoInfo | null>(null);
  const [mode, setMode] = useState<ModeType>("all");
  const { theme, toggleTheme } = useTheme();

  const handleMode = (e: ModeType) => {
    setMode(e);
  };

  const handleDeleteAll = () => {
    setList(null);
  };

  const handleDelete = (index: number) => {
    let newList = list?.filter((e, i) => i != index);
    if (newList) {
      if (newList.length > 0) {
        setList(newList);
      } else {
        setList(null);
      }
    }
  };

  const handleCount = () => {
    let newList = list && list.filter((e) => e.status === "active");
    return list === null ? 0 : newList?.length ?? 0;
  };

  const handleChangeStatus = (index: number) => {
    let newList =
      list &&
      list.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            status: e.status === "active" ? "completed" : "active",
          };
        } else {
          return e;
        }
      });
    if (newList) setList(newList as TodoInfo[]);
  };

  const handleCreateTodo = (text: string) => {
    if (text != null && text != "") {
      let newTodo: TodoInfo = { text, status: "active" };
      if (list) {
        setList([newTodo, ...list]);
      } else {
        setList([newTodo]);
      }
    }
  };

  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === "Enter" && inputElement.value !== "") {
      let newTodo: TodoInfo = { text: inputElement.value, status: "active" };
      if (list) {
        setList([newTodo, ...list]);
      } else {
        setList([newTodo]);
      }
    }
  };

  const handleDrag = (index: number) => {
    if (list != null && list.length > 1) {
      setDragItem(list[index]);
      const newList = list.filter((e, i) => i !== index);
      setList(newList);
    }
  };

  const handleDrop = (index: number) => {
    if (list && dragItem) {
      const newList = [...list];
      newList.splice(index + 1, 0, dragItem);
      setList(newList);
      setDragItem(null);
    }
  };

  const handleMouseUp = () => {
    setDragItem(null);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return window.addEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className=" w-10/12 mt-20 z-10">
      <div className="flex items-center justify-between">
        <h1
          className={`text-4xl uppercase font-bold text-color-nav-dark`}
        >
          todo
        </h1>
        <img
          onClick={toggleTheme}
          className="cursor-pointer"
          src={theme == "dark" ? iconSun : iconMoon}
        />
      </div>
      <div className="mt-10">
        <TodoBox
          onHandleKeyDownEnter={handleKeyDownEnter}
          onCreateTodo={handleCreateTodo}
          type="input"
        />
      </div>
      <div className="mt-10">
        {list ? (
          list.map((e, index) => {
            if (e.status === mode || mode === "all") {
              return (
                <TodoBox
                  onDrag={handleDrag}
                  onDrop={handleDrop}
                  onChangeStatus={handleChangeStatus}
                  onDelete={handleDelete}
                  key={index}
                  dragMode={dragItem}
                  index={index}
                  text={e.text}
                  status={e.status}
                  type="text"
                />
              );
            }
          })
        ) : (
          <div
            className={`w-full ${
              theme == "dark"
                ? "bg-todo-dark border-color-dark text-color-dark"
                : "bg-todo-light border-color-light text-color-light"
            } px-7 py-5 capitalize text-center text-xl font-bold border-b rounded-t-md`}
          >
            empty list
          </div>
        )}
        <TodoFooter
          mode={mode}
          onDeleteAll={handleDeleteAll}
          onChangeMode={handleMode}
          count={handleCount()}
        />
      </div>
    </div>
  );
};
