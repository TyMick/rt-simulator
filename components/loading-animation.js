import React from "react";
import { Container } from "react-bootstrap";

export default function LoadingAnimation({ children }) {
  return (
    <Container fluid style={{ marginTop: "25vh" }}>
      <div className="sk-chase mx-auto mb-4">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
      <div className="text-dark text-center">{children}</div>
    </Container>
  );
}
