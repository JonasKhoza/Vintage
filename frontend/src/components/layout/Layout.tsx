import React, { useState } from "react";

import Navigation from "./Navigation";
import SideDrawer from "./SideDrawer";
import Footer from "./Footer";
import SideDrawerPortal from "./SideDrawerPortal";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  function toggleMenuBar() {
    setMenuIsOpen((prevV) => !prevV);
  }
  return (
    <div className="main">
      <Navigation menuIsOpen={menuIsOpen} toggleMenuBar={toggleMenuBar} />
      <SideDrawerPortal>
        <SideDrawer menuIsOpen={menuIsOpen} toggleMenuBar={toggleMenuBar} />
      </SideDrawerPortal>

      <main className="mini_main">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
