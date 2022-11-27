import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authService } from '../service/authService'
import { authAction, login } from '../reduxToolkit/reducers'

const Login = () => {
  const hinh = './img/user.webp'
  // use effect dua len dau 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })
  // useForm
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // useSelector
  const { userLogin, errUserLogin } = useSelector(state => state.authReducer)
  console.log(userLogin);
  console.log(errUserLogin);
  // dispatch 
  const dispatch = useDispatch()
  // usenavigate
  const navigate = useNavigate()
  // navigate -1
  if (!errUserLogin && userLogin) {
    navigate(-1)
  }
  // useeffect 
  useEffect(() => { dispatch(authAction.resetUserLogin()) }, [])
  return (
    <div className='Login'>

      <div className='h-screen w-full' style={{ backgroundImage: `url(${hinh})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <StyledDiv className="text-gray-600 body-font h-screen">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-gray-900">Giúp đỡ chỗ ở cho 100.000 người tị nạn đang chạy trốn khỏi Ukraine</h1>
              <p className="leading-relaxed mt-4">Hãy tham gia cùng chúng tôi. Chúng tôi sẽ hỗ trợ bạn hoàn thành
                từng bước của quy trình.</p>
            </div>

            <form
              onSubmit={handleSubmit(data => {
                console.log(data);
                dispatch(authAction.resetUserLogin())
                dispatch(login(data))

              })}
              className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 style={{ color: ' #ff5a5f' }} className="text-gray-900 text-lg font-medium title-font mb-5">Đăng Nhập</h2>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm">Tài Khoản</label>
                <input {...register('email', { required: 'Tài khoản không được bỏ trống' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.email?.type === 'required' && <p className='text-red-400'>{errors.email.message}</p>}
              </div>
              <div className="relative mb-4">
                <label className=" text-[#ff5a5f] leading-7 text-sm ">Mật khẩu</label>
                <input type='password' {...register('password', { required: 'Tài khoản không được bỏ trống' })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                {errors?.password?.type === 'required' ? (<p className='mb-0 text-red-400'>{errors?.password?.message}</p>) : ('')}
              </div>
              <button className="text-white shadow-lg rounded-full bg-[#ff5a5f] border-0 py-2 px-8 focus:outline-none mt-10 text-lg active:scale-[0.97] ">Đăng nhập</button>
              {errUserLogin && <p style={{ color: ' #ff5a5f' }} className='mt-7 mb-7'>{errUserLogin}</p>}
              <p className="text-xs text-gray-500 mt-3">Bạn chưa có tài khoản ? Vui lòng bấm <span className='cursor-pointer' style={{ color: ' #ff5a5f' }}>đăng ký</span></p>
            </form>

          </div>
        </StyledDiv>
      </div>
    </div>
  )
}

export default Login
const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`