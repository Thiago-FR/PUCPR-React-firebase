import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';

class Rotas extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Rotas;
