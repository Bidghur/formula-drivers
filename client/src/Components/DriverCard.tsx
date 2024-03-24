import Card from 'react-bootstrap/Card';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Driver } from '../models/driver-model'
import { ChangeEvent, useState } from 'react';

interface DriverProps {
    setOverTake: (driver: Driver) => Promise<void>
    setOverTakeMultiple: (driver: Driver, numberOfOvertakes: number) => Promise<void>
    driver: Driver
}

export default function DriverCard( { setOverTake, setOverTakeMultiple, driver }: DriverProps ) {
    const driverFullName = driver.lastname + " " + driver.firstname
    const imgUrl = `http://localhost:8081${driver.imgUrl}`
    const [multipleOverTakeValue, setmultipleOverTakeValue] = useState<number>(0)

    const changeOverTakeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setmultipleOverTakeValue(Number(e.target.value))
    }

    return (
        <Card style={{ width: '24rem', marginBottom: '1rem', marginTop: '2rem'}}>
            <Card.Img variant="top" src={imgUrl}  />
            <Card.Body>
            <Card.Title>{driverFullName}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    Country: <b>{driver.country}</b> 
                    <img 
                        style={{ marginLeft: '1rem' }} 
                        src={`https://flagsapi.com/${driver.country}/flat/48.png`} 
                        alt={`${driver.country}'s flag`} 
                    />
                </ListGroup.Item>
                <ListGroup.Item>Team: <b>{driver.team}</b></ListGroup.Item>
                <ListGroup.Item>Current Place: <b>{driver.place}</b></ListGroup.Item>
            </ListGroup>
            <Container fluid="md">
                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => setOverTake(driver)}>Overtake</Button>
                    </Col>
                    <Col style={{ width: "3rem" }}>
                        <input 
                            min={1}
                            max={driver.place - 1} 
                            value={multipleOverTakeValue} 
                            onChange={changeOverTakeValue} 
                            style={{ width: "3rem" }} 
                            type='number'>
                        </input>
                    </Col>
                    <Col>
                        <Button 
                            variant="primary" 
                            onClick={() => setOverTakeMultiple(driver, multipleOverTakeValue)}>
                            OverTakeMultiple
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
        </Card>
    )
}