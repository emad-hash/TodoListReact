import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
// لعمل id تلقائي
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette:{
    primary:{
      main:"#004d40",
    }
  }
});
const initialtodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "السلام عليكم",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "2السلام عليكم",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "3السلام عليكم",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialtodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "black",
        }}
        dir="rtl"
      >
        <TodosContext.Provider value={{todos ,setTodos}}>
        <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
