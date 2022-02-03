import { useState, useEffect } from 'react'
import { getToken } from './utils/TokenManager.js'
import axios from 'axios'
import env from "react-dotenv"

import Offers from './components/Offers'

import './App.css';

function App() {

  const loadData = async () => {
    return getToken().then(token => {
      // get the token
      if(token.payload !== 403) {
        axios.get(env.POWER_API_HOST+"/rest/public-pos")
        .then((res) => {
          console.log("res.data", res.data)
        })
      } else {
        console.log("Not authorised")
      }
    })
  }

  useEffect(() => {
    console.log("env", env)
    loadData()
  }, [])

  return (
    <div className="App">
      <Offers/>
    </div>
  );
}

export default App;
