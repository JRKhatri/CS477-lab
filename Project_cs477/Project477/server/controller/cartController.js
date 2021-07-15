const Cart = require("../models/cartModel");
const Books = require("../models/bookModel");

module.exports.addItemInCart = (req, res, next) =>{
    console.log(req.body)
    const product = new Cart(req.body.id, req.body.title, req.body.isbn, req.body.price, 1)
    res.json(product.addItem());
}

module.exports.listItemCart = (req, res, next) =>{ 
    const cartItems = Cart.getCartList()
    res.json(cartItems);
    
}

module.exports.removeCartItem = (req, res, next) =>{
    const products = Cart.removeItem(req.body.pid);
    res.json(products);

}

module.exports.totalAmount = (req, res, next) =>{
    console.log("i am here")
    const totalAmount = Cart.totalCost();
    console.log(totalAmount)
    res.json(totalAmount);

}
module.exports.checkOut = (req, res, next) => {
    console.log()
    const finalItems = Cart.orderPlaced()
    console.log(finalItems)
    console.log("!!!!!")
    res.json(finalItems);
}