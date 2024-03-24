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

app.listen(8081)