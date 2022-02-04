import axios from 'axios'

const tough = require('tough-cookie')
const cookieJar = new tough.CookieJar()

export async function getToken() {
  // get the logged in status from the API endpoint
  const request = await axios.get(process.env.REACT_APP_API_URL+"/user/login_status?_format=json",
    { name: process.env.REACT_APP_POWER_USER, pass: process.env.REACT_APP_POWER_PASS}, { jar: cookieJar, withCredentials: true })
    .then(async response => {
      if(response.data) {
        // we are already logged in, all we need is a token
        return await axios.get(process.env.REACT_APP_API_URL+"/session/token",{
          jar: cookieJar, withCredentials: true })
          .then(tokenResponse => {
            // return the token
            return tokenResponse.data
          })
          .catch(error => {
            return 0
          })
      } else {
        // we are not logged in, so lets do that
        return await axios.post(process.env.REACT_APP_API_URL+"/user/login?_format=json",
          { name: process.env.REACT_APP_POWER_USER, pass: process.env.REACT_APP_POWER_PASS}, {
          jar: cookieJar, withCredentials: true })
          .then(loginResponse => {
            //return the token from login
            return loginResponse.data.csrf_token;
          })
          .catch(error => {
            return 0;
          });
      }
    })
    .catch(error => {
      console.log("error", error)
      return 0;
    })
  return { payload: request, cookieJar: cookieJar }
}