// tests/orders.spec.ts
import { expect, test } from '@playwright/test'
import { ApiClient } from '../apiClient'
import { OrderDto } from './dto/order-dto'

test('Creating an order using the API client', async ({ request }) => {
  const apiClient = new ApiClient(request)
  await apiClient.login() // Авторизация

  const orderResponse = await apiClient.createOrder(OrderDto.createOrderWithRandomData())
  expect(orderResponse.status()).toBe(200)

  const orderData = await orderResponse.json()
  expect(orderData).toHaveProperty('id') // Проверяем, что у созданного заказа есть ID
})

test('Authorization and receiving an order by ID using the API client', async ({ request }) => {
  const apiClient = new ApiClient(request)
  await apiClient.login()

  const orderResponse = await apiClient.createOrder(OrderDto.createOrderWithRandomData())
  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const getOrderResponse = await apiClient.getOrder(orderId)
  expect(getOrderResponse.status()).toBe(200)

  const fetchedOrderData = await getOrderResponse.json()
  expect(fetchedOrderData.id).toBe(orderId)
})

test('Authorization and deletion of an order by ID using the API client', async ({ request }) => {
  const apiClient = new ApiClient(request)
  await apiClient.login()

  const orderResponse = await apiClient.createOrder(OrderDto.createOrderWithRandomData())
  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const deleteResponse = await apiClient.deleteOrder(orderId)
  expect(deleteResponse.status()).toBe(200)
})
