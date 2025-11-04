import React, { useState } from 'react'
import { CloudUpload } from 'lucide-react';
import { MdCloudUpload } from "react-icons/md";
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Addproduct = ({token}) => {

  const [previews, setPreview] = useState({
    Image1: null,
    Image2: null,
    Image3: null,
    Image4: null,
  });

  const [files, setFiles] = useState({
  Image1: null,
  Image2: null,
  Image3: null,
  Image4: null,
});

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);

 const handleImageChange = (e, key) => {
  const file = e.target.files[0];
  if (file) {
    setPreview((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }));

    setFiles((prev) => ({
      ...prev,
      [key]: file,
    }));
  }
};


  const submitHandler = async (e) => {
    e.preventDefault();
if (!subCategory) return toast.error("Please select a subcategory");

    try {

      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(selectedSizes))

      if (files.Image1) formData.append('image1', files.Image1);
    if (files.Image2) formData.append('image2', files.Image2);
    if (files.Image3) formData.append('image3', files.Image3);
      if (files.Image4) formData.append('image4', files.Image4);
      
      console.log(formData)

      const res = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token: token }
      })
      
      if (res.data.success) { 
        toast.success("Product added successfully")
        setName('')
        setDescription('')  
        setCategory('')
        setSubCategory('')
        setPrice('')  
        setBestseller(false)
        setSelectedSizes([])
        setPreview({
          Image1: null,
          Image2: null,
          Image3: null,
          Image4: null,
        })
      } else {
        toast.error(res.data.message)
      }


    } catch (error) {
      console.log("Error while adding product:", error);
      toast.error(error.message)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-10">
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full'></div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
              Add New Product
            </h1>
          </div>
          <p className='text-slate-600 ml-5'>Fill in the details to add a new product to your inventory</p>
        </div>

        {/* Form Container */}
        <div className='relative group'>
          {/* Glow effect */}
          <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500'></div>
          
          <div className='relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden'>
            {/* Decorative header bar */}
            <div className='h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'></div>
            
            <div className='p-8'>
              <form onSubmit={submitHandler} className='space-y-8'>
                
                {/* Image Upload Section */}
                <div>
                  <div className='flex items-center gap-2 mb-4'>
                    <ImageIcon className='w-5 h-5 text-indigo-600' />
                    <h3 className='text-lg font-semibold text-slate-800'>Product Images</h3>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {["Image1", "Image2", "Image3", "Image4"].map((key, idx) => (
                      <label
                        key={key}
                        htmlFor={key}
                        className="group/upload relative border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 hover:border-indigo-400 aspect-square flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg"
                      >
                        {previews[key] ? (
                          <>
                            <img
                              src={previews[key]}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center'>
                              <span className='text-white text-sm font-medium'>Change Image</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-2 text-slate-400 group-hover/upload:text-indigo-500 transition-colors" />
                            <span className="text-slate-500 text-sm group-hover/upload:text-indigo-600 font-medium">
                              Upload {idx + 1}
                            </span>
                          </>
                        )}

                        <input
                          type="file"
                          id={key}
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, key)}
                          hidden
                        />
                      </label>
                    ))}
                  </div>
                  <p className='text-xs text-slate-500 mt-2 ml-1'>Upload up to 4 product images (JPG, PNG)</p>
                </div>

                {/* Product Details Section */}
                <div className='space-y-6'>
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full'></div>
                    <h3 className='text-lg font-semibold text-slate-800'>Product Details</h3>
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">Product Name *</label>
                    <input
                      type="text"
                      className="border-2 border-slate-200 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                      placeholder="e.g., Classic Cotton T-Shirt"
                      required
                      onChange={(e) => setName(e.target.value)} 
                      value={name}
                    />
                  </div>

                  {/* Product Description */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">Product Description *</label>
                    <textarea
                      rows="4"
                      className="border-2 border-slate-200 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none bg-slate-50 hover:bg-white"
                      placeholder="Describe your product in detail..."
                      required
                      onChange={(e) => setDescription(e.target.value)} 
                      value={description}
                    ></textarea>
                  </div>

                  {/* Category, Subcategory, Price Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">Category *</label>
                      <select
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white cursor-pointer"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="CasualWear">Casual Wear</option>
                        <option value="FormalWear">Formal Wear</option>
                        <option value="Sportswear">Sportswear</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">Sub Category *</label>
                      <select
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white cursor-pointer"
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option value="">Select Sub Category</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Trousers">Trousers</option>
                        <option value="Shorts">Shorts</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-slate-700">Price (Rs.) *</label>
                      <input
                        type="number"
                        className="border-2 border-slate-200 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white"
                        placeholder="0.00"
                        onChange={(e) => setPrice(e.target.value)} 
                        value={price}
                      />
                    </div>
                  </div>

                  {/* Sizes Section */}
                  <div>
                    <label className="block mb-3 text-sm font-semibold text-slate-700">Available Sizes *</label>
                    <div className="flex flex-wrap gap-3">
                      {["S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`relative overflow-hidden border-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                            selectedSizes.includes(size)
                              ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-transparent shadow-lg scale-105"
                              : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                          }`}
                          onClick={() => {
                            setSelectedSizes((prev) =>
                              prev.includes(size)
                                ? prev.filter((s) => s !== size)
                                : [...prev, size]
                            );
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bestseller Checkbox */}
                  <div className='bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4'>
                    <label className='flex items-center gap-3 cursor-pointer group'>
                      <input 
                        type="checkbox" 
                        id='bestseller' 
                        className='w-5 h-5 rounded border-2 border-amber-400 text-amber-500 focus:ring-2 focus:ring-amber-500 cursor-pointer'
                        onChange={(e) => setBestseller(e.target.checked)} 
                        checked={bestseller} 
                      />
                      <span className='text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors'>
                        Mark as Best Seller ⭐
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='pt-4 flex justify-end'>
                  <button
                    type='submit'
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
                  >
                    <span className='relative z-10 flex items-center gap-2'>
                      <CloudUpload className='w-5 h-5' />
                      Add Product
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addproduct