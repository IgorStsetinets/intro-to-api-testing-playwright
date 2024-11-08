import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalcDto } from './dto/loan-calc-dto'

test.describe('tests for POST/loan-calc/decision', () => {
  test('Send call with all valid data, should receive code 200', async ({ request }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithValidRandomData()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const responseBody = await response.json()
    console.log('request body:', requestBody)
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBeDefined()
    expect.soft(responseBody.riskPeriods).toBeDefined()
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with income boundary value and loanPeriod: 3, should receive riskLevel: High risk', async ({
    request,
  }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithIncomeBoundaryPosValueHighRisk()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const responseBody = await response.json()
    console.log('request body:', requestBody)
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('High Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([3, 6]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with dept boundary value and loanPeriod: 9, should receive riskLevel: Medium risk', async ({
    request,
  }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithDeptBoundaryPosValueMediumRisk()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const responseBody = await response.json()
    console.log('request body:', requestBody)
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([6, 9, 12]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call with age boundary value and loanPeriod: 12, should receive riskLevel: Low risk', async ({
    request,
  }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithAgeBoundaryPosValueLowRisk()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const responseBody = await response.json()
    console.log('request body:', requestBody)
    console.log('response body:', await response.json())
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskScore).toBeDefined()
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
    expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([12, 18, 24, 36]))
    expect.soft(responseBody.applicationId).toBeDefined()
    expect.soft(responseBody.riskDecision).toBeDefined()
  })

  test('Send call without request body should receive code 400', async ({ request }) => {
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    )
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with negative income value, should receive code 400', async ({ request }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithNegativeIncomeValue()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    console.log('request body:', requestBody)
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with incorrect debt boundary value, should receive code 400', async ({
    request,
  }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithIncorrectDebtValue()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    console.log('request body:', requestBody)
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Send call with incorrect age boundary value, should receive code 400', async ({
    request,
  }) => {
    const requestBody = LoanCalcDto.createLoanCalcDtoWithAgeBoundaryNegValue()
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    console.log('request body:', requestBody)
    console.log('response headers:', response.headers())
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})
