import { Container, Row, Col, } from 'react-bootstrap'
import coFunded from "./../assets/img/co-funded.png";

function Footer() {
  return (
    <footer className="footer py-5 mt-auto">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <img 
              src={coFunded} 
              className="img-fluid mt-1"
              alt="Co-funded by the Erasmus+ Programme of the European Union" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;