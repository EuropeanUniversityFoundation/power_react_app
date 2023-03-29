import { useState, useEffect } from 'react'
import Offers from './Offers'
import { Row, Tabs, Tab, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

import '../App.css'

function Home() {

  const [key, setKey] = useState('public')
  const [show, setShow] = useState(true)

  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    navigate(location.pathname, {})
  }, [])

  return (
    <Row className="my-5">
      { location.state && show ?
        (<Alert 
          key={"warning"} 
          variant={"warning"}
          onClose={() => setShow(false)} 
          dismissible>
            {location.state}
          </Alert>
        ) : null
      }
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        unmountOnExit={true}
      >
        <Tab eventKey="public" title="Public">
          <Offers isPublic={true} />
        </Tab>
        <Tab eventKey="institution" title="Institution">
          <Offers isPublic={false} />
        </Tab>
      </Tabs>
    </Row>
  )
}

export default Home
