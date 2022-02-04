import { useState, useEffect } from 'react'
import { getToken } from './utils/TokenManager.js'
import axios from 'axios'

import Offers from './components/Offers'

import offers from './data/offers.json'

import './App.css'

function App() {

  const loadData = async () => {
    return getToken().then(token => {
      // get the token
      if(token.payload !== 403) {
        const jar = {jar: token.cookieJar, withCredentials: true };
        const headers = {headers: { 'X-CSRF-Token': token.payload }};
        axios.get(process.env.REACT_APP_API_URL+"/rest/public-pos", jar, headers)
        .then((res) => {
          console.log("res.data", res.data)
        })
      } else {
        console.log("Not authorised")
      }
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="App">
      <Offers offers={offers} />
    </div>
  );
}

export default App;
