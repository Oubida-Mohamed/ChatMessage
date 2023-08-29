import React, { useContext} from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { UserContext } from '../context/UserContext';

const Login = () => {

    const {login,error,handleEmailChange,handlePasswordChange,handleSubmit} = useContext(UserContext)
  
  return (
    <Container>
      <div className="text-center">
        <Form onSubmit={handleSubmit}>
          <FormGroup size="sm">
            <Label for="email" size="sm">Email</Label>
            <Input
              size="sm"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup size="sm">
            <Label for="password" size="sm">Password</Label>
            <Input
              size="sm"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Submit
          </Button><br/>
          {error}
        </Form>
      </div>
    </Container>
  );
};

export default Login;
