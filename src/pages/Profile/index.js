import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";

export function Profile() {
  const [userData, setUserData] = useState({});
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (loggedInUser) {
          const response = await api.get("/user/profile");
          setUserData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      {userData !== {} ? (
        <h1>{userData.name}</h1>
      ) : (
        <h1>Você não está logado.</h1>
      )}
    </>
  );
}
