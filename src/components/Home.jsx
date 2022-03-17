import { useState } from 'react'
import Offers from './Offers'
import { Row, Tabs, Tab } from 'react-bootstrap'

import '../App.css'

function Home() {

  const [key, setKey] = useState('public')

  return (
    <div className="App">
      <div className="container">
        <Row className="mt-5">
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
      </div>
    </div>
  )
}

export default Home
