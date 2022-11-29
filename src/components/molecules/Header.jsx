import React, { Fragment, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AutoComplete, Button, DatePicker, Input } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { authAction, getLocation } from "../../reduxToolkit/reducers";
import { SearchOutlined, BarsOutlined } from "@ant-design/icons";
import moment from 'moment'
import { USERLOGIN } from "../../utili/setup";
// import {locationReducer} from '../../reduxToolkit/configStore'
// const mockVal = (str, repeat = 1) => ({
//     value: str.repeat(repeat),
// });

const Header = () => {

    // useSelector
    const { locationList } = useSelector(state => state.locationReducer)
    const { userLogin } = useSelector(state => state.authReducer)

    // dispatch 
    const dispatch = useDispatch()
    // useeffect 
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    // usestate 
    const [id, setId] = useState('')
    const [date1, setDate1] = useState('')
    const [date2, setDate2] = useState('')
    const option = locationList?.map((location) => {
        return {
            label: location.tenViTri,
            value: location.tenViTri
        }
    })
    const [isShowing, setIsShowing] = useState(false)
    // usenavigate
    const navigate = useNavigate()


    const onSelect = (data) => {
        const item = locationList.find(location => location.tenViTri === data)
        setId(item.id)
    };

    // datepicke
    const { RangePicker } = DatePicker;

    return (
        <StyledDiv className="Header">
            <header className=" dark:bg-gray-800 dark:text-gray-100 fixed z-10 w-full left-0 bg-white shadow-[0_0px_10px_0px_rgba(0,0,0,0.5)]  ">
                <div className=" w-full container  mx-auto   justify-evenly  flex  md:justify-between  h-[70px] relative">
                    <Link
                        rel="noopener noreferrer"
                        to="/"
                        aria-label="Back to homepage"
                        className="md:flex items-center p-2 pl-[8px] hidden "
                    >
                        <img
                            className=" w-[150px]"
                            src="data:image/png;base64,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"
                            alt=""
                        />
                    </Link>
                    <div className="items-stretch  mb-0 gap-20  space-x-3 flex  ">
                        <div className="flex justify-evenly items-center ">
                            <div className="shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] rounded-full overflow-hidden">
                                <AutoComplete
                                    className="w-[120px] rounded-full STT1"
                                    options={option}
                                    // style={{ width: 120 }}
                                    onSelect={onSelect}
                                    // onSearch={onSearch}
                                    // onChange={onChange}
                                    placeholder="Địa điểm"
                                    filterOption={true}

                                />
                                <RangePicker

                                    onChange={(value) => {
                                        if (value) {
                                            const date = value?.map(item => {
                                                return { date: item._d }
                                            })

                                            const date1 = moment(date[0].date).format('DD-MM-YYYY')
                                            const date2 = moment(date[1].date).format('DD-MM-YYYY')
                                            setDate1(date1)
                                            setDate2(date2)
                                        } else {
                                            alert('Vui lòng chọn ngày')
                                        }
                                    }}


                                    className="w-[200px] STT2"
                                    placeholder={['Ngày đến', 'Ngày rời']} />

                                <Input className=" STT3" style={{ width: 120 }} placeholder="Số thành viên" />

                            </div>
                            <Button onClick={() => {
                                if (date1 && date2) {
                                    navigate(`roomlocation/${id}/${date1}/${date2}`)
                                } else {
                                    alert('Vui lòng chọn địa điểm và ngày')
                                }
                            }} className="ml-5 bg-black active:scale-[0.9]" type="primary" shape="circle" icon={<SearchOutlined />} />
                        </div>
                    </div>
                    <div onClick={() => { setIsShowing(!isShowing) }} className="my-auto cursor-pointer active:scale-[0.95]">
                        <div className=" shadow-[0_1px_5px_0px_rgba(0,0,0,0.5)]  px-7 rounded-full py-3 flex h-[40px] justify-between items-center gap-3 ">
                            <BarsOutlined style={{ fontSize: '20px' }} />
                            {userLogin ? <div className="rounded-full" style={{ height: '30px', width: '30px', backgroundImage: `url(${userLogin.user.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                            </div> : <div className="rounded-full" style={{ height: '30px', width: '30px', backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxKeempc2JRtYE_m5QLixVK31pFqcsDmHJ0GzDQpUuAYevmoqj5hB5j5T3Jte7lLPoLs&usqp=CAU)`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                            </div>}
                        </div>
                    </div>
                    {!isShowing ? '' :
                        (<div className="bg-white shadow-[0_1px_5px_0px_rgba(0,0,0,0.5)] absolute top-[60px] right-[2px] rounded-xl px-10 py-10  ">
                            {userLogin ? <p className="text-black cursor-pointer " onClick={() => { navigate(`detailuser/${userLogin.user.id}`) }}>Hi! {userLogin.user.name}</p> : <p onClick={() => { navigate('login') }} className="text-black cursor-pointer ">Đăng nhập</p>}
                            {userLogin ? <p
                                onClick={() => {
                                    dispatch(authAction.logout())
                                    navigate('/')
                                }}
                                className="text-black cursor-pointer ">Đăng xuất</p> : <p onClick={() => { navigate('register') }} className="text-black cursor-pointer ">Đăng ký</p>}

                            <p onClick={() => { navigate('/admin') }} className="text-black cursor-pointer ">Trang Admin</p>
                        </div>)}
                </div>
            </header>
        </StyledDiv>
    );

};

export default Header;

const StyledDiv = styled.div`
    .ant-btn-primary {
  
    border-color: #ff5a5f;
    background: #ff5a5f;
}
.STT1 {
    .ant-select-selector{
        border-radius: 20px 0 0 20px;
    }
   
}
.STT3 {
    border-radius: 0 20px 20px 0;
    }
@media only screen and (max-width: 767px)  {
    .STT3 {
        display: none;
    }
    .STT1 {
        width:  100px;
    }
    .STT2{
        width: 180px;
    }
}
`