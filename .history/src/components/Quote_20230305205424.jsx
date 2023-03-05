import React from 'react'
import quotes from '../data/quotes.json' 



const randomIndex=getRandomIndex(quotes.quotes)
const quote=quotes.quotes[randomIndex].quote
const author=quotes.quotes[randomIndex].author


function getRandomIndex(arr) {
  const index=Math.floor(Math.random()*arr.length)
  return index
}

const Quote = () => {



  return (
    <div className="my-10 px-10 w-3/4 sm:w-3/5 md:w-2/4 lg:w-2/5 min-w-fit font-quote">
    <p className="text-3xl my-12 text-center">{quote}</p>
    <p className="text-4xl text-right">--{author}</p>
    </div>
  )
}

export default Quote