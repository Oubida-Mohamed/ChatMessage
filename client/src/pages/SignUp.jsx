import React, { useContext } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { UserContext } from '../context/UserContext';
import { MDBRadio } from 'mdb-react-ui-kit';
const SignUp = () => {

  const {handleName,handleEmail,handlePassword,handleRegister,error,signUp,accountType}= useContext(UserContext)
  return (
    <Container>
      <div className="text-center">
        <Form onSubmit={handleRegister}>
          <FormGroup size="sm" className="d-flex justify-content-center">
            <Label for="name" size="sm">Name</Label>
            <Input
              size="sm"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              style={{ width: "400px" }}
              value={signUp.name}
              onChange={handleName}
            />
          </FormGroup>
          <FormGroup size="sm" className="d-flex justify-content-center">
            <Label for="email" size="sm">Email</Label>
            <Input
              size="sm"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              style={{ width: "400px" }}
              value={signUp.email}
              onChange={handleEmail}
            />
          </FormGroup>
          <FormGroup size="sm" className="d-flex justify-content-center">
            <Label for="password" size="sm">Password</Label>
            <Input
              size="sm"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              style={{ width: "400px" }}
              value={signUp.password}
              onChange={handlePassword}
            />
            
          </FormGroup>
          <FormGroup size="sm" className="d-flex justify-content-center">
          <MDBRadio onChange={accountType} name='isAdmin' id='normalUser' label='normal user' value={false} defaultChecked />
          <MDBRadio onChange={accountType} name='isAdmin' id='isAdmin' label='Admin' value={true} />
          </FormGroup>
        

          <Button color="primary" type="submit">
            Register
          </Button><br/>
          {error}
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
