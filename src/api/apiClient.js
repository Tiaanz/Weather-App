import request from 'superagent'

export async function getUserData() {
  const res = await request.get('/api/v1/users').accept('application/json')
  return res.body
}

export async function getUserByAuthId(authId) {
  const res = await request.get(`/api/v1/users/user-auth/${authId}`).accept('application/json')
  return res.body
}

export async function addUser(newUser) {
  await request.post('/api/v1/users').send(newUser)
}

export async function authUser(loggedUser) {
  const res = await request.post('/api/v1/users/login').send(loggedUser)
  return res.body
}



export async function addFavCity(id, city) {
  const res = await request.patch('/api/v1/users/favCity').send({ id, city })
  return res.body
}

export async function updateFavCity(id,city) {
  const res = await request.delete('/api/v1/users/favCity').send({ id, city })
  return res.body
}

export async function getFavCitiesById(id) {
  const res = await request
    .get(`/api/v1/users/user/${id}`)
    .accept('application/json')
  const cities=res.body.favCity.split(',')
  return cities
}

export async function getCityByGeocode(latitude, longitude) {
  const res = await request
    .get(
      `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&key=bdc_da3e425d786f42549d035c77017b6bd1`
    )
    .accept('application/json')
  console.log(res.body.city)
  return res.body.city
}

export async function getWeatherByCity(city) {
  const res = await request
    .get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`)
    .accept('application/json')
    .set('X-RapidAPI-Key', '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61')
    .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com')
  return res.body
}

export async function AutoComplete(input) {
  const res = await request
    .get(`https://weatherapi-com.p.rapidapi.com/search.json?q=${input}`)
    .accept('application/json')
    .set('X-RapidAPI-Key', '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61')
    .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com')
  return res.body
}

export async function getForecastByCity(cityname) {
  const res = await request
    .get(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityname}&days=3`
    )
    .accept('application/json')
    .set('X-RapidAPI-Key', '6cda750ddbmsh3e2d299b52be602p1f7255jsn589c028d6d61')
    .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com')
  return res.body
}
