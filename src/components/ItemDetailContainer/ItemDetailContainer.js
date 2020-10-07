import React, { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loading from "../Loading/Loading";

const ItemDetailContainer = ({ product, onAdd }) => {
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);

  const getProduct = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(product);
      }, 1000);
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    getProduct()
      .then((data) => {
        if (isSubscribed) {
          setArticle(data);
          setLoading(false);
        }
      })
      .catch(() => console.log("rejected"));

    return () => (isSubscribed = false);
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading text="Cargando..." />
  ) : (
    <div>
      <ItemDetail product={article} onAdd={onAdd} />
    </div>
  );
};

export default ItemDetailContainer;
