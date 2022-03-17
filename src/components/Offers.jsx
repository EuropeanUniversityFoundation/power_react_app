import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Filters from './Filters'

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

    // Escape backslash
    let string = value.replace(/\\/g, "\\\\")

    if(string.trim() !== "") {
      const newOffers = initialOffers.filter(offer => {
        const name = (offer.field_job_title.toLowerCase().search(string.toLowerCase()) !== -1)
        const city = (offer.field_job_city.toLowerCase().search(string.toLowerCase()) !== -1)
        const country = (offer.field_job_country.toLowerCase().search(string.toLowerCase()) !== -1)
        return name || city || country
      })
      setOffers(newOffers)
      setFiltered(true)
    } else {
      setOffers(initialOffers)
      setInputText("")
    }
  }

  const changeValue = (input) => {
    setInputText(input)
  }

  const setOffersState = (offersArray) => {
    setOffers(offersArray)
  }

  useEffect(() => {
    loadData()
  }, [])

  if(error) {
    return (
      <Container>
        <Row className="mt-4">
          <p>{'Error on loading offers. Try again later'}</p>
        </Row>
      </Container>
    )
  }

  if (Object.keys(offers).length === 0 && !filtered) {
    return (
      <Container>
        <Row className="mt-4">
          <p>{'Loading offers...'}</p>
        </Row>
      </Container>
    )
  }

  if (Object.keys(offers).length === 0 && filtered) { 
    return (
      <Container>
        <Filters 
          filterOffers={filterOffers} 
          initialOffers={initialOffers}
          setOffersState={setOffersState}
          changeValue={changeValue}
          inputText={inputText} />
        <Row className="mt-5">
          <p>{'No offers to show'}</p>
        </Row>
      </Container>
    )
  }

  if (Object.keys(offers).length !== 0) {
    return (
      <Container className="mt-4">
        <Filters 
          filterOffers={filterOffers} 
          initialOffers={initialOffers}
          setOffersState={setOffersState}
          changeValue={changeValue}
          inputText={inputText} />
        <Row className="mt-5">
          {offers.map((offer, index) => {
            return (
              <Col xs={12} md={6} xl={6} key={index}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="card-top">
                      <Card.Title as="h3">{offer.field_job_title}</Card.Title>
                      <Row className="mt-1">
                        <Col sm={12} className="text-secondary">
                          <i className="bi-geo-alt"></i>{offer.field_job_city}
                        </Col>
                      </Row>
                    </div>
                    <div className="card-middle flex-grow-1 mt-3">
                      <Row>
                        <Col sm={12}>
                          <i className="bi-building"></i>{offer.field_company_name}
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
                    </div>
                    <div className="card-middle mt-1">
                      <Row className="mt-3">
                        <Col sm={12}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: offer.field_job_description
                          }}/>
                        </Col>
                      </Row>
                    </div>
                    <div className="card-bottom mt-1">
                      <Row className="mt-2">
                        <Col sm={12}>
                          <Link 
                            to={`/offer/${offer.nid}`}
                            state={{ isPublic: props.isPublic }} 
                            className="link-primary float-end">
                              Details
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    )
  } 
}

export default Offers
