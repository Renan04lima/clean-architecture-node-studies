import { EmailValidation } from '@/validation/validators/email-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email',makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(
      validations
    )
  })
})