import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { editUser, getDetailUser, getLocationById, putLocation } from '../../reduxToolkit/reducers';
import moment from 'moment'

const EditUser = () => {
    const hinh = './img/user.webp'
    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors },setValue } = useForm();
    // pararam 
    const param = useParams()
    // useSelector
    const { locationById } = useSelector(state => state.locationReducer)
    // usestate 
    const [ImgUrl, setImgUrl] = useState('')
    // dispatch 
    const dispatch = useDispatch()
    // usenavigate
    const navigate = useNavigate()
    //use effect 
    useEffect(() => {
        dispatch(getLocationById(param.id))
    }, [])

    useEffect(() => {
        reset({
            tenViTri: locationById?.tenViTri,
            tinhThanh: locationById?.tinhThanh,
            quocGia: locationById?.quocGia,
            hinhAnh: locationById?.hinhAnh,
        }

        )
    }, [locationById])
    return (
        <div className='EditDetailUser pt-[70px]'>
            <div className='h-auto w-full' style={{ backgroundImage: `url(https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=1200)`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                <StyledDiv className="text-gray-600 body-font h-auto">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

                        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Giúp đỡ chỗ ở cho 100.000 người tị nạn đang chạy trốn khỏi Ukraine</h1>
                            <p className="leading-relaxed mt-4">Hãy tham gia cùng chúng tôi. Chúng tôi sẽ hỗ trợ bạn hoàn thành
                                từng bước của quy trình.</p>
                        </div>

                        <form
                            onSubmit={handleSubmit(data => {
                                console.log(data);
                                const newData = {
                                    id: param.id,
                                    data: { ...data, id: param.id, }
                                }
                                // if(newData.data.hinhAnh === '') {
                                //     newData.data.hinhAnh = roomById.hinhAnh
                                // }else{
                                //     newData.data.hinhAnh = data.hinhAnh 
                                // }

                                dispatch(putLocation(newData))
                          
            
                                alert('Cập nhật thành công')
                                navigate(-1)
                            })}
                            className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 style={{ color: ' #ff5a5f' }} className="text-gray-900 text-lg font-medium title-font mb-5">Thông tin vị trí</h2>
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
                                    <input
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
                                    <div className=' mt-7'>
                                        <img src={ImgUrl ||  locationById?.hinhAnh} alt="..." className='w-40 h-40 bg-gray-200 rounded-lg' />
                                    </div>
                                </div>


                            <button className="text-white shadow-lg rounded-full bg-[#ff5a5f] border-0 py-2 px-8 focus:outline-none mt-10 text-lg active:scale-[0.97] ">Cập nhật</button>
                            <span onClick={() => { navigate(-1) }} className='block text-[15px] cursor-pointer text-red-400 mt-5 underline decoration-1'> Quay lại trang admin</span>

                        </form>

                    </div>
                </StyledDiv>
            </div>


        </div>
    )
}

export default EditUser
const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`