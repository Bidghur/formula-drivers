import express, { NextFunction, Request, Response } from 'express'
import DriversService from '../services/drivers-service'
import readDrivers from '../utility/read-drivers'

const router = express.Router()

// middleware that is specific to this router
const timeLog = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request for: ', req.path)
    console.log('Time: ', new Date().toISOString().split('.')[0].replace('T', ' '))
    next()
}

const driverService = new DriversService()

router.use(timeLog)

router.get('/drivers', (req: Request, res: Response) => {
    driverService.getAllDrivers()
    res.send(driverService.getAllDrivers())
})

router.get('/drivers/:id/overtake', (req: Request, res: Response, next) => {
    console.log(req.params)
    res.send('About birds')
})

export default router