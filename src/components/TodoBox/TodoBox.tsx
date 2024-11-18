import { TodoBoxPropsType } from "../../types/type";
import iconClose from "./../../assets/img/icon-cross.svg";
import iconCheck from "./../../assets/img/icon-check.svg";
import plusDark from "../../assets/img/plus-solidDarkMode.svg";
import "./style.scss";
import "./../../sass/global.scss";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/theme";
export const TodoBox = ({
  type,
  text,
  status,
  index,
  dragMode,
  onDelete,
  onHandleKeyDownEnter,
  onChangeStatus,
  onCreateTodo,
  onDrag,
  onDrop,
}: TodoBoxPropsType) => {
  const [newTodoForDrag, setNewTodoForDrag] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const mainClick = () => {
    if (type === "input") {
      if (inputRef.current && inputRef.current.value != null && onCreateTodo) {
        onCreateTodo(inputRef.current.value);
        inputRef.current.value = "";
      }
    } else {
      if (onChangeStatus && index != null) onChangeStatus(index);
    }
  };

  const handleMouseDown = () => {
    if (index != null) {
      timeoutRef.current = setTimeout(() => {
        onDrag && onDrag(index);
      }, 500);
    }
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    (index != null || index != undefined) && onDrop && onDrop(index);
    setNewTodoForDrag(false);
  };

  const handleMouseMove = () => {
    setNewTodoForDrag(true);
  };

  const handleMouseLeave = () => {
    setNewTodoForDrag(false);
  };

  return (
    <div
      onMouseMove={() => {
        dragMode && type === "text" && handleMouseMove();
      }}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`
        ${type != "input" && "cursor-grab"}  items-center w-full min-h-full ${
        index != null
          ? index == 0
            ? "rounded-t border-b"
            : " border-b"
          : "rounded"
      } ${
        theme == "dark"
          ? "bg-todo-dark border-color-dark"
          : "bg-todo-light border-color-light"
      } ${newTodoForDrag ? "pt-5" : "px-7 py-5"}`}
    >
      <div className="flex items-center w-full h-full">
        <div className="flex justify-between items-center w-full h-full">
          <div
            onClick={() => mainClick()}
            className={`flex relative items-center justify-center  mr-3 rounded-full cursor-pointer ${
              theme == "dark" ? "borderBg-color-dark" : "borderBg-color-light"
            } ${status === "completed" && "gradient-bg"} ${
              dragMode && newTodoForDrag && "ml-7"
            } check-box`}
          >
            <img className="w-6/12 h-6/12" src={iconCheck} />
            {(status === "active" || type === "input") && (
              <div
                className={`absolute inset-0 m-auto w-6 rounded-full h-6 ${
                  theme == "dark" ? "bg-todo-dark" : "bg-todo-light"
                }`}
                z-1
              ></div>
            )}
          </div>
          {type === "input" ? (
            <input
              ref={inputRef}
              onKeyDown={(event) => {
                onHandleKeyDownEnter && onHandleKeyDownEnter(event);
                if (inputRef.current && event.key === "Enter") {
                  inputRef.current.value = "";
                }
              }}
              className={`w-11/12 outline-0 focus:outline-none text-xl font-medium ${
                theme == "dark"
                  ? "bg-todo-dark text-color-dark"
                  : "bg-todo-light text-color-light"
              }`}
              type="text"
              placeholder="Create a new todo..."
            />
          ) : (
            <div
              className={`text-xl w-11/12 overflow-text font-medium text-color-dark ${
                status === "completed" && "line-through "
              } ${theme == "dark" ? "text-color-dark" : "text-color-light"}
              ${dragMode ? "select-none" : "select-text"}`}
            >
              {text}
            </div>
          )}
        </div>
        {type === "text" && index != null && (
          <img
            onClick={() => {
              onDelete && onDelete(index);
            }}
            className={`cursor-pointer ml-6 ${
              dragMode && newTodoForDrag && "mr-7"
            }`}
            src={iconClose}
          />
        )}
      </div>
      {dragMode && newTodoForDrag && (
        <div className="border-t select-none mt-4 dropBox">
          <TodoBox type="text" text={dragMode.text} status={dragMode.status} />
        </div>
        // <div className="flex justify-center items-center select-none w-full h-14 text-center border-t pt-4  py-3 my-4">
        //   <img className="h-8 w-8 p-1 border-2 border-dash" src={plusDark} />
        // </div>
      )}
    </div>
  );
};
