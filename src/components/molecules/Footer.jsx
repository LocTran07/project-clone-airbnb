import React from 'react'
import styled from 'styled-components'
import {FacebookOutlined,InstagramOutlined,TwitterOutlined} from '@ant-design/icons'
const Footer = () => {
  return (
    <StyledDiv className='Footer'>
      <div className='container mx-auto '>
        <div className='py-[35px] px-5'>
          <div className='grid md:grid-cols-4 grid-cols-1  border-b-[1px] border-black'>
            <div className=''>
              <p> Hỗ trợ</p>
              <ul>
                <li>Trung tâm trợ giúp</li>
                <li>AirCover</li>
                <li>Thông tin an toàn</li>
                <li>Hỗ trợ người khuyết tật</li>
                <li>Các tùy chọn hủy</li>
                <li>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</li>
                <li>Báo cáo lo ngại của hàng xóm</li>
              </ul>
            </div>
            <div>
              <p>  Cộng đồng</p>
              <ul>
                <li>Airbnb.org: nhà ở cứu trợ</li>
                <li>Hỗ trợ dân tị nạn Afghanistan</li>
                <li>Chống phân biệt đối xử</li>
              </ul>
            </div>
            <div>
              <p> Đón tiếp khách</p>
              <ul>
                <li>Thử đón tiếp khách</li>
                <li>AirCover cho Chủ nhàr</li>
                <li>Xem tài nguyên đón tiếp khách</li>
                <li>Truy cập diễn đàn cộng đồng</li>
                <li>Đón tiếp khách có trách nhiệm</li>
              </ul>
            </div>
            <div>
              <p>Airbnb</p>
              <ul>
                <li>Trang tin tức</li>
                <li>Tìm hiểu các tính năng mới</li>
                <li>Thư ngỏ từ các nhà sáng lập</li>
                <li>Cơ hội nghề nghiệp</li>
                <li>Nhà đầu tư</li>
              </ul>
            </div>
          </div>
          <div className='md:flex justify-between items-center'>
            <p className='mt-5'>© 2022 Airbnb, Inc.·Quyền riêng tư·Điều khoản·Sơ đồ trang web</p>
            <div >
              <span className='mr-6 cursor-pointer text-[22px]'><FacebookOutlined /></span>
              <span className='mr-6 cursor-pointer text-[22px]'><InstagramOutlined /></span>
              <span className='mr-6 cursor-pointer text-[22px]'><TwitterOutlined /></span>
            </div>
          </div>
        </div>

      </div>
    </StyledDiv>
  )
}

export default Footer
const StyledDiv = styled.div`
background-color: #f7f7f7;
  p {
    color: #ff5a5f;
    font-weight: 600;
  }
  li{
    margin-bottom: 4px;
  }
  li:hover{
    text-decoration: underline;

  }
  

`