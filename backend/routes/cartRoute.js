import express from 'express'
import auth from '../middleware/auth.js'

import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router()
cartRouter.post('/add', auth, addToCart)
cartRouter.post('/get', auth, getUserCart)
cartRouter.post('/update', auth, updateCart)


export default cartRouter