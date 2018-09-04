import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup,HelpBlock } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Common from '../Common/Common';
import  { Redirect } from 'react-router-dom'
class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harddisk: [],
            harddiskInput: '',
            url: 'http://localhost:64294/api/Users/',
            username: "",
            password: "",
            usernameError:null,
            passwordError:null,
            invalidAccountError:"",
            invalidAccountMessage:"",
            invalidAccountHidden:true,
            isLoggedIn:(localStorage.getItem("isLoggedIn")==="true")
        };
    }
    handleState(state) {
        for (let i = 0; i < state.length; i++) {
          this.setState(state[i]);
        }
      }
    handleLogInUser(){
        let state=[];
        let username = this.username.value;
        let password = this.password.value;
        this.state.username = username;
        this.state.password = password;
        let parameter = {
            UserName: this.state.username,
            Password:this.state.password
        };
        //console.log(parameter);
        let methodType= "POST";
        let url = this.state.url+"authenticate?UserName="+parameter.UserName+
                                              "&Password="+parameter.Password;
        this.child.parentAxios(methodType,url, parameter).then((result)=>
        {
            if(result.status===200){
                console.log(result);
                this.handleClearContent();
                localStorage.setItem("token",result.data.token);
                localStorage.setItem("username",result.data.userName);
                localStorage.setItem("id",result.data.id);
                localStorage.setItem("isLoggedIn",true);
                this.props.history.push('/asset');
                //window.location.href="/home";
            }
        }).catch((error)=>{
            console.log(error)
            state.push({
                usernameError:"error",
                passwordError:"error",
                invalidAccountError:"Please enter a valid account.",
                invalidAccountMessage:"Please enter a valid username or password.",
                invalidAccountHidden:false
            });
            this.handleState(state);
        });
    }
    handleClearContent(){
        let state=[];
        state.push({
            usernameError:null,
            passwordError:null,
            username:"",
            password:"",
            invalidAccountError:"",
            invalidAccountMessage:"",
            invalidAccountHidden:true
        });
        this.handleState(state);
    }
    render() {
        if(this.state.isLoggedIn===true){
            return <Redirect to='/asset' />;
        }
        return (
            <Grid>
                <Row className="show-grid">
                    {/* <Col className={"col-md-6 col-md-offset-3"}> */}
                    <Col  xs={12} md={8}>
                        <Panel bsStyle="default">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3"><ControlLabel>Login</ControlLabel></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Common ref={instances => { this.child = instances }}
                                />
                                <FormGroup controlId="formHorizontal" validationState={this.state.usernameError} hidden={this.state.invalidAccountHidden}>
                                 <HelpBlock><ControlLabel><i className="fa fa-close "></i>&nbsp;{this.state.invalidAccountError}</ControlLabel></HelpBlock>
                                 <HelpBlock><ControlLabel><i className="fa fa-close "></i>&nbsp;{this.state.invalidAccountMessage}</ControlLabel></HelpBlock>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal" validationState={this.state.usernameError}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your username"
                                        defaultValue={this.state.username}
                                        inputRef={(ref) => { this.username = ref }}
                                    />
                                        <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal_Name" validationState={this.state.passwordError} >
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        label="HardDisk Name"
                                        placeholder="Enter your password"
                                        defaultValue={this.state.password}
                                        inputRef={(ref) => { this.password = ref }}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>

                            </Panel.Body>
                            <Panel.Footer><center>
                                <Button bsClass={" btn btn-flat btn-default"} onClick={this.handleLogInUser.bind(this)}
                                >&nbsp;&nbsp;&nbsp;Sign in&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                                      </center>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );

    }
}

export default LogIn;