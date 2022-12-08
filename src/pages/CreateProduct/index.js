import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    stockQuantity: 0,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/product", form);

      navigate("/produtos");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-name">Nome </label>
        <input
          id="input-name"
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
        />

        <label htmlFor="input-price">Preço: </label>
        <input
          id="input-price"
          type="number"
          onChange={handleChange}
          value={form.price}
          name="price"
        />

        <label htmlFor="input-stock">Quantidade: </label>
        <input
          id="input-stock"
          type="number"
          onChange={handleChange}
          value={form.stockQuantity}
          name="stockQuantity"
        />

        <button>Criar!</button>
      </form>
    </>
  );
}
