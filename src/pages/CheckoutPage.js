import React , { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
    selectItems,
    deleteItemFromCartAsync,
    updateItemAsync
} from '../features/cart/cartSlice'
import { useForm } from 'react-hook-form'
// import { updateUserAsync } from '../features/auth/authSlice'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import NavBar from '../features/navbar/NavBar'
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice'

export default function CheckoutPage() {
    const dispatch = useDispatch()
    const products = useSelector(selectItems)
    console.log(products);
    const totalAmount = products.reduce((amount, product) => amount + product.product.price * product.quantity, 0)
    const totalItems = products.reduce((total, item) => item.quantity + total, 0)
    const { register, reset, handleSubmit, formState: { error } } = useForm()
    const userInfo = useSelector(selectUserInfo)
    // console.log(user);
    const currentOrder = useSelector(selectCurrentOrder)
    const [selectedAddress , setSelectedAddress] = useState(null)
    const [paymentMethod , setPaymentMethod] = useState('cash')

    function handleQuantity(e, product) {
        const newItem = { id: product.id, quantity: +e.target.value }
        dispatch(updateItemAsync(newItem))
    }

    function handleRemove(e, id) {
        e.preventDefault()
        dispatch(deleteItemFromCartAsync(id))
    }

    function handleAddress(e){
        setSelectedAddress(userInfo.addresses[e.target.value])
    }

    function handlePayment(e) {
        setPaymentMethod(e.target.value)
    }

    function handleOrder(e){
        e.preventDefault()
        const order = {
            items: products , 
            totalAmount , 
            totalItems , 
            user: userInfo.id , 
            paymentMethod , 
            selectedAddress ,
            status: 'Pending' // other status can be delivered , recived ->> can be changed by admin
        }
        // console.log(order);
        // console.log(currentOrder.id);
        dispatch(createOrderAsync(order))
        // TODO : redirect to order-sucess page
        // TODO : clear cart after order
        // TODO : on server change the quantity of items
    }

    return (
        <>
            {!products.length && <Navigate to='/' />}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />}
            <NavBar>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
                        <div className='lg:col-span-3 mt-12'>
                            <form
                                className='bg-white px-8 py-8'
                                onSubmit={handleSubmit((data) => {
                                    dispatch(
                                        updateUserAsync({...userInfo , addresses: [...userInfo.addresses , data]})
                                    )
                                    reset()
                                })}
                            >
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Full name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('name', { required: 'Name is Required' })}
                                                        id="name"
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        {...register('email', { required: 'email is required' })}
                                                        type="email"
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="phone"
                                                        {...register('phone', { required: 'phone is required' })}
                                                        type="tel"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Street address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('street-address', { required: 'Please enter your address' })}
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2 sm:col-start-1">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('city', { required: 'Please enter city' })}
                                                        id="city"
                                                        autoComplete="address-level2"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State / Province
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('region', { required: 'Please enter your region' })}
                                                        id="region"
                                                        autoComplete="address-level1"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                    ZIP / Postal code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        {...register('postal-code', { required: 'Please enter the Postal Code' })}
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add Address
                                        </button>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose from existing Address.
                                        </p>
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {userInfo.addresses.map((addresses , index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            onChange={e => handleAddress(e)}
                                                            id="address"
                                                            name="address"
                                                            type="radio"
                                                            className="mt-4 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            value={index}
                                                        />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{addresses.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addresses.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-1000">{addresses.city}</p>
                                                        <p className="text-sm leading-6 text-gray-500">{addresses.phone}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-10 space-y-10">

                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                                <div className="mt-6 space-y-6">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="cash"
                                                            name="payments"
                                                            onChange={e => handlePayment(e)}
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            value='cash'
                                                            checked={paymentMethod === 'cash'}
                                                        />
                                                        <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Cash
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="card"
                                                            name="payments"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            value='card'
                                                            onChange={e => handlePayment(e)}
                                                            checked={paymentMethod === 'card'}
                                                        />
                                                        <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Card Payment
                                                        </label>
                                                    </div>

                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </form >
                        </div>
                        <div className='lg:col-span-2'>
                            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900">Cart</h1>
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={product.product.thumbnail}
                                                            alt={product.product.title}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={product.product.href}>{product.product.title}</a>
                                                                </h3>
                                                                <p className="ml-4">{product.product.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{product.product.color}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="text-gray-500">
                                                                <label htmlFor="quantity" className="inline mr-5 block text-sm font-medium leading-6 text-gray-900">
                                                                    Qty
                                                                </label>
                                                                <select
                                                                    onChange={(e) => handleQuantity(e, product)}
                                                                    value={product.quantity}
                                                                >
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                </select>
                                                            </div>

                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={e => handleRemove(e, product.id)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>


                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${totalAmount}</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total items in Cart</p>
                                        <p>{totalItems}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <div
                                            onClick={e => handleOrder(e)}
                                            className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Order Now
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <Link to='/' >
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button></Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavBar>
        </>
    )
}
