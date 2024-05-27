import {Button, Card, CardBody, CardHeader, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export type User = {
    id: number
    userName: string
    password: string
    emailAddress: string
}

function UserComp(user: User) {
    return <Col>
        <Card>
            <CardHeader>
                <h1>{user.userName}</h1>
                <p>{user.id}</p>
            </CardHeader>
            <CardBody>
                {user.emailAddress}
            </CardBody>
        </Card>
    </Col>
}

export default function User() {

    const [users, setUsers] = useState([])

    useEffect(() => {

        console.log("Fetching users at localhost:8080")

        axios.get('http://127.0.0.1:8080/users')
            .then(response => setUsers(response.data))
    }, []);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        axios.post('http://127.0.0.1:8080/users/create',
            {userName: userName, hashedPassword: password, emailAddress: email})
            .then(response => console.log(response.data))
    }

    return (
        <Container>
            <Row className="my-2">
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control onChange={e => setUserName(e.target.value)}
                                      value={userName}
                                      type="text"
                                      placeholder="User Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)}
                                      value={email}
                                      type="email"
                                      placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)}
                                      value={password}
                                      type="password"
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button onClick={submit} variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
            </Row>

            <Row className="my-2">
                {users.map((user: User) => <UserComp key={user.id} id={user.id} userName={user.userName}
                                                     password={""} emailAddress={user.emailAddress}/>)}
            </Row>
        </Container>
    )
}