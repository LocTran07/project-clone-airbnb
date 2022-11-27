
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookingAction, deleteBooking, deleteUser, getBookingList, getRoomList, getUserList, locationAction, postBooking, postBooking1, postUser, searchUser, userAction } from '../../reduxToolkit/reducers'
import { Space, Table, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons'
import { AiFillPicture } from 'react-icons/ai';
import { Button, Modal, Search, Input } from 'antd';
import { useForm } from 'react-hook-form';


const ManageBooking = () => {
    // useselector
    const { userList, errPostUser, postUser1, searchUser1 } = useSelector(state => state.userReducer)
    const { bookingList, postBooking, errBooking } = useSelector(state => state.bookingReducer)
    const { roomList } = useSelector(state => state.roomReducer)

    console.log(bookingList);
    // dispatch
    const dispatch = useDispatch()
    //useeffect
    useEffect(() => {
        dispatch(getBookingList())
    }, [])
    useEffect(() => {
        dispatch(getRoomList())
    }, [])

    // data
    const data = bookingList
    // columns
    const columns = [
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '10px',
            ellipsis: true,


        },
        {
            title: 'Ngày đến',
            dataIndex: 'ngayDen',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,

        },
        {
            title: 'Ngày đi',
            dataIndex: 'ngayDi',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,

        },
        {
            title: 'Xử lý',
            dataIndex: 'id',
            render: (id, film) => {
                return <Fragment>
                    <NavLink className='ml-5 sm:ml-0' to={`/editBooking/${id}`}><EditOutlined /></NavLink>
                    <button onClick={() => {
                        if (window.confirm('Bạn có muốn xóa tài khoản')) {
                            dispatch(deleteUser(id))
                        }
                    }} ><DeleteOutlined onClick={() => { dispatch(deleteBooking(id)) }} className=' text-red-700 ml-5' />
                    </button>
                    {/* <NavLink className='ml-5 ' to={``}><AiFillPicture className='inline' /></NavLink> */}

                </Fragment>
            },
            width: '30px',
            align: 'center'
        },
    ]

    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // useeffect
    useEffect(() => {
        reset({
            maPhong: '',
            ngayDen: "",
            ngayDi: "",
            soLuongKhach: '',
            maNguoiDung: '',
        })
        dispatch(bookingAction.resetPostBooking())

    }, [isModalOpen])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // search 
    const { Search } = Input
    const onSearch = (value) => {

        dispatch(searchUser(value))
    }
    return (
        <div className='ManageUser'>

            {/* modal  */}
            <Button style={{ backgroundColor: '#ff5a5f', display: 'block' }} type="primary" onClick={showModal}>
                Thêm mới đặt phòng
            </Button>
            <Modal
                title=" Thêm mới đặt phòng"
                open={isModalOpen}
                onOk={handleSubmit(data => {
                    const newData = { ...data, maNguoiDung: +data.maNguoiDung, maPhong: +data.maPhong, soLuongKhach: +data.soLuongKhach }
                    dispatch(bookingAction.resetPostBooking())
                    dispatch(postBooking1(newData))
                })}
                onCancel={handleCancel}>
                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Mã người dùng</label>
                    <input
                        type='number'
                        {...register('soLuongKhach', {
                            required: 'Ngày đi không được bỏ trống'
                        })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.soLuongKhach && (<p className='mb-0 text-red-400'>{errors.soLuongKhach.message}</p>)}
                </div>

                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Mã phòng</label>
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
                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Ngày đến</label>
                    <input
                        type='date'
                        {...register('ngayDen', {
                            required: 'Ngày đến không được bỏ trống'
                        })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.ngayDen && (<p className='mb-0 text-red-400'>{errors.ngayDen.message}</p>)}
                </div>
                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Ngày đi</label>
                    <input
                        type='date'
                        {...register('ngayDi', {
                            required: 'Ngày đi không được bỏ trống'
                        })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.ngayDi && (<p className='mb-0 text-red-400'>{errors.ngayDi.message}</p>)}
                </div>
                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Số lượng khách</label>
                    <input
                        type='number'
                        {...register('soLuongKhach', {
                            required: 'Ngày đi không được bỏ trống'
                        })}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.soLuongKhach && (<p className='mb-0 text-red-400'>{errors.soLuongKhach.message}</p>)}
                </div>


                <div className='mt-15'>
                    {errBooking && <p className='mb-0 font-medium  text-red-600'>{errBooking}</p>}
                    {postBooking && <p className=' font-medium  text-green-700'>Thêm mới thành công</p>}
                </div>
            </Modal>
            {/* search  */}
            <Search
                placeholder="Nhập họ tên cần tìm"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 200,
                    margin: '10px 0'
                }}

            />
            {/* table  */}
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ManageBooking