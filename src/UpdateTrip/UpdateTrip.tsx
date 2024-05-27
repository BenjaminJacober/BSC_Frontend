import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Globe from "react-globe.gl";
import {useEffect, useState} from "react";
import axios from "axios";

export type Place = {
    id: number,
    tripId: number,
    timeArrived: Date,
    timeLeft: Date,
    description: string,
    latitude: number,
    longitude: number,
    fromPlaceId: number
}

export type Trip = {
    id: number,
    name: string,
    // userName: string,
    description: string,
    places: Place[]
}

export default function UpdateTrip() {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);

    // todo: set default trip
    const [tripId, setTripId] = useState<number>();
    const [timeArrived, setTimeArrived] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const [description, setDescription] = useState<string>();
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [fromPlaceId, setFromPlaceId] = useState<Place>(null);

    const [arcsData, setArcsData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/trips')
            .then(response => setTrips(response.data))
    }, []);

    const getPlaces = () => {
        console.log("getting new place data")
        console.log(tripId)
        axios.get('http://127.0.0.1:8080/places?tripId=' + tripId)
            .then(response => setPlaces(response.data))
    }

    useEffect(() => {
        getPlaces();
    }, [tripId]);

    useEffect(() => {
        const arcsData = []
        // todo: maybe sort?
        console.log("places")
        console.log(places)
        places.map(place => {
            if (place.fromPlaceId != null) {
                const fromPlace = places.filter(p => p.id == place.fromPlaceId)[0]
                arcsData.push({
                    startLat: fromPlace.latitude,
                    startLng: fromPlace.longitude,
                    endLat: place.latitude,
                    endLng: place.longitude
                })
            }
        })
        console.log("calculatedArcsData")
        console.log(arcsData)
        setArcsData(arcsData)
    }, [places]);

    const createPlace = () => {
        axios.post('http://127.0.0.1:8080/places/create',
            {
                tripId: tripId,
                timeArrived: timeArrived, timeLeft: timeLeft, description: "", latitude: latitude,
                longitude: longitude, fromPlaceId: fromPlaceId
            })
            .then(response => getPlaces())
    }

    const updateCoordinates = (coordinates, event) => {
        setLatitude(coordinates.lat);
        setLongitude(coordinates.lng);
    }

    // let pointsData = {}
    //
    // const calculatePointsData = () => {
    //     pointsData = [{
    //         lat: latitude,
    //         lng: longitude,
    //
    //     }]
    // }

    const getArcsData = () => {

    }

    return <>
        <Container>
            <Row>
                <Col>
                    <Globe
                        width={600}
                        height={600}
                        backgroundColor="white"
                        globeImageUrl={'//unpkg.com/three-globe/example/img/earth-night.jpg'}
                        bumpImageUrl={'//unpkg.com/three-globe/example/img/earth-topology.png'}
                        showAtmosphere={false}
                        onGlobeClick={updateCoordinates}
                        pointsData={[{lat: latitude, lng: longitude}]}
                        arcsData={arcsData}
                    />
                </Col>
                <Col>
                    <Form onSubmit={createPlace}>
                        <Form.Group>
                            <Form.Label>Trip</Form.Label>
                            <Form.Select onChange={e => setTripId(e.target.value)}
                                         value={tripId}>
                                {trips.map(trip => (<option>{trip.id}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>From where</Form.Label>
                            <Form.Select onChange={e => setFromPlaceId(e.target.value)}
                                         value={fromPlaceId}>
                                {places.map(place => (<option>{place.id}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control onChange={e => setLatitude(e.target.value)}
                                          value={latitude}
                                // type="number"
                                          disabled={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control onChange={e => setLongitude(e.target.value)}
                                          value={longitude}
                                          disabled={true}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Arrived</Form.Label>
                            <Form.Control onChange={e => setTimeArrived(e.target.value)}
                                          value={timeArrived}
                                          type="date"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Left</Form.Label>
                            <Form.Control onChange={e => setTimeLeft(e.target.value)}
                                          value={timeLeft}
                                          type="date"
                            />
                        </Form.Group>
                        <Button onClick={createPlace} variant="primary" type="button">
                            Submit
                        </Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    </>

}