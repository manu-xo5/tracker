import { Add } from "@mui/icons-material";
import {
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { APP_BAR_HEIGHT } from "./constants";
import useLocalStorage from "./hooks/useLocalStorage";
import useSettings from "./hooks/useSettings";
import NewTask from "./NewTask";
import TaskHoldMenu from "./TaskHoldMenu";

export default function TimeTable({ ...props }) {
  let [timeTable, setTimeTable] = useLocalStorage("TIME_TABLE", []);
  let prevHoldDur = React.useRef(0);
  let [settings] = useSettings();
  let [selectedTask, setSelectedTask] = React.useState(null);
  let [showModal, setShowModal] = React.useState("");

  function handleOpenMenu(task) {
    clearTimeout(prevHoldDur.current);

    prevHoldDur.current = setTimeout(() => {
      setSelectedTask(task);
      setShowModal("HOLD_MENU");
    }, settings.holdTimeout);
  }

  function handleDelete(task) {
    setTimeTable((prev) => {
      let i = prev.indexOf(task);
      if (i === -1) return prev;

      prev.splice(i, 1);
      return [...prev];
    });
  }

  function handleMouseUp() {
    clearTimeout(prevHoldDur.current);
  }

  function handleCloseModal() {
    setShowModal("");
  }

  if (timeTable === null) return null;

  return (
    <>
      <IconButton
        size="large"
        color="primary"
        sx={(theme) => ({
          bgcolor: "white",
          position: "fixed",
          zIndex: "1",
          bottom: "2rem",
          right: "2rem",
          boxShadow: theme.shadows[12],
          ":hover": {
            opacity: 1,
            bgcolor: "rgba(255,255,255, 0.9)",
          },
        })}
        component={Link}
        to="/time-table/new-task"
      >
        <Add fontSize="inherit" />
      </IconButton>

      {timeTable?.length > 0 ? (
        <List
          disablePadding
          style={{ height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
          sx={{ overflowY: "auto" }}
        >
          {timeTable.map((task, i) => (
            <ListItemButton
              key={i}
              onMouseDown={() => handleOpenMenu(task)}
              onMouseUp={() => handleMouseUp()}
              onTouchStart={() => handleOpenMenu(task)}
              onTouchEnd={() => handleMouseUp()}
              divider
            >
              <ListItemText
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                primary={task.title || "No Title Assigned"}
                secondary={task.time}
              ></ListItemText>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 400,
              color: "GrayText",
              pt: "5rem",
            }}
          >
            No Task Yet
          </Typography>

          <Typography textAlign="center" color="blueviolet">
            <Link
              to="/time-table/new-task"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add One!
            </Link>
          </Typography>
        </>
      )}

      {/* modals */}
      <TaskHoldMenu
        open={showModal === "HOLD_MENU"}
        handleClose={handleCloseModal}
        targetTask={selectedTask}
        handleDelete={handleDelete}
        handleEdit={() => setShowModal("EDIT_TASK")}
      />

      <Dialog
        fullScreen
        open={showModal === "EDIT_TASK"}
        onClose={handleCloseModal}
      >
        <NewTask
          onClose={handleCloseModal}
          task={selectedTask}
          taskIndex={timeTable.indexOf(selectedTask)}
        />
      </Dialog>
    </>
  );
}
