import React from 'react'
import ProductDetails from '../features/poduct-list/components/ProductDetails'
import NavBar from '../features/navbar/NavBar'

export default function ProductDetailPage() {
  return (
    <div>
        <NavBar>
          <ProductDetails />
        </NavBar>
    </div>
  )
}
