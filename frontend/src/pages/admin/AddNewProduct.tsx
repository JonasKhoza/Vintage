import React from "react";
import Form from "../../components/form/Form";

function AddNewProduct() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Kanit sans-serif",
          fontWeight: "700",
          fontSize: "3rem",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        Add new product
      </h1>
      <Form />
    </div>
  );
}

export default AddNewProduct;
