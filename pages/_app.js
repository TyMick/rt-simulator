import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../styles/index.scss";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
