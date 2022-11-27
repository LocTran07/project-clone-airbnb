import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLocation, deleteRoom, deleteUser, getLocation, getRoomList, getUserList, locationAction, postLocation, postRoom, postUser, roomAction, searchLocation, searchRoom, searchUser, userAction } from '../../reduxToolkit/reducers'
import { Space, Table, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons'
import { AiFillPicture } from 'react-icons/ai';
import { Button, Modal, Search, Input } from 'antd';
import { useForm } from 'react-hook-form';


const ManageRoom = () => {
    // useselector
    const { locationList} = useSelector(state => state.locationReducer)
    const { roomList,postRoom1,errPostRoom1,searchRoom1 } = useSelector(state => state.roomReducer)
    console.log(searchRoom1);
    // dispatch
    const dispatch = useDispatch()
    //useeffect
    useEffect(() => {
        dispatch(getRoomList())
    }, [])
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    useEffect(() => {
        dispatch(locationAction.resetPostLocation())
    }, [])
    useEffect(() => {
        dispatch(roomAction.resetRoom())
    }, [])
    // usestate 
    const [ImgUrl, setImgUrl] = useState('')

    // data
    const data = searchRoom1 || roomList
    // columns
    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'tenPhong',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '40px',
            ellipsis: true,


        },
        {
            title: 'Giá tiền',
            dataIndex: 'giaTien',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '40px',
            ellipsis: true,
            align: 'center'
        },
       
        {
            title: 'Xử lý',
            dataIndex: 'id',
            render: (id, film) => {
                return <Fragment>
                    <NavLink className='ml-5 sm:ml-0' to={`/editroom/${id}`}><EditOutlined /></NavLink>
                    <button onClick={() => {
                        if (window.confirm('Bạn có muốn xóa phòng')) {
                            dispatch(deleteUser(id))
                        }
                    }} ><DeleteOutlined onClick={() => { dispatch(deleteRoom(id)) }} className=' text-red-700 ml-5' />
                    </button>
                    {/* <button className='ml-5 '><AiFillPicture className='inline' /></button> */}

                </Fragment>
            },
            width: '30px',
            align: 'center'
        },
    ]

    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm();
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // use effect resetform
    useEffect(() => {
        reset({
            tenPhong:'',
            khach: '',
            phongNgu:'',
            giuong:'',
            phongTam: '',
            moTa: '',
            giaTien: '',
            mayGiat: 'true',
            banLa: 'true',
            tivi: 'true',
            dieuHoa: 'true',
            wifi: 'true',
            bep:'true',
            doXe:'true',
            hoBoi: 'true',
            banUi: 'true',
            maViTri:'',
            hinhAnh: ''
        }
        )
       
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

        dispatch(searchRoom(value))
    }
    return (
        <div className='ManageUser'>

            {/* modal  */}
            <Button style={{ backgroundColor: '#ff5a5f', display: 'block' }} type="primary" onClick={showModal}>
                Thêm mới phòng
            </Button>
            <Modal title=" Thêm mới phòng" open={isModalOpen}
                onOk={handleSubmit(data => {
                    console.log(data);
                    const isMayGiat = data.mayGiat === 'true'
                    const isBanLa = data.banLa === 'true'
                    const isTivi = data.tivi === 'true'
                    const isDieuHoa = data.dieuHoa === 'true'
                    const isWifi = data.wifi === 'true'
                    const isBep = data.bep === 'true'
                    const isDoXe = data.doXe === 'true'
                    const isHoBoi = data.hoBoi === 'true'
                    const isBanUi = data.banUi === 'true'
                    const newData = {
                        
                            ...data,
                            mayGiat: isMayGiat,
                            banLa: isBanLa,
                            tivi: isTivi,
                            dieuHoa: isDieuHoa,
                            wifi: isWifi,
                            bep: isBep,
                            doXe: isDoXe,
                            hoBoi: isHoBoi,
                            banUi: isBanUi,
                            khach: +data.khach,
                            phongNgu: +data.phongNgu,
                            giuong: +data.giuong,
                            phongTam: +data.phongTam,
                            maViTri: +data.maViTri,
                            giaTien: +data.giaTien,
                        
                    }
                    console.log(newData);
                    dispatch(roomAction.resetRoom())
                    dispatch(postRoom(newData))

                })} onCancel={handleCancel}>
                <div className='grid grid-cols-2 gap-x-7'>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Tên phòng</label>
                        <input {...register('tenPhong', { required: 'Tên phòng không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.tenPhong && <p className='text-red-400'>{errors.tenPhong.message}</p>}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Mô tả</label>
                        <input {...register('moTa', { required: 'Mô tả không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.moTa && <p className='text-red-400'>{errors.moTa.message}</p>}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Giá tiền</label>
                        <input {...register('giaTien', { required: 'Tỉnh Thành không được bỏ trống' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.giaTien && <p className='text-red-400'>{errors.giaTien.message}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Số lượng khách</label>
                        <input {...register('khach', { required: 'Số lượng khách không được bỏ trống' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.khach && <p className='text-red-400'>{errors.khach.message}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Phòng ngủ</label>
                        <input {...register('phongNgu', { required: 'Phòng ngủ không được bỏ trống' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.giaTien && <p className='text-red-400'>{errors.giaTien.message}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Giường</label>
                        <input {...register('giuong', { required: 'Giường không được bỏ trống' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.giuong && <p className='text-red-400'>{errors.giuong.message}</p>}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Phòng tắm</label>
                        <input {...register('phongTam', { required: 'Phòng tăm không được bỏ trống' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        {errors?.phongTam && <p className='text-red-400'>{errors.phongTam.message}</p>}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Mã vị trí</label>
                        <select {...register('maViTri', { required: ' Mã vị trí không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            {locationList.map((item,index)=> {
                                return(
                                    <option key={index} value={item.id}>{item.tenViTri}</option>
                                )
                            })}
                        </select>
                        {errors?.maViTri && (<p className='mb-0 text-red-400'>{errors.maViTri.message}</p>)}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Máy giặt</label>
                        <select {...register('mayGiat', { required: ' Máy giặt không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value='false'>Không</option>
                        </select>
                        {errors?.mayGiat && (<p className='mb-0 text-red-400'>{errors.mayGiat.message}</p>)}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Bàn là</label>
                        <select {...register('banLa', { required: ' Bàn là không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value='false'>Không</option>
                        </select>
                        {errors?.banLa && (<p className='mb-0 text-red-400'>{errors.banLa.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Tivi</label>
                        <select {...register('tivi', { required: ' Tivi không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.tivi && (<p className='mb-0 text-red-400'>{errors.tivi.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Điều hòa</label>
                        <select {...register('dieuHoa', { required: 'Điều hòa không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.dieuHoa && (<p className='mb-0 text-red-400'>{errors.dieuHoa.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Wifi</label>
                        <select {...register('wifi', { required: ' Wifi không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.wifi && (<p className='mb-0 text-red-400'>{errors.wifi.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Bếp</label>
                        <select {...register('bep', { required: ' Bếp không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.bep && (<p className='mb-0 text-red-400'>{errors.bep.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Đỗ xe</label>
                        <select {...register('doXe', { required: ' Đỗ xe không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.doXe && (<p className='mb-0 text-red-400'>{errors.doXe.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Hồ bơi</label>
                        <select {...register('hoBoi', { required: 'Hồ bơi không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.hoBoi && (<p className='mb-0 text-red-400'>{errors.hoBoi.message}</p>)}
                    </div>
                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm ">Bàn ủi</label>
                        <select {...register('banUi', { required: 'Bàn ủi không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value='true'>Có</option>
                            <option value="false">Không</option>
                        </select>
                        {errors?.banUi && (<p className='mb-0 text-red-400'>{errors.banUi.message}</p>)}
                    </div>

                    <div className="relative mb-4">
                        <label className=" text-[#ff5a5f] leading-7 text-sm">Hình ảnh</label>
                        <input required
                            onChange={(e) => {
                                // lấy file ra 

                                const file = e.target.files[0]
                                // tạo đối tượng đọc file 
                                const reader = new FileReader()
                                // đọc file 
                                reader.readAsDataURL(file)
                                // bat su kien onload
                                // lay dc link base64
                                reader.onload = (e) => {
                                    // setImgUrl 
                                    setImgUrl(e.target.result)
                                    setValue('hinhAnh', e.target.result)

                                }
                             
                            }}
                            type="file" 
                            accept="image/jpg, image/jpeg, image/png, image/gif" 
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <div className='mt-7'>

                            <img src={ImgUrl} alt="..." className='w-40 h-40 bg-gray-200 rounded-lg' />
                        </div>
                    </div>

                </div>

                <div className='mt-15'>
                    {errPostRoom1 && <p className='mb-0 font-medium  text-red-600'>{errPostRoom1}</p>}
                    {postRoom1 && <p className=' font-medium  text-green-700'>Thêm mới thành công</p>}
                </div>
            </Modal>
            {/* search  */}
            <Search
                placeholder="Nhập vị trí cần tìm"
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

export default ManageRoom