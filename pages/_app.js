import React from "react";
import { DefaultSeo } from "next-seo";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../styles/index.scss";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{ type: "website" }}
        twitter={{ handle: "@tywmick" }}
      />
      <Component {...pageProps} />
    </>
  );
}
