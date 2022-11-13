import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = localStorage.getItem('user')
    console.log('inside protected')
    console.log(user)
    console.log('end')
    return (
        user ? < Outlet/> : <Navigate to='/' />
    )
};


export default ProtectedRoute;