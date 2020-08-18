import React from "react";
import Router from "next/router";
import Navbar from "../components/navbar";
import "../styles/index.scss";
import "katex/dist/katex.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
