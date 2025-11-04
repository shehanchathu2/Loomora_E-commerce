import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {

  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    setFilteredProducts(productsCopy)

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilteredProducts(productsCopy)
  }


  const sortProducts = (e) => {
    let filteredProductsCopy = filteredProducts.slice();

    switch (sortType) {
      case 'low-to-high':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => a.price - b.price))
        break;
      case 'high-to-low':
        setFilteredProducts(filteredProductsCopy.sort((a, b) => b.price - a.price))
        break;

      default:
        applyFilters();
        break;
    }
  }

  useEffect(() => {
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [category, subCategory, products])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    sortProducts()
  }, [sortType])


  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our Collection</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of premium products. Filter by category and find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20'>

        {/* Filters Sidebar */}
        <div className='sm:min-w-64'>
          <div className='bg-white rounded-xl shadow-md p-6 sticky top-4'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Filters</h2>
              <img 
                onClick={toggleFilter} 
                src={assets.dropdown_icon} 
                alt="" 
                className={`h-4 cursor-pointer transition-transform sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
              />
            </div>

            {/* Category Filter */}
            <div className={`mb-6 ${showFilter ? '' : 'hidden'} sm:block`}>
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Category</h3>
                <div className='flex flex-col gap-3'>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="category" 
                      onChange={toggleCategory} 
                      value={'Men'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Men</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="category" 
                      onChange={toggleCategory} 
                      value={'Women'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Women</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="category" 
                      onChange={toggleCategory} 
                      value={'Kids'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Kids</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Type Filter */}
            <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
              <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Type</h3>
                <div className='flex flex-col gap-3'>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="subcategory" 
                      onChange={toggleSubCategory} 
                      value={'Topwear'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Topwear</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="subcategory" 
                      onChange={toggleSubCategory} 
                      value={'Bottomwear'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Bottomwear</span>
                  </label>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <input 
                      type="checkbox" 
                      name="subcategory" 
                      onChange={toggleSubCategory} 
                      value={'Winterwear'} 
                      className='w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer' 
                    />
                    <span className='text-gray-700 group-hover:text-blue-600 transition-colors'>Winterwear</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Products Section */}
        <div className='flex-1'>

          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
            <div>
              <Title text1={'All '} text2={"Products"} />
              <p className='text-gray-600 mt-2'>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <select 
              onChange={(e) => setSortType(e.target.value)} 
              className='bg-white border-2 border-gray-300 rounded-lg text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm hover:border-blue-400 transition-colors'
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6'>
              {
                filteredProducts.map((item, index) => (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
              }
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6'>
                <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>No products found</h3>
              <p className='text-gray-600'>Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection