import {useEffect, useState} from "react";
import Papa from "papaparse";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Globe from "react-globe.gl";
import worldcities from "../../public/worldcities.txt"
import axios from "axios";
import {User} from "../user/User";

const config = {
    header: true,
    preview: 100
}


export default function MyGlobe() {

    const [cities, setCities] = useState([])
    const [users, setUsers] = useState<User[]>([])

    const [userId, setUserId] = useState<number>();
    const [tripName, setTripName] = useState("");
    const [tripDescription, setTripDescription] = useState("");

    useEffect(() => {

        console.log("Fetching users at localhost:8080")

        // todo: i think the first entry has to be the "select ur user"

        axios.get('http://127.0.0.1:8080/users')
            .then(response => setUsers(response.data))
    }, []);

    useEffect(() => {
        fetch(worldcities)
            .then((r) => r.text())
            .then((data) => {
                let parse = Papa.parse(data, config).data;

                // todo: can be done in config of papaParse
                let transformedData = parse.map(city => {
                    return {
                        lat: city.lat,
                        lng: city.lng,
                        size: Math.random() / 3,
                        // pointColor: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
                    }
                })

                setCities(transformedData);

                console.log(parse)
                console.log(transformedData)

                console.log(cities);
            })
    }, []);

    const createTrip = () => {

        // console.log("submit")
        // console.log(userName)
        // console.log(users)
        // console.log(users.filter(u => u.userName == userName))
        console.log("userId; " + userId)
        let currUser = users.filter(u => u.id == userId)[0];
        console.log(currUser)

        axios.post('http://127.0.0.1:8080/trips/create',
            {name: tripName, description: tripDescription, userId: userId, places: []})
            .then(response => console.log(response.data))
    }

    useEffect(() => {
        console.log(userId)
    }, [tripName, userId]);

    return <>
        <Container>
            <Row>
                <Form onSubmit={createTrip}>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control onChange={e => setTripName(e.target.value)}
                                      value={tripName}
                                      type="text"
                                      placeholder="Trip Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip Description</Form.Label>
                        <Form.Control onChange={e => setTripDescription(e.target.value)}
                                      value={tripDescription}
                                      type="text"
                                      placeholder="Trip Description"/>
                    </Form.Group>
                    <Form.Select value={userId} onChange={e => setUserId(e.target.value)}>
                        {users.map(user => (<option>{user.id}</option>))}
                    </Form.Select>
                    <Button onClick={createTrip} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </Row>

            <Row>
                <Col>
                    <Globe
                        width={600}
                        height={600}
                        backgroundColor="white"
                        globeImageUrl={'//unpkg.com/three-globe/example/img/earth-night.jpg'}
                        bumpImageUrl={'//unpkg.com/three-globe/example/img/earth-topology.png'}
                        showAtmosphere={false}
                        pointsData={cities}
                    />
                </Col>
                <Col>
                    {/*<Form onSubmit={createPlaceCall}>*/}
                    {/*    <Form.Group className="mb-3">*/}
                    {/*        <Form.Label>Place Name</Form.Label>*/}
                    {/*        <Form.Control onChange={e => setTripName(e.target.value)}*/}
                    {/*                      value={tripName}*/}
                    {/*                      type="text"*/}
                    {/*                      placeholder="Trip Name"*/}
                    {/*        />*/}
                    {/*    </Form.Group>*/}
                    {/*    <Form.Group className="mb-3">*/}
                    {/*        <Form.Label>Trip Description</Form.Label>*/}
                    {/*        <Form.Control onChange={e => setTripDescription(e.target.value)}*/}
                    {/*                      value={tripDescription}*/}
                    {/*                      type="text"*/}
                    {/*                      placeholder="Trip Description"/>*/}
                    {/*    </Form.Group>*/}
                    {/*    <Form.Select value={userName} onChange={e => setUserName(e.target.value)}>*/}
                    {/*        {users.map(user => (<option>{user.userName}</option>))}*/}
                    {/*    </Form.Select>*/}
                    {/*    <Button onClick={createTripCall} variant="primary" type="button">*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</Form>*/}
                </Col>
            </Row>
        </Container>
    </>

}