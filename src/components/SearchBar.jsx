import React from 'react'

const SearchBar = ({ searchPlace, setSearchPlace,searchWeather}) => {
  
  const SubmitHandler = (e) => {
    e.preventDefault()
    searchWeather(searchPlace)
  }

  return (
    <div className="w-full ">
      <form
        className="w-full flex justify-center"
        onSubmit={SubmitHandler}
      >
        <div className=" w-3/4 sm:w-3/5 md:w-2/4  lg:w-2/5 flex items-center relative">
          <input
            className=" h-10 px-5 pr-10 rounded-full w-full text-lg sm:text-xl focus:outline-none shadow"
            placeholder="Enter your city"
            type="text"
            value={searchPlace}
            onChange={(e) => setSearchPlace(e.target.value)}
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
    </div>
  )
}

export default SearchBar
