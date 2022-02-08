import { useState, useEffect } from 'react'
import axios from 'axios'
import Offers from './components/Offers'

import './App.css'

function App() {

  const [apiData, setApiData] = useState([])

  const loadData = async () => {
    const headers = {headers: {'api-key': process.env.REACT_APP_POWER_API_KEY}}
    axios.get(process.env.REACT_APP_API_URL+"/rest/public-pos", headers)
    .then((res) => {
      setApiData(res.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="App">
      <Offers offers={apiData} />
    </div>
  );
}

export default App;
