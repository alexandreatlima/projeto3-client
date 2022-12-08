import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <h1>{userData.name}</h1>
      <Link to="/produtos">
        <button>Produtos</button>
      </Link>
    </>
  );
}
