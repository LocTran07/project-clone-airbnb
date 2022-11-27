
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUserList, locationAction, postUser, searchUser, userAction } from '../../reduxToolkit/reducers'
import { Space, Table, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { EditOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons'
import { AiFillPicture } from 'react-icons/ai';
import { Button, Modal,Search,Input } from 'antd';
import { useForm } from 'react-hook-form';


const ManageUser = () => {
    // useselector
    const { userList, errPostUser, postUser1,searchUser1 } = useSelector(state => state.userReducer)

    // dispatch
    const dispatch = useDispatch()
    //useeffect
    useEffect(() => {
        dispatch(getUserList())
    }, [])
    useEffect(() => {
        dispatch(userAction.resetPostUser())
    }, [])
    // data
    const data = searchUser1 ||  userList
    // columns
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,


        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'dataIndex',
            // render: (text) => <a>{text}</a>,
            width: '30px',
            ellipsis: true,

        },
        {
            title: 'Email',
            dataIndex: 'email',
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
                    <NavLink className='ml-5 sm:ml-0' to={`/edituser/${id}`}><EditOutlined /></NavLink>
                    <button onClick={() => {
                        if (window.confirm('Bạn có muốn xóa tài khoản')) {
                            dispatch(deleteUser(id))
                        }
                    }} ><DeleteOutlined className=' text-red-700 ml-5' />
                    </button>
                    {/* <NavLink className='ml-5 ' to={``}><AiFillPicture className='inline' /></NavLink> */}

                </Fragment>
            },
            width: '30px',
            align:'center'
        },
    ]

    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // useeffect
    useEffect(()=> {
        reset({
            name: '',
            email: '',
            phone: '',
            birthday: '',
         
        })
        dispatch(userAction.resetPostUser())

    },[isModalOpen])
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
    const {Search} = Input 
    const onSearch = (value) => {
       
        dispatch(searchUser(value))
    }
    return (
        <div className='ManageUser'>
        
            {/* modal  */}
            <Button style={{ backgroundColor: '#ff5a5f', display: 'block' }} type="primary" onClick={showModal}>
                Thêm mới tài khoản
            </Button>
            <Modal title=" Thêm mới tài khoản" open={isModalOpen}
                onOk={handleSubmit(data => {
                    dispatch(userAction.resetPostUser())
                    dispatch(postUser(data))
                })} onCancel={handleCancel}>
                <label className=" text-[#ff5a5f] leading-7 text-sm">Họ tên</label>
                <input {...register('name', { required: 'Họ tên không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.name && <p className='text-red-400'>{errors.name.message}</p>}


                <label className=" text-[#ff5a5f] leading-7 text-sm">Email</label>
                <input {...register('email', { required: 'Email không được bỏ trống', pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email không hợp lệ' } })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.email && <p className='text-red-400'>{errors.email.message}</p>}

                <label className=" text-[#ff5a5f] leading-7 text-sm ">Mật khẩu</label>
                <input {...register('password', { required: 'Mật khẩu không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.password && (<p className=' text-red-400'>{errors.password.message}</p>)}

                <label className=" text-[#ff5a5f] leading-7 text-sm ">Số điện thoại</label>
                <input {...register('phone', {
                    required: 'Số điện thoại không được bỏ trống', minLength: { value: 10, message: '10 ký tự' },
                    maxLength: { value: 10, message: '10 ký tự' },
                })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.phone && (<p className=' text-red-400'>{errors.phone.message}</p>)}


                <label className=" text-[#ff5a5f] leading-7 text-sm ">Ngày sinh nhật</label>
                <input type='date' {...register('birthday', { required: 'Ngày sinh nhật không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.birthday && (<p className=' text-red-400'>{errors?.birthday.message}</p>)}


                <label className=" text-[#ff5a5f] leading-7 text-sm ">Giới tính</label>
                <select {...register('gender', {})} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value={true}>Nam</option>
                    <option value={false}>Nữ</option>
                </select>
                {errors?.gender && (<p className=' text-red-400'>{errors.gender.message}</p>)}


                <label className=" text-[#ff5a5f] leading-7 text-sm ">Chức danh</label>
                <select {...register('role', { required: 'Chức danh không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <option value='USER'>Người dùng</option>
                    <option value="ADMIN">Quản lí</option>
                </select>
                {errors?.role && (<p className=' text-red-400'>{errors.role.message}</p>)}

                <div className='mt-15'>
                    {errPostUser && <p className='mb-0 font-medium  text-red-600'>{errPostUser}</p>}
                    {postUser1 && <p className=' font-medium  text-green-700'>Thêm mới thành công</p>}
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

export default ManageUser