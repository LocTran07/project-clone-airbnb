import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { editUser, getDetailUser, getLocation, getLocationById, getRoomById, putLocation, putRoom } from '../../reduxToolkit/reducers';
import moment from 'moment'

const EditRoom = () => {
    const hinh = './img/user.webp'
    // useForm
    const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm();
    // pararam 
    const param = useParams()
    // useSelector

    const { roomById } = useSelector(state => state.roomReducer)
    const { locationList } = useSelector(state => state.locationReducer)
    console.log(roomById);
    // dispatch 
    const dispatch = useDispatch()
    // usenavigate
    const navigate = useNavigate()
    //use effect 
    useEffect(() => {
        dispatch(getLocation())
    }, [])
    useEffect(() => {
        dispatch(getRoomById(param.id))
    }, [])
    // usestate 
    const [ImgUrl, setImgUrl] = useState('')
    useEffect(() => {
        reset({
            tenPhong: roomById?.tenPhong,
            khach: roomById?.khach,
            phongNgu: roomById?.phongNgu,
            giuong: roomById?.giuong,
            phongTam: roomById?.phongTam,
            moTa: roomById?.moTa,
            giaTien: roomById?.giaTien,
            mayGiat: roomById?.mayGiat.toString(),
            banLa: roomById?.banLa.toString(),
            tivi: roomById?.tivi.toString(),
            dieuHoa: roomById?.dieuHoa.toString(),
            wifi: roomById?.wifi.toString(),
            bep: roomById?.bep.toString(),
            doXe: roomById?.doXe.toString(),
            hoBoi: roomById?.hoBoi.toString(),
            banUi: roomById?.banUi.toString(),
            maViTri: roomById?.maViTri.toString(),
            hinhAnh: roomById?.hinhAnh
        }
        )
    }, [roomById])
    return (
        <div className='EditDetailUser pt-[70px]'>
            <div className='h-auto w-full' style={{ backgroundImage: `url(https://a0.muscache.com/im/pictures/0151d06a-331e-4be1-96d8-07c6e6084fd6.jpg?im_w=1200)`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                <StyledDiv className="text-gray-600 body-font h-auto">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

                        {/* <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Gi??p ????? ch??? ??? cho 100.000 ng?????i t??? n???n ??ang ch???y tr???n kh???i Ukraine</h1>
                            <p className="leading-relaxed mt-4">H??y tham gia c??ng ch??ng t??i. Ch??ng t??i s??? h??? tr??? b???n ho??n th??nh
                                t???ng b?????c c???a quy tr??nh.</p>
                        </div> */}

                        <form
                            onSubmit={handleSubmit(data => {

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
                                    id: param.id,
                                    data: {
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
                                        // hinhAnh: data.hinhAnh || roomById.hinhAnh
                                    }
                                }
                                if(newData.data.hinhAnh === '') {
                                    newData.data.hinhAnh = roomById.hinhAnh
                                }else{
                                    newData.data.hinhAnh = data.hinhAnh 
                                }

                                dispatch(putRoom(newData))

                                alert('C???p nh???t th??nh c??ng')
                                navigate(-1)
                            })}
                            className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 style={{ color: ' #ff5a5f' }} className="text-gray-900 text-lg font-medium title-font mb-5">Th??ng tin v??? tr??</h2>
                            <div className='grid grid-cols-2 gap-x-7'>
                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">T??n ph??ng</label>
                                    <input {...register('tenPhong', { required: 'T??n ph??ng kh??ng ???????c b??? tr???ng' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.tenPhong && <p className='text-red-400'>{errors.tenPhong.message}</p>}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">M?? t???</label>
                                    <input {...register('moTa', { required: 'M?? t??? kh??ng ???????c b??? tr???ng' })} type="text" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.moTa && <p className='text-red-400'>{errors.moTa.message}</p>}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">Gi?? ti???n</label>
                                    <input {...register('giaTien', { required: 'T???nh Th??nh kh??ng ???????c b??? tr???ng' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.giaTien && <p className='text-red-400'>{errors.giaTien.message}</p>}
                                </div>
                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">S??? l?????ng kh??ch</label>
                                    <input {...register('khach', { required: 'S??? l?????ng kh??ch kh??ng ???????c b??? tr???ng' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.khach && <p className='text-red-400'>{errors.khach.message}</p>}
                                </div>
                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">Ph??ng ng???</label>
                                    <input {...register('phongNgu', { required: 'Ph??ng ng??? kh??ng ???????c b??? tr???ng' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.giaTien && <p className='text-red-400'>{errors.giaTien.message}</p>}
                                </div>
                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">Gi?????ng</label>
                                    <input {...register('giuong', { required: 'Gi?????ng kh??ng ???????c b??? tr???ng' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.giuong && <p className='text-red-400'>{errors.giuong.message}</p>}
                                </div>
                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">Ph??ng t???m</label>
                                    <input {...register('phongTam', { required: 'Ph??ng t??m kh??ng ???????c b??? tr???ng' })} type="number" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors?.phongTam && <p className='text-red-400'>{errors.phongTam.message}</p>}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">M?? v??? tr??</label>
                                    <select {...register('maViTri', { required: ' M?? v??? tr?? kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        {locationList.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.tenViTri}</option>
                                            )
                                        })}
                                    </select>
                                    {errors?.maViTri && (<p className='mb-0 text-red-400'>{errors.maViTri.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">M??y gi???t</label>
                                    <select {...register('mayGiat', { required: ' M??y gi???t kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value='false'>Kh??ng</option>
                                    </select>
                                    {errors?.mayGiat && (<p className='mb-0 text-red-400'>{errors.mayGiat.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">B??n l??</label>
                                    <select {...register('banLa', { required: ' B??n l?? kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value='false'>Kh??ng</option>
                                    </select>
                                    {errors?.banLa && (<p className='mb-0 text-red-400'>{errors.banLa.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Tivi</label>
                                    <select {...register('tivi', { required: ' Tivi kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.tivi && (<p className='mb-0 text-red-400'>{errors.tivi.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">??i???u h??a</label>
                                    <select {...register('dieuHoa', { required: '??i???u h??a kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.dieuHoa && (<p className='mb-0 text-red-400'>{errors.dieuHoa.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">Wifi</label>
                                    <select {...register('wifi', { required: ' Wifi kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.wifi && (<p className='mb-0 text-red-400'>{errors.wifi.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">B???p</label>
                                    <select {...register('bep', { required: ' B???p kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.bep && (<p className='mb-0 text-red-400'>{errors.bep.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">????? xe</label>
                                    <select {...register('doXe', { required: ' ????? xe kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.doXe && (<p className='mb-0 text-red-400'>{errors.doXe.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">H??? b??i</label>
                                    <select {...register('hoBoi', { required: 'H??? b??i kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.hoBoi && (<p className='mb-0 text-red-400'>{errors.hoBoi.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm ">B??n ???i</label>
                                    <select {...register('banUi', { required: 'B??n ???i kh??ng ???????c b??? tr???ng' })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <option value='true'>C??</option>
                                        <option value="false">Kh??ng</option>
                                    </select>
                                    {errors?.banUi && (<p className='mb-0 text-red-400'>{errors.banUi.message}</p>)}
                                </div>

                                <div className="relative mb-4">
                                    <label className=" text-[#ff5a5f] leading-7 text-sm">H??nh ???nh</label>
                                    <input
                                        onChange={(e) => {
                                            // l???y file ra 

                                            const file = e.target.files[0]
                                            // t???o ?????i t?????ng ?????c file 
                                            const reader = new FileReader()
                                            // ?????c file 
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
                                        <img src={ImgUrl ||  roomById?.hinhAnh} alt="..." className='w-40 h-40 bg-gray-200 rounded-lg' />
                                    </div>
                                </div>
                            </div>

                            <button className="text-white shadow-lg rounded-full bg-[#ff5a5f] border-0 py-2 px-8 focus:outline-none mt-10 text-lg active:scale-[0.97] ">C???p nh???t</button>
                            <span onClick={() => { navigate(-1) }} className='block text-[15px] cursor-pointer text-red-400 mt-5 underline decoration-1'> Quay l???i trang admin</span>

                        </form>

                    </div>
                </StyledDiv>
            </div >


        </div >
    )
}

export default EditRoom

const StyledDiv = styled.div`
background: rgba( 255, 255, 255, 0.6 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 1.5px );
-webkit-backdrop-filter: blur( 1.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`