const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false
        },
    //whatsappNumber: String
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
      }, 
    
    
code : {
        type : String,
        required: true,
        default: function() {
            return Math.floor(1000 + Math.random() * 9000).toString();
    }},
    
    purchase_datetime : {
        type : Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);


// const OrderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [
//     {
//       name: String,
//       quantity: Number,
//       price: Number,
//     },
//   ],
// });

// module.exports = mongoose.model('Order', OrderSchema);
