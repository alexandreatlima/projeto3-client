import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextComponent } from "./context/authContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/perfil"
            element={<ProtectedRoute Component={Profile} />}
          />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
