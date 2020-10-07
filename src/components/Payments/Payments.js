import React from "react";
import "./Payments.scss";

const Payments = () => {
  return (
    <div className="payments">
      <div className="payments__title">
        <h2>Medios de pago</h2>
      </div>
      <div className="card-group">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tarjeta de crédito</h5>
            <p className="card-text">Ver promociones bancarias</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tarjeta de débito</h5>
            <p className="card-text">Ver promociones bancarias</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Efectivo</h5>
            <p className="card-text">En efectivo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
