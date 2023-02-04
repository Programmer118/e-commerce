import React from 'react'
import { HeroBanner,Product, FooterBanner } from '../components'

import { client } from '@/lib/client'

const Home = ({product,bannerData}) => {
  return (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
    <div className='products-heading'>
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className='products-container'>
      {product?.map((product)=><Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async()=>{
  const quary = '*[_type == "product"]';
  const product = await client.fetch(quary)
 
  const bannerQuary = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuary)

  return{
    props:{product,bannerData}
  }
}

export default Home