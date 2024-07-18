import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { DateTime, Interval } from "luxon";
import useTodos from "../customHools/useTodos";

export function Input() {
  const { todos, setTodos, filter, setFilter } = useTodos();

  const todoNameRef = useRef();
  const categoryRef = useRef();
  const dueDateRef = useRef();

  /*   function parseDate() {
    //current date:
    const now = DateTime.now();

    const inputDate = DateTime.fromISO(dueDateRef.current.value);

    // Calculate the interval
    const dueDate = Interval.fromDateTimes(now, inputDate);
    const parsedDueDate = Math.ceil(dueDate.length("days"));

    console.log(parsedDueDate);
  } */

  function handleSubmit(e) {
    e.preventDefault();
    if (todoNameRef.current.value !== "" && categoryRef.current.value !== "") {
      const newTodo = {
        id: uuidv4(),
        title: todoNameRef.current.value.toLowerCase(),
        category: categoryRef.current.value.toLowerCase(),
        date: dueDateRef.current.value,
        done: false,
      };

      filter.includes(categoryRef.current.value)
        ? null
        : setFilter([...filter, categoryRef.current.value]);
      //setTodos([...todos, newTodo]);
      const addTodoEvent = new CustomEvent("addTodo", { detail: newTodo });
      window.dispatchEvent(addTodoEvent);
    }

    /*   console.log(categoryRef.current.value);
    console.log(todoNameRef.current.value);
 */
    todoNameRef.current.value = "";
    categoryRef.current.value = "";
  }

  /*   useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]); */

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter item: </label>
          <input type="text" name="text" id="text" ref={todoNameRef} required />
          <label htmlFor="text">Enter category: </label>
          <input
            type="text"
            name="category"
            id="category"
            ref={categoryRef}
            required
          />
          <label htmlFor="date">Due date:</label>
          <input type="date" id="date" name="date" ref={dueDateRef}></input>
          <button id="send">Send</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </>
  );
}
