import Keycloak from 'keycloak-js'

const initOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL_AUTH,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  onLoad: process.env.VUE_APP_KEYCLOAK_ON_LOAD,
  promiseType: 'native'
}

let keycloak = new Keycloak(initOptions);

export { keycloak, initOptions }