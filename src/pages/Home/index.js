import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export function Home() {
  const navigate = useNavigate();

  const { loggedInUser, authLoading } = useContext(AuthContext);

  return (
    <>
      {authLoading ? (
        <h1>Carregando</h1>
      ) : loggedInUser ? (
        <>
          <h1>Home</h1>

          <button
            onClick={() => {
              navigate("/perfil");
            }}
          >
            Perfil
          </button>
        </>
      ) : (
        <>
          {" "}
          <h1>Home</h1>
          <button
            onClick={() => {
              navigate("/cadastro");
            }}
          >
            Cadastro
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </>
      )}
    </>
  );
}
