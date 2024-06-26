import { useEffect, useState } from "react"
import { Driver } from "../models/driver-model"
import axios from "axios"
import DriverCard from "../Components/DriverCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Drivers () {
    const [drivers, setDrivers] = useState<Driver[]>([])

    const getDrivers = async () => {
        await getAndSetSortedDrivers('http://localhost:8081/api/drivers', 'get')
    }

    const overTake = async (driver: Driver) => {
        await getAndSetSortedDrivers(`http://localhost:8081/api/drivers/${driver.id}/overtake`, 'post')
    }

    const overTakeMultiple = async (driver: Driver, numberOfOvertakes: number) => {
        await getAndSetSortedDrivers(`http://localhost:8081/api/drivers/${driver.id}/overtake/${numberOfOvertakes}`, 'post')
    }

    const sortDriversByPlace = (drivers: Driver[]) => {
        drivers.sort((firstDriver, secondDriver) => firstDriver.place - secondDriver.place)
    }

    const getAndSetSortedDrivers = async (url: string, method: 'get' | 'post') => {
        let data = null
        if(method === 'get') {
            data = await axios.get(url)
        }
        else {
            data = await axios.post(url)
        }
        const drivers: Driver[] = data?.data
        sortDriversByPlace(drivers)
        setDrivers(drivers)
    }

    useEffect(() => {
        document.title = "F1 Drivers"
        getDrivers()
    }, [])

    return (
        <div style={{ background: '#332f2f' }}>
            {drivers ? (
                <Container fluid="md">
                    <Row>
                        {drivers.map(driver => 
                        <Col>
                            <DriverCard 
                                key={driver.id} 
                                setOverTakeMultiple={overTakeMultiple} 
                                setOverTake={overTake} 
                                driver={driver} 
                            /> 
                        </Col>)}
                    </Row>
                </Container>
            ):(
                <div></div>
            )
            }
        </div>
    )
}