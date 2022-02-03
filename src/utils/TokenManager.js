import axios from "axios"
import env from "react-dotenv"

const tough = require('tough-cookie')
const cookieJar = new tough.CookieJar()

export async function getToken() {
  // get the logged in status from the API endpoint
  const request = await axios.get(env.POWER_API_HOST+"/user/login_status?_format=json",
    { params: { user: env.POWER_USER, pass: env.POWER_PASS} }, { jar: cookieJar, withCredentials: true })
    .then(async response => {
      if(response.data) {
        // we are already logged in, all we need is a token
        return await axios.get(env.POWER_API_HOST+"/session/token",{
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