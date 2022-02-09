import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function Offers(props) {

  const endpoint = props.isPublic ? '/rest/public-pos' : '/rest/institution-pos'
  const [offers, setOffers] = useState([])
  const [initialOffers, setInitialOffers] = useState([])
  const [error, setError] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [inputText, setInputText] = useState("")

  const loadData = async () => {
    const headers = {headers: {'api-key': process.env.REACT_APP_POWER_API_KEY}}
    axios.get(process.env.REACT_APP_API_URL+endpoint, headers)
    .then((res) => {
      setOffers(res.data)
      setInitialOffers(res.data)
    })
    .catch((error) => {
      setError(true)
    })
  }

  const filterOffers = (e, value) => {
    e.preventDefault()
    if(value !== "") {
      const newOffers = offers.filter(offer => {
        return offer.field_job_title.includes(value)
      })
      setOffers(newOffers)
      setFiltered(true)
    } else {
      setOffers(initialOffers)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if(error) {
    return (
      <div className="container">
        <Row className="mt-4">
          <p>{'Error on loading offers. Try again later'}</p>
        </Row>
      </div>
    )
  }

  if (Object.keys(offers).length === 0 && !filtered) {
    return (
      <div className="container">
        <Row className="mt-4">
          <p>{'Loading offers...'}</p>
        </Row>
      </div>
    )
  }

  if (Object.keys(offers).length === 0 && filtered) { 
    return (
      <div className="container">
        <Row className="mt-4">
          <Form onSubmit={(e) => filterOffers(e, inputText)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Col xs={12} className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter text"
                    onChange={(e) => setInputText(e.target.value)} />
                </Col>
                <Col>
                  <Button 
                    as="input" 
                    type="reset" 
                    value="Reset"
                    onClick={(e) => setOffers(initialOffers)} />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>
        <Row className="mt-5">
          <p>{'No offers to show'}</p>
        </Row>
      </div>
    )
  }

  if (Object.keys(offers).length !== 0) {
    return (
      <div className="container">
        <Row className="mt-4">
          <Form onSubmit={(e) => filterOffers(e, inputText)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row >
                <Col xs={12} className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter text"
                    onChange={(e) => setInputText(e.target.value)} />
                </Col>
                <Col>
                  <Button 
                    as="input" 
                    type="reset" 
                    value="Reset"
                    onClick={(e) => setOffers(initialOffers)} />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>
        <Row className="mt-3">
          {offers.map((offer, index) => {
            return (
              <Col sm={12} md={6} key={index}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">{offer.field_job_title}</h3>
                    <Row className="mt-2">            
                      <Col sm={12}>
                        <i className="bi-building"></i>{offer.field_company_name}
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col sm={12} className="text-secondary">
                        <i className="bi-geo-alt"></i>{offer.field_job_city}
                      </Col>  
                    </Row>          
                    <Row className="mt-3">            
                      <Col sm={6}>
                        <i className="bi-alarm" title="Application deadline"></i>{offer.field_job_application_deadline}
                      </Col>
                      <Col sm={6}>
                        <i className="bi-calendar" title="Duration"></i>{offer.field_job_duration}
                      </Col>  
                    </Row>
                    <Row className="mt-3">
                      <Col sm={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: offer.field_job_description
                        }}/>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={12}>
                        <a href="#" className="link-primary float-end">Details</a>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  } 
}

export default Offers
