import { Deal } from '@/data/models/deal/deal'
import env from '@/main/config/env'
import { Nothing } from '@/utils/types/maybe'
import axios from 'axios'
import { EventEmitter } from 'events'
import qs from 'qs'

export function makeAddBlingOrder (
  eventEmitter: EventEmitter
) {
  return async function addBlingOrder (deal: Deal): Promise<Nothing> {
    try {
      const queryString = qs.stringify({
        xml: {
          pedido: {
            cliente: deal.clientName
          }
        },
        apikey: env.blingToken
      })

      await axios.request({
        method: 'POST',
        baseURL: env.blingApi,
        url: '/pedido/json/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': queryString.length
        },
        data: queryString
      })

      return Nothing()
    } catch (e) {
      eventEmitter.emit('error', e)
    }
  }
}
