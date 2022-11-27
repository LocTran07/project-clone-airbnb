import React from 'react'
import styled from 'styled-components'

const SubMenuome = () => {
  return (
    <StyledDiv className='mt-20'>
        <div className='container mx-auto px-5 md:px-0'>
            <h3 className='text-xl'>Ở bất cứ đâu</h3>
            <div className='grid grid-cols-2 md:grid-cols-4'>
                <div>
                    <img className='w-[80%] h-[80%] rounded-lg' src="https://a0.muscache.com/im/pictures/3f678cb4-b7cd-4039-8aa9-80c868e743f9.jpg?im_w=720" alt="" />
                    <p>Toàn bộ nhà</p>
                </div>
                <div>
                    <img className='w-[80%] h-[80%] rounded-lg' src="https://a0.muscache.com/im/pictures/miso/Hosting-37805118/original/05cf0d6f-4608-48c2-8ae0-3fb767ef7380.jpeg?im_w=720" alt="" />
                    <p>Chỗ ở độc đáo</p>
                </div>
                <div>
                    <img className='w-[80%] h-[80%] rounded-lg' src="https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/088a6251-1a8c-459c-9f14-6d131fdb1a68.jpeg?im_w=1200" alt="" />
                    <p>Trang trại và thiên nhiên</p>
                </div>
                <div>
                    <img className='w-[80%] h-[80%] rounded-lg' src="data:image/jpeg;base64,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" alt="" />
                    <p>Cho phép mang thú cưng</p>
                </div>
              
            </div>
        </div>
    </StyledDiv>
  )
}

export default SubMenuome
const StyledDiv = styled.div`
    h3 {
        color: #ff5a5f;

}
`