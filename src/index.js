import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'


const root = ReactDom.createRoot(document.getElementById('root')) //创建虚拟DOM的插入节点，即原生DOM的节点
const element = (
  <Auth0Provider
    domain={'dev-rn6pqzyqjn0t0s3v.us.auth0.com'}
    clientId={'sZkqgyKkJ0lzBCvotHziDv6U9VdrL5MK'}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/profile`,
      audience:'https://weather-user/api'
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
) 
root.render(element) 
