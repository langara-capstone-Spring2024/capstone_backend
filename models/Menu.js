const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        orginalPrice: {
            type: String,
        },
        description: {
            type: String,
        },
        merchant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Merchant",
            required: true,
        },
        cuisineType: {
            type: String,
            required: true,
            enum:
                [
                    "American",
                    "Chinese",
                    "Indian",
                    "Italian",
                    "Japanese",
                    "Korean",
                    "Mexican",
                    "Thai",
                    "Others"
                ],
        },
        isFeatured: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Menu", MenuSchema);
