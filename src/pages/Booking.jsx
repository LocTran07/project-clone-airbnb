import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getRoomById, getCommentList, postComment, getBookingList, postBooking, postBooking1 } from '../reduxToolkit/reducers';
import { HomeOutlined, BulbOutlined, ContactsOutlined, DollarOutlined, WifiOutlined, TabletOutlined } from '@ant-design/icons'
import { MdOutlineIron } from 'react-icons/md';
import { GiWashingMachine } from 'react-icons/gi';
import { BsSnow } from 'react-icons/bs';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { CiParking1 } from 'react-icons/ci';
import moment from 'moment'
import { useForm } from 'react-hook-form';
import { USERLOGIN } from '../utili/setup';
import _ from 'lodash'
const Booking = () => {
    // useSelector 
    const { roomById } = useSelector(state => state.roomReducer)
    const { commentList } = useSelector(state => state.commentReducer)
    const { bookingList } = useSelector(state => state.bookingReducer)

    // useForm
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    // dispatch 
    const dispatch = useDispatch()
    //useparam
    const param = useParams()

    // useeffect 
    useEffect(() => { dispatch(getRoomById(param.id)) }, [])
    useEffect(() => { dispatch(getCommentList()) }, [])
    useEffect(() => { dispatch(getBookingList()) }, [])

    // fix lỗi 
    //  const a = bookingList && Array.isArray(bookingList) && bookingList?.filter((comment) => comment.maPhong === param.id)
    // const a = bookingList && bookingList?.filter((comment) => comment.maPhong === roomById?.id)

    // const index = a.length > 1 &&  a?.findIndex(item => moment(item.ngayDen).format('DD-MM-YYYY') === '01-12-2022')
    // const index1 = a.length > 1 &&   a?.findIndex(item => moment(item.ngayDi).format('DD-MM-YYYY') === '01-14-2022')
    // console.log(index , index1);
    // if(index === -1 && index1 === -1) {
    //    console.log(123123);
    // }
    // console.log(a);

    // useref
    const inputSoLuong = useRef()
    // useState 
    const [luongKhach, setLuongKhach] = useState(1)
    const [ngayDen, setNgayDen] = useState('')
    const [ngayDi, setNgayDi] = useState('')
    // const [tongTien1, settongTien1] = useState(0)

    // usememo

    const calculation = useMemo(() => {
        let a = 0
        if (ngayDi && ngayDen) {
            a = ngayDi - ngayDen
            return a
        } else {
            return a
        }
    }, [ngayDen, ngayDi]);

    const tongTien = useMemo(() => {
        let tong = 0
        let phuPhi = 0
        if (+luongKhach < 4) {
            phuPhi = 0
        } else if (+luongKhach === 4) {
            phuPhi = 2

        } else {
            phuPhi = 3
        }
        tong = (+roomById?.giaTien * calculation) + phuPhi
        if (tong === NaN) {
            return 0
        } else {
            // settongTien1(tong)
            return tong
        }

    }, [luongKhach, ngayDen, ngayDi]);

    const { userLogin } = useSelector(state => state.authReducer)

    console.log(userLogin);
    if (!userLogin) {
        alert('Vui lòng đăng nhập')
        return <Navigate replace to='/login'></Navigate>
    }
    if (userLogin?.user.role !== 'USER') {
        alert('Vui lòng sử dụng tài khoản người dùng')
        return <Navigate replace to='/login'></Navigate>
    }

    return (
        <div className='Booking pt-[90px]'>
            <div className='container mx-auto'>
                booking
                <div className='Cover px-7'>
                    <div>
                        <p className='font-medium md:text-lg mb-7 '> {roomById?.tenPhong}</p>
                        <p><span className='text-[#ff5a5f]'>☆</span><span className='font-medium'> 4.9 </span><span className='text-[rgba(0,0,0,0.5)] underline'>(711 đánh giá)</span></p>
                        <div className='rounded-xl' style={{ backgroundImage: `url(${roomById?.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 400 }}></div>
                    </div>

                    <div className='mt-20'>
                        <div className='grid md:grid-cols-3'>
                            <div className='col-span-2 pr-20'>
                                <div className='Row-1 flex justify-between items-center'>
                                    <div>
                                        <p className='mb-7 text-lg font-medium'>Toàn bộ căn phòng - Chủ nhà Lộc</p>
                                        <p className='mb-7'>{roomById?.khach} khách - {roomById?.giuong} giường - {roomById?.phongNgu} phòng ngủ - {roomById?.phongTam} phòng tắm</p>
                                    </div>
                                    <div>
                                        <div className='rounded-full' style={{ backgroundImage: `url(https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-%C4%91%C3%B4i-ng%C6%B0%E1%BB%9Di-th%E1%BA%ADt-H%C3%A0n-Qu%E1%BB%91c.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', height: 60, width: 60 }}></div>
                                    </div>

                                </div>
                                <hr />
                                <div className='Row-2'>
                                    <div className='flex items-center mt-7'>
                                        <HomeOutlined className='text-[20px]' style={{ color: '#ff5a5f' }} />
                                        <div className='ml-7'>
                                            <p className='mb-1 font-medium'>Toàn bộ nhà</p>
                                            <p className='mb-1 text-[#2626428f]'>Bạn sẽ có phòng cao cấp cho riêng mình.</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-7'>

                                        <BulbOutlined className='text-[20px]' style={{ color: '#ff5a5f' }} />
                                        <div className='ml-7'>
                                            <p className='mb-1 font-medium'>Vệ sinh tăng cường </p>
                                            <p className='mb-1 text-[#2626428f]'>Chủ nhà thực hiện 5 bước vệ sinh chuẩn AirBnB.</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-7'>

                                        <DollarOutlined className='text-[20px]' style={{ color: '#ff5a5f' }} />
                                        <div className='ml-7'>
                                            <p className='mb-1 font-medium'>Lộc là chủ nhà siêu cấp</p>
                                            <p className='mb-1 text-[#2626428f]'>Chủ nhà siêu cấp là những người có kinh nghiệm và được đánh giá cao.</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-7'>

                                        <ContactsOutlined className='text-[20px]' style={{ color: '#ff5a5f' }} />
                                        <div className='ml-7'>
                                            <p className='mb-1 font-medium'>Miễn phí hủy trong 48h</p>

                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='Row-3 mt-7'>
                                    <p className='mb-1 font-medium'>Mô tả:</p>
                                    <p>{roomById?.moTa}</p>
                                </div>
                                <hr />
                                <div className='Row-4 '>
                                    <p className='mb-4 text-lg font-medium'>Tiện nghi:</p>
                                    <div className='grid grid-cols-2'>
                                        <p><TbToolsKitchen2 className='inline-block ' /><span className='ml-5'>{roomById?.bep ? 'Bếp' : 'Không có'}</span></p>
                                        <p><WifiOutlined className='' /><span className='ml-5'>{roomById?.wifi ? 'Wifi' : 'Không có'}</span></p>
                                        <p><TabletOutlined className='' /><span className='ml-5'>{roomById?.tivi ? 'Tivi' : 'Không có'}</span></p>
                                        <p><CiParking1 className='inline-block text-[17px]' /><span className='ml-5'>{roomById?.bep ? 'Bãi đậu xe' : 'Không có'}</span></p>
                                        <p><BsSnow className='inline-block text-[15px] ' /><span className='ml-5'>{roomById?.bep ? 'Máy lạnh' : 'Không có'}</span></p>
                                        <p><MdOutlineIron className='inline-block text-[17px] ' /><span className='ml-5'>{roomById?.bep ? 'Bàn ủi' : 'Không có'}</span></p>
                                        <p><GiWashingMachine className='inline-block text-[15px] ' /><span className='ml-5'>{roomById?.bep ? 'Máy giặt' : 'Không có'}</span></p>

                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className='Col-2 w-[270px] md:w-auto mt-14  md:mt-0 '>
                                <div className='shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] rounded-lg h-[300px] py-10 px-10'>
                                    <div className='cover'>
                                        <div className='Row-1 flex justify-between items-center'>
                                            <p><span className='text-lg font-medium'>${roomById?.giaTien}</span>/đêm</p>
                                            <p><span className='text-[#ff5a5f]'>☆</span><span className='font-medium'> 4.9 </span><span className='text-[rgba(0,0,0,0.5)] underline'>(711 đánh giá)</span></p>
                                        </div>
                                        <div className='Row-2'>
                                            <form onSubmit={
                                                handleSubmit(data => {
                                                    data.soLuongKhach = luongKhach

                                                    let newData = _.pick(data, ['ngayDen', 'ngayDi', 'soLuongKhach'])
                                                    // let newData1 = {...newData,}
                                                    newData.maPhong = +param.id
                                                    newData.maNguoiDung = JSON.parse(localStorage.getItem(USERLOGIN)).user.id
                                                    const a = bookingList && bookingList?.filter((comment) => comment.maPhong === roomById?.id)
                                                    console.log(a);
                                                    const index = a?.findIndex(item => moment(item.ngayDen).format('YYYY-MM-DD') === newData.ngayDen)
                                                    const index1 = a?.findIndex(item => moment(item.ngayDi).format('YYYY-MM-DD') === newData.ngayDi)
                                                    const index2 = a?.findIndex(item => moment(item.ngayDen).format('YYYY-MM-DD') === newData.ngayDi)
                                                    const index3 = a?.findIndex(item => moment(item.ngayDi).format('YYYY-MM-DD') === newData.ngayDen)

                                                    if (index === -1 && index1 === -1 && index2 === -1 && index3 === -1) {
                                                        alert('Đặt phòng thành công')
                                                        dispatch(postBooking1(newData))
                                                    } else {
                                                        alert('Phòng đã được đặt, vui lòng chọn ngày khác')
                                                    }


                                                    console.log(newData);
                                                })} action="">
                                                <div>
                                                    <div className='w-[50%] inline-block relative '>
                                                        <input required onChange={(e) => {
                                                            setValue('ngayDen', e.target.value)
                                                            let a = +moment(e.target.value).format('YYYY-MM-DD').substring(8, 10)
                                                            setNgayDen(a)
                                                        }} className='border border-[#2626428f] w-[100%] rounded-tl-lg pt-20 pl-5 ' type="date" />
                                                        <label className='absolute top-0 left-[50%] -translate-x-[50%]' htmlFor="">Ngày đến</label>
                                                    </div>
                                                    <div className='w-[50%] inline-block relative'>
                                                        <input required onChange={(e) => {
                                                            setValue('ngayDi', e.target.value)
                                                            let a = +moment(e.target.value).format('YYYY-MM-DD').substring(8, 10)
                                                            setNgayDi(a)

                                                        }} className='border border-[#2626428f] w-[100%] rounded-tr-lg pt-20 pl-5 ' type="date" />
                                                        <label className='absolute top-0 left-[50%] -translate-x-[50%]' htmlFor="">Ngày đi</label>
                                                    </div>
                                                </div>
                                                <select onChange={(e) => { setLuongKhach(e.target.value) }} className='border border-[#2626428f] w-full text-center rounded-b-lg py-10' name="" id="">
                                                    <option value="1">1 khách </option>
                                                    <option value="2">2 khách</option>
                                                    <option value="3">3 khách</option>
                                                    <option value="4">4 khách</option>
                                                    <option value="5">5 khách</option>
                                                </select>

                                                <button className='mt-7 font-medium bg-[#ff5a5f] px-7 py-3 rounded-lg active:scale-[0.95] text-white w-full'>Đặt phòng</button>
                                            </form>
                                        </div>
                                        <div className='Row-3 my-7'>
                                            <div className=' flex justify-between items-center'>
                                                <p className='mb-0'><span className='text-lg font-medium'>${roomById?.giaTien}</span> x {calculation} đêm</p>
                                                <p className='mb-0'>  </p>
                                            </div>
                                            <div className=' flex justify-between items-center'>
                                                <p className='mb-0'>Phí phụ thu (trên 3 khách) : </p>
                                                <p className='mb-0 text-lg font-medium'>{+luongKhach < 4 ? 0 : +luongKhach === 4 ? '$2' : '$3'}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='Row-4'>
                                            <div className=' flex justify-between items-center'>
                                                <p className='text-lg font-medium'>Tổng tiền</p>
                                                <p className='mb-0 text-lg font-medium'>${tongTien}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='Row-5 pb-15'>
                            <p className='mb-4 text-lg font-medium'>Bình luận:</p>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-x-5'>
                                {commentList && Array.isArray(commentList) && commentList?.filter((comment) => comment?.maPhong === roomById?.id)?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center mt-7'>
                                                <div className='rounded-full' style={{ backgroundImage: `url(https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1884971.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', height: 40, width: 40 }}></div>
                                                <div className='ml-7'>
                                                    <p className='mb-1 font-medium'>{item.maNguoiBinhLuan}</p>
                                                    <p className='mb-1 text-[#2626428f]'>{moment(item.maNguoiBinhLuan).format('DD/MM/YYYY')}</p>

                                                </div>
                                            </div>
                                            <p>{item.noiDung} <br></br> Đánh giá: {item.saoBinhLuan} sao</p>
                                        </div>

                                    )
                                })}

                            </div>
                            <div>
                                <form onSubmit={handleSubmit(data => {


                                    let CommentData = {
                                        ...data,
                                        maPhong: +param.id,
                                        maNguoiBinhLuan: JSON.parse(localStorage.getItem(USERLOGIN || 0)).user.id,
                                        ngayBinhLuan: Date(),
                                        saoBinhLuan: +data.saoBinhLuan
                                    }
                                    if (CommentData.noiDung.trim() !== '') {

                                        dispatch(postComment(CommentData))
                                    } else { alert('Chưa nhập bình luận') }
                                })} action="">
                                    <input  {...register('noiDung',)} className='border border-[#2626428f] p-7' placeholder='Thêm bình luận' ></input>
                                    <div className='my-7'>
                                        <label htmlFor="">Số sao: </label>
                                        <select {...register('saoBinhLuan')} className='border border-[#2626428f] ' name="" id="">
                                            <option value="1">1 sao</option>
                                            <option value="2">2 sao</option>
                                            <option value="3">3 sao</option>
                                            <option value="4">4 sao</option>
                                            <option value="5">5 sao</option>
                                        </select>
                                    </div>

                                    <button className='bg-[#ff5a5f] px-7 py-3 rounded-lg active:scale-[0.95] text-white' >Thêm bình luận</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking