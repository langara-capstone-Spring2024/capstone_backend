const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrls: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        cuisineType: {
            type: String,
            enum: [
                "American",
                "Chinese",
                "Indian",
                "Italian",
                "Japanese",
                "Korean",
                "Mexican",
                "Thai",
                "Others",
            ],
            required: true,
        },
        cost: {
            type: String,
            enum: [1, 2, 3, 4],
            required: true,
        },
        // 7 items [openingTime: {"1970-01-01THH:mm:00.000+00:00"}, closingTime: {"1970-01-01THH:mm:00.000+00:00"}]
        operatingTimes: {
            type: [{ openingTime: Date, closingTime: Date }],
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Merchant", MerchantSchema);
