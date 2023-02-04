import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import {BiBookReader} from 'react-icons/bi'

import { Cart } from './'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {
  const {setShowCart,showCart,totalQuantities} = useStateContext();
  return (
    <div className='navbar-container' >
      <p className='logo'>
        <Link href='/'>
          Shopies
        </Link>
        <BiBookReader style={{gap:'5px',alignItems:'center'}}/>
      </p>
      <button type='button' className='cart-icon' onClick={()=>setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {showCart && <Cart/>}
    </div>
  )
}

export default Navbar