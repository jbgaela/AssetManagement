<Row className="show-grid">
<Col xs={12} md={3}>
  <Panel bsStyle="primary">
    <Panel.Body>
 
 







 

    </Panel.Body>
  </Panel>
</Col>
<Col xs={12} md={3}>
  <Panel bsStyle="primary">
    <Panel.Body>
  

  






    <FormGroup controlId="formHorizontalName" validationState={this.state.isInputValid} >
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Name"
      placeholder="Enter Name"
      inputRef={(ref) => { this.nameName = ref }}
    />
  </FormGroup>



  

    </Panel.Body>
  </Panel>
</Col>
<Col xs={12} md={3}>
  <Panel bsStyle="primary">
    <Panel.Body>

    
 
    
  <FormGroup controlId="formHorizontalsiNo" validationState={this.state.isInputValid} >
    <FieldGroup
      id="formControlsText"
      type="text"
      label="siNo"
      placeholder="Enter siNo"
      inputRef={(ref) => { this.siNo = ref }}
    />
  </FormGroup>





    
    </Panel.Body>
  </Panel>
</Col>
<Col xs={12} md={3}>
  <Panel bsStyle="primary">
    <Panel.Body>
  



    <FormGroup controlId="formHorizontalWarranty" validationState={this.state.isInputValid} >
    <FieldGroup
      id="formControlsText"
      type="text"
      label="Warranty"
      placeholder="Enter Warranty"
      inputRef={(ref) => { this.warranty = ref }}
    />
    </FormGroup>


    </Panel.Body>
  </Panel>
</Col>
</Row>