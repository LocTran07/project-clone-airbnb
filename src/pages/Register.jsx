
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authAction, signup } from '../reduxToolkit/reducers'

import _ from 'lodash'
const Register = () => {
  // use effect dua len dau 
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   },[]);
  // })
  const hinh = './img/user.webp'
  // useForm
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  // useSelector
  const { userLogin, errSignup, userSignup } = useSelector(state => state.authReducer)

  // dispatch 
  const dispatch = useDispatch()
  // usenavigate
  const navigate = useNavigate()


  if (userSignup) {
    alert('Đăng kí thành công')
    navigate('/login')
  }
  // watch 
  const password = watch('password')
  // useeffect 
  useEffect(() => { })
  // useeffect 
  useEffect(() => { dispatch(authAction.resetSignup()) }, [])

  console.log(userSignup);
  return (
    <div className='Register'>

      <div className='h-auto w-full' style={{ backgroundImage: `url(${hinh})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <StyledDiv className="text-gray-600 body-font h-auto">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-gray-900">Giúp đỡ chỗ ở cho 100.000 người tị nạn đang chạy trốn khỏi Ukraine</h1>
              <p className="leading-relaxed mt-4">Hãy tham gia cùng chúng tôi. Chúng tôi sẽ hỗ trợ bạn hoàn thành
                từng bước của quy trình.</p>
            </div>

            <form
              onSubmit={handleSubmit(data => {
                // dispatch(authAction.resetSignup())
                const data1 = _.pick(data, ['birthday', 'email', 'gender', 'name', 'password', 'phone', 'role'])
                dispatch(signup(data1))
              })}
              className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 style={{ color: ' #ff5a5f' }} className="text-gray-900 text-lg font-medium title-font mb-5">Đăng Nhập</h2>
              <div className="relative mb-4">

                <label className=" text-[#ff5a5f] leading-7 text-sm">Họ tên</label>
                <input {...register('name', { required: 'Họ tên không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.name && <p className='text-red-400'>{errors.name.message}</p>}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm">Email</label>
                <input {...register('email', { required: 'Email không được bỏ trống', pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email không hợp lệ' } })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.email && <p className='text-red-400'>{errors.email.message}</p>}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Mật khẩu</label>
                <input type='password' {...register('password', {
                  required: 'Mật khẩu không được bỏ trống',
                  minLength: { value: 6, message: '6-12 ký tự' },
                  maxLength: { value: 12, message: '6-12 ký tự' }
                })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.password && (<p className=' text-red-400'>{errors.password.message}</p>)}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Xác Mật khẩu</label>
                <input  type='password' {...register('confirmpassword', { required: 'không được bỏ trống', validate: value => value === password || 'Mật khẩu không trùng khớp' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.confirmpassword && (<p className=' text-red-400'>{errors?.confirmpassword.message}</p>)}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Số điện thoại</label>
                <input {...register('phone', {
                  required: 'Số điện thoại không được bỏ trống', minLength: { value: 10, message: '10 ký tự' },
                  maxLength: { value: 10, message: '10 ký tự' },
                })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.phone && (<p className=' text-red-400'>{errors.phone.message}</p>)}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Ngày sinh nhật</label>
                <input type='date' {...register('birthday', { required: 'Ngày sinh nhật không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.birthday && (<p className=' text-red-400'>{errors?.birthday.message}</p>)}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Giới tính</label>
                <select {...register('gender', { required: 'Giới tính không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <option value={true}>Nam</option>
                  <option value={false}>Nữ</option>
                </select>
                {errors?.gender && (<p className=' text-red-400'>{errors.gender.message}</p>)}
              </div>
              {/* <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Chức danh</label>
                <select {...register('role', { required: 'Chức danh không được bỏ trống' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <option value='USER'>Người dùng</option>
                  <option value="ADMIN">Quản lí</option>
                </select>
                {errors?.role && (<p className=' text-red-400'>{errors.role.message}</p>)}
              </div> */}
              <button className="text-white shadow-lg rounded-full bg-[#ff5a5f] border-0 py-2 px-8 focus:outline-none mt-10 text-lg active:scale-[0.97] ">Đăng ký</button>
              <span onClick={() => { navigate('/') }} className='block text-[15px] cursor-pointer text-red-400 mt-5 underline decoration-1'> Quay lại trang chủ</span>
              {errSignup && (<p className='mb-0 text-xl text-red-400'>{errSignup}</p>)}
            </form>

          </div>
        </StyledDiv>
      </div>
    </div>

  )
}

export default Register
const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`