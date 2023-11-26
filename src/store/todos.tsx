"use client";

import {
  Context,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export enum TodoStatus {
  active = "active",
  completed = "completed",
  bin = "bin",
}

export interface TodoObj {
  id: string;
  task: string;
  status: TodoStatus;
  createdAt: Date;
}

export interface TodosContext {
  todos: TodoObj[];
  handleAddTodo: (task: string) => void;
  handleMoveToBin: (obj: TodoObj) => void;
  handleCompleted: (obj: TodoObj) => void;
  handleTrash: () => void;
}

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider: ({children}: { children: ReactNode }) => void = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [todos, setTodos] = useState<TodoObj[]>(() => {
    const prevData = localStorage?.getItem("todos") || "[]";
    return JSON.parse(prevData);
  });

  const handleAddTodo: (task: string) => void = (task: string): void => {
    setTodos((prev) => {
      const newTodo: TodoObj[] = [
        {
          id: Math.random().toString(36).substr(2, 9),
          task: task,
          status: TodoStatus.active,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage?.setItem("todos", JSON.stringify(newTodo))
      return newTodo;
    });
      console.log("succesfully added");
  };

  const handleCompleted: (obj: TodoObj) => void = (obj: TodoObj): void => {
    setTodos((prev) => {
      const updatedTodo: TodoObj[] = [
        {
          id: obj?.id,
          task: obj?.task,
          status: TodoStatus.completed,
          createdAt: obj?.createdAt,
        },
        ...prev?.filter((item) => {
          return item?.id !== obj?.id;
        }),
      ];
      localStorage?.setItem("todos", JSON.stringify(updatedTodo))
      return updatedTodo;
    });
    console.log("succesfully completed");
  };

  const handleMoveToBin: (obj: TodoObj) => void = (obj: TodoObj): void => {
    setTodos((prev) => {
      const updatedTodo: TodoObj[] = [
        {
          id: obj?.id,
          task: obj?.task,
          status: TodoStatus.bin,
          createdAt: obj?.createdAt,
        },
        ...prev?.filter((item) => {
          return item?.id !== obj?.id;
        }),
      ];
      localStorage?.setItem("todos", JSON.stringify(updatedTodo))
      return updatedTodo;
    });
    console.log("succesfully moved to bin");
  };

  const handleTrash: () => void = (): void => {
    setTodos((prev) => {
      const updatedTodo: TodoObj[] = [
        ...prev?.filter((item) => {
          return item?.status !== "bin";
        }),
      ];
      localStorage?.setItem("todos", JSON.stringify(updatedTodo))
      return updatedTodo;
    });
    console.log("succesfully cleared trash");
  };
  
  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddTodo,
        handleMoveToBin,
        handleCompleted,
        handleTrash,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

export function useTodosContext() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("Use Todos used outside of provider");
  }
  return todosContextValue;
}
