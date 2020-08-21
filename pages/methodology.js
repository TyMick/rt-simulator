import React from "react";
import { NextSeo } from "next-seo";
import Navbar from "../components/Navbar";
import MethodologyDataTools from "../components/methodology-data-tools";
import Footer from "../components/footer";

export default function Methodology() {
  return (
    <>
      <NextSeo title="Rt Simulator – Methodology, Data, &amp; Tools" />
      <Navbar />
      <MethodologyDataTools />
      <Footer />
    </>
  );
}
