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

    private getRandomPlace(maxLength: number): number {
        let randomPlace = Math.floor(Math.random() * maxLength)
        while(this.alreadyUsedPlaces.includes(randomPlace)) {
            randomPlace = Math.floor(Math.random() * maxLength + 1)
        }
        this.alreadyUsedPlaces.push(randomPlace)
        return randomPlace
    }

    getAllDrivers(): Driver[] {
        return this.drivers
    }
}