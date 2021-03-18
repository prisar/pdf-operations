import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import constants from '../../../config/constants';

export function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSubmitForm = async () => {
        const data = {
            username,
            password
        };
        const url = `${constants.backend}/api/v1/auth/login`;
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        console.log(response.json());
    }

    const onChangeUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const onChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    React.useEffect(() => {
    }, []);
  
    return (
      <div>
        <Container>
          <Row>
            <Col />
            <Col className="login-col">
              <div className="text-center">
                Login
              </div>
              {/* <Form onSubmit={onSubmitForm}> */}
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>
                    username
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter username"
                    onChange={onChangeUsername}
                  />
                </Form.Group>
  
                <Form.Group controlId="formPassword">
                  <Form.Label>
                    password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                  />
                </Form.Group>
                {/* <Button variant="primary" type="submit"> */}
                <Button variant="primary" onClick={onSubmitForm}>
                  Submit
                </Button>
              </Form>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
  
  export default LoginPage;