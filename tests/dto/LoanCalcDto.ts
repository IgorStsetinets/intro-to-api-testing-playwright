export class LoanCalcDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createLoanCalcDtoWithValidRandomData(): LoanCalcDto {
    return new LoanCalcDto(
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createLoanCalcDtoWithIncomeBoundaryPosValueHighRisk(): LoanCalcDto {
    return new LoanCalcDto(1, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 3)
  }

  static createLoanCalcDtoWithDeptBoundaryPosValueMediumRisk(): LoanCalcDto {
    return new LoanCalcDto(10, 0, Math.floor(Math.random() * (90 - 17 + 1)) + 17, true, 1, 9)
  }

  static createLoanCalcDtoWithAgeBoundaryPosValueLowRisk(): LoanCalcDto {
    return new LoanCalcDto(100, 0, 17, true, 1, 12)
  }

  static createLoanCalcDtoWithNegativeIncomeValue(): LoanCalcDto {
    return new LoanCalcDto(
      -1,
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createLoanCalcDtoWithIncorrectDebtValue(): LoanCalcDto {
    return new LoanCalcDto(
      Math.floor(Math.random() * 100 + 1),
      -1,
      Math.floor(Math.random() * (90 - 17 + 1)) + 17,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }

  static createLoanCalcDtoWithAgeBoundaryNegValue(): LoanCalcDto {
    return new LoanCalcDto(
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * 100),
      0,
      true,
      Math.floor(Math.random() * 100 + 1),
      Math.floor(Math.random() * (36 - 3 + 1)) + 3,
    )
  }
}
