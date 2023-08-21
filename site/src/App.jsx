import { ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import CheckAuthBeforeRender from "./CheckAuthBeforeRender";
import UserContextProvider from "./UserContextProvider";
import Splash from "./components/routes/Splash";
import Dashboard from "./components/routes/Dashboard";
import Import from "./components/routes/Import";
import Create from "./components/routes/Create";
import Library from "./components/routes/Library";
import Settings from "./components/routes/Settings";
import SavedRecipe from "./components/routes/SavedRecipe";
import Search from "./components/routes/Search";
import Home from "./components/routes/Home";
import Signup from "./components/routes/Signup";
import Login from "./components/routes/Login";
import theme from "./theme/theme";
import "./App.css";
import "./theme/muiOverrides.css";

const SUPPRESSED_WARNINGS = [
  "MUI: Too many re-renders. The layout is unstable.\nTextareaAutosize limits the number of renders to prevent an infinite loop.",
];

const consoleWarn = console.error;

console.error = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleWarn(msg, ...args);
  }
};

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <CheckAuthBeforeRender renderIfAuthenticated={false}>
                  <Splash />
                </CheckAuthBeforeRender>
              }
            >
              <Route path="" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <CheckAuthBeforeRender renderIfAuthenticated>
                  <Dashboard />
                </CheckAuthBeforeRender>
              }
            >
              <Route
                path=""
                element={<Navigate to="/dashboard/import-recipe" replace />}
              />
              <Route path="import-recipe" element={<Import />} />
              <Route
                path="import-recipe/search"
                element={<Search redirectTo="/dashboard/import-recipe" />}
              />
              <Route path="create-recipe" element={<Create />} />
              <Route path="recipe-library" element={<Library />} />
              <Route path="recipe-library/:id/" element={<SavedRecipe />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}
