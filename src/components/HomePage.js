import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/capture">
        <Button variant="primary" size="lg">
          Detect Object
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
