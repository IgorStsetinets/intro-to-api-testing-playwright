import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const apiUrl = 'https://backend.tallinn-learning.ee/test-orders'
const validApiKey = '1234567890123456'
const validId = 1

test('Get order with valid id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Get order with max valid id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/10')
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Get order with id outside valid range should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with id below valid range should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with non-numeric id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/i')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with empty id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with negative id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/-1')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with alphanumeric id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1a')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order with floating point id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1.5')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT order with correct id and valid API key should return 200', async ({ request }) => {
  const response = await request.put(`${apiUrl}/${validId}`, {
    headers: { api_key: validApiKey },
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT order with id outside valid range should return 400', async ({ request }) => {
  const response = await request.put(`${apiUrl}/999`, {
    headers: { api_key: validApiKey },
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT order with empty id should return 400', async ({ request }) => {
  const response = await request.put(`${apiUrl}/`, {
    headers: { api_key: validApiKey },
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT order with non-numeric id should return 400', async ({ request }) => {
  const response = await request.put(`${apiUrl}/abc`, {
    headers: { api_key: validApiKey },
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('PUT order without api_key should return 401', async ({ request }) => {
  const response = await request.put(`${apiUrl}/${validId}`, {
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT order with invalid api_key should return 401', async ({ request }) => {
  const response = await request.put(`${apiUrl}/${validId}`, {
    headers: { api_key: 'invalidapikey' },
    data: {
      status: 'OPEN',
      courierId: 1,
      customerName: 'John Doe',
      customerPhone: '1234567890',
      comment: 'Updated order',
    },
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT order with invalid request body should return 400', async ({ request }) => {
  const response = await request.put(`${apiUrl}/${validId}`, {
    headers: { api_key: validApiKey },
    data: {
      status: 123,
      courierId: 'invalid',
      customerName: '',
      customerPhone: 'invalid',
      comment: '',
    },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete order with valid id should receive code 204', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/1`, {
    headers: { api_key: validApiKey },
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Delete order with id outside valid range should receive code 400', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/999`, {
    headers: { api_key: validApiKey },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete order with empty id should receive code 400', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/`, {
    headers: { api_key: validApiKey },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete order with non-numeric id should receive code 400', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/abc`, {
    headers: { api_key: validApiKey },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Delete order without api_key should receive code 401', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/1`)
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Delete order with invalid api_key should receive code 401', async ({ request }) => {
  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/1`, {
    headers: { api_key: 'invalidapikey' },
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
