import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import userphoto from './multiple-users-silhouette.png';
import videocard from './credit-card.png';
import processor from './chip.png';
import supplier from './hotel-supplier.png';
import hdd from './backup.png';
import memory from './sd-card.png';
import asset from './browser.png';
import category from './edit.png';
import manufacturer from './factory.png';
import model from './maintenance.png';
import dashboard from './dashboard.png'
import { Image } from 'react-bootstrap';
import Common from '../Common/Common';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userUrl: 'http://localhost:64294/api/Users/',
      assetList: [],
      assetUrl: 'http://localhost:64294/api/Assets',
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
    }
  }
  componentDidMount() {
    this.GetLoadedFiles();
  }
  GetLoadedFiles() {
    this.GeneralLoad(this.state.assetUrl, "assetList");
    this.GeneralLoad(this.state.categoryUrl, "categoryList");
    this.GeneralLoad(this.state.manufacturerUrl, "manufacturerList");
    this.GeneralLoad(this.state.modelUrl, "modelList");
    this.GeneralLoad(this.state.processorUrl, "processorList");
    this.GeneralLoad(this.state.supplierUrl, "supplierList");
    this.GeneralLoad(this.state.hardDiskUrl, "hardDiskList");
    this.GeneralLoad(this.state.memoryUrl, "memoryList");
    this.GeneralLoad(this.state.videocardUrl, "videocardList");
    this.GeneralLoad(this.state.userUrl, "userList");
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
  render() {
    //console.log(this.state);
    return (
      <Grid>
        <Common
          ref={instances => { this.child = instances }}
        />
        <Row className="show-grid " >
          {/* <h1>DashBoard</h1> */}
          <Col className="col-lg-12 col-xs-12 padding bg-primary" >
          <div className="small-box" style={{width:'100%'}}>
            <div className="inner">
              <h1>
                <Image src={dashboard} thumbnail />&nbsp;DashBoard
              </h1>
            </div>
            <div className="icon">
              
            </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row className="show-grid">
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>{this.state.assetList.length}</h3>
                <p>Total Asset record/s</p>
              </div>
              <div className="icon">
                <Image src={asset} thumbnail />
              </div>
              <a href="/asset" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-aqua">
              <div className="inner">
                <h3>{this.state.categoryList.length}</h3>
                <p>Total Category record/s</p>
              </div>
              <div className="icon">
                <Image src={category} thumbnail />
              </div>
              <a href="/category" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>{this.state.manufacturerList.length}</h3>
                <p>Total Manufacturer record/s</p>
              </div>
              <div className="icon">
                <Image src={manufacturer} thumbnail />
              </div>
              <a href="/manufacturer" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{this.state.modelList.length}</h3>
                <p>Total Model record/s</p>
              </div>
              <div className="icon">
                <Image src={model} thumbnail />
              </div>
              <a href="/model" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-assign">
              <div className="inner">
                <h3>{this.state.processorList.length}</h3>
                <p>Total Processor record/s</p>
              </div>
              <div className="icon">
                <Image src={processor} thumbnail />
              </div>
              <a href="/processor" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-default">
              <div className="inner">
                <h3>{this.state.supplierList.length}</h3>
                <p>Total Supplier record/s</p>
              </div>
              <div className="icon">
                <Image src={supplier} thumbnail />
              </div>
              <a href="/supplier" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>


          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-primary">
              <div className="inner">
                <h3>{this.state.hardDiskList.length}</h3>
                <p>Total HardDisk record/s</p>
              </div>
              <div className="icon">
                <Image src={hdd} thumbnail />
              </div>
              <a href="/harddisk" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-level">
              <div className="inner">
                <h3>{this.state.memoryList.length}</h3>
                <p>Total Memory record/s</p>
              </div>
              <div className="icon">
                <Image src={memory} thumbnail />
              </div>
              <a href="/memory" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-level1">
              <div className="inner">
                <h3>{this.state.videocardList.length}</h3>
                <p>Total VideoCard record/s</p>
              </div>
              <div className="icon">
                <Image src={videocard} thumbnail />
              </div>
              <a href="/videocard" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
          <Col className="col-lg-3 col-xs-6 padding">
            <div className="small-box bg-level2">
              <div className="inner">
                <h3>{this.state.userList.length}</h3>
                <p>Total User record/s</p>
              </div>
              <div className="icon">
                <Image src={userphoto} thumbnail />
              </div>
              <a href="/register" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;