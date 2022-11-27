import Item from 'antd/lib/list/Item'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getRoomLocation } from '../reduxToolkit/reducers'
import { HeartOutlined } from '@ant-design/icons'

const RoomLocation = () => {
    // useSelector 
    const { roomLocation } = useSelector(state => state.roomReducer)
    console.log(roomLocation);
    // dispatch 
    const dispatch = useDispatch()
    //useparam
    const param = useParams()
    console.log(param.id);
    // useeffect 
    useEffect(() => { dispatch(getRoomLocation(param.id)) }, [param.id])
    // use navigate 
    const navigate = useNavigate()
    return (
        <StyledDiv className='RoomLocation pt-[90px]'>
            <div className='container mx-auto px-5'>
                <div className='grid md:grid-cols-3 grid-cols-1 mb-12'>
                    <div className='col-span-2'>
                        {param.date1 ? (<p className='mb-2 mt-10'>Hơn 300 chỗ từ {param?.date1} đến {param?.date2}</p>) : (<Fragment></Fragment>)}
                        <h3 className='md:text-2xl'>Chỗ ở tại khu vực bạn đã chọn</h3>
                        <hr className='w-[90%]' />
                        <div>
                            {roomLocation?.length > 0 ? roomLocation?.map((room, index) => {
                                return (
                                    <div key={index} className='cover'>
                                        <div onClick={() => { navigate(`/booking/${room.id}`) }} key={index} className=' grid md:grid-cols-3 grid-cols-1 mt-15 cursor-pointer'>
                                            <div className='overflow-hidden rounded-xl'>
                                                <div className='rounded-xl abc' style={{ backgroundImage: `url(${room.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 150 }}>
                                                </div>
                                            </div>
                                            <div className='mt-10 md:mt-10 pl-10 pr-[50px] col-span-2 relative'>
                                                <h5 className='text-clip overflow-hidden'>{room.tenPhong}</h5>
                                                <hr className='w-[10%]' />
                                                <div>
                                                    <span>{room.khach} khách</span>
                                                    <span> - {room.giuong} giường</span>
                                                    <span> - {room.phongNgu} phòng ngủ</span>
                                                    <span> - {room.phongTam} phòng tắm</span>
                                                    <span> {room.banUi ? ' - bàn ủi' : ''}</span>
                                                    <span> {room.bep ? ' - bếp' : ''}</span>
                                                    <span> {room.dieuHoa ? ' - điều hòa' : ''}</span>
                                                    <span> {room.doXE ? ' - đỗ xe' : ''}</span>
                                                    <span> {room.mayGiat ? ' - máy giặt' : ''}</span>
                                                    <span> {room.tivi ? ' - tivi' : ''}</span>
                                                    <span> {room.wifi ? ' - wifi' : ''}</span>
                                                </div>
                                                <p className='font-medium' style={{ color: ' #ff5a5f' }}>$ {room.giaTien}/ngày</p>
                                                <HeartOutlined style={{ color: ' #ff5a5f',transition: 'all 0.3s' }} className='tim absolute top-3 right-[35px] ' />
                                            </div>
                                        </div>
                                        <hr className='mt-10 w-[92%]' />
                                    </div>


                                )
                            }) : <p className='text-lg font-medium'>Hiện chưa có danh sách phòng</p>}
                        </div>
                    </div>






                    <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62710.4782426285!2d106.72381367543014!3d10.78026930154083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175267f1c6f9ea1%3A0xbecd38cc31f49c06!2zUXXhuq1uIDIsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1668238515625!5m2!1svi!2s" height={'100%'} style={{ border: 0, width: '100%' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
                </div>
            </div>
        </StyledDiv>
    )
}


export default RoomLocation
const StyledDiv = styled.div`
   h3 {
    color: #ff5a5f;}
  h5{

  }
  .anticon svg{
    position: absolute;
    top : 0
  }
  .anticon svg:hover{
    transform: scale(2);
  }
  .abc{
    transition: all 0.3s;
  }
  .cover:hover .abc{
    transform: scale(1.1);
  }
  .tim svg{
    transition: all 0.3s;
    
  }
   .anticon svg:hover{
    transform: scale(1.5) !important;

  }
`