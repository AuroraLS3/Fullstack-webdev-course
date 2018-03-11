import React from 'react'

import {
    Navbar,
    NavItem,
    NavLink,
    Nav,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Button
} from 'reactstrap'

class Menu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">Blog App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/blogs/">blogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/users/">users</NavLink>
                        </NavItem>
                        <p>Logged in as <b>{this.props.username}</b></p>
                        <Button color="primary" onClick={this.props.logout}>Logout</Button>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

}

export default Menu