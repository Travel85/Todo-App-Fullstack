import "./App.css";

import React, { Fragment, useEffect } from "react";

import { Home } from "./Home";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { About } from "./pages/About.jsx";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TodoCard } from "./Card/TodoCard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoProvider } from "./context/TodoContextHandler.jsx";

function App() {
  const getRoot = import.meta.env.VITE_BASE_URI;

  //console.log(getRoot);

  /*   const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    localStorage.setItem(`todos`, JSON.stringify(todos));
  }, [todos]);

  const checkDueDate = () => {
    //current date:
    const now = DateTime.now();

    todos.map((todo) => {
      const inputDate = DateTime.fromISO(todo.date);
      const dueDate = Interval.fromDateTimes(now, inputDate);
      const parsedDueDate = Math.ceil(dueDate.length("days"));
      if (parsedDueDate <= 3 && !todo.done) {
        // console.log(`${todo.title} is due within ${parsedDueDate} day(s)`);
        toast(`${todo.title} is due within ${parsedDueDate} day(s)`);
      }
    });
  };

  useEffect(() => {
    checkDueDate();
  }, [todos]); */

  return (
    <Fragment>
      <TodoProvider>
        <Router>
          <Fragment>
            <ToastContainer />
            <Link to={`/`}>
              <h1 className="header">My Todo App</h1>
            </Link>
            <ul>
              <Link to={`/`}>
                <li>Home</li>
              </Link>
              <Link to={`/about`}>
                <li>About</li>
              </Link>
            </ul>
          </Fragment>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/:errorpage" element={<ErrorPage />}></Route>
            <Route path="/todo/:catId" element={<TodoCard />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </TodoProvider>
    </Fragment>
  );
}

export default App;
