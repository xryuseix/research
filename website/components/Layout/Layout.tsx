/** @format */

import { FC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FC<{
  headerChild?: JSX.Element;
  home?: boolean;
}> = ({ children, headerChild, home }) => (
  <div>
    <Header>{headerChild}</Header>
    <main>{children}</main>
    <Footer home={home}/>
  </div>
);
