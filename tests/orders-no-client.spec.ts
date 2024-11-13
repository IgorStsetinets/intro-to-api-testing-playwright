// tests/orders-no-client.spec.ts
import { expect, test } from '@playwright/test'
import { OrderDto } from './dto/order-dto'
import { LoginDto } from './dto/login-dto'

test('Создание заказа без использования API-клиента', async ({ request }) => {
  // Авторизация
  const loginResponse = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(200)

  const token = (await loginResponse.text()).trim()

  // Создание заказа
  const orderResponse = await request.post('https://backend.tallinn-learning.ee/orders', {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  expect(orderResponse.status()).toBe(200)
  const orderData = await orderResponse.json()
  expect(orderData).toHaveProperty('id') // Проверка на наличие ID у заказа
})

test('Авторизация и получение заказа по ID без использования API-клиента', async ({ request }) => {
  const loginResponse = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(200)

  const token = (await loginResponse.text()).trim()

  const orderResponse = await request.post('https://backend.tallinn-learning.ee/orders', {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const getOrderResponse = await request.get(
    `https://backend.tallinn-learning.ee/orders/${orderId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  expect(getOrderResponse.status()).toBe(200)
  const fetchedOrderData = await getOrderResponse.json()
  expect(fetchedOrderData.id).toBe(orderId)
})

test('Авторизация и удаление заказа по ID без использования API-клиента', async ({ request }) => {
  const loginResponse = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: LoginDto.createLoginWithCorrectData(),
  })
  expect(loginResponse.status()).toBe(200)

  const token = (await loginResponse.text()).trim()

  const orderResponse = await request.post('https://backend.tallinn-learning.ee/orders', {
    headers: { Authorization: `Bearer ${token}` },
    data: OrderDto.createOrderWithRandomData(),
  })

  const orderData = await orderResponse.json()
  const orderId = orderData.id

  const deleteResponse = await request.delete(
    `https://backend.tallinn-learning.ee/orders/${orderId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  expect(deleteResponse.status()).toBe(200)
})
