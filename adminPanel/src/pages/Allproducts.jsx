import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Allproducts = ({token}) => {

  const [products, setProducts] = useState([]);

  const allProducts = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/allproduct');
      setProducts(res.data.product);
      console.log(res.data)

    } catch (error) {
      console.log("Error while fetching all products:", error);
    }
  }


  const removeProduct = async (id) => {
    try {
      
      const res = await axios.post(backendUrl + '/api/product/remove', {id}, {
        headers: { token: token }
      });

      toast.success(res.data.message);
      allProducts();

    } catch (error) {
      console.log(error)
      toast.error("Error while removing product");
    }
  }

  useEffect(() => {
    allProducts();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-10">
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full'></div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
              All Products
            </h1>
          </div>
          <p className='text-slate-600 ml-5'>Manage your product inventory</p>
        </div>

        <div className="relative group">
          
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200">
            
            <div className="p-8">
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Product Inventory</h2>
                  <p className='text-sm text-slate-500 mt-1'>Total Products: <span className='font-semibold text-indigo-600'>{products.length}</span></p>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className="min-w-full">
                  <thead>
                    <tr className='border-b-2 border-slate-200'>
                      <th className="px-6 py-4 text-left">
                        <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>#</span>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Product Name</span>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Category</span>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Price</span>
                      </th>
                      <th className="px-6 py-4 text-center">
                        <span className='text-xs font-bold text-slate-500 uppercase tracking-wider'>Actions</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {products.map((product, index) => (
                      <tr
                        key={product._id}
                        className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors'>
                            <span className='text-sm font-semibold text-slate-600 group-hover:text-indigo-600'>
                              {++index}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-5">
                          <span className='font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors'>
                            {product.name}
                          </span>
                        </td>
                        
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 border border-indigo-200">
                            {product.category}
                          </span>
                        </td>
                        
                        <td className="px-6 py-5">
                          <div className='flex items-center gap-1'>
                            <span className='text-sm font-bold text-emerald-600'>Rs.</span>
                            <span className='text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>
                              {product.price}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button className="group/btn relative px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                              <span className='relative z-10'>Edit</span>
                              <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity'></div>
                            </button>
                            
                            <button 
                              onClick={()=>removeProduct(product._id)} 
                              className="group/btn relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                              <span className='relative z-10'>Delete</span>
                              <div className='absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover/btn:opacity-100 transition-opacity'></div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {products.length === 0 && (
                <div className='py-16 text-center'>
                  <div className='w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-10 h-10 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                    </svg>
                  </div>
                  <h3 className='text-xl font-semibold text-slate-700 mb-2'>No Products Found</h3>
                  <p className='text-slate-500'>Start by adding your first product to the inventory.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allproducts