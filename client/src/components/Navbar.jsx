import React from "react";
import { useContext} from "react";
import { UserContext } from '../context/UserContext';
import {Navbar, Nav, NavItem, NavLink } from "reactstrap";
import chat from '../assets/chat.png';

const NavBar = () => {
  const {handleLogout} = useContext(UserContext)
  const token = localStorage.getItem('token');
  const user = JSON.parse(token);
  return (
    <Navbar color="light" light expand="md" className="bg-secondary">
      <NavLink href="/">
        <img src={chat} alt="Logo" height="50" />
      </NavLink>
      <Nav className="ml-auto" navbar>
      {!token ? (
        <>
          <NavItem>
            <NavLink href="/signup">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Log In</NavLink>
          </NavItem>
        </>
      ) : (
        <div><h4>Hello {user.name}</h4> 
          <NavItem>
          <button onClick={handleLogout}>Logout</button>
          </NavItem>
      </div>
      )}
        


      </Nav>
    </Navbar>
  );
};

export default NavBar;
