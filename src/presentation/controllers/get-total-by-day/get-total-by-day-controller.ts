import { IDealService } from '@/data/services/deal/deal-service-protocols'
import { ServerError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { isErr } from '@/utils/types/result'

export class GetTotalByDayController implements Controller {
  constructor (
    private readonly dealService: IDealService
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const loadResult = await this.dealService.load()

      if (isErr(loadResult)) {
        if (loadResult.error instanceof ServerError) {
          return serverError(loadResult.error)
        }

        return badRequest()
      }

      return ok(loadResult.result)
    } catch (e) {
      return serverError(e)
    }
  }
}
