import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { codeToName } from '../utils/Utils.js'

function OfferCard(props) {

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <div className="card-top">
          {props.offer.field_job_category ?
            (<Row className="mb-2">
              <Col sm={12} className="text-secondary text-uppercase">
                {props.offer.field_job_category}
              </Col>
            </Row>) : null
          }
          <Card.Title as="h3">{props.offer.field_job_title}</Card.Title>
        </div>
        <div className="card-middle justify-content-between flex-grow-1 mt-2">
          <Row className="mb-1">
            <Col sm={12}>
              <i className="bi-building me-1"></i>{props.offer.field_company_name}
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="text-secondary">
              <i className="bi-geo-alt"></i>{props.offer.field_job_city}, {codeToName(props.offer.field_job_country)}
            </Col>
          </Row>
          
          <Row className="mt-3">
            <Col sm={6}>
              <i className="bi-clock me-1" title="Application deadline"></i>{props.offer.field_job_application_deadline}
            </Col>
            <Col sm={6}>
              <i className="bi-calendar-event me-1" title="Duration"></i>{props.offer.field_job_duration}
            </Col>  
          </Row>

          <Row className="mt-5">
            <Col sm={12}>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.offer.field_job_description
              }}/>
            </Col>
          </Row>
        </div>
        <div className="card-bottom mt-2">
          <Row className="mt-2">
            <Col sm={12}>
              <Link 
                to={`/offer/${props.offer.nid}`}
                state={{ isPublic: props.isPublic }} 
                className="link-primary fw-bold float-end">
                  Details
              </Link>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}

export default OfferCard
