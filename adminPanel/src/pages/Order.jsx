import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const allOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(res.data);
      if (res.data.success) setOrders(res.data.orders);
      else toast.error("Failed to fetch orders");
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching orders");
    }
  };

  const statusOptions = async (e, orderId) => {
    try {
      
      const res = await axios.post(backendUrl + "/api/order/status", { orderId, status: e.target.value }, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Status updated");
        await allOrders();
      }

    } catch (error) {
      console.log(error);
      toast.error("Error while updating status");
    }
  }

  useEffect(() => {
    allOrders();
  }, [token]);

  const getStatusColor = (status) => {
   const colors = {
  "Order Placed": "from-blue-400 to-sky-500",        // calm and reliable start
  "Processing": "from-amber-400 to-orange-500",      // active / in progress
  "Shipped": "from-violet-500 to-fuchsia-500",       // moving, energetic
  "Out for Delivery": "from-cyan-500 to-blue-600",   // bright, fast-moving feel
  "Delivered": "from-green-500 to-emerald-600",      // success / done
  "Cancelled": "from-rose-500 to-red-600"            // warning / error
};

    return colors[status] || "from-gray-500 to-slate-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Orders Management
            </h1>
          </div>
          <div className="flex items-center justify-between ml-5">
            <p className="text-slate-600">Track and manage customer orders</p>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <span className="text-sm text-slate-600">Total Orders:</span>
              <span className="text-lg font-bold text-indigo-600">{orders.length}</span>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500">
              Orders will appear here once customers make purchases.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                
                <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

                  {/* <div className={`h-1.5 bg-gradient-to-r ${getStatusColor(order.status)}`}></div> */}
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      
                      {/* COLUMN 1 — Order Items */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            
                          </div> */}
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Items</h4>
                        </div>
                        <div className="space-y-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <p className="text-slate-700">
                                <span className="font-semibold">{item.name}</span>
                                <span className="text-slate-500"> × {item.quantity || 1}</span>
                                {item.size && <span className="text-indigo-600 ml-1">({item.size})</span>}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Delivery Address</h4>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-sm space-y-1">
                          <p className="font-semibold text-slate-800">{order.address.firstName} {order.address.lastName}</p>
                          <p className="text-slate-600">{order.address.street}</p>
                          <p className="text-slate-600">{order.address.city}, {order.address.state}, {order.address.zip}</p>
                          <p className="text-slate-600">{order.address.country}</p>
                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <p className="font-medium text-slate-800">{order.address.phone}</p>
                          </div>
                        </div>
                      </div>

                
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Summary</h4>
                        </div>
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-100 space-y-2.5">
                          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                            <span className="text-slate-600 text-sm">Total Amount</span>
                            <span className="text-2xl font-bold text-emerald-600">LKR.{order.amount}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Items</span>
                            <span className="font-semibold text-slate-800">{order.items.length}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Payment Method</span>
                            <span className="font-semibold text-slate-800 uppercase text-xs">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Payment Status</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              order.payment 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.payment ? "✓ Done" : " Pending"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                            <span className="text-slate-600">Order Date</span>
                            <span className="font-semibold text-slate-800">{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                    
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          
                          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Order Status</h4>
                        </div>
                        <div className="space-y-3">
                          
                          <div className={`bg-gradient-to-r ${getStatusColor(order.status)} rounded-xl p-4 text-center`}>
                            <p className="text-white text-sm font-medium mb-1">Current Status</p>
                            <p className="text-white text-lg font-bold">{order.status}</p>
                          </div>
                          
                          {/* Status Selector */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                              Update Status
                            </label>
                            <select
                              onChange={(e)=>statusOptions(e,order._id)}
                              value={order.status}
                              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm font-medium bg-white hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
                            >
                              <option value="Order Placed">Order Placed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;