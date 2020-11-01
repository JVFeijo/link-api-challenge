export interface WonDealRequest {
  current: {
    id: number
    title: string
    person_name: string
    value: number
    status: string
    won_time: Date
  }
}
