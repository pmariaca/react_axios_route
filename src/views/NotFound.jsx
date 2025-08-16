
import { useRouteError } from "react-router";

export default function NotFound() {
  const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page">
      <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> 
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}