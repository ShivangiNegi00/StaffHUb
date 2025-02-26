import "./App.css";

import{BrowserRouter as Router ,Routes,Route,Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskPage/TaskDashboard";

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
        <Route path="/TaskDashboard" element={<ProtectedRoute Component={TaskDashboard} />} />
      </Routes>
        </Router>

  );
}

export default App;
