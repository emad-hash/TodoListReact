import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function Todo({ todo, handleCheck }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showEditDialog, setshowEditDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  //اضافة مهمة
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  ////// ///////  ///////
  ////// /// delete
  function handledeleteclick() {
    setshowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setshowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      // eslint-disable-next-line eqeqeq
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  ////// /// delete
  /////////////////// edit || update
  function handleEditclick() {
    setshowEditDialog(true);
  }
  function handleEditClose() {
    setshowEditDialog(false);
  }
  function handleEditConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    setshowEditDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      {/* Delete */}
      <Dialog
        style={{ direction: "rtl" }}
        onClick={handleDeleteClose}
        open={showDeleteDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من رغبتك في الحذف ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            أغلاق
          </Button>
          <Button style={{ color: "red" }} onClick={handleDeleteConfirm}>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete */}
      {/* updata */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showEditDialog}
        onClose={handleEditClose}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="المهمة"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button onClick={handleEditConfirm}>نحديث</Button>
        </DialogActions>
      </Dialog>
      {/* updata */}
      <Card
        className="cardtodo"
        sx={{
          minWidth: 275,
          height: 80,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" sx={{ textAlign: "right", textDecoration: todo.isCompleted ? "line-through" : "none"}}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* <Typography variant="h2"> الاولى</Typography> */}
              <IconButton
                className="iconbtn"
                aria-label="CheckIcon"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconbtn"
                aria-label="EditIcon"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={() => {
                  handleEditclick();
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconbtn"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handledeleteclick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
