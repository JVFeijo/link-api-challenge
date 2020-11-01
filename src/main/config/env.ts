import dotenv from 'dotenv'
dotenv.config()
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://admin:admin@cluster0.hsyvd.mongodb.net/link-api?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  pipedriveToken: process.env.PIPEDRIVE_TOKEN,
  pipedriveApi: process.env.PIPEDRIVE_API,
  blingToken: process.env.BLING_TOKEN,
  blingApi: process.env.BLING_API
}
