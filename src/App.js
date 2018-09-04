import React, { Component } from 'react';
import './App.css';
import './customStyle.css';
import { BrowserRouter as Router, Route, BrowserRouter  } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Asset from './components/Asset/Asset';
import Category from './components/Category/Category';
import Manufacturer from './components/Manufacturer/Manufacturer';
import Model from './components/Model/Model';
import Processor from './components/Processor/Processor';
import Supplier from './components/Supplier/Supplier';
import HardDisk from './components/HardDisk/HardDisk';
import Memory from './components/Memory/Memory';
import VideoCard from './components/VideoCard/VideoCard';
import LogIn from './components/LogIn/LogIn';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Footers from './components/Footer/Footers';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact={true} path="/login" component={LogIn}/>
          <Route path="/asset" component={Asset}/>
          <Route path="/category" component={Category}/>
          <Route path="/manufacturer" component={Manufacturer}/>
          <Route path="/model" component={Model}/>
          <Route path="/processor" component={Processor}/>
          <Route path="/supplier" component={Supplier}/>
          <Route path="/memory" component={Memory}/>
          <Route path="/videocard" component={VideoCard}/>
          <Route path="/harddisk" component={HardDisk}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/register" component={Register}/>
          {/* <Route exact path="*" render={() => (
                <Redirect to="/asset"/>
            )}/> */}
          <Footers />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
