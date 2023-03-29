import { Container } from 'react-bootstrap'
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
    <div className="App">
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path="/offer/:offerId" element={<Offer />} />
            <Route index element={<Home />}/>
          </Routes>
        </Router>
      </Container>
      <Footer />
    </div>
  )
}

export default App
