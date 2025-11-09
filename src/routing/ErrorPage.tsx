import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  isRouteErrorResponse(error)
    ? console.error("Route Error:", error.status, error.statusText)
    : console.error("Error:", error);

  console.error(error);

  return (
    <>
      <h1>Oops...</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error)
          ? "Invalid route: " + error.status + "  " + error.statusText
          : "Unknown error"}
      </p>

      <Link to="/">Back to home</Link>
    </>
  );
};

export default ErrorPage;
