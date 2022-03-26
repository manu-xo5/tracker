import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import * as React from "react";

export default function TaskHoldMenu({
  targetTask,
  handleDelete,
  handleClose,
  open,
  handleEdit,
}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <List>
        <ListItemButton
          onClick={() => {
            handleDelete(targetTask);
            handleClose();
          }}
        >
          <ListItemText primary="Delete this Task" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            handleEdit(targetTask);
          }}
        >
          <ListItemText primary="Edit" />
        </ListItemButton>
      </List>
    </Dialog>
  );
}
