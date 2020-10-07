import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import Checkout from "../../components/Checkout/Checkout";
import CartContext from "../../contexts/cartContext";

import "./Cart.scss";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const messageConditional = (
    <div className="card text-center cart-message">
      <div className="card-header">Ops!</div>
      <div className="card-body">
        <h5 className="card-title">¡Tu carrito está vacío!</h5>
        <p className="card-text">
          ¿No sabés qué comprar? ¡Miles de productos te esperan!
        </p>
        <Link to="/" className="btn btn-primary">
          Ir a comprar
        </Link>
      </div>
      <div className="card-footer text-muted">Sport Store</div>
    </div>
  );

  return (
    <div className="cart">
      {cart.length === 0 ? (
        messageConditional
      ) : (
        <div>
          <Table />
          <Checkout />
        </div>
      )}
    </div>
  );
};

export default Cart;
