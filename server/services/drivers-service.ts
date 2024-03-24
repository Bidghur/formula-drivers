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
        return `http://localhost:8081/static/${driver.code.toLowerCase()}.png`
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

    getAllDrivers(): Driver[] {
        return this.drivers
    }

    overTake(id: number): Driver[] {
        //If the driver is in the first place, don't change anything
        if(this.isTheDriverFirst(this.drivers[id])) return this.drivers

        const overTakenDriver: Driver = this.drivers.find(driver => driver.place === (this.drivers[id].place - 1))
        overTakenDriver.place = overTakenDriver.place + 1
        this.drivers[id].place = this.drivers[id].place - 1
        
        return this.drivers
    }
}