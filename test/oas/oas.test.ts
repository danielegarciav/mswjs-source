import fetch from 'cross-fetch'
import { fromOpenAPI } from 'src/oas/fromOpenAPI'
import { withMocks } from '../support/withMocks'

it('supports explicit "example" JSON in the response schema', async () => {
  const document = require('./fixtures/response-example.json')
  const handlers = await fromOpenAPI(document)

  const res = await withMocks(handlers, () => {
    return fetch('http://oas.source.com/user')
  })

  expect(res.status).toBe(200)
  expect(res.headers.get('content-type')).toBe('application/json')
  expect(await res.json()).toEqual({
    id: 'abc-123',
    firstName: 'John',
    lastName: 'Maverick',
  })
})
