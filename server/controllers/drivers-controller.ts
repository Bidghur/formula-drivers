import express, { NextFunction, Request, Response } from 'express'
import DriversService from '../services/drivers-service'

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
    res.send(driverService.getAllDrivers())
})

router.post('/drivers/:id/overtake', (req: Request, res: Response) => {
    res.send(driverService.overTake(Number(req.params['id'])))
})

router.post('/drivers/:id/overtake/:numberOfOvertakes', (req: Request, res: Response) => {
    const id = Number(req.params['id'])
    const numberOfOvertakes = Number(req.params['numberOfOvertakes'])
    res.send(driverService.overTakeMultipleDrivers(id, numberOfOvertakes))
})

export default router