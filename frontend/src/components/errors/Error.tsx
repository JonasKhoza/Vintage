import React from "react";
type obj = {
  error: string;
};

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "rgb(236, 76, 76)",
  fontSize: "1.2rem",
};

export default function Error({ error }: obj) {
  return (
    <div style={styles}>
      <p>{error}</p>
    </div>
  );
}
