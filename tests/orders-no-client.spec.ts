import { expect, test } from '@playwright/test'
import { OrderDto } from './dto/order-dto'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'

const BaseUrl = 'https://backend.tallinn-learning.ee'
const LoginEndPoint = '/login/student'
const OrdersEndPoint = '/orders'

test('Creating an order without using the API client', async ({ request }) => {
  const loginResponse = await request.post(`${BaseUrl}${LoginEndPoint}`, {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)

  const token = (await loginResponse.text()).trim()

  const orderResponse = await request.post(`${BaseUrl}${OrdersEndPoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  expect(orderResponse.status()).toBe(StatusCodes.OK)
  const orderData = await orderResponse.json()
  expect(orderData).toHaveProperty('id')
})

test('Authorization and receiving an order by ID without using an API client', async ({
  request,
}) => {
  const loginResponse = await request.post(`${BaseUrl}${LoginEndPoint}`, {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)

  const token = (await loginResponse.text()).trim()

  const orderResponse = await request.post(`${BaseUrl}${OrdersEndPoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const getOrderResponse = await request.get(`${BaseUrl}${OrdersEndPoint}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
  const fetchedOrderData = await getOrderResponse.json()
  expect(fetchedOrderData.id).toBe(orderId)
})

test('Authorization and deletion of an order by ID without using an API client', async ({
  request,
}) => {
  const loginResponse = await request.post(`${BaseUrl}${LoginEndPoint}`, {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)

  const token = (await loginResponse.text()).trim()

  const orderResponse = await request.post(`${BaseUrl}${OrdersEndPoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const deleteResponse = await request.delete(`${BaseUrl}${OrdersEndPoint}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(deleteResponse.status()).toBe(StatusCodes.OK)
})
