import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useParams, useLocation } from "react-router-dom"
import axios from 'axios'

function Offer(props) {

  const [error, setError] = useState(false)
  const [offer, setOffer] = useState([])
  const [initialOffer, setInitialOffer] = useState([])
  
  const params = useParams()
  const location = useLocation()
  const { isPublic } = location.state
  const endpoint = isPublic ? '/rest/public-pos/' : '/rest/institution-pos/'

  const loadData = async () => {
    const headers = {headers: {'api-key': process.env.REACT_APP_POWER_API_KEY}}
    axios.get(process.env.REACT_APP_API_URL+endpoint+params.id, headers)
    .then((res) => {
      console.log(res.data[0])
      setOffer(res.data[0])
      setInitialOffer(res.data[0])
    })
    .catch((error) => {
      setError(true)
    })
  }

  console.log("offer", offer)

  useEffect(() => {
    loadData()
  }, [])

  if (Object.keys(offer).length !== 0) {

    return (
      <div className="container">
        <Row className="mt-4">
          <div className="col-lg-8">
            <h5 className="text-secondary mt-3">Job details</h5>
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-primary">{offer.field_job_title}</h3>
                    <div className="row mt-2">
                      <div className="col-sm-12">
                        <i className="bi-building"></i>{offer.field_company_name}
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-sm-6 text-secondary">
                        <i className="bi-geo-alt"></i>{offer.field_job_city}, {offer.field_job_country}
                      </div>
                    </div>
                    <hr/>
                    <div className="row mt-3">
                      <div className="col-sm-12">
                        <h5>Job description</h5>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: offer.field_job_description
                      }}/>
                    </div>
                    <div className="row mt-3">
                      <div className="col-sm-12">
                        <h5>Responsibilities</h5>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: offer.field_job_responsibilities
                      }}/>
                    </div>
                    <div className="row mt-3">
                      <div className="col-sm-12">
                        <h5>Required skills</h5>
                      </div>
                     <div
                        dangerouslySetInnerHTML={{
                         __html: offer.field_applicant_required_skills
                     }}/>
                    </div>
                    <div className="row mt-3 mb-2">
                      <div className="col-sm-12">
                        <a href="mailto:applications@eucme.eu" className="btn btn-primary float-right">
                          <i className="bi-send"></i>Apply via email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <h5 className="text-secondary pt-3">General Information</h5>
            <Row>
              <div className="col-6">
                <i className="bi-eye" title="Public or this institution only"></i>Availability
              </div>
              <div className="col-6">
                This institution only
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-alarm"></i>Apply until
              </div>
              <div className="col-6">
                {offer.field_job_application_deadline}
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-calendar"></i>Duration
              </div>
              <div className="col-6">
                {offer.field_job_duration}
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-speedometer"></i>Commitment
              </div>
              <div className="col-6">
                {offer.field_job_commitment}
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-currency-exchange"></i>Compensation
              </div>
              <div className="col-6">
                {offer.field_job_compensation}
              </div>
            </Row>
            <h5 className="text-secondary mt-3">Contact information</h5>
            <Row>
              <div className="col-6">
                <i className="bi-person"></i>Name
              </div>
              <div className="col-6">
                {offer.field_contact_first_name}{" "}{offer.field_contact_last_name}
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-envelope"></i>Email
              </div>
              <div className="col-6">
                <a href={`mailto:${offer.field_contact_email}`}>{offer.field_contact_email}</a>
              </div>
            </Row>
            <Row>
              <div className="col-6">
                <i className="bi-telephone"></i>Phone
              </div>
              <div className="col-6">
                {offer.field_contact_phone_no}
              </div>
            </Row>
          </div>
        </Row>
        <div className="row mb-2">
          <div className="col-sm-12">
            <a href="#">
              <i className="bi-arrow-bar-left"></i>Back to list
            </a>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <Row className="mt-4">
          <p>{'Loading data...'}</p>
        </Row>
      </div>
    )
  }
}

export default Offer
