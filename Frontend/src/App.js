import React, { Component } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HostelList from './Component/hostel';
import StudentDetails from './Component/student';
import EstateLogin from './Component/login';
import StudentUpdatePage from './Component/updatehosteldetail';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={ <EstateLogin/> } />
        <Route path='/Home' element={ <HostelList/> }/>
        <Route path='/StudentDetail' element={ <StudentDetails/>} />
        <Route path='/Home/update' element={ <StudentUpdatePage/>} />
      </Routes>
    );
  }
}

export default App;
