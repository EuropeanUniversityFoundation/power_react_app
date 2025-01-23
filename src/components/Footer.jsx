import { Container, Row, Col, } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer py-3 bg-dark">
      <Container>
        <Row>
          <Col md={7} lg={4}>
            <div className="eu-funding eu-funding-banner py-3">
              <img 
                src="https://power.uni-foundation.eu/modules/contrib/eu_funding/img/eu_flag_co_funded_hc.png" 
                alt="Co-funded by the Erasmus+ Programme of the European Union" 
                className="img-fluid"
              />
            </div>
          </Col>

          <Col md={5} lg={8}>
            <div className="eu-funding eu-funding-text text-white py-3">
              This project has been funded with the support from the European Commission. The website reflects the views only of the author, and the Commission cannot be held responsible for any use which may be made of the information contained therein.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;