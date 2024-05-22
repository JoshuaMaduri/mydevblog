import React, { useState } from 'react';
import { APP_NAME } from '../config';
import {signout, isAuth} from '../actions/auth';
import Router from 'next/router'
import nProgress from 'nprogress';
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


Router.onRouteChangeStart = url => nProgress.start();
Router.onRouteChangeComplete = url => nProgress.done();
Router.onRouteChangeError = url => nProgress.done();

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


                    
                    {isAuth() && isAuth().role == 0 &&(                   
                     <NavItem>
                        <NavLink href='/user'>
                            {`${isAuth().name}'s Dashboard`}
                        </NavLink>
                    </NavItem>)}

                    {isAuth() && isAuth().role == 1 &&(                   
                     <NavItem>
                        <NavLink href='/admin'>
                            {`${isAuth().name}'s Dashboard`}
                        </NavLink>
                    </NavItem>)}



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