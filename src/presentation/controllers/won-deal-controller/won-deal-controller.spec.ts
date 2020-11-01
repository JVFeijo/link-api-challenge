import { IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { DbError } from '@/infra/db/error/db-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { WonDealRequest } from '@/presentation/protocols/requests/won-deal-request'
import { IValidation } from '@/presentation/protocols/validation'
import { ValidationError } from '@/presentation/validation/validation'
import { err, Result, success } from '@/utils/types/result'
import { makeAddDealStub } from '../../tests/usecases/make-add-deal-stub'
import { WonDealController } from './won-deal-controller'

interface SutTypes {
  validationStub: IValidation<WonDealRequest>
  addDealStub: IAddDeal
  sut: WonDealController
}

const mockWonDealRequest = (): WonDealRequest => {
  return {
    current: {
      id: 1,
      title: 'Teste',
      person_name: 'some_name',
      value: 100,
      status: 'won',
      won_time: new Date()
    }
  }
}

const makeValidationStub = (): IValidation<WonDealRequest> => {
  class ValidationStub implements IValidation<WonDealRequest> {
    validate (input: any): Result<WonDealRequest, ValidationError> {
      return success(mockWonDealRequest())
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const addDealStub = makeAddDealStub()
  const validationStub = makeValidationStub()
  const sut = new WonDealController(validationStub, addDealStub)
  return {
    addDealStub,
    validationStub,
    sut
  }
}

const mockRequest = (): HttpRequest => {
  return {
    body: mockWonDealRequest()
  }
}

describe('WonDealController', () => {
  test('should call validation with the correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const fakeRequest = mockRequest()
    await sut.handle(fakeRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body)
  })
  test('should return badRequest if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(err(new ValidationError()))
    const fakeRequest = mockRequest()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new ValidationError()))
  })
  test('should return ok when deal status is different than won', async () => {
    const { sut } = makeSut()
    const fakeRequest = mockRequest()
    fakeRequest.body.current.status = 'lost'
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(ok())
  })
  test('should call addDeal with the correct values', async () => {
    const { sut, addDealStub } = makeSut()
    const addSpy = jest.spyOn(addDealStub, 'add')
    const fakeRequest = mockRequest()
    await sut.handle(fakeRequest)
    const {
      person_name: clientName,
      title,
      id: pipedriveId,
      won_time: wonAt,
      value
    } = fakeRequest.body.current
    expect(addSpy).toHaveBeenCalledWith({
      title,
      pipedriveId,
      wonAt,
      value,
      clientName
    })
  })
  test('should return serverError if addDeal returns an instance of ServerError', async () => {
    const { sut, addDealStub } = makeSut()
    jest.spyOn(addDealStub, 'add').mockResolvedValueOnce(err(new DbError(new Error())))
    const fakeRequest = mockRequest()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(serverError(new DbError(new Error())))
  })
  test('should return serverError if addDeal throws', async () => {
    const { sut, addDealStub } = makeSut()
    jest.spyOn(addDealStub, 'add').mockImplementationOnce(() => { throw new Error() })
    const fakeRequest = mockRequest()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(serverError(new DbError(new Error())))
  })
  test('should return forbidden for any other type of error', async () => {
    const { sut, addDealStub } = makeSut()
    jest.spyOn(addDealStub, 'add').mockResolvedValueOnce(err(new Error()))
    const fakeRequest = mockRequest()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(forbidden(new Error()))
  })
  test('should ok with an empty body on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = mockRequest()
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(ok())
  })
})
