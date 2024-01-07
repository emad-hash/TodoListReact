import './App.css';
import TodoList from './components/TodoList';
import { createTheme , ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily:[
      "Alexandria"
    ],
  }
})
function App() {
  return (
    <ThemeProvider  theme={theme}>
    <div className="App" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"black"
    }}
    dir='rtl'>
      <TodoList/>
    </div>
    </ThemeProvider>
  );
}

export default App;
