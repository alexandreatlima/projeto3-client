import { Route, Routes } from "react-router-dom";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextComponent } from "./context/authContext";
import { CreateProduct } from "./pages/CreateProduct";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { MyOrders } from "./pages/MyOrders";
import { Products } from "./pages/Products";
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
          <Route path="/produtos" element={<Products />} />
          <Route
            path="/admin/new-product"
            element={<ProtectedAdminRoute Component={CreateProduct} />}
          />

          <Route
            path="/minhas-compras"
            element={<ProtectedRoute Component={MyOrders} />}
          />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
