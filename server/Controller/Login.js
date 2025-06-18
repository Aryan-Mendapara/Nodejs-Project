const { Ragister } = require("../Models/Ragister");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Login } = require("../Models/Login");
const sendEmail = require("../Middleware/sendMail");

const secretKey = process.env.JWT_KEY || "adjkasd#asfsdf%^djkncj";

const addLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(">>>>>>", req.body);

        const existUser = await Login.findOne({ email });
        if (!existUser) {
            return res.status(401).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: existUser._id }, secretKey, { expiresIn: '1d' });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Send email (await first)
        await sendEmail(email, 'Verify your email', `Your OTP is: ${otp}`);

        // Update user with OTP
        await Login.updateOne({ email }, { otp, otp_expires: otpExpiry });

        // Respond to client
        return res.status(200).json({
            message: "Login successful. OTP sent to your email.",
            token,
            user: {
                fname: existUser.fname,
                lname: existUser.lname,
                email: existUser.email,
                otp,
                otpExpiry
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// const verifyOTP = async (req, res) => {
//     const { email, otp } = req.body;
//     try {
//         const user = await Login.findOne({ email });

//         if (!user) return res.status(400).json({ message: 'User not found' });
//         if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

//         if (user.otp !== otp || user.otp_expires < Date.now()) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         user.isVerified = true;
//         user.otp = null;
//         user.otp_expires = null;
//         await user.save();

//         res.status(200).json({ message: 'Email verified successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


const addRagister = async (req, res) => {
    try {
        const { fname, lname, email, password, role } = req.body
        console.log(">>>>>>>>>", req.body);

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        const existRagister = await Login.findOne({ email })
        if (existRagister) {
            return res.status(400).json({ message: "Email already exists." })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new Login({
            fname,
            lname,
            email,
            password: hashPassword,

        })

        await user.save()
        res.json({ message: "User ragister successfully." })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getLoginById = async (req, res) => {
    try {
        const user = await Login.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" }); // ❗ Added return
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user, // ✅ Return the actual user data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllLogin = async (req, res) => {
    try {
        const users = await Login.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error(error);
    }
}

const updateLogin = async (req, res) => {
    try {
        const users = await Login.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!users)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({ message: "User updated successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteLogin = async (req, res) => {
    try {
        const user = await Login.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });

    }
}

module.exports = { addLogin, getLoginById, getAllLogin, updateLogin, deleteLogin, addRagister };
