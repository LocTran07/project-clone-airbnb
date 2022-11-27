import { useForm } from 'antd/lib/form/Form'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const UserLayout = () => {
    const hinh = './img/user.webp'



    return (
        <div className='UserLayout'>
           <Outlet></Outlet>
        </div>
    )
}

export default UserLayout
const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`