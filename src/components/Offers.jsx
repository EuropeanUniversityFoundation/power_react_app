import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Filters from './Filters'
import OfferCard from './OfferCard'

/*import offersData from '../data/offers.json'*/

function Offers(props) {

  const endpoint = props.isPublic ? '/rest/public-pos' : '/rest/institution-pos'
  const [offers, setOffers] = useState([])
  const [initialOffers, setInitialOffers] = useState([])
  const [error, setError] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [inputText, setInputText] = useState("")

  const loadData = async () => {
    axios.get(process.env.REACT_APP_API_URL+endpoint)
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
      <Container className="d-flex align-items-center justify-content-center" style={{ "height" : "70vh" }}>
        <Spinner animation="border" role="status"></Spinner>
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
        <Row className="mt-4">
          <p className="fst-italic">{Object.keys(offers).length} offer(s) found</p>
        </Row>
        <Row className="mt-2">
          {offers.map((offer, index) => {
            return (
              <Col xs={12} md={12} xl={6} key={index}>
                <OfferCard isPublic={props.isPublic} offer={offer} />
              </Col>
            )
          })}
        </Row>
      </Container>
    )
  } 
}

export default Offers
