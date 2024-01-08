import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType,setDisplayedTodosType] = useState("all")
  
  ////////// filteration arrays 
  const CompletedTodos = todos.filter((t)=>{
    return t.isCompleted ;
  
  })

  const notCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted ;
  });
  let todosToBeRendered = todos;

  // eslint-disable-next-line eqeqeq
  if(displayedTodosType == "completed"){
    todosToBeRendered = CompletedTodos;
  }else if(displayedTodosType === "non-completed"){
    todosToBeRendered = notCompletedTodos;
  }else{
    todosToBeRendered = todos;
  }
  const todoJSX = todosToBeRendered.map((t) => {
    return <Todo title={t.title} todo={t} key={t.id} />;
  });


  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function changeDisplayedType(e){
    setDisplayedTodosType(e.target.value)
  }
  function handeladdclick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  return (
    <Container maxWidth="sm">
      <Card 
      sx={{ minWidth: 275 }}
      style={{maxHeight:"80vh" ,overflow: "scroll"}}
      >
        <CardContent>
          <Typography variant="h2">مهامي</Typography>
          <Divider />
          <ToggleButtonGroup
              value={displayedTodosType}
            exclusive
              onChange={changeDisplayedType}
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
          </ToggleButtonGroup>

          {/* Todo */}
            {todoJSX}
          {/* Todo */}
          <Grid container style={{ marginTop: "10px" }} spacing={2}>
            <Grid
              item
              xs={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handeladdclick();
                }}
                disabled={titleInput.length === 0}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
