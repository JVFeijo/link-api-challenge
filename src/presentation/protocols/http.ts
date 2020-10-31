export interface HttpRequest {
  query?: any
  headers?: any
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
