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
        const data = await axios.get('http://localhost:8081/api/drivers')
        setDrivers(data.data)
    }

    const overTake = async (driver: Driver) => {
        const data = await axios.get(`http://localhost:8081/api/drivers/${driver.id}/overtake`)
        setDrivers(data.data)
    }

    useEffect(() => {
        getDrivers()
    }, [])

    return (
        <div>
            {drivers ? (
                <Container fluid="md">
                    <Row>
                    {drivers.map(driver => <Col><DriverCard key={driver.id} setOverTake={overTake} driver={driver} /> </Col>)}
                    </Row>
                </Container>
            ):(
                    <div></div>
            )
            }
        </div>
    )
}