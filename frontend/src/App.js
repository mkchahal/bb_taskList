function App() {
  return (
    <>
      <h1>To Do List</h1>
      <form action="submit">
        <input type="text" placeholder="Add a Task..." />
        <textarea
          cols="30"
          rows="10"
          placeholder="Add some related notes..."
        ></textarea>
        <button type="submit">+ Add a new task</button>
      </form>
    </>
  );
}

export default App;
