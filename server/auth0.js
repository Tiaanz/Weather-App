
const jwt = require('express-jwt').expressjwt;
const jwks=require('jwks-rsa')


const domain = 'https://dev-rn6pqzyqjn0t0s3v.us.auth0.com'
const audience = 'https://weather-user/api'

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

module.exports= checkJwt



