import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Common from '../Common/Common';
class Manufacturer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturer: [],
            manufacturerInput: '',
            url: 'http://localhost:64294/api/Manufacturers',
            resultData: {
                currentPage: 0,
                success: false,
                total: 0,
                totalPage: 0
            },
            isInputValid: null,
            isInputHidden: true,
            isInsertHidden: '',
            isUpdateHidden: 'hidden',
            actionInsertType:"added a record",
            actionUpdateType:"updated a record",
            token:localStorage.getItem("token"),
            errorValidation:""
        };
    }
    handleClickInsert() {
        let methodType = "POST";
        let url = this.state.url;
        let parameter = {
            Name: this.manufacturerName.value
        };
        let state=[];
        let parentAxios = this.child.parentAxios(methodType, url, parameter);
        parentAxios.then(result => {
            if(result.data.success===true)
            {
                this.loadData();
                state.push({isInputValid:null});
                this.handleState(state);   
                this.child.dialogIsOpen(1,this.state.actionInsertType);
                this.setState({errorValidation:""})
            }
        }).catch(error => {
            console.log(error);
            this.child.dialogIsOpen(2,null);
            state.push({isInputValid:"error"});
            this.handleState(state);   
            console.log(error.response);
            // this.setState({errorValidation:error.response.data.errorMessages[0]})
        })
    }
    handleState(state){
          for(let i=0;i<state.length;i++){
             this.setState(state[i]);
        }
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        let headers = {
            'Authorization': 'Bearer '+this.state.token,
            'Content-Type': 'application/json; charset=utf-8;'
        };
        axios.get(this.state.url + "/?ShowAll=true",{headers:headers}).then(result => {
            if (result.statusText === "OK") {
                var manufacturer = result.data.list;
                this.setState({
                    manufacturer: manufacturer,
                    resultData: {
                        currentPage: result.data.currentPage,
                        success: result.data.success,
                        total: result.data.total,
                        totalPage: result.data.totalPage
                    }
                });

            }
        }).catch(error => {
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
    // onCellButtonConfig(cell, row, enumObject, rowIndex)
    // {
    //     let paramObject ="manufacturer";
    //     return (this.child.cellButton(cell, row, enumObject, rowIndex, this.state.url,this,paramObject));      
    // }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <Button bsClass={"btn btn-flat btn-default"}
                onClick={() =>
                    this.handleSelectUpdate(cell, row, rowIndex)}>
                Select Manufacturer
        </Button>
        )
    }

    handleSelectUpdate(cell, row, rowIndex) {
         if (row.length !== 0) {
             let component = "manufacturer";
             this.child.populateWhenGridIsSelected(row,this.state.url,this,component);
             this.setState({isInputHidden:false});
             this.setState({isUpdateHidden:'',isInsertHidden:'hidden'});
        }
    }
    handleClickUpdate(event) {   
        let paramValue = {
            id: this.manufacturerId.value,
            name: this.manufacturerName.value
        };
        let methodType = "PUT";
        let url = this.state.url + "/" + paramValue.id;
        let state=[];
        this.child.parentAxios(methodType, url, paramValue).then(result => {
            if(result.data.success===true){
                this.loadData();
                state.push({isInputValid:null},{isInputHidden:true},{isInsertHidden:""},{isUpdateHidden:"hidden"});
                this.handleState(state);   
                this.child.dialogIsOpen(1,this.state.actionUpdateType);       
                this.setState({errorValidation:""})      
            }
        }).catch(error => {
            console.log(error);
            this.child.dialogIsOpen(2,null);
            state.push(
                {isInputValid:"error"}              
            );
            this.handleState(state);   
            console.log(error.response);
            this.setState({errorValidation:error.response.data.errorMessages[0]})
        });

    }
    handleClearUpdate(event) {
        event.preventDefault();
        let state=[];
        this.manufacturerId.value = "";
        this.manufacturerName.value = "";
        state.push({isInputValid:null},{isInputHidden:true},{isInsertHidden:""},{isUpdateHidden:"hidden"});
        this.handleState(state);   
        this.setState({errorValidation:""})
                  
    }
    render() 
    {
        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={5}>
                        <Panel bsStyle="default">
                            <Panel.Body>
                                <Common ref={instances => { this.child = instances }} 

                                  
                                />
                                <FormGroup controlId="formHorizontal" 
                                    hidden={this.state.isInputHidden}
                                >
                                    <FieldGroup
                                        disabled="true"
                                        id="formControlsText"
                                        type="text"
                                        label="Manufacturer ID"
                                        placeholder="Manufacturer ID"
                                        inputRef={(ref) => { this.manufacturerId = ref }}                                      
                                    />
                                </FormGroup>
                                <FormGroup controlId="formHorizontal_Name" validationState={this.state.isInputValid} >
                                    <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Manufacturer Name"
                                        placeholder="Enter Manufacturer Name"
                                        inputRef={(ref) => { this.manufacturerName = ref }}                                       
                                    />
                                </FormGroup>
                                <HelpBlock className="has-error">
                                        <ControlLabel >
                                        &nbsp;{this.state.errorValidation}
                                        </ControlLabel></HelpBlock>
                            </Panel.Body>
                            <Panel.Footer>
                                <Button bsClass={this.state.isInsertHidden+" btn btn-flat btn-default"}
                                    onClick={this.handleClickInsert.bind(this)}>Insert Record</Button>&nbsp;
                                <Button bsClass={this.state.isUpdateHidden+" btn btn-flat btn-default"}
                                onClick={this.handleClickUpdate.bind(this)}
                                >Update Manufacturer</Button>&nbsp;
                                
                               
                            </Panel.Footer>
                        </Panel>
                    </Col>
                    <Col xs={12} md={7}>
                        <Panel bsStyle="default">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">List of Manufacturers
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <BootstrapTable data={this.state.manufacturer} 
                                    options={this.pagingTable(this.state.manufacturer.length)}
                                    striped hover>
                                    <TableHeaderColumn dataField='id' isKey={true} width="80" >ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='name' width="160">Manufacturer Name</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='button'
                                        width="100"
                                        dataFormat = {this.cellButton.bind(this)}
                                        //dataFormat={this.onCellButtonConfig.bind(this)}
                                    />
                                </BootstrapTable>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );

    }
}

export default Manufacturer;