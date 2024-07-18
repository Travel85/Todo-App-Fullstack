import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <>
      <div>
        <h1>Oops!</h1>
        <div>Page not found!</div>
        <Link to={"/"}>
          <div>Go back to home</div>
        </Link>
      </div>
    </>
  );
}
