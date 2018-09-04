import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup,HelpBlock } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Common from '../Common/Common';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
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
            requiredOnFieldpassword:null,
            requiredOnFieldfullName:null,
            requiredOnFieldusername:null,
            invalidAccountHidden:true,
            disabledAllFields:true,
            isEditHidden:"",
            isUpdateHidden:"hidden",
            actionUpdateType:"added a record",
        };
    }
    handleState(state) {
        for (let i = 0; i < state.length; i++) {
          this.setState(state[i]);
        }
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
            let required = "requiredOnField" + item;
            //console.log(model);
            if (getValue === null || getValue === undefined || getValue === "" || getValue === "0") {
              counter++;
              state.push({ [model]: "error",[required]:" required field" });
              this.handleState(state);
            }
            else {
              state.push({ [model]: null,[required]:null });
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
    handlClickRegisterEvent(event){
        let state = [];
        this.SetStateManually();
        let counter = this.checkValidation();
        console.log(counter);
        if(counter>0){
            return false;
        }
        let parameter = {
            userName: this.state.username,
            password:this.state.password,
            fullName:this.state.fullname
        };
        let methodType="POST";
        let url = this.state.url;
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
            username:"",
            password:"",
            fullname:"",
            validationOnFieldfullName:null,
            validationOnFieldpassword:null,
            validationOnFieldusername:null,
            requiredOnFieldpassword:null,
            requiredOnFieldfullName:null,
            requiredOnFieldusername:null,
        });
        this.username.value = "";
        this.password.value = "";
        this.fullName.value = "";

        this.handleState(state);
    }
    componentDidMount()
    {
        this.loadData();
    }
 
    loadData(){
        let methodType = "GET";
        let url = this.state.url;
        this.child.parentAxios(methodType,url,null).then((res)=>{
           if(res.statusText==="OK")
           {   
                console.log(res);
                this.setState({
                    user:res.data.list
                })
           }
        }).catch((error)=>{
           console.log(error);
        })
    }
    renderShowsTotal(start, to, total) {
        return (
            <p style={{ color: '#010101' }}>
                From {start} to {to}, Total Record(s) is {total}
            </p>
        );
    }
    pagingTable(val) {
        return {
            page: 1,  // which page you want to show as default
            sizePerPageList: [
                {
                    text: '5', value: 5
                },
                {
                    text: '10', value: 10
                },
                {
                    text: 'All', value: val
                }
            ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'both'  // default is bottom, top and both is all available
        };
    }
    render() {
        return (
            <Grid>
                 <Common ref={instances => { this.child = instances }} />
                <Row className="show-grid align-items-center justify-content-center">
                    <Col xs={12} md={5}>
                        <Panel bsStyle="default">
                            <Panel.Heading>
                            <Panel.Title>
                                   Register User
                                    </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <Common ref={instances => { this.child = instances }}
                                />
                                <FormGroup controlId="formHorizontal3" validationState={this.state.usernameError} hidden={this.state.invalidAccountHidden}>
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
                                <FormGroup controlId="formHorizontal2" validationState={this.state.validationOnFieldfullName}>
                                <ControlLabel>Full Name
                                <span className="requiredError"><b>&nbsp;*&nbsp;{this.state.requiredOnFieldfullName}</b></span>
                                </ControlLabel>
                                <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your fullname"
                                        defaultValue={this.state.fullname}
                                        inputRef={(ref) => { this.fullName = ref }}
                                    />
                                <FormControl.Feedback/>
                                
                                </FormGroup>
                                <FormGroup controlId="formHorizontal1" validationState={this.state.validationOnFieldusername}>
                                    <ControlLabel>Username
                                    <span className="requiredError"><b>&nbsp;*&nbsp;{this.state.requiredOnFieldusername}</b></span>
                              

                                    </ControlLabel>
                                <FormControl
                                        type="text"
                                        label="HardDisk ID"
                                        placeholder="Enter your username"
                                        defaultValue={this.state.username}
                                        inputRef={(ref) => { this.username = ref }}

                                    />
                                        <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontal_Name" validationState={this.state.validationOnFieldpassword} >
                                    <ControlLabel>Password
                                    <span className="requiredError"><b>&nbsp;*&nbsp;{this.state.requiredOnFieldpassword}</b></span>
                              

                                    </ControlLabel>
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
                                <Button bsClass={this.state.isEditHidden+ " btn btn-flat btn-default"} onClick={this.handlClickRegisterEvent.bind(this)}
                                >&nbsp;&nbsp;&nbsp;Register User&nbsp;&nbsp;&nbsp;</Button>&nbsp;
                             </center>
                            </Panel.Footer>
                        </Panel>
                    </Col>
                    <Col xs={12} md={7}>
                    <Panel bsStyle="default">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">List of Users
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <BootstrapTable data={this.state.user} 
                                    options={this.pagingTable(this.state.user.length)}
                                    striped hover>
                                    <TableHeaderColumn dataField='id' isKey={true} width="80" >ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='fullName' width="160">Full name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='userName' width="160">Username</TableHeaderColumn>

                                </BootstrapTable>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );

    }
}

export default Profile;