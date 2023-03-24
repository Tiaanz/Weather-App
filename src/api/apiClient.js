import request from 'superagent'

export async function getData() {
  const res = await request.get('/api/v1/users').accept('application/json')
  return res.body
}

export async function addUser(newUser) {
  await request.post('/api/v1/users').send(newUser)
}