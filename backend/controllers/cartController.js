import userModal from '../modals/userModal.js'



const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body;
        const user = await userModal.findById(userId);
        
        let cartData = await user.cartDate
        console.log("cartdata :",cartData)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1  
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        console.log("Card: ",cartData)

        await userModal.findByIdAndUpdate(userId, { cartDate: cartData })
        res.json({ success: true, message: "Item added to cart successfully", cartData })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error while adding item to cart", error: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const user = await userModal.findById(userId);
        let cartData = await user.cartDate;

        cartData[itemId][size] = quantity;

        await userModal.findByIdAndUpdate(userId, { cartDate: cartData });
        res.json({ success: true, message: "Cart updated successfully", cartData });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while updating cart", error: error.message });
    }
}

const getUserCart = async (req, res) => {
    
    try {
        const {userId } = req.body
        
        const user = await userModal.findById(userId);
        let cartData = await user.cartDate;

        res.json({ success: true, message: "User cart fetched successfully", cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching user cart", error: error.message });
    }
}

export { addToCart, updateCart, getUserCart }