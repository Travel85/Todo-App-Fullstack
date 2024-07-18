import { Link } from "react-router-dom";

export function About() {
  return (
    <>
      <h1>About the Todo List</h1>
      <div>
        You can add and delete Todos, which will be stored in the localstorage.
        Click check to mark as done.
        <Link to={"/"}>
          <div>Go back to home</div>
        </Link>
      </div>
    </>
  );
}
