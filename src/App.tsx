import "./App.css";
import ListGroup from "./components/ListGroup";

function App() {
  const cities = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <ListGroup
        items={cities}
        heading="List of Cities"
        onSelectItem={handleSelectItem}
      />
    </>
  );
}

export default App;
