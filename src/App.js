import React from "react";
import Navbar from "./components/Navbar";
import Headings from "./components/Headings";
import ChartAndDynamicIntro from "./components/ChartAndDynamicIntro";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Headings />
        <ChartAndDynamicIntro />
      </main>
    </>
  );
}
