
const iso3166 = require('./../data/iso3166_cc2name.json')

export function parseValue(value) {
  if(value == null || value === ""){
    return "Not provided"
  }
  return value
}

export function codeToName(code) {
  let countryName = iso3166[code] ? iso3166[code] : ""
  return countryName
}