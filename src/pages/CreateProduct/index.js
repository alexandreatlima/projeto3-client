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

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImg(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const dataForUpload = new FormData();

      dataForUpload.append("picture", img);

      const response = await api.post("/upload-image", dataForUpload);

      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();

      await api.post("/product", { ...form, img: imgURL });

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

        <label htmlFor="input-picture">Foto: </label>
        <input id="input-picture" type="file" onChange={handleImg} />

        <button>Criar!</button>
      </form>
    </>
  );
}
