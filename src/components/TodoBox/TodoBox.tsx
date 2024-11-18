import { TodoBoxPropsType } from "../../types/type";
import iconClose from "./../../assets/img/icon-cross.svg";
import iconCheck from "./../../assets/img/icon-check.svg";
import "./style.scss";
import "./../../sass/global.scss";
import { useRef, useState } from "react";
import { useTheme } from "../../context/theme";

export const TodoBox = ({
  type,
  text,
  status,
  index,
  onDelete,
  onHandleKeyDownEnter,
  onChangeStatus,
  onCreateTodo,
  onDrag,
}: TodoBoxPropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { theme, toggleTheme } = useTheme();

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

  return (
    <div
      onMouseDown={() => {
        if (index != null) {
          onDrag(index);
        }
      }}
      className={`
        ursor-grab  flex items-center w-full min-h-full ${
          index != null
            ? index == 0
              ? "rounded-t border-b"
              : " border-b"
            : "rounded"
        } ${
        theme == "dark"
          ? "bg-todo-dark border-color-dark"
          : "bg-todo-light border-color-light"
      } px-7 py-5`}
    >
      <div className="flex justify-between items-center w-full h-full">
        <div
          onClick={() => mainClick()}
          className={`flex relative items-center justify-center  mr-3 rounded-full cursor-pointer ${
            theme == "dark" ? "borderBg-color-dark" : "borderBg-color-light"
          } ${status === "completed" && "gradient-bg"} check-box`}
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
              if(inputRef.current && event.key === "Enter"){
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
            } ${theme == "dark" ? "text-color-dark" : "text-color-light"}`}
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
          className="cursor-pointer ml-6"
          src={iconClose}
        />
      )}
    </div>
  );
};
