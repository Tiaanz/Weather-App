import React,{useState,useEffect} from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

import weatherImg from '../data/weather.json'

const Layout = ({children,weatherObj,bgImg,setBgImg,bgColor,setBgColor,loggedName,setLoggedName}) => {
 
  
  useEffect(() => {
    if (bgImg) {
      if (weatherObj.condition.includes('Sunny')) {
     
        setBgImg("url('bg-photos/sunny.jpg')")
      } else if (weatherObj.condition.includes('rain')) {
   
        setBgImg("url('bg-photos/rain.jpg')")
      } else if (weatherObj.condition.toLowerCase().includes('cloudy')) {
     
        setBgImg("url('bg-photos/cloudy.jpg')")
      } else if (weatherObj.condition.includes('Overcast')) {
    
        setBgImg("url('bg-photos/overcast.jpg')")
      } else if (weatherObj.condition.includes('snow')) {
   
        setBgImg("url('bg-photos/snow.jpg')")
      } else if (weatherObj.condition.includes('Clear')) {
    
        setBgImg("url('bg-photos/clear.jpg')")
      } else if (weatherObj.condition === " ") {
        setBgImg("url('bg-photos/bgImg.png')")
      }
    } else {
      setBgColor(bgColor)
    }
      
  }, [weatherObj.condition,bgColor,bgImg])


  return (
    
      <div className="relative min-h-screen bg-cover" style={{ backgroundImage: bgImg,backgroundColor:bgColor }}>
      <NavBar loggedName={loggedName} setLoggedName={setLoggedName} />
          {children}
      {/* props.children 代表Layout的标签体内容，也就是<Routes> */}
      <Footer />
    </div>
   
      
  )
}

export default Layout