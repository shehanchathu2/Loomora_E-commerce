import orderModal from "../modals/orderModal.js"
import userModal from '../modals/userModal.js'
import Stripe from 'stripe';
import 'dotenv/config';


const currency = 'lkr';
const deliveryFee = 200;

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const placeOrder = async (req, res) => {
    
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModal(orderData)
        await newOrder.save()

        await userModal.findByIdAndUpdate(userId, { cartDate: {} })
        
        res.json({success:true,message:"Order placed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed"})
    }

}

const placeOrderStripe = async (req, res) => {
    try {
        
        const { amount, userId, items, address } = req.body;

        const { origin } = req.headers;
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:true,
            date:Date.now()
        }
        const newOrder = new orderModal(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: 'Shipping Fee',
                },
                unit_amount: deliveryFee * 100,
            },
            quantity: 1,
        }); 

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed"})
    }
}


//verify payment

const verifyStripe = async (req,res) => {
    const { orderId, success, userId } = req.body
    console.log("orderid:",orderId)
    console.log("success:",success)
    console.log("userId:",userId)
    try {
        
        if (success === "true") {
            await orderModal.findByIdAndUpdate(orderId, { payment: true })
            await userModal.findByIdAndUpdate(userId, { cartDate: {} })
            res.json({success:true})
        } else {
            await orderModal.findByIdAndDelete(orderId)
            res.json({success:false})
        }

    } catch (error) {
        console.log(error)
    }
 }

//admin
const getAllOrders = async (req, res) => { 

    try {
        
        const orders = await orderModal.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed"})
    }

}

//for frontend user
const getUserOrders = async (req, res) => {
    
    try {
        
        const { userId } = req.body

        const orders = await orderModal.find({ userId }).sort({ createdAt: -1 })

        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed"})
    }

}

//admin can update order status
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body
        await orderModal.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Failed" })
    }
}

export { placeOrder, placeOrderStripe, getAllOrders, getUserOrders, updateStatus,verifyStripe };