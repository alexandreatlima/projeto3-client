import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../context/authContext";

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/product");

        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, []);

  async function handleDelete(productId) {
    try {
      await api.delete(`/product/${productId}`);

      navigate("/produtos");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateOrder(productId, productPrice) {
    try {
      const response = await api.post("/order", {
        amount: productPrice,
        product: productId,
      });

      console.log(response.data);

      // navigate para a pagina de myOrders
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {products.map((currentProduct) => {
        return (
          <div>
            <h2>{currentProduct.name}</h2>
            <p>{currentProduct.price}</p>

            {loggedInUser ? (
              <button
                onClick={() => {
                  handleCreateOrder(currentProduct._id, currentProduct.price);
                }}
                disabled={currentProduct.stockQuantity === 0 ? true : false}
                className={currentProduct.stockQuantity === 0 ? "" : ""}
              >
                {currentProduct.stockQuantity === 0 ? "Esgotado" : "Comprar"}
              </button>
            ) : (
              <Link to="/login">
                <button>Entrar</button>
              </Link>
            )}

            {currentProduct.stockQuantity === 0 ? (
              <span>Esgotado</span>
            ) : (
              <span>{`${currentProduct.stockQuantity} unidades`}</span>
            )}

            {loggedInUser.user.role === "ADMIN" && (
              <button
                onClick={() => {
                  handleDelete(currentProduct._id);
                }}
              >
                Deletar
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}
