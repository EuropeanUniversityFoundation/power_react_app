import { Container, Alert } from 'react-bootstrap'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Offer from './components/Offer'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <main className="flex-grow-1 pb-5">
        <Container>
          <h1 className="pt-5 pb-3">POWER App</h1>
          <p className="pb-3">This application displays the Placement Opportunities submitted to the POWER platform.</p>
          
          <Router>
            <Routes>
              <Route path="/offer/:offerId" element={<Offer />} />
              <Route index element={<Home />}/>
            </Routes>
          </Router>

          <Alert key={"app"} variant={"success"}>
            Visit the application <a href="https://github.com/EuropeanUniversityFoundation/power_react_app" target="_blank" rel="noreferrer" className="link-success">GitHub repository</a> for more information.
          </Alert>
          <Alert key={"middleware-link"} variant={"success"}>
            Connected to the middleware at <a href={process.env.REACT_APP_API_URL} target="_blank" rel="noreferrer" className="link-success">{process.env.REACT_APP_API_URL}</a>.
          </Alert>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
