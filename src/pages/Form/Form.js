import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/cartContext";
import { getFirestore } from "../../firebase";
import * as firebase from "firebase/app";
import "firebase/firestore";

function Field({
  name,
  inputLabel,
  nameField,
  style,
  type,
  id,
  placeholder,
  valueInput,
  onChange,
}) {
  return (
    <>
      <div className="col-sm-6">
        <label
          htmlFor={inputLabel}
          name={name}
          className="form-label"
          style={style}
        >
          {nameField}
        </label>
        <input
          type={type}
          value={valueInput}
          className="form-control"
          id={id}
          placeholder={placeholder}
          required
          onChange={onChange}
        ></input>
      </div>
    </>
  );
}

const Form = () => {
  const { cart, setCart, setQnt } = useContext(CartContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [sent, setSent] = useState(false);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onEmailConfirmChange = (event) => {
    setEmailConfirm(event.target.value);
  };

  const updateDataFirebase = async () => {
    const db = getFirestore();
    const itemsToUpdate = db.collection("items").where(
      firebase.firestore.FieldPath.documentId(),
      "in",
      cart.map((i) => i.id)
    );

    const query = await itemsToUpdate.get();
    const batch = db.batch();

    const outOfStock = [];
    query.docs.forEach((docSnapShot, idx) => {
      if (docSnapShot.data().stock >= cart[idx].quantity) {
        batch.update(docSnapShot.ref, {
          stock: docSnapShot.data().stock - cart[idx].quantity,
        });
      } else {
        outOfStock.push({ ...docSnapShot.data(), id: docSnapShot.id });
      }
    });

    if (outOfStock.length === 0) {
      await batch.commit();
    }
  };

  async function createOrder() {
    setSent(true);
    // Info de usuario
    const userInfo = { name, phone, email };

    // Items
    const items = cart.map((p) => ({
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      subtotal: p.price * p.quantity,
    }));

    // Total
    const totalPrice = cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );

    const db = getFirestore();
    const orders = db.collection("orders");
    const newOrder = {
      userInfo,
      items,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      total: totalPrice,
    };

    function clean() {
      setCart([]);
      setQnt(0);
    }

    try {
      const { id } = await orders.add(newOrder);
      setOrderId(id);
      clean();
    } catch (err) {
      console.log("Ha ocurrido un error creando la orden de compra");
    }
    updateDataFirebase();
  }

  if (orderId) {
    return (
      <>
        <div className="container">
          <div className="py-5 text-center mt-5">
            <h2 className="mt-5">¡Gracias por elegirnos!</h2>
            <h4 className="my-5">La compra se ha realizado exitosamente.</h4>
            <strong>El ID de tu compra es {orderId}</strong>
            <p className="danger">Sport Store</p>
            <Link className="btn btn-outline-primary m-3" to={`/`}>
              <strong>Ir a comprar</strong>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="text-center py-5 mt-5">
          <h4 className="mt-5">
            Completa el formulario con tus datos para confirmar la compra.
          </h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="row g-3">
                <Field
                  inputLabel="inputName"
                  name="name"
                  nameField="Nombre y Apellido"
                  valueInput={name}
                  style={{ paddingTop: "5px" }}
                  type="text"
                  id="inputName"
                  placeholder="Nombre y Apellido"
                  onChange={onNameChange}
                />
                <Field
                  inputLabel="inputPhone"
                  name="phone"
                  nameField="Teléfono"
                  valueInput={phone}
                  style={{ paddingTop: "10px" }}
                  type="text"
                  id="inputPhone"
                  placeholder="1133445566"
                  onChange={onPhoneChange}
                />
                <Field
                  inputLabel="inputEmail"
                  name="email"
                  nameField="Email"
                  valueInput={email}
                  style={{ paddingTop: "10px" }}
                  type="email"
                  id="inputEmail"
                  placeholder="mail@ejemplo.com"
                  onChange={onEmailChange}
                />
                <Field
                  inputLabel="inputConfirmEmail"
                  name="email"
                  nameField="Confirmar Email"
                  valueInput={emailConfirm}
                  style={{ paddingTop: "10px" }}
                  type="email"
                  id="inputConfirmEmail"
                  placeholder="mail@ejemplo.com"
                  onChange={onEmailConfirmChange}
                />
              </div>
              <button
                className="btn btn-outline-success btn-lg btn-block mt-5"
                type="submit"
                disabled={
                  !name || !phone || !email || emailConfirm !== email || sent
                }
                onClick={createOrder}
                style={{ marginBottom: "30px" }}
              >
                <strong>Confirmar</strong>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
