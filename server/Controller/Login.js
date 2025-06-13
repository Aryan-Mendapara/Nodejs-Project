const { Ragister } = require("../Models/Ragister");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Login } = require("../Models/Login");

const secretKey = process.env.JWT_KEY || "adjkasd#asfsdf%^djkncj";

const addLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(">>>>>>", req.body);

        const existUser = await Login.findOne({ email });
        if (!existUser) {
            return res.status(401).json({ message: "not exist user" });
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: existUser._id }, secretKey, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                fname: existUser.fname,
                lname: existUser.lname,
                email: existUser.email,
                role: existUser.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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
            role
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

module.exports = { addLogin, getLoginById, getAllLogin, updateLogin, deleteLogin, addRagister};
