import React from 'react'
import { Cart } from '../features/cart/Cart'
import NavBar from '../features/navbar/NavBar'

export default function CartPage() {
  return (
    <div>
        <NavBar>
          <Cart />
        </NavBar>
    </div>
  )
}
