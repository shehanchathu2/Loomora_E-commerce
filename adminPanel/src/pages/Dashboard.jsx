import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import {
    ShoppingBag,
    Package,
    DollarSign,
    Users,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Clock,
    CheckCircle,
    XCircle
} from 'lucide-react';

const Dashboard = ({ token }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
        recentOrders: [],
        topProducts: []
    });

    const [loading, setLoading] = useState(true);


    const fetchDashboardData = async () => {
        if (!token) return;

        try {
            setLoading(true);


            const ordersRes = await axios.post(
                backendUrl + '/api/order/list',
                {},
                { headers: { token } }
            );


            const productsRes = await axios.get(backendUrl + '/api/product/allproduct');

            if (ordersRes.data.success) {
                console.log(ordersRes.data)
                console.log(productsRes.data)
                const orders = ordersRes.data.orders;
                const products = productsRes.data.product || [];

                const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
                const pendingOrders = orders.filter(o => o.status === 'Order Placed' || o.status === 'Processing').length;
                const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
                const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;


                const recentOrders = orders.slice(0, 5);

                setStats({
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    totalRevenue: totalRevenue,
                    pendingOrders: pendingOrders,
                    deliveredOrders: deliveredOrders,
                    cancelledOrders: cancelledOrders,
                    recentOrders: recentOrders,
                    topProducts: products.slice(0, 5)
                });
            }

            setLoading(false);
        } catch (error) {
            console.log('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [token]);

    // Stat cards data
    const statCards = [
        {
            title: 'Total Revenue',
            value: `LKR.${stats.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-green-600',
            bgGradient: 'from-emerald-50 to-green-50',
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingCart,
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50',

        },
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            gradient: 'from-purple-500 to-pink-600',
            bgGradient: 'from-purple-50 to-pink-50',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: Clock,
            gradient: 'from-orange-500 to-red-600',
            bgGradient: 'from-orange-50 to-red-50',
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            Dashboard Overview
                        </h1>
                    </div>
                    <p className="text-slate-600 ml-5">Welcome back! Here's what's happening with your store today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div className={`group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>


                                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${stat.gradient} transition-all duration-300 group-hover:w-1.5`}>
                                    <div className={`absolute inset-0 bg-gradient-to-b ${stat.gradient} blur-sm opacity-50`}></div>
                                </div>


                                <div className="relative z-10 ml-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                            {stat.title}
                                        </h3>
                                    </div>

                                    <p className="text-3xl font-bold text-slate-900 mb-1 group-hover:scale-105 transition-transform duration-300">
                                        {stat.value}
                                    </p>

                                </div>

                                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`}></div>
                            </div>
                        );
                    })}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800">Delivered Orders</h3>
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-4xl font-bold text-green-600 mb-2">{stats.deliveredOrders}</p>
                            <p className="text-sm text-slate-600">Successfully completed</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800">Pending Orders</h3>
                                <Clock className="w-8 h-8 text-orange-500" />
                            </div>
                            <p className="text-4xl font-bold text-orange-600 mb-2">{stats.pendingOrders}</p>
                            <p className="text-sm text-slate-600">Awaiting processing</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800">Cancelled Orders</h3>
                                <XCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <p className="text-4xl font-bold text-red-600 mb-2">{stats.cancelledOrders}</p>
                            <p className="text-sm text-slate-600">Orders cancelled</p>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Orders */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>

                        <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                            {/* <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div> */}

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShoppingCart className="w-5 h-5 text-indigo-600" />
                                    <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
                                </div>

                                <div className="space-y-3">
                                    {stats.recentOrders.length === 0 ? (
                                        <p className="text-slate-500 text-sm text-center py-4">No recent orders</p>
                                    ) : (
                                        stats.recentOrders.map((order, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-800 text-sm">
                                                        {order.address?.firstName || 'Customer'} {order.address?.lastName || ''}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {order.items?.length || 0} items • {new Date(order.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-emerald-600">LKR.{order.amount}</p>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>

                        <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Package className="w-5 h-5 text-purple-600" />
                                    <h2 className="text-xl font-bold text-slate-800">Top Products</h2>
                                </div>

                                <div className="space-y-3">
                                    {stats.topProducts.length === 0 ? (
                                        <p className="text-slate-500 text-sm text-center py-4">No products available</p>
                                    ) : (
                                        stats.topProducts.map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm">{product.name}</p>
                                                        <p className="text-xs text-slate-500">{product.category}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-emerald-600">LKR. {product.price}</p>
                                                    {product.bestseller && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                                            Bestseller
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-500"></div>

                    <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <p className="text-sm text-slate-600 mb-2">Conversion Rate</p>
                                <p className="text-3xl font-bold text-indigo-600">
                                    {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-600 mb-2">Avg Order Value</p>
                                <p className="text-3xl font-bold text-emerald-600">
                                    LKR.{stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-600 mb-2">Success Rate</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-600 mb-2">Active Products</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;