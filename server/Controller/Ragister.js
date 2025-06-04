const { Ragister } = require("../Models/Ragister");
const bcrypt = require('bcrypt');

const addRagister = async (req, res) => {
    try {
        const { fname, lname, address, email, mobileno, password } = req.body
        console.log(">>>>>>>>>", req.body);

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        const existRagister = await Ragister.findOne({ email })
        if (existRagister) {
            return res.status(400).json({ message: "Email already exists." })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new Ragister({
            fname,
            lname,
            address,
            email,
            mobileno,
            password: hashPassword
        })

        await user.save()
        res.json({ message: "User ragister successfully." })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getRagister = async (req, res) => {
    try {
        const ragister = await Ragister.find();
        res.status(200).json({ message: "Ragister retrieved successfully", ragister });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateRagister = async (req, res) => {
    try {
        const ragister = await Ragister.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!ragister) {
            res.status(400).json({ message: "Ragister Not Found" });
        }
        res.status(200).json({ message: "Ragister updated successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteRagister = async (req, res) => {
    try {
        const ragister = await Ragister.findByIdAndDelete(req.params.id);
        if (!ragister) {
            res.status(400).json({ message: "Ragister Not Found" });
        }
        res.status(200).json({ message: "Ragister deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { addRagister, getRagister, updateRagister, deleteRagister }