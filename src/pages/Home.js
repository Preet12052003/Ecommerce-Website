import React from 'react'
import NavBar from '../features/navbar/NavBar'
import ProductList from '../features/poduct-list/components/ProductList'

export default function Home() {
  return (
    <div>
        <NavBar>
            <ProductList />
        </NavBar>
    </div>
  )
}
