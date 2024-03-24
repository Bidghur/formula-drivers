import express from 'express'
import router from './controllers/drivers-controller'


const app = express()

app.use('/api', router)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8081)