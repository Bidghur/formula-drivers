import express from 'express'
import cors, { CorsOptions } from 'cors'

import router from './controllers/drivers-controller'

const corsOption: CorsOptions = {
    origin: '*'
}

const app = express()

app.use(cors(corsOption))
app.use('/static', express.static('assets'))

app.use('/api', router)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8081)