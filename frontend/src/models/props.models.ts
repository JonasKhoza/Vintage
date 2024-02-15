import React from "react";

export interface PropInterface {
  children: React.ReactNode;
  toggleMenuBar: () => void;
  menuIsOpen: boolean;
}
