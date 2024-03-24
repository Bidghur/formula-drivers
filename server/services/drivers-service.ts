import { BasicDriver, Driver } from "../models/driver-model"
import readDrivers from "../utility/read-drivers"
export default class DriversService {
    readonly drivers: Driver[] = []
    readonly alreadyUsedPlaces: number[] = []

    constructor() {
        const drivers = readDrivers()
        drivers.forEach(driver => {
            const newDriver: Driver = {
                ...driver,
                imgUrl: this.getStaticImageUrl(driver),
                place: this.getRandomPlace(drivers.length)
            }

            this.drivers.push(newDriver)
        })
    }

    private getStaticImageUrl(driver: BasicDriver): string {
        return `/static/${driver.code.toLowerCase()}.png`
    }

    private getRandomNumberBetween(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + min) ) + min
    }

    private getRandomPlace(maxLength: number): number {
        let randomPlace = this.getRandomNumberBetween(maxLength, 1)
        while(this.alreadyUsedPlaces.includes(randomPlace)) {
            randomPlace = this.getRandomNumberBetween(maxLength, 1)
        }
        this.alreadyUsedPlaces.push(randomPlace)
        return randomPlace
    }

    private isTheDriverFirst(driver: Driver): boolean {
        return driver.place === 1
    }

    private validateDriverAndParam(id: number): Driver[] {
        //If the id is larger then our drivers array, we don't change anything
        if(id >= this.drivers.length || id < 0) throw new Error('The Id needs to be between 0 and 20')
        //If the driver is in the first place, don't change anything
        if(this.isTheDriverFirst(this.drivers[id])) return this.drivers

        return []
    }

    getAllDrivers(): Driver[] {
        return this.drivers
    }

    overTake(id: number): Driver[] {
        if(this.validateDriverAndParam(id).length === 0) {
            const overTakenDriver: Driver = this.drivers.find(driver => driver.place === (this.drivers[id].place - 1))
            overTakenDriver.place = overTakenDriver.place + 1
            this.drivers[id].place = this.drivers[id].place - 1
    
            return this.drivers
        }
        return this.drivers
    }

    overTakeMultipleDrivers(id: number, numberOfOverTakes: number): Driver[] {
        if((this.drivers[id].place - numberOfOverTakes) <= 0) return this.drivers
        if(this.validateDriverAndParam(id).length === 0) {
            this.drivers.forEach(driver => {
                if(driver.id !== this.drivers[id].id && driver.place >= (this.drivers[id].place - numberOfOverTakes) && driver.place !<= this.drivers[id].place) {
                    driver.place = driver.place + 1
                }
            })
            this.drivers[id].place = this.drivers[id].place - numberOfOverTakes
        }
        return this.drivers
    }
}