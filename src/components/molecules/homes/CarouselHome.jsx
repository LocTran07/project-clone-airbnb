import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import styled from 'styled-components'

const contentStyle = {
    height: "550px",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',

};
const CarouselHome = () => {

    const onChange = (currentSlide) => {
    };
    // hinh anh
    const data = [
        { img: 'https://a0.muscache.com/im/pictures/b1cb771a-54d4-47a4-8b10-c4428d7163e4.jpg?im_w=1200' },
        { img: 'https://a0.muscache.com/im/pictures/63503067-1646-4818-8fe6-387c8d4e44a2.jpg?im_w=1200' },
        { img: 'https://a0.muscache.com/im/pictures/miso/Hosting-609192469169907888/original/dc4bd5d7-3c38-4439-ae12-27ae2809d24e.jpeg?im_w=1200' },

    ]


    return (
        <Wrapper className='CarouselHome'>
            <Carousel autoplay afterChange={onChange}>
                {data.map(item => {
                    return (
                        <div key={item.img} >
                            <div style={{ ...contentStyle, backgroundImage: `url(${item.img})`, backgroundPosition: ' center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

                                {/* <img src={item.img} className='w-full h-[400px]  opacity-0 ' alt="" /> */}
                            </div>
                        </div>
                    )
                })}

            </Carousel>

        </Wrapper>
    );
};
export default CarouselHome;
const Wrapper = styled.div`
  &.CarouselHome{
    .slick-dots{
      width: auto;
    }
  }
`