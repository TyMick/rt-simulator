import React from "react";
import TeX from "@matejmazur/react-katex";
import "./FloatingLabel.scss"

export default function FloatingLabel({ children }) {
  return (
    <TeX block className="floating-label">
      {children}
    </TeX>
  );
}
