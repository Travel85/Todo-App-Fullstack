import { useContext } from "react";
import { TodoContext } from "../context/TodoContextHandler";

const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("no Context defined, use useTodos within provider");
  }
  return context;
};

export default useTodos;
