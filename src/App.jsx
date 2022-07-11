import Home from './components/Home'
import Offer from './components/Offer'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/offer/:offerId" element={<Offer />} />
        <Route index element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
