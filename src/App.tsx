import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Like from "./components/Like/Like";
import ListGroup from "./components/LİstGroup/ListGroup";
import { produce } from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", description: "Description for Bug 1" },
    { id: 2, title: "Bug 2", description: "Description for Bug 2" },
    { id: 3, title: "Bug 3", description: "Description for Bug 3" },
  ]);

  const [cartItems, setCartItems] = useState(["Item 1", "Item 2", "Item 3"]);

  const handleClearCart = () => {
    setCartItems([]);
  };

  const updateBugsWithImmer = () => {
    const newBugs = [
      { id: 4, title: "Bug 4", description: "Description for Bug 4" },
      { id: 5, title: "Bug 5", description: "Description for Bug 5" },
    ];

    setBugs(
      produce((draft) => {
        draft.push(...newBugs);
      })
    );
  };

  return (
    <div className="container my-5">
      {/* Button Section */}
      <section className="mb-5">
        <h2 className="mb-3">Buttons</h2>
        <p className="text-muted mb-3">
          Different button variants with click handlers
        </p>
        <div className="d-flex gap-2">
          <Button onClick={() => console.log("Button clicked")} color="Primary">
            Primary Button
          </Button>
          <Button
            onClick={() => console.log("Button clicked")}
            color="Secondary"
          >
            Secondary Button
          </Button>
        </div>
      </section>

      <hr className="my-4" />

      {/* List Section */}
      <section className="mb-5">
        <h2 className="mb-3">List Group</h2>
        <p className="text-muted mb-3">
          Interactive list with selectable items
        </p>
        <ListGroup
          items={["New York", "San Francisco", "Los Angeles"]}
          heading="Cities"
          onSelectItem={(item) => console.log(item)}
        />
      </section>

      <hr className="my-4" />

      {/* List Section */}
      <section className="mb-5">
        <h2 className="mb-3">Like</h2>
        <p className="text-muted mb-3">Like Button</p>
        <Like onClick={() => console.log("Like button clicked")} />
      </section>

      <hr className="my-4" />

      {/* Immer Section */}
      <section className="mb-5">
        <h2 className="mb-3">Immer State Management</h2>
        <p className="text-muted mb-3">Managing state immutably with Immer</p>
        <Button onClick={updateBugsWithImmer} color="Primary">
          Add New Bugs
        </Button>
        <ul className="mt-3">
          {bugs.map((bug) => (
            <li key={bug.id}>
              <strong>{bug.title}:</strong> {bug.description}
            </li>
          ))}
        </ul>
      </section>

      {/* NavBar Section */}
      <NavBar cartItemsCount={cartItems.length} />
      {/* Cart Section */}
      <Cart cartItems={cartItems} onClear={handleClearCart} />

      <ExpandableText maxChars={50}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </ExpandableText>
    </div>
  );
}

export default App;
