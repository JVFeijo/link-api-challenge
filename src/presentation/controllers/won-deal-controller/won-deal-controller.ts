import { IAddDeal } from '@/data/usecases/add-deal/add-deal-protocols'
import { ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { WonDealRequest } from '@/presentation/protocols/requests/won-deal-request'
import { IValidation } from '@/presentation/protocols/validation'
import { isErr } from '@/utils/types/result'

export class WonDealController implements Controller {
  constructor (
    private readonly validation: IValidation<WonDealRequest>,
    private readonly addDeal: IAddDeal
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(request.body)

      if (isErr(validationResult)) {
        return badRequest(validationResult.error)
      }

      const addDealResult = await this.addDeal.add(validationResult.result)

      if (isErr(addDealResult)) {
        if (addDealResult.error instanceof ServerError) {
          return serverError(addDealResult.error)
        }

        return forbidden(addDealResult.error)
      }

      return ok()
    } catch (e) {
      return serverError(e)
    }
  }
}
