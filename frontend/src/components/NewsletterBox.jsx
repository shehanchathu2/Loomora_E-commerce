import React from 'react'

const NewsletterBox = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Thank you for subscribing!'); 
    }

    return (
        <div className='text-center mt-20'>
            <p className='text-2xl font-medium text-gray-800 '>
                Subscribe now & get 10% off your next purchase!
            </p>

            <p className='text-gray-600 mt-3'>
                Stay updated with the latest trends and exclusive offers.
            </p>

            <form onSubmit={onsubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none' type="email"  placeholder='Enter your email'required/>
                <button className='bg-blue-800 text-white py-2 px-4 rounded ml-2'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsletterBox
