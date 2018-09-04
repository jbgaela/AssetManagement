import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Form, FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Common from '../Common/Common';

class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: [],
      statusUrl: 'http://localhost:64294/api/statustypes',
      statusList: [],
      url: 'http://localhost:64294/api/Assets',
      parenturl: "http://localhost:64294/api/Assets?ShowAll=true",      
      supplierUrl: 'http://localhost:64294/api/Suppliers',
      supplierList: [],
      modelUrl: 'http://localhost:64294/api/Models',
      modelList: [],
      processorUrl: 'http://localhost:64294/api/Processors',
      processorList: [],
      memoryUrl: 'http://localhost:64294/api/Sizes/memory',
      memoryList: [],
      categoryUrl: 'http://localhost:64294/api/categories',
      categoryList: [],
      videocardUrl: 'http://localhost:64294/api/Sizes/videocard',
      videocardList: [],
      hardDiskUrl: 'http://localhost:64294/api/Sizes/harddisk',
      hardDiskList: [],
      manufacturerUrl: 'http://localhost:64294/api/Manufacturers',
      manufacturerList: [],
      orderByColumn: [
        {
          "name": "Id",
          "value": 1
        },
        {
          "name": "Asset Tag",
          "value": 2
        },
        {
          "name": "Name",
          "value": 3
        },
        {
          "name": "Status",
          "value": 4
        }
      ],
      resultData: {
        currentPage: 0,
        success: false,
        total: 0,
        totalPage: 0
      },
      show: false,
      disAbledAllFields: false,
      actionInsertType: "added a record",
      actionUpdateType: "updated a record",
      isInsertHidden: '',
      isInsertDisabled: true,
      isUpdateDisabled: true,
      isUpdateHidden: 'hidden',
      disabledCategoryOnly: false,
      isforHidden: false,
      validationOnFieldmodelId: null,
      validationOnFieldassetTag: null,
      validationOnFieldname: null,
      validationOnFieldstatus: null,
      ValidationFieldOnpurchaseCost:null,
      requriedFieldmodelId:null,
      requriedFieldassetTag:null,
      requriedFieldname:null,
      requriedFieldstatus:null,
      inputNumberFieldpurchaseCost:null,
      keyword:"",
      token:localStorage.getItem("token"),
      inputState: {
        serialNo: "",
        assetTag: "",
        battery: "",
        adapter: "",
        name: "",
        assignedTo: "",
        poNo: "",
        drNo: "",
        siNo: "",
        macAddress: "",
        ipAddress: "",
        purchaseCost: "",
        notes: ""
      }


    };
    this.handlePopUpClick = this.handlePopUpClick.bind(this);
  }
  checkValidation() {
    let counter = 0;
    let parent = this;
    let param = [];
    param.push(this.handleDataParam());
    let state = [];
    param.forEach((item, key) => {
      let checkFieldifNull = {
        modelId: 0,
        status: 0
      };

      Object.keys(checkFieldifNull).forEach((item, index) => {
        let getValue = parent[item].value;
        let model = "validationOnField" + item;
        let required = "requriedField" + item;
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
    let checkFieldifNullInput={
      assetTag:"",
      name:"",
    };
    Object.keys(checkFieldifNullInput).forEach((item,index)=>{
          let getValue =parent.state.inputState[item]; 
          let model = "validationOnField"+item;
          let required = "requriedField" + item;
          if(getValue===null||getValue===undefined||getValue===""){
            counter++;
            state.push({[model]:"error",[required]:" required field" });   
            this.handleState(state);
          }
          else{
            state.push({[model]:null,[required]:null});
            this.handleState(state);
          }    
       })

    });
    if(isNaN(this.state.inputState.purchaseCost))
    {
      state.push({ValidationFieldOnpurchaseCost:"error",inputNumberFieldpurchaseCost:" * must be digit/s only"});
      this.handleState(state);
      counter++;
    }
    else{
      state.push({ValidationFieldOnpurchaseCost:null,inputNumberFieldpurchaseCost:""});
      this.handleState(state);
    }
    return counter;
    }
  handlePopUpClick() {
    this.setState({ show: true });
    let state = [];
    state.push({
      inputState: {
        id: "",
        serialNo: "",
        assetTag: "",
        battery: "",
        adapter: "",
        name: "",
        assignedTo: "",
        poNo: "",
        drNo: "",
        siNo: "",
        macAddress: "",
        ipAddress: "",
        purchaseCost: "",
        notes: ""
      }
      , isInsertHidden: '',isforHidden: false, isUpdateHidden: 'hidden', disAbledAllFields: true, disabledCategoryOnly: false
    });
    this.handleState(state);
  }
  GetLoadedFiles() {
    this.GeneralLoad(this.state.supplierUrl, "supplierList");
    this.GeneralLoad(this.state.modelUrl, "modelList");
    this.GeneralLoad(this.state.processorUrl, "processorList");
    this.GeneralLoad(this.state.memoryUrl, "memoryList");
    this.GeneralLoad(this.state.videocardUrl, "videocardList");
    this.GeneralLoad(this.state.hardDiskUrl, "hardDiskList");
    this.GeneralLoad(this.state.manufacturerUrl, "manufacturerList");
    this.GeneralLoad(this.state.categoryUrl, "categoryList");
    this.GeneralLoad(this.state.statusUrl, "statusList");
  }
  handlePopUpHide() {
    this.setState({ show: false,
      validationOnFieldmodelId: null,
      validationOnFieldassetTag: null,
      validationOnFieldname: null,
      validationOnFieldstatus: null,
      ValidationFieldOnpurchaseCost:null,
      requriedFieldmodelId:null,
      requriedFieldassetTag:null,
      requriedFieldname:null,
      requriedFieldstatus:null,
      inputNumberFieldpurchaseCost:null, });
  }
  componentDidMount() {
    this.loadData(this.state.parenturl);
    this.GetLoadedFiles();
  }
  GetValue(event) {
    event.preventDefault();
    let value = this.categoryId;
    if (value !== undefined) {
      let state = [];
      this.setState({ disAbledAllFields: false, isInsertDisabled: false, isUpdateDisabled: false });
      var index = value.selectedIndex;
      let dataRec = value[index].text;
      this.changeAssetValue(dataRec, state, value);
    }


  }
  changeAssetValue(dataRec, state, value) {
    console.log(dataRec);
    if (dataRec === "Monitor".toLowerCase() || dataRec === "Monitor".toUpperCase()) {
      //this.categoryName.value = dataRec;
      state.push({ isforHidden: true, disAbledAllFields: false, });
      this.handleState(state);
    }
    else if (dataRec === "Laptop".toLowerCase() || dataRec === "LAPTOP".toUpperCase()) {
      //this.categoryName.value = "LAPTOP";
      // console.log('here');
      state.push({ isforHidden: false, disAbledAllFields: false });
      this.handleState(state);
    }
    if (value === 0 || value === "0") {
      state.push({ isforHidden: false, disAbledAllFields: true });
      this.handleState(state);
      //this.categoryName.value = "";
    }
  }

  handleState(state) {
    for (let i = 0; i < state.length; i++) {
      this.setState(state[i]);
    }
  }
  GeneralLoad(path, list) {
    if (this.child !== undefined) {
      let showAll = "/?ShowAll=true";
      let url = path + showAll;

      if (list === "statusList")
        url = path;
      let methodType = "GET";
      let parentAxios = this.child.parentAxios(methodType, url, null);
      let recordData = [];
      parentAxios.then(result => {

        if (list === "statusList") {
          this.setState({ statusList: result.data });
        }
        if (result.data.success === true) {
          recordData = result.data.list;
          this.setState({ [list]: recordData });


        }
      }).catch(error => {
        console.log(error);
      })
    }
  }
  handleDataParam() {
    let radix = 0;
    return {
      SupplierId: parseInt(this.supplierId.value, radix) === 0 ? null : parseInt(this.supplierId.value, radix),
      ModelId: parseInt(this.modelId.value, radix) === 0 ? null : parseInt(this.modelId.value, radix),//parseInt(this.modelId.value,radix),
      ProcessorId: parseInt(this.processorId.value, radix) === 0 ? null : parseInt(this.processorId.value, radix),//parseInt(this.processorId.value,radix),
      MemoryId: parseInt(this.memoryId.value, radix) === 0 ? null : parseInt(this.memoryId.value, radix),//parseInt(this.memoryId.value,radix),
      VideoCardId: parseInt(this.videoCardId.value, radix) === 0 ? null : parseInt(this.videoCardId.value, radix),//parseInt(this.videoCardId.value,radix),
      HardDiskId: parseInt(this.hardDiskId.value, radix) === 0 ? null : parseInt(this.hardDiskId.value, radix),//parseInt(this.hardDiskId.value,radix),
      ManufacturerId: parseInt(this.manufacturerId.value, radix) === 0 ? null : parseInt(this.manufacturerId.value, radix),//parseInt(this.manufacturerId.value,radix),
      CategoryId: parseInt(this.categoryId.value, radix) === 0 ? null : parseInt(this.categoryId.value, radix),//parseInt(this.categoryId.value,radix),
      DeliveryDate: this.refs.deliveryDate.value,//this.deliveryDate.value,//"2018-07-20T11:24:26.087Z",
      Status: parseInt(this.status.value, radix) === 0 ? null : parseInt(this.status.value, radix),//parseInt(this.status.value),
      PurchaseDate: this.refs.purchaseDate.value,//date,//"2018-07-20T11:24:26.087Z",
      SerialNo: this.state.inputState.serialNo,
      AssetTag: this.state.inputState.assetTag,
      Battery: this.state.inputState.battery,
      Adapter: this.state.inputState.adapter,
      Name: this.state.inputState.name,
      AssignedTo: this.state.inputState.assignedTo,
      PoNo: this.state.inputState.poNo,
      DrNo: this.state.inputState.drNo,
      SiNo: this.state.inputState.siNo,
      MacAddress: this.state.inputState.macAddress,
      IpAddress: this.state.inputState.ipAddress,
      PurchaseCost: (this.state.inputState.purchaseCost === "" || this.state.inputState.purchaseCost === undefined || this.state.inputState.purchaseCost == null) ? null : parseFloat(this.state.inputState.purchaseCost, radix).toFixed(2),
      Notes: this.state.inputState.notes,
    };
  }

  handleClickInsert(event) {
    
    this.commonChange();
    let counter = this.checkValidation();
    if (counter > 0) {
      this.child.dialogIsOpen(2, null);
      return false;
    }
    let methodType = "POST";
    let url = this.state.url;
    let parameter = this.handleDataParam();
    let parentAxios = this.child.parentAxios(methodType, url, parameter);
    parentAxios.then(result => {
      if (result.data.success === true) {
        this.loadData(this.state.parenturl);
        this.child.dialogIsOpen(1, this.state.actionInsertType);
      }
    }).catch(error => {
      console.log(error);
      this.child.dialogIsOpen(2, null);
    });
  }
  handleClickUpdate() {

    this.commonChange();
    let counter = this.checkValidation();
    if (counter > 0) {
      this.child.dialogIsOpen(2, null);
      return false;
    }
    this.state.inputState["id"] = parseInt(this.id.value, 0);
    let parameter = this.handleDataParam();
    parameter["id"] = this.state.inputState.id; 
    let methodType = "PUT";
    let url = this.state.url + "/" + parameter.id;
    let state = [];
    this.child.parentAxios(methodType, url, parameter).then(result => {
      if (result.data.success === true) {
        this.handlePopUpHide();
        this.loadData(this.state.parenturl);
        this.child.dialogIsOpen(1, this.state.actionUpdateType);
        state.push({ isInsertHidden: '', isUpdateHidden: 'hidden' });
        this.handleState(state);

      }
    }).catch(error => {
      console.log(error);
      this.child.dialogIsOpen(2, null);
    });
  }
  SearchKeyword(){
    let keyword = this.keyword.value;
    this.state.keyword = keyword;
    let url = this.state.url+"?Keyword="+this.state.keyword;
    this.loadData(url);
  }
  GetOrderByColumn(event)
  {
     let column =  this.sortcolumn.value;
     //let type = this.sorttype.value;
     let url = "http://localhost:64294/api/Assets?OrderBy="+ column+"&ShowAll=true";
     this.loadData(url);
  }
  GetOrderByType(event)
  {
     let column = this.sortcolumn.value;
     let type = event.target.value;
     let url = "http://localhost:64294/api/Assets?OrderBy="+ column+"&OrderType="+type+"&ShowAll=true";
     //console.log(url);
     this.loadData(url);
  }
  loadData(url) {
    let headers = {
      'Authorization': 'Bearer '+this.state.token,
      'Content-Type': 'application/json; charset=utf-8;'
  };
 
  axios.get(url,{headers:headers}).then(result => 
    {
      if (result.statusText === "OK") {
        var asset = result.data.list;
        this.setState({
          asset: asset,
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
  commonChange() {
    let parent = this;
    Object.keys(this.state.inputState).forEach((item,index)=>
    {
      this.state.inputState[item]= parent[item].value;
    });
   }
  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <div>
        <Button bsClass={"btn btn-flat btn-default"}
          onClick={() =>
            this.handleMoreInfo(row, true)}>
          <i className=""></i>&nbsp;More Info
        </Button>&nbsp;
          <Button bsClass={"btn btn-flat btn-default"}
          onClick={() =>
            this.handleMoreInfo(row, false)}>
          <i className=""></i>&nbsp;Edit Asset
        </Button>
      </div>
    )
  }
  parentAxios(methodType, url, param) {
    
    return axios({
      url: url,
      method: methodType,
      data: param,
      headers: {
        'Authorization': 'Bearer '+this.state.token,
        'Content-Type': 'application/json; charset=utf-8',

      }
    });
  }
  handleMoreInfo(row, disabled) {
    this.handlePopUpClick();
    let state = [];
    if (disabled === true)
    {
      state.push({ isInsertHidden: 'hidden', isUpdateHidden: 'hidden', 
      disAbledAllFields: disabled, disabledCategoryOnly: disabled,isUpdateDisabled:false, });
      this.changeAssetValue(row.categoryName, state, row.categoryId);
      state.push({ isInsertHidden: 'hidden', isUpdateHidden: 'hidden', 
      disAbledAllFields: disabled, disabledCategoryOnly: disabled,isUpdateDisabled:false, });
    }
    else
    {  
      state.push({ isInsertHidden: 'hidden', isUpdateHidden: '',     
      disAbledAllFields: disabled, disabledCategoryOnly: disabled,isUpdateDisabled:false, });
      this.changeAssetValue(row.categoryName, state, row.categoryId);
    }
    this.handleState(state);
    //console.log(row);
   
    let funcParam = {
      methodType: "GET",
      url: this.state.url + "/" + row.id
    };

    this.parentAxios(funcParam.methodType, funcParam.url, null).then(result => {
      this.setState({
        inputState: {
          id: result.data.id,
          serialNo: result.data.serialNo,
          assetTag: result.data.assetTag,
          battery: result.data.battery,
          adapter: result.data.adapter,
          name: result.data.name,
          assignedTo: result.data.assignedTo,
          poNo: result.data.poNo,
          drNo: result.data.drNo,
          siNo: result.data.siNo,
          macAddress: result.data.macAddress,
          ipAddress: result.data.ipAddress,
          purchaseCost: result.data.purchaseCost,
          notes: result.data.notes
        }
      })
      this.supplierId.value = result.data.supplierId==null?0:result.data.supplierId;
      this.modelId.value = result.data.modelId==null?0:result.data.modelId;
      this.processorId.value = result.data.processorId==null?0:result.data.processorId;
      this.memoryId.value = result.data.memoryId==null?0:result.data.memoryId;
      this.videoCardId.value = result.data.videoCardId==null?0:result.data.videoCardId;
      this.hardDiskId.value = result.data.hardDiskId==null?0:result.data.hardDiskId;
      this.status.value = result.data.status==null?0:result.data.status;
      this.manufacturerId.value = result.data.manufacturerId==null?0:result.data.manufacturerId;
      this.categoryId.value = result.data.categoryId==null?0:result.data.categoryId;
      this.refs.purchaseDate.value = result.data.purchaseDate === null || result.data.purchaseDate === "" ? null : result.data.purchaseDate.replace("T00:00:00", ""); //result.data.purchaseDate.replace("T00:00:00", "");
      this.refs.deliveryDate.value = result.data.deliveryDate === null || result.data.deliveryDate === "" ? null : result.data.deliveryDate.replace("T00:00:00", ""); //result.data.purchaseDate.replace("T00:00:00", "");
    })
  }
  renderShowsTotal(start, to, total) {
    return (
      <div>
      <p style={{ color: '#010101' }}>
        Record {start} to {to}
      </p>
      <p style={{ color: '#010101' }}>
      The total number of Record(s) is {total}
    </p>
    </div>
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

    function FieldGroup({ id, label, help, hasRequired, ...props, }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}<span className='requiredError'><b>{hasRequired}</b></span></ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }
    return (

      <Grid>
        <Common
          ref={instances => { this.child = instances }}
        />

        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Panel bsStyle="default">
              <Panel.Heading>
                <Panel.Title componentClass="h3">List of Assets
                            </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <Row className="show-grid">
                  <Col xs={12} md={4}>
                    <FormGroup controlId="formControlOrderByColumn" >
                      <ControlLabel>Order By Column</ControlLabel>
                      <FormControl componentClass="select" placeholder="Select Column" 
                          disabled={this.state.disabledCategoryOnly}
                          onChange={this.GetOrderByColumn.bind(this)}
                          inputRef={(ref) => { this.sortcolumn = ref }}
                      >
                        <option value='0'>Please select an option</option>
                        {this.state.orderByColumn.map((product, index) => {
                          return <option value={product.value} key={index}>{product.name.toUpperCase()}</option>
                        })}
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={4}>
                    <FormGroup controlId="formControlOrderByType" >
                      <ControlLabel>Order By Type</ControlLabel>
                      <FormControl componentClass="select" placeholder="Select Type" disabled={this.state.disabledCategoryOnly}
                       onChange={this.GetOrderByType.bind(this)}
                       inputRef={(ref) => { this.sorttype = ref }}
                      >
                        <option value='0'>Please select the type</option>
                        <option value='1'>Ascending</option>
                        <option value='2'>Descending</option>
                      </FormControl>
                    </FormGroup></Col>
                  <Col xs={12} md={4}>
                    <FormGroup controlId="formHorizontalID" validationState={this.state.isInputValid}  >
                    <ControlLabel>Search Keyword</ControlLabel>
                    <InputGroup>
                      {/* <FieldGroup
                        id="formControlsID"
                        type="text"
                        label="Search Asset"
                        placeholder="Search a keyword"
                        defaultValue= {this.state.keyword}
                        inputRef={(ref) => { this.keyword = ref }}
                        // onInput={this.SearchKeyword.bind(this)}
                      /> */}
                       <FormControl
                                          type="text"
                                          label="Search Asset"
                                          placeholder="Search a keyword"
                                          defaultValue= {this.state.keyword}
                                          inputRef={(ref) => { this.keyword = ref }}
                                          
                                          />
                       <InputGroup.Addon className="btn-default" onClick={this.SearchKeyword.bind(this)}>
                          <i className="fa fa-search"></i>
                       </InputGroup.Addon>
                       </InputGroup>
                    </FormGroup>
                  </Col>

                </Row>
                <BootstrapTable pagination={true}  data={this.state.asset}
                  options={this.pagingTable(this.state.asset.length)}
                  striped hover>
                  <TableHeaderColumn dataField='id' isKey={true} width='50' >  ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='serialNo' >S/N</TableHeaderColumn>
                  <TableHeaderColumn dataField='assetTag'>Asset Tag</TableHeaderColumn>
                  <TableHeaderColumn dataField='statusType' width='85' >Status</TableHeaderColumn>
                  <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                  <TableHeaderColumn dataField='assignedTo'>Assigned To</TableHeaderColumn>
                  <TableHeaderColumn dataField='button' width="225" dataFormat={this.cellButton.bind(this)} />
                </BootstrapTable>
                <center>
                <Button align="right" bsStyle="default" className="AddButton"  onClick={this.handlePopUpClick.bind(this)}>
                    <strong>+</strong>
                </Button>
                </center>
              </Panel.Body>
              <Panel.Footer className={"text-right"}>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
        <Modal show={this.state.show} onHide={this.handlePopUpHide.bind(this)}
         container={this} dialogClassName='custom-dialog' aria-labelledby="contained-modal-title" >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Asset Management
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <Panel bsStyle="default">
                  <Panel.Body>
                    <FormGroup controlId="formControlCategory" >
                      <FormControl componentClass="select" placeholder="Select Category" disabled={this.state.disabledCategoryOnly}
                        inputRef={(ref) => { this.categoryId = ref }} onChange={this.GetValue.bind(this)}  >
                        <option value='0'>Choose a category</option>
                        {
                          this.state.categoryList.map((product, i) => {
                            return <option value={product.id} key={i}>{product.name}</option>
                          })
                        }
                      </FormControl>
                    </FormGroup>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <Panel bsStyle="default">
                  <Panel.Body>
                    <Form id={"AssetForm"} ref={"AssetForm"}>
                      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix">
                          <Col sm={3}>
                            <Nav bsStyle="" stacked>
                              <NavItem eventKey="first"><i className=""></i> &nbsp;&nbsp;Specification</NavItem>
                              <NavItem eventKey="second"><i className=""></i> &nbsp;&nbsp;Details</NavItem>
                              {/* <NavItem eventKey="third"><i className="fa  fa-bar-chart"></i> &nbsp;&nbsp; Accounting</NavItem> */}
                            </Nav>
                          </Col>
                          <Col sm={9}>
                            <Tab.Content animation>
                              <Tab.Pane eventKey="first">
                                <Row>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>

                                        <FormGroup controlId="formHorizontalID" hidden={true}
                                          validationState={this.state.isInputValid} /*hidden={true}*/ >
                                          {/* <FieldGroup
                                          id="formControlsID"
                                          type="text"
                                          label="ID"
                                          placeholder="Enter ID"
                                          inputRef={(ref) => { this.id = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>ID</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='id'
                                            placeholder='Enter Serial Number'
                                            defaultValue={this.state.inputState.id}
                                            inputRef={(ref) => { this.id = ref }}
                                           
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalSerialNo" validationState={this.state.isInputValid}  >
                                          {/* <FieldGroup
                                          id="serialNum"
                                          type="text"
                                          label="Serial Number"
                                          placeholder="Enter Serial Number"
                                          value={this.state.serialNo}
                                          inputRef={(ref) => { this.serialNum = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                        
                                          <ControlLabel>Serial Number</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='serialNo'
                                            label="Serial Number"
                                            placeholder='Enter Serial Number'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.serialNo}
                                            inputRef={(ref) => { this.serialNo = ref }}
                                          
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formControlModel" validationState={this.state.validationOnFieldmodelId}>
                                          <ControlLabel>Model <span className="requiredError"><b>*&nbsp;{this.state.requriedFieldmodelId}</b></span> </ControlLabel>
                                          <FormControl componentClass="select" disabled={this.state.disAbledAllFields}
                                            inputRef={(ref) => { this.modelId = ref }}
                                            placeholder="Select Model"   >
                                            <option value='0'>Select a model</option>
                                            {
                                              this.state.modelList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.name}</option>
                                              })
                                            }
                                          </FormControl>
                                          <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalBattery" validationState={this.state.isInputValid} hidden={this.state.isforHidden} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Battery"
                                          placeholder="Enter Battery"
                                          inputRef={(ref) => { this.battery = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Battery</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='battery'
                                            label="Battery"
                                            placeholder='Enter a battery'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.battery}
                                            inputRef={(ref) => { this.battery = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalAdapter" validationState={this.state.isInputValid} hidden={this.state.isforHidden} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Adapter"
                                          placeholder="Enter Adapter"
                                          inputRef={(ref) => { this.adapter = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Adapter</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='adapter'
                                            placeholder='Enter an adapter'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.adapter}
                                            inputRef={(ref) => { this.adapter = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formControlProcessor" hidden={this.state.isforHidden}>
                                          <ControlLabel>Processor</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Processor"
                                            inputRef={(ref) => { this.processorId = ref }}
                                            disabled={this.state.disAbledAllFields}
                                          >
                                            <option value='0'>Please select a processor</option>
                                            {
                                              this.state.processorList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.name}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>

                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>

                                        <FormGroup controlId="formControlMemory" hidden={this.state.isforHidden} >
                                          <ControlLabel>RAM Size</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Memory"
                                            inputRef={(ref) => { this.memoryId = ref }}
                                            disabled={this.state.disAbledAllFields}
                                          >
                                            <option value='0'>Select a RAM Size</option>
                                            {
                                              this.state.memoryList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.size}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>

                                        <FormGroup controlId="formControlHardDisk" hidden={this.state.isforHidden}>
                                          <ControlLabel>Hard Disk</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select HardDisk"
                                            inputRef={(ref) => { this.hardDiskId = ref }}
                                            disabled={this.state.disAbledAllFields}
                                          >
                                            <option value='0'>Select a Hard disk size</option>
                                            {
                                              this.state.hardDiskList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.size}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId="formControlVideoCard" hidden={this.state.isforHidden}>
                                          <ControlLabel>Video Card</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Video Card"
                                            inputRef={(ref) => { this.videoCardId = ref }}
                                            disabled={this.state.disAbledAllFields}
                                          >
                                            <option value='0'>Select a Video Card size</option>
                                            {
                                              this.state.videocardList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.size}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalMacAddress" validationState={this.state.isInputValid} hidden={this.state.isforHidden} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="MacAddress"
                                          placeholder="Enter Mac Address"
                                          inputRef={(ref) => { this.macAddress = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Mac Address</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='macAddress'
                                            placeholder='Enter Mac Address'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.macAddress}
                                            inputRef={(ref) => { this.macAddress = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formControlManufacturer" >
                                          <ControlLabel>Manufacturer</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Manufacturer"
                                            inputRef={(ref) => { this.manufacturerId = ref }}
                                            disabled={this.state.disAbledAllFields}
                                          >
                                            <option value='0'>Select a manufacturer</option>
                                            {
                                              this.state.manufacturerList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.name}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                </Row>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <Row>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>
                                        <FormGroup controlId="formHorizontalAssetTag"
                                          validationState={this.state.validationOnFieldassetTag} >
                                          <ControlLabel>Asset Tag <span className="requiredError"><b> *&nbsp;{this.state.requriedFieldassetTag}</b></span></ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='assetTag'
                                            placeholder='Enter Asset Tag'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.assetTag}
                                            inputRef={(ref) => { this.assetTag = ref }}
                                          />
                                          <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formControlCategory" hidden={true}>
                                          <FieldGroup
                                            id="formControlsText"
                                            type="text"
                                            label="Category"
                                            placeholder="Enter Category"
                                            inputRef={(ref) => { this.categoryName = ref }}

                                          />
                                          <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalStatus" validationState={this.state.validationOnFieldstatus} >
                                          <ControlLabel>Status <span className="requiredError"><b>*&nbsp;{this.state.requriedFieldstatus}</b></span></ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Status"
                                            inputRef={(ref) => { this.status = ref }} disabled={this.state.disAbledAllFields} >
                                            <option value='0'>Select a status</option>
                                            {
                                              this.state.statusList.map((product, i) => {
                                                return <option value={product.value} key={i}>
                                                  {product.name.toUpperCase()}
                                                </option>
                                              })
                                            }
                                          </FormControl>
                                          <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalName" validationState={this.state.validationOnFieldname} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Name"
                                          placeholder="Enter Name"
                                          hasRequired=" *"
                                          inputRef={(ref) => { this.name = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        />
                                         <FormControl.Feedback/> */}
                                          <ControlLabel>Name <span className="requiredError"><b> *&nbsp;{this.state.requriedFieldname}</b></span></ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='name'
                                            placeholder='Enter Name'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.name}
                                            inputRef={(ref) => { this.name = ref }}
                                          />
                                          <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalAssignedTo" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Assigned To"
                                          placeholder="Enter Assigned To"
                                          inputRef={(ref) => { this.assignedTo = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Assigned To </ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='assignedTo'
                                            placeholder='Enter Assigned To'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.assignedTo}
                                            inputRef={(ref) => { this.assignedTo = ref }}
                                          />
                                        </FormGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>
                                        <FormGroup controlId="formHorizontalIPAddress" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="IP Address"
                                          placeholder="Enter IP Address"
                                          inputRef={(ref) => { this.ipAddress = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>IP Address </ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='ipAddress'
                                            placeholder='Enter IP Address'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.ipAddress}
                                            inputRef={(ref) => { this.ipAddress = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalNotes" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Notes"
                                          placeholder="Enter Notes"
                                          inputRef={(ref) => { this.notes = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Notes</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='notes'
                                            placeholder='Enter Notes'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.notes}
                                            inputRef={(ref) => { this.notes = ref }}
                                          />
                                        </FormGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                </Row>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                <Row>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>
                                        <FormGroup controlId="formHorizontalPurchaseDate" validationState={this.state.isInputValid} >
                                          <ControlLabel>Purchase Date</ControlLabel>
                                          <input type="date"
                                            disabled={this.state.disAbledAllFields}
                                            id="PurchaseDate"
                                            ref="purchaseDate"
                                            className={"form-control"}></input>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPONo" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="PO Number"
                                          placeholder="Enter Purchase Order No"
                                          inputRef={(ref) => { this.poNo = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>PO Number</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='poNo'
                                            placeholder='Enter Purchase Order No'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.poNo}
                                            inputRef={(ref) => { this.poNo = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalDrNo" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="DR Number"
                                          placeholder="Enter Dr Number"
                                          inputRef={(ref) => { this.drNo = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>DR Number</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='drNo'
                                            placeholder='Enter DR Number'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.drNo}
                                            inputRef={(ref) => { this.drNo = ref }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalSiNo" validationState={this.state.isInputValid} >
                                          {/* <FieldGroup
                                          id="formControlsText"
                                          type="text"
                                          label="Sales Invoice Number"
                                          placeholder="Enter Sales Invoice Number"
                                          inputRef={(ref) => { this.siNo = ref }}
                                          disabled={this.state.disAbledAllFields}
                                        /> */}
                                          <ControlLabel>Sales Invoice Number</ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='siNo'
                                            placeholder='Enter Sales Invoice Number'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.siNo}
                                            inputRef={(ref) => { this.siNo = ref }}
                                          />
                                        </FormGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                  <Col xs={12} md={6}>
                                    <Panel bsStyle="default">
                                      <Panel.Body>
                                        <FormGroup controlId="formHorizontalDeliveryDate" validationState={this.state.isInputValid} >
                                          <ControlLabel>Delivery Date</ControlLabel>
                                          <input type="date"
                                            ref="deliveryDate" disabled={this.state.disAbledAllFields}
                                            className={"form-control"}></input>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPurchaseCost" validationState={this.state.ValidationFieldOnpurchaseCost} >
                                          <ControlLabel>Purchase Cost
                                          <span className="requiredError"><b>{this.state.inputNumberFieldpurchaseCost}</b></span>

                                          </ControlLabel>
                                          <FormControl
                                            type='text'
                                            name='purchaseCost'
                                            placeholder='Enter Purchase Cost'
                                            disabled={this.state.disAbledAllFields}
                                            defaultValue={this.state.inputState.purchaseCost}
                                            inputRef={(ref) => { this.purchaseCost = ref }}
                                          />
                                          <FormControl.Feedback/>
                                        </FormGroup>
                                        <FormGroup controlId="formControlSupplier" >
                                          <ControlLabel>Supplier</ControlLabel>
                                          <FormControl componentClass="select" placeholder="Select Supplier" disabled={this.state.disAbledAllFields}
                                            inputRef={(ref) => { this.supplierId = ref }}
                                          >
                                            <option value='0'>Select a Supplier</option>
                                            {
                                              this.state.supplierList.map((product, i) => {
                                                return <option value={product.id} key={i}>{product.name}</option>
                                              })
                                            }
                                          </FormControl>
                                        </FormGroup>
                                      </Panel.Body>
                                    </Panel>
                                  </Col>
                                </Row>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>

                        </Row>

                      </Tab.Container>
                    </Form>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button bsClass={this.state.isInsertHidden + " btn btn-flat btn-default"}
              onClick={this.handleClickInsert.bind(this)} disabled={this.state.isInsertDisabled}>
              <i className="" ></i>&nbsp;Insert Asset</Button>&nbsp;
            <Button bsClass={this.state.isUpdateHidden + " btn btn-flat btn-default"}
              onClick={this.handleClickUpdate.bind(this)} disabled={this.state.isUpdateDisabled}>
              <i className=""></i>&nbsp; Update Asset</Button>&nbsp;
            <Button bsStyle="default" bsClass={"btn btn-flat btn-default"} onClick={this.handlePopUpHide.bind(this)} >
              <i className=""></i> &nbsp; Close Form</Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    );
  }
}

export default Asset;