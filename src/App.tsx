import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Alert from "./components/Alert";

function App() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <Button color='warning' children="Click Me" onClick={() => setShowAlert(!showAlert)} />

      {showAlert && <Alert>This is an alert</Alert>}
    </>
  );
}

export default App;
