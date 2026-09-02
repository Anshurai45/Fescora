import { json } from './_mail.js'

export default function handler(_req, res) {
  return json(res, 200, { ok: true, service: 'fescora-api' })
}
