import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';

export default function UserOrder() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const orders = useSelector(selectUserOrders)
  console.log(orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userInfo.id))
  }, [dispatch])

  return (
    <div>
      {orders.map(order => {
        return (
          <div>
            <div>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900">{`Order ID: #${order.id}`}</h1>
                  <div className="flow-root">
                    <h1 className='text-2xl mb-5 font-semibold tracking-tight text-gray-900'>Items in the order</h1>
                    <h3 className='text-xl mb-5 font-semibold tracking-tight text-gray-900'>Order Status : {order.status}</h3>

                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.thumbnail}>{item.product.title}</a>
                                  <h4 className='text-gray-600 font-normal'>{item.brand}</h4>
                                </h3>
                                <p className="ml-4">${item.product.price}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label htmlFor="quantity" className="inline mr-5 block text-sm font-medium leading-6 text-gray-900">
                                  Qty : {item.quantity}
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className='flex justify-between text-base font-medium text-gray-900'>Address and other Details :</div>
                  <div className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.email}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-1000">{order.selectedAddress.city}</p>
                      <p className="text-sm leading-6 text-gray-500">{order.selectedAddress.phone}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items in Order</p>
                    <p>{order.totalItems}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}