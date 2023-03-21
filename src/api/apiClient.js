import request from 'superagent'

export async function getData() {
  const res = await request.get('/api').accept('application/json')
  return res.body
}
