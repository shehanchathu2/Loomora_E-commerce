import React, { useContext, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react' // replacing image icon
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

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
    let productsCopy = [...products]
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilteredProducts(productsCopy)
  }

  const sortProducts = () => {
    let sorted = [...filteredProducts]
    switch (sortType) {
      case 'low-to-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-to-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      default:
        applyFilters()
        return
    }
    setFilteredProducts(sorted)
  }

  useEffect(() => {
    setFilteredProducts(products)
    console.log(products)
  }, [products])

  useEffect(() => {
    applyFilters()
  }, [category, subCategory, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  const toggleFilter = () => setShowFilter(!showFilter)

  return (
    <div className="min-h-screen bg-gray-50 mt-10">

      <div className="relative bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Explore Our Exclusive Collection
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse our curated selection of premium products. Filter, sort, and find your perfect match.
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-10">
        {/* Sidebar Filters */}
        <aside className="sm:w-64 bg-white shadow-sm rounded-2xl p-6 border border-gray-100 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <ChevronDown
              onClick={toggleFilter}
              className={`h-5 w-5 text-gray-700 cursor-pointer transition-transform sm:hidden ${
                showFilter ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Categories */}
          <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Category</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                {['CasualWear', 'FormalWear', 'Sportswear'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={cat}
                      onChange={toggleCategory}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Type</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                {['T-Shirts', 'Shirts', 'Trousers','Shorts'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={type}
                      onChange={toggleSubCategory}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- Product Section --- */}
        <section className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              {/* <Title text1="All" text2="Products" /> */}
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-24 h-24 flex items-center justify-center mx-auto mb-6 rounded-full">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
              <p className="text-gray-600 text-sm">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Collection
