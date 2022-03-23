import { Add } from "@mui/icons-material";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

export default function TimeTable({ ...props }) {
  let [timeTable, setTimeTable] = useLocalStorage("TIME_TABLE");

  function handleDelete(task) {
    setTimeTable(
      /** @param {[]} prev */ (prev) => {
        prev.splice(prev.indexOf(task), 0);
        return [...prev];
      }
    );
  }

  return (
    <>
      <IconButton
        size="large"
        color="primary"
        sx={(theme) => ({
          position: "fixed",
          zIndex: "1",
          bottom: "2rem",
          right: "2rem",
          boxShadow: theme.shadows[12],
        })}
        component={Link}
        to="/time-table/new-task"
      >
        <Add fontSize="inherit" />
      </IconButton>

      <Container sx={{ pt: "4rem" }}>
        {timeTable?.length > 0 ? (
          <List
            disablePadding
            sx={{
              "& > * + *": {
                borderTop: ".1rem solid",
                borderColor: "GrayText",
              },
            }}
          >
            {timeTable.map((task) => (
              <ListItem disableGutters>
                <ListItemButton onDoubleClick={() => handleDelete(task)}>
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
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <Typography
              textAlign="center"
              variant="h6"
              fontWeight={400}
              color="GrayText"
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
      </Container>
    </>
  );
}
