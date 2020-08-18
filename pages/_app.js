import React from "react";
import Router from "next/router";
import Navbar from "../components/navbar";
import "../styles/index.scss";
import NProgress from "nprogress";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
