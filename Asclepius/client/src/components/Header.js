import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { users, anyuser, getAllUsers, currentUser, getUserById, getCurrentUser } = useContext(UserProfileContext);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/"><strong>⚕️ Asclepius</strong></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>

                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">🏡Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/conditions">🩺Condition</NavLink>
                                </NavItem>





                            </>
                        }
                    </Nav>

                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/add">🖊️Add Condition</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} className="fas fa-user-md" to="/category">Categories</NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink tag={RRNavLink} to="/covid">Covid
                                    </NavLink>
                                </NavItem> */}
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/graph">Graph
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }

                        <NavItem>
                            <a aria-current="page" className="nav-link"
                                href="https://www.youtube.com/watch?v=t56lpSJ2GXQ"
                                target="_new">▶️Welcome to Asclepius</a>
                        </NavItem>


                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}