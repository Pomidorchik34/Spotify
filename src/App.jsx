import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Details from "./pages/Details";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      ></Route>
      <Route>
        <Route
          path="/details"
          element={
            <MainLayout>
              <Details />
            </MainLayout>
          }
        ></Route>
      </Route>
      <Route></Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
