import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    navigate(`/page/${type}`);
  };

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            onClick={() => handleNavigation("in")}
            className="mb-4 shadow-sm"
            style={{ cursor: "pointer", borderRadius: "20px" }}
          >
            <Card.Body className="d-flex flex-column align-items-center">
              <FontAwesomeIcon
                icon={faUser}
                size="3x"
                className="mb-3 text-success"
              />
              <h5 className="text-success">IN</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            onClick={() => handleNavigation("out")}
            className="mb-4 shadow-sm"
            style={{ cursor: "pointer", borderRadius: "20px" }}
          >
            <Card.Body className="d-flex flex-column align-items-center">
              <FontAwesomeIcon
                icon={faUser}
                size="3x"
                className="mb-3 text-danger"
              />
              <h5 className="text-danger">OUT</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
