import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/layouts/MainLayout'
import UserLayout from '../components/layouts/UserLayout'
import Login from '../pages/Login'
import Home from '../pages/Home'
import RoomLocation from '../pages/RoomLocation'
import Register from '../pages/Register'
import DetailUser from '../pages/DetailUser'
import EditDetailUser from '../pages/EditDetailUser'
import Booking from '../pages/Booking'
import AdminLayout from '../components/layouts/AdminLayout'
import EditUser from '../pages/manageUser/EditUser'
import  EditLocation  from '../pages/manageLocation/EditLocation'
import EditRoom from '../pages/manageRoom/EditRoom'
import EditBooking from '../pages/manageBooking/EditBooking'

const Router = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            children: [
                {
                    index: '/',
                    element: <Home></Home>
                },
                {
                    path: 'roomlocation/:id/:date1/:date2',
                    element: <RoomLocation></RoomLocation>
                },
                {
                    path: 'roomlocation/:id',
                    element: <RoomLocation></RoomLocation>
                },
                {
                    path: 'detailuser/:id',
                    element: <DetailUser></DetailUser>
                },
                {
                    path: 'detailuser/edit/:id',
                    element: <EditDetailUser></EditDetailUser>
                },
                {
                    path: 'booking/:id',
                    element: <Booking></Booking>
                },
                {
                    path: 'admin',
                    element: <AdminLayout></AdminLayout>
                },
                {
                    path: 'edituser/:id',
                    element: <EditUser></EditUser>
                },
                {
                    path: 'editLocation/:id',
                    element: <EditLocation></EditLocation>
                },
                {
                    path: 'editRoom/:id',
                    element: <EditRoom></EditRoom>
                },
                {
                    path: 'editbooking/:id',
                    element: <EditBooking></EditBooking>
                },
            ]
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        },

    

    ])

    return routing
}

export default Router