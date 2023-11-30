import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
  fetchLoggedInUserAsync,
  selectUserInfo,
  updateUserAsync
} from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const [formDisplayIndex , setFormDisplayIndex] = useState(-1)
  // console.log(user);

  function handleRemove(e, index) {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }

  function handleEditForm(index) {
    setFormDisplayIndex(index)
    const address = userInfo.addresses[index]
    setValue('name' , address.name)
    setValue('email' , address.email)
    setValue('phone' , address.phone)
    setValue('street-address' , address['street-address'])
    setValue('region' , address['region'])
    setValue('postal-code' , address['postal-code'])
    setValue('city' , address['city'])
  }

  function handleEdit(data, index) {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1, data)
    dispatch(updateUserAsync(newUser))
    setFormDisplayIndex(-1)
  }
  const { register, handleSubmit, reset, setValue } = useForm()

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className='text-4xl mb-5 font-bold tracking-tight text-gray-900 pt-5'>My Profile</h2>
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900">Name : {userInfo.name ? userInfo.name : 'New User'}</h1>
          <h3 className='text-xl mb-5 font-semibold tracking-tight text-gray-900'>Email : {userInfo.email}</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className='flex justify-between text-base font-medium text-gray-900'>Shipping Address and other Details :</div>
          <p className="mt-0.5 text-sm text-gray-500">Your Address :</p>
          {userInfo.addresses.map((add, index) => (
            <div>
              {formDisplayIndex === index ? <form
                className={`bg-white px-8 py-8`}
                onSubmit={handleSubmit((data) => {
                  handleEdit(data, index)
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

                  <div className="mt-6 flex items-center justify-end gap-x-3">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={e => {
                        setFormDisplayIndex(-1)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              </form > : null}
              <div className="flex justify-between gap-x-6 py-3">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{add.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{add.email}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-1000">{add.city}</p>
                  <p className="text-sm leading-6 text-gray-500">{add.phone}</p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={e => handleEditForm(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={e => handleRemove(e, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
