import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup,HelpBlock } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Common from '../Common/Common';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harddisk: [],
            harddiskInput: '',
            url: 'http://localhost:64294/api/Users/',
            username: "",
            password: "",
            fullname:"",
            id:"",
            usernameError:null,
            passwordError:null,
            validationOnFieldfullName:null,
            validationOnFieldusername:null,
            validationOnFieldpassword:null,
            invalidAccountHidden:true,
            disabledAllFields:true,
            isEditHidden:"",
            isUpdateHidden:"hidden",
            actionUpdateType:"updated a record",
        };
    }
    handleState(state) {
        for (let i = 0; i < state.length; i++) {
          this.setState(state[i]);
        }
      }
    handlClickEditEvent(event){
        let state = [];
        state.push({
            isEditHidden:"hidden",
            isUpdateHidden:"",
            disabledAllFields:false
        });
        this.handleState(state);
    }
    checkValidation() {
        let counter = 0;
        let parent = this;
        let param = [];
        param.push({
            username:this.state.username,
            password:this.state.password,
            fullname:this.state.fullname
        });
        console.log(param);
        let state = [];
        param.forEach((item, key) => {
          let checkFieldifNull = {
            fullName: "",
            username: "",
            password:""
          };
    
          Object.keys(checkFieldifNull).forEach((item, index) => {
            let getValue = parent[item].value;
            //console.log(getValue);
            let model = "validationOnField" + item;
            //console.log(model);
            if (getValue === null || getValue === undefined || getValue === "" || getValue === "0") {
              counter++;
              state.push({ [model]: "error" });
              this.handleState(state);
            }
            else {
              state.push({ [model]: null });
              this.handleState(state);
            }
    
          })
        });
       
        return counter;
        }
    SetStateManually(){
        let password = this.password.value;
        let username = this.username.value;
        let fullname = this.fullName.value;
        let id = this.id.value;
        this.state.id = id;
        this.state.username = username;
        this.state.fullname = fullname;
        this.state.password = password;
    }
    handlClickUpdateEvent(event){
        let state = [];
        this.SetStateManually();
        let counter = this.checkValidation();
        console.log(counter);
        if(counter>0){
            return false;
        }
        let parameter = {
            id:parseInt(this.state.id,0),
            userName: this.state.username,
            password:this.state.password,
            fullName:this.state.fullname
        };
        let methodType="PUT";
        let url = this.state.url +this.state.id;
        console.log(parameter);
        this.child.parentAxios(methodType,url, parameter).then((result)=>
        {
            if(result.status===200){
                state.push({
                    isEditHidden:"",
                    isUpdateHidden:"hidden",
                    disabledAllFields:true
                });
               this.handleState(state);
               this.loadData();
               this.child.dialogIsOpen(1,this.state.actionUpdateType);
            }
        }).catch((error)=>{
            console.log(error)
            this.child.dialogIsOpen(2,null);
        });
      

    }
    handleClearContent(){
        let state=[];
        state.push({
            isEditHidden:"",
            isUpdateHidden:"hidden",
            disabledAllFields:true,
            usernameError:null,
            passwordError:null,
            invalidAccountError:"",
            invalidAccountMessage:"",
            invalidAccountHidden:true,
            validationOnFieldpassword:null,
            validationOnFieldfullName:null,
            validationOnFieldusername:null
        });
        this.handleState(state);
    }
    componentDidMount()
    {
        this.loadData();
    }
 
    loadData(){
        let state=[];
        let userId = parseInt(localStorage.getItem("id"),0);
        let url = this.state.url+userId
        let methodType = "GET";
        this.child.parentAxios(methodType,url,null).then((res)=>{
           // console.log(res);
            if(res.statusText==="OK")
           {    //console.log('here');
                let id = res.data.id;
                let fullName = res.data.fullName;
                let userName = res.data.userName;
                state.push({
                    id:id,fullname:fullName,username:userName
                });
               // console.log(state);
                this.handleState(state);
           }
        }).catch((error)=>{
           console.log(error);
        })
    }
    render() {
        return (
            <Grid>
                 <Common ref={instances => { this.child = instances }} />
                <Row className="show-grid align-items-center justify-content-center">
                    <Col className={"col-md-6 col-md-offset-3"}>
                        <Panel bsStyle="default">
                            <Panel.Heading>
                            <Panel.Title>
                                    Change Profile
                                    </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Common ref={instances => { this.child = instances }}
                                />
                                <FormGroup controlId="formHorizontal" validationState={this.state.usernameError} hidden={this.state.invalidAccountHidden}>
                                 <HelpBlock><ControlLabel><i className="fa fa-close "></i>&nbsp;{this.state.invalidAccountError}</ControlLabel></HelpBlock>
                                 <HelpBlock><ControlLabel><i className="fa fa-close "></i>&nbsp;{this.state.invalidAccountMessage}</ControlLabel></HelpBlock>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal" hidden={true}>
                                <ControlLabel>ID</ControlLabel>
                                <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your id"
                                        defaultValue={this.state.id}
                                        inputRef={(ref) => { this.id = ref }}
                                        disabled={this.state.disabledAllFields}
                                    />
                                <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal" validationState={this.state.validationOnFieldfullName}>
                                <ControlLabel>Full Name</ControlLabel>
                                <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your fullname"
                                        defaultValue={this.state.fullname}
                                        inputRef={(ref) => { this.fullName = ref }}
                                        disabled={this.state.disabledAllFields}
                                    />
                                <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal" validationState={this.state.validationOnFieldusername}>
                                    <ControlLabel>Username</ControlLabel>
                                <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your username"
                                        defaultValue={this.state.username}
                                        inputRef={(ref) => { this.username = ref }}
                                        disabled={this.state.disabledAllFields}
                                    />
                                        <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal_Name" validationState={this.state.validationOnFieldpassword} >
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        label="HardDisk Name"
                                        placeholder="Enter your password"
                                        defaultValue={this.state.password}
                                        inputRef={(ref) => { this.password = ref }}
                                        disabled={this.state.disabledAllFields}
                                    />
                                    <FormControl.Feedback/>
                                </FormGroup>

                            </Panel.Body>
                            <Panel.Footer><center>
                                <Button bsClass={this.state.isEditHidden+ " btn btn-flat btn-default"} onClick={this.handlClickEditEvent.bind(this)}
                                >&nbsp;&nbsp;&nbsp;Edit Profile&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                                <Button bsClass={this.state.isUpdateHidden+ " btn btn-flat btn-default"} onClick={this.handlClickUpdateEvent.bind(this)}
                                >&nbsp;&nbsp;&nbsp;Update Profile&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                                 <Button bsStyle="default" bsClass={"btn btn-flat btn-default"}
                                onClick={this.handleClearContent.bind(this)} >Clear Content</Button>     </center>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );

    }
}

export default Profile;