/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/link-api-challenge',
  port: process.env.PORT || 5050
}
