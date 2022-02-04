import axios from "axios"

const tough = require('tough-cookie')
const cookieJar = new tough.CookieJar()

export async function getToken() {
  // get the logged in status from the API endpoint
  const request = await axios.get(process.env.REACT_APP_API_URL+"/user/login_status?_format=json",
    { data: { user: process.env.REACT_APP_POWER_USER, pass: process.env.REACT_APP_POWER_PASS} }, { jar: cookieJar, withCredentials: true })
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
        // we are not logged in, return another message
        return 403
      }
    })
    .catch(error => {
      console.log("error", error)
      return 0;
    })
  return { payload: request, cookieJar: cookieJar }
}