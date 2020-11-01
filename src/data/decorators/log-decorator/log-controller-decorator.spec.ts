import { LogControllerDecorator } from './log-controller-decorator'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import faker from 'faker'
import { LogErrorRepository } from '@/data/protocols/log/log-error-repository'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok(httpRequest.body)
  }
}

class LogErrorRepositoryStub implements LogErrorRepository {
  // eslint-disable-next-line handle-callback-err
  async logError (error: Error): Promise<void> {
    return null
  }
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: ControllerStub
  logErrorRepositoryStub: LogErrorRepositoryStub
}

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const logErrorRepositoryStub = new LogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const controllerHandleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerHandleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerStub } = makeSut()
    const controllerHandleSpy = jest.spyOn(controllerStub, 'handle')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(await (controllerHandleSpy.mock.results[0].value))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const serverError = mockServerError()
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(serverError)
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(mockRequest())
    expect(logErrorSpy).toHaveBeenCalledWith(serverError.body)
  })
})
