import { Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap'

function Filters(props) {

  // Filter offers on submit event
  const filterOffers = (e, value) => {
    props.filterOffers(e, value)
  }

  // Reset offers array state
  const setOffersState = (array) => {
    props.setOffersState(array)
  }

  // Handle input state
  const changeInput = (value) => {
    props.changeValue(value)
  }

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <Row className="filters">
          <Col xs={12} className="m-auto">
            <Form onSubmit={(e) => filterOffers(e, props.inputText)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Col xs={6} md={6}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Filter by offer title or location"
                        className="mb-3"
                      >
                      <Form.Control 
                        type="text" 
                        placeholder="Filter by offer title or location"
                        onChange={(e) => changeInput(e.target.value)} />
                     </FloatingLabel>
                  </Col>
                  <Col xs={6} md={6}>
                    <Button 
                      as="input"
                      variant="primary"
                      className="me-3" 
                      type="submit" 
                      value="Submit"
                      onClick={(e) => filterOffers(e, props.inputText)} />
                    <Button 
                      as="input" 
                      variant="secondary" 
                      type="reset" 
                      value="Reset"
                      onClick={() => setOffersState(props.initialOffers)} />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Filters
