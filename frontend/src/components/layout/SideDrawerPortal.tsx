import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

type FC = {
  children: ReactNode;
};

const SideDrawerPortal: React.FC<FC> = ({ children }) => {
  const portalRoot = document.getElementById("sidedrawer-root")!;

  return ReactDOM.createPortal(children, portalRoot);
};

export default SideDrawerPortal;
