
import { Tabs } from 'antd';

import React, { useEffect } from 'react'
import ManageLocation from '../../pages/manageLocation/ManageLocation';
import ManageRoom from '../../pages/manageRoom/ManageRoom';
import ManageUser from '../../pages/manageUser/ManageUser';
import ManageBooking from '../../pages/manageBooking/ManageBooking';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminLayout = () => {
    // use effect dua len dau 
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    const { userLogin } = useSelector(state => state.authReducer)
    console.log(userLogin);
    const items = [
        { label: 'Quản lí người dùng', key: '1', children: <ManageUser></ManageUser> }, // remember to pass the key prop
        { label: 'Quản lí thông tin vị trí', key: '2', children: <ManageLocation></ManageLocation> },
        { label: 'Quản lí thông tin phòng', key: '3', children: <ManageRoom></ManageRoom> },
        { label: 'Quản lí thông tin đặt phòng', key: '4', children: <ManageBooking></ManageBooking> },
    ];
    if (userLogin.user.role !== 'ADMIN') {
        alert('vui lòng sử dụng tài khoản quản trị')
        return <Navigate replace to='/'></Navigate>
    }
    return (
        <div className='Admin pt-[70px]'>
            <div className='container mx-auto'>
                <Tabs items={items} />
            </div>

        </div>
    );

}

export default AdminLayout