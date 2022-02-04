

function Offers(props) {
  return (
    <div className="container">
      <div className="row mt-3">
        {props.offers.map((offer, index) => {
          return (
            <div className="col-sm-12 col-md-6" key={index}>      
              <div className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title text-primary">Junior CEO</h3>
                  <div className="row mt-2">            
                    <div className="col-sm-12">
                      <i className="bi-building"></i>{offer.field_company_name}
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12 text-secondary">
                      <i className="bi-geo-alt"></i>{offer.field_job_city}
                    </div>  
                  </div>          
                  <div className="row mt-3">            
                    <div className="col-sm-6">
                      <i className="bi-alarm" title="Application deadline"></i>{offer.field_job_application_deadline}
                    </div>
                    <div className="col-sm-6">
                      <i className="bi-calendar" title="Duration"></i>{offer.field_job_duration}
                    </div>  
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <div
                        dangerouslySetInnerHTML={{
                              __html: offer.field_job_description
                      }}/>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <a href="#" className="link-primary">Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Offers
