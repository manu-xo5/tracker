import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import logo from "./logo.svg";
import NewTask from "./NewTask";
import TimeTable from "./TimeTable";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home>
                <TimeTable />
              </Home>
            }
          />
          <Route
            path="/workout"
            element={
              <>
                <Home>
                  <div>
                    Workout
                    <img src={logo} alt="yo" />
                  </div>
                </Home>
              </>
            }
          />

          <Route path="/time-table/new-task" element={<NewTask />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
