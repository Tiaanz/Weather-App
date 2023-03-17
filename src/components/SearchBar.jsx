import React, { useState } from 'react'

const SearchBar = ({ searchPlace, setSearchPlace, searchWeather }) => {
  const API_URL = 'https://weatherapi-com.p.rapidapi.com/search.json'

  const [dropdown, setDropDown] = useState('none')
  const [searchResult, setSearchResult] = useState(null)
  const [focusBg, setFocusBg] = useState('white')

  const SubmitHandler = (e) => {
    e.preventDefault()
    searchWeather(searchPlace)
    setDropDown(() => 'none')
  }

  function handleChange(e) {
    setSearchPlace(e.target.value)
    if (e.target.value !== '') {
      setDropDown(() => 'block')
    } else {
      setDropDown(() => 'none')
      setSearchResult(() => null)
    }

    async function fetchData() {
      try {
        if (e.target.value) {
          const response = await fetch(`${API_URL}?q=${e.target.value}`, {
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

  return (
    <div className="w-full ">
      <form className="w-full flex justify-center" onSubmit={SubmitHandler}>
        <div className=" w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5 flex items-center relative">
          <input
            className=" h-12 px-5 pr-10 rounded-full w-full text-lg sm:text-xl focus:outline-none shadow-sm"
            placeholder="Enter your city"
            type="text"
            value={searchPlace}
            onChange={handleChange}
          />
          <button type="submit" className="absolute right-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center">
        <div
          style={{ display: `${dropdown}` }}
          className=" px-5 pr-10 w-3/4 sm:w-3/5 md:w-2/4 lg:w-2/5 rounded-lg bg-white"
        >
          <div className='flex flex-col'>
            {searchResult !== null &&
              searchResult.map((result) => (
                <input
                  className="hover:bg-blue-200 focus:outline-none mb-1 font-light lg:text-xl p-1 text-zinc-600"
                  key={result.id}
                  value={result.name + ', ' + result.country}
                  readOnly
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
