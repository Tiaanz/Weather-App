import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBar = ({ searchPlace, setSearchPlace, searchWeather }) => {
  const API_URL = 'https://weatherapi-com.p.rapidapi.com/search.json'

  const initialresult = [{ id: 1, name: 'Auckland' }]
  const [searchResult, setSearchResult] = useState(initialresult)

  const SubmitHandler = (e) => {
    e.preventDefault()
    searchWeather(searchPlace)
  }

  // function handleChange(e) {
  //   setSearchPlace(e.target.value)
  //   if (e.target.value === '') {
  //     setSearchResult(() => initialresult)
  //   }

  //   //get search results array
  //   async function fetchData() {
  //     try {
  //       if (e.target.value) {
  //         const response = await fetch(`${API_URL}?q=${e.target.value}`, {
  //           method: 'GET',
  //           headers: {
  //             'X-RapidAPI-Key':
  //               '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61',
  //             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  //           },
  //         })
  //         const result = await response.json()
  //         setSearchResult(() => result)
  //       }
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   fetchData()
  // }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.name}, {item.country}
        </span>
      </>
    )
  }

  const handleOnSearch = (string, results) => {
    if (string) {
      setSearchPlace(string)
    } else {
      setSearchPlace('')
    }

    // if (string === '') {
    //   setSearchResult(() => initialresult)
    // }

    //get search results array
    async function fetchData() {
      try {
        if (string) {
          const response = await fetch(`${API_URL}?q=${string}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':
                '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
          })
          const result = await response.json()
          setSearchResult(() => result)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }

  const handleOnSelect = (item) => {
    searchWeather(item.name)
  }



  return (
    <div className="w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5">
      <form className="w-full" onSubmit={SubmitHandler}>
        {/* <div className=" w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5 flex items-center relative"> */}
        {/* <input
            className=" h-12 px-5 pr-10 rounded-full w-full text-lg sm:text-xl focus:outline-none shadow-sm"
            placeholder="Enter your city"
            type="text"
            value={searchPlace}
            onChange={handleChange} />*/}

        <ReactSearchAutocomplete
          items={searchResult}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          formatResult={formatResult}
          showIcon={false}
          autoFocus
          styling={{fontSize:'18px', border:'none'}}
        />

        {/* // <button type="submit" className="absolute right-3">
          //   <svg */}
        {/* xmlns="http://www.w3.org/2000/svg" */}
        {/* //     fill="none" */}
        {/* //     viewBox="0 0 24 24" */}
        {/* //     strokeWidth={1.5} */}
        {/* //     stroke="currentColor" */}
        {/* //     className="w-8 h-8 text-slate-300" */}
        {/* //   > */}
        {/* //     <path */}
        {/* //       strokeLinecap="round" */}
        {/* //       strokeLinejoin="round" */}
        {/* //       d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" */}
        {/* //     /> */}
        {/* //   </svg> */}
        {/* // </button> */}
        {/* // </div> */}
      </form>
    </div>
  )
}

export default SearchBar
