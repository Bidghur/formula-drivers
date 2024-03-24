import Card from 'react-bootstrap/Card';
import { Button, ListGroup } from 'react-bootstrap';
import { Driver } from '../models/driver-model'

interface DriverProps {
    setOverTake: (driver: Driver) => Promise<void>
    driver: Driver
}

export default function DriverCard( { setOverTake, driver }: DriverProps ) {
    const driverFullName = driver.lastname + " " + driver.firstname
    const imgUrl = `http://localhost:8081${driver.imgUrl}`

    return (
        <Card style={{ width: '18rem', marginBottom: '3rem'}}>
            <Card.Img variant="top" src={imgUrl}  />
            <Card.Body>
            <Card.Title>{driverFullName}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Country: <b>{driver.country}</b> <img style={{ marginLeft: '1rem' }} src={`https://flagsapi.com/${driver.country}/flat/64.png`}></img></ListGroup.Item>
                <ListGroup.Item>Team: <b>{driver.team}</b></ListGroup.Item>
                <ListGroup.Item>Current Place: <b>{driver.place}</b></ListGroup.Item>
            </ListGroup>
            <Button variant="primary" onClick={() => setOverTake(driver)}>Overtake</Button>
        </Card.Body>
        </Card>
    )
}