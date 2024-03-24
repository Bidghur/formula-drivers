import path from 'node:path'
import fs from 'fs'
import { BasicDriver } from '../models/driver-model'

export default function readDrivers(): BasicDriver[] {
    const driversJson = path.join(__dirname, '../../example_data/drivers.json')
    const drivers = fs.readFileSync(driversJson, 'utf8')
    return JSON.parse(drivers) as BasicDriver[]
}