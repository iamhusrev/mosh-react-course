import { produce } from "immer";
import { use, useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import FormWithUseRef from "./components/Forms/FormWithUseRef";
import FormWithUseState from "./components/Forms/FormWithUseState";
import Like from "./components/Like/Like";
import ListGroup from "./components/LİstGroup/ListGroup";
import NavBar from "./components/NavBar";
import FormWithUseForm from "./components/Forms/FormWithUseForm";
import ExpenseList from "./expense-tracker/compnents/ExpenseList";
import { fakeExpenses } from "./expense-tracker/expenses";
import ExpenseFilter from "./expense-tracker/compnents/ExpenseFilter";
import ExpenseForm from "./expense-tracker/compnents/ExpenseForm";
import axios, { AxiosError, CanceledError } from "axios";
import apiClient from "./services/api-client";
import type { User } from "./services/user-service";
import UserService from "./services/user-service";
import userService from "./services/user-service";
import userServiceWithHttpGenericService from "./services/user-service-with-http-generic-service";

export interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
}

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

  const [expenses, setExpenses] = useState(fakeExpenses);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const visibleExpenses = expenses.filter((expense) => {
    if (selectedCategory === "All Categories") return true;
    return expense.category === selectedCategory;
  });

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } =
      userServiceWithHttpGenericService.getAll<User>();
    request
      .then((res) => setUsers(res.data))
      .catch((error: AxiosError) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => setLoading(false));

    return () => {
      cancel();
    };
  }, []);

  // Async and Await Version
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       setUsers(response.data);
  //     } catch (error) {
  //       const axiosError = error as AxiosError;
  //       setError(axiosError.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const deleteUser = (userToDelete: User) => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));

    userServiceWithHttpGenericService
      .delete(userToDelete.id)
      .then(() => {
        console.log(`User with id ${userToDelete.id} deleted successfully.`);
      })
      .catch((error: AxiosError) => {
        console.error(
          `Failed to delete user with id ${userToDelete.id}:`,
          error.message
        );
        setError(error.message);
        setUsers((prevUsers) => [...prevUsers, userToDelete]);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser: User = {
      id: 0,
      name: "New User",
      username: "newuser",
      email: "2bPnM@example.com",
    };
    setUsers([newUser, ...users]);

    userServiceWithHttpGenericService
      .create(newUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user === newUser ? { ...response.data } : user
          )
        );
      })
      .catch((error: AxiosError) => {
        console.error("Failed to add user:", error.message);
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (userToUpdate: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...userToUpdate, name: userToUpdate.name + "!" };
    setUsers(
      users.map((user) => (user.id === userToUpdate.id ? updatedUser : user))
    );

    userService
      .updateUser(updatedUser)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userToUpdate.id ? response.data : user
          )
        );
      })
      .catch((error: AxiosError) => {
        console.error(
          `Failed to update user with id ${userToUpdate.id}:`,
          error.message
        );
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div className="container">
      {/* Users Section */}
      <section className="mb-5">
        <h2 className="mb-3">Users Section</h2>
        <p className="text-muted mb-3">Fetched Users from API</p>
        {error && <p className="text-danger">{error}</p>}
        {loading && <div className="spinner-border"></div>}
        <button className="btn btn-primary mb-3" onClick={addUser}>
          Add User
        </button>
        <ul className="list-group">
          {users.map((user: User) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between mb-1"
            >
              {user.name}
              <div className="d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-outline-secondary mx-1"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default App;
