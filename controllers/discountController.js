const Discount = require("../models/Discount");

const addDiscount = async (req, res) => {
    try {
        const {
            label,
            description,
            percentDiscount,
            validFromTime,
            validToTime,
            validFromDate,
            validToDate,
            menuIds,
        } = req.body;
        const merchant = req.merchantId;
        console.log(merchant);

        if (!merchant) {
            return res.status(400).json({ error: "Merchant not found" });
        }

        if (
            !percentDiscount ||
            !validFromTime ||
            !validToTime ||
            !validFromDate ||
            !validToDate ||
            !menuIds
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newDiscount = await Discount.create({
            label,
            description,
            percentDiscount,
            // imageUrl,
            validFromTime,
            validToTime,
            validFromDate,
            validToDate,
            menuIds,
            merchant,
        });

        res.status(200).json({
            message: "Coupon created successfullly.",
            discountId: newDiscount._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Coupon not created." });
    }
};

const getAllDiscount = async (req, res) => {
    try {
        const merchant = req.merchantId;

        if (!merchant) {
            return res.status(400).json({ error: "Merchant not found" });
        }

        const allDiscount = await Discount.find({ merchant });
        console.log("Number of Discounts:", allDiscount.length);

        if (!allDiscount?.length) {
            return res.status(400).json({ error: "No " });
        }

        res.status(200).json({ data: allDiscount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No coupon available" });
    }
};

const getAllActiveDiscount = async (req, res) => {
    try {
        const merchant = req.merchantId;

        if (!merchant) {
            return res.status(400).json({ error: "Merchant not found" });
        }

        const currentDate = new Date();

        const allDiscount = await Discount.find({
            merchant,
            validToDate: { $gte: currentDate },
        }).populate({
            path: "menuIds",
            select: "name originalPrice imageUrl",
        });

        res.status(200).json({ data: allDiscount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No coupon available" });
    }
};

const getActiveDiscountsByMerchant = async (req, res) => {
    try {
        const { merchantId } = req.query;

        if (!merchantId) {
            return res.status(400).json({ error: "Merchant not found" });
        }

        const currentDate = new Date();

        const activeDiscounts = await Discount.find({
            merchant: merchantId,
            validToDate: { $gte: currentDate },
        });

        res.status(200).json(activeDiscounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const merchant = req.merchantId;

        const discount = await Discount.findOne({
            _id: id,
            merchant,
        });

        if (!merchant) {
            return res.status(400).json({ error: "Merchant not found" });
        }

        if (!discount) {
            return res.status(404).json({ error: "Coupon not found" });
        }

        res.status(200).json({ data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Coupon is not available" });
    }
};

module.exports = {
    addDiscount,
    getAllDiscount,
    getAllActiveDiscount,
    getActiveDiscountsByMerchant,
    getDiscount,
};
