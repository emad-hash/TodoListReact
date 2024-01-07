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

import Todo from "./Todo";
// لعمل id تلقائي
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

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
export default function TodoList() {
  const [todos, setTodos] = useState(initialtodos);
  const [titleInput, setTitleInput] = useState("");

  function handleCheckClick(todoId){
    const updateTodos = todos.map((t) => {
        // eslint-disable-next-line eqeqeq
        if(t.id == todoId){
            // t.isCompleted = true
            t.isCompleted = !t.isCompleted
        }
        return t;
    })
    setTodos(updateTodos)
  }
  
  const todoJSX = todos.map((t) => {
    return <Todo title={t.title} todo={t} handleCheck={handleCheckClick}/>;
  });

  function handeladdclick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  }
  return (
    <Container maxWidth="sm" >
      <Card sx={{ minWidth: 275 }} >
        <CardContent >
          <Typography variant="h2">مهامي</Typography>
          <Divider />
          <ToggleButtonGroup
            //   value={alignment}
            exclusive
            //   onChange={handleAlignment}
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton value="left">الكل</ToggleButton>
            <ToggleButton value="center">المنجز</ToggleButton>
            <ToggleButton value="right">غير المنجز</ToggleButton>
          </ToggleButtonGroup>

          {/* Todo */}
          <div style={{overflow:"scroll",height:"400px"}} className="cardtodobox">
          {todoJSX}
          </div>
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
