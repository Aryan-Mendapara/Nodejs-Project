const { Books } = require("../Models/Books");

const addBooks = async (req, res) => {
    try {
        const {name, author, publisher, price, availability, rating} = req.body        
        console.log(">>>>>>>>>",req.body);
        
        const existBooks = await Books.findOne({name});
        if (existBooks) {
            return res.status(400).json({message: "Books Already Exists"});
        }

        const books = new Books({
            name, 
            author, 
            publisher, 
            price, 
            availability, 
            rating
        })

        await books.save();
        res.status(201).json({message: "Books Added Successfully"});
    } catch (error) {
        console.error("❌ Error in addBooks:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const getBooksId = async (req, res) => {
    try {
        const books = await Books.findById(req.params.id);
        if(!books) {
            return res.status(404).json({message: "Books Not Found"});
        }

        res.status(200).json({message: "Books retrieved successfully", books})
    } catch (error) {
        console.error(error);
        res.status(200).json({message: "Internal Server Error"})
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json({
            message: "Books retrieved Succeccfully" , 
            books
        })
    } catch (error) {
        console.error(error);
        
    }
}

const updateBooks = async (req, res) => {
    try {
        const books = await Books.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!books) {
            return res.status(400).json({message: "Books not Found"});
        }
        res.status(200).json({
            message: "Books Updated Successfull",
            books
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBooks = async (req, res) => {
    try {
        const books = await Books.findByIdAndDelete(req.params.id)
        if (!books) {
            res.status(400).json({message: "Books not Found"});
        }
        res.status(200).json({message: "Books Delete Successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {addBooks, getBooks, getBooksId, updateBooks, deleteBooks}