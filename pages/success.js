import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'

import { useStateContext } from '@/context/StateContext'
import { runRealsticLook } from '@/lib/utils'

const Success = () => {
    const {setCartItem, setTotalPrice,setTotalQuantities} = useStateContext();

    useEffect(() => {
        localStorage.clear()
        setCartItem([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runRealsticLook()
    }, [])
    
  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Order Placed</h2>
            <p className="email-msg">Receipt will be send to your email</p>
            <p className="description">
                For any Query Contect
                <a href="mailto:ss8700977@gmail.com" className='email'>
                    order@example.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>
                    Continue Shopping
                </button>
            </Link>
        </div>

    </div>
  )
}

export default Success