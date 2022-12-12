import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";

export function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const { setLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUserData(response.data);
      } catch (err) {
        console.log(err);

        if (err.response.status === 401) {
          localStorage.removeItem("loggedInUser");
          navigate("/");
        }
      }
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <>
      <h1>{userData.name}</h1>
      <Link to="/produtos">
        <button>Produtos</button>
      </Link>

      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}
