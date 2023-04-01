import React, { useState,useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { AutoComplete } from '../api/apiClient'


const SearchBar = ({searchWeather }) => {


  const initialresult = [{ id: 1, name: 'Auckland' }]
  const [searchResult, setSearchResult] = useState(initialresult)
  const [searchPlace, setSearchPlace] = useState('')

  const SubmitHandler = (e) => {
    e.preventDefault()
    searchWeather(searchPlace)
  }
  

  useEffect(() => {
  let timer
    if (searchPlace) {
      timer = setInterval(() => {
        console.log("update weatherCard weather every 60s");
    searchWeather(searchPlace)
   }, 60000);
    }
    return ()=> clearInterval(timer)
  },[searchPlace])


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

    let debounce
    if (string) {
      setSearchPlace(string)
    } else {
      setSearchPlace('')
    }
    //get search results array
    async function fetchData() {
      try {
     
        if (string) {
          const result = await AutoComplete(string)
          setSearchResult(() => result)
        } 
        }
       catch (error) {
        console.log(error.message)
      }
    }
    
    // fetchData()
    debounce = setTimeout(() => {
      clearTimeout(debounce)
      console.log("debounced");
      fetchData()
    }, 100);
   
  }

  const handleOnSelect = (item) => {
    searchWeather(item.name)
  }


  return (
    <div className="z-10 w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5 focus:outline-none">
      <form className="w-full" onSubmit={SubmitHandler}>
     
        <ReactSearchAutocomplete
          items={searchResult}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          formatResult={formatResult}
          onClear
          autoFocus
          styling={{fontSize:'18px', border:'none'}}
        />
      </form>
    </div>
  )
}

export default SearchBar
