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
      
        <ReactSearchAutocomplete
          items={searchResult}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          formatResult={formatResult}
          showIcon={false}
          autoFocus
          styling={{fontSize:'18px', border:'none'}}
        />
      </form>
    </div>
  )
}

export default SearchBar
