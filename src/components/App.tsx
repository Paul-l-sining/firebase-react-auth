import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import NotFound from './NotFound';
 
function App() {
  return (
    <AuthProvider>
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      >
      
        <div className="w-100" style={{ maxWidth: "400px" }} >
          <Router>
            <Routes>
              <Route path='/' element={<Dashboard/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/not-found' element={<NotFound/>}></Route>
              <Route path='/*' element={<Navigate replace to='not-found' />} ></Route>
            </Routes>
          </Router>
        </div>
      
      </Container>
    </AuthProvider>  

  );
}

export default App;
