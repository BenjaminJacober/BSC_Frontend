import {useState} from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {Button, Container, Form, Row} from "react-bootstrap";

export default function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = () => {
		console.log("Try logging in")
		axios.post('http://127.0.0.1:8080/users/authenticate',
			{email: email, password: password})
			.then(response => {
				console.log(response.data)
				// todo: currently storing the jwt token as a cookie, better solution: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql
				Cookie.set("authToken", response.data.token)
			})
	}

	return (
		<Container>
			<Row className="my-2">
				<Form onSubmit={submit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control onChange={e => setEmail(e.target.value)}
									  value={email}
									  type="email"
									  placeholder="Enter email"/>
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
		</Container>
	)

}