import { Driver } from "../models/driver-model"
import DriversService from "./drivers-service"

jest.mock("../utility/read-drivers", () => {
    const originalModule = jest.requireActual('../utility/read-drivers')

    const mockDrivers = [
        {
            "id": 0,
            "code": "ALB",
            "firstname": "Alexander",
            "lastname": "Albon",
            "country": "TH",
            "team": "Williams"
          },
          {
            "id": 1,
            "code": "ALO",
            "firstname": "Fernando",
            "lastname": "Alonso",
            "country": "ES",
            "team": "Alpine"
          },
          {
            "id": 2,
            "code": "TEST",
            "firstname": "testFirstname",
            "lastname": "testLastname",
            "country": "TE",
            "team": "testTeam"
          },
          {
            "id": 3,
            "code": "TEST",
            "firstname": "testFirstname",
            "lastname": "testLastname",
            "country": "TE",
            "team": "testTeam"
          },
          {
            "id": 4,
            "code": "TEST",
            "firstname": "testFirstname",
            "lastname": "testLastname",
            "country": "TE",
            "team": "testTeam"
          },
          {
            "id": 5,
            "code": "TEST",
            "firstname": "testFirstname",
            "lastname": "testLastname",
            "country": "TE",
            "team": "testTeam"
          }
    ]

    return {
        __esModule: true,
        ...originalModule,
        default: jest.fn(() => mockDrivers),
    }
})


describe('Drivers Service', () => {
    let service: DriversService = new DriversService()
    let drivers: Driver[] = []

    beforeEach(() => {
        drivers = service.getAllDrivers()
    })

    it('Should receive all the drivers', () => {
        expect(drivers).toBeDefined()
        expect(drivers.length).toBe(6)
    })

    it('Every driver should have a unique place', () => {
        placesAreUnique()
    })

    it('Every driver should have an imgUrl', () => {
        drivers.forEach(driver => {
            expect(driver.imgUrl).toBeDefined()
            expect(driver.imgUrl).toContain('/static')
        })
    })

    it('Should take over the first place',() => {
        const secondDriver = drivers.find(driver => driver.place === 2)
        service.overTake(secondDriver.id)
        const firstDriver = drivers.find(driver => driver.place === 1)

        placesAreUnique()
        expect(firstDriver).toStrictEqual(secondDriver)
    })

    it('Should take over multiple places with only one call', () => {
        const lastDriver = drivers.find(driver => driver.place === 6)
        service.overTakeMultipleDrivers(lastDriver.id, 4)
        const secondDriver = drivers.find(driver => driver.place === 2)

        placesAreUnique()
        expect(lastDriver).toStrictEqual(secondDriver)
    })

    it('should take over more', () => {
        const lastDriver = drivers.find(driver => driver.place === 4)
        service.overTakeMultipleDrivers(lastDriver.id, 2)
        const secondDriver = drivers.find(driver => driver.place === 2)

        placesAreUnique()
        expect(lastDriver).toStrictEqual(secondDriver)
    })

    function placesAreUnique() {
        const places: number[] = []
        drivers.forEach(driver => {
            places.push(driver.place)
        })

        expect(isArrayUnique(places)).toBeTruthy()
    }

    const isArrayUnique = (arr: number[]) => Array.isArray(arr) && new Set(arr).size === arr.length;

})