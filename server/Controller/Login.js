const { Ragister } = require("../Models/Ragister");
const { User } = require("../Models/Login");
const bcrypt = require("bcrypt")

const addLogin = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        console.log(">>>>>>", req.body);

        const existUser = await Ragister.findOne({ email });
        if (!existUser) {
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password"});
        }   
        const user = new User({
            fname,
            lname,
            email,
            password : isPasswordValid
        });
        console.log(">>>>>>>>",user);
        

        await user.save();
        res.status(200).json({ message: "User added successfully", user });

    } catch (error) {
        console.error(error); // Always log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getLoginById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
        const users = await User.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        console.error(error);
    }
}

const updateLogin = async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!users)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({ message: "User updated successfully", users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteLogin = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });

    }
}

module.exports = { addLogin, getLoginById, getAllLogin, updateLogin, deleteLogin };
