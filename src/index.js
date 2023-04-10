//引入React核心库
import React from 'react'
//引入ReactDom
import ReactDom from 'react-dom/client'
//引入APP组件
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

//v18版本
const root = ReactDom.createRoot(document.getElementById('root')) //创建虚拟DOM的插入节点，即原生DOM的节点
const element = (
  <Auth0Provider
    domain={'dev-rn6pqzyqjn0t0s3v.us.auth0.com'}
    clientId={'sZkqgyKkJ0lzBCvotHziDv6U9VdrL5MK'}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/profile`,
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
) //声明组件
root.render(element) //渲染组件到页面， 虚拟DOM到原生DOM
