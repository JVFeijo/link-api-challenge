import { HttpResponse } from '@/presentation/protocols/http'

export function serverError (error = new Error('Internal Server Error')): HttpResponse {
  return {
    statusCode: 500,
    body: error
  }
}

export function forbidden (error = new Error('Unauthorized')): HttpResponse {
  return {
    statusCode: 403,
    body: error
  }
}

export function notFound (error = new Error('Not Found')): HttpResponse {
  return {
    statusCode: 404,
    body: error
  }
}

export function badRequest (error = new Error('Bad Request')): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function ok (data?: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}

export function unauthenticated (error = new Error('Unauthenticated')): HttpResponse {
  return {
    statusCode: 401,
    body: error
  }
}
