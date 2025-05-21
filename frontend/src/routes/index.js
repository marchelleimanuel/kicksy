import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { Order } from '../pages/Order';


export const Path = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={'/home'} />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='/order' element={<Order/>}/>
        </Routes>
    )
}
