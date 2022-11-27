import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLocation, deleteUser, getLocation, getUserList, locationAction, postLocation, postUser, searchLocation, searchUser, userAction } from '../../reduxToolkit/reducers'
import { Space, Table, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons'
import { AiFillPicture } from 'react-icons/ai';
import { Button, Modal, Search, Input } from 'antd';
import { useForm } from 'react-hook-form';


const ManageUser = () => {
    // useselector
    const { locationList, postLocation1, errPostLocation, searchLocation1 } = useSelector(state => state.locationReducer)

    // dispatch
    const dispatch = useDispatch()
    //useeffect
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    useEffect(() => {
        dispatch(locationAction.resetPostLocation())
    }, [])


    // data
    const data = searchLocation1 || locationList
    // columns
    const columns = [

        {
            title: 'Vị trí',
            dataIndex: 'tenViTri',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,


        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'tinhThanh',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,

        },
        {
            title: 'Quốc gia',
            dataIndex: 'quocGia',
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
                    <NavLink className='ml-5 sm:ml-0' to={`/editlocation/${id}`}><EditOutlined /></NavLink>
                    <button onClick={() => {
                        if (window.confirm('Bạn có muốn xóa vị trí')) {
                            dispatch(deleteUser(id))
                        }
                    }} ><DeleteOutlined onClick={() => { dispatch(deleteLocation(id)) }} className=' text-red-700 ml-5' />
                    </button>
                </Fragment>
            },
            width: '40px',
            align: 'center'
        },
    ]

    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors } ,setValue} = useForm();
    // modal
    // usestate 
    const [ImgUrl, setImgUrl] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    // use effect resetform
    useEffect(() => {
        reset({
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
            hinhAnh: '',
        })
        dispatch(locationAction.resetPostLocation())
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

        dispatch(searchLocation(value))
    }
    return (
        <div className='ManageUser'>

            {/* modal  */}
            <Button style={{ backgroundColor: '#ff5a5f', display: 'block' }} type="primary" onClick={showModal}>
                Thêm mới vị trí
            </Button>
            <Modal title=" Thêm mới vị trí" open={isModalOpen}
                onOk={handleSubmit(data => {
                    dispatch(locationAction.resetPostLocation())
                    dispatch(postLocation(data))
                })} onCancel={handleCancel}>
                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm">Tên vị trí</label>
                    <input {...register('tenViTri', { required: 'Tên vị trí không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.tenViTri && <p className='text-red-400'>{errors.tenViTri.message}</p>}
                </div>

                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm">Tỉnh Thành</label>
                    <input {...register('tinhThanh', { required: 'Tỉnh Thành không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.tinhThanh && <p className='text-red-400'>{errors.tinhThanh.message}</p>}
                </div>

                <div className="relative mb-4">
                    <label className=" text-[#ff5a5f] leading-7 text-sm">Quốc gia</label>
                    <input {...register('quocGia', { required: 'Quốc gia không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors?.quocGia && <p className='text-red-400'>{errors.quocGia.message}</p>}
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
                        type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    <div className='mt-7'>

                        <img src={ImgUrl} alt="..." className='w-40 h-40 bg-gray-200 rounded-lg' />
                    </div>
                </div>


                <div className='mt-15'>
                    {errPostLocation && <p className='mb-0 font-medium  text-red-600'>{errPostLocation}</p>}
                    {postLocation1 && <p className=' font-medium  text-green-700'>Thêm mới thành công</p>}
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

export default ManageUser