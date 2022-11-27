import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getBookingByUserId, getDetailUser, postAvatar } from '../reduxToolkit/reducers'
import { Button, Modal, Search, Input } from 'antd';

import moment from 'moment'
import { useForm } from 'react-hook-form';

const DetailUser = () => {
    // useparam 
    const param = useParams()
    // dispatch 
    const dispatch = useDispatch()
    // useselector 
    const { detailUser } = useSelector(state => state.userReducer)
    const { bookingByUserId } = useSelector(state => state.bookingReducer)
    console.log(detailUser);
    // useeffect 
    useEffect(() => {
        dispatch(getDetailUser(param.id))
        dispatch(getBookingByUserId(param.id))
    }, [])
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ImgUrl, setImgUrl] = useState('')
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm();
    return (
        <div className='DetailUser pt-[70px]'>
            <div className='container mx-auto mt-20'>
                <div className='grid md:grid-cols-5'>
                    <div className='col-span-2 p-20'>
                        <div className='shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] border border-black rounded-lg p-10 flex flex-col justify-evenly gap-10'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='rounded-full shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)]' style={{ height: '80px', width: '80px', backgroundImage: `url(${detailUser?.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', }}></div>
                                <Link to={`/detailuser/edit/${param.id}`} className='text-[#ff5a5f] hover:text-[#ff5a5f]'> Chỉnh sửa hồ sơ</Link>

                                <Link
                                    style={{ display: 'block' }}
                                    className='text-[#ff5a5f] hover:text-[#ff5a5f]'
                                    type="primary"
                                    onClick={showModal}>
                                    Chỉnh sửa hình ảnh
                                </Link>
                                <Modal
                                    title=" Thêm mới đặt phòng"
                                    open={isModalOpen}
                                    onOk={handleSubmit(data => {
                                        console.log(data);
                                        // tao formdata 
                                        const formData = new FormData()
                                        formData.append('formFile',data.avatar,data.avatar.name)
                                        dispatch(postAvatar(formData))
                                    })}
                                    onCancel={handleCancel}>
                                    <form action="">
                                        <div>
                                            <label className='block' htmlFor="">Hình ảnh: </label>
                                            <input
                                                accept="image/jpg, image/jpeg, image/png, image/gif"
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0]
                                                    const reader = new FileReader
                                                    reader.readAsDataURL(file)
                                                    reader.onload = (e) => {
                                                        setImgUrl(e.target.result)
                                                        setValue('avatar', file)
                                                    }
                                                }} />
                                        </div>
                                        <div className='mt-7'>

                                            <img src={ImgUrl} alt="..." className='w-40 h-40 bg-gray-200 rounded-lg' />
                                        </div>

                                    </form>
                                </Modal>

                            </div>
                            <div>

                                <p className='mb-5 font-medium text-lg'>Xác minh danh tính</p>
                                <p className='mb-5'>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
                                <div className='text-center'><button className='mx-auto border border-[#ff5a5f] px-7 py-4 rounded-lg active:scale-[0.95]'>Nhận huy hiệu</button>
                                </div>
                            </div>
                            <div className=''>
                                <p className='font-medium text-lg mb-7'>{detailUser?.name} đã xác nhận</p>
                                <p className=' mb-7'>✓ Đã xác nhận địa chỉ email</p>
                            </div>
                            <div>
                                <p className='font-medium text-lg mb-7'>Thông tin cá nhân</p>
                                <p className='mb-7'><span className='font-medium'>Email: </span>{detailUser?.email}</p>
                                <p className='mb-7'><span className='font-medium'>Name: </span>{detailUser?.name}</p>
                                <p className='mb-7'><span className='font-medium'>Số điện thoai: </span>{detailUser?.phone}</p>
                                <p className='mb-7'><span className='font-medium'>Giới tính: </span>{detailUser?.gender ? 'Nam' : 'Nữ'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 p-20'>
                        <div>
                            <p className='text-lg '>Xin chào tôi là <span className='text-[#ff5a5f]'> {detailUser?.name}</span></p>
                            <p className='text-lg '>Thông tin phòng đã đặt:</p>
                            {bookingByUserId?.map(item => {

                                return (
                                    <div className='shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] rounded-lg p-10 mb-5 flex justify-around items-center'>
                                        <div className='rounded-lg' style={{ height: '100px', width: '150px', backgroundImage: `url(https://a0.muscache.com/im/pictures/38ea32a6-605a-48de-b3ab-149d640026c1.jpg?im_w=720)`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                                        </div>
                                        <div>
                                            <p className='mb-7'>Mã Phòng: {item.maPhong}</p>
                                            <p className='mb-7'>Ngày đến: {moment(item.ngayDen).format('DD/MM/YYYY')}</p>
                                            <p className='mb-7'>Ngày đi: {moment(item.ngayDi).format('DD/MM/YYYY')}</p>
                                            <p className='mb-7'>Số người: {item.soLuongKhach}</p>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser