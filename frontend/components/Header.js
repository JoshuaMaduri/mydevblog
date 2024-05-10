import React, { useState } from 'react';
import { APP_NAME } from '../config';
import {signout, isAuth} from '../actions/auth';
import Router from 'next/router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                
                <NavLink href='/' className="font-weight-bold">{APP_NAME}</NavLink>
                
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {!isAuth() && (
                    <NavItem>
                        <NavLink href='/signin'>Sign In</NavLink>
                    </NavItem>
                    )}
                    
                    {!isAuth() && (
                        <NavItem>
                            <NavLink href='/signup'>Signup</NavLink>
                        </NavItem>
                    )}
                    

                    {isAuth() && (                   
                     <NavItem>
                        <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                            Signout
                        </NavLink>
                    </NavItem>)}


                </Nav>
                </Collapse>
            </Navbar>
        </div>
      );
}

export default Header;