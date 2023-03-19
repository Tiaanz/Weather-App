import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    
      <div className='relative min-h-screen'>
          <NavBar />
          {props.children}
      {/* props.children 代表Layout的标签体内容，也就是<Routes> */}
      <Footer />
    </div>
   
      
  )
}

export default Layout