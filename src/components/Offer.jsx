import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { parseValue } from '../utils/Utils.js'
import { useNavigate } from 'react-router-dom'

function Offer(props) {

  const [error, setError] = useState(false)
  const [offer, setOffer] = useState([])
  
  const params = useParams()
  const endpoint = '/rest/po/'

  let navigate = useNavigate()

  const loadData = async () => {
    axios.get(process.env.REACT_APP_API_URL+endpoint+params.id)
    .then((res) => {
      if(res.data[0]) {
        setOffer(res.data[0])
      } else {
        navigate("/")
      }
    })
    .catch((error) => {
      setError(true)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  if(error) {
    return (
      <div className="container">
        <Row className="mt-4">
          <p>{'Error on loading data. Try again later'}</p>
        </Row>
      </div>
    )
  }

  if (Object.keys(offer).length !== 0) {

    return (
      <div className="container">
        <Row className="mt-4">
          <Col sm={12}>
            <Link to={"/"}>
              <i className="bi-chevron-left"></i>Back to list
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={8}>
            <h5 className="text-secondary mt-3 mb-4">Job details</h5>
            <Row>
              <Col sm={12} md={12}>
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    {offer.field_job_category ?
                      (<Row className="mt-1 mb-2">
                        <Col sm={12}>
                          <span className="text-uppercase">{offer.field_job_category}</span>
                        </Col>
                      </Row>) : null
                    }
                    <h3 className="card-title mt-1 mb-2">{parseValue(offer.field_job_title)}</h3>

                    <Row>
                      <Col sm={6} className="mb-2">
                        <i className="bi-building"></i>{parseValue(offer.field_company_name)}
                      </Col>
                    </Row>

                    <Row className="text-secondary">
                      <Col sm={6} className="mb-2">
                        {offer.field_job_city && offer.field_job_country ?
                          (<><i className="bi-geo-alt"></i>{offer.field_job_city}, {offer.field_job_country}</>) : 
                          ("Not provided")
                        }
                      </Col>
                    </Row>
                    
                    <Row className="mt-3">
                      <Col sm={12} >
                        <h5>Job description</h5>
                      </Col>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseValue(offer.field_job_description)
                      }}/>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={12}>
                        <h5>Responsibilities</h5>
                      </Col>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseValue(offer.field_job_responsibilities)
                      }}/>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={12}>
                        <h5>Required skills</h5>
                      </Col>
                     <div
                        dangerouslySetInnerHTML={{
                         __html: parseValue(offer.field_applicant_required_skills)
                     }}/>
                    </Row>
                    <Row className="mt-2">
                      <Col sm={12}>
                        <h5>How to apply</h5>
                      </Col>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseValue(offer.field_how_to_apply)
                      }}/>
                    </Row>
                    {offer.field_contact_email ?
                      (<Row className="mt-4 mb-2">
                        <Col sm={12}>
                          <a href={`mailto:${offer.field_contact_email}`} className="btn btn-primary float-right">
                            <i className="bi-send"></i>Apply
                          </a>
                        </Col>
                      </Row>) : null
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <h5 className="text-secondary pt-3 mb-4">General Information</h5>
            <Row className="mb-1">
              <Col>
                <i className="bi-eye me-1" title="Public or this institution only"></i>Availability
              </Col>
              <Col>
                {offer.field_target_institution === "" ? "Public" : offer.field_target_institution}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <i className="bi-clock me-1"></i>Deadline
              </Col>
              <Col>
                {parseValue(offer.field_job_application_deadline)}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <i className="bi-calendar-event me-1"></i>Duration
              </Col>
              <Col>
                {parseValue(offer.field_job_duration)}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <i className="bi-speedometer me-1"></i>Commitment
              </Col>
              <Col>
                {parseValue(offer.field_job_commitment)}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <i className="bi-currency-exchange me-1"></i>Compensation
              </Col>
              <Col>
                {parseValue(offer.field_job_compensation)}
              </Col>
            </Row>
            <h5 className="text-secondary mt-4">Contact information</h5>
            <Row className="mb-1">
              <Col>
                <i className="bi-person me-1"></i>Name
              </Col>
              <Col>
                {offer.field_contact_first_name && offer.field_contact_last_name ?
                  (<span>{offer.field_contact_first_name}{" "}{offer.field_contact_last_name}</span>) :
                  ("Not provided")
                }
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <i className="bi-envelope me-1"></i>Email
              </Col>
              <Col>
                {offer.field_contact_email ?
                  (<a href={`mailto:${offer.field_contact_email}`}>{offer.field_contact_email}</a>) : 
                  ("Not provided")
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <i className="bi-telephone me-1"></i>Phone
              </Col>
              <Col>
                {parseValue(offer.field_contact_phone_no)}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
      <div className="container">
        <Row className="mt-5">
          <p>{'Loading data...'}</p>
        </Row>
      </div>
    )
  }
}

export default Offer
