"use client";

import { TodoObj, useTodosContext } from "@/store/todos";
import { useState } from "react";
import "./todoList.scss";

const TodosList = () => {
  const { todos, handleMoveToBin, handleCompleted, handleTrash } =
    useTodosContext();
  const [filter, setFilter] = useState("active");
  const [checked, setChecked] = useState<TodoObj[]>([]);

  let todosList = todos?.filter((item) => {
    if (filter !== "") {
      return item?.status === filter;
    } else {
      return item;
    }
  });

  const handleCheckedArray = (add: boolean, item: TodoObj) => {
    add
      ? setChecked((prev: TodoObj[]) => {
          const checkedIdArray = [...prev, item];
          return checkedIdArray;
        })
      : setChecked((prev: TodoObj[]) => {
          const checkedIdArray = [
            ...prev?.filter((x) => {
              return x?.id !== item?.id;
            }),
          ];
          return checkedIdArray;
        });
  };

  const handleOnComplete = (item: TodoObj) => {
    handleCompleted(item);
    setChecked((prev: TodoObj[]) => {
      const checkedIdArray = [
        ...prev?.filter((x) => {
          return x?.id !== item?.id;
        }),
      ];
      return checkedIdArray;
    });
  };

  const handleAllOnComplete = () => {
    for (let index = 0; index < checked?.length; index++) {
      const element = checked[index];
      handleCompleted(element);
    }
    setChecked([]);
  };

  const handleBin = (item: TodoObj) => {
    handleMoveToBin(item);
    setChecked((prev: TodoObj[]) => {
      const checkedIdArray = [
        ...prev?.filter((x) => {
          return x?.id !== item?.id;
        }),
      ];
      return checkedIdArray;
    });
  };

  const moveAllToBin = () => {
    for (let index = 0; index < checked?.length; index++) {
      const element = checked[index];
      handleMoveToBin(element);
    }
    setChecked([]);
  };

  const handleAllTrash = () => {
    console.log("called");
    handleTrash();
  };

  return (
    <div className="todoListContainer">
      {/* <ul className="todoListFilterButtons">
        <li onClick={() => setFilter("")} className="learn-more">All</li>
        <li onClick={() => setFilter("active")}>Active</li>
        <li onClick={() => setFilter("completed")}>Completed</li>
        <li onClick={() => setFilter("bin")}>Bin</li>
      </ul> */}
      <div className="container">
        <div className="line"></div>
        <label htmlFor="all" className="label" onClick={() => setFilter("")}>
          <input
            checked={filter === ""}
            name="future-is-here"
            type="radio"
            id="all"
          />
          <div className="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">ALL</span>
          </div>
        </label>
        <label
          htmlFor="active"
          className="label"
          onClick={() => setFilter("active")}
        >
          <input
            checked={filter === "active"}
            name="future-is-here"
            type="radio"
            id="active"
          />
          <div className="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">ACTIVE</span>
          </div>
        </label>
        <label
          htmlFor="completed"
          className="label"
          onClick={() => setFilter("completed")}
        >
          <input
            checked={filter === "completed"}
            name="future-is-here"
            type="radio"
            id="completed"
          />
          <div className="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">COMPLETED</span>
          </div>
        </label>
        <label htmlFor="bin" className="label" onClick={() => setFilter("bin")}>
          <input
            checked={filter === "bin"}
            name="future-is-here"
            type="radio"
            id="bin"
          />
          <div className="button" id="trash">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">BIN</span>
          </div>
        </label>
      </div>
      <ul className="todoListContent">
        {todosList?.map((item, index) => {
          return (
            <li key={item?.id}>
              {/* <div className="list-tittle-and-checkbox">
                {item?.status !== "bin" && (
                  <input
                    type="checkbox"
                    name=""
                    id={`todo-${item?.id}`}
                    value={item?.status}
                    checked={item?.status === "completed" ? true : undefined}
                    onChange={(e) => {
                      handleCheckedArray(e?.target?.checked, item);
                    }}
                  />
                )}
                <label htmlFor={`todo-${item?.id}`}>{item?.task}</label>
              </div> */}
              <label className="container">
                {item?.status !== "bin" && (
                  <>
                    <input
                      type="checkbox"
                      id={`todo-${item?.id}`}
                      value={item?.status}
                      checked={item?.status === "completed" ? true : undefined}
                      onChange={(e) => {
                        handleCheckedArray(e?.target?.checked, item);
                      }}
                    />
                    <svg viewBox="0 0 64 64" height="2em" width="2em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </>
                )}
                <h2
                  style={
                    item?.status === "completed"
                      ? { color: "green" }
                      : item?.status === "bin"
                      ? { color: "red" }
                      : {}
                  }
                >
                  {item?.task}
                </h2>
              </label>
              <div className="containerli">
                <div className="lineli"></div>
                {checked?.includes(item) && item?.status !== "completed" && (
                  <label
                    htmlFor={`${item?.id}-completed`}
                    className="labelli"
                    onClick={() => handleOnComplete(item)}
                  >
                    <input
                      name={item?.id}
                      type="radio"
                      id={`${item?.id}-completed`}
                    />
                    <div className="buttonli" id="">
                      <span className="shadowli"></span>
                      <span className="edgeli"></span>
                      <span className="frontli textli">✔️</span>
                    </div>
                  </label>
                )}
                {checked?.includes(item) && item?.status !== "bin" && (
                  <label
                    htmlFor={`${item?.id}-trash`}
                    className="labelli"
                    onClick={() => handleBin(item)}
                  >
                    <input
                      name={item?.id}
                      type="radio"
                      id={`${item?.id}-trash`}
                    />
                    <div className="buttonli" id="trash">
                      <span className="shadowli"></span>
                      <span className="edgeli"></span>
                      <span className="frontli textli">🗑️</span>
                    </div>
                  </label>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="all-action-button">
        {checked?.length > 1 && (
          <button
            className="btn-96 completed"
            onClick={() => handleAllOnComplete()}
          >
            <span>All Completed</span>
          </button>
        )}
        {checked?.length > 1 && (
          <button className="btn-96 matb" onClick={() => moveAllToBin()}>
            <span>Move All To Bin</span>
          </button>
        )}
        {filter === "bin" && (
          <button className="btn-96" onClick={() => handleAllTrash()}>
            <span>Clear Trash</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TodosList;
