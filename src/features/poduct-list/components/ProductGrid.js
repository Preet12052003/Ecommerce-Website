import React from 'react'
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectAllProducts } from '../productListSlice';


export default function ProductGrid() {
    const products = useSelector(selectAllProducts)

    return (
        <>
            <div className="lg:col-span-3">
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {products.map((product) => (
                                <Link to={`/product-detail/${product.id}`}>
                                    <div key={product.id} className="group relative border-solid border-2 border-gray-200 p-5">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <div href={product.thumbnail}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.title}
                                                    </div>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    <StarIcon className="w-6 h-6 inline"></StarIcon>
                                                    <span className='align-bottom'>{product.rating}</span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">$ {Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                                                <p className="text-sm font-medium text-gray-900 line-through">$ {product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
