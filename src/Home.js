import * as React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";

let StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "white",
  },
});

let StyledTab = styled(Tab)({
  color: "rgba(255,255,255, 0.6)",
  "&.Mui-selected": {
    color: "white",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
});

export default function Home({ ...props }) {
  let [anchorEl, setAnchorEl] = React.useState(null);
  let [tab, setTab] = React.useState(0);

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleTabChange(_ev, newValue) {
    setTab(newValue);
  }

  return (
    <>
      <AppBar position="sticky" top="0">
        <Container sx={{ pt: ".5rem" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" flex="1">
              Tracker
            </Typography>

            <IconButton
              color="inherit"
              onClick={(ev) => setAnchorEl(ev.currentTarget)}
            >
              <MoreVert />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ width: "100%" }}>
            <StyledTabs
              value={tab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <StyledTab
                component={Link}
                to="/"
                label="Time Table"
                {...allyProps(0)}
              />
              <StyledTab
                component={Link}
                to="/workout"
                label="Workout"
                {...allyProps(1)}
              />
            </StyledTabs>
          </Box>
        </Container>
      </AppBar>

      {props.children}
    </>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
