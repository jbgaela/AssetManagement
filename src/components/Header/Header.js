import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props){
        super(props);
        this.state=
        {
            isLoggedIn:false,
            username:"",
            fullname:"",
            token:localStorage.getItem("token"),
            status:false
        }
    }
    handleLogOut(){
        localStorage.clear();
        //window.location.href="/login";
    }
    forLoggedInUser(){
        const navDropdownTitle = (<i className="">&nbsp;&nbsp;Management</i>);
        // const navDropdownSizeTitle = (<i className="fa fa-minus-square">&nbsp;&nbsp;Size</i>);
        const navDropdownUserTitle = (<i className="">&nbsp;&nbsp;Currently logged in as:  {this.state.username}</i> );
        return (<Navbar.Collapse>
            <Nav pullRight>
               
                <NavItem eventKey={2} componentClass={Link} href="/asset" to="/asset">
                    <i className=""> &nbsp;Assets</i>
               </NavItem>
                <NavDropdown eventKey={4} title={navDropdownTitle} id="basic-nav-dropdown">
                <MenuItem divider />
                    <center><p1>Manage</p1></center>
                    <MenuItem divider />
                    <MenuItem eventKey={4.1} componentClass={Link} href="category" to="/category">Category</MenuItem>
                    <MenuItem eventKey={4.2} componentClass={Link} href="manufacturer" to="/manufacturer">Manufacturer</MenuItem>
                    <MenuItem eventKey={4.3} componentClass={Link} href="model" to="/model">Model</MenuItem>
                    <MenuItem eventKey={4.5} componentClass={Link} href="processor" to="/processor">Processor</MenuItem>
                    <MenuItem eventKey={4.7} componentClass={Link} href="supplier" to="/supplier">Supplier</MenuItem>
                    <MenuItem divider />
                    <center> <p1>Sizes</p1></center>
                    <MenuItem divider />
                    <MenuItem eventKey={5.1} componentClass={Link} href="harddisk" to="/harddisk">Hard disk</MenuItem>
                    <MenuItem eventKey={5.2} componentClass={Link} href="memory" to="/memory">RAM</MenuItem>
                    <MenuItem eventKey={5.3} componentClass={Link} href="videocard" to="/videocard">Video card</MenuItem>

                </NavDropdown>
                <NavDropdown eventKey={6} title={navDropdownUserTitle} id="basic-nav-dropdown">
                    <MenuItem eventKey={6.1} componentClass={Link} href="profile" to="/profile">Profile</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={6.1} componentClass={Link} href="register" to="/register">User</MenuItem>
                    <MenuItem divider />
                    <NavItem eventKey={1} componentClass={Link} href="/" to="/" onClick={this.handleLogOut.bind(this)} >
                   <i className="">&nbsp;Log Out</i>
               </NavItem>
                </NavDropdown>


                
            </Nav>
        </Navbar.Collapse>);
    }
    forNonMember(){
        //console.log();
        let getUrl = window.location.href; 
        //console.log(getUrl);
        let url = getUrl.substring(22,28);
        let redirectUrl =null;
        if(url!=="login")
            redirectUrl = <Redirect to="/login"/>;


        return (<Navbar.Collapse>
            <Nav pullRight>
            </Nav>
            {redirectUrl}
        </Navbar.Collapse>);
    }
    CapitalizeFirstLetter(str){
        if(str===null){
            return null;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render() {
        let getUserLoggedInState = (localStorage.getItem("isLoggedIn")==="true");
        let userName = this.CapitalizeFirstLetter(localStorage.getItem("username"));
        let setStateofLogIn = getUserLoggedInState?true:false;
        this.state.isLoggedIn = setStateofLogIn;
        this.state.username = userName;
        if(this.state.isLoggedIn===true&&(this.state.token!==null||this.state.token===undefined||this.state.token===""))
           this.state.status = true;
        else 
           this.state.status =false;

        return (
           
            <Navbar default collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/asset">Asset Management</Link> 
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {
                     //this.state.status?this.forLoggedInUser():this.forNonMember()
                     this.state.isLoggedIn?this.forLoggedInUser():this.forNonMember()
                }
            </Navbar>
            
        );

    }
}

export default Header;