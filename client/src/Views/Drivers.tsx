import { useEffect, useState } from "react"
import { Driver } from "../models/driver-model"
import axios from "axios"
import DriverCard from "../Components/DriverCard"

export default function Drivers () {
    const [drivers, setDrivers] = useState<Driver[]>([])

    const getDrivers = async () => {
        const data = await axios.get('http://localhost:8081/api/drivers')
        setDrivers(data.data)
    }

    const overTake = async (driver: Driver) => {
        console.log(driver)
        const data = await axios.get(`http://localhost:8081/api/drivers/${driver.id}/overtake`)
        setDrivers(data.data)
    }

    useEffect(() => {
        getDrivers()
    }, [])

    return (
        <div>
            {drivers ? (
                <div>
                    {drivers.map(testdriver => <DriverCard setOverTake={overTake} driver={testdriver} />)}
                </div>
            ):(
                    <div></div>
            )
            }
        </div>
    )
}