import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { editUser, getDetailUser, getBookingById, getBookingByUserId, getRoomList, getUserList, putBooking } from '../../reduxToolkit/reducers';
import moment from 'moment'

const EditBooking = () => {
    const hinh = './img/user.webp'
    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // pararam 
    const param = useParams()
    // useSelector
    // const { detailUser } = useSelector(state => state.userReducer)
    const { getBookingById1 } = useSelector(state => state.bookingReducer)
    const { roomList } = useSelector(state => state.roomReducer)
    const { userList } = useSelector(state => state.userReducer)
    console.log(getBookingById1);
    console.log(userList);
    console.log(roomList);
    // dispatch 
    const dispatch = useDispatch()
    // usenavigate
    const navigate = useNavigate()
    //use effect 
    useEffect(() => {
        dispatch(getBookingById(param.id))
        console.log(1);
    }, [])
    useEffect(() => {
        dispatch(getRoomList())
        console.log(2);

    }, [])
    useEffect(() => {
        dispatch(getUserList())

        console.log(3);
    }, [])
    useEffect(() => {
        console.log(4);

        reset({

            maNguoiDung: getBookingById1?.maNguoiDung.toString(),
            maPhong: getBookingById1?.maPhong.toString(),
            ngayDen: moment(getBookingById1?.ngayDen).format('YYYY-MM-DD'),
            ngayDi: moment(getBookingById1?.ngayDi).format('YYYY-MM-DD'),
            soLuongKhach: getBookingById1?.soLuongKhach,
        })
    }, [])
    return (
        <div className='EditDetailUser pt-[70px]'>
            <div className='h-auto w-full' style={{ backgroundImage: `url(https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=1200)`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                <StyledDiv className="text-gray-600 body-font h-auto">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

                        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Gi??p ????? ch??? ??? cho 100.000 ng?????i t??? n???n ??ang ch???y tr???n kh???i Ukraine</h1>
                            <p className="leading-relaxed mt-4">H??y tham gia c??ng ch??ng t??i. Ch??ng t??i s??? h??? tr??? b???n ho??n th??nh
                                t???ng b?????c c???a quy tr??nh.</p>
                        </div>

                        <form
                            onSubmit={handleSubmit(data => {

                                console.log(data);
                                const newData = { id: +param.id, data: { ...data, maNguoiDung: +data.maNguoiDung, maPhong: +data.maPhong, soLuongKhach: +data.soLuongKhach } }
                                dispatch(putBooking(newData))
                                alert('C???p nh???t th??nh c??ng')
                                navigate(-1)
                            })}
                            className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 style={{ color: ' #ff5a5f' }} className="text-gray-900 text-lg font-medium title-font mb-5">Th??ng tin c?? nh??n</h2>

                            <div className="relative mb-4">
                                <label className=" text-[#ff5a5f] leading-7 text-sm ">M?? ng?????i d??ng</label>
                                <input
                                    type='number'
                                    {...register('soLuongKhach', {
                                        required: 'Ng??y ??i kh??ng ???????c b??? tr???ng'
                                    })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors?.soLuongKhach && (<p className='mb-0 text-red-400'>{errors.soLuongKhach.message}</p>)}
                            </div>

                            <div className="relative mb-4">
                                <label className=" text-[#ff5a5f] leading-7 text-sm ">M?? ph??ng</label>
                                <select {...register('maPhong', {})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                    {roomList?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.tenPhong}</option>
                                        )
                                    })}

                                </select>
                                {errors?.maPhong && (<p className='mb-0 text-red-400'>{errors.maPhong.message}</p>)}
                            </div>


                            <div className="relative mb-4">
                                <label className=" text-[#ff5a5f] leading-7 text-sm ">Ng??y ?????n</label>
                                <input
                                    type='date'
                                    {...register('ngayDen', {
                                        required: 'Ng??y ?????n kh??ng ???????c b??? tr???ng'
                                    })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors?.ngayDen && (<p className='mb-0 text-red-400'>{errors.ngayDen.message}</p>)}
                            </div>
                            <div className="relative mb-4">
                                <label className=" text-[#ff5a5f] leading-7 text-sm ">Ng??y ??i</label>
                                <input
                                    type='date'
                                    {...register('ngayDi', {
                                        required: 'Ng??y ??i kh??ng ???????c b??? tr???ng'
                                    })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors?.ngayDi && (<p className='mb-0 text-red-400'>{errors.ngayDi.message}</p>)}
                            </div>
                            <div className="relative mb-4">
                                <label className=" text-[#ff5a5f] leading-7 text-sm ">S??? l?????ng kh??ch</label>
                                <input
                                    type='number'
                                    {...register('soLuongKhach', {
                                        required: 'Ng??y ??i kh??ng ???????c b??? tr???ng'
                                    })}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors?.soLuongKhach && (<p className='mb-0 text-red-400'>{errors.soLuongKhach.message}</p>)}
                            </div>


                            <button className="text-white shadow-lg rounded-full bg-[#ff5a5f] border-0 py-2 px-8 focus:outline-none mt-10 text-lg active:scale-[0.97] ">C???p nh???t</button>
                            <span onClick={() => { navigate(-1) }} className='block text-[15px] cursor-pointer text-red-400 mt-5 underline decoration-1'> Quay l???i trang admin</span>

                        </form>

                    </div>
                </StyledDiv>
            </div>


        </div>
    )
}

export default EditBooking
const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`