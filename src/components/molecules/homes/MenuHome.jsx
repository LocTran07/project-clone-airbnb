import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getLocation } from '../../../reduxToolkit/reducers';

const MenuHome = () => {
    // useSelector
    const { locationList } = useSelector(state => state.locationReducer)
    // dispatch 
    const dispatch = useDispatch()
    // useeffect 
    useEffect(() => {
        dispatch(getLocation())
    }, [])

    // usenavigate 
    const navigate = useNavigate()
    return (
        <StyledDiv className='MenuHome mt-20'>
            <div className='container mx-auto px-5 md:px-0 '>
                <h3 className='text-xl'>Khám phá những điểm đến gần đây</h3>
                <div className='grid grid-cols-2 md:grid-cols-4'>
                    {locationList?.map((item, index) => {
                        return (
                            <div onClick={() => { navigate(`roomlocation/${item.id}`) }} key={index} className='thumbnail rounded-lg flex cursor-pointer items-center my-4'>
                                <div className='rounded-lg overflow-hidden'><img className='rounded-lg w-[80px] h-[80px]' src={item.hinhAnh} alt="" /></div>
                                <div>
                                    <p className='mb-0 ml-3 font-medium'>{item.tenViTri}</p>
                                    <p className='ml-3'>{item.tinhThanh}, {item.quocGia} </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </StyledDiv>
    )
}

export default MenuHome
const StyledDiv = styled.div`
    h3 {
        color: #ff5a5f;    
}
    .thumbnail:hover img {
        transform: scale(1.1);
    } 
    .thumbnail img {
        transition: all 0.3s;
    
    }
    .thumbnail {
        overflow: hidden;

    }
`