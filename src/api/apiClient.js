import request from 'superagent'

export async function getData() {
  const res = await request.get('/api/v1/users').accept('application/json')
  return res.body
}

export async function addUser(newUser) {
  await request.post('/api/v1/users').send(newUser)
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
