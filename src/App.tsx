import "./App.css";
import ListGroup from "./components/LİstGroup/ListGroup";

function App() {

  return (
    <>
      <ListGroup
        items={["New York", "San Francisco", "Los Angeles"]}
        heading="Cities"
        onSelectItem={(item) => console.log(item)}
      />
    </>
  );
}

export default App;
