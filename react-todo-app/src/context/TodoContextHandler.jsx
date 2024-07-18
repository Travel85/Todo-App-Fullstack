import { createContext, useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Interval } from "luxon";
import { toast } from "react-toastify";
import todoService from "../services/todoService";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  // const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  //const [todos, setTodos] = useState(storedTodos);

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    todoService.getTodosBackend(setTodos);
  }, []);

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    const handleAddTodo = async (event) => {
      const newTodo = event.detail;
      try {
        // console.log(newTodo);
        await todoService.addTodoBackend(newTodo);
        await todoService.getTodosBackend(setTodos);
      } catch (error) {
        console.log(`Failed to add: ${error}`);
      }
    };
    window.addEventListener("addTodo", handleAddTodo);
    return () => {
      window.removeEventListener("addTodo", handleAddTodo);
    };
  }, []);

  //TODO: DELETE
  useEffect(() => {
    const handleDelete = async (event) => {
      const deleteTodo = event.detail;
      //  console.log(`Event received with data: ${deleteTodo}`);
      try {
        await todoService.deleteTodoBackend(deleteTodo);
        await todoService.getTodosBackend(setTodos);
      } catch (error) {
        console.log(`Failed to delete: ${error}`);
      }
    };
    window.addEventListener("deleteTodo", handleDelete);
    return () => {
      window.removeEventListener("deleteTodo", handleDelete);
    };
  }, []);

  //TODO: TOGGLE
  useEffect(() => {
    const handleToggle = async (event) => {
      const toggleTodo = event.detail;
      //console.log(`event with id ${event.detail} reiceived`);
      try {
        await todoService.toggleTodoDoneBackend(toggleTodo);
        await todoService.getTodosBackend(setTodos);
      } catch (error) {
        console.log(`Failed to delete: ${error}`);
      }
    };
    window.addEventListener("toggleTodo", handleToggle);
    return () => {
      window.removeEventListener("toggleTodo", handleToggle);
    };
  }, []);

  // UpdateTitle

  useEffect(() => {
    const handleUpdateTitle = async (event) => {
      const updateTitle = event.detail;
      // console.log(updateTitle);
      try {
        await todoService.updateTitleBackend(updateTitle);
        await todoService.getTodosBackend(setTodos);
      } catch (error) {
        console.log(`Failed to delete: ${error}`);
      }
    };
    window.addEventListener("updateTitle", handleUpdateTitle);
    return () => {
      window.removeEventListener("updateTitle", handleUpdateTitle);
    };
  }, []);

  const checkDueDate = () => {
    //current date:
    const now = DateTime.now();

    todos.map((todo) => {
      const inputDate = DateTime.fromISO(todo.date);
      const dueDate = Interval.fromDateTimes(now, inputDate);
      const parsedDueDate = Math.ceil(dueDate.length("days"));
      if (parsedDueDate <= 3 && !todo.done) {
        // console.log(`${todo.title} is due within ${parsedDueDate} day(s)`);
        toast.warn(`${todo.title} is due within ${parsedDueDate} day(s)`);
      }
    });
  };

  useEffect(() => {
    checkDueDate();
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        filteredTodos,
        setFilteredTodos,
        checkDueDate,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
