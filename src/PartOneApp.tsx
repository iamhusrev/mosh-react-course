import { produce } from "immer";
import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import FormWithUseForm from "./components/Forms/FormWithUseForm";
import FormWithUseRef from "./components/Forms/FormWithUseRef";
import FormWithUseState from "./components/Forms/FormWithUseState";
import Like from "./components/Like/Like";
import ListGroup from "./components/LİstGroup/ListGroup";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";
import ExpenseFilter from "./expense-tracker/compnents/ExpenseFilter";
import ExpenseForm from "./expense-tracker/compnents/ExpenseForm";
import ExpenseList from "./expense-tracker/compnents/ExpenseList";
import { fakeExpenses } from "./expense-tracker/expenses";

export interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
}

function PartOneApp() {
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

  const [expenses, setExpenses] = useState(fakeExpenses);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const visibleExpenses = expenses.filter((expense) => {
    if (selectedCategory === "All Categories") return true;
    return expense.category === selectedCategory;
  });

  return (
    <div className="container">
      {/* Users Section */}
      <section className="mb-5">
        <h2 className="mb-3">Users Section</h2>
        <p className="text-muted mb-3">Fetched Users from API</p>
        <UserList />
      </section>

      {/* Expense List Section */}
      <section className="mb-5">
        <h2 className="mb-3">Expense List Section</h2>
        <p className="text-muted mb-3">A simple expense list example</p>
        <div className="mb-5">
          {/* Expense Form would go here */}
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => {
            setExpenses(expenses.filter((expense) => expense.id !== id));
          }}
        />
      </section>

      <hr className="my-4" />

      {/* Form Section With Use Form */}
      <section className="mb-5">
        <h2 className="mb-3">Form Section With Use Form</h2>
        <p className="text-muted mb-3">A simple form example</p>
        <FormWithUseForm />
      </section>

      <hr className="my-4" />
      {/* Form Section With Use Ref */}
      <section className="mb-5">
        <h2 className="mb-3">Form Section With Use Ref</h2>
        <p className="text-muted mb-3">A simple form example</p>
        <FormWithUseRef />
      </section>

      <hr className="my-4" />
      {/* Form Section With Use State */}
      <section className="mb-5">
        <h2 className="mb-3">Form Section With Use State</h2>
        <p className="text-muted mb-3">A simple form example</p>
        <FormWithUseState />
      </section>

      <hr className="my-4" />

      {/* Expandable Text Section */}

      <section className="mb-5">
        <h2 className="mb-3">Expandable Text Section</h2>
        <p className="text-muted mb-3">A simple expandable text example</p>
        <ExpandableText maxChars={50}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </ExpandableText>
      </section>

      <hr className="my-4" />
      {/* NavBar Section */}
      <section className="mb-5">
        <h2 className="mb-3">NavBar Section</h2>
        <p className="text-muted mb-3">A simple NavBar example</p>
        <NavBar cartItemsCount={cartItems.length} />
        {/* Cart Section */}
        <Cart cartItems={cartItems} onClear={handleClearCart} />
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

      <hr className="my-4" />
      {/* List Section */}
      <section className="mb-5">
        <h2 className="mb-3">Like</h2>
        <p className="text-muted mb-3">Like Button</p>
        <Like onClick={() => console.log("Like button clicked")} />
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
    </div>
  );
}

export default PartOneApp;
