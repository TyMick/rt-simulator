import React from "react";
import Link from "next/link";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { Navbar as RBNavbar, Container, Nav } from "react-bootstrap";
import TeX from "@matejmazur/react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  const breakpoint = useWindowWidthBreakpoints();

  return (
    <RBNavbar
      as="header"
      variant="dark"
      bg="dark"
      style={{ marginBottom: breakpoint.xs ? "1.5rem" : "2rem" }}
    >
      <Container fluid="xl">
        <Link href="/" passHref>
          <RBNavbar.Brand>
            <TeX>R_t</TeX> Simulator
          </RBNavbar.Brand>
        </Link>
        <Nav className="mr-n2">
          <Nav.Link
            href="https://github.com/tywmick/rt-simulator"
            title="tywmick/rt-simulator on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Nav.Link>
        </Nav>
      </Container>
    </RBNavbar>
  );
}
