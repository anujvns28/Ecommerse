import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchOrders } from '../service/operation/productapi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const [product, setProduct] = useState();


    const gettingOrders = async () => {
        const result = await fetchOrders(user._id);
        if (result) {
            setProduct(result.data)
        }
    }

    useEffect(() => {
        gettingOrders()
    }, [])

    console.log(product, "this is product")
    let totalIncome = 0
    if (product) {
        product.map((item) => {
            return totalIncome = totalIncome + item.price * item.customor.length
        })
    }
    console.log(totalIncome, "this is totalincome")

    return (
        <div className='w-11/12 mx-auto mb-4 '>
            <div className='w-[80%] border border-black mx-auto  p-3'>
                <div className='flex flex-row gap-3 '>
                    <div className=' h-[150px] bg-slate-400 p-4 rounded-md flex flex-col gap-2 '>
                        <p className='text-2xl font-semibold'>Hello ! {user.firstName}</p>
                        <div className='flex flex-row gap-2 items-center '>
                            <img className='rounded-full '
                                src={user.image} width={60}></img>
                            <p className='text-xl font-semibold'>{user.email}</p>
                        </div>
                    </div>

                    <div className=' h-[150px] bg-slate-400 p-4 rounded-md flex flex-col gap-2 '>
                        <p className='text-2xl font-semibold'>Total Incom in Rupee</p>
                        <p className='text-xl font-semibold'> ₹ {totalIncome}</p>
                    </div>

                </div>

                <div className='flex justify-between  w-[85%] mx-auto text-xl font-semibold my-2'>
                    <div className='w-[35%]'>Product Details</div>
                    <div>Orders</div>
                    <div>Incom (₹)</div>
                </div>

                <div className='pt-2 '>
                    {
                        product &&
                        <div className='flex flex-col gap-3 '>
                            {
                                product.map((product) => {
                                    return <div className='w-full  p-4 border border-black flex justify-between gap-5 '>

                                        <div className='w-full p-2  flex flex-row gap-5 '>
                                            <Link to={`/${product._id}`}>
                                                <div className='w-[150px] h-[150px]'>
                                                    <img className='w-full h-full rounded-md border border-solid'
                                                        src={product.mainImage} />
                                                </div>
                                            </Link>
                                            <div>
                                                <p className='text-2xl font-semibold'>{product.productName}</p>
                                                <p className='text-2xl font-semibold'>Price : ₹ {product.price}</p>
                                            </div>
                                        </div>

                                        <div  className='w-[30%] flex items-center text-2xl font-semibold'>
                                        <p>{product.customor.length}</p>
                                        </div>
                                       <div className='w-[30%]  flex items-center justify-center text-2xl font-semibold'>
                                       <p> ₹ {product.price*product.customor.length}</p>
                                       </div>

                                    </div>
                                })
                            }
                        </div>
                    }
                </div>

               
            </div>
        </div>
    )
}

export default Dashboard
