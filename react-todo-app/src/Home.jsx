import "./App.css";
import { Input } from "./Input/Input";
import { Fragment } from "react";
import { TodoCard } from "./Card/TodoCard";
import { CategoryDropDown } from "./Input/CategoryDropDown";
import useTodos from "./customHools/useTodos";

export function Home() {
  const { todos, setTodos, filteredTodos, setFilteredTodos } = useTodos();

  return (
    <>
      <div className="app-container">
        <Input></Input>
        <CategoryDropDown></CategoryDropDown>

        {filteredTodos.length > 0
          ? filteredTodos.map((todo) => {
              return (
                <Fragment key={todo.id}>
                  <TodoCard
                    title={todo.title}
                    done={todo.done}
                    id={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    category={todo.category}
                    date={todo.date}
                    setFilteredTodos={setFilteredTodos}
                    filteredTodos={filteredTodos}
                  />
                </Fragment>
              );
            })
          : todos.map((todo) => {
              return (
                <Fragment key={todo.id}>
                  <TodoCard
                    title={todo.title}
                    done={todo.done}
                    id={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    category={todo.category}
                    date={todo.date}
                  />
                </Fragment>
              );
            })}
      </div>
    </>
  );
}
