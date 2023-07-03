# Weather App

This is a weather app bootstrapped with `create-react-app`.

<img src="public/weather.png" alt="beehive" width="800" height="400">


## Tech Stack

- React
- Tailwind CSS
- Auth0
- SQLite3
- External WeatherAPI
- Express.js
- RESTful API

## Features

- Real-time weather app
- Authentication and authorisation with Auth0
- Fetch weather data from external weather API
- Autocomplete search bar
- Background changes based on the weather
- Weather forecast within the next 3 days
- Add favorite city to your account

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Tiaanz/Weather-App.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Initialise the database

```bash
npm run knex migrate:latest
npm run knex seed:run
```

### 4. Run the application

```bash
npm start
```

### 5. Run the server (go to the server directory)

```bash
npm start
```

