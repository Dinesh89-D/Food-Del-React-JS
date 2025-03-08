import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is an object

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        return res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error adding to cart" });
    }
};

// ✅ Improved removeFromCart function
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is an object

        if (!cartData[req.body.itemId]) {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // If quantity reaches 0, remove the item from the cart
        if (cartData[req.body.itemId] === 0) {
            delete cartData[req.body.itemId];
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        return res.json({ success: true, message: "Removed from Cart" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user cart data (To be implemented)
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error fetching cart data" });
    }
};

// Export functions
export { addToCart, removeFromCart, getCart };

// If using CommonJS, replace with:
// module.exports = { addToCart, removeFromCart, getCart };
