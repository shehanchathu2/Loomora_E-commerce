import userModal from '../modals/userModal.js'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await userModal.findOne({ email })
        
        if (!user) {
            return res.json({success:false , message:"User not found"})
        }

        const ismatch = await bcrypt.compare(password, user.password)
        
        if (ismatch) {
            
            const token = createToken(user._id)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credential"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exists = await userModal.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User Already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter the valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter the strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPw = await bcrypt.hash(password, salt)
        
        const newUser = new userModal({
            name, 
            email, 
            password:hashedPw
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({ success: true, token })
            console.log(req.body)
        } else {
            res.json({ success: false, message:"Invalid credential" })
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export { loginUser, registerUser, adminLogin }