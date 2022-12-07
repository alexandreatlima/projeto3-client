import { useContext, useState } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  console.log(loggedInUser);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser(response.data);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email: </label>
        <input
          id="input-email"
          type="email"
          onChange={handleChange}
          value={form.email}
          name="email"
        />

        <label htmlFor="input-password">Senha: </label>
        <input
          id="input-password"
          type="password"
          onChange={handleChange}
          value={form.password}
          name="password"
        />

        <button>Entrar!</button>
      </form>
    </>
  );
}
