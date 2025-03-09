import "./App.css";

import{BrowserRouter as Router ,Routes,Route,Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import EmDashboard from "./components/EmDashboard";
import MainDashboard from "./components/TaskPage/MainDashboard";

const ProtectedRoute =({element,Component, ...rest}) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/Login" />;
};

function App() {
  return (
<Router>
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MainDashboard" element={<ProtectedRoute Component={MainDashboard} />} />
        <Route path="EmDashboard" element={<ProtectedRoute Component={EmDashboard} />} />
      </Routes>
        </Router>

  );
}

export default App;
