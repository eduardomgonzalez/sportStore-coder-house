import React, { useEffect, useContext } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CartContext from "../../contexts/cartContext";

import Badge from "@material-ui/core/Badge";

const CartIcon = () => {
  const { cart, qnt, setQnt } = useContext(CartContext);

  useEffect(() => {
    if (cart.length === 0) {
      setQnt(0);
    }
  }, [cart, setQnt]);

  return (
    <Badge badgeContent={qnt} color="secondary">
      <ShoppingCartIcon fontSize="large" />
    </Badge>
  );
};

export default CartIcon;
