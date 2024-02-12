const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema( new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    product: [{
        productVariantId: {
            type: mongoose.Types.ObjectId,
            ref: "ProductVariant",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        },

    }],
}));

const cartModel=mongoose.model("cart",cartSchema);
module.exports=cartModel;