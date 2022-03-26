import { ArrowBack } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

export default function NewTask({ task, taskIndex, onClose }) {
  let [, setTimeTable] = useLocalStorage("TIME_TABLE");
  let navigate = useNavigate();

  function handleAddTask(ev) {
    ev.preventDefault();
    let data = Object.fromEntries(new FormData(ev.currentTarget));

    if (task) {
      setTimeTable((prev) => {
        prev.splice(taskIndex, 1, data);
        console.log(prev);
        return [...prev];
      });
    } else {
      setTimeTable((prev) => [...(prev || []), data]);
    }

    onClose?.() || navigate("/");
  }

  return (
    <>
      <AppBar position="sticky" top="0">
        <Toolbar>
          <IconButton
            sx={{
              color: "white",
            }}
            size="medium"
            component={onClose ? undefined : Link}
            to="/"
            onClick={() => onClose?.()}
          >
            <ArrowBack fontSize="inherit" />
          </IconButton>

          <Typography ml={"1rem"} variant="h6">
            Time Table / New Task
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ p: "3rem 0" }}>
        <Paper sx={{ p: "1rem" }}>
          <form onSubmit={handleAddTask}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                name="title"
                defaultValue={task?.title}
                fullWidth
                required
              />

              <TextField
                type="time"
                label="Time"
                name="time"
                defaultValue={task?.time}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />

              <div>
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </div>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
