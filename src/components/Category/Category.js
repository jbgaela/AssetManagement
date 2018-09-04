import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Common from '../Common/Common';
import axios from 'axios';
import CategoryChild from '../CategoryChild/CategoryChild';
import Pager from '../Pager/Pager';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            categoryInput: '',
            url: 'http://localhost:64294/api/Categories',
            resultData: {
                currentPage: 1,
                success: false,
                total: 0,
                totalPage: 0
            },
            isInputValid: null,
            isInputHidden: 1,
            isInsertHidden: '',
            isUpdateHidden: 'hidden',
            isAlert: "No",
            actionType: "",
            errorBodyMessage: "You have committed some errors.!  Please check your input",
            titleConfirmMessage: "Confirmation Message",
            titleErrorMessage: "Error Message",
            confirmationBodyMessage: "You have successfully ",
            options: {},
            token: localStorage.getItem("token"),
            errorValidation:""

        };
        this.loadData = this.loadData.bind(this);
    }

    ///////INSERT RELATED
    dialogIsOpen(value) {
        if (value === 1) {
            let message = this.state.confirmationBodyMessage + " " + this.state.actionType;
            this.setState({ isInputValid: this.child.getValidationState(1) });
            this.child.onDialogBox(true, this.state.titleConfirmMessage, message);
            setTimeout(this.child.onDialogBox, 2500, false, this.state.titleConfirmMessage, this.state.confirmationBodyMessage);
        }
        else {
            this.setState({ isInputValid: this.child.getValidationState(0) });
            this.child.onDialogBox(true, this.state.titleErrorMessage, this.state.errorBodyMessage);
            setTimeout(this.child.onDialogBox, 2500, false, this.state.titleErrorMessage, this.state.errorBodyMessage);
        }
    }

    handleClickInsert(event) {
        event.preventDefault();
        let category = {
            Name: this.categoryName.value
        };

        let methodType = "POST";
        let url = this.state.url;
        this.setState({ actionType: "added a record" });
        this.child.parentAxios(methodType, url, category, this.state.token).then(res => {
            if (res.statusText === "OK") {
                this.loadData();
                this.dialogIsOpen(1);
                this.setState({errorValidation:""})
            }
        }).catch(error => {
            this.dialogIsOpen(0);
            console.log(error.response);
            // this.setState({errorValidation:error.response.data.errorMessages[0]})
        })
    }

    //////UPDATE RELATED
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <Button bsClass={"btn btn-flat btn-primary"}
                onClick={() =>
                    this.handleSelectUpdate(cell, row, rowIndex)}>
                Select Category
        </Button>

        )
    }

    handleSelectUpdate(cell, row, rowIndex) {
        // console.log('Product #', rowIndex);
        // console.log('Product #', cell);
        if (row.length !== 0) {
            var form = this;
            let getRecordPerRow = row;
            let methodType = "GET";
            let parameter = {
                id: getRecordPerRow.id
            };
            let url = this.state.url + "/" + parameter.id;
            this.child.parentAxios(methodType, url, null, this.state.token).then(result => {
                this.categoryId.value = result.data.id;
                this.categoryName.value = result.data.name;
            });
            this.setState({ isInputHidden: form.child.getInputHiddenState(0), isInsertHidden: form.child.IsInsertHidden(1), isUpdateHidden: form.child.IsUpdateHidden(0), isInputValid: form.child.getValidationState(1) });

        }
    }
    handleClickUpdate(event) {
        event.preventDefault();
        let form = this;
        let paramValue = {
            id: this.categoryId.value,
            name: this.categoryName.value
        };
        this.setState({ actionType: "updated a record" });
        let methodType = "PUT";
        let url = this.state.url + "/" + paramValue.id;
        this.child.parentAxios(methodType, url, paramValue, this.state.token).then(res => {
            if (res.statusText === "OK") {
                this.loadData();

                this.dialogIsOpen(1);
                this.setState({ isInputHidden: form.child.getInputHiddenState(1), isInsertHidden: form.child.IsInsertHidden(0), isUpdateHidden: form.child.IsUpdateHidden(1) });
                this.setState({errorValidation:""})
            }
        }).catch(error => {
            this.dialogIsOpen(0);
            this.setState({ isInputHidden: form.child.getInputHiddenState(0), isInsertHidden: form.child.IsInsertHidden(1), isUpdateHidden: form.child.IsUpdateHidden(0) });
            console.log(error.response);
            this.setState({errorValidation:error.response.data.errorMessages[0]});
        });

    }
    /////Clear Related
    handleClearUpdate(event) {
        event.preventDefault();
        let form = this;
        this.categoryId.value = "";
        this.categoryName.value = "";
        this.setState({ isInputHidden: form.child.getInputHiddenState(1), isInsertHidden: form.child.IsInsertHidden(0), isUpdateHidden: form.child.IsUpdateHidden(1) });
        this.setState({ isInputValid: this.child.getValidationState(1) });
        this.setState({errorValidation:""})
    }
    /////DISPLAY RELATED

    componentDidMount() {
        let currentPage =this.state.resultData.currentPage;
        let url = this.state.url + "?CurrentPage="+currentPage;
        this.loadData(url);

    }
    pageronClick(value){
        this.loadData((this.state.url + "?CurrentPage="+value));
    }
    loadData(url) {
        let headers = {
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json; charset=utf-8;'
        };
        console.log
        axios.get(this.state.url+"?ShowAll=true", { headers: headers }).then(result => {
            if (result.statusText === "OK") {
                var categoryList = result.data.list;
                this.setState({
                    category: categoryList,
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

    

    pagingTable(val) {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [
            {
                text: '5', value: 5
            }, 
            {
                text: '10', value: 10
            }, {
                text: 'All', value: val
            }], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'both'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };
        return options;
    }

    render() {

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
                    <Common ref={instances => { this.children = instances }} />
                    <Row className="show-grid">
                        <Col xs={12} md={5}>
                            <Panel bsStyle="default">
                                <Panel.Body>
                                    <FormGroup controlId="formHorizontal" hidden={this.state.isInputHidden}>
                                        <FieldGroup
                                            disabled="true"
                                            id="formControlsText"
                                            type="text"
                                            label="Category ID"
                                            placeholder="Category ID"
                                            inputRef={(ref) => { this.categoryId = ref }}
                                        />
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontal_Name" validationState={this.state.isInputValid} >

                                        <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            label="Category Name"
                                            placeholder="Enter Category"
                                            inputRef={(ref) => { this.categoryName = ref }}
                                        />

                                    </FormGroup>
                                    <HelpBlock className="has-error">
                                        <ControlLabel >
                                        &nbsp;{this.state.errorValidation}
                                        </ControlLabel></HelpBlock>
                               
                                </Panel.Body>

                                <CategoryChild
                                    ref={instance => { this.child = instance; }}
                                    actionInsert={this.handleClickInsert.bind(this)}
                                    actionInsertState={this.state.isInsertHidden}
                                    actionUpdate={this.handleClickUpdate.bind(this)}
                                    actionUpdateHidden={this.state.isUpdateHidden}
                                    actionClear={this.handleClearUpdate.bind(this)}
                                />
                            </Panel>
                        </Col>
                        <Col xs={12} md={7}>
                            <Panel bsStyle="default">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">List of Categories

                                </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body>
                                    {/* <Pager ref={instance => { this.childPager = instance; }}
                                        sizePerPage= {this.state.resultData.totalPage}
                                        totalResult= {this.state.resultData}
                                        pageOnClick= {this.pageronClick.bind(this)}
                                    /> */}
                                    <BootstrapTable data={this.state.category} 
                                        options={this.pagingTable(this.state.category.length)} 
                                        
                                        striped hover>
                                        <TableHeaderColumn dataField='id' isKey={true} >Category ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField='name'>Category Name</TableHeaderColumn>
                                        <TableHeaderColumn
                                            dataField='button'
                                            dataFormat={this.cellButton.bind(this)}
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

export default Category;