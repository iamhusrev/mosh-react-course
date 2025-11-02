import "./App.css";
import PostList from "./react-query/PostList";
import PostListWithInfiniteQuery from "./react-query/PostListWithInfiniteQuery";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <div className="App">
      <h1>React Query Todo List</h1>
      {/* Other components can be added here */}
      <TodoForm />
      <TodoList />
      {/* <TodoList /> */}
      {/* <PostList /> */}
      {/* <PostListWithInfiniteQuery /> */}
    </div>
  );
}

export default App;
